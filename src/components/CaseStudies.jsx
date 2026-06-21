import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { HiArrowRight } from "react-icons/hi";
import Section from "./motion/Section";
import SpotlightCard from "./motion/SpotlightCard";
import { useReducedMotion } from "../lib/useReducedMotion";
import { DURATION, EASE_OUT, VIEWPORT } from "../lib/motion";

const caseStudies = [
  {
    title: "First-Contact Agentic Legal Document Generator",
    description:
      "An agentic system that researches jurisdiction-specific laws in real time, identifies relevant statutes and precedents, and drafts a first letter of conflict -ready for attorney review. What used to take a junior associate 4-6 hours now takes under 10 minutes.",
    agents:
      "Jurisdiction lookup, statute extraction, conflict analysis, letter drafting, citation formatting.",
  },
  {
    title: "Local Agentic AI-Based Data Analyst for SMEs",
    description:
      "A self-serve AI analyst built for small and mid-size businesses that don't have a data team. Connects to existing tools -Tally, spreadsheets, POS systems -and answers business questions in plain language. Revenue trends, inventory gaps, customer patterns -without hiring an analyst or learning a dashboard.",
    agents:
      "Data ingestion, natural language querying, trend analysis, automated reporting, anomaly alerts.",
  },
];

/**
 * One case-study card: a continuous scroll-parallax drift (outer) wrapping a
 * one-shot reveal (inner: fade + lift + settle). The two y's live on separate
 * elements so the parallax motion value and the reveal tween don't fight.
 */
function CaseStudyCard({ study, index, total }) {
  const reduced = useReducedMotion();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // Subtle, intentional drift — later cards travel a touch more for depth.
  const drift = 48 + index * 22;
  const y = useTransform(scrollYProgress, [0, 1], [drift, -drift]);

  return (
    <motion.div ref={ref} style={reduced ? undefined : { y }}>
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 56, scale: 0.97 }}
        whileInView={reduced ? undefined : { opacity: 1, y: 0, scale: 1 }}
        viewport={VIEWPORT}
        transition={{
          duration: DURATION.slow,
          ease: EASE_OUT,
          delay: index * 0.12,
        }}
      >
        <SpotlightCard
          beam={index === 0}
          className="p-9 md:p-12 flex flex-col justify-between"
        >
          <div>
            <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-saffron mb-5 block">
              {String(index + 1).padStart(2, "0")} /{" "}
              {String(total).padStart(2, "0")}
            </span>
            <h3 className="font-display font-bold text-[24px] md:text-[26px] text-white mb-5 leading-tight">
              {study.title}
            </h3>
            <p className="text-white/60 text-[16px] leading-relaxed mb-7">
              {study.description}
            </p>
            <div className="mb-8 pt-6 border-t border-white/10">
              <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-saffron mb-2 block">
                Agents handle
              </span>
              <p className="text-white/45 text-[15px] leading-relaxed">
                {study.agents}
              </p>
            </div>
          </div>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 font-display font-semibold text-[16px] text-saffron hover:text-saffron-light hover:gap-3 transition-all"
          >
            Read the full case study <HiArrowRight />
          </a>
        </SpotlightCard>
      </motion.div>
    </motion.div>
  );
}

export default function CaseStudies() {
  const reduced = useReducedMotion();

  return (
    <Section
      id="case-studies"
      className="bg-gradient-to-br from-[#0F0A1E] via-[#1E1535] to-[#0F0A1E] py-28 md:py-36 overflow-hidden"
      glow={{
        className: "left-1/2 top-1/3 -translate-x-1/2",
        style: {
          background:
            "radial-gradient(600px circle at center, rgba(255,94,14,0.10), transparent 70%)",
        },
      }}
      innerClassName="grid lg:grid-cols-[0.82fr_1.18fr] gap-14 lg:gap-24"
    >
      {/* Intro — sticks alongside the cards on desktop */}
      <motion.div
        className="lg:sticky lg:top-32 lg:self-start"
        initial={reduced ? false : { opacity: 0, y: 28 }}
        whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
        viewport={VIEWPORT}
        transition={{ duration: DURATION.base, ease: EASE_OUT }}
      >
        <span className="inline-block bg-saffron text-white rounded-pill px-6 py-2 font-display font-bold text-[22px] mb-6 shadow-glow-saffron">
          Case Studies
        </span>
        <h2 className="font-display font-extrabold text-white text-[clamp(30px,3.5vw,48px)] leading-tight mb-5">
          Projects we've built.{" "}
          <span className="autonomous-gradient">Problems we've solved.</span>
        </h2>
        <p className="text-white/50 text-[17px] leading-relaxed max-w-md">
          Real agentic systems we shipped — each one quietly replacing hours of
          manual work.
        </p>
      </motion.div>

      {/* Cards */}
      <div className="flex flex-col gap-8 md:gap-10">
        {caseStudies.map((study, i) => (
          <CaseStudyCard
            key={i}
            study={study}
            index={i}
            total={caseStudies.length}
          />
        ))}
      </div>
    </Section>
  );
}
