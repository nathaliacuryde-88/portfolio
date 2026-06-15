/* =====================================================================
   NC STORE — loads content from Supabase (if configured) with a safe
   fallback to the built-in window.PORTFOLIO (content.js).
   Shared by the public site (read) and the admin (read + write).
   ===================================================================== */
(function () {
  "use strict";
  const cfg = window.SUPABASE_CONFIG || {};
  const enabled = !!(cfg.url && cfg.anonKey);
  let client = null;

  async function getClient() {
    if (!enabled) throw new Error("Supabase not configured");
    if (client) return client;
    const { createClient } = await import("https://esm.sh/@supabase/supabase-js@2");
    client = createClient(cfg.url, cfg.anonKey, { auth: { persistSession: true, autoRefreshToken: true } });
    return client;
  }

  // Fetch site + projects, shaped like window.PORTFOLIO.
  async function load() {
    const sb = await getClient();
    const [siteRes, projRes] = await Promise.all([
      sb.from("site").select("data").eq("id", 1).maybeSingle(),
      sb.from("projects").select("*").eq("published", true).order("position", { ascending: true }),
    ]);
    const content = (siteRes.data && siteRes.data.data) ? JSON.parse(JSON.stringify(siteRes.data.data)) : {};
    const rows = projRes.data || [];
    if (rows.length) {
      content.projects = rows.map((r) => Object.assign({ id: r.id, category: r.category }, r.data || {}));
      const feat = rows
        .filter((r) => r.featured_position != null)
        .sort((a, b) => a.featured_position - b.featured_position)
        .map((r) => r.id);
      content.profile = content.profile || {};
      if (feat.length) content.profile.featured = feat;
    }
    return content;
  }

  window.NCStore = { enabled, cfg, getClient, load };
})();
