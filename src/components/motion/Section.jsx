import React from "react";

/**
 * Standardizes the repeated section shell:
 *   <section><div className="max-w-container mx-auto px-8 lg:px-16">…</div></section>
 * Pass `glow` to drop a radial brand glow behind the content.
 */
export default function Section({
  id,
  children,
  className = "",
  innerClassName = "",
  glow = null, // e.g. { className: "...", style: {...} }
  ...rest
}) {
  return (
    <section id={id} className={`relative ${className}`} {...rest}>
      {glow && <div className={`section-glow ${glow.className || ""}`} style={glow.style} />}
      <div className={`relative z-10 max-w-container mx-auto px-8 lg:px-16 ${innerClassName}`}>
        {children}
      </div>
    </section>
  );
}

/** The recurring pill-label + paragraph section header. */
export function SectionHeader({ label, children, align = "row", className = "" }) {
  const layout =
    align === "row"
      ? "flex flex-col md:flex-row md:items-center gap-5 md:gap-12"
      : "flex flex-col gap-6";
  return (
    <div className={`${layout} mb-14 ${className}`}>
      <span className="inline-block self-start bg-saffron text-white rounded-pill px-6 py-2 font-display font-bold text-[22px] whitespace-nowrap shadow-glow-saffron">
        {label}
      </span>
      {children && (
        <div className="text-white/50 text-[18px] max-w-2xl leading-relaxed">
          {children}
        </div>
      )}
    </div>
  );
}
