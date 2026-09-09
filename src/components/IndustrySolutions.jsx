import React, { useRef, useState, useEffect, useCallback } from "react";
import {
  HiEye,
  HiScale,
  HiGlobe,
  HiCurrencyDollar,
  HiCog,
  HiHome,
  HiUserGroup,
  HiCode,
  HiStar,
  HiChevronLeft,
  HiChevronRight,
} from "react-icons/hi";
import Section from "./motion/Section";
import Reveal from "./motion/Reveal";
import SpotlightCard from "./motion/SpotlightCard";

const agents = [
  {stat:"Visual inspection",industry:"Manufacturing",subtitle:"Review-assisted quality checks",icon:HiEye,before:"Inspection records and production data spread across tools.",result:"Flag defects for review",after:"Explore image-based checks, trace flagged examples and route uncertain cases to an operator. Agree evaluation data before a pilot.",accent:"saffron"},
  {stat:"Document workflows",industry:"Legal Services",subtitle:"Preparation with professional oversight",icon:HiScale,before:"Time spent finding relevant documents and preparing first drafts.",result:"Support the lawyer’s review",after:"Organise documents and prepare draft material with source references. A qualified lawyer reviews advice and approves any filing.",accent:"indigo"},
  {stat:"Classification support",industry:"Customs Broking",subtitle:"Evidence for a broker’s decision",icon:HiGlobe,before:"Product details, tariff references and supporting documents need to be checked together.",result:"Prepare a reviewable case",after:"Explore suggested classifications and document checks. A broker verifies codes, duties and submissions against current requirements.",accent:"teal"},
  {stat:"Reconciliation support",industry:"Financial Technology",subtitle:"Make exceptions easier to inspect",icon:HiCurrencyDollar,before:"Transactions and supporting records need manual comparison.",result:"Surface unmatched records",after:"Explore matching rules and exception queues with an audit trail. Finance staff approve adjustments and reporting.",accent:"saffron"},
  {stat:"Connected workflows",industry:"Enterprise Operations",subtitle:"Connect tools with clear approval points",icon:HiCog,before:"Teams re-enter information and chase approvals across disconnected systems.",result:"Reduce repetitive handoffs",after:"Map a specific workflow, integrate the relevant tools and keep owners in control of consequential actions.",accent:"indigo"},
  {stat:"Property experiences",industry:"Real Estate",subtitle:"Help people explore a space",icon:HiHome,before:"Static material can make layouts and spatial decisions difficult to understand.",result:"Walk through a proposal",after:"Use architectural walkthroughs and structured enquiries to support discussions with buyers, designers and project teams.",accent:"teal"},
  {stat:"Hiring coordination",industry:"HR Tech",subtitle:"Organise applications and interviews",icon:HiUserGroup,before:"Small teams coordinate candidate information and interviews manually.",result:"Support human hiring decisions",after:"Explore application organisation, interview scheduling and preparation. People set criteria and make selection decisions.",accent:"saffron"},
  {stat:"Codebase review",industry:"Codebase Migration",subtitle:"Plan and test a modernisation",icon:HiCode,before:"Legacy dependencies, missing tests and incomplete documentation complicate changes.",result:"Migrate in verifiable steps",after:"Audit dependencies, document risks and propose staged changes. Validate behavior and rollback options before release.",accent:"indigo"},
  {stat:"Meeting preparation",industry:"Executive Assistance",subtitle:"A clearer view of commitments",icon:HiStar,before:"Meeting context and follow-up tasks are scattered across tools.",result:"Prepare useful briefs",after:"Explore agenda preparation and follow-up tracking. Calendar changes and external messages require the owner’s approval.",accent:"teal"},
];

const accentStyles = {
  saffron: {
    statBg: "bg-saffron/[0.15] text-saffron-core",
    resultText: "text-saffron-core",
    bar: "bg-saffron",
    glow: "rgba(255,94,14,0.18)",
  },
  indigo: {
    statBg: "bg-indigo-mid/[0.35] text-[#b9a8ff]",
    resultText: "text-[#b9a8ff]",
    bar: "bg-[#7c5cff]",
    glow: "rgba(124,92,255,0.2)",
  },
  teal: {
    statBg: "bg-teal/[0.15] text-teal",
    resultText: "text-teal",
    bar: "bg-teal",
    glow: "rgba(0,191,165,0.18)",
  },
};

export default function IndustrySolutions() {
  const trackRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const updateState = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 0);
    setAtStart(el.scrollLeft <= 2);
    setAtEnd(el.scrollLeft >= max - 2);
  }, []);

  useEffect(() => {
    updateState();
    window.addEventListener("resize", updateState);
    return () => window.removeEventListener("resize", updateState);
  }, [updateState]);

  const scrollByCard = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    // one card width + the flex gap (28px ≈ gap-7)
    const card = el.querySelector("[data-card]");
    const step = card ? card.offsetWidth + 28 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <Section
      id="industry-solutions"
      className="pt-24 md:pt-32 pb-10 md:pb-14"
      glow={{
        className: "w-[40rem] h-[40rem] -right-40 top-20 opacity-30",
        style: { background: "rgba(74,47,154,0.5)" },
      }}
    >
      {/* Section header */}
      <Reveal className="mb-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div>
            <span className="inline-block bg-saffron text-white rounded-pill px-6 py-2 font-display font-bold text-[22px] mb-4 shadow-glow-saffron">
              Industry Solutions
            </span>
            <span className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.1em] uppercase text-saffron-core/85 border border-saffron-core/30 bg-saffron/[0.06] rounded-pill px-3 py-1 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-saffron-core" />
              Workflow ideas — not measured results
            </span>
            <h2
              className="font-display font-extrabold text-[36px] md:text-[48px] text-white leading-tight max-w-2xl mb-5"
              style={{ letterSpacing: "-1px" }}
            >
              Agentic AI across{" "}
              <span className="autonomous-gradient">every vertical</span>
            </h2>
            <p className="text-white/50 text-[18px] max-w-2xl leading-relaxed">
              Examples of workflows we can explore together. Scope, evaluation and human review are agreed for each project; these are not customer results.
            </p>
          </div>

          {/* Carousel arrows */}
          <div className="hidden md:flex items-center gap-3 flex-shrink-0">
            <button
              onClick={() => scrollByCard(-1)}
              disabled={atStart}
              aria-label="Previous"
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white transition-all hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <HiChevronLeft size={22} />
            </button>
            <button
              onClick={() => scrollByCard(1)}
              disabled={atEnd}
              aria-label="Next"
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white transition-all hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <HiChevronRight size={22} />
            </button>
          </div>
        </div>
      </Reveal>

      {/* Agent cards carousel */}
      <div
        ref={trackRef}
        onScroll={updateState}
        className="flex gap-7 overflow-x-auto snap-x snap-mandatory pb-2 -mx-8 px-8 lg:-mx-16 lg:px-16 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {agents.map((agent, i) => {
          const style = accentStyles[agent.accent];
          return (
            <div
              key={i}
              data-card
              className="snap-start flex-shrink-0 w-[85vw] sm:w-[360px]"
            >
              <SpotlightCard
                glowColor={style.glow}
                className="p-9 flex flex-col h-full"
              >
                {/* Icon + Stat row */}
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${style.statBg}`}
                  >
                    <agent.icon className="w-5 h-5" />
                  </div>
                  <span
                    className={`font-mono text-[11px] tracking-[0.06em] uppercase font-medium px-3 py-1.5 rounded-pill ${style.statBg}`}
                  >
                    {agent.stat}
                  </span>
                </div>

                {/* Industry name */}
                <h3 className="font-display font-bold text-[22px] text-white mb-1 leading-tight">
                  {agent.industry}
                </h3>

                {/* Subtitle */}
                <p className="font-display font-medium text-[14px] text-white/45 mb-6">
                  {agent.subtitle}
                </p>

                {/* Before */}
                <div className="mb-5">
                  <span className="font-mono text-[10px] tracking-[0.12em] uppercase text-white/35 block mb-2">
                    Before
                  </span>
                  <p className="text-white/50 text-[14px] leading-relaxed">
                    {agent.before}
                  </p>
                </div>

                {/* Divider */}
                <div className={`h-[2px] ${style.bar} rounded-full mb-5 w-12`} />

                {/* After */}
                <div>
                  <span className="font-mono text-[10px] tracking-[0.12em] uppercase text-white/35 block mb-2">
                    Proposed workflow
                  </span>
                  <p
                    className={`font-display font-bold text-[18px] mb-2 ${style.resultText}`}
                  >
                    {agent.result}
                  </p>
                  <p className="text-white/65 text-[14px] leading-relaxed">
                    {agent.after}
                  </p>
                </div>
              </SpotlightCard>
            </div>
          );
        })}
      </div>

      {/* Progress bar */}
      <div className="mt-8 h-[3px] w-full max-w-xs mx-auto rounded-full bg-white/10 overflow-hidden">
        <div
          className="h-full rounded-full bg-saffron transition-[width] duration-150"
          style={{ width: `${Math.max(12, progress * 100)}%` }}
        />
      </div>
    </Section>
  );
}
