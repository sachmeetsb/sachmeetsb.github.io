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
  gap = "34vh",
  className = "",
}) {
  const ref = useRef(null);
  const items = React.Children.toArray(children);

  useEffect(() => {
    if (prefersReducedMotion() || isMobileViewport()) return;
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".sticky-card");
      // Scrub distance in px, derived from `gap` so the two can't drift.
      const gapPx = () => {
        const m = /([\d.]+)vh/.exec(gap);
        return window.innerHeight * (m ? parseFloat(m[1]) / 100 : 0.34);
      };
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return;
        // Drive the recede from THIS card's own pin progress, not the next
        // card's top. Triggering on the next (sticky) card's "top top" never
        // resolves — a sticky card can't reach y=0 — which froze the scrub.
        // Here: start when this card pins, end one gap of scroll later, i.e.
        // exactly while the next card rises up and covers it.
        const pin = topBase + i * topStep;
        gsap.to(card, {
          scale: 0.92,
          opacity: 0.5,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: `top top+=${pin}`,
            end: () => `+=${gapPx()}`,
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
      });
      // Positions depend on fonts/late layout; recompute once settled.
      ScrollTrigger.refresh();
    }, ref);
    return () => ctx.revert();
  }, [topBase, topStep, gap]);

  const reduced =
    typeof window !== "undefined" &&
    (prefersReducedMotion() || isMobileViewport());

  return (
    <div
      ref={ref}
      className={className}
      // Trailing room so the LAST card can pin and rest on the deck. A child
      // marginBottom doesn't extend the parent's sticky containing block, so
      // the final card otherwise pinned and un-pinned on the same frame and
      // slid straight off instead of stacking. Padding does extend it.
      style={reduced ? undefined : { paddingBottom: gap }}
    >
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
