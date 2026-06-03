import React, { useRef } from "react";
import { isCoarsePointer } from "../../lib/useReducedMotion";

/**
 * Dark glass card with a cursor-tracked radial glow (via CSS vars) and an
 * optional animated conic border beam. Pointer tracking is skipped on touch.
 */
export default function SpotlightCard({
  children,
  className = "",
  beam = false,
  glowColor = "rgba(255,94,14,0.18)",
  as: Tag = "div",
  ...rest
}) {
  const ref = useRef(null);
  const coarse = typeof window !== "undefined" && isCoarsePointer();

  const onMouseMove = (e) => {
    if (coarse || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    ref.current.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <Tag
      ref={ref}
      onMouseMove={onMouseMove}
      className={`group relative overflow-hidden rounded-card border border-white/10 bg-white/[0.04] backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:-translate-y-1 hover:shadow-card-dark ${
        beam ? "border-beam" : ""
      } ${className}`}
      style={{ "--glow": glowColor }}
      {...rest}
    >
      {/* Cursor spotlight */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(360px circle at var(--mx, 50%) var(--my, 50%), var(--glow), transparent 65%)",
        }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </Tag>
  );
}

/** Plain dark glass surface (no cursor tracking) — for simpler panels. */
export function GlassCard({ children, className = "", ...rest }) {
  return (
    <div
      className={`relative overflow-hidden rounded-card border border-white/10 bg-white/[0.04] backdrop-blur-sm ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}
