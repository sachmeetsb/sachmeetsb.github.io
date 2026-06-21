import React, { useState, useEffect } from "react";
import Logo from "./Logo";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { useLenis } from "../lib/SmoothScroll";

const navLinks = [
  { to: "services", label: "Services" },
  { to: "portfolio", label: "Portfolio" },
  { to: "process", label: "Process" },
  { to: "team", label: "Team" },
  { to: "contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("");
  const lenis = useLenis();

  // Scrolled state — prefer Lenis' scroll event, fall back to window scroll.
  useEffect(() => {
    if (lenis) {
      const onScroll = ({ scroll }) => setScrolled(scroll > 40);
      lenis.on("scroll", onScroll);
      return () => lenis.off("scroll", onScroll);
    }
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [lenis]);

  // Active section highlighting via IntersectionObserver.
  useEffect(() => {
    const ids = navLinks.map((l) => l.to);
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    if (!sections.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (target) => {
    const el =
      target === "hero"
        ? document.body
        : document.getElementById(target);
    if (!el) return;
    if (lenis) {
      lenis.scrollTo(target === "hero" ? 0 : el, { offset: -80 });
    } else {
      const top =
        target === "hero"
          ? 0
          : el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-void/80 backdrop-blur-md shadow-sm border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-container mx-auto px-8 lg:px-16">
        <div className="flex items-center justify-between h-[80px]">
          {/* Logo */}
          <button
            type="button"
            onClick={() => scrollTo("hero")}
            className="cursor-pointer bg-transparent border-0 p-0"
            aria-label="Back to top"
          >
            <Logo size="md" variant="on-dark" />
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <button
                key={link.to}
                type="button"
                onClick={() => scrollTo(link.to)}
                className={`px-5 py-2.5 font-display text-[15px] font-semibold cursor-pointer rounded-lg transition-colors bg-transparent border-0 ${
                  active === link.to
                    ? "text-white"
                    : "text-white/60 hover:text-white"
                }`}
              >
                {link.label}
              </button>
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
            className="md:hidden text-2xl text-white"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <HiX /> : <HiMenuAlt3 />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-void/95 backdrop-blur-md border-t border-white/10 px-6 py-4">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <button
                key={link.to}
                type="button"
                onClick={() => {
                  scrollTo(link.to);
                  setMobileOpen(false);
                }}
                className="text-left px-4 py-3 font-display text-[16px] font-semibold text-white/70 hover:text-white hover:bg-white/5 rounded-lg cursor-pointer transition-colors bg-transparent border-0"
              >
                {link.label}
              </button>
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
