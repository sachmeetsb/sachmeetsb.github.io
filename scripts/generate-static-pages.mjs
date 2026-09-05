// Post-build static page generator for kartar.ai
// Runs after `vite build` (see package.json "build").
//
// Generates into dist/:
//   - products/index.html            → crawlable product hub
//   - products/<slug>/index.html     → one static SEO page per product
//   - sitemap.xml                    → all routes
//   - injects a static, crawlable content block into index.html's #root
//     (visible until React mounts, then replaced — honest prerender-lite)
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
const TODAY = new Date().toISOString().slice(0, 10);

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
:root{--void:#0F0A1E;--saffron:#FF5E0E;--saffron-light:#FF7A35}
*{margin:0;padding:0;box-sizing:border-box}
body{background:var(--void);color:#fff;font-family:'Plus Jakarta Sans',system-ui,-apple-system,sans-serif;line-height:1.6;-webkit-font-smoothing:antialiased}
a{color:#FFAA70;text-decoration:none}
a:hover{text-decoration:underline}
.wrap{max-width:880px;margin:0 auto;padding:48px 24px 80px}
header.site{display:flex;align-items:center;justify-content:space-between;margin-bottom:56px}
.logo{font-weight:800;font-size:24px;letter-spacing:-.5px;color:#fff}
.logo .sun{display:inline-flex;align-items:center;justify-content:center;width:38px;height:38px;margin-left:3px;border-radius:50%;font-size:14px;background:radial-gradient(circle at 40% 38%,#FFAA70 0%,#FF7A35 40%,#FF5E0E 100%)}
.pill{display:inline-block;padding:12px 26px;background:var(--saffron);color:#fff;border-radius:999px;font-weight:600;font-size:15px}
.pill:hover{background:var(--saffron-light);text-decoration:none}
.tag{display:inline-block;font-family:ui-monospace,monospace;font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:rgba(255,255,255,.45);border:1px solid rgba(255,255,255,.15);border-radius:999px;padding:5px 14px;margin-bottom:20px}
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
.card .cat{font-family:ui-monospace,monospace;font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,.4)}
.card h2{font-size:21px;font-weight:700;margin:8px 0 4px}
.card .tl{color:#FFAA70;font-size:14px;margin-bottom:10px}
.card p{color:rgba(255,255,255,.55);font-size:14px}
footer.site{border-top:1px solid rgba(255,255,255,.08);padding-top:28px;color:rgba(255,255,255,.35);font-size:13px}
footer.site a{color:rgba(255,255,255,.55)}
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
      <a class="pill" href="https://calendly.com/sachmeet-kartar/30min" target="_blank" rel="noopener noreferrer">Book a Call</a>
    </header>
    ${body}
    <footer class="site">
      <p>&copy; ${new Date().getFullYear()} Kartar AI Labs &middot; <a href="/">Home</a> &middot; <a href="/products/">All products</a> &middot; <a href="mailto:hello@kartar.ai">hello@kartar.ai</a> &middot; <a href="https://www.linkedin.com/company/kartar-ai/" rel="noopener noreferrer" target="_blank">LinkedIn</a></p>
    </footer>
  </div>
</body>
</html>`;

// ---------------------------------------------------------------------------
// Product pages
// ---------------------------------------------------------------------------
for (const p of products) {
  const url = `${SITE}/products/${p.slug}/`;
  const title = `${p.name} — ${p.tagline} | Kartar AI Labs`;
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
    operatingSystem: "Web",
    creator: { "@type": "Organization", name: "Kartar AI Labs", url: `${SITE}/` },
  };

  const body = `
    <main>
      <span class="tag">${esc(p.category)}</span>
      <h1>${esc(p.name)}</h1>
      <p class="tagline">${esc(p.tagline)}</p>
      <p class="desc">${esc(p.description)}</p>
      ${features.length ? `<ul class="feat">${features.map((f) => `<li>${esc(f)}</li>`).join("")}</ul>` : ""}
      ${video}
      <div class="cta">
        ${p.frontendUrl ? `<a class="pill" href="${esc(p.frontendUrl)}" target="_blank" rel="noopener noreferrer">Open app</a>` : `<a class="pill" href="https://calendly.com/sachmeet-kartar/30min" target="_blank" rel="noopener noreferrer">Book a Call</a>`}
        ${p.frontendUrl ? `<a class="ghost" href="https://calendly.com/sachmeet-kartar/30min" target="_blank" rel="noopener noreferrer">Book a Call</a>` : ""}
        <a class="ghost" href="/#portfolio">See the interactive demo</a>
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
      <h1>What we build</h1>
      <p class="desc">Agentic workflows, vertical products, and AI systems designed for how your business actually runs. Every product below is live work from the Kartar AI Labs studio.</p>
      <div class="grid">
        ${products
          .map(
            (p) => `<div class="card">
          <a href="/products/${p.slug}/" style="color:inherit;text-decoration:none">
          <span class="cat">${esc(p.category)}</span>
          <h2>${esc(p.name)}</h2>
          <div class="tl">${esc(p.tagline)}</div>
          <p>${esc(p.description)}</p>
          </a>
          ${p.frontendUrl ? `<p style="margin-top:12px"><a href="${esc(p.frontendUrl)}" target="_blank" rel="noopener noreferrer">Open app ↗</a></p>` : ""}
        </div>`
          )
          .join("\n")}
      </div>
      <div class="cta">
        <a class="pill" href="https://calendly.com/sachmeet-kartar/30min" target="_blank" rel="noopener noreferrer">Book a Call</a>
        <a class="ghost" href="/">Back to kartar.ai</a>
      </div>
    </main>`;
  mkdirSync(join(DIST, "products"), { recursive: true });
  writeFileSync(
    join(DIST, "products", "index.html"),
    chrome({
      title: "Products | Kartar AI Labs — Agentic AI & AI-Native Apps",
      description: `Explore Kartar AI Labs products: ${products
        .map((p) => p.name)
        .join(", ")
        .replace(/, ([^,]*)$/, " and $1")}.`,
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
    ...products.map((p) => ({ loc: `${SITE}/products/${p.slug}/`, priority: "0.7" })),
  ];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url><loc>${u.loc}</loc><lastmod>${TODAY}</lastmod><priority>${u.priority}</priority></url>`
  )
  .join("\n")}
</urlset>
`;
  writeFileSync(join(DIST, "sitemap.xml"), xml);
}

// ---------------------------------------------------------------------------
// Inject crawlable static content into index.html's #root.
// Real content, same as the app renders — shown until React mounts.
// ---------------------------------------------------------------------------
{
  const indexPath = join(DIST, "index.html");
  let html = readFileSync(indexPath, "utf8");
  const staticBlock = `<div id="root"><div style="background:#0F0A1E;color:#fff;font-family:'Plus Jakarta Sans',system-ui,sans-serif;min-height:100vh;padding:48px 24px;max-width:880px;margin:0 auto">
<h1 style="font-size:40px;font-weight:800;letter-spacing:-1px;line-height:1.15">You are just in time for the next era — Stay up front with Kartar</h1>
<p style="font-size:18px;color:rgba(255,255,255,.65);margin:16px 0 28px;max-width:560px">Agentic AI systems and AI-native products, built for the speed of Indian business. Pilot to production in weeks.</p>
<h2 style="font-size:22px;font-weight:700;margin-bottom:8px">What we build</h2>
<p style="color:rgba(255,255,255,.6);margin-bottom:16px">Agentic AI workflows — agents that triage, route, draft, and escalate inside your existing tools. Vertical AI-native products for logistics, legal, healthcare, agri and finance. Built ground-up for how India actually works.</p>
<ul style="list-style:none;padding:0;margin:0 0 28px">
${products
  .map(
    (p) => `<li style="margin-bottom:10px"><a href="/products/${p.slug}/" style="color:#FFAA70;text-decoration:none;font-weight:600">${esc(p.name)}</a> <span style="color:rgba(255,255,255,.55)">— ${esc(p.tagline)}. ${esc(p.description)}</span></li>`
  )
  .join("\n")}
</ul>
<p style="color:rgba(255,255,255,.6)">Talk to us: <a href="mailto:hello@kartar.ai" style="color:#FFAA70">hello@kartar.ai</a> · <a href="https://calendly.com/sachmeet-kartar/30min" style="color:#FFAA70">Book a call</a> · <a href="https://www.linkedin.com/company/kartar-ai/" style="color:#FFAA70">LinkedIn</a></p>
</div></div>`;
  html = html.replace('<div id="root"></div>', staticBlock);
  writeFileSync(indexPath, html);
}

console.log(
  `✓ Generated ${products.length} product pages, /products/ hub, sitemap.xml, and static index content.`
);
