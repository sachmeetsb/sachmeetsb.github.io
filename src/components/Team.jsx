import React, { useState } from "react";
import { FaLinkedin } from "react-icons/fa";
import Section, { SectionHeader } from "./motion/Section";
import { Stagger, StaggerItem } from "./motion/Reveal";

const ROLE_STYLES = {
  Founder: {
    badge: "bg-saffron/15 text-saffron-core border-saffron/30",
    ring: "ring-saffron/40",
    accent: "from-saffron/25 to-transparent",
  },
  Builder: {
    badge: "bg-blue-500/15 text-blue-300 border-blue-500/30",
    ring: "ring-blue-500/40",
    accent: "from-blue-500/25 to-transparent",
  },
  Patron: {
    badge: "bg-orange-500/15 text-orange-300 border-orange-500/30",
    ring: "ring-orange-500/40",
    accent: "from-orange-500/25 to-transparent",
  },
  "Domain Expert": {
    badge: "bg-purple-500/15 text-purple-300 border-purple-500/30",
    ring: "ring-purple-500/40",
    accent: "from-purple-500/25 to-transparent",
  },
  "Technical Expert": {
    badge: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
    ring: "ring-emerald-500/40",
    accent: "from-emerald-500/25 to-transparent",
  },
  Research: {
    badge: "bg-cyan-500/15 text-cyan-300 border-cyan-500/30",
    ring: "ring-cyan-500/40",
    accent: "from-cyan-500/25 to-transparent",
  },
  SRE: {
    badge: "bg-rose-500/15 text-rose-300 border-rose-500/30",
    ring: "ring-rose-500/40",
    accent: "from-rose-500/25 to-transparent",
  },
};

// Order: Founder → Builders → Patrons → Domain Experts → Technical Experts → Research → SREs
const team = [
  {
    name: "Sachmeet Singh Bhatia",
    category: "Founder",
    specialty: "Founder & Builder",
    slug: "sachmeet-singh-bhatia",
    linkedin: "https://www.linkedin.com/in/sachmeet/",
  },
  {
    name: "Priyank Verma",
    category: "Builder",
    slug: "priyank-verma",
    linkedin: "https://www.linkedin.com/in/heypriyank/",
  },
  {
    name: "Astha Porwal",
    category: "Builder",
    slug: "astha-porwal",
    linkedin: "https://www.linkedin.com/in/astha-porwal-899679132/",
  },
  {
    name: "Shovan Mohapatra",
    category: "Builder",
    slug: "shovan-mohapatra",
    linkedin: "https://www.linkedin.com/in/shovan-mohapatra-03/",
  },
  {
    name: "Karuna Patil",
    category: "Builder",
    slug: "karuna-patil",
    linkedin: "https://www.linkedin.com/in/karuna-patil20/",
  },
  {
    name: "Abhimanyu Kaundal",
    category: "Patron",
    slug: "abhimanyu-kaundal",
    linkedin: "https://www.linkedin.com/in/abhimanyukaundal/",
  },
  {
    name: "Anshul Bharti",
    category: "Patron",
    slug: "anshul-bharti",
    linkedin: "https://www.linkedin.com/in/anshul-bharti-97528b185/",
  },
  {
    name: "Akansha Sarkar",
    category: "Patron",
    slug: "akansha-sarkar",
    linkedin: "https://www.linkedin.com/in/akansha-sarkar-86b822173/",
  },
  {
    name: "Aditya Gupta",
    category: "Domain Expert",
    specialty: "Operations",
    slug: "aditya-gupta",
    linkedin: "https://www.linkedin.com/in/aditya-g98/",
  },
  {
    name: "Rishi Mehta",
    category: "Domain Expert",
    specialty: "Logistics & Customs",
    slug: "rishi-mehta",
    linkedin: "https://www.linkedin.com/in/rishi-mehta18/",
  },
  {
    name: "Rakshit Baveja",
    category: "Domain Expert",
    specialty: "Cryptocurrency",
    slug: "rakshit-baveja",
    linkedin: "https://www.linkedin.com/in/rakshit-baveja-8a32861b1/",
  },
  {
    name: "Poonam Pandey",
    category: "Technical Expert",
    specialty: "Software Engineering",
    slug: "poonam-pandey",
    linkedin: "https://www.linkedin.com/in/poonam-pandey-3a5509180/",
  },
  {
    name: "Shubh Bharadwaj",
    category: "Technical Expert",
    specialty: "Low Level Design",
    slug: "shubh-bharadwaj",
    linkedin: "https://www.linkedin.com/in/shubh-bhardwaj-207b1517b/",
  },
  {
    name: "Shubhankar Anuragi",
    category: "Technical Expert",
    specialty: "Cybersecurity",
    slug: "shubhankar-anuragi",
    linkedin: "https://www.linkedin.com/in/shubhankaranuragi/",
  },
  {
    name: "Rahul Tiwari",
    category: "Research",
    specialty: "AI Safety",
    slug: "rahul-tiwari",
    linkedin: "https://www.linkedin.com/in/ba11b0y/",
  },
  {
    name: "Sakshi Joshi",
    category: "Research",
    specialty: "Voice AI & Local AI",
    slug: "sakshi-joshi",
    linkedin: "https://www.linkedin.com/in/joshisakshi/",
  },
  {
    name: "Nipun Katyal",
    category: "Research",
    specialty: "Context Engineering",
    slug: "nipun-katyal",
    linkedin: "https://www.linkedin.com/in/nipun-katyal/",
  },
  {
    name: "Yugpratap Singh Pawar",
    category: "SRE",
    slug: "yugpratap-singh-pawar",
    linkedin: "https://www.linkedin.com/in/yugpratap-singh-pawar/",
  },
];

// A hand-picked emoji per person, used as the avatar fallback when a photo
// isn't available — themed loosely to each person's role/specialty.
const EMOJI = {
  "sachmeet-singh-bhatia": "🚀",
  "priyank-verma": "⚡",
  "astha-porwal": "🛠️",
  "shovan-mohapatra": "🧩",
  "karuna-patil": "🎨",
  "abhimanyu-kaundal": "🌟",
  "anshul-bharti": "🔭",
  "akansha-sarkar": "💎",
  "aditya-gupta": "⚙️",
  "rishi-mehta": "🚢",
  "rakshit-baveja": "🪙",
  "poonam-pandey": "💻",
  "shubh-bharadwaj": "🏗️",
  "shubhankar-anuragi": "🛡️",
  "rahul-tiwari": "🧪",
  "sakshi-joshi": "🎙️",
  "nipun-katyal": "🧠",
  "yugpratap-singh-pawar": "🔧",
};

function TeamCard({ member }) {
  const style = ROLE_STYLES[member.category] || ROLE_STYLES.Builder;
  const [imgFailed, setImgFailed] = useState(false);
  const roleLabel = member.specialty
    ? `${member.category} — ${member.specialty}`
    : member.category;

  return (
    <div className="group relative h-full border border-white/10 rounded-card bg-white/[0.04] backdrop-blur-sm hover:border-white/20 hover:shadow-card-dark hover:-translate-y-1 transition-all duration-300 overflow-hidden">
      {/* Color accent gradient at top */}
      <div
        className={`absolute inset-x-0 top-0 h-24 bg-gradient-to-b ${style.accent} pointer-events-none`}
      />

      <div className="relative p-8 flex flex-col items-center text-center">
        {/* Avatar */}
        <div
          className={`w-[110px] h-[110px] rounded-full bg-surface-mid ring-4 ${style.ring} flex items-center justify-center mb-5 overflow-hidden shadow-md`}
        >
          {!imgFailed ? (
            <img
              src={`/team/${member.slug}.jpg`}
              alt={member.name}
              className="w-full h-full object-cover"
              onError={() => setImgFailed(true)}
            />
          ) : (
            <span className="text-[44px] leading-none" role="img" aria-label={member.name}>
              {EMOJI[member.slug] || "✨"}
            </span>
          )}
        </div>

        {/* Name */}
        <h3 className="font-display font-bold text-[20px] text-white mb-3 leading-tight">
          {member.name}
        </h3>

        {/* Role badge */}
        <span
          className={`inline-block border ${style.badge} rounded-pill px-3 py-1 font-mono text-[11px] tracking-[0.06em] uppercase mb-6`}
        >
          {roleLabel}
        </span>

        {/* LinkedIn */}
        <a
          href={member.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${member.name} on LinkedIn`}
          className="inline-flex items-center gap-2 text-white/50 hover:text-[#4aa3ff] transition-colors"
        >
          <FaLinkedin size={22} />
          <span className="font-mono text-[12px] tracking-[0.08em] uppercase">
            LinkedIn
          </span>
        </a>
      </div>
    </div>
  );
}

export default function Team() {
  return (
    <Section id="team" className="py-24 md:py-32">
      <SectionHeader label="Team">
        Small, intentional, no sales layer. When you work with Kartar AI, you
        work with the people who write the code.
      </SectionHeader>

      {/* Team grid */}
      <Stagger
        stagger={0.05}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        {team.map((member) => (
          <StaggerItem key={member.slug} className="h-full">
            <TeamCard member={member} />
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
