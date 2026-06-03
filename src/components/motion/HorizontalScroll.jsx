import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  prefersReducedMotion,
  isMobileViewport,
} from "../../lib/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

/**
 * Pins a section and translates its horizontal track as you scroll vertically.
 * On reduced-motion / mobile it degrades to a normal swipeable/stacked row
 * (no pin, native overflow scroll).
 */
export default function HorizontalScroll({
  children,
  className = "",
  trackClassName = "",
  id,
}) {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const reduced = prefersReducedMotion() || isMobileViewport();
    if (reduced) return; // native overflow fallback (see classes below)

    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const getScroll = () => track.scrollWidth - window.innerWidth;
      const tween = gsap.to(track, {
        x: () => -getScroll(),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${getScroll()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });
      return () => tween.kill();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const reduced =
    typeof window !== "undefined" &&
    (prefersReducedMotion() || isMobileViewport());

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`relative overflow-hidden ${className}`}
    >
      <div
        ref={trackRef}
        className={`flex ${
          reduced ? "overflow-x-auto snap-x snap-mandatory" : "w-max"
        } ${trackClassName}`}
      >
        {children}
      </div>
    </section>
  );
}
