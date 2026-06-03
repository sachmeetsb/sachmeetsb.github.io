import React from "react";
import { motion } from "framer-motion";
import {
  revealVariants,
  staggerContainer,
  VIEWPORT,
  DURATION,
  EASE_OUT,
} from "../../lib/motion";
import { useReducedMotion } from "../../lib/useReducedMotion";

/**
 * Standalone reveal-on-scroll. Replaces the unwired `fade-in`/`slide-up`
 * keyframes. Fires once when it enters the viewport.
 */
export function Reveal({
  children,
  as = "div",
  delay = 0,
  y = 28,
  className = "",
  ...rest
}) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as] || motion.div;

  if (reduced) {
    const Tag = as;
    return (
      <Tag className={className} {...rest}>
        {children}
      </Tag>
    );
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: DURATION.base, ease: EASE_OUT, delay }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}

/** Stagger container — wrap a list; each child should be a <StaggerItem>. */
export function Stagger({
  children,
  as = "div",
  stagger = 0.08,
  delayChildren = 0,
  className = "",
  ...rest
}) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as] || motion.div;

  if (reduced) {
    const Tag = as;
    return (
      <Tag className={className} {...rest}>
        {children}
      </Tag>
    );
  }

  return (
    <MotionTag
      className={className}
      variants={staggerContainer(stagger, delayChildren)}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}

/** Child of <Stagger>. Inherits timing from the parent container. */
export function StaggerItem({ children, as = "div", className = "", ...rest }) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as] || motion.div;

  if (reduced) {
    const Tag = as;
    return (
      <Tag className={className} {...rest}>
        {children}
      </Tag>
    );
  }

  return (
    <MotionTag className={className} variants={revealVariants} {...rest}>
      {children}
    </MotionTag>
  );
}

export default Reveal;
