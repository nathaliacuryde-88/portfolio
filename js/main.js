/* =====================================================================
   NATHALIA CURY — PORTFOLIO ENGINE
   Renders content.js, generates cover art, drives all motion.
   No framework, no build step.
   ===================================================================== */
(function () {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isTouch = window.matchMedia("(hover: none)").matches;
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const STORE_KEY = "nc_portfolio_overrides_v1";

  /* ---- Load content (+ any local edits) ------------------------------ */
  const BASE = window.PORTFOLIO;
  let data = deepClone(BASE);
  applyOverrides();

  function deepClone(o) { return JSON.parse(JSON.stringify(o)); }
  function applyOverrides() {
    try {
      const ov = JSON.parse(localStorage.getItem(STORE_KEY) || "null");
      if (ov) data = deepMerge(deepClone(BASE), ov);
    } catch (e) {}
  }
  function deepMerge(t, s) {
    for (const k in s) {
      if (s[k] && typeof s[k] === "object" && !Array.isArray(s[k])) t[k] = deepMerge(t[k] || {}, s[k]);
      else t[k] = s[k];
    }
    return t;
  }

  /* ===================================================================
     RENDER
     =================================================================== */
  function render() {
    const p = data.profile;

    // Hero
    $(".hero__role").textContent = p.role;
    $(".hero__loc").textContent = p.location;
    $(".hero__intro").textContent = p.heroIntro;
    const title = $("#heroTitle");
    title.setAttribute("aria-label", p.heroLines.join(" "));
    title.innerHTML = p.heroLines
      .map((l, i) => {
        const cls = i === p.heroLines.length - 1 ? "accent" : "";
        return `<span class="line"><span class="${cls}" data-edit="profile.heroLines.${i}">${l}</span></span>`;
      })
      .join("");

    // Marquee
    const words = ["Branding", "Editorial", "AI", "Type", "Art Direction"];
    const unit = words.map((w) => `<span>${w}<span class="dot"> ✦ </span></span>`).join("");
    $("#marquee").innerHTML = unit + unit + unit + unit;

    // Filters
    const filters = $("#filters");
    filters.innerHTML = data.categories
      .map((c, i) => `<button role="tab" data-cat="${c}" class="${i === 0 ? "active" : ""}">${c}</button>`)
      .join("");

    // Work grid
    renderGrid("All");

    // About
    $("#aboutHeadline").textContent = data.about.headline;
    $("#aboutHeadline").setAttribute("data-edit", "about.headline");
    $("#aboutBody").innerHTML = data.about.paragraphs
      .map((t, i) => `<p data-fx="up" data-edit="about.paragraphs.${i}">${t}</p>`)
      .join("");
    $("#aboutFacts").innerHTML = data.about.facts
      .map((f) => `<li data-fx="up"><span class="k">${f.label}</span><span class="v">${f.value}</span></li>`)
      .join("");

    // CV
    renderCV();

    // Contact
    $("#contactMail").textContent = p.email;
    $("#contactMail").href = "mailto:" + p.email;
    $("#contactRow").innerHTML = `
      <a href="${p.linkedin}" target="_blank" rel="noopener" data-cursor="">LinkedIn ↗</a>
      <a href="tel:${p.phone.replace(/\s/g, "")}">${p.phone}</a>
      <span>${p.location}</span>
      <span>${p.available}</span>`;

    // Footer / menu
    $("#footerName").textContent = "© " + p.name;
    $("#year").textContent = new Date().getFullYear();
    $("#menuFoot").innerHTML = `<a href="mailto:${p.email}">${p.email}</a><span>${p.location}</span><a href="${p.linkedin}" target="_blank" rel="noopener">LinkedIn ↗</a>`;

    bindAfterRender();
  }

  function renderGrid(filter) {
    const grid = $("#grid");
    grid.innerHTML = data.projects
      .map((proj, i) => {
        const hidden = filter !== "All" && proj.category !== filter ? "is-hidden" : "";
        return `
        <article class="card ${hidden}" data-id="${proj.id}" data-cat="${proj.category}" data-cursor="view">
          <div class="card__media" data-cover='${escapeAttr(JSON.stringify(proj.cover))}' data-seed="${proj.id}"></div>
          <div class="card__meta">
            <h3 class="card__title">${proj.title}</h3>
            <span class="card__cat">${proj.category} — ${proj.year}</span>
          </div>
          <p class="card__summary">${proj.summary}</p>
        </article>`;
      })
      .join("");
    paintCovers(grid);
  }

  function renderCV() {
    const cv = data.cv;
    const rows = (arr, fn) => arr.map(fn).join("");
    const expBlock = (title, items, fmt) => `
      <div class="cv-block">
        <h3>${title}</h3>
        ${rows(items, fmt)}
      </div>`;

    $("#cvGrid").innerHTML = [
      expBlock("Professional Experience", cv.experience,
        (e) => `<div class="cv-row"><span class="p">${e.period}</span><span class="r">${e.role}<small>${e.place}</small></span></div>`),
      expBlock("International Experience", cv.international,
        (e) => `<div class="cv-row"><span class="p">${e.period}</span><span class="r">${e.role}<small>${e.place}</small></span></div>`),
      expBlock("Awards & Nominations", cv.awards,
        (a) => `<div class="cv-row"><span class="p">${a.year}</span><span class="r">${a.title}</span></div>`),
      expBlock("Lectures, Workshops & Exhibitions", cv.lectures,
        (l) => `<div class="cv-row"><span class="p">${l.year}</span><span class="r">${l.title}<small>${l.kind}</small></span></div>`),
      `<div class="cv-block"><h3>Education</h3>${rows(cv.education,
        (e) => `<div class="cv-row"><span class="p">${e.period}</span><span class="r">${e.title}<small>${e.place}</small></span></div>`)}
        <h3 style="margin-top:36px">Languages</h3>${rows(cv.languages,
        (l) => `<div class="cv-row"><span class="p">${l.level}</span><span class="r">${l.name}</span></div>`)}</div>`,
      `<div class="cv-block"><h3>Software & Tools</h3><div class="cv-tags">${cv.software.map((s) => `<span>${s}</span>`).join("")}</div></div>`,
    ].join("");
  }

  function escapeAttr(s) { return s.replace(/'/g, "&#39;").replace(/"/g, "&quot;"); }

  /* ===================================================================
     GENERATED COVER ART (canvas) — used until real images are added
     =================================================================== */
  function paintCovers(scope) {
    $$(".card__media[data-cover]", scope).forEach((el) => {
      const cover = JSON.parse(el.getAttribute("data-cover").replace(/&#39;/g, "'").replace(/&quot;/g, '"'));
      const seed = el.getAttribute("data-seed");
      el.innerHTML = "";
      if (cover.type === "image" && cover.src) {
        const img = document.createElement("img");
        img.src = cover.src; img.alt = ""; img.loading = "lazy";
        el.appendChild(img);
      } else {
        const cv = makeCanvas(el.clientWidth || 600, el.clientHeight || 450, cover, seed,
          $(".card[data-id='" + (el.closest(".card")?.dataset.id || "") + "'] .card__title")?.textContent || "");
        el.appendChild(cv);
      }
    });
  }

  // tiny seeded RNG
  function rng(seedStr) {
    let h = 1779033703 ^ seedStr.length;
    for (let i = 0; i < seedStr.length; i++) { h = Math.imul(h ^ seedStr.charCodeAt(i), 3432918353); h = (h << 13) | (h >>> 19); }
    return function () { h = Math.imul(h ^ (h >>> 16), 2246822507); h = Math.imul(h ^ (h >>> 13), 3266489909); return ((h ^= h >>> 16) >>> 0) / 4294967296; };
  }

  function makeCanvas(w, h, cover, seed, label) {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = Math.max(w, 320); h = Math.max(h, 240);
    const c = document.createElement("canvas");
    c.width = w * dpr; c.height = h * dpr;
    c.style.width = "100%"; c.style.height = "100%";
    const ctx = c.getContext("2d");
    ctx.scale(dpr, dpr);
    const r = rng(seed);
    const [c1, c2] = cover.colors || ["#111", "#ff4d2e"];

    // base gradient
    const ang = r() * Math.PI;
    const g = ctx.createLinearGradient(0, 0, Math.cos(ang) * w, Math.sin(ang) * h);
    g.addColorStop(0, c1); g.addColorStop(1, mix(c1, c2, 0.55));
    ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);

    if (cover.kind === "grid") {
      const cols = 5 + Math.floor(r() * 4), cw = w / cols, ch = cw;
      for (let y = 0; y * ch < h + ch; y++)
        for (let x = 0; x < cols; x++) {
          if (r() > 0.78) { ctx.fillStyle = withAlpha(c2, 0.85); ctx.fillRect(x * cw, y * ch, cw, ch); }
          else if (r() > 0.9) { ctx.fillStyle = withAlpha("#ffffff", 0.06); ctx.beginPath(); ctx.arc(x * cw + cw / 2, y * ch + ch / 2, cw * 0.32, 0, 7); ctx.fill(); }
        }
    } else if (cover.kind === "abstract") {
      for (let i = 0; i < 5; i++) {
        ctx.globalAlpha = 0.5 + r() * 0.4;
        const rad = (0.25 + r() * 0.6) * w;
        const rg = ctx.createRadialGradient(r() * w, r() * h, 0, r() * w, r() * h, rad);
        rg.addColorStop(0, withAlpha(c2, 0.9)); rg.addColorStop(1, withAlpha(c2, 0));
        ctx.fillStyle = rg; ctx.fillRect(0, 0, w, h);
      }
      ctx.globalAlpha = 1;
      // thin sweeping line
      ctx.strokeStyle = withAlpha("#ffffff", 0.5); ctx.lineWidth = 1.2;
      ctx.beginPath(); ctx.moveTo(0, r() * h);
      for (let x = 0; x <= w; x += 12) ctx.lineTo(x, h * 0.5 + Math.sin(x * 0.02 + r() * 6) * h * 0.28);
      ctx.stroke();
    } else { // type
      ctx.fillStyle = withAlpha("#000000", 0.18); ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = withAlpha("#ffffff", 0.92);
      const letter = (label || "N").trim().charAt(0).toUpperCase();
      ctx.font = `300 ${h * 1.15}px Fraunces, Georgia, serif`;
      ctx.textBaseline = "middle"; ctx.textAlign = "center";
      ctx.fillText(letter, w * 0.5, h * 0.54);
      ctx.strokeStyle = withAlpha(c2, 0.9); ctx.lineWidth = 2;
      ctx.strokeRect(w * 0.06, h * 0.06, w * 0.88, h * 0.88);
    }
    // grain
    ctx.globalAlpha = 0.04;
    for (let i = 0; i < (w * h) / 600; i++) { ctx.fillStyle = r() > 0.5 ? "#fff" : "#000"; ctx.fillRect(r() * w, r() * h, 1, 1); }
    ctx.globalAlpha = 1;
    return c;
  }

  function hexToRgb(h) { h = h.replace("#", ""); if (h.length === 3) h = h.split("").map((x) => x + x).join(""); const n = parseInt(h, 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; }
  function mix(a, b, t) { const x = hexToRgb(a), y = hexToRgb(b); return `rgb(${x.map((v, i) => Math.round(v + (y[i] - v) * t)).join(",")})`; }
  function withAlpha(h, a) { if (h.startsWith("#")) { const [r, g, b] = hexToRgb(h); return `rgba(${r},${g},${b},${a})`; } return h; }

  /* ===================================================================
     INTERACTIONS (bound after each render)
     =================================================================== */
  function bindAfterRender() {
    observeReveal();
    bindCards();
    bindCursorTargets();
    bindEditTargets();
  }

  // reveal on scroll
  let io;
  function observeReveal() {
    if (io) io.disconnect();
    if (reduceMotion) { $$("[data-fx], .card").forEach((e) => e.classList.add("in")); return; }
    io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    $$("[data-fx], .card").forEach((e) => io.observe(e));
  }

  // filters
  function bindFilters() {
    $("#filters").addEventListener("click", (e) => {
      const btn = e.target.closest("button[data-cat]");
      if (!btn) return;
      $$("#filters button").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const cat = btn.dataset.cat;
      // re-render grid with stagger
      renderGrid(cat);
      bindAfterRender();
    });
  }

  // open lightbox
  function bindCards() {
    $$(".card").forEach((card) => {
      card.addEventListener("click", () => openProject(card.dataset.id));
    });
  }

  function openProject(id) {
    const proj = data.projects.find((p) => p.id === id);
    if (!proj) return;
    document.documentElement.style.setProperty("--accent", proj.cover.colors ? proj.cover.colors[1] : "#ff4d2e");
    const lb = $("#lightbox");
    const shots = [0, 1, 2].map((n) => {
      const co = deepClone(proj.cover);
      return `<div class="lb-shot" data-cover='${escapeAttr(JSON.stringify(co))}' data-seed="${proj.id}-${n}"></div>`;
    }).join("");
    $("#lightboxScroll").innerHTML = `
      <div class="lb-head">
        <h2 class="lb-title">${proj.title}</h2>
        <div class="lb-meta"><span>${proj.client}</span><span>${proj.category}</span><span>${proj.year}</span></div>
      </div>
      <div class="lb-body">
        <p class="lb-desc">${proj.summary}</p>
        <div class="lb-side">${proj.description}
          <div class="lb-tags">${(proj.tags || []).map((t) => `<span>${t}</span>`).join("")}</div>
        </div>
      </div>
      <div class="lb-shots">${shots}</div>`;
    paintLbCovers();
    lb.classList.add("open"); lb.setAttribute("aria-hidden", "false");
    document.body.classList.add("lock");
  }

  function paintLbCovers() {
    $$("#lightboxScroll .lb-shot[data-cover]").forEach((el) => {
      const cover = JSON.parse(el.getAttribute("data-cover").replace(/&#39;/g, "'").replace(/&quot;/g, '"'));
      const seed = el.getAttribute("data-seed");
      el.innerHTML = "";
      if (cover.type === "image" && cover.src) {
        const img = document.createElement("img"); img.src = cover.src; el.appendChild(img);
      } else {
        // vary kind per shot for richness
        const kinds = ["abstract", "grid", "type"];
        cover.kind = kinds[Math.abs(hashStr(seed)) % 3];
        el.appendChild(makeCanvas(el.clientWidth || 900, el.clientHeight || 500, cover, seed, ""));
      }
    });
  }
  function hashStr(s) { let h = 0; for (let i = 0; i < s.length; i++) h = (h << 5) - h + s.charCodeAt(i); return h; }

  function closeLightbox() {
    const lb = $("#lightbox");
    lb.classList.remove("open"); lb.setAttribute("aria-hidden", "true");
    document.body.classList.remove("lock");
    document.documentElement.style.setProperty("--accent", "#ff4d2e");
  }

  /* ---- Custom cursor ---- */
  const cursor = $("#cursor");
  const cLabel = $(".cursor__label", cursor);
  let cx = 0, cy = 0, tx = 0, ty = 0;
  function cursorLoop() { cx += (tx - cx) * 0.18; cy += (ty - cy) * 0.18; cursor.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`; requestAnimationFrame(cursorLoop); }
  if (!isTouch && !reduceMotion) {
    window.addEventListener("mousemove", (e) => { tx = e.clientX; ty = e.clientY; });
    cursorLoop();
  }
  function bindCursorTargets() {
    if (isTouch) return;
    $$("[data-cursor]").forEach((el) => {
      el.addEventListener("mouseenter", () => {
        const label = el.getAttribute("data-cursor");
        cursor.classList.add("active"); cLabel.textContent = label || "";
      });
      el.addEventListener("mouseleave", () => { cursor.classList.remove("active"); cLabel.textContent = ""; });
    });
  }

  /* ---- Marquee + parallax via scroll ---- */
  let mx = 0;
  function marqueeLoop() {
    mx -= 0.5; const track = $("#marquee");
    if (track) { const half = track.scrollWidth / 4; if (-mx >= half) mx = 0; track.style.transform = `translateX(${mx}px)`; }
    requestAnimationFrame(marqueeLoop);
  }
  if (!reduceMotion) marqueeLoop();

  /* ---- Scroll progress + nav hide ---- */
  let lastY = 0;
  function onScroll() {
    const st = window.scrollY;
    const h = document.documentElement.scrollHeight - window.innerHeight;
    $("#progress").style.width = (h > 0 ? (st / h) * 100 : 0) + "%";
    const nav = $("#nav");
    if (st > lastY && st > 400) nav.classList.add("hidden"); else nav.classList.remove("hidden");
    lastY = st;
  }
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---- Loader ---- */
  function runLoader() {
    const loader = $("#loader"), count = $("#loaderCount");
    if (reduceMotion) { loader.classList.add("done"); $("#hero").classList.add("ready"); return; }
    let n = 0;
    const t = setInterval(() => {
      n += Math.floor(Math.random() * 18) + 6; if (n >= 100) { n = 100; clearInterval(t); finish(); }
      count.textContent = n;
    }, 120);
    function finish() {
      setTimeout(() => { loader.classList.add("done"); $("#hero").classList.add("ready"); }, 350);
    }
  }

  /* ---- Mobile menu ---- */
  function bindMenu() {
    const nav = $("#nav"), menu = $("#menu"), btn = $("#navMenu");
    function toggle(open) {
      nav.classList.toggle("open", open); menu.classList.toggle("open", open);
      menu.setAttribute("aria-hidden", !open); btn.setAttribute("aria-expanded", open);
      document.body.classList.toggle("lock", open);
    }
    btn.addEventListener("click", () => toggle(!menu.classList.contains("open")));
    $$("#menu a").forEach((a) => a.addEventListener("click", () => toggle(false)));
  }

  /* ---- Smooth-scroll anchors ---- */
  function bindAnchors() {
    $$('a[href^="#"]').forEach((a) => {
      a.addEventListener("click", (e) => {
        const id = a.getAttribute("href");
        if (id.length < 2) return;
        const t = document.querySelector(id);
        if (t) { e.preventDefault(); t.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" }); }
      });
    });
  }

  /* ===================================================================
     EDIT MODE — click text to edit, saved to localStorage
     =================================================================== */
  let editing = false;
  function bindEditTargets() {
    if (!editing) return;
    $$("[data-edit]").forEach((el) => { el.setAttribute("contenteditable", "true"); el.addEventListener("blur", saveEdit); });
  }
  function saveEdit(e) {
    const path = e.target.getAttribute("data-edit");
    const val = e.target.textContent.trim();
    const ov = JSON.parse(localStorage.getItem(STORE_KEY) || "{}");
    setPath(ov, path, val);
    localStorage.setItem(STORE_KEY, JSON.stringify(ov));
    setPath(data, path, val);
  }
  function setPath(obj, path, val) {
    const keys = path.split("."); let o = obj;
    for (let i = 0; i < keys.length - 1; i++) {
      const k = keys[i], nextIsIdx = /^\d+$/.test(keys[i + 1]);
      if (o[k] == null) o[k] = nextIsIdx ? [] : {};
      o = o[k];
    }
    o[keys[keys.length - 1]] = val;
  }
  function toggleEdit(on) {
    editing = on;
    document.body.classList.toggle("editing", on);
    $("#editbar").classList.toggle("open", on);
    $("#editbar").setAttribute("aria-hidden", !on);
    if (on) bindEditTargets();
    else $$("[data-edit]").forEach((el) => el.removeAttribute("contenteditable"));
  }
  function bindEditUI() {
    $("#editToggle").addEventListener("click", () => toggleEdit(!editing));
    $("#editExit").addEventListener("click", () => toggleEdit(false));
    $("#editReset").addEventListener("click", () => {
      if (confirm("Reset all edits made in this browser back to the original content?")) {
        localStorage.removeItem(STORE_KEY); location.reload();
      }
    });
    $("#editExport").addEventListener("click", () => {
      const ov = localStorage.getItem(STORE_KEY) || "{}";
      const blob = new Blob([ov], { type: "application/json" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob); a.download = "portfolio-content-overrides.json"; a.click();
      alert("Exported your edits as JSON.\n\nTo make them permanent for everyone, paste these values into js/content.js (or hand the file to your developer).");
    });
    // keyboard shortcut: press "e"
    document.addEventListener("keydown", (e) => {
      if (e.key === "e" && !/input|textarea/i.test(document.activeElement.tagName) && !editing) {
        if (!document.activeElement.isContentEditable) toggleEdit(true);
      }
      if (e.key === "Escape") { if ($("#lightbox").classList.contains("open")) closeLightbox(); else if (editing) toggleEdit(false); }
    });
  }

  /* ---- Lightbox close ---- */
  function bindLightbox() {
    $("#lightboxClose").addEventListener("click", closeLightbox);
    $("#lightbox").addEventListener("click", (e) => { if (e.target.id === "lightbox") closeLightbox(); });
  }

  /* ---- Repaint covers on resize (debounced) ---- */
  let rT;
  window.addEventListener("resize", () => {
    clearTimeout(rT);
    rT = setTimeout(() => { paintCovers(document); if ($("#lightbox").classList.contains("open")) paintLbCovers(); }, 250);
  });

  /* ---- Print ---- */
  function bindPrint() { $("#btnPrint").addEventListener("click", () => window.print()); }

  /* ===================================================================
     INIT
     =================================================================== */
  function init() {
    render();
    bindFilters();
    bindMenu();
    bindAnchors();
    bindLightbox();
    bindEditUI();
    bindPrint();
    onScroll();
    runLoader();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
