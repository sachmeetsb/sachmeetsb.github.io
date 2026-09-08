import React from "react";
import Section, { SectionHeader } from "./motion/Section";
import { Stagger, StaggerItem } from "./motion/Reveal";

const ROLE_STYLES = {
  Founder: {
    badge: "bg-red-500/15 text-red-300 border-red-500/30",
    ring: "ring-red-500/40",
    accent: "from-red-500/25 to-transparent",
  },
  "Project Partner": {
    badge: "bg-orange-500/15 text-orange-300 border-orange-500/30",
    ring: "ring-orange-500/40",
    accent: "from-orange-500/25 to-transparent",
  },
};

const people = [
  {
    name: "Sachmeet Singh Bhatia",
    category: "Founder",
    label: "Founder & AI Engineer",
    initials: "SB",
    description:
      "Builds AI-native products and agentic workflows end to end, from research and prototypes through production systems.",
  },
  {
    name: "Bhupendra Bhatore",
    category: "Project Partner",
    label: "Project Partner - Khoj",
    initials: "BB",
    description:
      "Brings education-sector experience in Indore to Khoj's learning work.",
  },
  {
    name: "Swetank Vaidya",
    category: "Project Partner",
    label: "Project Partner - Kartar Hardware",
    initials: "SV",
    description:
      "Five years of experience in EV charging infrastructure.",
  },
  {
    name: "Vikas Kumar",
    category: "Project Partner",
    label: "Project Partner - VR Architecture",
    initials: "VK",
    description:
      "Delhi-based architect and project partner for VR Architecture.",
  },
  {
    name: "Manas Joshi",
    category: "Project Partner",
    label: "Project Partner - VR Architecture",
    initials: "MJ",
    description:
      "Ahmedabad-based 3D developer and project partner for VR Architecture.",
  },
];

function PersonCard({ person }) {
  const style = ROLE_STYLES[person.category];

  return (
    <article className="group relative h-full overflow-hidden rounded-card border border-white/10 bg-white/[0.04] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-card-dark">
      <div
        className={`pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b ${style.accent}`}
      />

      <div className="relative flex h-full flex-col p-8">
        <div
          className={`mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-surface-mid font-display text-[18px] font-bold text-white ring-4 ${style.ring}`}
          aria-hidden="true"
        >
          {person.initials}
        </div>

        <h3 className="mb-3 font-display text-[22px] font-bold leading-tight text-white">
          {person.name}
        </h3>

        <span
          className={`mb-6 inline-block w-fit rounded-pill border px-3 py-1 font-mono text-[11px] uppercase tracking-[0.06em] ${style.badge}`}
        >
          {person.label}
        </span>

        <p className="text-[16px] leading-relaxed text-white/[0.58]">
          {person.description}
        </p>
      </div>
    </article>
  );
}

export default function Team() {
  return (
    <Section id="team" className="py-24 md:py-32">
      <SectionHeader label="About Kartar">
        Kartar is an independent AI studio led by Sachmeet Singh Bhatia, working
        with focused project partners where deep domain expertise matters.
      </SectionHeader>

      <Stagger
        stagger={0.05}
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {people.map((person) => (
          <StaggerItem key={person.name} className="h-full">
            <PersonCard person={person} />
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
