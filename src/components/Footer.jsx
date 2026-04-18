import React from "react";
import { Link as ScrollLink } from "react-scroll";
import { FaLinkedin, FaTwitter, FaGithub } from "react-icons/fa";
import Logo from "./Logo";

const navLinks = [
  { to: "services", label: "Services" },
  { to: "case-studies", label: "Case Studies" },
  { to: "process", label: "Process" },
  { to: "team", label: "Team" },
  { to: "contact", label: "Contact" },
];

const socialLinks = [
  { href: "#", icon: FaLinkedin, label: "LinkedIn" },
  { href: "#", icon: FaTwitter, label: "Twitter" },
  { href: "#", icon: FaGithub, label: "GitHub" },
];

export default function Footer() {
  return (
    <footer className="bg-void pt-20 pb-10">
      <div className="max-w-container mx-auto px-8 lg:px-16">
        {/* Top section */}
        <div className="flex flex-col md:flex-row justify-between gap-12 mb-16">
          {/* Logo + tagline */}
          <div className="max-w-sm">
            <Logo size="md" variant="on-dark" />
            <p className="mt-5 text-white/[0.4] text-[16px] leading-relaxed">
              Empowering businesses with Agentic AI and Software 3.0 -at
              lightning speed.
            </p>
          </div>

          {/* Nav links */}
          <div>
            <h4 className="font-mono text-[11px] tracking-[0.12em] uppercase text-white/[0.3] mb-5">
              Navigation
            </h4>
            <ul className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <ScrollLink
                    to={link.to}
                    smooth
                    offset={-80}
                    duration={500}
                    className="text-white/[0.55] hover:text-white font-display text-[16px] font-medium cursor-pointer transition-colors"
                  >
                    {link.label}
                  </ScrollLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-mono text-[11px] tracking-[0.12em] uppercase text-white/[0.3] mb-5">
              Contact
            </h4>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href="mailto:hello@kartar.ai"
                  className="text-white/[0.55] hover:text-white font-display text-[16px] font-medium transition-colors"
                >
                  hello@kartar.ai
                </a>
              </li>
              <li>
                <a
                  href="https://calendly.com/sachmeet-kartar/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/[0.55] hover:text-white font-display text-[16px] font-medium transition-colors"
                >
                  Book a Call
                </a>
              </li>
            </ul>

            {/* Social */}
            <div className="flex gap-3 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full border border-white/[0.1] flex items-center justify-center text-white/[0.4] hover:text-white hover:border-white/[0.3] transition-colors"
                >
                  <social.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-mono text-[11px] tracking-[0.12em] uppercase text-white/[0.3] mb-5">
              Updates
            </h4>
            <p className="text-white/[0.4] text-[15px] mb-4">
              Get updates. No spam. Just builds.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex gap-2"
            >
              <input
                type="email"
                placeholder="you@company.com"
                className="bg-white/[0.06] border border-white/[0.1] rounded-lg px-4 py-2.5 text-white text-[15px] placeholder:text-white/[0.2] focus:outline-none focus:border-saffron/40 transition-colors w-full max-w-[220px]"
              />
              <button
                type="submit"
                className="px-5 py-2.5 bg-saffron hover:bg-saffron-light text-white font-display text-[14px] font-semibold rounded-lg transition-colors flex-shrink-0"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/[0.06] pt-7">
          <p className="font-mono text-[11px] tracking-[0.08em] uppercase text-white/[0.2] text-center">
            &copy; 2026 Kartar AI Labs. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
