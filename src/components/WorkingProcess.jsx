import React, { useState, useRef, useEffect } from "react";
import { HiPlus, HiMinus } from "react-icons/hi";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionHeader } from "./motion/Section";
import {
  prefersReducedMotion,
  isMobileViewport,
} from "../lib/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    num: "01",
    title: "Consultation, Research & Strategy",
    description:
      "We learn your domain before we write a line of code. What's broken? What's manual? What would change if an agent handled it? We scope the whole problem, not a ticket.",
  },
  {
    num: "02",
    title: "Build Complete",
    description:
      "We finish the whole implementation. Not a sprint slice. Not a demo. The actual working system. A half-shipped feature tells you nothing.",
  },
  {
    num: "03",
    title: "Ship & Measure",
    description:
      "Every release is a question, not a statement. We put it in front of real users, real workflows, real edge cases. Then we watch what happens.",
  },
  {
    num: "04",
    title: "Feedback & Iterate",
    description:
      "Everything ships with a feedback window. Good feedback tells us what to keep. Bad feedback tells us what to kill. Both are gifts. We act on them fast.",
  },
];

export default function WorkingProcess() {
  const [openIndex, setOpenIndex] = useState(0);
  const sectionRef = useRef(null);

  // Pinned scrollytelling: scroll advances the active stage. Falls back to a
  // plain clickable accordion on reduced-motion / mobile.
  useEffect(() => {
    if (prefersReducedMotion() || isMobileViewport()) return;
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: `+=${window.innerHeight * (steps.length - 1)}`,
        pin: true,
        scrub: true,
        onUpdate: (self) => {
          const idx = Math.min(
            steps.length - 1,
            Math.floor(self.progress * steps.length)
          );
          setOpenIndex(idx);
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="process"
      className="relative min-h-screen flex flex-col justify-center pt-8 md:pt-10 pb-12 md:pb-16"
    >
      <div className="relative z-10 max-w-container mx-auto w-full px-8 lg:px-16">
        <SectionHeader label="Our Process">
          Four stages. Each one earns the next.
        </SectionHeader>

        {/* Accordion */}
        <div className="flex flex-col gap-6">
          {steps.map((step, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={step.num}
                className={`border rounded-card p-8 md:p-10 transition-all duration-500 ${
                  isOpen
                    ? "border-saffron/60 bg-white/[0.05] shadow-glow-saffron"
                    : "border-white/10 bg-white/[0.02] hover:border-white/25"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : i)}
                  className="w-full flex items-center justify-between gap-6"
                >
                  <div className="flex items-center gap-6 md:gap-10">
                    <span
                      className={`font-display font-extrabold text-[42px] md:text-[56px] leading-none transition-colors ${
                        isOpen ? "autonomous-gradient" : "text-white/30"
                      }`}
                    >
                      {step.num}
                    </span>
                    <h3 className="font-display font-bold text-[20px] md:text-[26px] text-white text-left">
                      {step.title}
                    </h3>
                  </div>
                  <span className="flex-shrink-0 w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white text-xl">
                    {isOpen ? <HiMinus /> : <HiPlus />}
                  </span>
                </button>

                {/* Expandable content */}
                <div
                  className={`overflow-hidden transition-all duration-500 ${
                    isOpen
                      ? "max-h-40 mt-7 pt-7 border-t border-white/10"
                      : "max-h-0"
                  }`}
                >
                  <p className="text-white/65 text-[17px] leading-relaxed max-w-3xl">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
