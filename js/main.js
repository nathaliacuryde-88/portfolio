/* =====================================================================
   NATHALIA CURY — PORTFOLIO ENGINE · v3
   Big-image hero · video/GIF media · Phantom-style cases · light/dark.
   ===================================================================== */
(function () {
  "use strict";
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isTouch = window.matchMedia("(hover: none)").matches;
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const STORE = "nc_overrides_v3";
  const THEME = "nc_theme";

  const BASE = window.PORTFOLIO;
  let data = clone(BASE);
  applyOverrides();
  let currentCase = null;

  function clone(o) { return JSON.parse(JSON.stringify(o)); }
  function applyOverrides() { try { const o = JSON.parse(localStorage.getItem(STORE) || "null"); if (o) data = merge(clone(BASE), o); } catch (e) {} }
  function merge(t, s) { for (const k in s) { if (s[k] && typeof s[k] === "object" && !Array.isArray(s[k])) t[k] = merge(t[k] || {}, s[k]); else t[k] = s[k]; } return t; }
  function esc(s) { return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
  function attr(s) { return String(s).replace(/'/g, "&#39;").replace(/"/g, "&quot;"); }

  /* -------- MEDIA: image / GIF / video by extension (or object) -------- */
  function media(item, opts = {}) {
    if (!item) return "";
    let src = item, poster = "";
    if (typeof item === "object") { src = item.src; poster = item.poster || ""; }
    if (!src) return "";
    const isVideo = /\.(mp4|webm|mov|m4v)$/i.test(src);
    if (isVideo) {
      return `<video src="${esc(src)}" autoplay muted loop playsinline ${poster ? `poster="${esc(poster)}"` : ""}></video>`;
    }
    return `<img src="${esc(src)}" alt="${esc(opts.alt || "")}" loading="${opts.eager ? "eager" : "lazy"}" />`;
  }
  function firstMedia(pr) {
    if (pr.images && pr.images.length) return pr.images[0];
    return null;
  }

  /* -------- THEME (light default) -------- */
  function setTheme(t) {
    document.documentElement.setAttribute("data-theme", t);
    localStorage.setItem(THEME, t);
    const m = $('meta[name=theme-color]'); if (m) m.content = t === "dark" ? "#0f0e0c" : "#f3f1ea";
  }
  setTheme(localStorage.getItem(THEME) || "light");

  /* =================== RENDER =================== */
  function render() {
    const p = data.profile;

    // HERO
    $("#heroMedia").innerHTML = media(p.heroMedia, { eager: true, alt: p.name });
    $("#heroEyebrow").textContent = p.role;
    $("#heroLoc").textContent = p.location + " · " + (p.available || "");
    $("#heroIntro").textContent = p.heroIntro;
    $("#heroStatement").innerHTML = statementHTML(p.statement);

    // FEATURED tiles
    const feat = (p.featured || []).map((id) => data.projects.find((x) => x.id === id)).filter(Boolean);
    $("#featured").innerHTML = feat.map((pr) => {
      const m = firstMedia(pr);
      const inner = m ? media(m, { alt: pr.title }) : `<canvas data-cover='${attr(JSON.stringify(pr.cover || { colors: [pr.bg, pr.accent] }))}' data-seed="${esc(pr.id)}-f" data-label="${esc(pr.title)}"></canvas>`;
      return `<div class="ftile" data-id="${esc(pr.id)}" data-cursor="view" style="--accent:${esc(pr.accent)}">${inner}
        <div class="ftile__cap"><h3>${esc(pr.title)}</h3><span>${esc(pr.category)} · ${esc(pr.year)}</span></div></div>`;
    }).join("");

    // CLIENTS marquee
    const c = data.clients.map((x) => `<span>${esc(x)}<b> · </b></span>`).join("");
    $("#clients").innerHTML = c + c + c + c;

    // FILTERS + GRID
    $("#filters").innerHTML = data.categories.map((cat, i) => `<button role="tab" data-cat="${esc(cat)}" class="${i ? "" : "active"}">${esc(cat)}</button>`).join("");
    renderGrid("All");

    // ABOUT
    $("#aboutHeadline").textContent = data.about.headline;
    $("#aboutHeadline").setAttribute("data-edit", "about.headline");
    $("#aboutBody").innerHTML = data.about.paragraphs.map((t, i) => `<p data-fx data-edit="about.paragraphs.${i}">${esc(t)}</p>`).join("");
    $("#aboutStats").innerHTML = data.about.stats.map((s) => `<div class="stat" data-fx><div class="v">${esc(s.value)}</div><div class="l">${esc(s.label)}</div></div>`).join("");
    $("#aboutCaps").innerHTML = data.about.capabilities.map((cap) => `<div class="cap" data-fx><h4>${esc(cap.title)}</h4><ul>${cap.items.map((i) => `<li>${esc(i)}</li>`).join("")}</ul></div>`).join("");

    renderCV();

    // CONTACT / FOOTER
    $("#contactMail").textContent = p.email;
    $("#contactMail").href = "mailto:" + p.email;
    $("#contactRow").innerHTML = `<a href="${esc(p.linkedin)}" target="_blank" rel="noopener" data-cursor="">LinkedIn ↗</a><a href="tel:${esc(p.phone.replace(/\s/g, ""))}">${esc(p.phone)}</a><span>${esc(p.location)}</span><span>${esc(p.available)}</span>`;
    $("#footerName").textContent = "© " + p.name + " — Stuttgart";
    $("#year").textContent = new Date().getFullYear();
    $("#menuFoot").innerHTML = `<a href="mailto:${esc(p.email)}">${esc(p.email)}</a><span>${esc(p.location)}</span><a href="${esc(p.linkedin)}" target="_blank" rel="noopener">LinkedIn ↗</a>`;

    bindAll();
  }

  function statementHTML(str) {
    return str.split(/(\s+)/).map((tk) => {
      if (/^\s+$/.test(tk)) return " ";
      const m = tk.match(/^\*(.+?)\*([.,&]?)$/);
      const content = m ? `<em>${esc(m[1] + (m[2] || ""))}</em>` : esc(tk);
      return `<span class="word"><span>${content}</span></span> `;
    }).join("");
  }

  function renderGrid(filter) {
    const g = $("#grid");
    g.innerHTML = data.projects.map((pr) => {
      const hide = filter !== "All" && pr.category !== filter ? "is-hidden" : "";
      const m = firstMedia(pr);
      const inner = m
        ? media(m, { alt: pr.title })
        : `<canvas data-cover='${attr(JSON.stringify(pr.cover || { colors: [pr.bg, pr.accent], kind: "abstract" }))}' data-seed="${esc(pr.id)}" data-label="${esc(pr.title)}"></canvas>`;
      return `<article class="card ${hide}" data-id="${esc(pr.id)}" data-cat="${esc(pr.category)}" data-cursor="view" style="--accent:${esc(pr.accent)}">
        <div class="card__media" style="background:${esc(pr.bg)}">${inner}<span class="card__bar"></span></div>
        <div class="card__meta"><h3 class="card__title">${esc(pr.title)}</h3><span class="card__tag"><i></i>${esc(pr.category)} · ${esc(pr.year)}</span></div>
        <p class="card__summary">${esc(pr.summary)}</p>
      </article>`;
    }).join("");
    paintCanvases(g);
  }

  function renderCV() {
    const cv = data.cv, rows = (a, f) => a.map(f).join("");
    const blk = (t, items, f) => `<div class="cv-block"><h3>${t}</h3>${rows(items, f)}</div>`;
    $("#cvGrid").innerHTML = [
      blk("Professional Experience", cv.experience, (e) => `<div class="cv-row"><span class="p">${esc(e.period)}</span><span class="r">${esc(e.role)}<small>${esc(e.place)}</small></span></div>`),
      blk("International", cv.international, (e) => `<div class="cv-row"><span class="p">${esc(e.period)}</span><span class="r">${esc(e.role)}<small>${esc(e.place)}</small></span></div>`),
      blk("Awards & Nominations", cv.awards, (a) => `<div class="cv-row"><span class="p">${esc(a.year)}</span><span class="r">${esc(a.title)}</span></div>`),
      blk("Lectures, Workshops & Exhibitions", cv.lectures, (l) => `<div class="cv-row"><span class="p">${esc(l.year)}</span><span class="r">${esc(l.title)}<small>${esc(l.kind)}</small></span></div>`),
      `<div class="cv-block"><h3>Education</h3>${rows(cv.education, (e) => `<div class="cv-row"><span class="p">${esc(e.period)}</span><span class="r">${esc(e.title)}<small>${esc(e.place)}</small></span></div>`)}<h3 style="margin-top:34px">Languages</h3>${rows(cv.languages, (l) => `<div class="cv-row"><span class="p">${esc(l.level)}</span><span class="r">${esc(l.name)}</span></div>`)}</div>`,
      `<div class="cv-block"><h3>Software & Tools</h3><div class="cv-tags">${cv.software.map((s) => `<span>${esc(s)}</span>`).join("")}</div></div>`,
    ].join("");
  }

  /* =================== CASE STUDY (Phantom-like) =================== */
  function openCase(id, fromNav) {
    const list = data.projects;
    const idx = list.findIndex((x) => x.id === id);
    if (idx < 0) return;
    const pr = list[idx];
    currentCase = id;
    document.documentElement.style.setProperty("--accent", pr.accent);

    const heroM = firstMedia(pr);
    const heroInner = heroM ? media(heroM, { eager: true, alt: pr.title })
      : `<canvas data-cover='${attr(JSON.stringify(pr.cover || { colors: [pr.bg, pr.accent] }))}' data-seed="${esc(pr.id)}-h" data-label="${esc(pr.title)}"></canvas>`;

    // meta box
    const metaRows = [
      ["Client", pr.client], ["Year", pr.year], ["Discipline", pr.category], ["Role", pr.role],
    ].map(([k, v]) => `<div class="m"><span>${esc(k)}</span><span>${esc(v)}</span></div>`).join("");

    // intel / stats
    const stats = (pr.stats || []).map((s) => `<div class="case__stat" data-fx><div class="v">${esc(s.value)}</div><div class="l">${esc(s.label)}</div></div>`).join("");

    // gallery rhythm: full-bleed, then 2-up, alternating
    const rest = (pr.images || []).slice(1);
    let gal = "", i = 0;
    while (i < rest.length) {
      gal += `<div class="case__shot case__shot--wide" data-fx>${media(rest[i], { alt: "" })}</div>`; i++;
      if (i + 1 < rest.length) {
        gal += `<div class="case__row"><div class="case__shot" data-fx>${media(rest[i], { alt: "" })}</div><div class="case__shot" data-fx>${media(rest[i + 1], { alt: "" })}</div></div>`;
        i += 2;
      } else if (i < rest.length) {
        gal += `<div class="case__shot case__shot--wide" data-fx>${media(rest[i], { alt: "" })}</div>`; i++;
      }
    }

    // credits
    const credits = (pr.team || []).map((t) => `<li>${esc(t)}</li>`).join("");

    // next project
    const next = list[(idx + 1) % list.length];
    const nextM = firstMedia(next);
    const nextImg = nextM ? media(nextM, { alt: next.title })
      : `<canvas data-cover='${attr(JSON.stringify(next.cover || { colors: [next.bg, next.accent] }))}' data-seed="${esc(next.id)}-n" data-label="${esc(next.title)}"></canvas>`;

    $("#caseScroll").innerHTML = `
      <div class="case__hero">${heroInner}</div>
      <div class="case__intro">
        <div><h1 class="case__title">${esc(pr.title)}</h1><p class="case__lead">${esc(pr.summary)}</p></div>
        <div class="case__meta">${metaRows}</div>
      </div>
      ${stats ? `<div class="case__stats">${stats}</div>` : ""}
      <div class="case__desc"><p>${esc(pr.description)}</p></div>
      ${gal ? `<div class="case__gallery">${gal}</div>` : ""}
      ${credits ? `<div class="case__credits"><h4>Credits</h4><ul>${credits}</ul></div>` : ""}
      <div class="case__next" data-id="${esc(next.id)}" data-cursor="view">
        <span class="k">Next project</span>
        <span class="t">${esc(next.title)} <span class="arrow">→</span></span>
        <div class="case__nextimg">${nextImg}</div>
      </div>`;

    paintCanvases($("#caseScroll"));
    $("#case").classList.add("open");
    $("#case").setAttribute("aria-hidden", "false");
    document.body.classList.add("lock");
    $("#caseScroll").scrollTop = 0;

    $("#case").querySelector(".case__next").addEventListener("click", () => openCase(next.id, true));
    bindCursor($("#caseScroll"));
    observe($("#caseScroll"));
    if (!fromNav) history.pushState({ case: id }, "", "#" + id);
    else history.replaceState({ case: id }, "", "#" + id);
  }

  function closeCase() {
    $("#case").classList.remove("open");
    $("#case").setAttribute("aria-hidden", "true");
    document.body.classList.remove("lock");
    currentCase = null;
    document.documentElement.style.removeProperty("--accent");
    if (location.hash) history.pushState("", "", location.pathname);
  }

  /* =================== GENERATED COVERS (AI projects only) =================== */
  function paintCanvases(scope) {
    $$("canvas[data-cover]", scope).forEach((cv) => {
      const cover = JSON.parse(cv.getAttribute("data-cover").replace(/&#39;/g, "'").replace(/&quot;/g, '"'));
      drawCover(cv, cover, cv.getAttribute("data-seed") || "x", cv.getAttribute("data-label") || "");
    });
  }
  function rng(s) { let h = 1779033703 ^ s.length; for (let i = 0; i < s.length; i++) { h = Math.imul(h ^ s.charCodeAt(i), 3432918353); h = (h << 13) | (h >>> 19); } return () => { h = Math.imul(h ^ (h >>> 16), 2246822507); h = Math.imul(h ^ (h >>> 13), 3266489909); return ((h ^= h >>> 16) >>> 0) / 4294967296; }; }
  function hex(h) { h = h.replace("#", ""); if (h.length === 3) h = h.split("").map((x) => x + x).join(""); const n = parseInt(h, 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; }
  function mix(a, b, t) { const x = hex(a), y = hex(b); return `rgb(${x.map((v, i) => Math.round(v + (y[i] - v) * t)).join(",")})`; }
  function rgba(h, a) { const [r, g, b] = hex(h); return `rgba(${r},${g},${b},${a})`; }
  function drawCover(c, cover, seed, label) {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = Math.max(c.clientWidth || 600, 320), h = Math.max(c.clientHeight || 450, 240);
    c.width = w * dpr; c.height = h * dpr; const x = c.getContext("2d"); x.scale(dpr, dpr);
    const r = rng(seed); const [c1, c2] = cover.colors || ["#111", "#ff4d2e"];
    const g = x.createLinearGradient(0, 0, w, h); g.addColorStop(0, c1); g.addColorStop(1, mix(c1, c2, 0.5));
    x.fillStyle = g; x.fillRect(0, 0, w, h);
    const kind = cover.kind || "abstract";
    if (kind === "grid") { const cols = 5 + ((r() * 4) | 0), cw = w / cols; for (let yy = 0; yy * cw < h + cw; yy++) for (let xx = 0; xx < cols; xx++) { if (r() > 0.78) { x.fillStyle = rgba(c2, 0.85); x.fillRect(xx * cw, yy * cw, cw, cw); } } }
    else if (kind === "type") { x.fillStyle = rgba("#fff", 0.92); x.font = `300 ${h * 1.1}px Fraunces, serif`; x.textBaseline = "middle"; x.textAlign = "center"; x.fillText((label || "N").trim()[0].toUpperCase(), w / 2, h * 0.54); x.strokeStyle = rgba(c2, 0.9); x.lineWidth = 2; x.strokeRect(w * 0.06, h * 0.06, w * 0.88, h * 0.88); }
    else { for (let i = 0; i < 5; i++) { x.globalAlpha = 0.5 + r() * 0.4; const rad = (0.25 + r() * 0.6) * w; const rg = x.createRadialGradient(r() * w, r() * h, 0, r() * w, r() * h, rad); rg.addColorStop(0, rgba(c2, 0.9)); rg.addColorStop(1, rgba(c2, 0)); x.fillStyle = rg; x.fillRect(0, 0, w, h); } x.globalAlpha = 1; }
    x.globalAlpha = 0.04; for (let i = 0; i < (w * h) / 700; i++) { x.fillStyle = r() > 0.5 ? "#fff" : "#000"; x.fillRect(r() * w, r() * h, 1, 1); } x.globalAlpha = 1;
  }

  /* =================== INTERACTIONS =================== */
  function bindAll() { observe(document); bindTiles(); bindCursor(document); bindEdit(); }

  let io;
  function observe(scope) {
    if (reduce) { $$("[data-fx], .card, .ftile", scope).forEach((e) => e.classList.add("in")); return; }
    if (!io) io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    $$("[data-fx], .card, .ftile", scope).forEach((e) => io.observe(e));
  }

  function bindTiles() {
    $$(".card", $("#grid")).forEach((el) => el.addEventListener("click", () => openCase(el.dataset.id)));
    $$(".ftile", $("#featured")).forEach((el) => el.addEventListener("click", () => openCase(el.dataset.id)));
  }

  function bindFilters() {
    $("#filters").addEventListener("click", (e) => {
      const b = e.target.closest("button[data-cat]"); if (!b) return;
      $$("#filters button").forEach((x) => x.classList.remove("active")); b.classList.add("active");
      renderGrid(b.dataset.cat); bindTiles(); observe($("#grid"));
    });
  }

  /* cursor */
  const cursor = $("#cursor"), cLabel = $(".cursor__label", cursor);
  let cx = 0, cy = 0, tx = 0, ty = 0;
  function cloop() { cx += (tx - cx) * 0.18; cy += (ty - cy) * 0.18; cursor.style.transform = `translate(${cx}px,${cy}px) translate(-50%,-50%)`; requestAnimationFrame(cloop); }
  if (!isTouch && !reduce) { window.addEventListener("mousemove", (e) => { tx = e.clientX; ty = e.clientY; }); cloop(); }
  function bindCursor(scope) {
    if (isTouch) return;
    $$("[data-cursor]", scope).forEach((el) => {
      if (el.__cur) return; el.__cur = 1;
      el.addEventListener("mouseenter", () => { cursor.classList.add("active"); cLabel.textContent = el.getAttribute("data-cursor") || ""; });
      el.addEventListener("mouseleave", () => { cursor.classList.remove("active"); cLabel.textContent = ""; });
    });
  }

  /* marquee */
  let mx = 0;
  function marquee() { const t = $("#clients"); if (t) { mx -= 0.4; const half = t.scrollWidth / 4; if (-mx >= half) mx = 0; t.style.transform = `translateX(${mx}px)`; } requestAnimationFrame(marquee); }
  if (!reduce) marquee();

  /* scroll: progress + nav */
  let lastY = 0;
  function onScroll() {
    const st = window.scrollY, h = document.documentElement.scrollHeight - window.innerHeight;
    $("#progress").style.width = (h > 0 ? (st / h) * 100 : 0) + "%";
    const nav = $("#nav");
    if (st > lastY && st > 500) nav.classList.add("hidden"); else nav.classList.remove("hidden");
    nav.classList.toggle("solid", st > window.innerHeight * 0.7);
    lastY = st;
  }
  window.addEventListener("scroll", onScroll, { passive: true });

  /* loader */
  function loader() {
    const l = $("#loader"), cnt = $("#loaderCount");
    if (reduce) { l.classList.add("done"); $("#hero").classList.add("ready"); return; }
    let n = 0; const t = setInterval(() => { n += (Math.random() * 16 + 6) | 0; if (n >= 100) { n = 100; clearInterval(t); setTimeout(() => { l.classList.add("done"); $("#hero").classList.add("ready"); }, 320); } cnt.textContent = n; }, 110);
  }

  /* menu */
  function bindMenu() {
    const nav = $("#nav"), menu = $("#menu"), btn = $("#navMenu");
    const toggle = (o) => { nav.classList.toggle("open", o); menu.classList.toggle("open", o); menu.setAttribute("aria-hidden", !o); btn.setAttribute("aria-expanded", o); document.body.classList.toggle("lock", o); };
    btn.addEventListener("click", () => toggle(!menu.classList.contains("open")));
    $$("#menu a").forEach((a) => a.addEventListener("click", () => toggle(false)));
  }

  /* anchors */
  function bindAnchors() {
    $$('a[href^="#"]').forEach((a) => a.addEventListener("click", (e) => {
      const id = a.getAttribute("href"); if (id.length < 2) return;
      const t = document.querySelector(id); if (t) { e.preventDefault(); t.scrollIntoView({ behavior: reduce ? "auto" : "smooth" }); }
    }));
  }

  /* theme toggle */
  function bindTheme() { $("#themeToggle").addEventListener("click", () => setTheme(document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark")); }

  /* case close + history */
  function bindCase() {
    $("#caseClose").addEventListener("click", closeCase);
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") { if ($("#case").classList.contains("open")) closeCase(); else if (editing) toggleEdit(false); } });
    window.addEventListener("popstate", () => { const h = location.hash.slice(1); if (h && data.projects.some((p) => p.id === h)) openCase(h, true); else if ($("#case").classList.contains("open")) closeCase(); });
  }

  /* print */
  function bindPrint() { $("#btnPrint").addEventListener("click", () => window.print()); }

  /* =================== EDIT MODE =================== */
  let editing = false;
  function bindEdit() { if (!editing) return; $$("[data-edit]").forEach((el) => { el.setAttribute("contenteditable", "true"); el.oninput = null; el.addEventListener("blur", saveEdit); }); }
  function saveEdit(e) {
    const path = e.target.getAttribute("data-edit"), val = e.target.textContent.trim();
    const ov = JSON.parse(localStorage.getItem(STORE) || "{}"); setPath(ov, path, val); localStorage.setItem(STORE, JSON.stringify(ov)); setPath(data, path, val);
  }
  function setPath(o, path, val) { const k = path.split("."); let c = o; for (let i = 0; i < k.length - 1; i++) { const nx = /^\d+$/.test(k[i + 1]); if (c[k[i]] == null) c[k[i]] = nx ? [] : {}; c = c[k[i]]; } c[k[k.length - 1]] = val; }
  function toggleEdit(on) { editing = on; document.body.classList.toggle("editing", on); $("#editbar").classList.toggle("open", on); $("#editbar").setAttribute("aria-hidden", !on); if (on) bindEdit(); else $$("[data-edit]").forEach((el) => el.removeAttribute("contenteditable")); }
  function bindEditUI() {
    $("#editToggle").addEventListener("click", () => toggleEdit(!editing));
    $("#editExit").addEventListener("click", () => toggleEdit(false));
    $("#editReset").addEventListener("click", () => { if (confirm("Reset all edits made in this browser?")) { localStorage.removeItem(STORE); location.reload(); } });
    $("#editExport").addEventListener("click", () => { const ov = localStorage.getItem(STORE) || "{}"; const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([ov], { type: "application/json" })); a.download = "portfolio-edits.json"; a.click(); alert("Exported your edits. Paste these into js/content.js to publish them for everyone."); });
    document.addEventListener("keydown", (e) => { if (e.key === "e" && !editing && !/input|textarea/i.test(document.activeElement.tagName) && !document.activeElement.isContentEditable && !$("#case").classList.contains("open")) toggleEdit(true); });
  }

  /* resize repaint */
  let rt; window.addEventListener("resize", () => { clearTimeout(rt); rt = setTimeout(() => { paintCanvases(document); }, 250); });

  /* INIT */
  function init() {
    render(); bindFilters(); bindMenu(); bindAnchors(); bindTheme(); bindCase(); bindPrint(); bindEditUI();
    onScroll(); loader();
    const h = location.hash.slice(1); if (h && data.projects.some((p) => p.id === h)) setTimeout(() => openCase(h, true), 400);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
