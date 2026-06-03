import React, { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import {
  useReducedMotion,
  isCoarsePointer,
} from "../../lib/useReducedMotion";

/**
 * Button/link that subtly pulls toward the cursor (magnetic effect).
 * Renders a normal element on touch devices or with reduced motion.
 */
export default function MagneticButton({
  children,
  as = "a",
  strength = 0.4,
  className = "",
  ...rest
}) {
  const reduced = useReducedMotion();
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 200, damping: 15, mass: 0.4 });

  const coarse = typeof window !== "undefined" && isCoarsePointer();
  const MotionTag = motion[as] || motion.a;

  if (reduced || coarse) {
    const Tag = as;
    return (
      <Tag className={className} {...rest}>
        {children}
      </Tag>
    );
  }

  const onMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set(relX * strength);
    y.set(relY * strength);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <MotionTag
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy }}
      className={className}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
