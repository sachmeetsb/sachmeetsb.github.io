import React from "react";
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
} from "react-icons/hi";

const agents = [
  {
    stat: "98% QC accuracy",
    industry: "Manufacturing",
    subtitle: "Autonomous quality, predictive operations",
    icon: HiEye,
    before:
      "Manual QC, reactive maintenance and siloed production planning causing costly downtime",
    result: "98% defect-free output",
    after:
      "Agentic vision agents run 24/7 inspection loops with zero human intervention",
    accent: "saffron",
  },
  {
    stat: "10x throughput",
    industry: "Legal Services",
    subtitle: "AI agents that read, reason, and file",
    icon: HiScale,
    before:
      "Lawyers spending 60%+ of time on document review, notice drafting and compliance checks",
    result: "87% cost reduction",
    after:
      "Agents autonomously draft, review and file legal documents with explainable reasoning trails",
    accent: "indigo",
  },
  {
    stat: "99.3% classification accuracy",
    industry: "Customs Broking",
    subtitle: "End-to-end autonomous clearance",
    icon: HiGlobe,
    before:
      "Manual HS code classification, duty calculation and document preparation causing clearance delays",
    result: "72% faster clearance",
    after:
      "Agentic classifiers determine duty, prepare documentation and track shipments autonomously",
    accent: "teal",
  },
  {
    stat: "Real-time fraud detection",
    industry: "Financial Technology",
    subtitle: "Autonomous reconciliation and risk intelligence",
    icon: HiCurrencyDollar,
    before:
      "Finance teams spending days on reconciliation, with rule-based fraud detection missing novel patterns",
    result: "94% reduction in manual reconciliation",
    after:
      "Agents reconcile in real time, flag anomalies and generate audit-ready reports autonomously",
    accent: "saffron",
  },
  {
    stat: "60+ processes automated",
    industry: "Enterprise Management Transformation",
    subtitle: "Every process, made autonomous",
    icon: HiCog,
    before:
      "Complex cross-departmental workflows locked in legacy systems with fragmented data and slow decision cycles",
    result: "3.2x operational efficiency",
    after:
      "End-to-end process agents that understand context, orchestrate systems and self-improve over time",
    accent: "indigo",
  },
  {
    stat: "240% listing exposure increase",
    industry: "Real Estate Marketing",
    subtitle: "Autonomous listing exposure and lead generation",
    icon: HiHome,
    before:
      "Listings buried in portals with generic copy, low visibility and a slow manual follow-up pipeline losing warm buyers",
    result: "3.8x inbound lead uplift",
    after:
      "Agents auto-distribute listings, personalise outreach and maximise portal ranking - 24/7 without an agency retainer",
    accent: "teal",
  },
  {
    stat: "90% screening automation",
    industry: "HR Tech - First Hires",
    subtitle: "Agentic recruiting for early-stage teams",
    icon: HiUserGroup,
    before:
      "Founders spending weeks screening CVs and scheduling calls to make the first 10 critical hires with no dedicated HR",
    result: "74% faster time-to-hire",
    after:
      "Agents screen, score and shortlist candidates, draft offer letters and run onboarding flows end-to-end",
    accent: "saffron",
  },
  {
    stat: "Full migration documentation",
    industry: "Codebase Migration Assistant",
    subtitle: "Modernise your stack, eliminate technical debt",
    icon: HiCode,
    before:
      "Legacy codebases creating bottlenecks with outdated dependencies, poor documentation and mounting technical debt blocking product velocity",
    result: "80% technical debt reduction",
    after:
      "Agents audit, refactor and migrate entire codebases to modern stacks with complete documentation generated automatically at each step",
    accent: "indigo",
  },
  {
    stat: "92% task automation rate",
    industry: "VIP Assistance",
    subtitle: "An autonomous chief-of-staff for every executive",
    icon: HiStar,
    before:
      "Senior leaders losing 4-6 hours daily to calendar management, document filing and project status chasing",
    result: "5.5hrs/day reclaimed per exec",
    after:
      "Agents handle scheduling, file organisation, project dashboards and meeting prep - proactively, not on request",
    accent: "teal",
  },
];

const accentStyles = {
  saffron: {
    statBg: "bg-saffron/[0.1] text-saffron",
    resultText: "text-saffron",
    bar: "bg-saffron",
  },
  indigo: {
    statBg: "bg-indigo/[0.08] text-indigo-mid",
    resultText: "text-indigo-mid",
    bar: "bg-indigo-mid",
  },
  teal: {
    statBg: "bg-teal/[0.1] text-teal-deep",
    resultText: "text-teal-deep",
    bar: "bg-teal",
  },
};

export default function IndustrySolutions() {
  return (
    <section id="industry-solutions" className="pt-24 md:pt-32 pb-10 md:pb-14">
      <div className="max-w-container mx-auto px-8 lg:px-16">
        {/* Section header */}
        <div className="mb-16">
          <span className="inline-block bg-saffron text-white rounded-pill px-6 py-2 font-display font-bold text-[22px] mb-6">
            Industry Solutions
          </span>
          <h2
            className="font-display font-extrabold text-[36px] md:text-[48px] text-text-dark leading-tight max-w-2xl mb-5"
            style={{ letterSpacing: "-1px" }}
          >
            Agentic AI across{" "}
            <span className="autonomous-gradient">every vertical</span>
          </h2>
          <p className="text-text-muted text-[18px] max-w-2xl leading-relaxed">
            Purpose-built autonomous agents for India's most complex industries
            - each delivering measurable, explainable outcomes from day one.
          </p>
        </div>

        {/* Agent cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {agents.map((agent, i) => {
            const style = accentStyles[agent.accent];
            return (
              <div
                key={i}
                className="border border-black/[0.07] rounded-card bg-white p-9 flex flex-col hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
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
                <h3 className="font-display font-bold text-[22px] text-text-dark mb-1 leading-tight">
                  {agent.industry}
                </h3>

                {/* Subtitle */}
                <p className="font-display font-medium text-[14px] text-text-muted mb-6">
                  {agent.subtitle}
                </p>

                {/* Before */}
                <div className="mb-5">
                  <span className="font-mono text-[10px] tracking-[0.12em] uppercase text-text-muted/60 block mb-2">
                    Before
                  </span>
                  <p className="text-text-muted text-[14px] leading-relaxed">
                    {agent.before}
                  </p>
                </div>

                {/* Divider */}
                <div className={`h-[2px] ${style.bar} rounded-full mb-5 w-12`} />

                {/* After */}
                <div>
                  <span className="font-mono text-[10px] tracking-[0.12em] uppercase text-text-muted/60 block mb-2">
                    After Kartar AI
                  </span>
                  <p
                    className={`font-display font-bold text-[18px] mb-2 ${style.resultText}`}
                  >
                    {agent.result}
                  </p>
                  <p className="text-text-body text-[14px] leading-relaxed">
                    {agent.after}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
