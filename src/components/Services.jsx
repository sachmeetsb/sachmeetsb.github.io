import React from "react";
import { HiArrowRight } from "react-icons/hi";

const services = [
  {
    title: "Agentic AI Workflows",
    description:
      "AI agents that triage, route, draft, and escalate inside your existing tools. Not chatbots. Actual workers.",
    bg: "light",
  },
  {
    title: "Vertical SaaS Products",
    description:
      "AI-native software for industries that haven't been touched -logistics, legal, healthcare, agri, finance. Built ground-up for how India actually works.",
    bg: "indigo",
  },
  {
    title: "AI Strategy & Scoping",
    description:
      'We\'ll tell you where AI fits and where it doesn\'t. If the right answer is "fix the process first," we\'ll say that before we take your money.',
    bg: "saffron",
  },
];

const bgStyles = {
  light: {
    card: "bg-white border border-black/[0.07]",
    title: "text-text-dark",
    desc: "text-text-muted",
    arrow: "text-text-dark",
  },
  indigo: {
    card: "bg-gradient-to-br from-indigo to-indigo-mid",
    title: "text-white",
    desc: "text-white/[0.78]",
    arrow: "text-white",
  },
  saffron: {
    card: "bg-gradient-to-br from-saffron to-saffron-light",
    title: "text-white",
    desc: "text-white/[0.78]",
    arrow: "text-white",
  },
};

export default function Services() {
  return (
    <section id="services" className="pt-24 md:pt-32 pb-10 md:pb-14">
      <div className="max-w-container mx-auto px-8 lg:px-16">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-center gap-5 md:gap-12 mb-14">
          <span className="inline-block self-start bg-saffron text-white rounded-pill px-6 py-2 font-display font-bold text-[22px] whitespace-nowrap">
            Services
          </span>
          <p className="text-text-muted text-[18px] max-w-2xl leading-relaxed">
            Here's what we actually build. Agentic workflows, vertical products,
            and AI systems designed for how your business actually runs -not how
            a slide deck says it should.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, i) => {
            const style = bgStyles[service.bg];
            return (
              <div
                key={i}
                className={`${style.card} rounded-card p-10 flex flex-col justify-between min-h-[300px] transition-all duration-200 hover:shadow-lg hover:-translate-y-1`}
              >
                <div>
                  <h3
                    className={`font-display font-bold text-[24px] mb-4 ${style.title}`}
                  >
                    {service.title}
                  </h3>
                  <p className={`text-[16px] leading-relaxed ${style.desc}`}>
                    {service.description}
                  </p>
                </div>
                <div className="mt-8">
                  <a
                    href="#contact"
                    className={`inline-flex items-center gap-2 font-display font-semibold text-[16px] ${style.arrow} hover:gap-3 transition-all`}
                  >
                    Learn more <HiArrowRight />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
