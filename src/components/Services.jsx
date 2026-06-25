import React from "react";
import { HiArrowRight } from "react-icons/hi";
import Section, { SectionHeader } from "./motion/Section";
import SpotlightCard from "./motion/SpotlightCard";
import StickyStack from "./motion/StickyStack";

const services = [
  {
    title: "Agentic AI Workflows",
    description:
      "AI agents that triage, route, draft, and escalate inside your existing tools. Not chatbots. Actual workers.",
    variant: "glass",
  },
  {
    title: "Vertical SaaS Products",
    description:
      "AI-native software for industries that haven't been touched -logistics, legal, healthcare, agri, finance. Built ground-up for how India actually works.",
    variant: "indigo",
  },
  {
    title: "AI Strategy & Scoping",
    description:
      'We\'ll tell you where AI fits and where it doesn\'t. If the right answer is "fix the process first," we\'ll say that before we take your money.',
    variant: "saffron",
  },
];

const variantStyles = {
  glass: {
    card: "",
    glow: "rgba(255,94,14,0.18)",
    title: "text-white",
    desc: "text-white/60",
    arrow: "text-saffron",
    beam: true,
  },
  indigo: {
    card: "!bg-gradient-to-br !from-indigo !to-indigo-mid !border-white/10",
    glow: "rgba(255,255,255,0.12)",
    title: "text-white",
    desc: "text-white/80",
    arrow: "text-white",
    beam: false,
  },
  saffron: {
    card: "!bg-gradient-to-br !from-saffron !to-saffron-light !border-white/20",
    glow: "rgba(255,255,255,0.18)",
    title: "text-white",
    desc: "text-white/85",
    arrow: "text-white",
    beam: false,
  },
};

export default function Services() {
  return (
    <Section id="services" className="pt-12 md:pt-16 pb-0">
      <SectionHeader label="Services">
        Here's what we actually build. Agentic workflows, vertical products, and
        AI systems designed for how your business actually runs -not how a slide
        deck says it should.
      </SectionHeader>

      <StickyStack className="max-w-3xl mx-auto" gap="9vh" topStep={12}>
        {services.map((service, i) => {
          const s = variantStyles[service.variant];
          return (
            <SpotlightCard
              key={i}
              beam={s.beam}
              glowColor={s.glow}
              className={`${s.card} p-7 md:p-9 flex flex-col justify-between min-h-[220px]`}
            >
              <div>
                <span className="font-mono text-[12px] tracking-[0.14em] uppercase text-white/40 mb-4 block">
                  {String(i + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}
                </span>
                <h3
                  className={`font-display font-bold text-[26px] md:text-[32px] mb-3 ${s.title}`}
                >
                  {service.title}
                </h3>
                <p className={`text-[16px] leading-relaxed ${s.desc}`}>
                  {service.description}
                </p>
              </div>
              <div className="mt-6">
                <a
                  href="#contact"
                  className={`inline-flex items-center gap-2 font-display font-semibold text-[16px] ${s.arrow} hover:gap-3 transition-all`}
                >
                  Learn more <HiArrowRight />
                </a>
              </div>
            </SpotlightCard>
          );
        })}
      </StickyStack>
    </Section>
  );
}
