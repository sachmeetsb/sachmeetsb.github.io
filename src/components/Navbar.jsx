import React, { useState, useEffect } from "react";
import { Link as ScrollLink } from "react-scroll";
import Logo from "./Logo";
import { HiMenuAlt3, HiX } from "react-icons/hi";

const navLinks = [
  { to: "services", label: "Services" },
  { to: "case-studies", label: "Case Studies" },
  { to: "process", label: "Process" },
  { to: "team", label: "Team" },
  { to: "contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-sm shadow-sm border-b border-black/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-container mx-auto px-8 lg:px-16">
        <div className="flex items-center justify-between h-[80px]">
          {/* Logo */}
          <ScrollLink
            to="hero"
            smooth
            duration={600}
            className="cursor-pointer"
          >
            <Logo size="md" variant={scrolled ? "on-light" : "on-dark"} />
          </ScrollLink>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <ScrollLink
                key={link.to}
                to={link.to}
                spy
                smooth
                offset={-80}
                duration={500}
                className={`px-5 py-2.5 font-display text-[15px] font-semibold cursor-pointer rounded-lg transition-colors ${
                  scrolled
                    ? "text-text-muted hover:text-indigo hover:bg-indigo/5"
                    : "text-white/60 hover:text-white"
                }`}
                activeClass={scrolled ? "!text-indigo" : "!text-white"}
              >
                {link.label}
              </ScrollLink>
            ))}
          </div>

          {/* CTA */}
          <a
            href="https://calendly.com/sachmeet-kartar/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex px-7 py-3 bg-saffron hover:bg-saffron-light text-white font-display text-[15px] font-semibold rounded-pill transition-colors"
          >
            Book a Call
          </a>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`md:hidden text-2xl ${
              scrolled ? "text-text-dark" : "text-white"
            }`}
          >
            {mobileOpen ? <HiX /> : <HiMenuAlt3 />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-black/5 px-6 py-4">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <ScrollLink
                key={link.to}
                to={link.to}
                spy
                smooth
                offset={-80}
                duration={500}
                onClick={() => setMobileOpen(false)}
                className="px-4 py-3 font-display text-[16px] font-semibold text-text-muted hover:text-indigo hover:bg-indigo/5 rounded-lg cursor-pointer transition-colors"
              >
                {link.label}
              </ScrollLink>
            ))}
            <a
              href="https://calendly.com/sachmeet-kartar/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 px-5 py-3 bg-saffron text-white font-display text-[16px] font-semibold rounded-pill text-center transition-colors hover:bg-saffron-light"
            >
              Book a Call
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
