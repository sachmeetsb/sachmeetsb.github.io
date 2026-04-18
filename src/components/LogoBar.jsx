import React from "react";

const logos = [
  "Logistics",
  "Legal Tech",
  "Healthcare",
  "Finance",
  "Agriculture",
  "E-commerce",
  "Manufacturing",
  "Education",
];

export default function LogoBar() {
  return (
    <section className="py-12 bg-white border-y border-black/[0.06] overflow-hidden">
      <p className="text-center font-mono text-[12px] tracking-[0.12em] uppercase text-text-muted mb-7">
        Industries we build for
      </p>
      <div className="relative overflow-hidden">
        <div className="flex animate-marquee w-max">
          {[...logos, ...logos].map((name, i) => (
            <span
              key={i}
              className="inline-block mx-12 font-display font-bold text-[22px] text-text-muted/30 select-none whitespace-nowrap"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
