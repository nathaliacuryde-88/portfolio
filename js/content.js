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
    instagram: "https://instagram.com/nathcury",
    instagramHandle: "@nathcury",
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
    featured: ["ortlieb", "amg", "x1f", "yaga", "ifood", "volocopter"],
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

  // "Lifestyle" is a cross-cutting filter: projects opt in via  filters: ["Lifestyle"]
  categories: ["All", "Branding", "Lifestyle", "Editorial", "AI"],

  // Work page intro (replaces the big "Selected Work" headline)
  work: {
    intro: "My work. An overview of recent case studies, as well as a selection of my self-initiated projects.",
  },

  projects: [
    {
      "id": "x1f",
      "title": "x1F",
      "client": "x1F (with GMK · Strichpunkt)",
      "year": "2025",
      "category": "Branding",
      "accent": "#c2f23f",
      "bg": "#0e0e0c",
      "summary": "Sixteen specialists, one vision — a brand built on “Progress made possible.”",
      "description": "Transforming 16 specialists into a single company with a shared vision was the core challenge behind the x1F brand. The task was not only to bundle individual expertise into excellence from a single source, but also to preserve the company’s DNA: customer proximity, tailored solutions, trustful collaboration and a fair, non-hierarchical culture. To compete with the Big Four, x1F needed more than expertise — a professional presence, clear communication and efficient processes. Together with GMK, Strichpunkt guided the transformation with a holistic, agile approach, from positioning to identity and marketing strategy. In an intensive strategy phase, the guiding principle “Progress made possible” emerged, expressing the company’s commitment to constant development inside and out.",
      "outcome": "A dynamic, clear and distinctive design. The new brand launched in January 2025 with 1,200 employees: a large-scale event staged across 3,700m² with multimedia experiences, from banners to a digital fashion show, marking the beginning of a strong, unified brand presence.",
      "role": "Creative Direction",
      "team": [
        "Creative Direction — Nathalia Cury",
        "Design — Stephanie Teuber",
        "Design — Marlene Kogel"
      ],
      "stats": [
        {
          "value": "16→1",
          "label": "Specialists unified"
        },
        {
          "value": "1,200",
          "label": "Employees at launch"
        },
        {
          "value": "3,700m²",
          "label": "Launch event"
        }
      ],
      "images": [
        "assets/work/x1f-01.jpg",
        "assets/work/x1f-02.jpg",
        "assets/work/x1f-03.jpg",
        "assets/work/x1f-04.jpg",
        "assets/work/x1f-05.jpg",
        "assets/work/x1f-06.jpg",
        "assets/work/x1f-07.jpg",
        "assets/work/x1f-08.jpg"
      ]
    },
    {
      "id": "ortlieb",
      "filters": [
        "Lifestyle"
      ],
      "title": "Ortlieb",
      "client": "Ortlieb",
      "year": "2024",
      "category": "Branding",
      "accent": "#c46a3c",
      "bg": "#3a241a",
      "summary": "Toughness and sentiment — memories that last a lifetime.",
      "description": "For Ortlieb, a trusted brand known for its durable bags, the challenge was to create a brand expression that communicates both toughness and emotional value. The design concept balances durability and sentiment, captured through a striking mix of typography that pairs robustness with sensitivity. At the core of the idea lies the thought of collecting memories that last a lifetime – just like Ortlieb products, which become companions through countless journeys and adventures. Textures from nature were integrated into the design to emphasize resilience and to mirror the diverse environments the bags are made for: from city streets and rain-soaked commutes to rugged outdoor expeditions. This tactile and visual language underscores how Ortlieb is not only a brand of high-performance gear, but also of enduring stories and personal experiences.",
      "outcome": "The project was developed in a small, dedicated team, working closely with the marketing department and the founders of the brand. This close collaboration allowed the design to stay true to Ortlieb’s DNA while evolving it into a more emotionally engaging narrative.",
      "role": "Senior Design",
      "team": [
        "Creative Direction — Mathias Weissenbock",
        "Senior Design — Nathalia Cury"
      ],
      "stats": [
        {
          "value": "Type",
          "label": "Robust × sensitive"
        },
        {
          "value": "Nature",
          "label": "Texture system"
        }
      ],
      "hero": "assets/work/ortlieb-01.jpg",
      "images": [
        "assets/work/ortlieb-g01.jpg",
        "assets/work/ortlieb-g02.jpg",
        "assets/work/ortlieb-g03.jpg",
        "assets/work/ortlieb-g04.jpg",
        "assets/work/ortlieb-g05.jpg",
        "assets/work/ortlieb-g06.jpg",
        "assets/work/ortlieb-g07.jpg",
        "assets/work/ortlieb-g08.jpg",
        "assets/work/ortlieb-g09.jpg",
        "assets/work/ortlieb-g10.jpg"
      ]
    },
    {
      "id": "amg",
      "filters": [
        "Lifestyle"
      ],
      "title": "AMG 55 Years",
      "client": "Mercedes-AMG",
      "year": "2022",
      "category": "Branding",
      "accent": "#e0301e",
      "bg": "#0c0c0c",
      "summary": "The essence of speed — a campaign for 55 years of performance.",
      "description": "The strategy was to capture the essence of speed and movement, inherent to AMG cars, through a visually striking corporate campaign celebrating 55 years of the company’s heritage and performance. The challenge: convey the brand’s high-performance personality in a concise and impactful way, while honouring its rich history. We worked with a quick and lean process and a bold yet refined typography approach that transitions from italic bold to light, conveying the sensation of acceleration and dynamism.",
      "outcome": "A sleek, modern campaign that embodies the AMG spirit — communicating the brand’s commitment to performance and speed over five decades, resonating with the target audience and reinforcing AMG’s position as a leader in the automotive industry.",
      "role": "Creative Direction & Design",
      "team": [
        "Creative Direction & Design — Nathalia Cury"
      ],
      "stats": [
        {
          "value": "55",
          "label": "Years celebrated"
        },
        {
          "value": "Italic→Light",
          "label": "Type in motion"
        }
      ],
      "images": [
        "assets/work/amg-01.jpg",
        "assets/work/amg-02.jpg",
        "assets/work/amg-03.jpg",
        "assets/work/amg-04.jpg",
        "assets/work/amg-05.jpg",
        "assets/work/amg-06.jpg",
        "assets/work/amg-07.jpg",
        "assets/work/amg-08.jpg"
      ]
    },
    {
      "id": "diva-e",
      "title": "diva-e",
      "client": "diva-e",
      "year": "2022",
      "category": "Branding",
      "accent": "#3b34ff",
      "bg": "#e9e9ff",
      "summary": "“We put the passion in transaction.” A transactional experience partner.",
      "description": "The strategy was to reposition diva-e as a “Transactional Experience Partner”, shifting from a service provider to a personality-driven brand that showcases its passion for the best digital experience. The challenge: a unique, accessible identity that differentiates diva-e from competitors and highlights its ability to think in a networked way, creating connections between technologies, competences and systems. We developed a comprehensive brand platform with vision, mission and values, and expanded the concept of “transaction” beyond core services to the employer brand. Intensive workshops with employees, managers and departments aligned everyone with the new positioning.",
      "outcome": "A brand essence — “We put the passion in transaction” — and a design language of adaptive elements that transform through interaction, bringing the brand to life in the digital realm.",
      "role": "Art Direction & Design",
      "team": [
        "Creative Direction — Tanja Freudenthaler",
        "Art Direction & Design — Jan Burchiellaro",
        "Art Direction & Design — Nathalia Cury",
        "Junior Designer — Katinka Sacher"
      ],
      "stats": [
        {
          "value": "Adaptive",
          "label": "Living system"
        },
        {
          "value": "Platform",
          "label": "Vision to digital"
        }
      ],
      "images": [
        "assets/work/diva-e-01.jpg",
        "assets/work/diva-e-02.jpg",
        "assets/work/diva-e-03.jpg",
        "assets/work/diva-e-04.jpg",
        "assets/work/diva-e-05.jpg",
        "assets/work/diva-e-06.jpg",
        "assets/work/diva-e-07.jpg",
        "assets/work/diva-e-08.jpg",
        "assets/work/diva-e-09.jpg"
      ]
    },
    {
      "id": "volocopter",
      "title": "Volocopter",
      "client": "Volocopter",
      "year": "2023",
      "category": "Branding",
      "accent": "#5fd0e0",
      "bg": "#0a1b32",
      "summary": "Connecting Perspectives — identity for urban air mobility.",
      "description": "For Volocopter, the creative strategy centered on bridging the gap between cutting-edge technology and a seamless user experience in urban air mobility. The overarching concept, Connecting Perspectives, reflects the fusion of elements: technology and aesthetics, safety and innovation, convenience and excitement. This is visually expressed through the interplay of bold and light fonts, bright and dark colors and the movement from down to up of the elements.",
      "outcome": "Approaching this challenge involved crafting a brand identity that could communicate Volocopter’s unique role in the future of transportation. The design system was developed to be as dynamic and multifaceted as the brand itself, merging functional elements with emotional appeal. By tying the visual identity to the concept of connection—both digitally and in the travel experience—our goal was to position Volocopter as accessible, futuristic, and trustworthy. We worked closely with the Volocopter team to ensure every touchpoint, from their website to the app and even their social media, reflected this unified vision, helping bring the brand’s promise to life.",
      "role": "Art Direction & Design",
      "team": [
        "Creative Direction — Tanja Freudenthaler",
        "Art Direction · Design — Nathalia Cury",
        "Designer — Marcel Zigler",
        "Designer — Stephanie Teuber"
      ],
      "stats": [
        {
          "value": "Air",
          "label": "Urban mobility"
        },
        {
          "value": "3",
          "label": "Web · App · Social"
        }
      ],
      "hero": "assets/work/volocopter-01.jpg",
      "images": [
        "assets/work/volocopter-g01.jpg",
        "assets/work/volocopter-g02.jpg",
        "assets/work/volocopter-g03.jpg",
        "assets/work/volocopter-g04.jpg",
        "assets/work/volocopter-g05.jpg",
        "assets/work/volocopter-g06.jpg",
        "assets/work/volocopter-g07.jpg",
        "assets/work/volocopter-g08.jpg",
        "assets/work/volocopter-g09.jpg",
        "assets/work/volocopter-g10.jpg"
      ]
    },
    {
      "id": "wattando",
      "title": "Wattando",
      "client": "Wattando",
      "year": "2023",
      "category": "Branding",
      "accent": "#27c06a",
      "bg": "#0c2419",
      "summary": "Solar for every household — a logo that carries an energy impulse.",
      "description": "Solar for every household: Wattando connects the sun with your home. With balcony power plants and a faster, simpler installation than conventional systems, Wattando aims to democratize the electricity market. Their “plug-and-play solution for professionals” removes barriers, enabling green electricity to be fed into the grid via a power socket—whether in apartments, homes, or commercial spaces. Collaborating closely with the founders, we developed a branding solution tailored to their needs. The highlight is the logo, which visualizes energy impulses while resembling a power cable essential to the product. The distinctive “W” in the typogram extends the impulse across the branding, supported by a color scheme that balances innovative green technology with solid implementation.",
      "outcome": "With a small budget and tight timeline, we took an agile approach. Weekly Figma meetings, Slack updates, and open discussions replaced lengthy processes, ensuring efficiency without compromising quality. The result was a lean branding that provided essential elements and easy use, ready to expand as Wattando grows.",
      "role": "Art Direction & Design",
      "team": [
        "Creative Direction — Tanja Freudenthaler",
        "Art Direction · Design — Nathalia Cury",
        "Junior Designer — Natascha Jokic"
      ],
      "stats": [
        {
          "value": "Plug-in",
          "label": "Green power"
        },
        {
          "value": "Agile",
          "label": "Lean build"
        }
      ],
      "hero": "assets/work/wattando-01.jpg",
      "images": [
        "assets/work/wattando-g01.jpg",
        "assets/work/wattando-g02.jpg",
        "assets/work/wattando-g03.jpg",
        "assets/work/wattando-g04.jpg",
        "assets/work/wattando-g05.jpg",
        "assets/work/wattando-g06.jpg",
        "assets/work/wattando-g07.jpg"
      ]
    },
    {
      "id": "endava",
      "title": "Endava",
      "client": "Endava",
      "year": "2022",
      "category": "Branding",
      "accent": "#e0492f",
      "bg": "#16181c",
      "summary": "“It’s all about the people.” An employer brand and identity built around people.",
      "description": "The approach began with an in-depth exploration of Endava’s personality through executive interviews, employee insights and focus groups. A tonalities workshop defined the brand’s voice and look, and the insights were distilled into a collaborative design sprint that let Endava’s team actively shape the corporate identity. In a competitive market where talent is key, Endava needed to move beyond short-term campaigns — so we created an Employer Value Proposition and a strategic messaging framework around its core principle: “It’s all about the people.”",
      "outcome": "A trustworthy, differentiated brand that resonates with employees, talent and customers alike: from the logo redesign to a communication concept covering internal and external formats, merchandise and events — from recruiter messages to onboarding strategies — reflecting a people-centred image that motivates employees, attracts talent and builds trust.",
      "role": "Lead Design",
      "team": [
        "Creative Direction — Tanja Freudenthaler",
        "Lead Design — Nathalia Cury",
        "Design — Natascha Jokic",
        "Design — Katinka Sacher",
        "Junior Designer — Kim Hasselhof"
      ],
      "stats": [
        {
          "value": "EVP",
          "label": "Employer brand"
        },
        {
          "value": "People",
          "label": "At the centre"
        }
      ],
      "images": [
        "assets/work/endava-01.jpg",
        "assets/work/endava-02.jpg",
        "assets/work/endava-03.jpg",
        "assets/work/endava-04.jpg",
        "assets/work/endava-05.jpg",
        "assets/work/endava-06.jpg",
        "assets/work/endava-07.jpg",
        "assets/work/endava-08.jpg",
        "assets/work/endava-09.jpg"
      ]
    },
    {
      "id": "ifood",
      "filters": [
        "Lifestyle"
      ],
      "title": "iFood",
      "client": "iFood (Estudio Margem)",
      "year": "2019",
      "category": "Branding",
      "accent": "#ea1d2c",
      "bg": "#fff1f0",
      "summary": "Humanising Latin America’s leading food-delivery brand.",
      "description": "The strategy behind the creative was to reposition the brand as approachable and friendly, while maintaining its leadership in the Latin American food delivery market. This links to the challenge of evolving the logo to convey a more emotional connection with users, making it relatable and endearing. We approached this challenge by collaborating closely with Ifood’s strategy team to redesign the logo, focusing on the facial expression to showcase different moods and emotions, thereby humanizing the brand. The expansion of the color palette was carefully considered to only include hues found in food, adding warmth and appetizing visuals to the brand identity.",
      "outcome": "Additionally, our scope involved the curation and development of a distinct photo style, showcasing vibrant and mouth-watering dishes, as well as crafting engaging motion interactions that bring the brand to life. We also worked on app development, ensuring a seamless user experience that integrates our design elements cohesively. By doing so, we created a holistic visual language that resonates with users, making Ifood a more personal and engaging companion in their daily food delivery experiences.",
      "role": "Creative Direction (Estudio Margem)",
      "team": [
        "Creative Direction — Alexandre Lindenberg",
        "Creative Direction — Nathalia Cury",
        "Junior Designer — João Pedro"
      ],
      "stats": [
        {
          "value": "LatAm",
          "label": "Market leader"
        },
        {
          "value": "Emotion",
          "label": "Expressive logo"
        }
      ],
      "hero": "assets/work/ifood-01.jpg",
      "images": [
        "assets/work/ifood-g01.jpg",
        "assets/work/ifood-g02.jpg",
        "assets/work/ifood-g03.jpg",
        "assets/work/ifood-g04.jpg",
        "assets/work/ifood-g05.jpg",
        "assets/work/ifood-g06.jpg"
      ]
    },
    {
      "id": "eberl-koesel",
      "title": "Eberl & Kösel",
      "client": "Eberl & Kösel",
      "year": "2021",
      "category": "Branding",
      "accent": "#ff2d78",
      "bg": "#0d0d0d",
      "summary": "A merger reborn — tradition fused with innovation. Four ADC Awards.",
      "description": "In the midst of a pandemic-shaped year, we accompanied the merger of two industry leaders, Kösel and Eberl Print — the birth of a future-oriented brand, Eberl & Kösel. Four innovative business fields were defined, each introduced with distinctive colour themes to emphasise individuality within a unified brand framework. At the core stood a new identity: self-confident and unconventional, built on the strong contrast of deep black and pure white. The bold ligature of the first two letters acts as a super symbol — a striking sign of unity and progress.",
      "outcome": "The launch was celebrated with the first issue of the new customer magazine and an opulent poster box, showcasing the brand’s spirit and its outstanding print capabilities. The communication energised the market and impressed the creative industry — earning four Art Directors Club (ADC) Awards.",
      "role": "Design",
      "team": [
        "Creative Direction — Jochen Teurer",
        "Design — Nathalia Cury",
        "Design — Frederik Sutter"
      ],
      "stats": [
        {
          "value": "4×",
          "label": "ADC Awards"
        },
        {
          "value": "2→1",
          "label": "Industry leaders merged"
        },
        {
          "value": "B/W",
          "label": "Super symbol"
        }
      ],
      "images": [
        "assets/work/eberl-koesel-01.jpg",
        "assets/work/eberl-koesel-02.jpg",
        "assets/work/eberl-koesel-03.jpg",
        "assets/work/eberl-koesel-04.jpg",
        "assets/work/eberl-koesel-05.jpg",
        "assets/work/eberl-koesel-06.jpg",
        "assets/work/eberl-koesel-07.jpg",
        "assets/work/eberl-koesel-08.jpg"
      ]
    },
    {
      "id": "okno",
      "title": "OKNO",
      "client": "OKNO (Estudio Margem)",
      "year": "2018",
      "category": "Branding",
      "accent": "#2f5bff",
      "bg": "#0a1230",
      "summary": "A window to another reality — identity for 360º video.",
      "description": "Brand identity for OKNO, a 360º video production company. The name means “window” in several Slavic languages, reinforcing the core concept of a “window to another reality”. The identity needed to convey both the cutting-edge digital nature of 360º video and the immersive, dreamlike quality of the experience. The letter ‘O’ became a digital portal — layers of information and concentric elements representing multiple planes of vision and the technology that opens them.",
      "outcome": "A cohesive aesthetic, with a dedicated art-direction strategy: a coordinated photo shoot and 3D illustrations that merge reality with digital abstraction, evoking a dreamlike, high-tech atmosphere across the whole brand experience.",
      "role": "Creative Direction (Estudio Margem)",
      "team": [
        "Creative Direction — Nathalia Cury / Estudio Margem"
      ],
      "stats": [
        {
          "value": "360º",
          "label": "Immersive"
        },
        {
          "value": "Portal",
          "label": "The letter O"
        }
      ],
      "images": [
        "assets/work/okno-01.jpg",
        "assets/work/okno-02.jpg",
        "assets/work/okno-03.jpg"
      ]
    },
    {
      "id": "cosac-naify",
      "title": "Cosac Naify",
      "client": "Cosac Naify (publisher)",
      "year": "2012–2015",
      "category": "Editorial",
      "accent": "#2f5fb0",
      "bg": "#1c2330",
      "summary": "Books as material objects for one of Brazil’s great publishers.",
      "description": "For over three years I contributed to the in-house design team at Cosac Naify, arguably one of Brazil’s most influential and cherished publishing houses — renowned for unparalleled quality and a standard of fine printing and meticulous production in art, architecture, design and sophisticated literature. Editorial design was a highly conceptual, collaborative process: every book was a special project, in close exchange with editors and authors to translate complex narratives into distinct, material objects.",
      "outcome": "Design projects that prioritised materiality, typography and structure, ensuring each publication reflected the rigorous intellectual and aesthetic standards that made Cosac Naify synonymous with the highest caliber of Brazilian bookmaking.",
      "role": "Designer",
      "team": [
        "Collaboration — Elaine Ramos",
        "Collaboration — Paulo Chagas",
        "Collaboration — Alexandre Lindenberg"
      ],
      "stats": [
        {
          "value": "3 yrs",
          "label": "In-house"
        },
        {
          "value": "Material",
          "label": "Book as object"
        }
      ],
      "images": [
        "assets/work/cosac-naify-01.jpg",
        "assets/work/cosac-naify-02.jpg"
      ]
    },
    {
      "id": "bw-2019",
      "title": "BW Stiftung ’19",
      "client": "Baden-Württemberg Stiftung",
      "year": "2020",
      "category": "Editorial",
      "accent": "#2f8a55",
      "bg": "#16331f",
      "summary": "“How do we want to live?” An annual report as a living portrait.",
      "description": "Designing the 2019 annual report for the Baden-Württemberg Stiftung meant capturing a moment of tension: between security and change, tradition and transformation. In times of crisis and reorientation the challenge was to address a fundamental question — How do we want to live? Instead of abstract answers, the report sought concrete perspectives from the people shaping the future in the region. Travelling through the Black Forest and beyond, we met communities, initiatives and entrepreneurs who embody ecological, technological and social change in everyday life.",
      "outcome": "More than a printed report: a multi-platform experience — vivid collage of reportages, interviews, maps, illustrations and photography, extended through the website land.wir-gesellschaft-bw.de and social media with long-form stories, statements, visual essays and videos. A living, multimedia portrait of a society in motion.",
      "role": "Design & Art Direction",
      "team": [
        "Concept — Jochen Teurer, Katharina Bergman, Nathalia Cury",
        "Design & Art Direction — Nathalia Cury",
        "Webdesign — Nathalia Cury, Adrian Trinkaus"
      ],
      "stats": [
        {
          "value": "20+ yrs",
          "label": "Stiftung mission"
        },
        {
          "value": "Multi",
          "label": "Print × digital"
        }
      ],
      "images": [
        "assets/work/bw-2019-01.jpg",
        "assets/work/bw-2019-02.jpg",
        "assets/work/bw-2019-03.jpg",
        "assets/work/bw-2019-04.jpg",
        "assets/work/bw-2019-05.jpg",
        "assets/work/bw-2019-06.jpg"
      ]
    },
    {
      "id": "bolovo",
      "filters": [
        "Lifestyle"
      ],
      "title": "Bolovo 10 Years",
      "client": "Bolovo",
      "year": "2016",
      "category": "Editorial",
      "accent": "#c9a24a",
      "bg": "#111111",
      "summary": "A 10-year commemorative book for a sports & lifestyle brand — 800+ photos, gold hotstamping.",
      "description": "10 years commemorative book of the sports and lifestyle brand Bolovo. The book has more than 800 photos and texts about the history of the producer, going from the group’s travels, sports and clothing collections.",
      "outcome": "The cover has a folded poster jacket and is finished in gold hotstamping.",
      "role": "",
      "team": [],
      "stats": [
        {
          "value": "800+",
          "label": "Photos & texts"
        },
        {
          "value": "Gold",
          "label": "Hotstamped cover"
        }
      ],
      "images": [
        "assets/work/bolovo-01.jpg",
        "assets/work/bolovo-02.jpg",
        "assets/work/bolovo-03.jpg",
        "assets/work/bolovo-04.jpg",
        "assets/work/bolovo-05.jpg"
      ]
    },
    {
      "id": "corpo-presente",
      "filters": [
        "Lifestyle"
      ],
      "title": "Corpo Presente",
      "client": "Independent publication",
      "year": "",
      "category": "Editorial",
      "accent": "#9fb4c7",
      "bg": "#0d0d0d",
      "summary": "Photographs of São Paulo’s street movements — an independently funded authorial publication.",
      "description": "Corpo presente (Body Present) is an independently funded authorial publication that presents photographs of social movements struggling in the streets of São Paulo and the expression and presence of marginalized bodies in public space. The author discusses the biopolitical tension between the resistant bodies and the reactionary politics that dispute the city.",
      "outcome": "The publication cover and the poster were printed on mirrored paper, reflecting the surroundings.",
      "role": "",
      "team": [],
      "stats": [
        {
          "value": "Mirror",
          "label": "Printed on mirrored paper"
        }
      ],
      "images": [
        "assets/work/corpo-presente-01.jpg",
        "assets/work/corpo-presente-02.jpg",
        "assets/work/corpo-presente-03.jpg"
      ]
    },
    {
      "id": "bw-2021",
      "title": "BW Stiftung ’21",
      "client": "Baden-Württemberg Stiftung",
      "year": "2021",
      "category": "Editorial",
      "accent": "#d8662e",
      "bg": "#2c1a10",
      "summary": "“Do we argue too much — or too little?” A stage for democratic exchange.",
      "description": "The 2021 annual report of the Baden-Württemberg Stiftung tackled a pressing social question: Do we argue too much — or too little? The challenge was to translate this provocative theme into a format that encourages reflection, dialogue and active participation — not only how we discuss the future, but how democratic culture is shaped in public spaces, private encounters and society at large. Reportages, interviews, essays and strong collages turned abstract debates into tangible narratives about how disagreement can drive progress — or create division.",
      "outcome": "An annual report that goes beyond documentation: a stage for democratic exchange, extended into the digital space through a dedicated website and social-media formats with deeper insights, discussions and multimedia content.",
      "role": "Design, Art Direction & Illustration",
      "team": [
        "Concept — Jochen Teurer, Katharina Bergman, Nathalia Cury",
        "Design, Art Direction & Illustrations — Nathalia Cury",
        "Intern — Moritz Brauer",
        "Webdesign — Nathalia Cury, Sebastia Winter"
      ],
      "stats": [
        {
          "value": "Debate",
          "label": "As a format"
        },
        {
          "value": "Collage",
          "label": "Tangible narrative"
        }
      ],
      "images": [
        "assets/work/bw-2021-01.jpg",
        "assets/work/bw-2021-02.jpg",
        "assets/work/bw-2021-03.jpg",
        "assets/work/bw-2021-04.jpg",
        "assets/work/bw-2021-05.jpg",
        "assets/work/bw-2021-06.jpg",
        "assets/work/bw-2021-07.jpg"
      ]
    },
    {
      "id": "sao-paulo-bienal",
      "filters": [
        "Lifestyle"
      ],
      "title": "São Paulo Bienal – Todo Dia",
      "client": "12th São Paulo Architecture Bienal",
      "year": "2019",
      "category": "Editorial",
      "accent": "#ef7a3c",
      "bg": "#241019",
      "summary": "“Todo Dia / Everyday” — elevating the ordinary.",
      "description": "The visual identity for the 12th São Paulo Architecture Bienal, themed “Todo Dia - Everyday,” was conceived to elevate the ordinary and celebrate the overlooked elements of daily life. The design centered on two core areas: a specific color palette and a selection of common, everyday materials. The palette drew direct inspiration from the vibrant, transitional colors of the sunset, symbolizing the cyclical nature of “every day” and lending a sense of warmth and familiarity to the visual system.",
      "outcome": "Crucially, the identity incorporated materials and objects deeply ingrained in our daily routines and urban landscape. This included textiles like curtains, readily available resources like newspapers, and ubiquitous advertising forms such as the large inflatable advertisements typically seen at gas stations. By integrating these commonplace, tangible objects, the project sought to bridge the abstract concepts of architecture with the reality of daily urban existence. The result was an identity that was both universally accessible and deeply resonant, formally framing the Bienal’s core mandate: to find meaning and design in the “everyday”.",
      "role": "Design & Art Direction (Estudio Margem)",
      "team": [
        "Concept — Ciro Miguel",
        "Design · Art Direction — Nathalia Cury / Estudio Margem"
      ],
      "stats": [
        {
          "value": "12th",
          "label": "Architecture Bienal"
        },
        {
          "value": "Sunset",
          "label": "Everyday palette"
        }
      ],
      "hero": "assets/work/sao-paulo-bienal-01.jpg",
      "images": [
        "assets/work/sao-paulo-bienal-g01.jpg",
        "assets/work/sao-paulo-bienal-g02.jpg",
        "assets/work/sao-paulo-bienal-g03.jpg"
      ]
    },
    {
      "id": "other-transatlantic",
      "filters": [
        "Lifestyle"
      ],
      "title": "The Other Trans-Atlantic",
      "client": "Exhibition identity (Estudio Margem)",
      "year": "",
      "category": "Editorial",
      "accent": "#d9d9d9",
      "bg": "#101010",
      "summary": "A Kinetic & Op Art identity activated by the viewer’s movement.",
      "description": "Designing the visual identity for an exhibition on Kinetic and Op Art required capturing movement and the subjective nature of perception. The core concept: the identity must be activated by the viewer — transforming as they move — embodying the principles of the art itself. The solution focused on geometry, duality and the active viewer. A central wall panel was built from two parallel murals set at a 45º angle, alternating and revealing different patterns depending on the spectator’s position.",
      "outcome": "A modular structure that informed a custom typographic font family, constructed with precise mathematical calculations from the basic shapes circle, triangle and square. To address ‘the other’ and ‘transatlantic’, the layout plays with layers of information — terms constantly hiding and showing as the viewer moves — using a strong diagonal and varying font weights to create depth.",
      "role": "Design & Art Direction (Estudio Margem)",
      "team": [
        "Design & Art Direction — Nathalia Cury / Estudio Margem"
      ],
      "stats": [
        {
          "value": "45º",
          "label": "Two parallel murals"
        },
        {
          "value": "3",
          "label": "Shapes: ○ △ □"
        }
      ],
      "images": [
        "assets/work/other-transatlantic-01.jpg",
        "assets/work/other-transatlantic-02.jpg"
      ]
    },
    {
      "id": "yaga",
      "filters": [
        "Lifestyle"
      ],
      "title": "YAGA Festival",
      "client": "YAGA (with Porto Rocha)",
      "year": "2018",
      "category": "Editorial",
      "accent": "#ff2a1f",
      "bg": "#1a0807",
      "summary": "A fearless, collective identity — community over hierarchy.",
      "description": "For the independent music festival YAGA in São Paulo, I was invited by Porto Rocha to collaborate on the festival’s visual identity. YAGA embraces queer and trans identities by connecting Brazilian and international subcultures; its first edition became a powerful act of resistance and solidarity, taking place just days after Bolsonaro’s election. The bold use of red — passion, love, blood and protest — became the foundation, paired with murky complementary tones inspired by São Paulo’s gritty “ugly beauty”. The visual language balanced fluid, organic gestures with sharp, impactful moments.",
      "outcome": "A fearless, collective identity: a hyperextended logo radiating boldness, equal treatment of all artists’ names to reflect community over hierarchy, and polished graphics deliberately contrasted with lo-fi audience selfies — celebrating individuality in its most unfiltered form.",
      "role": "Design (with Porto Rocha)",
      "team": [
        "Creative Direction — Felipe Rocha",
        "Creative Direction — Leo Porto",
        "Design — Nathalia Cury",
        "Design — Alexandre Lindenberg"
      ],
      "stats": [
        {
          "value": "Red",
          "label": "Passion × protest"
        },
        {
          "value": "Equal",
          "label": "No hierarchy"
        }
      ],
      "images": [
        "assets/work/yaga-01.jpg",
        "assets/work/yaga-02.jpg",
        "assets/work/yaga-03.jpg",
        "assets/work/yaga-04.jpg",
        "assets/work/yaga-05.jpg"
      ]
    },
    {
      "id": "vj",
      "filters": [
        "Lifestyle"
      ],
      "title": "VJ Programm",
      "client": "Self-initiated",
      "year": "",
      "category": "AI",
      "accent": "#f5e642",
      "bg": "#05050a",
      "summary": "A real-time VJ tool that turns gesture into generative art.",
      "description": "A real-time VJ program built from my interest in the synergistic connection between visuals and sound. It works as a dynamic performance tool that translates gesture into generative art. Built on a JavaScript foundation — Figma Make for initial design concepts, MediaPipe for advanced input recognition and Three.js for complex, high-performance 3D graphics.",
      "outcome": "Fully operable via hand control (gesture recognition) or direct audio input, for versatile live performance. Two aesthetic possibilities — 2D and 3D output — with integrated colour-palette control and an auto-control function for dynamic, evolving visuals.",
      "role": "Concept, Design & Code",
      "team": [
        "Self-initiated"
      ],
      "stats": [
        {
          "value": "Gesture",
          "label": "Hand-controlled"
        },
        {
          "value": "2D / 3D",
          "label": "Output modes"
        }
      ],
      "images": [
        "assets/work/vj-01.jpg",
        "assets/work/vj-02.jpg"
      ]
    },
    {
      "id": "zine",
      "title": "Zine Collection",
      "client": "Self-initiated",
      "year": "2013–2018",
      "category": "Editorial",
      "accent": "#ff4da6",
      "bg": "#15101a",
      "summary": "Risograph zines and small books — colour, registration and layering.",
      "description": "My deep-rooted interest in printing techniques and material quality, originating in university, led me to extensive experimentation within my own studio practice. Central to it was the Risograph, a duplicator that became the primary tool for a collection of zines and small books. Working with it let me push the boundaries of colour separation, registration and layering — turning production constraints into unique design opportunities.",
      "outcome": "A body of personal, conceptual projects and rich collaborations with other artists.",
      "role": "Self-initiated",
      "team": [
        "Self-initiated"
      ],
      "stats": [
        {
          "value": "Riso",
          "label": "Primary tool"
        },
        {
          "value": "Zines",
          "label": "& small books"
        }
      ],
      "images": [
        "assets/work/zine-01.jpg",
        "assets/work/zine-02.jpg",
        "assets/work/zine-03.jpg"
      ]
    },
  ],

  cv: {
    experience: [
      { period: "2026", role: "Senior Art Director", place: "Strichpunkt Design", emoji: "✨" },
      { period: "2022 – Nov 2025", role: "Senior Designer", place: "Strichpunkt Design" },
      { period: "2020 – 2022", role: "Art Director", place: "Strichpunkt Design" },
      { period: "2015 – 2020", role: "Founder partner", place: "Studio Margem", emoji: "🚀" },
      { period: "2012 – 2015", role: "Designer", place: "Cosac Naify publishing house" },
      { period: "2011 – 2012", role: "Designer", place: "CLDT Design" },
      { period: "2010 – 2011", role: "Intern, graphic design", place: "Lumini" },
      { period: "2008 – 2009", role: "Trainee", place: "Ps.2 Design" },
    ],
    international: [
      { period: "2019", role: "Weltformat workshop — Undisciplined Tools w/ Anja Kaiser", place: "Lucerne, CH", emoji: "🛠️" },
      { period: "2019", role: "Dogo Residenz für Neue Kultur — art residency grant", place: "Lichtensteig, CH", emoji: "🎨" },
      { period: "2016", role: "Jury — II Latin American Prize for Editorial Design", place: "Buenos Aires, AR" },
      { period: "2014", role: "Guest speaker — FIL International Book Fair", place: "Guadalajara, MX", emoji: "🎤" },
      { period: "2014", role: "Brazil-Conexion government exchange grant", place: "London, UK" },
      { period: "2012", role: "Onlab summer school", place: "Berlin, DE", emoji: "🇩🇪" },
      { period: "2009", role: "Exchange program", place: "Belgrade, RS" },
      { period: "2005", role: "English language course", place: "San Diego, USA" },
    ],
    awards: [
      { year: "2018", title: "Ascenders — Type Directors Club NY", emoji: "⭐" },
      { year: "2018", title: "Latin American Award for Editorial Design — Honorable Mention" },
      { year: "2018", title: "Taipei International Design Award — Finalist, Visual Communication" },
      { year: "2016", title: "Latin American Award for Editorial Design — 1st Place", emoji: "🥇" },
      { year: "2015", title: "11th Brazilian Biennial of Graphic Design — Featured (2 projects)" },
      { year: "2015", title: "30th Brazilian Design Museum Award — Honorable Mention" },
      { year: "2015", title: "22nd Nascent Prize, PRCEU — Honorable Mention" },
      { year: "2014", title: "27th Brazilian Design Museum Award — 1st Place", emoji: "🥇" },
      { year: "2014", title: "UNESCO Rio on Poster Contest — Honorable Mention", emoji: "🌎" },
      { year: "2013", title: "Free Access, São Paulo Cultural Center — 1st Place" },
    ],
    lectures: [
      { year: "2019", title: "Cyanotype workshop for young adults — Dogo Kunstschule", kind: "Workshop", emoji: "🧪" },
      { year: "2019", title: "Open Day — EBAC British School of Creative Arts", kind: "Lecture" },
      { year: "2018", title: "Editorial Design Practice — University of Architecture & Urbanism", kind: "Lecture" },
      { year: "2018", title: "Books & Zines — Oswald de Andrade Art Space", kind: "Workshop" },
      { year: "2018", title: "Opfer — Galeria Jaqueline Martins", kind: "Exhibition" },
      { year: "2017", title: "Graphic Design Festival Scotland", kind: "Exhibition", emoji: "🏴󠁧󠁢󠁳󠁣󠁴󠁿" },
      { year: "2016–2018", title: "Tijuana Art Book Fair", kind: "Exhibition" },
      { year: "2015–2018", title: "Plana Art Book Fair", kind: "Exhibition" },
      { year: "2014", title: "Editorial Work — Guadalajara Art Book Fair", kind: "Lecture" },
      { year: "2014", title: "AGI Poster Exhibition", kind: "Exhibition" },
    ],
    // clustered (no labels): Adobe · AI · Web
    software: [
      ["Photoshop", "Illustrator", "InDesign", "After Effects"],
      ["Midjourney", "Gemini", "GPT", "Claude Code", "Stitch", "Lovable", "Figma Make"],
      ["Figma"],
    ],
    languages: [
      { name: "English", level: "Fluent", emoji: "🇬🇧" },
      { name: "Portuguese", level: "Native", emoji: "🇧🇷" },
      { name: "German", level: "B2.1", emoji: "🇩🇪" },
    ],
    education: [
      { period: "2010 – 2013", title: "BA Graphic & Product Design", place: "University of São Paulo (USP)", emoji: "🎓" },
      { period: "2007 – 2010", title: "Architecture & Urbanism (transferred)", place: "University of São Paulo (USP)", emoji: "📐" },
    ],
  },
};
