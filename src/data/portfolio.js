// Portfolio products + interactive demo data.
// `demo.video`/`poster` are optional ; until provided, the PhoneSimulator runs
// a tap-through walkthrough of `stops`. When a real MP4 + real `t` timestamps
// are added, the same `stops` auto-pause the video at those times instead.
export const products = [
  {
    slug: "vimarsha",
    name: "Vimarsha",
    tagline: "EPUB reader, reimagined",
    category: "Monetised Apps",
    description:
      "Turns any EPUB into a narrated audiobook ; figures surface in sync as you listen, voice notes drop straight onto the page, and an AI companion discusses the book with you using its own content.",
    demo: {
      orientation: "portrait",
      video: "/media/demos/vimarsha.mp4",
      poster: "/media/demos/vimarsha.jpg",
      stops: [
        { t: 14, tip: "Any EPUB, read aloud ; the words highlight in sync." },
        { t: 22, tip: "Drop voice notes straight onto the page." },
        { t: 28, tip: "An AI companion discusses the book with you." },
      ],
    },
  },
  {
    slug: "satya-social",
    name: "Satya Social",
    tagline: "Human-first. Aadhaar-gated.",
    category: "Social Network",
    frontendUrl: "https://kartar-satya.exe.xyz",
    description:
      "A social network for modern India where every voice is a real, verified person. Aadhaar-gated and free of AI-generated content ; authenticity by design, not by moderation.",
    demo: {
      orientation: "portrait",
      stops: [
        { t: 4, tip: "Open the feed ; real people, not bots." },
        { t: 10, tip: "Compose a post in the moment." },
        { t: 16, tip: "Profile and social graph, built in." },
      ],
    },
  },
  {
    slug: "lawyerboss",
    name: "LawyerBoss",
    tagline: "First-contact, in minutes",
    category: "Legal Assistance",
    frontendUrl: "https://kartar-lawyerboss.exe.xyz",
    description:
      "Built for lawyers: draft first-contact legal notices in minutes instead of hours ; researched, jurisdiction-aware and ready to send after a quick review.",
    demo: {
      orientation: "portrait",
      video: "/media/demos/lawyerboss.mp4",
      poster: "/media/demos/lawyerboss.jpg",
      stops: [
        { t: 10, tip: "Open a case and review the legal intake conversation." },
        { t: 38, tip: "Record the request ; LawyerBoss transcribes it into the case." },
        { t: 60, tip: "Review the evidence and open the generated legal notice draft." },
      ],
    },
  },
  {
    slug: "instantconfig",
    name: "InstantConfig",
    tagline: "Vendor Agnostic",
    category: "Agentic Commerce",
    frontendUrl: "https://kartar-instantconfig.exe.xyz",
    description:
      "An agent that assembles valid multi-SKU configurations in seconds, enforcing every compatibility rule along the way. For any industry where parts combine ; no spec sheets, no costly mistakes.",
    demo: {
      orientation: "landscape",
      video: "/media/demos/instantconfig.mp4",
      poster: "/media/demos/instantconfig.jpg",
      stops: [
        { t: 4, tip: "Pick your requirements in plain language." },
        { t: 10, tip: "The agent assembles valid multi-SKU configs in seconds." },
        { t: 24, tip: "Every compatibility rule enforced ; no costly mistakes." },
      ],
    },
  },
  {
    slug: "datamind",
    name: "DataMind",
    tagline: "Local Data Analyst Agent for Excel",
    category: "SME Solution",
    frontendUrl: "https://kartar-datamind.exe.xyz",
    description:
      "A data analyst that runs entirely on your machine. Ask your Excel files anything in plain language and get answers, charts and insight back ; your data never leaves your laptop.",
    demo: {
      orientation: "landscape",
      video: "/media/demos/datamind.mp4",
      poster: "/media/demos/datamind.jpg",
      stops: [
        { t: 3, tip: "Load any Excel file ; it stays on your machine." },
        { t: 7, tip: "Ask it anything in plain language." },
        { t: 12, tip: "Get answers, charts and insight back instantly." },
      ],
    },
  },
  {
    slug: "vr-real-estate-tour",
    name: "VR Real Estate Walkthrough",
    tagline: "Walk it before it's built",
    category: "Architecture",
    description:
      "Immersive VR walkthroughs that let buyers tour a property or design long before construction begins ; so you sell the space before the first brick is laid.",
    demo: {
      orientation: "landscape",
      video: "/media/demos/vr-walkthrough.mp4",
      poster: "/media/demos/vr-walkthrough.jpg",
      stops: [
        { t: 4, tip: "Choose a property or unbuilt design." },
        { t: 10, tip: "Walk through it in immersive VR." },
        { t: 16, tip: "Sell the space before the first brick is laid." },
      ],
    },
  },
  {
    slug: "prodvton",
    name: "ProdVTON",
    tagline: "Virtual try-on for brands",
    category: "Fashion",
    frontendUrl: "https://kartar-prodvton.exe.xyz",
    description:
      "Let customers see your products worn on lifelike models before they buy. Built for fashion brands to lift conversion, cut returns and bring the fitting room online.",
    demo: {
      orientation: "portrait",
      stops: [
        { t: 4, tip: "Pick any product from the catalogue." },
        { t: 10, tip: "See it worn on lifelike models before buying." },
        { t: 16, tip: "Lift conversion and cut returns." },
      ],
    },
  },
  {
    slug: "wingmen",
    name: "Wingmen",
    tagline: "Your agent finds the date",
    category: "Social Network",
    frontendUrl: "https://kartar-wingmen.exe.xyz",
    description:
      "You only talk to your own agent. A pool proposes matches, personal agents negotiate compatibility, photos unlock after a mutual yes, and the two agents set the date.",
    demo: {
      orientation: "portrait",
      stops: [
        { t: 4, tip: "Talk to your own agent ; not a swipe deck." },
        { t: 10, tip: "Agents negotiate compatibility before anyone sees a photo." },
        { t: 16, tip: "Mutual yes unlocks photos and books the date." },
      ],
    },
  },
  {
    slug: "quantumexp",
    name: "QuantumExp",
    tagline: "Geometric algebra, live",
    category: "Research Lab",
    frontendUrl: "https://kartar-quantumexp.exe.xyz",
    description:
      "An interactive lab for geometric algebra as the native language of quantum gates. Simulate Grover and Shor in real time, or describe a problem in plain language and watch it become a runnable experiment.",
    demo: {
      orientation: "landscape",
      stops: [
        { t: 4, tip: "Describe a quantum problem in plain language." },
        { t: 10, tip: "Watch it compile into geometric-algebra math and a live circuit." },
        { t: 16, tip: "Step through Grover or Shor with amplitudes on screen." },
      ],
    },
  },
  {
    slug: "nyayalegal",
    name: "NyayaLegal",
    tagline: "Grounded legal AI",
    category: "Legal Assistance",
    frontendUrl: "https://kartar-nyayalegal.exe.xyz",
    description:
      "Legal answers that cite their sources. Built to reason over a grounded graph of Indian law instead of improvising from a chatbot's memory.",
    demo: {
      orientation: "landscape",
      stops: [
        { t: 4, tip: "Ask a legal question in plain language." },
        { t: 10, tip: "Answers are grounded in a graph of statute and precedent." },
        { t: 16, tip: "Every claim comes with a citation trail." },
      ],
    },
  },
  {
    slug: "tabletennis",
    name: "TableTennis",
    tagline: "AI coach on every rally",
    category: "Sports",
    frontendUrl: "https://kartar-tabletennis.exe.xyz",
    description:
      "Upload match footage and get professional coaching back: rally detection, pose tracking, comparison against a pro database, and drills aimed at the stroke you actually missed.",
    demo: {
      orientation: "landscape",
      stops: [
        { t: 4, tip: "Drop in a rally clip." },
        { t: 10, tip: "Pose tracking reads the stroke frame by frame." },
        { t: 16, tip: "Coaching notes and drills matched to what you actually did." },
      ],
    },
  },
  {
    slug: "newstime",
    name: "NewsTime",
    tagline: "AI-anchor newsroom",
    category: "Media",
    frontendUrl: "https://kartar-newstime.exe.xyz",
    description:
      "A multilingual newsroom where editorial teams ingest stories, approve scripts, generate AI-anchor video, and publish reels to a public feed ; the same feed the mobile app reads.",
    demo: {
      orientation: "landscape",
      stops: [
        { t: 4, tip: "Ingest a story and get a script for review." },
        { t: 10, tip: "Queue AI-anchor video once editorial signs off." },
        { t: 16, tip: "Publish to the public reel feed." },
      ],
    },
  },
  {
    slug: "customsiq",
    name: "CustomsIQ",
    tagline: "Clearance, classified",
    category: "Logistics",
    description:
      "Agentic HS-code classification, duty calculation and document prep for customs brokers ; built to cut clearance delays without a human re-keying every shipment.",
    demo: {
      orientation: "landscape",
      stops: [
        { t: 4, tip: "Drop a shipment pack into the agent." },
        { t: 10, tip: "HS codes and duty land with a reason trail." },
        { t: 16, tip: "Documents assembled for clearance, not for a spreadsheet." },
      ],
    },
  },
  {
    slug: "artrenamer",
    name: "ArtRenamer",
    tagline: "Files named from the work",
    category: "Desktop Tools",
    description:
      "A desktop tool that names artwork files from what they actually contain, so a gallery catalog is not a folder of IMG_4032s.",
    demo: {
      orientation: "landscape",
      stops: [
        { t: 4, tip: "Point it at a folder of untitled art files." },
        { t: 10, tip: "Each piece is named from what is on the canvas." },
        { t: 16, tip: "The catalog is the filesystem, not a spreadsheet." },
      ],
    },
  },
];
