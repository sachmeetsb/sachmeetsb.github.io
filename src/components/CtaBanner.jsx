import React from "react";
import { HiShieldCheck, HiLightBulb, HiLockOpen } from "react-icons/hi";
import { useLenis } from "../lib/SmoothScroll";

export default function CtaBanner() {
  const lenis = useLenis();
  const scrollToNewsletter = () => {
    const el = document.getElementById("newsletter");
    if (!el) return;
    if (lenis) lenis.scrollTo(el, { offset: -80 });
    else
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.scrollY - 80,
        behavior: "smooth",
      });
  };

  return (
    <section className="py-8 md:py-12">
      <div className="max-w-container mx-auto px-8 lg:px-16">
        <div
          className="rounded-card p-12 md:p-16 text-center"
          style={{
            background: "#0F0A1E",
            backgroundImage:
              "radial-gradient(ellipse 50% 60% at 50% 0%, rgba(74,47,154,0.4) 0%, transparent 70%), radial-gradient(ellipse 40% 50% at 80% 100%, rgba(255,94,14,0.12) 0%, transparent 60%)",
          }}
        >
          {/* Headline */}
          <h2
            className="font-display font-extrabold text-[32px] md:text-[44px] text-white leading-tight mb-5 max-w-2xl mx-auto"
            style={{ letterSpacing: "-0.5px" }}
          >
            Ready to make your processes{" "}
            <span className="autonomous-gradient">autonomous</span>?
          </h2>

          {/* Subtitle */}
          <p className="text-white/[0.5] text-[17px] max-w-2xl mx-auto mb-10 leading-relaxed">
            Join 25+ Indian enterprises running Kartar AI agents in production
            - autonomous, intelligible, and delivering measurable ROI from day
            one.
          </p>

          {/* CTA button -> scrolls to the newsletter signup in the footer */}
          <div className="flex justify-center mb-10">
            <button
              type="button"
              onClick={scrollToNewsletter}
              className="cursor-pointer px-8 py-4 bg-saffron hover:bg-saffron-light text-white font-display font-bold text-[16px] rounded-pill transition-colors border-0"
            >
              Deploy Your First Agent
            </button>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
            <div className="flex items-center gap-2 text-white/[0.35]">
              <HiShieldCheck className="text-[18px] text-teal" />
              <span className="font-mono text-[11px] tracking-[0.06em] uppercase">
                Trusted by 25+ enterprises across India
              </span>
            </div>
            <div className="flex items-center gap-2 text-white/[0.35]">
              <HiLightBulb className="text-[18px] text-saffron" />
              <span className="font-mono text-[11px] tracking-[0.06em] uppercase">
                Explainable AI
              </span>
            </div>
            <div className="flex items-center gap-2 text-white/[0.35]">
              <HiLockOpen className="text-[18px] text-indigo-mid" />
              <span className="font-mono text-[11px] tracking-[0.06em] uppercase">
                No vendor lock-in
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
