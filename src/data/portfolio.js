// Portfolio products + interactive demo data.
// `demo.video`/`poster` are optional — until provided, the PhoneSimulator runs
// a tap-through walkthrough of `stops`. When a real MP4 + real `t` timestamps
// are added, the same `stops` auto-pause the video at those times instead.
export const products = [
  {
    name: "Vimarsha",
    tagline: "EPUB reader, reimagined",
    category: "Monetised Apps",
    description:
      "Turns any EPUB into a narrated audiobook — figures surface in sync as you listen, voice notes drop straight onto the page, and an AI companion discusses the book with you using its own content.",
    demo: {
      orientation: "portrait",
      stops: [
        { t: 4, tip: "Figures surface in sync as the narration plays." },
        { t: 10, tip: "Drop voice notes straight onto the page." },
        { t: 16, tip: "An AI companion discusses the book with you." },
      ],
    },
  },
  {
    name: "Speko",
    tagline: "Voice-first spend tracker",
    category: "Monetised Apps",
    description:
      "Log expenses just by saying them. An AI spending coach reads your habits back to you and nudges sharper money decisions in the moment — not in a monthly report.",
    demo: {
      orientation: "portrait",
      stops: [
        { t: 4, tip: "Log an expense just by saying it." },
        { t: 10, tip: "An AI coach reads your habits back to you." },
        { t: 16, tip: "Sharper nudges in the moment — not next month." },
      ],
    },
  },
  {
    name: "Rezt",
    tagline: "Rest & recovery, scored",
    category: "Monetised Apps",
    description:
      "Syncs with your Apple Watch and turns recovery science into daily guidance — when to push, when to back off, and how to train smarter for real results.",
    demo: {
      orientation: "portrait",
      stops: [
        { t: 4, tip: "Syncs straight with your Apple Watch." },
        { t: 10, tip: "Recovery science becomes a daily score." },
        { t: 16, tip: "Know when to push and when to back off." },
      ],
    },
  },
  {
    name: "InstantConfig",
    tagline: "Vendor Agnostic",
    category: "Agentic Commerce",
    description:
      "An agent that assembles valid multi-SKU configurations in seconds, enforcing every compatibility rule along the way. For any industry where parts combine — no spec sheets, no costly mistakes.",
    demo: {
      orientation: "landscape",
      stops: [
        { t: 4, tip: "Pick your requirements in plain language." },
        { t: 10, tip: "The agent assembles valid multi-SKU configs in seconds." },
        { t: 16, tip: "Every compatibility rule enforced — no costly mistakes." },
      ],
    },
  },
  {
    name: "DataMind",
    tagline: "Local Data Analyst Agent for Excel",
    category: "SME Solution",
    description:
      "A data analyst that runs entirely on your machine. Ask your Excel files anything in plain language and get answers, charts and insight back — your data never leaves your laptop.",
    demo: {
      orientation: "landscape",
      stops: [
        { t: 4, tip: "Load any Excel file — it stays on your machine." },
        { t: 10, tip: "Ask it anything in plain language." },
        { t: 16, tip: "Get answers, charts and insight back instantly." },
      ],
    },
  },
  {
    name: "LawyerBoss",
    tagline: "First-contact, in minutes",
    category: "Legal Assistance",
    description:
      "Built for lawyers: draft first-contact legal notices in minutes instead of hours — researched, jurisdiction-aware and ready to send after a quick review.",
    demo: {
      orientation: "landscape",
      stops: [
        { t: 4, tip: "Enter the case details." },
        { t: 10, tip: "A researched, jurisdiction-aware notice drafts itself." },
        { t: 16, tip: "Ready to send after a quick review." },
      ],
    },
  },
  {
    name: "Satya Social",
    tagline: "Human-first. Aadhaar-gated.",
    category: "Social Network",
    description:
      "A social network for modern India where every voice is a real, verified person. Aadhaar-gated and free of AI-generated content — authenticity by design, not by moderation.",
    demo: {
      orientation: "portrait",
      stops: [
        { t: 4, tip: "Every account is Aadhaar-gated." },
        { t: 10, tip: "Every voice is a real, verified person." },
        { t: 16, tip: "Free of AI-generated content — by design." },
      ],
    },
  },
  {
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
  {
    name: "VR Real Estate Tour",
    tagline: "Walk it before it's built",
    category: "Architecture",
    description:
      "Immersive VR walkthroughs that let buyers tour a property or design long before construction begins — so you sell the space before the first brick is laid.",
    demo: {
      orientation: "landscape",
      stops: [
        { t: 4, tip: "Choose a property or unbuilt design." },
        { t: 10, tip: "Walk through it in immersive VR." },
        { t: 16, tip: "Sell the space before the first brick is laid." },
      ],
    },
  },
];
