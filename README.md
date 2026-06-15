# Nathalia Cury — Portfolio

A fast, modern, fully responsive portfolio site. No build step, no framework — just
HTML, CSS and vanilla JavaScript, so it runs anywhere and is easy to edit.

## Sections
- **Landing** — kinetic headline, intro, scroll cue
- **Work** — large-image grid, filterable by **Branding · Editorial · AI**, click any project for a full view
- **About** — bio + quick facts
- **CV** — full curriculum vitae (experience, awards, lectures, education, software, languages), with **Download / Print**
- **Contact** — email, LinkedIn, location

## Motion & feel
Smooth scroll-reveal, custom cursor (desktop), page-load intro, marquee, hover image
zoom, scroll progress, category-tinted project views. Respects `prefers-reduced-motion`.

## Run it locally
Just open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Editing the content — three ways

### 1. In-browser Edit mode (easiest, no code)
Click **Edit** in the footer (or press the `e` key). Editable text gets a dashed
outline — click and type. Changes save automatically **in your browser**.
- **Export JSON** downloads your changes.
- **Reset** clears them.
> These edits live only in your browser. To publish them for everyone, copy the
> values into `js/content.js` (or send the exported JSON to your developer).
> A future upgrade can wire Edit mode to a real database (e.g. Supabase) so edits
> publish instantly and support image uploads.

### 2. Edit `js/content.js` (permanent)
This single file holds **everything** — profile, projects, CV. Change text, reorder
or add projects, and it updates the whole site.

### 3. Add real project images
Each project has a `cover`. By default covers render as generated art. To use a real
image, drop the file in `assets/images/` and set:

```js
cover: { type: "image", src: "assets/images/my-project.jpg" }
```

Projects also show extra images in the detail view — point those at real files the
same way when you have them.

## In-site editor (Supabase)

The site can be edited live from `/admin.html` once connected to Supabase.

**One-time setup**
1. Create a project at **supabase.com** (free tier is fine).
2. Open **SQL Editor** → paste **`db/schema.sql`** → Run (creates tables, RLS, and the `media` storage bucket).
3. In **Project Settings → API**, copy the **Project URL** and **anon/publishable key** into **`js/supabase-config.js`**.
4. In Supabase **Authentication → Providers → Email**, magic links are on by default. Make sure your owner email matches `ownerEmail` in the config and in `db/schema.sql`.
5. Visit **`/admin.html`**, sign in with the email link, and click **“Seed from built-in”** to import everything currently in `content.js`.

**What you can edit live:** projects (add/edit/reorder, toggle the Featured 6), hero carousel slides, statement, about, contact — plus per-project **case modules** (image · video · two-up · text · quote), drag-drop **image/video uploads**, and a **focal-point** click on any media to control the mobile crop.

The public site reads from Supabase when configured and **falls back to `content.js`** if it's empty or unreachable, so it never breaks.

## Deploy
It's static, so any host works: **GitHub Pages**, **Netlify**, or **Vercel** —
just point them at this folder. No configuration needed.
