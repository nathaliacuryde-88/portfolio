/* =====================================================================
   PORTFOLIO CONTENT
   ---------------------------------------------------------------------
   This is the single source of truth for everything on the site.
   To change text, projects, images or CV entries you ONLY edit this
   file (or use the in-browser Edit mode, which writes here for you).

   Each project has a "cover" used for the large work images. Until you
   upload real images, covers render as generated art (gradient + type).
   To use a real image, set:  cover: { type: "image", src: "assets/images/your-file.jpg" }
   ===================================================================== */

window.PORTFOLIO = {
  profile: {
    name: "Nathalia Cury",
    firstName: "Nathalia",
    lastName: "Cury",
    role: "Senior Art Director & Designer",
    location: "Stuttgart, Germany",
    email: "nathaliacuryde@gmail.com",
    phone: "+49 176 7015644",
    linkedin: "https://www.linkedin.com/in/nathalia-cury-3a4605143/",
    available: "Open to selected freelance & collaborations",
    // Big kinetic headline shown on the landing page
    heroLines: ["Branding,", "Editorial", "& AI."],
    heroIntro:
      "Award-winning art director shaping brands, books and AI-driven imagery — from concept to delivery.",
  },

  about: {
    headline: "Design that moves between print, screen and the synthetic.",
    paragraphs: [
      "I started in Architecture and Urbanism at the University of São Paulo in 2007, transitioned to Design in 2010, and graduated in 2013 as a Graphic and Product Designer.",
      "I began my career at studios Ps.2 Design and CLDT, at Lumini and the publisher Cosac Naify, gathering over four years of editorial and brand experience. In 2015 I co-founded the independent studio Margem, working across print and digital for large and small companies, institutions and cultural centers.",
      "In 2018 I was selected as one of the Ascenders by the Type Directors Club in New York — a portfolio-based award celebrating designers under 35 for achievements in typography, type design and lettering. Other recognitions include the Free Access Award, the Brazilian Design Museum Award and the Latin American Award for Editorial Design.",
      "Today I'm a Senior Art Director at Strichpunkt Design, leading branding for IT, local and global brands such as AMG, Deutsche Bahn, Volocopter, Endava and Diva-e — overseeing projects from concept to delivery, guiding the team and protecting creative excellence and strategic alignment.",
    ],
    facts: [
      { label: "Based in", value: "Stuttgart, DE" },
      { label: "Focus", value: "Branding · Editorial · AI" },
      { label: "Now", value: "Senior AD @ Strichpunkt" },
      { label: "Languages", value: "EN · PT · DE" },
    ],
  },

  categories: ["All", "Branding", "Editorial", "AI"],

  /* The work. Reorder freely — order here is order on the page. */
  projects: [
    {
      id: "amg",
      title: "AMG",
      client: "Mercedes-AMG",
      year: "2024",
      category: "Branding",
      summary: "Performance brand language for a new generation of driver.",
      description:
        "A bold visual system built around speed, precision and heat. Editorial-grade typography meets a kinetic grid that flexes from motorsport to lifestyle — designed to live across launch films, print and digital touchpoints.",
      tags: ["Brand system", "Art direction", "Motion"],
      cover: { type: "gradient", kind: "type", colors: ["#0a0a0a", "#e7352b"] },
    },
    {
      id: "deutsche-bahn",
      title: "Deutsche Bahn",
      client: "Deutsche Bahn",
      year: "2023",
      category: "Branding",
      summary: "Wayfinding warmth for a national network in motion.",
      description:
        "A refresh of brand expression for one of Europe's largest transport networks — balancing institutional trust with a more human, contemporary rhythm across campaign and service design.",
      tags: ["Brand refresh", "Campaign", "System"],
      cover: { type: "gradient", kind: "grid", colors: ["#0b1e3b", "#f01414"] },
    },
    {
      id: "volocopter",
      title: "Volocopter",
      client: "Volocopter",
      year: "2023",
      category: "Branding",
      summary: "Identity for the future of urban air mobility.",
      description:
        "A clean, optimistic identity for electric air taxis — engineered to feel both aeronautically precise and genuinely inviting, scaling from app to airframe.",
      tags: ["Identity", "Brand strategy", "Digital"],
      cover: { type: "gradient", kind: "abstract", colors: ["#003a5d", "#3ec6ff"] },
    },
    {
      id: "endava",
      title: "Endava",
      client: "Endava",
      year: "2022",
      category: "Branding",
      summary: "A tech consultancy with a human signal.",
      description:
        "Brand art direction for a global technology company — translating complex engineering into a warm, confident and unmistakably ownable visual voice.",
      tags: ["Art direction", "Brand system"],
      cover: { type: "gradient", kind: "abstract", colors: ["#1a0033", "#ff5a36"] },
    },
    {
      id: "cosac-naify",
      title: "Cosac Naify",
      client: "Cosac Naify (publisher)",
      year: "2014",
      category: "Editorial",
      summary: "Books as objects — typography with a point of view.",
      description:
        "A series of book designs for one of Brazil's most celebrated publishers. Considered typography, paper and structure turn each title into a tactile reading experience.",
      tags: ["Book design", "Typography", "Print"],
      cover: { type: "gradient", kind: "type", colors: ["#1c1a17", "#d8a24a"] },
    },
    {
      id: "studio-margem",
      title: "Studio Margem",
      client: "Self-initiated",
      year: "2015–2020",
      category: "Editorial",
      summary: "An independent studio at the margins of print and digital.",
      description:
        "Co-founded studio working with institutions and cultural centers. A space for experiments in editorial systems, identity and self-published matter — many recognised in Brazilian and Latin American design awards.",
      tags: ["Studio", "Editorial", "Identity"],
      cover: { type: "gradient", kind: "grid", colors: ["#101010", "#5a7d57"] },
    },
    {
      id: "cyanotype-zines",
      title: "Cyanotype & Zines",
      client: "Plana / Tijuana Book Fairs",
      year: "2015–2018",
      category: "Editorial",
      summary: "Hands-on print — cyanotype, silkscreen and letterpress.",
      description:
        "Self-published zines and prints exhibited at art-book fairs across Brazil, Mexico and Scotland. Process-driven work bridging analogue craft and editorial thinking.",
      tags: ["Print craft", "Zine", "Exhibition"],
      cover: { type: "gradient", kind: "abstract", colors: ["#002b5c", "#7fc8f8"] },
    },
    {
      id: "synthetic-editorial",
      title: "Synthetic Editorial",
      client: "Self-initiated",
      year: "2025",
      category: "AI",
      summary: "Editorial worlds generated, then art-directed.",
      description:
        "An ongoing exploration using Midjourney, Gemini and GPT as a studio of collaborators — generating imagery, then directing, curating and composing it into coherent editorial narratives.",
      tags: ["Midjourney", "Art direction", "Editorial"],
      cover: { type: "gradient", kind: "abstract", colors: ["#1a0024", "#ff3da6"] },
    },
    {
      id: "brand-ai-systems",
      title: "Brand × AI Systems",
      client: "Strichpunkt (R&D)",
      year: "2025",
      category: "AI",
      summary: "Generative systems that stay on-brand.",
      description:
        "Prototyping how generative tools can scale a brand's visual language without losing its soul — building prompts, guardrails and curation workflows that keep output unmistakably ownable.",
      tags: ["Generative", "Brand system", "R&D"],
      cover: { type: "gradient", kind: "grid", colors: ["#06231f", "#1fe0a0"] },
    },
    {
      id: "type-experiments",
      title: "Synthetic Type",
      client: "Self-initiated",
      year: "2025",
      category: "AI",
      summary: "Lettering and type, reimagined with machines.",
      description:
        "Experiments at the edge of type design and generative imagery — continuing the typographic curiosity recognised by the TDC Ascenders, now with a new set of tools.",
      tags: ["Type", "Lettering", "AI"],
      cover: { type: "gradient", kind: "type", colors: ["#0a0a0a", "#c9ff2e"] },
    },
  ],

  cv: {
    experience: [
      { period: "2026", role: "Senior Art Director", place: "Strichpunkt Design" },
      { period: "2022 – Nov 2025", role: "Senior Designer", place: "Strichpunkt Design" },
      { period: "2020 – 2022", role: "Art Director", place: "Strichpunkt Design" },
      { period: "2015 – 2020", role: "Founder partner", place: "Studio Margem" },
      { period: "2012 – 2015", role: "Designer", place: "Cosac Naify publishing house" },
      { period: "2011 – 2012", role: "Designer", place: "CLDT Design" },
      { period: "2010 – 2011", role: "Intern, graphic design", place: "Lumini" },
      { period: "2008 – 2009", role: "Trainee", place: "Ps.2 Design" },
    ],
    international: [
      { period: "2019", role: "Weltformat workshop — Undisciplined Tools w/ Anja Kaiser", place: "Lucerne, CH" },
      { period: "2019", role: "Dogo Residenz für Neue Kultur — art residency grant", place: "Lichtensteig, CH" },
      { period: "2016", role: "Jury — II Latin American Prize for Editorial Design", place: "Buenos Aires, AR" },
      { period: "2014", role: "Guest speaker — FIL International Book Fair", place: "Guadalajara, MX" },
      { period: "2014", role: "Brazil-Conexion government exchange grant", place: "London, UK" },
      { period: "2012", role: "Onlab summer school", place: "Berlin, DE" },
      { period: "2009", role: "Exchange program", place: "Belgrade, RS" },
      { period: "2005", role: "English language course", place: "San Diego, USA" },
    ],
    awards: [
      { year: "2018", title: "Ascenders — Type Directors Club NY" },
      { year: "2018", title: "Latin American Award for Editorial Design — Honorable Mention" },
      { year: "2018", title: "Taipei International Design Award — Finalist, Visual Communication" },
      { year: "2016", title: "Latin American Award for Editorial Design — 1st Place" },
      { year: "2015", title: "11th Brazilian Biennial of Graphic Design — Featured (2 projects)" },
      { year: "2015", title: "30th Brazilian Design Museum Award — Honorable Mention" },
      { year: "2015", title: "22nd Nascent Prize, PRCEU — Honorable Mention" },
      { year: "2014", title: "27th Brazilian Design Museum Award — 1st Place" },
      { year: "2014", title: "UNESCO Rio on Poster Contest — Honorable Mention" },
      { year: "2013", title: "Free Access, São Paulo Cultural Center — 1st Place" },
    ],
    lectures: [
      { year: "2019", title: "Cyanotype workshop for young adults — Dogo Kunstschule", kind: "Workshop" },
      { year: "2019", title: "Open Day — EBAC British School of Creative Arts", kind: "Lecture" },
      { year: "2018", title: "Editorial Design Practice — University of Architecture & Urbanism", kind: "Lecture" },
      { year: "2018", title: "Books & Zines — Oswald de Andrade Art Space", kind: "Workshop" },
      { year: "2018", title: "Opfer — Galeria Jaqueline Martins", kind: "Exhibition" },
      { year: "2017", title: "Graphic Design Festival Scotland", kind: "Exhibition" },
      { year: "2016–2018", title: "Tijuana Art Book Fair", kind: "Exhibition" },
      { year: "2015–2018", title: "Plana Art Book Fair", kind: "Exhibition" },
      { year: "2014", title: "Editorial Work — Guadalajara Art Book Fair", kind: "Lecture" },
      { year: "2014", title: "AGI Poster Exhibition", kind: "Exhibition" },
    ],
    software: ["Photoshop", "Illustrator", "InDesign", "Figma", "Midjourney", "Gemini", "GPT", "Keynote"],
    languages: [
      { name: "English", level: "Fluent" },
      { name: "Portuguese", level: "Native" },
      { name: "German", level: "B1.2" },
    ],
    education: [
      { period: "2010 – 2013", title: "BA Graphic & Product Design", place: "University of São Paulo (USP)" },
      { period: "2007 – 2010", title: "Architecture & Urbanism (transferred)", place: "University of São Paulo (USP)" },
    ],
  },
};
