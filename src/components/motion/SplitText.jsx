import React from "react";
import { motion } from "framer-motion";
import { EASE_OUT, VIEWPORT } from "../../lib/motion";
import { useReducedMotion } from "../../lib/useReducedMotion";

/**
 * Per-word (and per-char) headline reveal. Splits text into words that rise +
 * fade in with a stagger. Renders plain text when reduced-motion is preferred.
 * Pass JSX children for styled spans (e.g. .autonomous-gradient) — those are
 * revealed as a single unit.
 */
export default function SplitText({
  text,
  children,
  className = "",
  as = "span",
  stagger = 0.04,
  delay = 0,
  y = "0.9em",
}) {
  const reduced = useReducedMotion();
  const Tag = as;

  if (reduced || (!text && children)) {
    return <Tag className={className}>{text ?? children}</Tag>;
  }

  const words = String(text).split(" ");

  return (
    <Tag className={className} aria-label={text}>
      {words.map((word, wi) => (
        <span
          key={wi}
          className="inline-block overflow-hidden align-bottom"
          style={{ paddingBottom: "0.05em" }}
        >
          <motion.span
            className="inline-block"
            initial={{ y, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={VIEWPORT}
            transition={{
              duration: 0.7,
              ease: EASE_OUT,
              delay: delay + wi * stagger,
            }}
          >
            {word}
            {wi < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
