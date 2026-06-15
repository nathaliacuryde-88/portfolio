/* =====================================================================
   SUPABASE CONFIG
   ---------------------------------------------------------------------
   Paste your project's values here to switch the live editor ON.
   Find them in Supabase → Project Settings → API.
   Both values are safe to expose in a static site: the database's
   row-level security only lets your logged-in email write.
   Leave url/anonKey empty to keep the site running on the built-in
   content.js (no backend).
   ===================================================================== */
window.SUPABASE_CONFIG = {
  url: "",            // e.g. "https://abcdxyz.supabase.co"
  anonKey: "",        // the "anon" / "publishable" public key
  bucket: "media",    // storage bucket name (created by db/schema.sql)
  ownerEmail: "nathaliacuryde@gmail.com", // only this email may edit
};
