import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  prefersReducedMotion,
  isMobileViewport,
} from "../../lib/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

/**
 * Scroll-scrubbed image sequence — the "seek front and back" pattern.
 * Pins a sticky canvas and draws a frame whose index is tied to scroll
 * progress (scroll down → forward, up → reverse).
 *
 * Provide EITHER:
 *  - `frames`: array of image URLs (the Apple canvas-sequence technique), or
 *  - `renderFrame(ctx, progress, {width,height})`: a procedural drawer used as
 *    a placeholder until real AI/product frames are dropped in.
 *
 * On reduced-motion / mobile it renders a single static frame (no pin/scrub).
 */
export default function ScrollScrubSequence({
  frames = [],
  renderFrame,
  scrollLength = 2.2, // pin distance as multiple of viewport height
  className = "",
  children,
}) {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const progressRef = useRef({ p: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let images = [];
    let loaded = 0;
    const useImages = frames.length > 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      draw(progressRef.current.p);
    };

    const draw = (p) => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);
      if (useImages && loaded > 0) {
        const idx = Math.min(
          images.length - 1,
          Math.max(0, Math.round(p * (images.length - 1)))
        );
        const img = images[idx];
        if (img && img.complete) {
          // cover-fit
          const ir = img.width / img.height;
          const cr = w / h;
          let dw = w,
            dh = h,
            dx = 0,
            dy = 0;
          if (ir > cr) {
            dh = h;
            dw = h * ir;
            dx = (w - dw) / 2;
          } else {
            dw = w;
            dh = w / ir;
            dy = (h - dh) / 2;
          }
          ctx.drawImage(img, dx, dy, dw, dh);
        }
      } else if (renderFrame) {
        renderFrame(ctx, p, { width: w, height: h, dpr });
      }
    };

    if (useImages) {
      images = frames.map((src) => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
          loaded++;
          if (loaded === 1) draw(progressRef.current.p);
        };
        return img;
      });
    }

    resize();
    window.addEventListener("resize", resize);

    const reduced = prefersReducedMotion() || isMobileViewport();
    let trigger;
    if (!reduced) {
      trigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: `+=${window.innerHeight * scrollLength}`,
        pin: true,
        scrub: 1,
        onUpdate: (self) => {
          progressRef.current.p = self.progress;
          draw(self.progress);
        },
      });
    } else {
      draw(0.5); // static mid frame
    }

    return () => {
      window.removeEventListener("resize", resize);
      trigger && trigger.kill();
    };
  }, [frames, renderFrame, scrollLength]);

  return (
    <section ref={sectionRef} className={`relative ${className}`}>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      <div className="relative z-10 h-full">{children}</div>
    </section>
  );
}
