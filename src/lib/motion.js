/**
 * Shared motion tokens — keep easings/durations consistent across Framer Motion
 * and GSAP so the whole site feels like one system.
 */

// Framer Motion cubic-bezier easings
export const EASE_OUT = [0.16, 1, 0.3, 1]; // easeOutExpo-ish
export const EASE_IN_OUT = [0.65, 0, 0.35, 1];

export const DURATION = {
  fast: 0.4,
  base: 0.7,
  slow: 1.1,
};

// GSAP string easings (mirror the above feel)
export const GSAP_EASE = "expo.out";
export const GSAP_EASE_IN_OUT = "power3.inOut";

/** Standard reveal variants for Framer Motion `whileInView`. */
export const revealVariants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.base, ease: EASE_OUT },
  },
};

/** Stagger container — children use `revealVariants`. */
export const staggerContainer = (stagger = 0.08, delayChildren = 0) => ({
  hidden: {},
  show: {
    transition: { staggerChildren: stagger, delayChildren },
  },
});

/** Default viewport config for whileInView (fire once, a bit early). */
export const VIEWPORT = { once: true, margin: "0px 0px -12% 0px" };
