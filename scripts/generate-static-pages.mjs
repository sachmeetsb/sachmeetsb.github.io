// Post-build static page generator for kartar.ai
// Runs after `vite build` (see package.json "build").
//
// Generates into dist/:
//   - products/index.html            → crawlable product hub
//   - products/<slug>/index.html     → one static SEO page per product
//   - sitemap.xml                    → all routes
//   - injects a static, crawlable content block into index.html's #root
//     (boot shell covers it until React mounts; accessible without JavaScript)
//
// Pure Node, no dependencies. Reads product data from src/data/portfolio.js.

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { products } from "../src/data/portfolio.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const DIST = join(ROOT, "dist");
const SITE = "https://kartar.ai";

const esc = (s) =>
  String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

// ---------------------------------------------------------------------------
// Shared page chrome (brand-matched: void bg, saffron accents)
// ---------------------------------------------------------------------------
const CSS = `
:root{--void:#140d27;--saffron:#ff8e4f;--saffron-light:#ffa974}
*{margin:0;padding:0;box-sizing:border-box}
body{background:var(--void);color:#fff;font-family:'Plus Jakarta Sans',system-ui,-apple-system,sans-serif;line-height:1.6;-webkit-font-smoothing:antialiased}
a{color:#FFAA70;text-decoration:none}
a:hover{text-decoration:underline}
.wrap{max-width:880px;margin:0 auto;padding:48px 24px 80px}
header.site{display:flex;align-items:center;justify-content:space-between;margin-bottom:56px}
.logo{font-weight:800;font-size:24px;letter-spacing:-.5px;color:#fff}
.logo .sun{display:inline-flex;align-items:center;justify-content:center;width:38px;height:38px;margin-left:3px;border-radius:50%;font-size:14px;background:radial-gradient(circle at 40% 38%,#FFAA70 0%,#FF7A35 40%,#FF5E0E 100%)}
.pill{display:inline-block;padding:12px 26px;background:var(--saffron);color:#241226;border-radius:8px;font-weight:600;font-size:15px}
.pill:hover{background:var(--saffron-light);text-decoration:none}
.tag{display:inline-block;font-size:14px;color:#e0caef;background:#39264d;border-radius:5px;padding:5px 14px;margin-bottom:20px}
h1{font-size:clamp(34px,6vw,54px);font-weight:800;letter-spacing:-1.5px;line-height:1.1;margin-bottom:10px}
.tagline{font-size:20px;color:#FFAA70;margin-bottom:24px}
.desc{font-size:18px;color:rgba(255,255,255,.7);max-width:640px;margin-bottom:36px}
ul.feat{list-style:none;margin:0 0 44px}
ul.feat li{position:relative;padding-left:26px;margin-bottom:12px;color:rgba(255,255,255,.75);font-size:16px}
ul.feat li:before{content:"";position:absolute;left:0;top:9px;width:9px;height:9px;border-radius:50%;background:var(--saffron)}
video.demo{width:100%;max-width:640px;border-radius:20px;border:1px solid rgba(255,255,255,.15);margin-bottom:40px;display:block}
.cta{display:flex;gap:14px;flex-wrap:wrap;align-items:center;margin-bottom:56px}
.ghost{display:inline-block;padding:12px 26px;border:1px solid rgba(255,255,255,.25);color:rgba(255,255,255,.85);border-radius:999px;font-weight:600;font-size:15px}
.ghost:hover{border-color:rgba(255,255,255,.5);text-decoration:none}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:18px;margin-bottom:56px}
.card{display:block;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1);border-radius:20px;padding:26px;color:#fff}
.card:hover{border-color:rgba(255,94,14,.5);text-decoration:none}
.card .cat{font-size:14px;color:#b6b0c5}
.card h2{font-size:21px;font-weight:700;margin:8px 0 4px}
.card .tl{color:#FFAA70;font-size:14px;margin-bottom:10px}
.card p{color:#b6b0c5;font-size:16px}
footer.site{border-top:1px solid #61517a;padding-top:28px;color:#b6b0c5;font-size:14px}
footer.site a{color:#edeaf4;display:inline-block;padding-block:12px}
a:focus-visible,video:focus-visible{outline:3px solid #ffb684;outline-offset:5px}
main h2{margin:28px 0 12px;line-height:1.3}
main p{max-width:68ch;margin-bottom:20px}
@media(max-width:520px){header.site{gap:20px;align-items:flex-start;flex-wrap:wrap}.wrap{padding:24px 20px 48px}.grid{grid-template-columns:1fr}}
`.trim();

const chrome = ({ title, description, canonical, ogImage, body, jsonLd }) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}" />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="${canonical}" />
  <link rel="icon" type="image/png" href="/kartar-logo-mark.png" />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap" rel="stylesheet">
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Kartar AI Labs" />
  <meta property="og:title" content="${esc(title)}" />
  <meta property="og:description" content="${esc(description)}" />
  <meta property="og:image" content="${ogImage}" />
  <meta property="og:url" content="${canonical}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${esc(title)}" />
  <meta name="twitter:description" content="${esc(description)}" />
  <meta name="twitter:image" content="${ogImage}" />
  <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>
  <style>${CSS}</style>
</head>
<body>
  <div class="wrap">
    <header class="site">
      <a href="/" class="logo" aria-label="Kartar AI Labs home">kartar<span class="sun">AI</span></a>
      <a class="pill" href="/#contact">Book a Call</a>
    </header>
    ${body}
    <footer class="site">
      <p>&copy; ${new Date().getFullYear()} Kartar AI Labs &middot; <a href="/">Home</a> &middot; <a href="/products/">All products</a> &middot; <a href="mailto:hello@kartar.ai">hello@kartar.ai</a> &middot; <a href="https://www.linkedin.com/company/kartar-ai/" rel="noopener noreferrer" target="_blank">LinkedIn</a></p>
    </footer>
  </div>
</body>
</html>`.replace(/[ \t]+\n/g, "\n");

// ---------------------------------------------------------------------------
// Product pages
// ---------------------------------------------------------------------------
for (const p of products) {
  const url = `${SITE}/products/${p.slug}/`;
  const title = `${p.name} — ${p.stage} | Kartar AI Labs`;
  const features = (p.demo?.stops || []).map((s) => s.tip);
  const video = p.demo?.video
    ? `<video class="demo" src="${p.demo.video}" ${p.demo.poster ? `poster="${p.demo.poster}"` : ""} controls muted playsinline preload="none" aria-label="${esc(p.name)} product demo"></video>`
    : "";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: p.name,
    url,
    description: p.description,
    applicationCategory: p.category,
    creator: { "@type": "Organization", name: "Kartar AI Labs", url: `${SITE}/` },
  };

  const body = `
    <main>
      <span class="tag">${esc(p.category)} · ${esc(p.stage)}</span>
      <h1>${esc(p.name)}</h1>
      <p class="tagline">${esc(p.tagline)}</p>
      <p class="desc">${esc(p.description)}</p>
      <h2>Who it is for</h2><p>${esc(p.audience)}</p>
      ${p.workflow ? `<h2>The workflow</h2><p>${esc(p.workflow)}</p>` : ""}
      <h2>Current scope</h2><p>${esc(p.boundary)}</p>
      ${p.slug === "vr-real-estate-tour" ? '<h2>Project partners</h2><p>Vikas Kumar, Delhi-based architect. Manas Joshi, Ahmedabad-based 3D developer.</p>' : ""}
      ${features.length ? '<h2>Recorded walkthrough</h2>' : ''}
      ${features.length ? `<ul class="feat">${features.map((f) => `<li>${esc(f)}</li>`).join("")}</ul>` : ""}
      ${video}
      <div class="cta">
        <a class="pill" href="/?project=${encodeURIComponent(p.slug)}#contact">Book a Call</a>
        ${p.frontendUrl ? `<a class="ghost" href="${esc(p.frontendUrl)}" target="_blank" rel="noopener noreferrer">Open preview</a>` : ""}
        ${p.demo?.video ? '<a class="ghost" href="/#portfolio">See more demos</a>' : ""}
        <a class="ghost" href="/products/">All products</a>
      </div>
    </main>`;

  const dir = join(DIST, "products", p.slug);
  mkdirSync(dir, { recursive: true });
  writeFileSync(
    join(dir, "index.html"),
    chrome({ title, description: p.description, canonical: url, ogImage: `${SITE}/og-image.png`, body, jsonLd })
  );
}

// ---------------------------------------------------------------------------
// Product hub
// ---------------------------------------------------------------------------
{
  const url = `${SITE}/products/`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Kartar AI Labs Products",
    itemListElement: products.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: p.name,
      url: `${SITE}/products/${p.slug}/`,
    })),
  };
  const body = `
    <main>
      <span class="tag">Products</span>
      <h1>Products and projects</h1>
      <p class="desc">Work from Kartar AI Labs. Some projects have recorded demos; others are in development. Stages describe current work, not a promise of production readiness.</p>
      <div class="grid">
        ${products
          .map(
            (p) => `<div class="card">
          <a href="/products/${p.slug}/" style="color:inherit;text-decoration:none">
          <span class="cat">${esc(p.category)} · ${esc(p.stage)}</span>
          <h2>${esc(p.name)}</h2>
          <div class="tl">${p.hasRecording ? "Recorded demo available" : "Demo to follow"}</div>
          <p>${esc(p.description)}</p>
          </a>
          ${p.frontendUrl ? `<p style="margin-top:12px"><a href="${esc(p.frontendUrl)}" target="_blank" rel="noopener noreferrer">Open app ↗</a></p>` : ""}
        </div>`
          )
          .join("\n")}
      </div>
      <div class="cta">
        <a class="pill" href="/#contact">Book a Call</a>
        <a class="ghost" href="/">Back to kartar.ai</a>
      </div>
    </main>`;
  mkdirSync(join(DIST, "products"), { recursive: true });
  writeFileSync(
    join(DIST, "products", "index.html"),
    chrome({
      title: "Product Demos & Projects | Kartar AI Labs",
      description: "Explore Kartar AI Labs products, recorded demos and projects in development. See the current stage of each project and discuss related work with Sachmeet.",
      canonical: url,
      ogImage: `${SITE}/og-image.png`,
      body,
      jsonLd,
    })
  );
}

// ---------------------------------------------------------------------------
// sitemap.xml
// ---------------------------------------------------------------------------
{
  const urls = [
    { loc: `${SITE}/`, priority: "1.0" },
    { loc: `${SITE}/products/`, priority: "0.8" },
    { loc: `${SITE}/privacy/`, priority: "0.3" },
    ...products.map((p) => ({ loc: `${SITE}/products/${p.slug}/`, priority: "0.7" })),
  ];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url><loc>${u.loc}</loc><priority>${u.priority}</priority></url>`
  )
  .join("\n")}
</urlset>
`;
  writeFileSync(join(DIST, "sitemap.xml"), xml);
}

// ---------------------------------------------------------------------------
// Inject crawlable static content into index.html's #root.
// Readable fallback for no-JS / failed boot; never briefly flashed before React.
// ---------------------------------------------------------------------------
{
  const indexPath = join(DIST, "index.html");
  let html = readFileSync(indexPath, "utf8");
  const staticBlock = `<div id="root"><div style="background:#0F0A1E;color:#fff;font-family:'Plus Jakarta Sans',system-ui,sans-serif;min-height:100vh;padding:48px 24px;max-width:880px;margin:0 auto">
<h1 style="font-size:40px;font-weight:800;letter-spacing:-1px;line-height:1.15">I build AI products around real work.</h1>
<p style="font-size:18px;color:#b6b0c5;margin:16px 0 28px;max-width:560px">I’m Sachmeet Singh Bhatia, founder of Kartar AI Labs. Work directly with me to build a product or improve a business workflow.</p>
<h2 style="font-size:22px;font-weight:700;margin-bottom:8px">What we build</h2>
<p style="color:#b6b0c5;margin-bottom:16px">Explore real product demos, current project stages and work in development.</p>
<ul style="list-style:none;padding:0;margin:0 0 28px">
${products
  .map(
    (p) => `<li style="margin-bottom:10px"><a href="/products/${p.slug}/" style="color:#FFAA70;text-decoration:none;font-weight:600">${esc(p.name)}</a> <span style="color:#b6b0c5">— ${esc(p.stage)}. ${esc(p.description)}</span></li>`
  )
  .join("\n")}
</ul>
<p style="color:#b6b0c5">To discuss a project, email <a href="mailto:sachmeet@kartar.ai" style="color:#FFAA70">sachmeet@kartar.ai</a>. If this simplified page remains visible, JavaScript is unavailable; the product pages and email contact still work.</p>
</div></div>`;
  html = html.replace('<div id="root"></div>', staticBlock);
  writeFileSync(indexPath, html);
}

// Public data-handling notice, not a claim that optional integrations are live.
mkdirSync(join(DIST, 'privacy'), {recursive:true});
writeFileSync(join(DIST, 'privacy', 'index.html'), chrome({
  title:'Privacy & Booking Information | Kartar AI Labs',
  description:'How Kartar handles project enquiries, calendar bookings and optional voice input.',
  canonical:`${SITE}/privacy/`,ogImage:`${SITE}/og-image.png`,
  jsonLd:{'@context':'https://schema.org','@type':'WebPage',name:'Privacy and booking information',url:`${SITE}/privacy/`},
  body:`<main><h1>Privacy and booking information</h1><p>Contact: <a href="mailto:sachmeet@kartar.ai">sachmeet@kartar.ai</a></p>
  <h2>Project enquiries and bookings</h2><p>The booking form asks for your name, email, discussion topic and desired outcome. Additional preparation details are optional. Answers stay in the page until you choose the Calendly booking link. Reviewing the brief does not create a booking or send an email.</p><p>Opening the booking link passes your name, email and full preparation brief to Calendly as link parameters, which may be retained in browser history and provider logs. Calendly collects and processes booking details under its own privacy notice. Your call is booked only when you choose a time and receive confirmation from Calendly. Invitations and connected-calendar handling follow the organizer’s Calendly settings. Avoid confidential information in the initial brief.</p>
  <h2>Voice input</h2><p>Voice is optional and starts only when you choose Speak. Your browser may send microphone audio to its speech-recognition provider. Offline processing is not guaranteed. You review the transcript before using it. Do not dictate confidential information. Name and email remain typed.</p><p>The optional Naina assistant uses a separate voice service. Starting an assistant call sends microphone audio to that service. It is an AI assistant, not Sachmeet. Do not share confidential information in assistant calls.</p>
  <h2>Website measurement and security</h2><p>Hosting and third-party booking providers may use their own operational analytics and security measures. This website does not send your form answers or voice transcripts as custom analytics events. Hosting and security providers may process technical request information such as IP address and browser information. External product previews have their own data boundaries; read the scope note before uploading files.</p>
  <h2>Changes, cancellation and deletion requests</h2><p>Reply to the invitation or email Sachmeet to change or cancel a meeting, or to request deletion of enquiry information. Calendar records and information needed to resolve booking failures may remain with the organizer and relevant providers. Avoid sending sensitive personal data in an initial enquiry.</p></main>`
}));

console.log(
  `✓ Generated ${products.length} product pages, /products/ hub, sitemap.xml, and static index content.`
);
