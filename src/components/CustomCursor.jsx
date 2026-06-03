import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import {
  useReducedMotion,
  isCoarsePointer,
} from "../lib/useReducedMotion";

/**
 * Custom cursor: a small dot that tracks the pointer 1:1 plus a lagging ring
 * (spring) that grows over interactive elements. Uses mix-blend-difference so
 * it reads on both light and dark areas. Disabled on touch / reduced-motion.
 */
export default function CustomCursor() {
  const reduced = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [hidden, setHidden] = useState(true);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 250, damping: 28, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 250, damping: 28, mass: 0.5 });

  useEffect(() => {
    if (reduced || isCoarsePointer()) return;
    setEnabled(true);
    // Hide the native cursor only while our custom cursor is active.
    document.documentElement.classList.add("hide-cursor");

    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setHidden(false);
    };
    const over = (e) => {
      const interactive = e.target.closest(
        "a, button, input, [role='button'], .cursor-pointer"
      );
      setHovering(!!interactive);
    };
    const leave = () => setHidden(true);

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    document.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      document.removeEventListener("mouseleave", leave);
      document.documentElement.classList.remove("hide-cursor");
    };
  }, [reduced, x, y]);

  if (!enabled) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[90]"
      style={{ mixBlendMode: "difference" }}
      aria-hidden="true"
    >
      {/* Dot */}
      <motion.div
        className="absolute w-2 h-2 rounded-full bg-white -translate-x-1/2 -translate-y-1/2"
        style={{ left: x, top: y, opacity: hidden ? 0 : 1 }}
      />
      {/* Ring */}
      <motion.div
        className="absolute rounded-full border border-white -translate-x-1/2 -translate-y-1/2"
        style={{
          left: ringX,
          top: ringY,
          width: hovering ? 56 : 32,
          height: hovering ? 56 : 32,
          opacity: hidden ? 0 : hovering ? 0.9 : 0.5,
        }}
        transition={{ width: { duration: 0.2 }, height: { duration: 0.2 } }}
      />
    </div>
  );
}
