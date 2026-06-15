/* =====================================================================
   NC ADMIN — in-site editor (Supabase-backed)
   Login (magic link) · Site · Projects · uploads · focal point · modules
   ===================================================================== */
(function () {
  "use strict";
  const cfg = window.SUPABASE_CONFIG || {};
  const CATS = (window.PORTFOLIO && window.PORTFOLIO.categories ? window.PORTFOLIO.categories : ["All", "Branding", "Editorial", "AI"]).filter((c) => c !== "All");
  const app = document.getElementById("app");
  const toastEl = document.getElementById("toast");
  let sb = null, session = null, site = {}, projects = [], tab = "projects", editing = null;

  const esc = (s) => String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  const isVid = (s) => /\.(mp4|webm|mov|m4v)$/i.test(s || "");
  function toast(msg, err) { toastEl.textContent = msg; toastEl.classList.toggle("err", !!err); toastEl.classList.add("show"); clearTimeout(toast._t); toast._t = setTimeout(() => toastEl.classList.remove("show"), 2600); }

  /* ---- path helpers on an object ---- */
  function getPath(o, p) { return p.split(".").reduce((a, k) => (a == null ? a : a[k]), o); }
  function setPath(o, p, v) { const k = p.split("."); let c = o; for (let i = 0; i < k.length - 1; i++) { const nx = /^\d+$/.test(k[i + 1]); if (c[k[i]] == null) c[k[i]] = nx ? [] : {}; c = c[k[i]]; } c[k[k.length - 1]] = v; }

  init();
  async function init() {
    if (!window.NCStore || !window.NCStore.enabled) { app.innerHTML = notConfigured(); return; }
    try {
      sb = await window.NCStore.getClient();
      const { data } = await sb.auth.getSession();
      session = data.session;
      sb.auth.onAuthStateChange((_e, s) => { session = s; route(); });
      route();
    } catch (e) { app.innerHTML = `<div class="center"><div class="card narrow"><h2>Couldn’t connect</h2><p class="muted">${esc(e.message)}</p></div></div>`; }
  }

  function route() {
    if (!session) return renderLogin();
    const email = (session.user && session.user.email || "").toLowerCase();
    if (email !== (cfg.ownerEmail || "").toLowerCase()) return renderDenied(email);
    loadAndRender();
  }

  function notConfigured() {
    return `<div class="center"><div class="card narrow">
      <h2>Editor not connected yet</h2>
      <p class="muted" style="margin:12px 0">Add your Supabase Project URL + anon key in <b>js/supabase-config.js</b>, run <b>db/schema.sql</b> in the Supabase SQL editor, then reload this page.</p>
      <a class="btn ghost" href="index.html">← Back to site</a></div></div>`;
  }
  function renderDenied(email) {
    app.innerHTML = `<div class="center"><div class="card narrow">
      <h2>No access</h2><p class="muted" style="margin:12px 0">${esc(email)} isn’t the owner email. Sign in with <b>${esc(cfg.ownerEmail)}</b>.</p>
      <button class="btn" id="out">Sign out</button></div></div>`;
    document.getElementById("out").onclick = async () => { await sb.auth.signOut(); };
  }
  function renderLogin() {
    app.innerHTML = `<div class="center"><div class="card narrow">
      <h1 style="font-size:1.3rem;margin-bottom:6px">Nathalia Cury — Editor</h1>
      <p class="muted" style="margin-bottom:18px">Enter your email; we’ll send a one-time login link.</p>
      <label>Email</label>
      <input id="email" type="email" placeholder="${esc(cfg.ownerEmail)}" value="${esc(cfg.ownerEmail)}" />
      <button class="btn" id="send" style="margin-top:14px;width:100%;justify-content:center">Send login link</button>
      <p id="msg" class="muted" style="margin-top:12px"></p>
      <a class="muted" href="index.html" style="display:inline-block;margin-top:14px">← Back to site</a></div></div>`;
    document.getElementById("send").onclick = async () => {
      const email = document.getElementById("email").value.trim();
      const msg = document.getElementById("msg");
      if (!email) return;
      msg.innerHTML = '<span class="spin"></span> Sending…';
      const { error } = await sb.auth.signInWithOtp({ email, options: { emailRedirectTo: location.href } });
      msg.textContent = error ? error.message : "Check your inbox — click the link to sign in.";
    };
  }

  async function loadAndRender() {
    app.innerHTML = `<div class="center"><span class="muted"><span class="spin"></span> Loading…</span></div>`;
    const [s, p] = await Promise.all([
      sb.from("site").select("*").eq("id", 1).maybeSingle(),
      sb.from("projects").select("*").order("position", { ascending: true }),
    ]);
    site = (s.data && s.data.data) || {};
    projects = p.data || [];
    renderApp();
  }

  function shell(body) {
    app.innerHTML = `
      <div class="topbar">
        <h1>NC Editor</h1>
        <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">
          <span class="who">${esc(session.user.email)}</span>
          <a class="btn ghost sm" href="index.html" target="_blank">View site ↗</a>
          <button class="btn ghost sm" id="seed">Seed from built-in</button>
          <button class="btn ghost sm" id="signout">Sign out</button>
        </div>
      </div>
      <div class="tabs">
        <button data-tab="projects" class="${tab === "projects" ? "active" : ""}">Projects</button>
        <button data-tab="site" class="${tab === "site" ? "active" : ""}">Site &amp; Hero</button>
      </div>
      <div class="wrap" style="padding-top:20px;padding-bottom:80px">${body}</div>`;
    document.getElementById("signout").onclick = async () => { await sb.auth.signOut(); };
    document.getElementById("seed").onclick = seedFromBuiltIn;
    app.querySelectorAll(".tabs button").forEach((b) => b.onclick = () => { tab = b.dataset.tab; editing = null; renderApp(); });
  }

  function renderApp() {
    if (tab === "projects") return editing ? renderProjectEditor() : renderProjectList();
    return renderSite();
  }

  /* ===================== PROJECT LIST ===================== */
  function renderProjectList() {
    const rows = projects.map((r) => {
      const d = r.data || {};
      const m = d.hero || (d.images && d.images[0]) || (d.blocks && (d.blocks.find((b) => b.type === "image" || b.type === "video") || {}).src);
      const src = typeof m === "object" ? (m && m.src) : m;
      const thumb = src ? (isVid(src) ? `<video src="${esc(src)}" muted></video>` : `<img src="${esc(src)}" />`) : "";
      return `<div class="proj" data-id="${esc(r.id)}">
        <div class="thumb">${thumb}</div>
        <div class="meta"><div class="t">${esc(d.title || r.id)}</div><div class="s">${esc(r.category)} · ${esc(d.year || "")} ${r.featured_position != null ? '· <span class="feat">Featured</span>' : ""}</div></div>
        <div class="actions">
          <button class="btn ghost sm" data-act="up">↑</button>
          <button class="btn ghost sm" data-act="down">↓</button>
          <button class="btn ghost sm" data-act="feat">${r.featured_position != null ? "★" : "☆"}</button>
          <button class="btn ghost sm" data-act="edit">Edit</button>
          <button class="btn ghost sm danger" data-act="del">Delete</button>
        </div></div>`;
    }).join("");
    shell(`<div class="section"><h2>Projects — drag order with ↑ ↓, ★ toggles Featured</h2>
      <div class="proj-list">${rows || '<p class="muted">No projects yet. Click “Seed from built-in” to import your current work.</p>'}</div>
      <button class="addbtn" id="newproj" style="margin-top:14px">+ New project</button></div>`);
    document.getElementById("newproj").onclick = newProject;
    app.querySelectorAll(".proj").forEach((el) => {
      const id = el.dataset.id;
      el.querySelector('[data-act="edit"]').onclick = () => openEditor(id);
      el.querySelector('[data-act="del"]').onclick = () => delProject(id);
      el.querySelector('[data-act="up"]').onclick = () => moveProject(id, -1);
      el.querySelector('[data-act="down"]').onclick = () => moveProject(id, 1);
      el.querySelector('[data-act="feat"]').onclick = () => toggleFeatured(id);
    });
  }

  async function moveProject(id, dir) {
    const i = projects.findIndex((p) => p.id === id), j = i + dir;
    if (j < 0 || j >= projects.length) return;
    const a = projects[i], b = projects[j];
    const pa = a.position, pb = b.position;
    await Promise.all([
      sb.from("projects").update({ position: pb }).eq("id", a.id),
      sb.from("projects").update({ position: pa }).eq("id", b.id),
    ]);
    [a.position, b.position] = [pb, pa];
    projects.sort((x, y) => x.position - y.position);
    renderProjectList(); toast("Order saved");
  }
  async function toggleFeatured(id) {
    const r = projects.find((p) => p.id === id);
    let fp = null;
    if (r.featured_position == null) { const max = Math.max(-1, ...projects.filter((p) => p.featured_position != null).map((p) => p.featured_position)); fp = max + 1; }
    await sb.from("projects").update({ featured_position: fp }).eq("id", id);
    r.featured_position = fp; renderProjectList(); toast(fp == null ? "Removed from featured" : "Added to featured");
  }
  async function delProject(id) {
    if (!confirm("Delete this project permanently?")) return;
    await sb.from("projects").delete().eq("id", id);
    projects = projects.filter((p) => p.id !== id); renderProjectList(); toast("Deleted");
  }
  function newProject() {
    const id = prompt("Short id / slug (letters, numbers, dashes):", "new-project");
    if (!id) return;
    const slug = id.toLowerCase().replace(/[^a-z0-9-]+/g, "-");
    if (projects.some((p) => p.id === slug)) return toast("That id already exists", true);
    editing = { id: slug, _new: true, position: projects.length, featured_position: null, category: CATS[0], published: true,
      data: { title: id, client: "", year: new Date().getFullYear() + "", accent: "#8d8a84", bg: "#111111", summary: "", description: "", role: "", team: [], stats: [], hero: null, blocks: [] } };
    renderProjectEditor();
  }
  function openEditor(id) { editing = JSON.parse(JSON.stringify(projects.find((p) => p.id === id))); editing.data = editing.data || {}; editing.data.blocks = editing.data.blocks || []; editing.data.stats = editing.data.stats || []; editing.data.team = editing.data.team || []; renderProjectEditor(); }

  /* ===================== PROJECT EDITOR ===================== */
  function renderProjectEditor() {
    const d = editing.data;
    const statRows = (d.stats || []).map((s, i) => `<div class="kv"><input data-bind="data.stats.${i}.value" value="${esc(s.value)}" placeholder="1,200"/><input data-bind="data.stats.${i}.label" value="${esc(s.label)}" placeholder="Employees"/><button class="btn ghost sm danger" data-del-stat="${i}">✕</button></div>`).join("");
    const blocks = (d.blocks || []).map((b, i) => blockEditor(b, i)).join("");
    shell(`
      <div class="section">
        <div style="display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap">
          <h2 style="border:none;margin:0">${editing._new ? "New project" : "Edit"} — ${esc(editing.id)}</h2>
          <div class="actions"><button class="btn ghost" id="cancel">← Back</button><button class="btn" id="save">Save</button></div>
        </div>
        <div class="row cols-2" style="margin-top:10px">
          <div><label>Title</label><input data-bind="data.title" value="${esc(d.title)}"/></div>
          <div><label>Client</label><input data-bind="data.client" value="${esc(d.client)}"/></div>
        </div>
        <div class="row cols-3" style="margin-top:14px">
          <div><label>Year</label><input data-bind="data.year" value="${esc(d.year)}"/></div>
          <div><label>Category</label><select data-bind="category">${CATS.map((c) => `<option ${c === editing.category ? "selected" : ""}>${esc(c)}</option>`).join("")}</select></div>
          <div><label>Role</label><input data-bind="data.role" value="${esc(d.role)}"/></div>
        </div>
        <div class="row cols-2" style="margin-top:14px">
          <div><label>Accent colour</label><input type="color" data-bind="data.accent" value="${esc(d.accent || "#8d8a84")}"/></div>
          <div><label>Card background</label><input type="color" data-bind="data.bg" value="${esc(d.bg || "#111111")}"/></div>
        </div>
        <div style="margin-top:14px"><label>Summary (one line, shown on cards & case intro)</label><input data-bind="data.summary" value="${esc(d.summary)}"/></div>
        <div style="margin-top:14px"><label>Description (full case intro paragraph)</label><textarea data-bind="data.description">${esc(d.description)}</textarea></div>
      </div>

      <div class="section"><h2>Hero / cover media</h2>${mediaSlot("data.hero", d.hero)}</div>

      <div class="section"><h2>Product intel — the stats (e.g. “16→1”, “1,200 employees”)</h2>
        <div class="stack" id="stats">${statRows}</div>
        <button class="addbtn" id="addstat" style="margin-top:10px">+ Add stat</button></div>

      <div class="section"><h2>Credits (one per line)</h2>
        <textarea data-bind-lines="data.team" placeholder="Creative Direction — Nathalia Cury">${esc((d.team || []).join("\n"))}</textarea></div>

      <div class="section"><h2>Case modules — stack images, video, 2-up, text, quotes</h2>
        <div class="stack" id="blocks">${blocks || '<p class="muted">No modules yet.</p>'}</div>
        <div class="row cols-3" style="margin-top:12px">
          <button class="addbtn" data-add="image">+ Image</button>
          <button class="addbtn" data-add="video">+ Video</button>
          <button class="addbtn" data-add="two-up">+ Two-up</button>
        </div>
        <div class="row cols-2" style="margin-top:10px">
          <button class="addbtn" data-add="text">+ Text</button>
          <button class="addbtn" data-add="quote">+ Quote</button>
        </div>
      </div>`);

    document.getElementById("cancel").onclick = () => { editing = null; renderApp(); };
    document.getElementById("save").onclick = saveProject;
    document.getElementById("addstat").onclick = () => { harvest(); d.stats.push({ value: "", label: "" }); renderProjectEditor(); };
    document.getElementById("stats").querySelectorAll("[data-del-stat]").forEach((b) => b.onclick = () => { harvest(); d.stats.splice(+b.dataset.delStat, 1); renderProjectEditor(); });
    app.querySelectorAll("[data-add]").forEach((b) => b.onclick = () => { harvest(); addBlock(b.dataset.add); });
    wireBlockEvents();
    wireMedia();
  }

  function blockEditor(b, i) {
    let inner = "";
    if (b.type === "image") inner = mediaSlot(`data.blocks.${i}`, b) + `<div style="margin-top:8px"><label>Caption (optional)</label><input data-bind="data.blocks.${i}.caption" value="${esc(b.caption || "")}"/></div>`;
    else if (b.type === "video") inner = mediaSlot(`data.blocks.${i}`, b);
    else if (b.type === "two-up") inner = `<div class="row cols-2"><div><label>Left</label>${mediaSlot(`data.blocks.${i}.a`, b.a)}</div><div><label>Right</label>${mediaSlot(`data.blocks.${i}.b`, b.b)}</div></div>`;
    else if (b.type === "text") inner = `<textarea data-bind="data.blocks.${i}.text" placeholder="Paragraph…">${esc(b.text || "")}</textarea>`;
    else if (b.type === "quote") inner = `<textarea data-bind="data.blocks.${i}.text" placeholder="Quote…">${esc(b.text || "")}</textarea><div style="margin-top:8px"><label>Cite (optional)</label><input data-bind="data.blocks.${i}.cite" value="${esc(b.cite || "")}"/></div>`;
    return `<div class="item" data-block="${i}">
      <div class="head"><span class="t">${b.type.toUpperCase()}</span>
        <div class="actions"><button class="btn ghost sm" data-bmove="-1">↑</button><button class="btn ghost sm" data-bmove="1">↓</button><button class="btn ghost sm danger" data-bdel>✕</button></div></div>
      ${inner}</div>`;
  }
  function addBlock(type) {
    const b = { type };
    if (type === "two-up") { b.a = null; b.b = null; }
    editing.data.blocks.push(b); renderProjectEditor();
  }
  function wireBlockEvents() {
    app.querySelectorAll("[data-block]").forEach((el) => {
      const i = +el.dataset.block;
      el.querySelector("[data-bdel]").onclick = () => { harvest(); editing.data.blocks.splice(i, 1); renderProjectEditor(); };
      el.querySelector('[data-bmove="-1"]').onclick = () => moveBlock(i, -1);
      el.querySelector('[data-bmove="1"]').onclick = () => moveBlock(i, 1);
    });
  }
  function moveBlock(i, dir) { harvest(); const j = i + dir, arr = editing.data.blocks; if (j < 0 || j >= arr.length) return; [arr[i], arr[j]] = [arr[j], arr[i]]; renderProjectEditor(); }

  /* read all bound inputs into editing */
  function harvest() {
    app.querySelectorAll("[data-bind]").forEach((el) => { setPath(editing, el.dataset.bind, el.value); });
    app.querySelectorAll("[data-bind-lines]").forEach((el) => { setPath(editing, el.dataset.bindLines, el.value.split("\n").map((s) => s.trim()).filter(Boolean)); });
  }

  async function saveProject() {
    harvest();
    const d = editing.data;
    d.stats = (d.stats || []).filter((s) => s.value || s.label);
    d.blocks = (d.blocks || []).filter((b) => b && b.type);
    const row = { id: editing.id, position: editing.position, featured_position: editing.featured_position, category: editing.category, published: true, data: d };
    const { error } = await sb.from("projects").upsert(row, { onConflict: "id" });
    if (error) return toast(error.message, true);
    const idx = projects.findIndex((p) => p.id === editing.id);
    if (idx >= 0) projects[idx] = row; else projects.push(row);
    editing = null; renderApp(); toast("Project saved ✓");
  }

  /* ===================== MEDIA + FOCAL ===================== */
  function mediaSlot(path, m) {
    const src = m && (typeof m === "object" ? m.src : m);
    const fx = m && typeof m === "object" ? m.focalX : null;
    const fy = m && typeof m === "object" ? m.focalY : null;
    const preview = src ? (isVid(src) ? `<video src="${esc(src)}" muted></video>` : `<img src="${esc(src)}" />`) : "No media";
    const marker = src && fx != null ? `<span class="focal" style="left:${fx}%;top:${fy}%"></span>` : "";
    return `<div class="media ${src ? "pickable" : "empty"}" data-focal="${path}">${preview}${marker}</div>
      <div class="kv" style="margin-top:8px"><input type="file" accept="image/*,video/*" data-upload="${path}"/>${src ? `<button class="btn ghost sm" data-clear="${path}">Remove</button>` : ""}</div>
      <div class="hint">${src ? "Click the preview to set the focal point (mobile crop)." : "Upload an image, GIF or video."}</div>`;
  }
  function wireMedia() {
    app.querySelectorAll("[data-upload]").forEach((inp) => inp.onchange = async (e) => {
      const file = e.target.files[0]; if (!file) return;
      harvest(); toast("Uploading…");
      try {
        const url = await uploadFile(file);
        const path = inp.dataset.upload;
        const cur = getPath(editing, path) || {};
        setPath(editing, path, { src: url, focalX: (cur.focalX != null ? cur.focalX : 50), focalY: (cur.focalY != null ? cur.focalY : 50), poster: cur.poster });
        renderProjectEditor(); toast("Uploaded ✓");
      } catch (err) { toast(err.message || "Upload failed", true); }
    });
    app.querySelectorAll("[data-clear]").forEach((b) => b.onclick = () => { harvest(); setPath(editing, b.dataset.clear, null); renderProjectEditor(); });
    app.querySelectorAll(".media.pickable[data-focal]").forEach((el) => el.onclick = (e) => {
      const r = el.getBoundingClientRect();
      const x = Math.round(((e.clientX - r.left) / r.width) * 100), y = Math.round(((e.clientY - r.top) / r.height) * 100);
      harvest();
      const path = el.dataset.focal; const cur = getPath(editing, path); if (!cur) return;
      const obj = typeof cur === "object" ? cur : { src: cur };
      obj.focalX = Math.max(0, Math.min(100, x)); obj.focalY = Math.max(0, Math.min(100, y));
      setPath(editing, path, obj); renderProjectEditor();
    });
  }
  async function uploadFile(file) {
    const ext = (file.name.split(".").pop() || "bin").toLowerCase();
    const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const { error } = await sb.storage.from(cfg.bucket || "media").upload(path, file, { contentType: file.type, upsert: false });
    if (error) throw error;
    return sb.storage.from(cfg.bucket || "media").getPublicUrl(path).data.publicUrl;
  }

  /* ===================== SITE & HERO ===================== */
  function renderSite() {
    const p = site.profile || (site.profile = {});
    const slides = (p.heroSlides || []).map((s, i) => {
      const src = typeof s === "object" ? s.src : s, fx = typeof s === "object" ? s.focalX : null, fy = typeof s === "object" ? s.focalY : null;
      const prev = src ? (isVid(src) ? `<video src="${esc(src)}" muted></video>` : `<img src="${esc(src)}"/>`) : "No media";
      const marker = src && fx != null ? `<span class="focal" style="left:${fx}%;top:${fy}%"></span>` : "";
      return `<div class="item"><div class="head"><span class="t">Slide ${i + 1}</span><div class="actions"><button class="btn ghost sm" data-smove="${i}:-1">↑</button><button class="btn ghost sm" data-smove="${i}:1">↓</button><button class="btn ghost sm danger" data-sdel="${i}">✕</button></div></div>
        <div class="media ${src ? "pickable" : "empty"}" data-sfocal="${i}">${prev}${marker}</div>
        <div class="kv" style="margin-top:8px"><input type="file" accept="image/*,video/*" data-supload="${i}"/></div>
        <div class="hint">Click preview to set the focal point.</div></div>`;
    }).join("");

    shell(`
      <div class="section">
        <div style="display:flex;justify-content:space-between;align-items:center"><h2 style="border:none;margin:0">Profile & statement</h2><button class="btn" id="savesite">Save site</button></div>
        <div style="margin-top:12px"><label>Statement (wrap words in *asterisks* for the grey accent)</label><textarea data-sbind="profile.statement">${esc(p.statement || "")}</textarea></div>
        <div class="row cols-2" style="margin-top:14px">
          <div><label>Role</label><input data-sbind="profile.role" value="${esc(p.role || "")}"/></div>
          <div><label>Location</label><input data-sbind="profile.location" value="${esc(p.location || "")}"/></div>
        </div>
        <div style="margin-top:14px"><label>Hero intro line</label><input data-sbind="profile.heroIntro" value="${esc(p.heroIntro || "")}"/></div>
        <div style="margin-top:14px"><label>Availability line</label><input data-sbind="profile.available" value="${esc(p.available || "")}"/></div>
      </div>

      <div class="section"><h2>Hero carousel slides</h2>
        <div class="stack" id="slides">${slides || '<p class="muted">No slides.</p>'}</div>
        <button class="addbtn" id="addslide" style="margin-top:12px">+ Add slide (upload)</button>
        <input type="file" id="slidefile" accept="image/*,video/*" style="display:none"/></div>

      <div class="section"><h2>Contact</h2>
        <div class="row cols-2">
          <div><label>Email (Say Hello / mailto)</label><input data-sbind="profile.email" value="${esc(p.email || "")}"/></div>
          <div><label>Instagram URL</label><input data-sbind="profile.instagram" value="${esc(p.instagram || "")}"/></div>
        </div>
        <div class="row cols-2" style="margin-top:14px">
          <div><label>Instagram handle</label><input data-sbind="profile.instagramHandle" value="${esc(p.instagramHandle || "")}"/></div>
          <div><label>LinkedIn URL</label><input data-sbind="profile.linkedin" value="${esc(p.linkedin || "")}"/></div>
        </div>
      </div>

      <div class="section"><h2>About</h2>
        <div><label>Headline</label><textarea data-sbind="about.headline">${esc((site.about && site.about.headline) || "")}</textarea></div>
        <div style="margin-top:14px"><label>Paragraphs (one per line)</label><textarea data-sbind-lines="about.paragraphs" style="min-height:140px">${esc(((site.about && site.about.paragraphs) || []).join("\n"))}</textarea></div>
      </div>`);

    document.getElementById("savesite").onclick = saveSite;
    document.getElementById("addslide").onclick = () => document.getElementById("slidefile").click();
    document.getElementById("slidefile").onchange = async (e) => {
      const f = e.target.files[0]; if (!f) return; harvestSite(); toast("Uploading…");
      try { const url = await uploadFile(f); p.heroSlides = p.heroSlides || []; p.heroSlides.push({ src: url, focalX: 50, focalY: 50 }); renderSite(); toast("Added ✓"); }
      catch (err) { toast(err.message, true); }
    };
    app.querySelectorAll("[data-supload]").forEach((inp) => inp.onchange = async (e) => {
      const f = e.target.files[0]; if (!f) return; harvestSite(); toast("Uploading…");
      try { const url = await uploadFile(f); const i = +inp.dataset.supload; const cur = p.heroSlides[i]; const fo = typeof cur === "object" ? cur : {}; p.heroSlides[i] = { src: url, focalX: fo.focalX != null ? fo.focalX : 50, focalY: fo.focalY != null ? fo.focalY : 50 }; renderSite(); toast("Replaced ✓"); }
      catch (err) { toast(err.message, true); }
    });
    app.querySelectorAll("[data-sdel]").forEach((b) => b.onclick = () => { harvestSite(); p.heroSlides.splice(+b.dataset.sdel, 1); renderSite(); });
    app.querySelectorAll("[data-smove]").forEach((b) => b.onclick = () => { harvestSite(); const [i, dir] = b.dataset.smove.split(":").map(Number); const j = i + dir; if (j < 0 || j >= p.heroSlides.length) return; [p.heroSlides[i], p.heroSlides[j]] = [p.heroSlides[j], p.heroSlides[i]]; renderSite(); });
    app.querySelectorAll(".media.pickable[data-sfocal]").forEach((el) => el.onclick = (e) => {
      const r = el.getBoundingClientRect(); const x = Math.round(((e.clientX - r.left) / r.width) * 100), y = Math.round(((e.clientY - r.top) / r.height) * 100);
      harvestSite(); const i = +el.dataset.sfocal; const cur = p.heroSlides[i]; const obj = typeof cur === "object" ? cur : { src: cur };
      obj.focalX = Math.max(0, Math.min(100, x)); obj.focalY = Math.max(0, Math.min(100, y)); p.heroSlides[i] = obj; renderSite();
    });
  }
  function harvestSite() {
    app.querySelectorAll("[data-sbind]").forEach((el) => setPath(site, el.dataset.sbind, el.value));
    app.querySelectorAll("[data-sbind-lines]").forEach((el) => setPath(site, el.dataset.sbindLines, el.value.split("\n").map((s) => s.trim()).filter(Boolean)));
  }
  async function saveSite() {
    harvestSite();
    const { error } = await sb.from("site").upsert({ id: 1, data: site }, { onConflict: "id" });
    toast(error ? error.message : "Site saved ✓", !!error);
  }

  /* ===================== SEED ===================== */
  async function seedFromBuiltIn() {
    if (!confirm("Import your built-in content.js into the database? This overwrites existing rows with the same ids.")) return;
    const P = JSON.parse(JSON.stringify(window.PORTFOLIO));
    const siteData = { profile: P.profile, about: P.about, categories: P.categories, cv: P.cv, clients: P.clients };
    const feat = (P.profile.featured || []);
    const rows = P.projects.map((pr, i) => {
      const { id, category } = pr; const d = Object.assign({}, pr); delete d.id; delete d.category;
      return { id, position: i, featured_position: feat.indexOf(id) >= 0 ? feat.indexOf(id) : null, category, published: true, data: d };
    });
    toast("Seeding…");
    const e1 = (await sb.from("site").upsert({ id: 1, data: siteData }, { onConflict: "id" })).error;
    const e2 = (await sb.from("projects").upsert(rows, { onConflict: "id" })).error;
    if (e1 || e2) return toast((e1 || e2).message, true);
    await loadAndRender(); toast("Seeded ✓");
  }
})();
