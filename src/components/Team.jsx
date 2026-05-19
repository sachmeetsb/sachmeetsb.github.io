import React, { useState } from "react";
import { FaLinkedin } from "react-icons/fa";

const ROLE_STYLES = {
  Founder: {
    badge: "bg-saffron/15 text-saffron border-saffron/30",
    ring: "ring-saffron/40",
    accent: "from-saffron/20 to-saffron/5",
  },
  Builder: {
    badge: "bg-blue-500/15 text-blue-700 border-blue-500/30",
    ring: "ring-blue-500/40",
    accent: "from-blue-500/20 to-blue-500/5",
  },
  Patron: {
    badge: "bg-orange-500/15 text-orange-700 border-orange-500/30",
    ring: "ring-orange-500/40",
    accent: "from-orange-500/20 to-orange-500/5",
  },
  "Domain Expert": {
    badge: "bg-purple-500/15 text-purple-700 border-purple-500/30",
    ring: "ring-purple-500/40",
    accent: "from-purple-500/20 to-purple-500/5",
  },
  "Technical Expert": {
    badge: "bg-emerald-500/15 text-emerald-700 border-emerald-500/30",
    ring: "ring-emerald-500/40",
    accent: "from-emerald-500/20 to-emerald-500/5",
  },
  Research: {
    badge: "bg-cyan-500/15 text-cyan-700 border-cyan-500/30",
    ring: "ring-cyan-500/40",
    accent: "from-cyan-500/20 to-cyan-500/5",
  },
  SRE: {
    badge: "bg-rose-500/15 text-rose-700 border-rose-500/30",
    ring: "ring-rose-500/40",
    accent: "from-rose-500/20 to-rose-500/5",
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

function initials(name) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

function TeamCard({ member }) {
  const style = ROLE_STYLES[member.category] || ROLE_STYLES.Builder;
  const [imgFailed, setImgFailed] = useState(false);
  const roleLabel = member.specialty
    ? `${member.category} — ${member.specialty}`
    : member.category;

  return (
    <div className="group relative border border-black/[0.07] rounded-card bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-200 overflow-hidden">
      {/* Color accent gradient at top */}
      <div
        className={`absolute inset-x-0 top-0 h-24 bg-gradient-to-b ${style.accent} pointer-events-none`}
      />

      <div className="relative p-8 flex flex-col items-center text-center">
        {/* Avatar */}
        <div
          className={`w-[110px] h-[110px] rounded-full bg-white ring-4 ${style.ring} flex items-center justify-center mb-5 overflow-hidden shadow-md`}
        >
          {!imgFailed ? (
            <img
              src={`/team/${member.slug}.jpg`}
              alt={member.name}
              className="w-full h-full object-cover"
              onError={() => setImgFailed(true)}
            />
          ) : (
            <span className="font-display font-bold text-[32px] text-indigo-mid">
              {initials(member.name)}
            </span>
          )}
        </div>

        {/* Name */}
        <h3 className="font-display font-bold text-[20px] text-text-dark mb-3 leading-tight">
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
          className="inline-flex items-center gap-2 text-text-muted hover:text-[#0A66C2] transition-colors"
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
    <section id="team" className="py-24 md:py-32 bg-white">
      <div className="max-w-container mx-auto px-8 lg:px-16">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-center gap-5 md:gap-12 mb-14">
          <span className="inline-block self-start bg-saffron text-white rounded-pill px-6 py-2 font-display font-bold text-[22px] whitespace-nowrap">
            Team
          </span>
          <p className="text-text-muted text-[18px] max-w-2xl leading-relaxed">
            Small, intentional, no sales layer. When you work with Kartar AI,
            you work with the people who write the code.
          </p>
        </div>

        {/* Team grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {team.map((member) => (
            <TeamCard key={member.slug} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
}
