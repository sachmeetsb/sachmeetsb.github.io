// Portfolio products + interactive demo data.
// `demo.video`/`poster` are optional — until provided, the PhoneSimulator runs
// a tap-through walkthrough of `stops`. When a real MP4 + real `t` timestamps
// are added, the same `stops` auto-pause the video at those times instead.
export const products = [
  {
    slug: "vimarsha",
    name: "Vimarsha",
    tagline: "EPUB reader, reimagined",
    category: "Monetised Apps",
    description:
      "Turns any EPUB into a narrated audiobook — figures surface in sync as you listen, voice notes drop straight onto the page, and an AI companion discusses the book with you using its own content.",
    demo: {
      orientation: "portrait",
      video: "/media/demos/vimarsha.mp4",
      poster: "/media/demos/vimarsha.jpg",
      stops: [
        { t: 14, tip: "Any EPUB, read aloud — the words highlight in sync." },
        { t: 22, tip: "Drop voice notes straight onto the page." },
        { t: 28, tip: "An AI companion discusses the book with you." },
      ],
    },
  },
  {
    slug: "speko",
    name: "Speko",
    tagline: "Voice-first spend tracker",
    category: "Monetised Apps",
    description:
      "Log expenses just by saying them. An AI spending coach reads your habits back to you and nudges sharper money decisions in the moment — not in a monthly report.",
    demo: {
      orientation: "portrait",
      video: "/media/demos/speko.mp4",
      poster: "/media/demos/speko.jpg",
      stops: [
        { t: 4, tip: "Say it once — Speko extracts the amount, category, merchant and date." },
        { t: 13.5, tip: "Your dashboard and spending insights update instantly." },
        { t: 25, tip: "Ask your money anything — the answer is grounded in your own spending." },
      ],
    },
  },
  {
    slug: "rezt",
    name: "Rezt",
    tagline: "Rest & recovery, scored",
    category: "Monetised Apps",
    description:
      "Syncs with your Apple Watch and turns recovery science into daily guidance — when to push, when to back off, and how to train smarter for real results.",
    demo: {
      orientation: "portrait",
      video: "/media/demos/rezt.mp4",
      poster: "/media/demos/rezt.jpg",
      stops: [
        { t: 14, tip: "Recovery 92 — green light when your body can take a hard session." },
        { t: 22, tip: "Stats from Apple Health: HRV, resting heart rate, and sleep." },
        { t: 30, tip: "Second Wind — a wind-down so overnight HRV can recover." },
      ],
    },
  },
  {
    slug: "satya-social",
    name: "Satya Social",
    tagline: "Human-first. Aadhaar-gated.",
    category: "Social Network",
    description:
      "A social network for modern India where every voice is a real, verified person. Aadhaar-gated and free of AI-generated content — authenticity by design, not by moderation.",
    demo: {
      orientation: "portrait",
      stops: [
        { t: 4, tip: "Open the feed — real people, not bots." },
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
    description:
      "Built for lawyers: draft first-contact legal notices in minutes instead of hours — researched, jurisdiction-aware and ready to send after a quick review.",
    demo: {
      orientation: "portrait",
      video: "/media/demos/lawyerboss.mp4",
      poster: "/media/demos/lawyerboss.jpg",
      stops: [
        { t: 10, tip: "Open a case and review the legal intake conversation." },
        { t: 38, tip: "Record the request — LawyerBoss transcribes it into the case." },
        { t: 60, tip: "Review the evidence and open the generated legal notice draft." },
      ],
    },
  },
  {
    slug: "instantconfig",
    name: "InstantConfig",
    tagline: "Vendor Agnostic",
    category: "Agentic Commerce",
    description:
      "An agent that assembles valid multi-SKU configurations in seconds, enforcing every compatibility rule along the way. For any industry where parts combine — no spec sheets, no costly mistakes.",
    demo: {
      orientation: "landscape",
      video: "/media/demos/instantconfig.mp4",
      poster: "/media/demos/instantconfig.jpg",
      stops: [
        { t: 4, tip: "Pick your requirements in plain language." },
        { t: 10, tip: "The agent assembles valid multi-SKU configs in seconds." },
        { t: 24, tip: "Every compatibility rule enforced — no costly mistakes." },
      ],
    },
  },
  {
    slug: "datamind",
    name: "DataMind",
    tagline: "Local Data Analyst Agent for Excel",
    category: "SME Solution",
    description:
      "A data analyst that runs entirely on your machine. Ask your Excel files anything in plain language and get answers, charts and insight back — your data never leaves your laptop.",
    demo: {
      orientation: "landscape",
      video: "/media/demos/datamind.mp4",
      poster: "/media/demos/datamind.jpg",
      stops: [
        { t: 3, tip: "Load any Excel file — it stays on your machine." },
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
      "Immersive VR walkthroughs that let buyers tour a property or design long before construction begins — so you sell the space before the first brick is laid.",
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
];
