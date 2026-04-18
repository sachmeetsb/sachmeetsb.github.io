import React, { useState } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

const testimonials = [
  {
    quote:
      "They didn't just build us an AI tool -they understood our workflow first. The agent handles 70% of our triage now. We didn't expect it to work this fast.",
    name: "Client Name",
    role: "CTO, Fintech Startup",
  },
  {
    quote:
      "Most vendors showed us slide decks. Kartar showed us a working prototype in the first meeting. That's when we knew they were different.",
    name: "Client Name",
    role: "Operations Head, Logistics Co.",
  },
  {
    quote:
      "Honest about what AI can and can't do. They actually scoped our project down because the original ask didn't need AI. Saved us months.",
    name: "Client Name",
    role: "Founder, Legal Tech Startup",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  const prev = () =>
    setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  const next = () =>
    setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));

  return (
    <section
      className="py-24 md:py-32"
      style={{
        background: "linear-gradient(135deg, #2D1B69 0%, #4A2F9A 100%)",
      }}
    >
      <div className="max-w-container mx-auto px-8 lg:px-16">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-center gap-5 md:gap-12 mb-16">
          <span className="inline-block self-start bg-saffron text-white rounded-pill px-6 py-2 font-display font-bold text-[22px] whitespace-nowrap">
            Testimonials
          </span>
          <p className="text-white/[0.5] text-[18px] max-w-2xl leading-relaxed">
            From the people who've shipped with us.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div className="max-w-4xl mx-auto text-center">
            {/* Quote */}
            <div className="relative mb-12">
              <span className="text-saffron text-[56px] font-display font-bold leading-none absolute -top-4 -left-4 md:-left-10 select-none">
                &ldquo;
              </span>
              <p className="text-white text-[24px] md:text-[30px] font-display font-medium leading-relaxed px-8">
                {testimonials[current].quote}
              </p>
              <span className="text-saffron text-[56px] font-display font-bold leading-none absolute -bottom-8 -right-4 md:-right-10 select-none">
                &rdquo;
              </span>
            </div>

            {/* Attribution */}
            <p className="font-display font-bold text-[18px] text-white mb-1">
              {testimonials[current].name}
            </p>
            <p className="font-mono text-[12px] tracking-[0.08em] uppercase text-white/[0.4]">
              {testimonials[current].role}
            </p>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-5 mt-12">
            <button
              onClick={prev}
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
            >
              <HiChevronLeft size={22} />
            </button>

            {/* Dots */}
            <div className="flex gap-2.5">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    i === current ? "bg-saffron" : "bg-white/20"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
            >
              <HiChevronRight size={22} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
