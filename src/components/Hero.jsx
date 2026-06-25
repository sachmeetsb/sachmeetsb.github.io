import React, { Suspense, lazy, useEffect, useState } from "react";
import { motion } from "framer-motion";
import SplitText from "./motion/SplitText";
import MagneticButton from "./motion/MagneticButton";
import {
  useReducedMotion,
  isMobileViewport,
} from "../lib/useReducedMotion";
import { EASE_OUT } from "../lib/motion";

const HeroCanvas = lazy(() => import("./hero/HeroCanvas"));

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

/** CSS orb — fallback when WebGL is unavailable / reduced-motion / mobile. */
function OrbFallback() {
  return (
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
  );
}

export default function Hero({
  callActive = false,
  connecting = false,
  speaking = false,
  onOrbClick,
}) {
  const reduced = useReducedMotion();
  const [useCanvas, setUseCanvas] = useState(false);

  useEffect(() => {
    if (!reduced && !isMobileViewport() && supportsWebGL()) {
      setUseCanvas(true);
    }
  }, [reduced]);

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

      {/* Orb — WebGL canvas with CSS fallback. Click it to toggle a page-wide
          background orb that follows you as you scroll. */}
      <div className="absolute right-[12%] top-1/2 -translate-y-1/2 hidden lg:block w-[480px] h-[480px]">
        {useCanvas ? (
          <Suspense
            fallback={
              <div className="absolute inset-0 flex items-center justify-center">
                <OrbFallback />
              </div>
            }
          >
            <HeroCanvas />
          </Suspense>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <OrbFallback />
          </div>
        )}

        {/* Oversized invisible hit target — extends well beyond the orb,
            with ~40% more reach on the left, so it's easy to click. */}
        <button
          type="button"
          onClick={onOrbClick}
          aria-label={callActive ? "End voice call" : "Talk to the AI — start a voice call"}
          title={callActive ? "Click to end the call" : "Click to talk to me"}
          className="absolute -top-28 -bottom-28 -right-28 -left-72 z-20 rounded-full bg-transparent border-0 cursor-pointer"
        />

        {/* Label to the right of the orb — invites a call when idle, and shows
            the live status (with tap-to-end) while a call is running. */}
        <button
          type="button"
          onClick={onOrbClick}
          className="group absolute left-full top-1/2 -translate-y-1/2 ml-5 w-[160px] text-left bg-transparent border-0 cursor-pointer z-20"
        >
          <span className="block font-mono text-[12px] tracking-[0.18em] uppercase leading-relaxed text-white/70 group-hover:text-white transition-colors">
            {callActive ? (
              <>
                {connecting
                  ? "Connecting…"
                  : speaking
                  ? "Speaking…"
                  : "Listening…"}
                <span className="block mt-1 text-white/40 normal-case tracking-normal text-[11px]">
                  tap the orb to end
                </span>
              </>
            ) : (
              "← Click here for your virtual receptionist"
            )}
          </span>
        </button>
      </div>

      <div className="relative z-10 max-w-container mx-auto px-8 lg:pl-8 lg:pr-16 py-36 md:py-44">
        {/* Animated tagline */}
        <motion.div
          className="mb-12"
          initial={reduced ? false : { opacity: 0, y: 24 }}
          animate={reduced ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.1 }}
        >
          <h2 className="font-display font-extrabold text-white text-[56px] md:text-[84px] tracking-[-2px]">
            AI Is. <span className="autonomous-gradient">Now</span>
          </h2>
        </motion.div>

        {/* Main headline */}
        <h1
          className="font-display font-extrabold text-white text-[clamp(38px,5vw,64px)] leading-[1.1] max-w-[480px] mb-6"
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
          className="text-[19px] text-white/[0.58] max-w-[400px] mb-12 leading-relaxed"
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={reduced ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE_OUT, delay: 1.0 }}
        >
          Agentic AI systems and AI-native products, built for the speed of  Indian business
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-wrap gap-4 mb-16"
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={reduced ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE_OUT, delay: 1.15 }}
        >
          <MagneticButton
            as="a"
            href="https://calendly.com/sachmeet-kartar/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 bg-saffron hover:bg-saffron-light text-white font-display font-semibold text-[17px] rounded-pill transition-all hover:shadow-glow-saffron"
          >
            Book a Call
          </MagneticButton>
          {/* <MagneticButton
            as="a"
            href="#process"
            className="inline-block px-8 py-4 border-2 border-white/20 hover:border-white/40 text-white/80 hover:text-white font-display font-semibold text-[17px] rounded-pill transition-colors"
          >
            See how we work
          </MagneticButton> */}
        </motion.div>

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
