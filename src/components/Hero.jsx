import React from "react";
import { motion } from "framer-motion";
import SplitText from "./motion/SplitText";
import MagneticButton from "./motion/MagneticButton";
import { useReducedMotion } from "../lib/useReducedMotion";
import { EASE_OUT } from "../lib/motion";

export default function Hero({
  callActive = false,
  connecting = false,
  speaking = false,
  onOrbClick,
}) {
  const reduced = useReducedMotion();
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

      <div className="hero-founder absolute right-[7%] top-1/2 -translate-y-1/2 hidden lg:block w-[330px] xl:w-[390px] z-20">
        <a href="#team" className="block">
          <img src="/sachmeet.jpg" alt="Sachmeet Singh Bhatia, founder of Kartar AI Labs" width="640" height="640" fetchPriority="high" className="w-full aspect-square object-cover object-top rounded-[45px] border border-white/20 shadow-glow-indigo" />
          <span className="block mt-5 font-display text-[22px] font-bold text-white">I’m Sachmeet.</span>
          <span className="block text-white/70 text-[16px]">Founder & AI Engineer. Meet the person building.</span>
        </a>
        <button type="button" onClick={onOrbClick} aria-label={callActive ? "End voice call" : "Talk to Naina, the AI assistant"} className="flex items-center gap-4 mt-6 text-white/80 text-left">
          <span aria-hidden="true" className="block w-12 h-12 rounded-full shrink-0 animate-pulse-slow" style={{background:"radial-gradient(circle at 40% 38%, #FFAA70, #FF5E0E)",boxShadow:"0 0 36px rgba(255,94,14,0.4)"}} />
          <span>{callActive ? (connecting ? "Connecting…" : speaking ? "Speaking… Tap to end" : "Listening… Tap to end") : "Talk to Naina, my AI receptionist"}</span>
        </button>
      </div>

      <div className="relative z-10 w-full max-w-container mx-auto px-8 lg:px-16 pt-28 pb-16">
        {/* Animated tagline */}
        <motion.div
          className="mb-5"
          initial={reduced ? false : { opacity: 0, y: 24 }}
          animate={reduced ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.1 }}
        >
          <h2 className="font-display font-extrabold text-white text-[48px] md:text-[64px] leading-tight tracking-[-2px]">
            AI Is. <span className="autonomous-gradient">Now</span>
          </h2>
        </motion.div>

        {/* Main headline */}
        <h1
          className="font-display font-extrabold text-white text-[clamp(34px,3.5vw,48px)] leading-[1.15] max-w-[540px] mb-6"
          style={{ letterSpacing: "-1.5px" }}
        >
          <SplitText
            text="You are just in time for the next era"
            stagger={0.03}
            delay={0.25}
          />{" "}
          <SplitText
            text="Stay up front with Kartar"
            className="autonomous-gradient"
            stagger={0.03}
            delay={0.7}
          />
        </h1>

        {/* Subtitle */}
        <motion.p
          className="text-[18px] text-white/75 max-w-[480px] mb-6 leading-relaxed"
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={reduced ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE_OUT, delay: 1.0 }}
        >
          Agentic AI systems and AI-native products, built for the speed of  Indian business
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-wrap gap-4 mb-5"
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={reduced ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE_OUT, delay: 1.15 }}
        >
          <MagneticButton
            as="a"
            href="#contact"
            className="inline-block px-8 py-4 bg-saffron hover:bg-saffron-light text-white font-display font-semibold text-[17px] rounded-pill transition-all hover:shadow-glow-saffron"
          >
            Book a Call
          </MagneticButton>
          <MagneticButton as="a" href="#portfolio" className="inline-flex px-8 py-4 border-2 border-white/25 hover:border-white/50 text-white font-display font-semibold text-[17px] rounded-pill">Explore Products</MagneticButton>
        </motion.div>

        <p className="font-display font-bold text-[20px] sm:text-[26px] text-white/90 mb-10 max-w-[520px] leading-relaxed">
          Ideate <span aria-hidden="true">→</span> Engineering <span aria-hidden="true">→</span> <span className="autonomous-gradient">Product</span>
        </p>
        <a href="#team" className="lg:hidden flex items-center gap-5 mb-10">
          <img src="/sachmeet.jpg" alt="Sachmeet Singh Bhatia" width="112" height="112" className="w-28 h-28 rounded-3xl object-cover object-top border border-white/20" />
          <span><strong className="block font-display text-[22px] text-white">I’m Sachmeet.</strong><span className="text-white/70">Founder & AI Engineer</span></span>
        </a>
        {/* Trust bar */}
        <motion.div
          className="flex gap-10 flex-wrap"
          initial={reduced ? false : { opacity: 0 }}
          animate={reduced ? {} : { opacity: 1 }}
          transition={{ duration: 0.8, ease: EASE_OUT, delay: 1.35 }}
        >
          {[
            { label: "Timeline", value: "Pilot to production in weeks" },
            { label: "What we build", value: "Services + Products" },
            // { label: "Approach", value: "Indian-first, not localised" },
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
        </motion.div>
      </div>
    </section>
  );
}
