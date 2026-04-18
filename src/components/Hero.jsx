import React, { useState, useEffect } from "react";

export default function Hero() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        background: "#2D1B69",
        backgroundImage: [
          "radial-gradient(ellipse 55% 70% at 85% 50%, rgba(74,47,154,0.7) 0%, transparent 70%)",
          "radial-gradient(ellipse 40% 50% at 15% 85%, rgba(255,94,14,0.18) 0%, transparent 60%)",
          "radial-gradient(ellipse 30% 40% at 55% 5%, rgba(0,191,165,0.12) 0%, transparent 60%)",
        ].join(", "),
      }}
    >
      {/* Subtle cross pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.018]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E\")",
        }}
      />

      {/* Floating gradient orb */}
      <div className="absolute right-[10%] top-1/2 -translate-y-1/2 hidden lg:block">
        <div className="relative animate-orb-float">
          <div
            className="w-[280px] h-[280px] rounded-full animate-pulse-slow"
            style={{
              background:
                "radial-gradient(circle at 40% 38%, #FFAA70 0%, #FF7A35 40%, #FF5E0E 100%)",
              boxShadow:
                "0 0 80px rgba(255,94,14,0.4), 0 0 160px rgba(255,94,14,0.15), 0 0 240px rgba(255,94,14,0.05)",
            }}
          />
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.15) 0%, transparent 50%)",
            }}
          />
        </div>
      </div>

      <div className="relative z-10 max-w-container mx-auto px-8 lg:px-16 py-36 md:py-44">
        {/* Animated tagline */}
        <div className="mb-12">
          <h2
            className={`font-display font-extrabold text-white transition-all duration-700 ease-out ${
              scrolled
                ? "text-[32px] md:text-[40px] tracking-tight"
                : "text-[56px] md:text-[84px] tracking-[-2px]"
            }`}
          >
            <span
              className={`transition-all duration-700 ${
                scrolled ? "hidden" : "inline"
              }`}
            >
              All Is.{" "}
            </span>
            <span
              className={`transition-all duration-700 ${
                scrolled ? "inline" : "hidden"
              }`}
            >
              AI.{" "}
            </span>
            <span className="autonomous-gradient">Now</span>
          </h2>
        </div>

        {/* Main headline */}
        <h1
          className="font-display font-extrabold text-white text-[clamp(38px,5vw,64px)] leading-[1.1] max-w-[800px] mb-6"
          style={{ letterSpacing: "-1.5px" }}
        >
          Some industries haven't changed in 30 years.{" "}
          <span className="autonomous-gradient">
            We're changing them now.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-[19px] text-white/[0.58] max-w-[580px] mb-12 leading-relaxed">
          Agentic AI systems for Indian businesses. AI-native products for
          industries ready to be rebuilt from scratch. Two modes. One team. No
          fluff.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap gap-4 mb-16">
          <a
            href="https://calendly.com/sachmeet-kartar/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-saffron hover:bg-saffron-light text-white font-display font-semibold text-[17px] rounded-pill transition-all hover:shadow-[0_0_30px_rgba(255,94,14,0.3)]"
          >
            Book a Call
          </a>
          <a
            href="#process"
            className="px-8 py-4 border-2 border-white/20 hover:border-white/40 text-white/80 hover:text-white font-display font-semibold text-[17px] rounded-pill transition-colors"
          >
            See how we work
          </a>
        </div>

        {/* Trust bar */}
        <div className="flex gap-10 flex-wrap">
          {[
            { label: "Timeline", value: "Pilot to production in weeks" },
            { label: "What we build", value: "Services + Products" },
            { label: "Approach", value: "Indian-first, not localised" },
          ].map((item) => (
            <div key={item.label}>
              <span className="block font-display font-semibold text-[16px] text-white/[0.88] mb-1">
                {item.value}
              </span>
              <span className="font-mono text-[12px] tracking-[0.08em] uppercase text-white/[0.38]">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
