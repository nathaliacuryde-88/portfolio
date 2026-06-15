/* =====================================================================
   NATHALIA CURY — PORTFOLIO ENGINE
   Renders content.js, drives motion, theme, filters, case studies, edit.
   ===================================================================== */
(function () {
  "use strict";
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isTouch = window.matchMedia("(hover: none)").matches;
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const STORE = "nc_overrides_v2";
  const THEME = "nc_theme";

  const BASE = window.PORTFOLIO;
  let data = clone(BASE);
  applyOverrides();
  let currentCase = null;

  function clone(o) { return JSON.parse(JSON.stringify(o)); }
  function applyOverrides() { try { const o = JSON.parse(localStorage.getItem(STORE) || "null"); if (o) data = merge(clone(BASE), o); } catch (e) {} }
  function merge(t, s) { for (const k in s) { if (s[k] && typeof s[k] === "object" && !Array.isArray(s[k])) t[k] = merge(t[k] || {}, s[k]); else t[k] = s[k]; } return t; }
  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
  function attr(s) { return s.replace(/'/g, "&#39;").replace(/"/g, "&quot;"); }

  /* ---------------- THEME (light default) ---------------- */
  function setTheme(t) { document.documentElement.setAttribute("data-theme", t); localStorage.setItem(THEME, t);
    const m = $('meta[name=theme-color]'); if (m) m.content = t === "dark" ? "#100f0d" : "#f4f2ec"; }
  setTheme(localStorage.getItem(THEME) || "light");

  /* ---------------- RENDER ---------------- */
  function render() {
    const p = data.profile;
    $("#heroLoc").textContent = p.location;
    $("#heroIntro").textContent = p.heroIntro;
    $("#heroStatement").innerHTML = statementHTML(p.statement);

    // clients marquee
    const c = data.clients.map((x) => `<span>${esc(x)}<b> · </b></span>`).join("");
    $("#clients").innerHTML = c + c + c + c;

    // filters
    $("#filters").innerHTML = data.categories.map((cat, i) => `<button role="tab" data-cat="${esc(cat)}" class="${i ? "" : "active"}">${esc(cat)}</button>`).join("");
    renderGrid("All");

    // about
    $("#aboutHeadline").textContent = data.about.headline;
    $("#aboutHeadline").setAttribute("data-edit", "about.headline");
    $("#aboutBody").innerHTML = data.about.paragraphs.map((t, i) => `<p data-fx data-edit="about.paragraphs.${i}">${esc(t)}</p>`).join("");
    $("#aboutStats").innerHTML = data.about.stats.map((s) => `<div class="stat" data-fx><div class="v">${esc(s.value)}</div><div class="l">${esc(s.label)}</div></div>`).join("");
    $("#aboutCaps").innerHTML = data.about.capabilities.map((cap) => `<div class="cap" data-fx><h4>${esc(cap.title)}</h4><ul>${cap.items.map((i) => `<li>${esc(i)}</li>`).join("")}</ul></div>`).join("");

    renderCV();

    $("#contactMail").textContent = p.email;
    $("#contactMail").href = "mailto:" + p.email;
    $("#contactRow").innerHTML = `<a href="${esc(p.linkedin)}" target="_blank" rel="noopener" data-cursor="">LinkedIn ↗</a><a href="tel:${p.phone.replace(/\s/g, "")}">${esc(p.phone)}</a><span>${esc(p.location)}</span><span>${esc(p.available)}</span>`;
    $("#footerName").textContent = "© " + p.name + " — Stuttgart";
    $("#year").textContent = new Date().getFullYear();
    $("#menuFoot").innerHTML = `<a href="mailto:${esc(p.email)}">${esc(p.email)}</a><span>${esc(p.location)}</span><a href="${esc(p.linkedin)}" target="_blank" rel="noopener">LinkedIn ↗</a>`;

    bindAll();
  }

  function statementHTML(str) {
    // *word* -> serif italic accent; wrap each word for reveal
    const tokens = str.split(/(\s+)/);
    return tokens.map((tk) => {
      if (/^\s+$/.test(tk)) return " ";
      const acc = /^\*.*\*$/.test(tk.replace(/[.,&]/g, (m) => m));
      let inner = tk, isAcc = false;
      const m = tk.match(/^\*(.+?)\*([.,]?)$/);
      if (m) { inner = m[1] + (m[2] || ""); isAcc = true; }
      const content = isAcc ? `<em>${esc(inner)}</em>` : esc(inner);
      return `<span class="word"><span>${content}</span></span> `;
    }).join("");
  }

  function renderGrid(filter) {
    const g = $("#grid");
    g.innerHTML = data.projects.map((pr) => {
      const hide = filter !== "All" && pr.category !== filter ? "is-hidden" : "";
      const media = pr.images && pr.images.length
        ? `<img src="${esc(pr.images[0])}" alt="${esc(pr.title)}" loading="lazy" />`
        : `<canvas data-cover='${attr(JSON.stringify(pr.cover || { colors: [pr.bg, pr.accent], kind: "abstract" }))}' data-seed="${esc(pr.id)}" data-label="${esc(pr.title)}"></canvas>`;
      return `<article class="card ${hide}" data-id="${esc(pr.id)}" data-cursor="view" style="--accent:${esc(pr.accent)}">
        <div class="card__media" style="background:${esc(pr.bg)}">${media}<span class="card__bar"></span></div>
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

  /* ---------------- CASE STUDY ---------------- */
  function openCase(id) {
    const pr = data.projects.find((x) => x.id === id);
    if (!pr) return;
    currentCase = id;
    document.documentElement.style.setProperty("--accent", pr.accent);
    const heroMedia = pr.images && pr.images.length
      ? `<img src="${esc(pr.images[0])}" alt="${esc(pr.title)}" />`
      : `<canvas data-cover='${attr(JSON.stringify(pr.cover || { colors: [pr.bg, pr.accent] }))}' data-seed="${esc(pr.id)}-h" data-label="${esc(pr.title)}"></canvas>`;

    // gallery rhythm from remaining images
    const rest = (pr.images || []).slice(1);
    let gal = "", i = 0;
    while (i < rest.length) {
      gal += `<div class="case__shot" data-fx><img src="${esc(rest[i])}" alt="" loading="lazy"/></div>`; i++;
      if (i + 1 < rest.length) { gal += `<div class="case__row"><div class="case__shot" data-fx><img src="${esc(rest[i])}" alt="" loading="lazy"/></div><div class="case__shot" data-fx><img src="${esc(rest[i + 1])}" alt="" loading="lazy"/></div></div>`; i += 2; }
      else if (i < rest.length) { gal += `<div class="case__shot" data-fx><img src="${esc(rest[i])}" alt="" loading="lazy"/></div>`; i++; }
    }
    if (!rest.length && (!pr.images || !pr.images.length)) {
      gal = [0, 1, 2].map((n) => `<div class="case__shot" data-fx style="aspect-ratio:16/10"><canvas data-cover='${attr(JSON.stringify({ colors: [pr.bg, pr.accent], kind: ["abstract", "grid", "type"][n] }))}' data-seed="${esc(pr.id)}-g${n}" data-label="${esc(pr.title)}"></canvas></div>`).join("");
    }

    const stats = (pr.stats || []).map((s) => `<div class="case__stat"><div class="v">${esc(s.value)}</div><div class="l">${esc(s.label)}</div></div>`).join("");
    const idx = data.projects.findIndex((x) => x.id === id);
    const next = data.projects[(idx + 1) % data.projects.length];

    $("#caseScroll").innerHTML = `
      <div class="case__hero" style="background:${esc(pr.bg)}">${heroMedia}
        <div class="case__hero-cap"><h2 class="case__title">${esc(pr.title)}</h2><span class="case__cat">${esc(pr.category)} — ${esc(pr.year)}</span></div>
      </div>
      <div class="case__intro">
        <p class="case__lead">${esc(pr.summary)}</p>
        <div class="case__side">
          <ul class="case__meta">
            <li><span>Client</span><span>${esc(pr.client)}</span></li>
            <li><span>Year</span><span>${esc(pr.year)}</span></li>
            <li><span>Role</span><span>${esc(pr.role || "")}</span></li>
            <li><span>Discipline</span><span>${esc(pr.category)}</span></li>
          </ul>
          ${esc(pr.description)}
        </div>
      </div>
      ${stats ? `<div class="case__stats">${stats}</div>` : ""}
      <div class="case__gallery">${gal}</div>
      ${pr.team && pr.team.length ? `<div class="case__credits"><h4>Credits</h4><ul>${pr.team.map((t) => `<li>${esc(t)}</li>`).join("")}</ul></div>` : ""}
      <div class="case__next" data-next="${esc(next.id)}" data-cursor="view"><div><small>Next project</small><div class="case__next-t">${esc(next.title)} →</div></div></div>`;

    paintCanvases($("#caseScroll"));
    $("#caseScroll").scrollTop = 0;
    const el = $("#case"); el.classList.add("open"); el.setAttribute("aria-hidden", "false");
    document.body.classList.add("lock");
    revealIn($("#caseScroll"));
    $$("[data-next]", el).forEach((n) => n.addEventListener("click", () => openCase(n.dataset.next)));
    bindCursor($("#caseScroll"));
  }
  function closeCase() { const el = $("#case"); el.classList.remove("open"); el.setAttribute("aria-hidden", "true"); document.body.classList.remove("lock"); document.documentElement.style.removeProperty("--accent"); currentCase = null; }

  /* ---------------- generated canvas (AI covers) ---------------- */
  function paintCanvases(scope) { $$("canvas[data-cover]", scope).forEach((cv) => {
    const cover = JSON.parse(cv.getAttribute("data-cover").replace(/&#39;/g, "'").replace(/&quot;/g, '"'));
    drawArt(cv, cover, cv.getAttribute("data-seed") || "x", cv.getAttribute("data-label") || ""); }); }
  function rng(s) { let h = 1779033703 ^ s.length; for (let i = 0; i < s.length; i++) { h = Math.imul(h ^ s.charCodeAt(i), 3432918353); h = (h << 13) | (h >>> 19); } return () => { h = Math.imul(h ^ (h >>> 16), 2246822507); h = Math.imul(h ^ (h >>> 13), 3266489909); return ((h ^= h >>> 16) >>> 0) / 4294967296; }; }
  function hex(h) { h = h.replace("#", ""); if (h.length === 3) h = h.split("").map((x) => x + x).join(""); const n = parseInt(h, 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; }
  function rgba(h, a) { const [r, g, b] = hex(h); return `rgba(${r},${g},${b},${a})`; }
  function drawArt(cv, cover, seed, label) {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = cv.clientWidth || 600, h = cv.clientHeight || 450;
    cv.width = w * dpr; cv.height = h * dpr; const ctx = cv.getContext("2d"); ctx.scale(dpr, dpr);
    const r = rng(seed), [c1, c2] = cover.colors || ["#111", "#ff5a3c"];
    const g = ctx.createLinearGradient(0, 0, w, h); g.addColorStop(0, c1); g.addColorStop(1, c2); ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
    const kind = cover.kind || "abstract";
    if (kind === "grid") { const cols = 6 + ((r() * 4) | 0), cw = w / cols; for (let y = 0; y * cw < h + cw; y++) for (let x = 0; x < cols; x++) if (r() > 0.8) { ctx.fillStyle = rgba("#ffffff", 0.08 + r() * 0.12); ctx.fillRect(x * cw, y * cw, cw, cw); } }
    else if (kind === "type") { ctx.fillStyle = rgba("#000", 0.15); ctx.fillRect(0, 0, w, h); ctx.fillStyle = rgba("#fff", 0.92); ctx.font = `300 ${h * 1.1}px Fraunces, serif`; ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.fillText((label || "N").charAt(0).toUpperCase(), w / 2, h * 0.54); }
    else { for (let i = 0; i < 5; i++) { ctx.globalAlpha = 0.45 + r() * 0.4; const rad = (0.25 + r() * 0.55) * w, rg = ctx.createRadialGradient(r() * w, r() * h, 0, r() * w, r() * h, rad); rg.addColorStop(0, rgba("#fff", 0.5)); rg.addColorStop(1, rgba("#fff", 0)); ctx.fillStyle = rg; ctx.fillRect(0, 0, w, h); } ctx.globalAlpha = 1; }
    ctx.globalAlpha = 0.04; for (let i = 0; i < (w * h) / 700; i++) { ctx.fillStyle = r() > 0.5 ? "#fff" : "#000"; ctx.fillRect(r() * w, r() * h, 1, 1); } ctx.globalAlpha = 1;
  }

  /* ---------------- interactions ---------------- */
  function bindAll() { revealIn(document); bindCards(); bindCursor(document); bindEditTargets(); }

  let io;
  function revealIn(scope) {
    if (reduce) { $$("[data-fx], .card", scope).forEach((e) => e.classList.add("in")); return; }
    if (!io) io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: 0.1, rootMargin: "0px 0px -6% 0px" });
    $$("[data-fx], .card", scope).forEach((e) => { if (!e.classList.contains("in")) io.observe(e); });
  }
  function bindCards() { $$(".card").forEach((c) => c.onclick = () => openCase(c.dataset.id)); }

  const cursor = $("#cursor"), cLabel = $(".cursor__label", cursor);
  let cx = 0, cy = 0, tx = 0, ty = 0;
  if (!isTouch && !reduce) { window.addEventListener("mousemove", (e) => { tx = e.clientX; ty = e.clientY; }); (function loop() { cx += (tx - cx) * 0.2; cy += (ty - cy) * 0.2; cursor.style.transform = `translate(${cx}px,${cy}px) translate(-50%,-50%)`; requestAnimationFrame(loop); })(); }
  function bindCursor(scope) { if (isTouch) return; $$("[data-cursor]", scope).forEach((el) => { if (el._cb) return; el._cb = 1; el.addEventListener("mouseenter", () => { cursor.classList.add("active"); cLabel.textContent = el.getAttribute("data-cursor") || ""; }); el.addEventListener("mouseleave", () => { cursor.classList.remove("active"); cLabel.textContent = ""; }); }); }

  // marquee
  let mx = 0; if (!reduce) (function loop() { mx -= 0.4; const t = $("#clients"); if (t) { const half = t.scrollWidth / 4; if (-mx >= half) mx = 0; t.style.transform = `translateX(${mx}px)`; } requestAnimationFrame(loop); })();

  // scroll progress + nav hide + active link
  let lastY = 0;
  function onScroll() {
    const st = window.scrollY, h = document.documentElement.scrollHeight - window.innerHeight;
    $("#progress").style.width = (h > 0 ? (st / h) * 100 : 0) + "%";
    const nav = $("#nav"); if (st > lastY && st > 400) nav.classList.add("hidden"); else nav.classList.remove("hidden"); lastY = st;
    let cur = ""; $$("main section[id]").forEach((s) => { if (s.offsetTop - 200 <= st) cur = s.id; });
    $$("#nav .nav__links a").forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + cur));
  }
  window.addEventListener("scroll", onScroll, { passive: true });

  // loader
  function loader() { const l = $("#loader"), c = $("#loaderCount"); if (reduce) { l.classList.add("done"); $("#hero").classList.add("ready"); return; } let n = 0; const t = setInterval(() => { n += (Math.random() * 16 + 6) | 0; if (n >= 100) { n = 100; clearInterval(t); setTimeout(() => { l.classList.add("done"); $("#hero").classList.add("ready"); }, 300); } c.textContent = n; }, 110); }

  // menu + theme + anchors + case + edit
  function bindUI() {
    const nav = $("#nav"), menu = $("#menu"), mb = $("#navMenu");
    const tg = (o) => { nav.classList.toggle("open", o); menu.classList.toggle("open", o); menu.setAttribute("aria-hidden", !o); mb.setAttribute("aria-expanded", o); document.body.classList.toggle("lock", o); };
    mb.onclick = () => tg(!menu.classList.contains("open"));
    $$("#menu a").forEach((a) => a.onclick = () => tg(false));
    $("#themeToggle").onclick = () => setTheme(document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark");

    $$('a[href^="#"]').forEach((a) => a.onclick = (e) => { const id = a.getAttribute("href"); if (id.length < 2) return; const t = $(id); if (t) { e.preventDefault(); if (window.__lenis) window.__lenis.scrollTo(t, { offset: -10 }); else t.scrollIntoView({ behavior: reduce ? "auto" : "smooth" }); } });

    $("#filters").addEventListener("click", (e) => {
      const btn = e.target.closest("button[data-cat]"); if (!btn) return;
      $$("#filters button").forEach((b) => b.classList.remove("active")); btn.classList.add("active");
      renderGrid(btn.dataset.cat); bindCards(); bindCursor($("#grid")); revealIn($("#grid"));
    });

    $("#caseClose").onclick = closeCase;
    $("#btnPrint").onclick = () => window.print();
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") { if (currentCase) closeCase(); else if (editing) toggleEdit(false); } if (e.key === "e" && !editing && !currentCase && !/input|textarea/i.test(document.activeElement.tagName) && !document.activeElement.isContentEditable) toggleEdit(true); });
    bindEditUI();
  }

  /* ---------------- edit mode ---------------- */
  let editing = false;
  function bindEditTargets() { if (!editing) return; $$("[data-edit]").forEach((el) => { el.setAttribute("contenteditable", "true"); el.onblur = saveEdit; }); }
  function saveEdit(e) { const path = e.target.getAttribute("data-edit"), val = e.target.textContent.trim(); const ov = JSON.parse(localStorage.getItem(STORE) || "{}"); setPath(ov, path, val); localStorage.setItem(STORE, JSON.stringify(ov)); setPath(data, path, val); }
  function setPath(o, path, val) { const k = path.split("."); let c = o; for (let i = 0; i < k.length - 1; i++) { if (c[k[i]] == null) c[k[i]] = /^\d+$/.test(k[i + 1]) ? [] : {}; c = c[k[i]]; } c[k[k.length - 1]] = val; }
  function toggleEdit(on) { editing = on; document.body.classList.toggle("editing", on); $("#editbar").classList.toggle("open", on); $("#editbar").setAttribute("aria-hidden", !on); if (on) bindEditTargets(); else $$("[data-edit]").forEach((el) => el.removeAttribute("contenteditable")); }
  function bindEditUI() {
    $("#editToggle").onclick = () => toggleEdit(!editing);
    $("#editExit").onclick = () => toggleEdit(false);
    $("#editReset").onclick = () => { if (confirm("Reset all edits in this browser?")) { localStorage.removeItem(STORE); location.reload(); } };
    $("#editExport").onclick = () => { const ov = localStorage.getItem(STORE) || "{}"; const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([ov], { type: "application/json" })); a.download = "portfolio-edits.json"; a.click(); alert("Exported your edits. To publish them for everyone, paste the values into js/content.js."); };
  }

  // repaint canvases on resize
  let rt; window.addEventListener("resize", () => { clearTimeout(rt); rt = setTimeout(() => { paintCanvases(document); if (currentCase) paintCanvases($("#caseScroll")); }, 250); });

  // optional smooth scroll (Lenis via CDN; graceful fallback)
  function initLenis() {
    if (reduce || isTouch) return;
    const s = document.createElement("script");
    s.src = "https://cdn.jsdelivr.net/npm/lenis@1.1.13/dist/lenis.min.js";
    s.onload = () => { if (!window.Lenis) return; const lenis = new window.Lenis({ lerp: 0.1, wheelMultiplier: 1 }); window.__lenis = lenis; function raf(t) { lenis.raf(t); requestAnimationFrame(raf); } requestAnimationFrame(raf); };
    document.head.appendChild(s);
  }

  function init() { render(); bindUI(); onScroll(); loader(); initLenis(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
