import React from "react";
import { FaLinkedin } from "react-icons/fa";

const team = [
  {
    name: "Sachmeet Singh",
    role: "Founder & CEO",
    bio: "Builds the product, writes the code, takes the calls. No layers.",
    linkedin: "https://linkedin.com/in/sachmeet",
    image: null,
  },
  {
    name: "Team Member",
    role: "Role",
    bio: "Coming soon.",
    linkedin: "#",
    image: null,
  },
  {
    name: "Team Member",
    role: "Role",
    bio: "Coming soon.",
    linkedin: "#",
    image: null,
  },
];

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {team.map((member, i) => (
            <div
              key={i}
              className="border border-black/[0.07] rounded-card p-10 bg-white hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
            >
              {/* Avatar placeholder */}
              <div className="w-[90px] h-[90px] rounded-full bg-indigo/[0.08] flex items-center justify-center mb-6">
                {member.image ? (
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <span className="font-display font-bold text-[28px] text-indigo-mid">
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                )}
              </div>

              <h3 className="font-display font-bold text-[20px] text-text-dark mb-1">
                {member.name}
              </h3>
              <p className="font-mono text-[12px] tracking-[0.08em] uppercase text-text-muted mb-4">
                {member.role}
              </p>
              <p className="text-text-body text-[16px] leading-relaxed mb-6">
                {member.bio}
              </p>

              {member.linkedin && member.linkedin !== "#" && (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-muted hover:text-indigo transition-colors"
                >
                  <FaLinkedin size={22} />
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
