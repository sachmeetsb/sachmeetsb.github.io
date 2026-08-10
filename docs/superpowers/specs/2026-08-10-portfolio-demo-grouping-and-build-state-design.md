# Portfolio demo grouping and build-state animation — design

**Date:** 2026-08-10  
**Section:** `#portfolio`

## Goal

Show only products with real demo videos on the first portfolio page and give
every unfinished product a shared, polished factory animation in the existing
device-preview area. The page must keep the portfolio's current split layout,
device morphing, pagination, and visual language.

## Confirmed product grouping

The presence of `product.demo.video` is the source of truth for demo readiness.
No separate status field is added.

- Page 1 contains exactly the three products that currently have demo videos:
  **Vimarsha**, **InstantConfig**, and **DataMind**.
- Remaining products retain their current relative order and are chunked into
  later pages of four products: page 2 contains four and page 3 contains two.
- Adding `demo.video` to another product later automatically moves it to page 1.
- Removing a video value automatically moves that product into the build pages.

The selected product remains selected when the user changes pages, matching the
existing pager behavior. Selecting an item on the new page updates the preview.

## Layout and interaction

The portfolio remains a two-column section on desktop and a stacked section on
mobile:

```text
┌─────────────────────────┬────────────────────────────────┐
│ Products we've shipped  │                                │
│                         │      existing device frame     │
│ Vimarsha                │   ┌────────────────────────┐   │
│ InstantConfig           │   │ demo video, or factory │   │
│ DataMind                │   │ animation for builds   │   │
│                         │   └────────────────────────┘   │
│       ‹  ━━ ── ──  ›    │          Still in build        │
└─────────────────────────┴────────────────────────────────┘
```

- Page 1 starts with Vimarsha selected and its real video loaded.
- Selecting a demo product keeps the existing autoplay, pause-point tooltip,
  tap-to-continue, and replay behavior.
- Selecting an unfinished product replaces the screen contents with the factory
  scene. It does not show demo tooltips or respond as a fake walkthrough.
- The factory scene fills the same responsive screen area and uses each
  product's declared portrait or landscape orientation.
- “Still in build” appears directly beneath the animated assembly scene, inside
  the device screen, so the status stays visually attached to the preview on
  desktop and mobile.

## Factory scene

The scene is a small, self-contained production line made with semantic JSX,
CSS, and Framer Motion; it requires no external image or animation asset.

Visual elements:

- a subdued indigo blueprint grid for depth;
- a conveyor carrying small product modules across the screen;
- a simple mechanical arm that lowers as a module passes;
- saffron inspection lights and restrained teal “ready” signals;
- the active product name as a compact work-order label;
- the plain-language status “Still in build” below the machinery.

Motion is deliberately concentrated in this one scene: the belt and modules
move continuously, the arm performs a short assembly cycle, and a status light
pulses. The rest of the device remains quiet. Under `prefers-reduced-motion`,
the scene renders at a clear static assembly state with all information intact.

The animation uses the existing palette and typography:

- Void: `#0F0A1E`
- Indigo: `#2D1B69` / `#4A2F9A`
- Saffron: `#FF5E0E` / `#FFAA70`
- Teal: `#00BFA5`
- Display: Plus Jakarta Sans
- Utility labels: JetBrains Mono

## Architecture and component boundaries

### `Portfolio.jsx`

Owns the selected product and current page. It derives pages from `products`:

1. filter products with `demo.video` into the first page;
2. filter products without `demo.video` into the build queue;
3. chunk the build queue into pages of four.

It passes the current page's product objects to `ProjectList` and the selected
product to `PhoneSimulator`. Selection is stored by product identity rather than
by an index into the original array, because the rendered order is now grouped.

### `ProjectList.jsx`

Renders the already-derived current page instead of slicing the master product
array internally. It keeps the existing title/subtitle treatment and pager
controls. Selection callbacks pass the product object (or another stable product
identifier) back to `Portfolio`.

### `BuildFactory.jsx`

A new isolated component that renders the product-specific work-order label,
factory artwork, motion, and “Still in build” status. It accepts only the active
product and the reduced-motion preference. It has no pagination or playback
state.

### `PhoneSimulator.jsx`

Chooses between the existing video player and `BuildFactory`:

- `demo.video` present and playable → video demo;
- no `demo.video` → factory scene;
- video load/playback error → factory scene as a resilient fallback.

The same choice is used inside both the desktop device frame and the frameless
mobile preview. Build previews are non-interactive and use an accurate accessible
label; video previews retain the current tap/replay controls.

### `useDemoPlayer.js`

Continues to own only video playback state. Placeholder tap-through behavior is
removed from the visible UI path because unfinished products now use the factory
component. No factory animation state is added to this hook.

## Error handling and accessibility

- If a declared video fails to load, the preview falls back to the factory
  scene rather than displaying a broken or empty frame.
- The product remains on the demo page because grouping is based on authored
  data, avoiding list movement caused by a transient network failure.
- Factory artwork is decorative and hidden from assistive technology; the
  product name and “Still in build” status are exposed as readable text.
- Video controls retain meaningful action labels. Build previews do not claim
  to be tappable.
- Keyboard focus remains visible on list items and pager controls.
- Continuous factory motion is disabled for reduced-motion users.

## Verification

1. Confirm page 1 lists only Vimarsha, InstantConfig, and DataMind in that order.
2. Confirm pages 2 and 3 contain every unfinished product exactly once, in the
   original relative order, with page sizes four and two.
3. Select all three demo products and verify video, poster, orientation,
   pause-point tips, continue, and replay behavior.
4. Select portrait and landscape unfinished products and verify the factory
   scene fills the same preview area with “Still in build” beneath it.
5. Force a demo video error and verify the factory fallback appears without a
   broken player.
6. Verify desktop, tablet/mobile stacking, keyboard focus, and reduced-motion
   behavior.
7. Run `npm run build` with no errors or new dependencies.

## Scope boundaries

- Do not add, edit, transcode, or deploy demo media.
- Do not change product copy, categories, demo timestamps, or orientation data.
- Do not redesign the broader portfolio section, pager, or device frame.
- Do not add notification capture, release dates, progress percentages, or
  speculative completion messaging.
- Do not deploy or push the website as part of this change.
