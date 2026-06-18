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

  function srcOf(m) { return m ? (typeof m === "string" ? m : m.src) : null; }
  function projThumb(d) {
    return srcOf(d.cover) || srcOf(d.hero) || srcOf(d.images && d.images[0]) ||
      (d.blocks && (d.blocks.map((b) => srcOf(b.media) || srcOf(b.a)).find(Boolean))) || null;
  }

  /* ===================== PROJECT LIST ===================== */
  function renderProjectList() {
    const rows = projects.map((r) => {
      const d = r.data || {};
      const src = projThumb(d);
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
      data: { title: id, year: new Date().getFullYear() + "", accent: "#8d8a84", bg: "#111111", summary: "", description: "", role: "", team: [], stats: [], cover: null, hero: null, blocks: [] } };
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
        <div style="margin-top:10px"><label>Title (use the client / project name)</label><input data-bind="data.title" value="${esc(d.title)}"/></div>
        <div class="row cols-3" style="margin-top:14px">
          <div><label>Year</label><input data-bind="data.year" value="${esc(d.year)}"/></div>
          <div><label>Category</label><select data-bind="category">${CATS.map((c) => `<option ${c === editing.category ? "selected" : ""}>${esc(c)}</option>`).join("")}</select></div>
          <div><label>Role</label><input data-bind="data.role" value="${esc(d.role)}"/></div>
        </div>
        <div class="row cols-2" style="margin-top:14px">
          <div><label>Accent colour</label><input type="color" data-bind="data.accent" value="${esc(d.accent || "#8d8a84")}"/></div>
          <div><label>Card background</label><input type="color" data-bind="data.bg" value="${esc(d.bg || "#111111")}"/></div>
        </div>
        <div style="margin-top:14px"><label>Summary (one line, shown on cards, list & case lead)</label><input data-bind="data.summary" value="${esc(d.summary)}"/></div>
      </div>

      <div class="section"><h2>Card cover — shown in the grid &amp; featured (4:3)</h2>${mediaSlot("data.cover", d.cover, "4/3")}</div>
      <div class="section"><h2>Case hero — big image at the top of the project page (16:9)</h2>${mediaSlot("data.hero", d.hero, "16/9")}</div>

      <div class="section"><h2>Product intel — the stats (e.g. “16→1”, “1,200 employees”)</h2>
        <div class="stack" id="stats">${statRows}</div>
        <button class="addbtn" id="addstat" style="margin-top:10px">+ Add stat</button></div>

      <div class="section storycards"><h2>Case story — the collapsible side cards on the project page</h2>
        <div class="storycard">
          <label>Starting point</label>
          <textarea data-bind="data.description" placeholder="What was the brief, the challenge, the context…">${esc(d.description || "")}</textarea>
        </div>
        <div class="storycard">
          <label>Outcome</label>
          <textarea data-bind="data.outcome" placeholder="What was delivered, the impact, the result…">${esc(d.outcome || "")}</textarea>
        </div>
        <div class="storycard">
          <label>Credits (one per line)</label>
          <textarea data-bind-lines="data.team" placeholder="Creative Direction — Nathalia Cury">${esc((d.team || []).join("\n"))}</textarea>
        </div>
        <div class="storycard">
          <label>Link button URL (optional — shows a “View Project ↗” button)</label>
          <input data-bind="data.link" value="${esc(d.link || "")}" placeholder="https://…"/>
        </div>
      </div>

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
    if (b.type === "image") inner = mediaSlot(`data.blocks.${i}.media`, b.media, "16/9") + `<div style="margin-top:8px"><label>Caption (optional)</label><input data-bind="data.blocks.${i}.caption" value="${esc(b.caption || "")}"/></div>`;
    else if (b.type === "video") inner = mediaSlot(`data.blocks.${i}.media`, b.media, "16/9");
    else if (b.type === "two-up") inner = `<div class="row cols-2"><div><label>Left</label>${mediaSlot(`data.blocks.${i}.a`, b.a, "4/5")}</div><div><label>Right</label>${mediaSlot(`data.blocks.${i}.b`, b.b, "4/5")}</div></div>`;
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
  function mediaSlot(path, m, aspect) {
    aspect = aspect || "16/9";
    const src = m && (typeof m === "object" ? m.src : m);
    const fx = m && typeof m === "object" ? m.focalX : null;
    const fy = m && typeof m === "object" ? m.focalY : null;
    const vid = src && isVid(src);
    const preview = src ? (vid ? `<video src="${esc(src)}" muted></video>` : `<img src="${esc(src)}" />`) : "No media";
    const marker = src && fx != null ? `<span class="focal" style="left:${fx}%;top:${fy}%"></span>` : "";
    return `<div class="media ${src ? "pickable" : "empty"}" data-focal="${path}">${preview}${marker}</div>
      <div class="kv" style="margin-top:8px"><input type="file" accept="image/*,video/*" data-upload="${path}" data-aspect="${aspect}"/>${src && !vid ? `<button class="btn ghost sm" data-crop="${path}" data-aspect="${aspect}">Adjust crop</button>` : ""}${src ? `<button class="btn ghost sm" data-clear="${path}">Remove</button>` : ""}</div>
      <div class="hint">${src ? (vid ? "Video — click preview to set focal point." : "Click preview to set the focal point, or “Adjust crop” to re-frame.") : "Upload an image, GIF or video — you’ll crop &amp; it auto-compresses."}</div>`;
  }
  function wireMedia() {
    app.querySelectorAll("[data-upload]").forEach((inp) => inp.onchange = async (e) => {
      const file = e.target.files[0]; if (!file) return;
      harvest();
      try {
        const url = await processUpload(file, inp.dataset.aspect);
        if (!url) return;
        const path = inp.dataset.upload;
        const cur = getPath(editing, path) || {};
        setPath(editing, path, { src: url, focalX: 50, focalY: 50, poster: cur.poster });
        renderProjectEditor(); toast("Uploaded ✓");
      } catch (err) { toast(err.message || "Upload failed", true); }
    });
    app.querySelectorAll("[data-crop]").forEach((b) => b.onclick = async () => {
      harvest(); const path = b.dataset.crop; const cur = getPath(editing, path); const src = typeof cur === "object" ? cur.src : cur;
      if (!src) return;
      try { const blob = await openCropper(src, b.dataset.aspect); if (!blob) return; toast("Uploading…"); const url = await uploadBlob(blob); setPath(editing, path, { src: url, focalX: 50, focalY: 50 }); renderProjectEditor(); toast("Re-cropped ✓"); }
      catch (err) { toast(err.message || "Crop failed", true); }
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
    const ab = site.about || (site.about = {});
    const wk = site.work || (site.work = {});
    const BASEcv = (window.PORTFOLIO && window.PORTFOLIO.cv) || {};
    const cv = site.cv || (site.cv = JSON.parse(JSON.stringify(BASEcv)));
    // about stats + capabilities (repeatable)
    const aStatRows = (ab.stats || []).map((s, i) => `<div class="kv"><input data-sbind="about.stats.${i}.value" value="${esc(s.value || "")}" placeholder="15+"/><input data-sbind="about.stats.${i}.label" value="${esc(s.label || "")}" placeholder="Years in design"/><button class="btn ghost sm danger" data-del-astat="${i}">✕</button></div>`).join("");
    const capRows = (ab.capabilities || []).map((c, i) => `<div class="item"><div class="head"><span class="t">Capability ${i + 1}</span><button class="btn ghost sm danger" data-del-cap="${i}">✕</button></div><label>Title</label><input data-sbind="about.capabilities.${i}.title" value="${esc(c.title || "")}"/><div style="margin-top:10px"><label>Items (one per line)</label><textarea data-sbind-lines="about.capabilities.${i}.items">${esc((c.items || []).join("\n"))}</textarea></div></div>`).join("");
    // CV: one textarea per list, fields separated by " | "
    const cvLines = (arr, fields) => (arr || []).map((o) => fields.map((f) => o[f] || "").join(" | ").replace(/(\s*\|\s*)+$/, "")).join("\n");
    const softLines = (Array.isArray((cv.software || [])[0]) ? cv.software : [cv.software || []]).map((g) => (g || []).join(", ")).join("\n");
    const por = ab.portrait; const psrc = por && (typeof por === "object" ? por.src : por);
    const pfx = por && typeof por === "object" ? por.focalX : null, pfy = por && typeof por === "object" ? por.focalY : null;
    const pprev = psrc ? (isVid(psrc) ? `<video src="${esc(psrc)}" muted></video>` : `<img src="${esc(psrc)}"/>`) : "No media";
    const pmarker = psrc && pfx != null ? `<span class="focal" style="left:${pfx}%;top:${pfy}%"></span>` : "";
    const slides = (p.heroSlides || []).map((s, i) => {
      const src = typeof s === "object" ? s.src : s, fx = typeof s === "object" ? s.focalX : null, fy = typeof s === "object" ? s.focalY : null;
      const vid = src && isVid(src);
      const prev = src ? (vid ? `<video src="${esc(src)}" muted></video>` : `<img src="${esc(src)}"/>`) : "No media";
      const marker = src && fx != null ? `<span class="focal" style="left:${fx}%;top:${fy}%"></span>` : "";
      return `<div class="item"><div class="head"><span class="t">Slide ${i + 1}</span><div class="actions"><button class="btn ghost sm" data-smove="${i}:-1">↑</button><button class="btn ghost sm" data-smove="${i}:1">↓</button><button class="btn ghost sm danger" data-sdel="${i}">✕</button></div></div>
        <div class="media ${src ? "pickable" : "empty"}" data-sfocal="${i}">${prev}${marker}</div>
        <div class="kv" style="margin-top:8px"><input type="file" accept="image/*,video/*" data-supload="${i}"/>${src && !vid ? `<button class="btn ghost sm" data-scrop="${i}">Adjust crop</button>` : ""}</div>
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

      <div class="section"><h2>Work page intro (replaces the “Selected Work” headline)</h2>
        <textarea data-sbind="work.intro" placeholder="My work. An overview of recent case studies…">${esc(wk.intro || "")}</textarea></div>

      <div class="section"><h2>About</h2>
        <div><label>Headline</label><textarea data-sbind="about.headline">${esc(ab.headline || "")}</textarea></div>
        <div style="margin-top:14px"><label>Paragraphs (one per line)</label><textarea data-sbind-lines="about.paragraphs" style="min-height:140px">${esc((ab.paragraphs || []).join("\n"))}</textarea></div>
      </div>

      <div class="section"><h2>About — stats / highlights</h2>
        <div class="stack" id="astats">${aStatRows}</div>
        <button class="addbtn" id="addastat" style="margin-top:10px">+ Add stat</button></div>

      <div class="section"><h2>About — capabilities</h2>
        <div class="stack" id="caps">${capRows}</div>
        <button class="addbtn" id="addcap" style="margin-top:10px">+ Add capability</button></div>

      <div class="section"><h2>CV — one entry per line, fields separated by “ | ”</h2>
        <div><label>Professional Experience — period | role | place | emoji</label><textarea data-sbind-cv="experience" data-fields="period|role|place|emoji" style="min-height:150px">${esc(cvLines(cv.experience, ["period", "role", "place", "emoji"]))}</textarea></div>
        <div style="margin-top:14px"><label>International Experience — period | role | place | emoji</label><textarea data-sbind-cv="international" data-fields="period|role|place|emoji" style="min-height:150px">${esc(cvLines(cv.international, ["period", "role", "place", "emoji"]))}</textarea></div>
        <div style="margin-top:14px"><label>Awards & Nominations — year | title | emoji</label><textarea data-sbind-cv="awards" data-fields="year|title|emoji" style="min-height:150px">${esc(cvLines(cv.awards, ["year", "title", "emoji"]))}</textarea></div>
        <div style="margin-top:14px"><label>Lectures, Workshops & Exhibitions — year | title | kind | emoji</label><textarea data-sbind-cv="lectures" data-fields="year|title|kind|emoji" style="min-height:150px">${esc(cvLines(cv.lectures, ["year", "title", "kind", "emoji"]))}</textarea></div>
        <div style="margin-top:14px"><label>Education — period | title | place | emoji</label><textarea data-sbind-cv="education" data-fields="period|title|place|emoji" style="min-height:110px">${esc(cvLines(cv.education, ["period", "title", "place", "emoji"]))}</textarea></div>
        <div style="margin-top:14px"><label>Languages — name | level | emoji</label><textarea data-sbind-cv="languages" data-fields="name|level|emoji" style="min-height:90px">${esc(cvLines(cv.languages, ["name", "level", "emoji"]))}</textarea></div>
        <div style="margin-top:14px"><label>Software & Tools — one cluster per line, tools separated by commas</label><textarea data-sbind-soft="1" style="min-height:90px">${esc(softLines)}</textarea></div>
      </div>

      <div class="section"><h2>About portrait (vertical 9:16)</h2>
        <div style="max-width:280px">
          <div class="media ${psrc ? "pickable" : "empty"}" data-pfocal>${pprev}${pmarker}</div>
          <div class="kv" style="margin-top:8px"><input type="file" accept="image/*,video/*" id="pupload"/>${psrc ? '<button class="btn ghost sm" id="pcrop">Adjust crop</button>' : ""}${psrc ? '<button class="btn ghost sm" id="pclear">Remove</button>' : ""}</div>
          <div class="hint">${psrc ? "Click preview to set focal point." : "Upload a vertical portrait (image or video) for the About section."}</div>
        </div>
      </div>`);

    document.getElementById("savesite").onclick = saveSite;
    document.getElementById("addastat").onclick = () => { harvestSite(); (ab.stats = ab.stats || []).push({ value: "", label: "" }); renderSite(); };
    app.querySelectorAll("[data-del-astat]").forEach((b) => b.onclick = () => { harvestSite(); ab.stats.splice(+b.dataset.delAstat, 1); renderSite(); });
    document.getElementById("addcap").onclick = () => { harvestSite(); (ab.capabilities = ab.capabilities || []).push({ title: "", items: [] }); renderSite(); };
    app.querySelectorAll("[data-del-cap]").forEach((b) => b.onclick = () => { harvestSite(); ab.capabilities.splice(+b.dataset.delCap, 1); renderSite(); });
    document.getElementById("addslide").onclick = () => document.getElementById("slidefile").click();
    document.getElementById("slidefile").onchange = async (e) => {
      const f = e.target.files[0]; if (!f) return; harvestSite();
      try { const url = await processUpload(f, "16/9"); if (!url) return; p.heroSlides = p.heroSlides || []; p.heroSlides.push({ src: url, focalX: 50, focalY: 50 }); renderSite(); toast("Added ✓"); }
      catch (err) { toast(err.message, true); }
    };
    app.querySelectorAll("[data-supload]").forEach((inp) => inp.onchange = async (e) => {
      const f = e.target.files[0]; if (!f) return; harvestSite();
      try { const url = await processUpload(f, "16/9"); if (!url) return; const i = +inp.dataset.supload; p.heroSlides[i] = { src: url, focalX: 50, focalY: 50 }; renderSite(); toast("Replaced ✓"); }
      catch (err) { toast(err.message, true); }
    });
    app.querySelectorAll("[data-scrop]").forEach((b) => b.onclick = async () => {
      harvestSite(); const i = +b.dataset.scrop; const cur = p.heroSlides[i]; const src = typeof cur === "object" ? cur.src : cur; if (!src) return;
      try { const blob = await openCropper(src, "16/9"); if (!blob) return; toast("Uploading…"); const url = await uploadBlob(blob); p.heroSlides[i] = { src: url, focalX: 50, focalY: 50 }; renderSite(); toast("Re-cropped ✓"); }
      catch (err) { toast(err.message || "Crop failed", true); }
    });
    app.querySelectorAll("[data-sdel]").forEach((b) => b.onclick = () => { harvestSite(); p.heroSlides.splice(+b.dataset.sdel, 1); renderSite(); });
    app.querySelectorAll("[data-smove]").forEach((b) => b.onclick = () => { harvestSite(); const [i, dir] = b.dataset.smove.split(":").map(Number); const j = i + dir; if (j < 0 || j >= p.heroSlides.length) return; [p.heroSlides[i], p.heroSlides[j]] = [p.heroSlides[j], p.heroSlides[i]]; renderSite(); });
    app.querySelectorAll(".media.pickable[data-sfocal]").forEach((el) => el.onclick = (e) => {
      const r = el.getBoundingClientRect(); const x = Math.round(((e.clientX - r.left) / r.width) * 100), y = Math.round(((e.clientY - r.top) / r.height) * 100);
      harvestSite(); const i = +el.dataset.sfocal; const cur = p.heroSlides[i]; const obj = typeof cur === "object" ? cur : { src: cur };
      obj.focalX = Math.max(0, Math.min(100, x)); obj.focalY = Math.max(0, Math.min(100, y)); p.heroSlides[i] = obj; renderSite();
    });
    // portrait handlers
    const pin = document.getElementById("pupload");
    if (pin) pin.onchange = async (e) => { const f = e.target.files[0]; if (!f) return; harvestSite(); try { const url = await processUpload(f, "9/16"); if (!url) return; ab.portrait = { src: url, focalX: 50, focalY: 50 }; renderSite(); toast("Portrait added ✓"); } catch (err) { toast(err.message, true); } };
    const pcr = document.getElementById("pcrop");
    if (pcr) pcr.onclick = async () => { harvestSite(); const src = typeof ab.portrait === "object" ? ab.portrait.src : ab.portrait; if (!src) return; try { const blob = await openCropper(src, "9/16"); if (!blob) return; toast("Uploading…"); const url = await uploadBlob(blob); ab.portrait = { src: url, focalX: 50, focalY: 50 }; renderSite(); toast("Re-cropped ✓"); } catch (err) { toast(err.message, true); } };
    const pcl = document.getElementById("pclear");
    if (pcl) pcl.onclick = () => { harvestSite(); ab.portrait = null; renderSite(); };
    const pf = app.querySelector(".media.pickable[data-pfocal]");
    if (pf) pf.onclick = (e) => { const r = pf.getBoundingClientRect(); harvestSite(); const cur = ab.portrait; const obj = typeof cur === "object" ? cur : { src: cur }; obj.focalX = Math.max(0, Math.min(100, Math.round(((e.clientX - r.left) / r.width) * 100))); obj.focalY = Math.max(0, Math.min(100, Math.round(((e.clientY - r.top) / r.height) * 100))); ab.portrait = obj; renderSite(); };
  }
  function harvestSite() {
    app.querySelectorAll("[data-sbind]").forEach((el) => setPath(site, el.dataset.sbind, el.value));
    app.querySelectorAll("[data-sbind-lines]").forEach((el) => setPath(site, el.dataset.sbindLines, el.value.split("\n").map((s) => s.trim()).filter(Boolean)));
    app.querySelectorAll("[data-sbind-cv]").forEach((el) => {
      const fields = (el.dataset.fields || "").split("|");
      const arr = el.value.split("\n").map((s) => s.trim()).filter(Boolean).map((line) => {
        const parts = line.split("|").map((x) => x.trim());
        const o = {}; fields.forEach((f, i) => { if (parts[i]) o[f] = parts[i]; }); return o;
      });
      setPath(site, "cv." + el.dataset.sbindCv, arr);
    });
    const soft = app.querySelector("[data-sbind-soft]");
    if (soft) setPath(site, "cv.software", soft.value.split("\n").map((s) => s.trim()).filter(Boolean).map((line) => line.split(",").map((x) => x.trim()).filter(Boolean)));
  }
  async function saveSite() {
    harvestSite();
    const { error } = await sb.from("site").upsert({ id: 1, data: site }, { onConflict: "id" });
    toast(error ? error.message : "Site saved ✓", !!error);
  }

  /* ===================== IMAGE PROCESSING + CROPPER ===================== */
  const MAXDIM = 2200, QUALITY = 0.82;
  function loadImage(src, cors) { return new Promise((res, rej) => { const i = new Image(); if (cors) i.crossOrigin = "anonymous"; i.onload = () => res(i); i.onerror = () => rej(new Error("load failed")); i.src = src; }); }
  const ASPECTS = [["Original", null], ["16:9", 16 / 9], ["3:2", 3 / 2], ["4:3", 4 / 3], ["1:1", 1], ["4:5", 4 / 5], ["9:16", 9 / 16]];
  function aspNum(a) { if (a == null || a === "original") return null; if (typeof a === "number") return a; const m = String(a).split(/[/:]/).map(Number); return m.length === 2 && m[1] ? m[0] / m[1] : null; }

  // Upload a Blob/File; images are re-encoded to compact WebP, videos pass through.
  async function uploadBlob(blob, ext) {
    ext = ext || "webp";
    const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const { error } = await sb.storage.from(cfg.bucket || "media").upload(path, blob, { contentType: blob.type || "image/webp", upsert: false });
    if (error) throw error;
    return sb.storage.from(cfg.bucket || "media").getPublicUrl(path).data.publicUrl;
  }

  // Open the pan/zoom cropper. Returns a compressed WebP Blob, or null if cancelled.
  function openCropper(srcOrFile, defAspect) {
    return new Promise(async (resolve) => {
      let img, objURL = null;
      try {
        if (typeof srcOrFile === "string") img = await loadImage(srcOrFile, true);
        else { objURL = URL.createObjectURL(srcOrFile); img = await loadImage(objURL, false); }
      } catch (e) { toast("Couldn’t load that image", true); return resolve(null); }
      const natW = img.naturalWidth, natH = img.naturalHeight;

      let aspect = aspNum(defAspect);
      let z = 1, ox = 0, oy = 0, stageW = 0, stageH = 0, cover = 1;
      const ov = document.createElement("div"); ov.className = "crop-ov";
      ov.innerHTML = `<div class="crop-box">
        <h3>Adjust crop — drag to move, zoom with the slider</h3>
        <div class="crop-stage" id="cstage"><img id="cimg" src="${img.src}"/></div>
        <div class="crop-controls">
          <label style="margin:0">Ratio</label>
          <select id="casp">${ASPECTS.map(([l, v]) => `<option value="${v == null ? "" : v}" ${v === aspect ? "selected" : ""}>${l}</option>`).join("")}</select>
          <div class="grow"><input id="czoom" type="range" min="1" max="4" step="0.01" value="1"/></div>
        </div>
        <div class="crop-actions">
          <button class="btn ghost" id="ccancel">Cancel</button>
          <button class="btn" id="capply">Apply</button>
        </div></div>`;
      document.body.appendChild(ov);
      const stage = ov.querySelector("#cstage"), im = ov.querySelector("#cimg");
      const zoom = ov.querySelector("#czoom"), aspSel = ov.querySelector("#casp");

      function layout() {
        const maxW = Math.min(680, window.innerWidth - 80);
        const a = aspect || (natW / natH);
        stageW = maxW; stageH = Math.round(maxW / a);
        const maxH = window.innerHeight - 230;
        if (stageH > maxH) { stageH = maxH; stageW = Math.round(stageH * a); }
        stage.style.width = stageW + "px"; stage.style.height = stageH + "px";
        cover = Math.max(stageW / natW, stageH / natH);
        clamp(); paint();
      }
      function clamp() {
        const dW = natW * cover * z, dH = natH * cover * z;
        ox = Math.min(0, Math.max(stageW - dW, ox)); oy = Math.min(0, Math.max(stageH - dH, oy));
        if (dW <= stageW) ox = (stageW - dW) / 2; if (dH <= stageH) oy = (stageH - dH) / 2;
      }
      function paint() { const dW = natW * cover * z, dH = natH * cover * z; im.style.width = dW + "px"; im.style.height = dH + "px"; im.style.left = ox + "px"; im.style.top = oy + "px"; }

      let drag = false, px = 0, py = 0;
      stage.addEventListener("pointerdown", (e) => { drag = true; px = e.clientX; py = e.clientY; stage.classList.add("drag"); stage.setPointerCapture(e.pointerId); });
      stage.addEventListener("pointermove", (e) => { if (!drag) return; ox += e.clientX - px; oy += e.clientY - py; px = e.clientX; py = e.clientY; clamp(); paint(); });
      stage.addEventListener("pointerup", () => { drag = false; stage.classList.remove("drag"); });
      zoom.addEventListener("input", () => { const cx = stageW / 2, cy = stageH / 2, oldz = z; z = +zoom.value; ox = cx - (cx - ox) * (z / oldz); oy = cy - (cy - oy) * (z / oldz); clamp(); paint(); });
      aspSel.addEventListener("change", () => { aspect = aspSel.value === "" ? null : +aspSel.value; z = 1; zoom.value = 1; ox = oy = 0; layout(); });
      window.addEventListener("resize", layout);

      ov.querySelector("#ccancel").onclick = () => { cleanup(); resolve(null); };
      ov.querySelector("#capply").onclick = () => {
        const sx = (-ox) / (cover * z), sy = (-oy) / (cover * z), sw = stageW / (cover * z), sh = stageH / (cover * z);
        const ratio = stageW / stageH; let outW, outH;
        if (stageW >= stageH) { outW = Math.min(MAXDIM, Math.round(sw)); outH = Math.round(outW / ratio); }
        else { outH = Math.min(MAXDIM, Math.round(sh)); outW = Math.round(outH * ratio); }
        const c = document.createElement("canvas"); c.width = outW; c.height = outH;
        const ctx = c.getContext("2d"); ctx.imageSmoothingQuality = "high";
        try { ctx.drawImage(img, sx, sy, sw, sh, 0, 0, outW, outH); }
        catch (e) { cleanup(); toast("This image blocks cropping — re-upload it instead.", true); return resolve(null); }
        c.toBlob((blob) => { cleanup(); resolve(blob); }, "image/webp", QUALITY);
      };
      function cleanup() { window.removeEventListener("resize", layout); if (objURL) URL.revokeObjectURL(objURL); ov.remove(); }
      layout();
    });
  }

  // Route a chosen file through crop+compress (images) or straight upload (video). Returns url|null.
  async function processUpload(file, aspect) {
    if (file.type.startsWith("video") || isVid(file.name)) { toast("Uploading video…"); return await uploadFile(file); }
    const blob = await openCropper(file, aspect); if (!blob) return null;
    toast("Uploading…"); return await uploadBlob(blob);
  }

  /* ===================== SEED ===================== */
  async function seedFromBuiltIn() {
    if (!confirm("Import your built-in content.js into the database? This overwrites existing rows with the same ids.")) return;
    const P = JSON.parse(JSON.stringify(window.PORTFOLIO));
    const siteData = { profile: P.profile, about: P.about, categories: P.categories, cv: P.cv, clients: P.clients, work: P.work };
    const feat = (P.profile.featured || []);
    const rows = P.projects.map((pr, i) => {
      const { id, category } = pr; const d = Object.assign({}, pr); delete d.id; delete d.category;
      if (!d.hero && d.images && d.images[0]) d.hero = d.images[0];   // show in editor
      return { id, position: i, featured_position: feat.indexOf(id) >= 0 ? feat.indexOf(id) : null, category, published: true, data: d };
    });
    toast("Seeding…");
    const e1 = (await sb.from("site").upsert({ id: 1, data: siteData }, { onConflict: "id" })).error;
    const e2 = (await sb.from("projects").upsert(rows, { onConflict: "id" })).error;
    if (e1 || e2) return toast((e1 || e2).message, true);
    await loadAndRender(); toast("Seeded ✓");
  }
})();
