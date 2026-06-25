# Portfolio interactive demo — design

**Date:** 2026-06-25
**Section:** `#portfolio`

## Goal

Replace the current Portfolio card grid with a permanent split layout: a
paginated list of products on the left and an always-visible iPhone simulator on
the right that plays an interactive, tap-driven product demo for the selected
product.

## Layout

Single state — no browse/demo toggle. The section is always a two-column split:

```
┌──────────────────────────┬──────────────────────────┐
│  ▸ Vimarsha              │        ╭───────────╮       │
│    EPUB reader, reimagined│        │           │       │
│                          │        │   phone    │       │
│    Speko                 │        │   demo      │       │
│    Voice-first tracker   │        │  (tooltip)  │       │
│                          │        │           │       │
│    Rezt                  │        ╰───────────╯       │
│    Rest & recovery       │      ● tap to continue      │
│    ...                   │                            │
│  ◀  ● ● ○  ▶  (pager)    │                            │
└──────────────────────────┴──────────────────────────┘
```

- **Left:** paginated project list. Each item is just **Title** (big) +
  **subtitle** — no category chip, no description, no filter pills. The active
  item is highlighted.
- **Right:** the iPhone simulator, permanently visible.
- **Pagination:** the list is height-matched to the phone and shows ~4 items per
  page (`PER_PAGE`, tunable). Pager controls (prev/next + page dots) appear when
  there are more products than one page. Changing page does not change the phone;
  the phone only changes when an item is clicked.
- **Default:** on mount, the first product is active and its demo is loaded
  (placeholder until a video exists).

## Interaction model

- **Click a list item** → load that product's demo into the phone, reset to the
  first step, autoplay.
- **Scroll** → normal page scroll. No pinning, no project switching.
- **Tap the phone** → advance within the current demo (resume from a tooltip
  pause / go to the next step).

## Data model

Extract the inline `products` array into `src/data/portfolio.js`. Each product
gains an optional `demo` field:

```js
{
  name: 'Vimarsha',
  tagline: 'EPUB reader, reimagined',
  category: 'Monetised Apps', // retained in data, not shown in the list
  description: '…',           // retained in data, used on mobile/aria if needed
  demo: {
    orientation: 'portrait',             // 'portrait' (default) | 'landscape'
    video: '/media/demos/vimarsha.mp4',  // optional until provided
    poster: '/media/demos/vimarsha.jpg', // optional
    stops: [
      { t: 4.0,  tip: 'Tap any figure to expand it in sync.' },
      { t: 11.5, tip: 'Voice notes drop straight onto the page.' },
      { t: 19.0, tip: 'The AI companion discusses the book with you.' },
    ],
  },
}
```

`stops` is an ordered list of pause points. `t` is the video timestamp (seconds)
at which to auto-pause; `tip` is the tooltip shown there. `orientation` selects
the device frame shape (see below).

## Device orientation

Each demo declares `orientation`. Default is `portrait`. These four products use
`landscape` (wider video content — configurators, dashboards, document drafting,
VR walkthroughs read better wide):

- **InstantConfig**
- **DataMind**
- **LawyerBoss**
- **VR Real Estate Tour**

The simulator is a single device that **smoothly animates between portrait and
landscape** when the active product's orientation differs from the current one —
the frame rotates/resizes (≈19.5:9 portrait ↔ landscape) with a spring/eased
transition while the screen content cross-fades, so switching from a portrait
demo to a landscape one feels like the device turning. Implemented with
framer-motion (animated width/height/aspect on the frame; `layout`/transition
easing consistent with the site's `EASE_IN_OUT`). Under reduced motion the
orientation change is instant (no rotate animation).

The phone column reserves a fixed box (sized to the larger of the two
orientations) so the device animates *within* it and the left list / page layout
does not reflow when orientation changes.

## Playback engine (`useDemoPlayer`)

A hook owned by `PhoneSimulator`. State machine:

- `playing` — video plays. On `timeupdate`, when `currentTime >= stops[next].t`,
  pause the video, show `stops[next].tip`, pulse a "Tap to continue" prompt, and
  move to `paused-tooltip`.
- `paused-tooltip` — waiting for a tap. On tap: hide tooltip, advance the stop
  pointer, resume playback (`playing`).
- `ended` — after the last stop and the video finishes; show a Replay control.

On active-product change, reset pointer to 0 and autoplay from the start.

### Placeholder mode (no video yet)

If `demo.video` is missing, the phone shows a styled placeholder screen and the
`stops` drive a **tap-through walkthrough**: each tap reveals the next `tip`,
ending on a Replay. This makes the full interaction testable now. When a real
MP4 + timestamps are added, the same `stops` auto-pause the video instead — no
code change, data only.

## Responsive / reduced-motion

- **Mobile (small screens):** drop the phone frame and the side-by-side layout.
  Show the selected product's title/subtitle, then the demo video full-width
  below it, with the same tap-to-continue + tooltip flow. List remains paginated,
  stacked above.
- **Reduced motion:** no autoplay; taps step through stops/tooltips manually.

## File structure

- `src/data/portfolio.js` — products + demo data (extracted from current inline
  array in `Portfolio.jsx`).
- `src/components/Portfolio.jsx` — section wrapper; owns `activeIndex` and `page`
  state; renders the split.
- `src/components/portfolio/ProjectList.jsx` — paginated list of title/subtitle
  items + pager controls.
- `src/components/portfolio/PhoneSimulator.jsx` — iPhone frame + `useDemoPlayer`
  engine + tooltip/prompt overlay + placeholder mode.

## Out of scope (for now)

- Real demo videos and their timestamp data (added later as data only).
- Category filtering / filter pills (removed for a cleaner list).
- Scroll-driven project switching and section pinning (explicitly dropped).
