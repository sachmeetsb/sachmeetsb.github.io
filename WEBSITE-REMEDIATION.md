# Website remediation

Started 9 September 2026 from the live-site red-team audit.

## Decisions requested

- Primary audience and homepage conversion goal.
- Founder biography in the user's own terms.
- Short versus detailed booking intake; existing Calendly versus custom booking.
- Reconcile products absent from Notion before public release claims.

## Implementation gates

## Approved direction and design tokens

### Revised brief, 9 September

The user rejected the Studio redesign. Restore the original App, purple/orange palette, typography, rounded cards, orb and section treatments. Only change hierarchy and the specified audit defects. Keep Plus Jakarta Sans display, Inter body and JetBrains Mono labels; original colours #0F0A1E, #2D1B69, #4A2F9A, #FF5E0E, #FFAA70, white. Founder photograph and first-person introduction should be prominent; products follow the hero. Put Ideate → Engineering → Product directly below the main actions, with Product orange-gradient. Keep the contact form, use Calendly instead of the custom booking backend. Do not deploy Railway. Remove testimonials, unsupported industry metrics and newsletter; use a two-column footer product list and oversized Kartar logo. Remove forced process pinning and fix keyboard/voice/pagination issues. Preserve unrelated startup, truthful product-stage and SEO fixes.

Layout: original hero + founder portrait / original portfolio / services and industry workflow cards / click-operated process / founder and project-specific collaborators / original-styled accessible intake / footer links + large wordmark. This is a targeted revision, not another design-system replacement.

The earlier direction below is superseded, retained only as implementation history.

Primary audience: businesses hiring Sachmeet to build or improve products. Booking: custom on-site Google Calendar experience, not Calendly. Calendar account and working-hour rules awaiting user input.

Palette: deep purple #140d27, surface purple #261742, paper-white #edeaf4, muted lavender #b6b0c5, orange #ff8e4f, border purple #61517a. Type: Plus Jakarta Sans for the founder headline and headings, system sans for body and forms. Left-aligned text, constrained reading widths, one actual founder photograph as the hero visual. Product evidence comes immediately next. No marquees, pinning, custom cursor, hypothetical proof or repeated pill headings. The explicit orange-gradient Product request takes precedence over the design skill's general advice against single-word highlights.

Layout: navigation / founder statement + portrait / real product demos / concise working approach / project partners / custom booking / compact footer. On mobile this is a single reading sequence, without floating controls or nested form cards. Review: preserve the user's established colours instead of introducing the generic cream/serif alternative; use real photography and recorded product UI as the visual material.

- [ ] Founder-led hierarchy and real product evidence; preserve orange Product heading.
- [ ] Remove unsupported testimonial/industry claims and excessive decorative motion.
- [ ] Remove excluded products from homepage, hub, sitemap and direct product routes.
- [ ] Reconcile public product stages with Notion; no inferred launch claims.
- [ ] Repair every CTA and unify booking entry points.
- [ ] Accessible intake, explicit calendar handoff, no stale contact prefill.
- [ ] Voice transcript review, safe option confirmation, lifecycle cleanup and privacy disclosure.
- [ ] Synchronized portfolio selection, keyboard operation and playback controls.
- [ ] Mobile, keyboard, contrast and reduced-motion verification.
- [ ] Accurate product SEO pages, metadata, structured data and startup fallback.
- [ ] Read Cloudflare/Search Console when authenticated; no fabricated metrics.
- [ ] Verify real booking delivery/calendar connection with authorized test details.
- [ ] Build, regression checks, visual review, release and hosted verification.

## Source-of-truth snapshot

Notion Product Pipeline read 9 September 2026. Vimarsha, LawyerBoss, InstantConfig and VR Real Estate Walkthroughs: Testing. Satya Social: In Progress. Local AI Data Analyst: LaunchPad. Rezt and Speko remain excluded by explicit user instruction regardless of pipeline stage. TableTennis remains excluded following the audit/removal request.

## Release boundaries

### Targeted revision verification

- Original App is mounted again; no colour change. Purple/orange palette retained.
- Founder portrait and first-person introduction added; partners grouped by Khoj, Kartar Hardware and VR Architecture.
- Portfolio moved immediately after hero; Ideate → Engineering → Product sits below hero actions.
- Testimonials, fabricated industry percentages and newsletter integration removed from the rendered site.
- Footer uses two product columns and an oversized wordmark.
- Process pinning removed, preloader cleanup hardened, deep-link anchors re-resolved after the intro.
- One responsive demo player instead of separate hidden/visible video instances; visible page and selection synchronized; native buttons used for demo interaction.
- All 13 intake controls have associated labels verified in the browser. Full-brief Calendly handoff and stale-link invalidation verified locally.
- Voice suggestions are exact-match only, shown separately, and require confirmation. Unit coverage includes negation, cumulative transcripts, stale callbacks, missing/denied microphone access and abort exceptions. Browser confirmation testing after microphone startup was inconclusive: review selection displayed, but confirmation/dismissal did not activate through the browser driver. Do not claim microphone/confirmation end-to-end acceptance until independently retested.
- Production build plus 13 regression tests passed. Desktop and 390px/320px layouts inspected: no document horizontal overflow; no process pin spacers; body scrolling unlocked after intro.
- Calendly account-side template/hours/duration changes await sign-in; see CALENDLY-TEMPLATE.md. No calendar invitation sent, no remote deployment, no Railway service created.

Preserve the previous turn's startup/SEO changes. Never publish made-up customer quotes, metrics, founder history, launch status or platform/privacy claims. No actual customer data, microphone recordings or credentials in analytics. Dashboard sign-in and external integration checks must be reported separately from local test results.
