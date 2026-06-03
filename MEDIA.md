# Media pipeline — AI clips → loops & scroll-scrub

This site has a ready-to-fill embedding system for AI-generated demo clips. The
components exist; you just drop in assets and reference them.

## Where assets live

```
public/media/<name>.webm     # looping clip, primary (VP9/AV1)
public/media/<name>.mp4       # looping clip, fallback (H.264)
public/media/<name>.jpg       # poster / reduced-motion still
public/scrub/<name>/0001.jpg  # scroll-scrub image sequence (zero-padded)
public/scrub/<name>/0002.jpg
...
```

## Components

- **`MediaLoop`** (`src/components/motion/MediaLoop.jsx`) — lazy, in-view-only
  autoplay, muted + looping, poster/reduced-motion fallback.
  ```jsx
  <MediaLoop name="agent-triage" alt="Agent triaging tickets" />
  ```
- **`ScrollScrubVideo`** (`src/components/motion/ScrollScrubVideo.jsx`) — binds a
  clip's `currentTime` to scroll (plays forward / reverses).
  ```jsx
  <ScrollScrubVideo src="/media/agent-triage.mp4" poster="/media/agent-triage.jpg" />
  ```
- **`ScrollScrubSequence`** (`src/components/motion/ScrollScrubSequence.jsx`) —
  the smoother Apple-style canvas image-sequence scrub. Currently the hero
  `ScrollScrubShowcase` uses a procedural placeholder; swap in real frames:
  ```jsx
  <ScrollScrubSequence frames={Array.from({length:120},(_,i)=>`/scrub/agent/${String(i+1).padStart(4,'0')}.jpg`)} />
  ```

All three degrade to a static frame/poster under `prefers-reduced-motion` and on
mobile.

## Generating clips

1. **Generate** a 3–6s clip with an AI video tool (Runway Gen-4, Pika, Kling,
   Luma, Sora-class). Aim for a **seamless loop** (first/last frame match) or a
   **ping-pong** loop. Keep it short and high-contrast.
2. **Encode** with `ffmpeg` — ship video, not GIF (GIF is huge & 256-color):

   ```bash
   # WebM (VP9) — primary
   ffmpeg -i in.mp4 -c:v libvpx-vp9 -b:v 0 -crf 32 -an public/media/<name>.webm
   # MP4 (H.264) — fallback
   ffmpeg -i in.mp4 -c:v libx264 -crf 23 -pix_fmt yuv420p -an public/media/<name>.mp4
   # Poster still
   ffmpeg -i in.mp4 -vf "select=eq(n\,0)" -q:v 3 public/media/<name>.jpg
   ```
3. **Image sequence** for scroll-scrub (smoothest seek both directions):

   ```bash
   mkdir -p public/scrub/<name>
   ffmpeg -i in.mp4 -vf fps=30 -q:v 4 public/scrub/<name>/%04d.jpg
   ```

   Keep the frame count modest (60–150) and dimensions ≤ 1600px wide to stay
   within a reasonable download budget.

## Notes
- Prefer animated WebP over GIF if a true image format is required.
- Lazy-load: `MediaLoop` only fetches when in view; sequences preload on mount
  of their section — keep sequences off the very top of the page.
