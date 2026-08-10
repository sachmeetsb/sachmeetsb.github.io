# Portfolio Demo Grouping and Build State Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Put Vimarsha, InstantConfig, and DataMind on the first portfolio page because they have real demo videos, then render a product-specific factory animation with “Still in build” for every unfinished product.

**Architecture:** A pure `buildPortfolioPages(products)` helper derives one demo page followed by four-item build pages, so `demo.video` remains the single readiness signal. `Portfolio` stores the selected product rather than an original-array index, while `PhoneSimulator` delegates unfinished and failed-video previews to an isolated `BuildFactory` component and keeps the existing video playback flow intact.

**Tech Stack:** React 18, Framer Motion 12, Tailwind CSS 3, Vite 7, Node's built-in test runner.

## Global Constraints

- Preserve the existing split layout, device frame, device orientation morphing, typography, palette, and pager treatment.
- Page 1 contains exactly Vimarsha, InstantConfig, and DataMind in that order with the currently authored data.
- Build pages preserve the unfinished products' current relative order and contain four products, then two products.
- `product.demo.video` is the only authored demo-readiness signal; do not add a duplicate status field.
- The exact user-facing status copy is “Still in build”.
- Build previews do not expose fake demo steps or clickable playback behavior.
- A declared video that fails at runtime falls back to the factory scene but remains grouped on the demo page.
- Respect `prefers-reduced-motion` with a static factory scene and the existing non-autoplay video behavior.
- Do not add dependencies or change product copy, categories, timestamps, or orientation values.
- Preserve the user's existing uncommitted changes in `src/data/portfolio.js` and `public/media/demos/`.
- Do not deploy or push.

## File map

- Create `src/components/portfolio/portfolioPages.js`: pure grouping and chunking logic.
- Create `src/components/portfolio/portfolioPages.test.js`: dependency-free grouping regression tests.
- Modify `package.json`: add the focused Node test command.
- Modify `src/components/Portfolio.jsx`: derive grouped pages and store the selected product.
- Modify `src/components/portfolio/ProjectList.jsx`: render an already-derived page and select by product identity.
- Create `src/components/portfolio/BuildFactory.jsx`: accessible animated/static factory preview.
- Modify `src/components/portfolio/PhoneSimulator.jsx`: choose video versus factory, handle video errors, and expose correct interaction semantics.
- Modify `src/components/portfolio/useDemoPlayer.js`: remove the unused placeholder-walkthrough behavior from the playback hook.

---

### Task 1: Deterministic portfolio page grouping

**Files:**
- Create: `src/components/portfolio/portfolioPages.js`
- Create: `src/components/portfolio/portfolioPages.test.js`
- Modify: `package.json:7-13`

**Interfaces:**
- Consumes: `products: Array<{ name: string, demo?: { video?: string } }>`.
- Produces: `BUILD_PAGE_SIZE = 4` and `buildPortfolioPages(products)`, returning `Array<Array<Product>>` with the demo group first and the remaining products chunked in original order.

- [ ] **Step 1: Write the failing grouping tests**

Create `src/components/portfolio/portfolioPages.test.js`:

```js
import test from "node:test";
import assert from "node:assert/strict";
import { products as catalogProducts } from "../../data/portfolio.js";
import { buildPortfolioPages } from "./portfolioPages.js";

const product = (name, video) => ({
  name,
  demo: video ? { video } : {},
});

test("puts every video-backed product on the first page in source order", () => {
  const products = [
    product("Build A"),
    product("Vimarsha", "/vimarsha.mp4"),
    product("Build B"),
    product("InstantConfig", "/instantconfig.mp4"),
    product("DataMind", "/datamind.mp4"),
  ];

  const pages = buildPortfolioPages(products);

  assert.deepEqual(
    pages[0].map(({ name }) => name),
    ["Vimarsha", "InstantConfig", "DataMind"]
  );
});

test("chunks unfinished products by four without changing their order", () => {
  const products = [
    product("Demo", "/demo.mp4"),
    ...Array.from({ length: 6 }, (_, index) => product(`Build ${index + 1}`)),
  ];

  const pages = buildPortfolioPages(products);

  assert.deepEqual(
    pages.map((page) => page.map(({ name }) => name)),
    [
      ["Demo"],
      ["Build 1", "Build 2", "Build 3", "Build 4"],
      ["Build 5", "Build 6"],
    ]
  );
});

test("returns every product exactly once", () => {
  const products = [
    product("Build A"),
    product("Demo A", "/a.mp4"),
    product("Build B"),
    product("Demo B", "/b.mp4"),
  ];

  const flattened = buildPortfolioPages(products).flat();

  assert.equal(flattened.length, products.length);
  assert.deepEqual(
    new Set(flattened.map(({ name }) => name)),
    new Set(products.map(({ name }) => name))
  );
});

test("starts with build products when no demo videos exist", () => {
  const products = [product("Build A"), product("Build B")];

  assert.deepEqual(buildPortfolioPages(products), [products]);
});

test("groups the current catalog into the confirmed three pages", () => {
  const pages = buildPortfolioPages(catalogProducts);

  assert.deepEqual(
    pages.map((page) => page.map(({ name }) => name)),
    [
      ["Vimarsha", "InstantConfig", "DataMind"],
      ["Speko", "Rezt", "LawyerBoss", "Satya Social"],
      ["ProdVTON", "VR Real Estate Tour"],
    ]
  );
});
```

- [ ] **Step 2: Add the focused test command**

Add this entry after `"preview"` in `package.json`, including the comma after the existing `preview` entry:

```json
"test:portfolio-pages": "node --test src/components/portfolio/portfolioPages.test.js"
```

- [ ] **Step 3: Run the tests to verify they fail for the missing module**

Run:

```bash
npm run test:portfolio-pages
```

Expected: FAIL with `ERR_MODULE_NOT_FOUND` for `portfolioPages.js`.

- [ ] **Step 4: Implement the grouping helper**

Create `src/components/portfolio/portfolioPages.js`:

```js
export const BUILD_PAGE_SIZE = 4;

/**
 * Builds one page of real demos followed by fixed-size pages of products that
 * are still being built. Source order is preserved inside both groups.
 */
export function buildPortfolioPages(products) {
  const demoProducts = [];
  const buildProducts = [];

  products.forEach((product) => {
    if (product.demo?.video) demoProducts.push(product);
    else buildProducts.push(product);
  });

  const pages = demoProducts.length > 0 ? [demoProducts] : [];
  for (let start = 0; start < buildProducts.length; start += BUILD_PAGE_SIZE) {
    pages.push(buildProducts.slice(start, start + BUILD_PAGE_SIZE));
  }

  return pages;
}
```

- [ ] **Step 5: Run the focused tests**

Run:

```bash
npm run test:portfolio-pages
```

Expected: 5 tests pass and 0 fail.

- [ ] **Step 6: Commit the grouping unit**

```bash
git add package.json src/components/portfolio/portfolioPages.js src/components/portfolio/portfolioPages.test.js
git commit -m "test(portfolio): define demo-first page grouping"
```

---

### Task 2: Rewire portfolio selection and pagination

**Files:**
- Modify: `src/components/Portfolio.jsx:1-29,66-74`
- Modify: `src/components/portfolio/ProjectList.jsx:4-53`

**Interfaces:**
- Consumes: `buildPortfolioPages(products)` from Task 1.
- Produces: `ProjectList({ items, activeProduct, onSelect, page, pageCount, onPage })`, where `items` is already the current page and `onSelect(product)` selects a product object.

- [ ] **Step 1: Change `ProjectList` to render a derived page**

Replace the component signature and internal slicing in `ProjectList.jsx` with:

```jsx
export default function ProjectList({
  items,
  activeProduct,
  onSelect,
  page,
  pageCount,
  onPage,
}) {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col">
        {items.map((product) => {
          const active = product.name === activeProduct?.name;
          return (
            <button
              key={product.name}
              type="button"
              onClick={() => onSelect(product)}
              aria-pressed={active}
              className={`text-left py-4 pl-5 border-l-2 transition-all bg-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron focus-visible:ring-offset-2 focus-visible:ring-offset-void ${
                active
                  ? "border-saffron"
                  : "border-white/10 hover:border-white/30"
              }`}
            >
              <h3
                className={`font-display font-bold text-[26px] md:text-[32px] leading-[1.05] transition-colors ${
                  active ? "text-white" : "text-white/55"
                }`}
              >
                {product.name}
              </h3>
              <p
                className={`font-display text-[14px] mt-0.5 transition-colors ${
                  active ? "text-saffron-core" : "text-white/35"
                }`}
              >
                {product.tagline}
              </p>
            </button>
          );
        })}
      </div>

      {pageCount > 1 && (
        <div className="flex items-center gap-3 pl-5 mt-4">
          <button
            type="button"
            onClick={() => onPage(page - 1)}
            disabled={page === 0}
            aria-label="Previous page"
            className="text-white/50 hover:text-white disabled:opacity-30 disabled:hover:text-white/50 text-base bg-transparent shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron rounded-full"
          >
            <HiChevronLeft />
          </button>
          <div className="flex flex-1 gap-1.5">
            {Array.from({ length: pageCount }).map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => onPage(index)}
                aria-label={`Go to page ${index + 1}`}
                aria-current={index === page ? "page" : undefined}
                className={`flex-1 h-1.5 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron ${
                  index === page ? "bg-saffron" : "bg-white/15 hover:bg-white/30"
                }`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => onPage(page + 1)}
            disabled={page === pageCount - 1}
            aria-label="Next page"
            className="text-white/50 hover:text-white disabled:opacity-30 disabled:hover:text-white/50 text-base bg-transparent shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron rounded-full"
          >
            <HiChevronRight />
          </button>
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Derive grouped pages in `Portfolio`**

Add the helper import after the existing `ProjectList` import:

```js
import { buildPortfolioPages } from "./portfolio/portfolioPages";
```

Replace the old `PER_PAGE` and `pageCount` declarations with:

```js
const portfolioPages = buildPortfolioPages(products);
const pageCount = portfolioPages.length;
```

Replace lines 23–28 of the component state with:

```js
const [active, setActive] = useState(
  portfolioPages[0]?.[0] ?? products[0]
);
const [page, setPage] = useState(0);

const currentItems = portfolioPages[page] ?? [];
const isLandscape = active.demo?.orientation === "landscape";
const changePage = (nextPage) =>
  setPage(Math.max(0, Math.min(pageCount - 1, nextPage)));
```

Replace the `ProjectList` props with:

```jsx
<ProjectList
  items={currentItems}
  activeProduct={active}
  onSelect={setActive}
  page={page}
  pageCount={pageCount}
  onPage={changePage}
/>
```

- [ ] **Step 3: Run grouping tests and compile the integration**

Run:

```bash
npm run test:portfolio-pages
npm run build
```

Expected: 5 grouping tests pass; Vite completes a production build with no import or JSX errors.

- [ ] **Step 4: Commit the selection/pagination integration**

```bash
git add src/components/Portfolio.jsx src/components/portfolio/ProjectList.jsx
git commit -m "feat(portfolio): show completed demos on the first page"
```

---

### Task 3: Build the factory preview component

**Files:**
- Create: `src/components/portfolio/BuildFactory.jsx`

**Interfaces:**
- Consumes: `BuildFactory({ product, reduced })`, with `product.name` and a boolean reduced-motion preference.
- Produces: a full-size, non-interactive preview with one accessible status label and decorative SVG machinery.

- [ ] **Step 1: Create the factory component**

Create `src/components/portfolio/BuildFactory.jsx`:

```jsx
import React from "react";
import { motion } from "framer-motion";

const modules = [0, 1, 2];
const rollers = [80, 140, 200, 260, 320, 380, 440, 500, 560];

export default function BuildFactory({ product, reduced }) {
  const armMotion = reduced ? { y: 48 } : { y: [0, 0, 48, 48, 0] };
  const lightMotion = reduced ? { opacity: 1 } : { opacity: [0.35, 1, 0.35] };

  return (
    <div
      role="status"
      aria-label={`${product.name} is still in build`}
      className="absolute inset-0 flex flex-col justify-center overflow-hidden bg-void px-5 py-8 text-center"
    >
      <div className="relative z-10 mx-auto mb-3 flex max-w-full items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.18em] text-white/55">
        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-saffron shadow-[0_0_12px_rgba(255,94,14,0.9)]" />
        <span className="truncate">Work order · {product.name}</span>
      </div>

      <div className="relative z-0 mx-auto w-full max-w-[680px] overflow-hidden rounded-[24px] border border-white/10 bg-[#130D25] shadow-[inset_0_0_50px_rgba(45,27,105,0.55)]">
        <svg
          viewBox="0 0 640 360"
          className="block h-auto w-full"
          aria-hidden="true"
          focusable="false"
        >
          <defs>
            <pattern id="factory-grid" width="24" height="24" patternUnits="userSpaceOnUse">
              <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#4A2F9A" strokeOpacity="0.22" strokeWidth="1" />
            </pattern>
            <linearGradient id="factory-belt" x1="0" x2="1">
              <stop offset="0" stopColor="#241743" />
              <stop offset="0.5" stopColor="#4A2F9A" />
              <stop offset="1" stopColor="#241743" />
            </linearGradient>
            <linearGradient id="factory-module" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#FFAA70" />
              <stop offset="1" stopColor="#FF5E0E" />
            </linearGradient>
          </defs>

          <rect width="640" height="360" fill="#0F0A1E" />
          <rect width="640" height="360" fill="url(#factory-grid)" />
          <path d="M45 62H595" stroke="#FFFFFF" strokeOpacity="0.08" />
          <text x="48" y="48" fill="#FFFFFF" fillOpacity="0.34" fontFamily="JetBrains Mono, monospace" fontSize="10" letterSpacing="2">ASSEMBLY LINE / ACTIVE</text>

          <g>
            <rect x="44" y="264" width="552" height="44" rx="12" fill="url(#factory-belt)" stroke="#FFFFFF" strokeOpacity="0.16" />
            {rollers.map((x) => (
              <circle key={x} cx={x} cy="286" r="8" fill="#0F0A1E" stroke="#FFAA70" strokeOpacity="0.55" strokeWidth="2" />
            ))}
            <path d="M70 309L52 334M570 309L588 334" stroke="#FFFFFF" strokeOpacity="0.2" strokeWidth="7" strokeLinecap="round" />
          </g>

          {modules.map((moduleIndex) => (
            <motion.g
              key={moduleIndex}
              initial={false}
              animate={
                reduced
                  ? { x: 70 + moduleIndex * 170 }
                  : { x: [-180, 700] }
              }
              transition={
                reduced
                  ? { duration: 0 }
                  : { duration: 6.3, delay: moduleIndex * 2.1, repeat: Infinity, ease: "linear" }
              }
            >
              <rect x="0" y="218" width="72" height="54" rx="10" fill="url(#factory-module)" />
              <path d="M14 236H58M14 248H46" stroke="#0F0A1E" strokeOpacity="0.52" strokeWidth="4" strokeLinecap="round" />
              <circle cx="58" cy="249" r="5" fill="#00BFA5" />
            </motion.g>
          ))}

          <g>
            <rect x="276" y="84" width="88" height="28" rx="10" fill="#2D1B69" stroke="#FFFFFF" strokeOpacity="0.18" />
            <path d="M320 112V151" stroke="#FFAA70" strokeWidth="10" strokeLinecap="round" />
            <motion.g
              initial={false}
              animate={armMotion}
              transition={
                reduced
                  ? { duration: 0 }
                  : { duration: 4.2, times: [0, 0.28, 0.45, 0.68, 1], repeat: Infinity, ease: "easeInOut" }
              }
            >
              <rect x="294" y="142" width="52" height="34" rx="8" fill="#FF5E0E" />
              <path d="M304 176V196M336 176V196" stroke="#FFAA70" strokeWidth="8" strokeLinecap="round" />
            </motion.g>
          </g>

          <g>
            <rect x="476" y="98" width="82" height="76" rx="14" fill="#1E1535" stroke="#FFFFFF" strokeOpacity="0.16" />
            <motion.circle
              cx="502"
              cy="124"
              r="9"
              fill="#00BFA5"
              initial={false}
              animate={lightMotion}
              transition={reduced ? { duration: 0 } : { duration: 1.4, repeat: Infinity }}
            />
            <circle cx="532" cy="124" r="9" fill="#FF5E0E" fillOpacity="0.78" />
            <path d="M493 151H542" stroke="#FFAA70" strokeOpacity="0.48" strokeWidth="5" strokeLinecap="round" />
          </g>

          <path d="M122 264V210H205" fill="none" stroke="#FFFFFF" strokeOpacity="0.12" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="205" cy="210" r="12" fill="#2D1B69" stroke="#FFAA70" strokeOpacity="0.7" strokeWidth="3" />
        </svg>
      </div>

      <div className="relative z-10 mt-4">
        <p className="font-display text-[20px] font-extrabold leading-tight text-white md:text-[24px]">
          Still in build
        </p>
        <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.2em] text-saffron-core/70">
          Assembly in progress
        </p>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Compile the isolated component**

Temporarily import is unnecessary because Vite only compiles reachable modules; Task 4 connects it immediately. Confirm the file has no whitespace errors now:

```bash
git diff --check -- src/components/portfolio/BuildFactory.jsx
```

Expected: no output and exit code 0.

- [ ] **Step 3: Commit the isolated visual unit**

```bash
git add src/components/portfolio/BuildFactory.jsx
git commit -m "feat(portfolio): add animated factory build state"
```

---

### Task 4: Integrate factory fallback and correct preview semantics

**Files:**
- Modify: `src/components/portfolio/PhoneSimulator.jsx:1-154`
- Modify: `src/components/portfolio/useDemoPlayer.js:3-82`

**Interfaces:**
- Consumes: `BuildFactory({ product, reduced })` from Task 3 and the existing `useDemoPlayer(demo, reduced)` return object.
- Produces: video previews that remain keyboard/tap interactive, build previews that are non-interactive, and runtime video-error fallback to `BuildFactory`.

- [ ] **Step 1: Restrict the player hook to real videos**

Replace the top-level JSDoc in `useDemoPlayer.js` with:

```js
/**
 * Drives a real product video inside PhoneSimulator. Videos auto-pause at each
 * authored stop; unfinished products are rendered by BuildFactory instead.
 */
```

Replace the `advance` callback with:

```js
const advance = useCallback(() => {
  if (!hasVideo) return;
  const video = videoRef.current;
  if (!video) return;

  if (status === "ended") {
    setStopIndex(0);
    video.currentTime = 0;
    video.play().catch(() => {});
    setStatus("playing");
    return;
  }

  if (status !== "paused") return;
  setStopIndex((index) => index + 1);
  video.play().catch(() => {});
  setStatus("playing");
}, [hasVideo, status]);
```

Replace the no-video branch in the reset effect with a plain reset:

```js
} else {
  setStatus("paused");
}
```

- [ ] **Step 2: Replace the placeholder screen with `BuildFactory`**

Add this import to `PhoneSimulator.jsx`:

```js
import BuildFactory from "./BuildFactory";
```

Delete the entire `PlaceholderScreen` function. Replace `Screen` with:

```jsx
function Screen({ player, demo, product, reduced, videoFailed, onVideoError }) {
  if (!player.hasVideo || videoFailed) {
    return <BuildFactory product={product} reduced={reduced} />;
  }

  return (
    <>
      <video
        ref={player.videoRef}
        src={demo.video}
        poster={demo.poster}
        className="h-full w-full object-cover"
        muted
        playsInline
        onTimeUpdate={player.handleTimeUpdate}
        onEnded={player.handleEnded}
        onError={onVideoError}
      />
      <DemoOverlay player={player} />
    </>
  );
}
```

- [ ] **Step 3: Add video-failure state and keyboard activation**

Immediately after `const player = useDemoPlayer(demo, reduced);`, add:

```js
const [videoFailed, setVideoFailed] = useState(false);
const interactive = player.hasVideo && !videoFailed;

useEffect(() => {
  setVideoFailed(false);
}, [demo.video]);

const activateDemo = (event) => {
  if (event.type === "keydown" && event.key !== "Enter" && event.key !== " ") {
    return;
  }
  if (event.type === "keydown") event.preventDefault();
  player.advance();
};

const interactionProps = interactive
  ? {
      onClick: activateDemo,
      onKeyDown: activateDemo,
      role: "button",
      tabIndex: 0,
      "aria-label":
        player.status === "ended" ? `Replay ${product.name} demo` : `Continue ${product.name} demo`,
    }
  : {};
```

- [ ] **Step 4: Apply the shared screen and interaction props on mobile**

Replace the mobile preview return with:

```jsx
if (!desktop) {
  return (
    <div
      {...interactionProps}
      className={`relative w-full overflow-hidden rounded-3xl border border-white/15 bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron ${
        interactive ? "cursor-pointer" : ""
      }`}
      style={{ aspectRatio: orientation === "landscape" ? "16 / 9" : "9 / 16" }}
    >
      <Screen
        player={player}
        demo={demo}
        product={product}
        reduced={reduced}
        videoFailed={videoFailed}
        onVideoError={() => setVideoFailed(true)}
      />
    </div>
  );
}
```

- [ ] **Step 5: Apply the shared screen and interaction props on desktop**

Replace the inner desktop `motion.div` with:

```jsx
<motion.div
  {...interactionProps}
  className={`relative overflow-hidden rounded-[52px] border-[8px] border-white/15 bg-black shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron focus-visible:ring-offset-4 focus-visible:ring-offset-void ${
    interactive ? "cursor-pointer" : ""
  }`}
  animate={{ width: renderW, height: renderH }}
  transition={reduced ? { duration: 0 } : { duration: 0.6, ease: EASE_IN_OUT }}
>
  <div className="absolute left-1/2 top-3 z-20 h-2 w-28 -translate-x-1/2 rounded-full bg-white/20" />
  <Screen
    player={player}
    demo={demo}
    product={product}
    reduced={reduced}
    videoFailed={videoFailed}
    onVideoError={() => setVideoFailed(true)}
  />
</motion.div>
```

- [ ] **Step 6: Run automated verification**

Run:

```bash
npm run test:portfolio-pages
npm run build
```

Expected: 5 tests pass and Vite completes a production build with no errors.

- [ ] **Step 7: Commit the preview integration**

```bash
git add src/components/portfolio/PhoneSimulator.jsx src/components/portfolio/useDemoPlayer.js
git commit -m "feat(portfolio): show factory state for unfinished demos"
```

---

### Task 5: Browser verification and final review

**Files:**
- Verify only; correct scoped defects in the files from Tasks 1–4 if found.

**Interfaces:**
- Consumes: the completed portfolio grouping and preview implementation.
- Produces: a verified production-ready local change with no deployment.

- [ ] **Step 1: Start the local site**

Run:

```bash
npm run dev -- --host 127.0.0.1
```

Expected: Vite prints a local URL and stays running without compilation errors.

- [ ] **Step 2: Verify desktop behavior at 1440 × 900**

Open the local URL, scroll to `#portfolio`, and confirm:

- page 1 lists only Vimarsha, InstantConfig, and DataMind;
- Vimarsha starts selected and shows its portrait video;
- InstantConfig and DataMind show landscape videos;
- tapping/clicking a paused video continues it and the final state can replay;
- page 2 lists Speko, Rezt, LawyerBoss, and Satya Social;
- page 3 lists ProdVTON and VR Real Estate Tour;
- selecting every page-2/page-3 product shows its name, the factory machinery, and “Still in build” inside the same device frame;
- portrait/landscape frame movement remains smooth and the list column does not jump.

- [ ] **Step 3: Verify mobile behavior at 390 × 844**

Confirm the list stacks above a frameless preview, each demo remains usable, each unfinished product shows a readable factory scene, and no content overflows horizontally.

- [ ] **Step 4: Verify keyboard and reduced-motion behavior**

Using keyboard navigation, confirm list items, pager controls, and demo previews receive visible focus; Enter and Space advance/replay real demos; build previews do not receive button semantics. Emulate `prefers-reduced-motion: reduce` and confirm the factory modules, arm, and light are static.

- [ ] **Step 5: Verify runtime video failure fallback**

In browser developer tools, block one request under `/media/demos/` and reload. Confirm its product stays on page 1 while the same device frame displays the factory scene and “Still in build”. Remove the block afterward.

- [ ] **Step 6: Run final checks**

Stop the dev server, then run:

```bash
npm run test:portfolio-pages
npm run build
git diff --check
git status --short
```

Expected: 5 tests pass; production build succeeds; `git diff --check` prints nothing; status contains only the intended feature commits plus the user's pre-existing demo data/media changes.

- [ ] **Step 7: Commit browser-found corrections only if needed**

If browser verification required scoped corrections, stage only those exact feature files and commit them:

```bash
git add src/components/Portfolio.jsx src/components/portfolio/ProjectList.jsx src/components/portfolio/portfolioPages.js src/components/portfolio/portfolioPages.test.js src/components/portfolio/BuildFactory.jsx src/components/portfolio/PhoneSimulator.jsx src/components/portfolio/useDemoPlayer.js package.json
git commit -m "fix(portfolio): polish demo and build previews"
```

If no corrections were needed, do not create an empty commit.
