import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  prefersReducedMotion,
  isMobileViewport,
} from "../../lib/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

/**
 * Card-deck / sticky-stack: each child sticks near the top and the next card
 * scrolls up over it, while stuck cards scale down slightly for depth.
 * On reduced-motion / mobile it renders a normal stacked column.
 */
export default function StickyStack({
  children,
  topBase = 110,
  topStep = 18,
  gap = "55vh",
  className = "",
}) {
  const ref = useRef(null);
  const items = React.Children.toArray(children);

  useEffect(() => {
    if (prefersReducedMotion() || isMobileViewport()) return;
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".sticky-card");
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return;
        gsap.to(card, {
          scale: 0.92,
          opacity: 0.5,
          ease: "none",
          scrollTrigger: {
            trigger: cards[i + 1],
            start: "top bottom",
            end: "top top",
            scrub: true,
          },
        });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const reduced =
    typeof window !== "undefined" &&
    (prefersReducedMotion() || isMobileViewport());

  return (
    <div ref={ref} className={className}>
      {items.map((child, i) => (
        <div
          key={i}
          className="sticky-card"
          style={
            reduced
              ? { marginBottom: "1.5rem" }
              : {
                  position: "sticky",
                  top: `${topBase + i * topStep}px`,
                  marginBottom: i === items.length - 1 ? 0 : gap,
                  transformOrigin: "center top",
                  willChange: "transform",
                }
          }
        >
          {child}
        </div>
      ))}
    </div>
  );
}
