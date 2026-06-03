import React, { useEffect, useRef } from "react";
import { useLenis } from "../lib/SmoothScroll";
import { prefersReducedMotion } from "../lib/useReducedMotion";

const logos = [
  "Logistics",
  "Legal Tech",
  "Healthcare",
  "Finance",
  "Agriculture",
  "E-commerce",
  "Manufacturing",
  "Education",
];

/**
 * Scroll-velocity marquee: drifts at a base speed, but accelerates and flips
 * direction with scroll velocity. Falls back to the CSS marquee under
 * reduced-motion.
 */
export default function LogoBar() {
  const trackRef = useRef(null);
  const lenis = useLenis();
  const state = useRef({ x: 0, vel: 0, dir: 1, raf: 0 });
  const reduced = typeof window !== "undefined" && prefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const track = trackRef.current;
    if (!track) return;

    const half = () => track.scrollWidth / 2;
    const onScroll = (e) => {
      // Lenis provides velocity; bias direction by scroll direction.
      state.current.vel = e.velocity || 0;
      if (e.direction) state.current.dir = e.direction > 0 ? 1 : -1;
    };
    if (lenis) lenis.on("scroll", onScroll);

    const tick = () => {
      const s = state.current;
      const base = 0.6;
      const speed = base + Math.min(Math.abs(s.vel) * 0.6, 18);
      s.x -= speed * s.dir;
      const h = half();
      if (s.x <= -h) s.x += h;
      if (s.x > 0) s.x -= h;
      track.style.transform = `translateX(${s.x}px)`;
      s.vel *= 0.9; // decay
      s.raf = requestAnimationFrame(tick);
    };
    state.current.x = 0;
    state.current.raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(state.current.raf);
      if (lenis) lenis.off("scroll", onScroll);
    };
  }, [lenis, reduced]);

  return (
    <section className="py-12 bg-white/[0.02] border-y border-white/[0.06] overflow-hidden">
      <p className="text-center font-mono text-[12px] tracking-[0.12em] uppercase text-white/40 mb-7">
        Industries we build for
      </p>
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-32 z-10 bg-gradient-to-r from-void to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-32 z-10 bg-gradient-to-l from-void to-transparent" />
        <div
          ref={trackRef}
          className={`flex w-max ${reduced ? "animate-marquee" : ""}`}
        >
          {[...logos, ...logos, ...logos].map((name, i) => (
            <span
              key={i}
              className="inline-block mx-12 font-display font-bold text-[22px] text-white/20 select-none whitespace-nowrap"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
