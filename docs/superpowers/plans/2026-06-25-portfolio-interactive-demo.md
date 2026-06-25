# Portfolio Interactive Demo Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the Portfolio card grid with a permanent split layout — a paginated project list on the left and an always-visible iPhone simulator on the right that plays an interactive, tap-driven product demo (with a smooth portrait↔landscape device animation).

**Architecture:** A `Portfolio` section owns `activeIndex` (selected product) and `page` (list pagination) state. It renders `ProjectList` (left, paginated title+subtitle items + pager) and `PhoneSimulator` (right, an animated device frame whose playback is driven by the `useDemoPlayer` hook). Demo content lives as data in `src/data/portfolio.js`; the engine works today in a tap-through "placeholder" mode and auto-pauses real videos later with zero code change.

**Tech Stack:** React 18, framer-motion (already used in `Preloader`), Tailwind, react-icons. Existing helpers: `lib/motion.js` (`EASE_IN_OUT`), `lib/useReducedMotion.js` (`useReducedMotion`), `components/motion/Section.jsx`, `components/motion/Reveal.jsx`.

## Global Constraints

- No test framework exists in this repo. **Verification for every task = `npm run build` succeeds** (catches import/JSX/compile errors); the final task adds a manual browser check via `npm run dev`.
- Do not add new dependencies — framer-motion, react-icons, Tailwind are already installed.
- Commit after each task. End commit messages with the repo's required trailers (Co-Authored-By + Claude-Session) — but only commit; do not push.
- Landscape orientation applies to exactly these four products: **InstantConfig, DataMind, LawyerBoss, VR Real Estate Tour**. All others are portrait.
- Keep list items to **Title + subtitle only** — no category chips, no filter pills, no description in the list.

---

### Task 1: Portfolio data module

**Files:**
- Create: `src/data/portfolio.js`

**Interfaces:**
- Produces: `export const products` — an array of objects with shape
  `{ name: string, tagline: string, category: string, description: string, demo: { orientation?: 'portrait'|'landscape', video?: string, poster?: string, stops: { t: number, tip: string }[] } }`.

- [ ] **Step 1: Create the data module**

Create `src/data/portfolio.js` with the products extracted from the current inline array in `Portfolio.jsx`, each given a `demo` with placeholder `stops` (the four named products get `orientation: 'landscape'`):

```js
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
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: build completes with no errors (the module is valid and importable). It is not yet imported anywhere, so this only checks syntax.

- [ ] **Step 3: Commit**

```bash
git add src/data/portfolio.js
git commit -m "feat(portfolio): extract products + demo data module"
```

---

### Task 2: PhoneSimulator + useDemoPlayer engine

**Files:**
- Create: `src/components/portfolio/useDemoPlayer.js`
- Create: `src/components/portfolio/PhoneSimulator.jsx`

**Interfaces:**
- Consumes: a single `product` object from `products` (Task 1).
- Produces:
  - `useDemoPlayer(demo, reduced)` → `{ videoRef, status, activeTip, stopIndex, hasVideo, advance, handleTimeUpdate, handleEnded, total }` where `status ∈ 'playing'|'paused'|'ended'`.
  - `export default function PhoneSimulator({ product })` — renders the animated device + screen + overlay.

- [ ] **Step 1: Write the player hook**

Create `src/components/portfolio/useDemoPlayer.js`:

```js
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

/**
 * Drives an interactive product demo inside the PhoneSimulator.
 *
 * Two modes, same `stops` data:
 *  - Video mode (demo.video set): plays the video and auto-pauses when
 *    currentTime reaches each stop's `t`, showing that stop's tooltip; a tap
 *    (advance) resumes. After the last stop the video plays to its end → 'ended'.
 *  - Placeholder mode (no video): a pure tap-through — the first tooltip shows
 *    immediately and each tap reveals the next, ending on 'ended'.
 */
export function useDemoPlayer(demo, reduced) {
  const videoRef = useRef(null);
  const stops = useMemo(() => demo?.stops ?? [], [demo]);
  const hasVideo = Boolean(demo?.video);
  const [stopIndex, setStopIndex] = useState(0);
  const [status, setStatus] = useState("paused"); // 'playing' | 'paused' | 'ended'

  // (Re)start whenever the active demo changes.
  useEffect(() => {
    setStopIndex(0);
    if (hasVideo) {
      const v = videoRef.current;
      if (v) {
        v.currentTime = 0;
        if (reduced) {
          v.pause();
          setStatus("paused");
        } else {
          v.play().catch(() => {});
          setStatus("playing");
        }
      }
    } else {
      // Placeholder walkthrough: first tooltip is visible immediately.
      setStatus("paused");
    }
  }, [demo, hasVideo, reduced]);

  const handleTimeUpdate = useCallback(() => {
    if (!hasVideo) return;
    const v = videoRef.current;
    if (!v) return;
    const next = stops[stopIndex];
    if (status === "playing" && next && v.currentTime >= next.t) {
      v.pause();
      setStatus("paused");
    }
  }, [hasVideo, stops, stopIndex, status]);

  const handleEnded = useCallback(() => setStatus("ended"), []);

  const advance = useCallback(() => {
    if (status === "ended") {
      setStopIndex(0);
      if (hasVideo) {
        const v = videoRef.current;
        if (v) {
          v.currentTime = 0;
          v.play().catch(() => {});
          setStatus("playing");
        }
      } else {
        setStatus("paused");
      }
      return;
    }
    if (status !== "paused") return;
    if (hasVideo) {
      setStopIndex((i) => i + 1);
      const v = videoRef.current;
      if (v) {
        v.play().catch(() => {});
        setStatus("playing");
      }
    } else {
      // Placeholder: step through tooltips manually.
      if (stopIndex >= stops.length - 1) setStatus("ended");
      else setStopIndex((i) => i + 1);
    }
  }, [status, stopIndex, stops.length, hasVideo]);

  const activeTip = status === "paused" ? stops[stopIndex]?.tip ?? null : null;

  return {
    videoRef,
    status,
    activeTip,
    stopIndex,
    hasVideo,
    advance,
    handleTimeUpdate,
    handleEnded,
    total: stops.length,
  };
}
```

- [ ] **Step 2: Write the PhoneSimulator component**

Create `src/components/portfolio/PhoneSimulator.jsx`:

```jsx
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EASE_IN_OUT } from "../../lib/motion";
import { useReducedMotion } from "../../lib/useReducedMotion";
import { useDemoPlayer } from "./useDemoPlayer";

const SIZES = {
  portrait: { w: 300, h: 600 },
  landscape: { w: 600, h: 300 },
};
// Reserve the larger footprint so the device animates inside a stable box and
// the left list never reflows when orientation changes.
const BOX = 600;

/** Reactive desktop check so we can drop the frame on mobile. */
function useDesktop() {
  const [desktop, setDesktop] = useState(
    typeof window !== "undefined"
      ? window.matchMedia("(min-width: 1024px)").matches
      : true
  );
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const on = () => setDesktop(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return desktop;
}

function PlaceholderScreen({ product }) {
  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
      style={{
        background:
          "radial-gradient(circle at 50% 30%, rgba(255,94,14,0.25), rgba(10,10,12,0.95))",
      }}
    >
      <span className="font-display font-extrabold text-white text-[22px] mb-1">
        {product.name}
      </span>
      <span className="font-display text-saffron-core text-[13px] mb-4">
        {product.tagline}
      </span>
      <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/40">
        Demo coming soon
      </span>
    </div>
  );
}

function DemoOverlay({ player }) {
  const showPrompt = Boolean(player.activeTip) || player.status === "ended";
  return (
    <div className="absolute inset-0 pointer-events-none flex flex-col justify-end p-5">
      <AnimatePresence mode="wait">
        {player.activeTip && (
          <motion.div
            key={player.stopIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl px-4 py-3 text-white text-[14px] leading-snug"
          >
            {player.activeTip}
          </motion.div>
        )}
      </AnimatePresence>
      {showPrompt && (
        <div className="mt-3 text-center font-mono text-[11px] tracking-[0.2em] uppercase text-white/60 animate-pulse">
          {player.status === "ended" ? "Tap to replay" : "Tap to continue"}
        </div>
      )}
    </div>
  );
}

function Screen({ player, demo, product }) {
  return (
    <>
      {player.hasVideo ? (
        <video
          ref={player.videoRef}
          src={demo.video}
          poster={demo.poster}
          className="w-full h-full object-cover"
          muted
          playsInline
          onTimeUpdate={player.handleTimeUpdate}
          onEnded={player.handleEnded}
        />
      ) : (
        <PlaceholderScreen product={product} />
      )}
      <DemoOverlay player={player} />
    </>
  );
}

export default function PhoneSimulator({ product }) {
  const reduced = useReducedMotion();
  const desktop = useDesktop();
  const demo = product?.demo ?? { stops: [] };
  const orientation = demo.orientation === "landscape" ? "landscape" : "portrait";
  const size = SIZES[orientation];
  const player = useDemoPlayer(demo, reduced);

  // Mobile: no fixed box, no orientation animation — full-width screen with an
  // aspect ratio matched to the orientation; the title is rendered by Portfolio.
  if (!desktop) {
    return (
      <div
        onClick={player.advance}
        role="button"
        aria-label="Tap to continue demo"
        className="relative w-full rounded-3xl overflow-hidden border border-white/15 bg-black cursor-pointer"
        style={{ aspectRatio: orientation === "landscape" ? "16 / 9" : "9 / 16" }}
      >
        <Screen player={player} demo={demo} product={product} />
      </div>
    );
  }

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: BOX, height: BOX }}
    >
      <motion.div
        onClick={player.advance}
        role="button"
        aria-label="Tap to continue demo"
        className="relative rounded-[44px] border-[6px] border-white/15 bg-black overflow-hidden shadow-2xl cursor-pointer"
        animate={{ width: size.w, height: size.h }}
        transition={reduced ? { duration: 0 } : { duration: 0.6, ease: EASE_IN_OUT }}
      >
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-1.5 rounded-full bg-white/20 z-20" />
        <Screen player={player} demo={demo} product={product} />
      </motion.div>
    </div>
  );
}
```

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: build completes with no errors. (Components are not yet rendered anywhere; this checks imports/JSX.)

- [ ] **Step 4: Commit**

```bash
git add src/components/portfolio/useDemoPlayer.js src/components/portfolio/PhoneSimulator.jsx
git commit -m "feat(portfolio): add PhoneSimulator with tap-driven demo engine"
```

---

### Task 3: ProjectList (paginated)

**Files:**
- Create: `src/components/portfolio/ProjectList.jsx`

**Interfaces:**
- Consumes: `products` array (Task 1).
- Produces: `export default function ProjectList({ items, activeIndex, onSelect, page, pageCount, onPage, perPage })`.

- [ ] **Step 1: Write the component**

Create `src/components/portfolio/ProjectList.jsx`:

```jsx
import React from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

/**
 * Paginated list of products — Title + subtitle only. The active item is
 * highlighted; clicking one selects it. Pager (prev/next + dots) shows only
 * when there is more than one page. Page changes do not change the selection.
 */
export default function ProjectList({
  items,
  activeIndex,
  onSelect,
  page,
  pageCount,
  onPage,
  perPage,
}) {
  const start = page * perPage;
  const slice = items.slice(start, start + perPage);

  return (
    <div className="flex flex-col justify-between min-h-[600px]">
      <div className="flex flex-col">
        {slice.map((p, i) => {
          const idx = start + i;
          const active = idx === activeIndex;
          return (
            <button
              key={p.name}
              onClick={() => onSelect(idx)}
              className={`text-left py-4 pl-5 border-l-2 transition-all bg-transparent ${
                active
                  ? "border-saffron"
                  : "border-white/10 hover:border-white/30"
              }`}
            >
              <h3
                className={`font-display font-bold text-[26px] md:text-[32px] leading-tight transition-colors ${
                  active ? "text-white" : "text-white/55"
                }`}
              >
                {p.name}
              </h3>
              <p
                className={`font-display text-[15px] transition-colors ${
                  active ? "text-saffron-core" : "text-white/35"
                }`}
              >
                {p.tagline}
              </p>
            </button>
          );
        })}
      </div>

      {pageCount > 1 && (
        <div className="flex items-center gap-4 pl-5 mt-6">
          <button
            onClick={() => onPage(page - 1)}
            disabled={page === 0}
            aria-label="Previous page"
            className="text-white/60 hover:text-white disabled:opacity-30 disabled:hover:text-white/60 text-xl bg-transparent"
          >
            <HiChevronLeft />
          </button>
          <div className="flex gap-1.5">
            {Array.from({ length: pageCount }).map((_, i) => (
              <span
                key={i}
                className={`w-2 h-2 rounded-full transition-colors ${
                  i === page ? "bg-saffron" : "bg-white/20"
                }`}
              />
            ))}
          </div>
          <button
            onClick={() => onPage(page + 1)}
            disabled={page === pageCount - 1}
            aria-label="Next page"
            className="text-white/60 hover:text-white disabled:opacity-30 disabled:hover:text-white/60 text-xl bg-transparent"
          >
            <HiChevronRight />
          </button>
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: build completes with no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/portfolio/ProjectList.jsx
git commit -m "feat(portfolio): add paginated ProjectList"
```

---

### Task 4: Rewire Portfolio.jsx into the split layout

**Files:**
- Modify (full rewrite): `src/components/Portfolio.jsx`

**Interfaces:**
- Consumes: `products` (Task 1), `ProjectList` (Task 3), `PhoneSimulator` (Task 2), `Section`/`Reveal` (existing).
- Produces: the rendered `#portfolio` section. No new exports.

- [ ] **Step 1: Replace Portfolio.jsx**

Replace the entire contents of `src/components/Portfolio.jsx` with:

```jsx
import React, { useState } from "react";
import Section from "./motion/Section";
import Reveal from "./motion/Reveal";
import { products } from "../data/portfolio";
import ProjectList from "./portfolio/ProjectList";
import PhoneSimulator from "./portfolio/PhoneSimulator";

const PER_PAGE = 4;
const pageCount = Math.ceil(products.length / PER_PAGE);

/**
 * Permanent split: a paginated project list (left) and an always-on iPhone
 * simulator (right) that plays each product's interactive demo. Selecting a
 * product loads its demo into the phone; scrolling is plain page scroll.
 */
export default function Portfolio() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [page, setPage] = useState(0);

  const active = products[activeIndex];
  const changePage = (p) => setPage(Math.max(0, Math.min(pageCount - 1, p)));

  return (
    <Section id="portfolio" className="pt-24 md:pt-32 pb-16">
      <Reveal className="mb-12">
        <span className="inline-block bg-saffron text-white rounded-pill px-6 py-2 font-display font-bold text-[22px] mb-6 shadow-glow-saffron">
          Portfolio
        </span>
        <h2
          className="font-display font-extrabold text-[36px] md:text-[48px] text-white leading-tight max-w-2xl"
          style={{ letterSpacing: "-1px" }}
        >
          Products we've{" "}
          <span className="autonomous-gradient">actually shipped</span>
        </h2>
      </Reveal>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <ProjectList
          items={products}
          activeIndex={activeIndex}
          onSelect={setActiveIndex}
          page={page}
          pageCount={pageCount}
          onPage={changePage}
          perPage={PER_PAGE}
        />

        {/* Desktop: docked phone on the right */}
        <div className="hidden lg:flex justify-center">
          <PhoneSimulator product={active} />
        </div>

        {/* Mobile: title above, full-width demo below (no frame) */}
        <div className="lg:hidden">
          <div className="mb-4 pl-5">
            <h3 className="font-display font-bold text-[28px] text-white leading-tight">
              {active.name}
            </h3>
            <p className="font-display text-[15px] text-saffron-core">
              {active.tagline}
            </p>
          </div>
          <PhoneSimulator product={active} />
        </div>
      </div>
    </Section>
  );
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: build completes with no errors. Watch for unused-import or missing-export failures.

- [ ] **Step 3: Manual browser check**

Run: `npm run dev`, open the served URL, scroll to the Portfolio section, and confirm:
- Left shows 4 products (Title + subtitle), with a pager (prev/next + 3 dots, since 9 products / 4 = 3 pages) below.
- The right shows a portrait phone; the first product's placeholder screen reads its name + "Demo coming soon", and a tooltip + "Tap to continue" prompt is visible.
- Tapping the phone steps through the 3 tooltips, then shows "Tap to replay"; tapping again restarts.
- Clicking **InstantConfig** (page 1) selects it and the phone **smoothly animates to landscape**; clicking a portrait product animates it back to portrait.
- Clicking the pager arrows changes the visible list page without changing the phone.
- Narrow the window below 1024px: the phone frame is dropped, the title shows above a full-width demo, and tap-to-continue still works.

- [ ] **Step 4: Commit**

```bash
git add src/components/Portfolio.jsx
git commit -m "feat(portfolio): permanent split layout with simulator + paginated list"
```

---

## Self-Review

**Spec coverage:**
- Permanent split, no mode toggle → Task 4 ✓
- Paginated list, Title+subtitle only, no pills/chips → Tasks 3, 4 ✓
- Click selects / loads demo; scroll is plain → Task 4 (`onSelect`), no pin added ✓
- Tap advances within demo; play→pause→tooltip→tap; ended→replay → Task 2 `useDemoPlayer` ✓
- Placeholder mode usable now; same `stops` drive video later → Task 2 ✓
- Per-product orientation; landscape for the four named; smooth animated turn; fixed reserved box → Tasks 1 (data), 2 (`SIZES`/`BOX`/animated frame) ✓
- Mobile stacks title + full-width video, no frame; reduced-motion instant → Task 2 (`useDesktop`, reduced transition), Task 4 (mobile block) ✓

**Placeholder scan:** No TBD/TODO; all steps contain full code and exact commands. ✓

**Type consistency:** `useDemoPlayer` return keys (`videoRef, status, activeTip, stopIndex, hasVideo, advance, handleTimeUpdate, handleEnded, total`) match their uses in `PhoneSimulator`. `ProjectList` props match the call site in `Portfolio.jsx` (`items, activeIndex, onSelect, page, pageCount, onPage, perPage`). `PhoneSimulator` takes `product`; passed `active` in both desktop and mobile blocks. ✓
```
