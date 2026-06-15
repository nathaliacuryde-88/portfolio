/* =====================================================================
   PORTFOLIO CONTENT — single source of truth
   Edit text/projects/CV here (or use in-browser Edit mode).
   Images live in assets/work/ (rendered from the real portfolio).
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
    // Editorial statement headline. Words wrapped in *asterisks* render as serif italic accent.
    statement: "Nathalia Cury is a senior art director shaping *brands,* *editorial* & *AI-driven* design — from concept to launch.",
    heroIntro:
      "Award-winning art director based in Stuttgart. Currently leading branding at Strichpunkt Design.",
    // BIG landing hero. Use any image, GIF or video. To use a video/GIF just point
    // at the file — .mp4/.webm/.mov auto-render as looping video, everything else as image.
    // Example video:  heroMedia: { src: "assets/work/showreel.mp4", poster: "assets/work/amg-2.jpg" }
    // BIG landing hero — a CAROUSEL. Mix images, GIFs or videos freely.
    // .mp4/.webm/.mov auto-play as looping video; everything else is an image.
    heroSlides: [
      "assets/work/yaga-1.jpg",
      "assets/work/amg-2.jpg",
      "assets/work/x1f-1.jpg",
      "assets/work/volocopter-1.jpg",
      "assets/work/ortlieb-1.jpg",
    ],
    heroMedia: { src: "assets/work/yaga-1.jpg" },
    // Six projects featured as big tiles on the landing (3 across, 2 rows). By id.
    featured: ["x1f", "amg", "diva-e", "ortlieb", "volocopter", "ifood"],
  },

  // Logos shown in the trust row (text-set client names)
  clients: ["AMG", "Deutsche Bahn", "Volocopter", "Endava", "diva-e", "Ortlieb", "iFood", "Cosac Naify", "x1F"],

  about: {
    headline: "Using typography, image and system thinking to help companies and culture find their voice.",
    paragraphs: [
      "I started in Architecture and Urbanism at the University of São Paulo in 2007, moved to Design in 2010, and graduated in 2013 as a Graphic and Product Designer.",
      "I began at studios Ps.2 Design and CLDT, at Lumini and the publisher Cosac Naify, then co-founded the independent studio Margem in 2015 — working across print and digital for companies, institutions and cultural centers.",
      "In 2018 I was selected as one of the Ascenders by the Type Directors Club in New York — celebrating designers under 35 for achievements in typography, type design and lettering.",
      "Today I'm a Senior Art Director at Strichpunkt Design, leading branding for IT, local and global brands — overseeing projects from concept to delivery while guiding the team.",
    ],
    capabilities: [
      { title: "Branding", items: ["Brand strategy & positioning", "Identity systems", "Art direction", "Naming & messaging", "Launch & rollout"] },
      { title: "Editorial", items: ["Book & report design", "Typography & type direction", "Print production", "Exhibition graphics", "Self-publishing"] },
      { title: "AI", items: ["Generative art direction", "Midjourney · Gemini · GPT", "Prompt & guardrail systems", "Synthetic imagery", "On-brand workflows"] },
    ],
    stats: [
      { value: "15+", label: "Years in design" },
      { value: "10", label: "Awards & nominations" },
      { value: "TDC", label: "Ascender, NY 2018" },
      { value: "3", label: "Countries lived & worked" },
    ],
  },

  categories: ["All", "Branding", "Editorial", "AI"],

  projects: [
    {
      id: "x1f", title: "x1F", client: "x1F (with GMK · Strichpunkt)", year: "2025",
      category: "Branding", accent: "#c2f23f", bg: "#0e0e0c",
      summary: "Sixteen specialists, one vision — a brand built on “Progress made possible.”",
      description:
        "Transforming 16 specialists into a single company with a shared vision was the core challenge behind x1F. Together with GMK, Strichpunkt guided the transformation with a holistic, agile approach — from positioning to identity and marketing strategy. In an intensive strategy phase the guiding principle “Progress made possible” emerged, expressing the company’s commitment to constant development inside and out. The result is a dynamic, clear and distinctive design.",
      role: "Creative Direction", team: ["Creative Direction — Nathalia Cury", "Design — Stephanie Teuber", "Design — Marlene Kogel"],
      stats: [{ value: "16→1", label: "Specialists unified" }, { value: "1,200", label: "Employees at launch" }, { value: "3,700m²", label: "Launch event" }],
      images: ["assets/work/x1f-1.jpg", "assets/work/x1f-2.jpg", "assets/work/x1f-3.jpg", "assets/work/x1f-4.jpg"],
    },
    {
      id: "ortlieb", title: "Ortlieb", client: "Ortlieb", year: "2024",
      category: "Branding", accent: "#c46a3c", bg: "#3a241a",
      summary: "Toughness and sentiment — memories that last a lifetime.",
      description:
        "For Ortlieb, known for its durable bags, the challenge was a brand expression that communicates both toughness and emotional value. The concept balances durability and sentiment through a striking typographic mix that pairs robustness with sensitivity. At its core: collecting memories that last a lifetime — just like Ortlieb products, companions through countless journeys. Textures from nature emphasise resilience and mirror the environments the bags are made for, from rain-soaked commutes to rugged expeditions.",
      role: "Art Direction & Design", team: ["Senior Design — Mathias Weissenböck", "In close collaboration with the founders & marketing"],
      stats: [{ value: "Type", label: "Robust × sensitive" }, { value: "Nature", label: "Texture system" }],
      images: ["assets/work/ortlieb-1.jpg", "assets/work/ortlieb-2.jpg", "assets/work/ortlieb-3.jpg", "assets/work/ortlieb-4.jpg"],
    },
    {
      id: "amg", title: "AMG 55 Years", client: "Mercedes-AMG", year: "2022",
      category: "Branding", accent: "#e0301e", bg: "#0c0c0c",
      summary: "The essence of speed — a campaign for 55 years of performance.",
      description:
        "The strategy was to capture the essence of speed and movement, inherent to AMG cars, through a visually striking corporate campaign celebrating 55 years of heritage and performance. Using a quick, lean process and a bold yet refined typography approach that transitions from italic bold to light, the work conveys acceleration and dynamism — a sleek, modern design that reinforces AMG’s position as a leader in the automotive industry.",
      role: "Creative Direction & Design", team: ["Creative Direction & Design — Nathalia Cury"],
      stats: [{ value: "55", label: "Years celebrated" }, { value: "Italic→Light", label: "Type in motion" }],
      images: ["assets/work/amg-2.jpg", "assets/work/amg-1.jpg", "assets/work/amg-3.jpg", "assets/work/amg-4.jpg"],
    },
    {
      id: "diva-e", title: "diva-e", client: "diva-e", year: "2022",
      category: "Branding", accent: "#3b34ff", bg: "#e9e9ff",
      summary: "“We put the passion in transaction.” A transactional experience partner.",
      description:
        "The strategy repositioned diva-e as a “Transactional Experience Partner” — shifting from service provider to a personality-driven brand. We built a comprehensive brand platform with a clear vision, mission and values, expanding the concept of “transaction” to the employer brand. Through intensive workshops we aligned everyone on the essence: “We put the passion in transaction.” The design language uses adaptive elements that transform through interaction, bringing the brand to life in the digital realm.",
      role: "Art Direction & Design", team: ["Art Direction & Design — Tanja Freudenthaler", "Junior Designer — Jan Burchiellaro", "Katinka Sacher"],
      stats: [{ value: "Adaptive", label: "Living system" }, { value: "Platform", label: "Vision to digital" }],
      images: ["assets/work/diva-e-1.jpg", "assets/work/diva-e-2.jpg", "assets/work/diva-e-3.jpg", "assets/work/diva-e-4.jpg"],
    },
    {
      id: "volocopter", title: "Volocopter", client: "Volocopter", year: "2023",
      category: "Branding", accent: "#5fd0e0", bg: "#0a1b32",
      summary: "Connecting Perspectives — identity for urban air mobility.",
      description:
        "For Volocopter, the strategy bridged cutting-edge technology and a seamless user experience in urban air mobility. The concept, Connecting Perspectives, reflects the fusion of technology and aesthetics, safety and innovation — expressed through the interplay of bold and light fonts, bright and dark colours, and upward movement. We worked closely with the team so every touchpoint, from website to app to social, reflected one unified, futuristic and trustworthy vision.",
      role: "Art Direction & Design", team: ["Designer — Marcel Zigler"],
      stats: [{ value: "Air", label: "Urban mobility" }, { value: "1→∞", label: "Touchpoints" }],
      images: ["assets/work/volocopter-1.jpg", "assets/work/volocopter-2.jpg", "assets/work/volocopter-3.jpg", "assets/work/volocopter-4.jpg"],
    },
    {
      id: "wattando", title: "Wattando", client: "Wattando", year: "2023",
      category: "Branding", accent: "#27c06a", bg: "#0c2419",
      summary: "Solar for every household — a logo that carries an energy impulse.",
      description:
        "Solar for every household: Wattando connects the sun with your home. With balcony power plants and a faster, simpler installation, Wattando democratises the electricity market. Collaborating closely with the founders, we built a branding solution around a logo that visualises energy impulses while resembling a power cable. With a small budget and tight timeline we took an agile approach — weekly Figma meetings, Slack updates, open discussions — delivering a lean brand ready to expand as Wattando grows.",
      role: "Art Direction & Design", team: ["Natascha Jokic", "Agile, founder-close process"],
      stats: [{ value: "Plug-in", label: "Green power" }, { value: "Agile", label: "Lean build" }],
      images: ["assets/work/wattando-1.jpg", "assets/work/wattando-2.jpg", "assets/work/wattando-3.jpg", "assets/work/wattando-4.jpg"],
    },
    {
      id: "endava", title: "Endava", client: "Endava", year: "2022",
      category: "Branding", accent: "#e0492f", bg: "#16181c",
      summary: "“It’s all about the people.” A people-centred tech brand.",
      description:
        "We explored Endava’s personality through executive interviews, employee insights and focus groups, then a tonalities workshop to define voice and look — distilled into a collaborative design sprint with Endava’s own team. From logo redesign to a strategic communication concept across internal and external formats, every element reinforces the brand. In a market where talent is key, we created an Employer Value Proposition amplifying the core principle: “It’s all about the people.”",
      role: "Lead Design", team: ["Lead Design — Nathalia Cury", "Designer — Kim Hasselhof"],
      stats: [{ value: "EVP", label: "Employer brand" }, { value: "People", label: "At the centre" }],
      images: ["assets/work/endava-1.jpg", "assets/work/endava-2.jpg", "assets/work/endava-3.jpg", "assets/work/endava-4.jpg"],
    },
    {
      id: "ifood", title: "iFood", client: "iFood (Estudio Margem)", year: "2019",
      category: "Branding", accent: "#ea1d2c", bg: "#fff1f0",
      summary: "Humanising Latin America’s leading food-delivery brand.",
      description:
        "The strategy repositioned iFood as approachable and friendly while keeping its leadership in Latin American food delivery. We redesigned the logo around facial expression — showing moods and emotions to humanise the brand — and expanded the palette to only hues found in food, adding warmth and appetite. Our scope spanned a distinct photo style, engaging motion interactions and app development, creating a holistic visual language that makes iFood a more personal companion.",
      role: "Design (Estudio Margem)", team: ["Alexandre Lindenberg", "João Pedro"],
      stats: [{ value: "LatAm", label: "Market leader" }, { value: "Emotion", label: "Expressive logo" }],
      images: ["assets/work/ifood-1.jpg", "assets/work/ifood-2.jpg", "assets/work/ifood-3.jpg", "assets/work/ifood-4.jpg"],
    },
    {
      id: "eberl-koesel", title: "Eberl & Kösel", client: "Eberl & Kösel", year: "2021",
      category: "Branding", accent: "#ff2d78", bg: "#0d0d0d",
      summary: "A merger reborn — tradition fused with innovation. Four ADC Awards.",
      description:
        "In a pandemic-shaped year we accompanied the merger of two industry leaders, Kösel and Eberl Print, into a future-oriented brand: Eberl & Kösel. Four business fields were each introduced with distinctive colour themes within a unified framework. At the core stood a self-confident, unconventional identity built on the contrast of deep black and pure white, with a bold ligature of the first two letters as a super symbol. The launch — a customer magazine and an opulent poster box — energised the market and earned four Art Directors Club (ADC) Awards.",
      role: "Art Direction & Design", team: ["Jochen Teurer", "Frederik Sutter"],
      stats: [{ value: "4×", label: "ADC Awards" }, { value: "2→1", label: "Industry leaders merged" }, { value: "B/W", label: "Super symbol" }],
      images: ["assets/work/eberl-koesel-1.jpg", "assets/work/eberl-koesel-2.jpg", "assets/work/eberl-koesel-3.jpg", "assets/work/eberl-koesel-4.jpg"],
    },
    {
      id: "okno", title: "OKNO", client: "OKNO (Estudio Margem)", year: "2018",
      category: "Branding", accent: "#2f5bff", bg: "#0a1230",
      summary: "A window to another reality — identity for 360º video.",
      description:
        "Identity for OKNO, a 360º video production company. The name means “window” in several Slavic languages, reinforcing the idea of a “window to another reality.” We manipulated the letter ‘O’ into a digital portal — layers and concentric elements representing multiple planes of vision. A dedicated art-direction strategy, with a photo shoot and 3D illustrations merging reality and digital abstraction, gave the brand a dreamlike, high-tech atmosphere.",
      role: "Art Direction & Design", team: ["Estudio Margem"],
      stats: [{ value: "360º", label: "Immersive" }, { value: "Portal", label: "The letter O" }],
      images: ["assets/work/okno-1.jpg", "assets/work/okno-2.jpg", "assets/work/okno-3.jpg"],
    },
    {
      id: "cosac-naify", title: "Cosac Naify", client: "Cosac Naify (publisher)", year: "2012–2015",
      category: "Editorial", accent: "#2f5fb0", bg: "#1c2330",
      summary: "Books as material objects for one of Brazil’s great publishers.",
      description:
        "For over three years I contributed to the in-house design team at Cosac Naify — one of Brazil’s most influential and cherished publishing houses, renowned for art, architecture, design and sophisticated literature. Editorial design here was highly conceptual and collaborative: every book a special project, in close exchange with editors and authors to translate complex narratives into distinct, material objects. I managed and executed projects that prioritised materiality, typography and structure, at the highest caliber of Brazilian bookmaking.",
      role: "Designer", team: ["Collaboration — Elaine Ramos", "Paulo Chagas", "Alexandre Lindenberg"],
      stats: [{ value: "3 yrs", label: "In-house" }, { value: "Material", label: "Book as object" }],
      images: ["assets/work/cosac-naify-1.jpg", "assets/work/cosac-naify-2.jpg"],
    },
    {
      id: "bw-2019", title: "BW Stiftung ’19", client: "Baden-Württemberg Stiftung", year: "2020",
      category: "Editorial", accent: "#2f8a55", bg: "#16331f",
      summary: "“How do we want to live?” An annual report as a living portrait.",
      description:
        "The 2019 annual report for the Baden-Württemberg Stiftung captured a moment of tension between security and change. Instead of abstract answers, it sought concrete perspectives from the people shaping the region’s future — travelling through the Black Forest to meet communities, initiatives and entrepreneurs embodying ecological, technological and social change. The design turned these voices into a vivid collage of reportage, interviews, maps, illustrations and photography — extended into a multi-platform experience online.",
      role: "Design & Art Direction", team: ["Design & Art Direction — Adrian Trinkaus"],
      stats: [{ value: "20+ yrs", label: "Stiftung mission" }, { value: "Multi", label: "Print × digital" }],
      images: ["assets/work/bw-2019-1.jpg", "assets/work/bw-2019-2.jpg", "assets/work/bw-2019-3.jpg", "assets/work/bw-2019-4.jpg"],
    },
    {
      id: "bw-2021", title: "BW Stiftung ’21", client: "Baden-Württemberg Stiftung", year: "2021",
      category: "Editorial", accent: "#d8662e", bg: "#2c1a10",
      summary: "“Do we argue too much — or too little?” A stage for democratic exchange.",
      description:
        "This annual report tackled a pressing social question: do we argue too much — or too little? The challenge was to translate a provocative theme into a format that encourages reflection, dialogue and participation. The design turned abstract debates into tangible narratives — reportage, interviews, essays and strong collages exploring how disagreement can drive progress or division. The result goes beyond documentation to become a stage for democratic exchange, extended online and across social media.",
      role: "Design & Art Direction & Illustration", team: ["Concept — Katharina Bergman", "Intern — Moritz Brauer", "Webdesign — Sebastian Winter"],
      stats: [{ value: "Debate", label: "As a format" }, { value: "Collage", label: "Tangible narrative" }],
      images: ["assets/work/bw-2021-1.jpg", "assets/work/bw-2021-2.jpg", "assets/work/bw-2021-3.jpg", "assets/work/bw-2021-4.jpg"],
    },
    {
      id: "sao-paulo-bienal", title: "São Paulo Bienal", client: "12th São Paulo Architecture Bienal", year: "2019",
      category: "Editorial", accent: "#ef7a3c", bg: "#241019",
      summary: "“Todo Dia / Everyday” — elevating the ordinary.",
      description:
        "The visual identity for the 12th São Paulo Architecture Bienal, themed “Todo Dia — Everyday,” elevates the ordinary and celebrates the overlooked elements of daily life. The palette drew from the transitional colours of the sunset, lending warmth and familiarity, while the identity incorporated everyday materials and objects — curtains, newspapers, the inflatable advertisements seen at gas stations. By integrating these tangible objects, the project bridged architecture with daily urban existence: universally accessible and deeply resonant.",
      role: "Art Direction & Design", team: ["Ciro Miguel"],
      stats: [{ value: "12th", label: "Architecture Bienal" }, { value: "Sunset", label: "Everyday palette" }],
      images: ["assets/work/sao-paulo-bienal-1.jpg", "assets/work/sao-paulo-bienal-2.jpg", "assets/work/sao-paulo-bienal-3.jpg"],
    },
    {
      id: "yaga", title: "YAGA Festival", client: "YAGA (with Porto Rocha)", year: "2018",
      category: "Editorial", accent: "#ff2a1f", bg: "#1a0807",
      summary: "A fearless, collective identity — community over hierarchy.",
      description:
        "For the independent music festival YAGA in São Paulo I was invited by Porto Rocha to help create the visual identity. YAGA connects Brazilian and international subcultures and embraces queer and trans identities; its first edition became an act of resistance just days after Bolsonaro’s election. The bold use of red — passion, love, blood, protest — paired with murky tones from São Paulo’s “ugly beauty.” A hyperextended logo radiated boldness, all artists’ names treated equally, polished graphics contrasted with lo-fi audience selfies — a fearless, collective identity.",
      role: "Design (with Porto Rocha)", team: ["Felipe Rocha", "Leo Porto"],
      stats: [{ value: "Red", label: "Passion × protest" }, { value: "Equal", label: "No hierarchy" }],
      images: ["assets/work/yaga-1.jpg", "assets/work/yaga-2.jpg", "assets/work/yaga-3.jpg", "assets/work/yaga-4.jpg"],
    },
    {
      id: "zine", title: "Zine Collection", client: "Self-initiated", year: "2013–2018",
      category: "Editorial", accent: "#ff4da6", bg: "#15101a",
      summary: "Cyanotype, silkscreen and letterpress — hands-on type & print.",
      description:
        "A collection of self-published zines and type specimens made with cyanotype, silkscreen and letterpress — exhibited at art-book fairs across Brazil, Mexico and Scotland (Plana, Tijuana, Graphic Design Festival Scotland). Process-driven, experimental work bridging analogue craft and editorial thinking, continuing the typographic curiosity recognised by the TDC Ascenders.",
      role: "Self-initiated", team: ["Exhibited 2015–2018"],
      stats: [{ value: "3", label: "Print techniques" }, { value: "Fairs", label: "BR · MX · UK" }],
      images: ["assets/work/zine-1.jpg", "assets/work/zine-2.jpg", "assets/work/zine-3.jpg", "assets/work/zine-4.jpg"],
    },

    /* ---- AI: self-initiated explorations (generated covers) ---- */
    {
      id: "synthetic-editorial", title: "Synthetic Editorial", client: "Self-initiated", year: "2025",
      category: "AI", accent: "#ff3da6", bg: "#190420",
      summary: "Editorial worlds generated, then art-directed.",
      description:
        "An ongoing exploration using Midjourney, Gemini and GPT as a studio of collaborators — generating imagery, then directing, curating and composing it into coherent editorial narratives. The work asks where authorship sits when the camera is a prompt, and how editorial craft survives — and thrives — in a synthetic image pipeline.",
      role: "Art Direction & Prompting", team: ["Self-initiated exploration"],
      stats: [{ value: "MJ·Gemini·GPT", label: "Toolset" }, { value: "Direction", label: "Human in the loop" }],
      cover: { type: "gradient", kind: "abstract", colors: ["#190420", "#ff3da6"] },
      images: [],
    },
    {
      id: "brand-ai", title: "Brand × AI Systems", client: "R&D", year: "2025",
      category: "AI", accent: "#1fe0a0", bg: "#062019",
      summary: "Generative systems that stay unmistakably on-brand.",
      description:
        "Prototyping how generative tools can scale a brand’s visual language without losing its soul — building prompts, guardrails and curation workflows that keep output ownable. A bridge between the rigour of brand systems and the open-endedness of generative models.",
      role: "Art Direction & Systems", team: ["Self-initiated R&D"],
      stats: [{ value: "Guardrails", label: "On-brand output" }, { value: "Scale", label: "System thinking" }],
      cover: { type: "gradient", kind: "grid", colors: ["#062019", "#1fe0a0"] },
      images: [],
    },
    {
      id: "synthetic-type", title: "Synthetic Type", client: "Self-initiated", year: "2025",
      category: "AI", accent: "#c9ff2e", bg: "#0c0c0c",
      summary: "Lettering and type, reimagined with machines.",
      description:
        "Experiments at the edge of type design and generative imagery — continuing the typographic curiosity recognised by the TDC Ascenders, now with a new set of tools. Letterforms grown, distorted and curated into specimens that couldn’t be drawn by hand alone.",
      role: "Type & Art Direction", team: ["Self-initiated exploration"],
      stats: [{ value: "Type", label: "× generative" }, { value: "TDC", label: "Ascender lineage" }],
      cover: { type: "gradient", kind: "type", colors: ["#0c0c0c", "#c9ff2e"] },
      images: [],
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
