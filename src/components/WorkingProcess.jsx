import React, { useState } from "react";
import { HiPlus, HiMinus } from "react-icons/hi";

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

  return (
    <section id="process" className="pt-10 md:pt-14 pb-24 md:pb-32">
      <div className="max-w-container mx-auto px-8 lg:px-16">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-center gap-5 md:gap-12 mb-14">
          <span className="inline-block self-start bg-saffron text-white rounded-pill px-6 py-2 font-display font-bold text-[22px] whitespace-nowrap">
            Our Process
          </span>
          <p className="text-text-muted text-[18px] max-w-2xl leading-relaxed">
            Four stages. Each one earns the next.
          </p>
        </div>

        {/* Accordion */}
        <div className="flex flex-col gap-6">
          {steps.map((step, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={step.num}
                className={`border-2 rounded-card p-8 md:p-10 transition-all duration-300 ${
                  isOpen
                    ? "border-text-dark bg-saffron/[0.03] shadow-md"
                    : "border-black/[0.08] bg-white hover:border-black/[0.15]"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : i)}
                  className="w-full flex items-center justify-between gap-6"
                >
                  <div className="flex items-center gap-6 md:gap-10">
                    <span className="font-display font-extrabold text-[42px] md:text-[56px] text-text-dark leading-none">
                      {step.num}
                    </span>
                    <h3 className="font-display font-bold text-[20px] md:text-[26px] text-text-dark text-left">
                      {step.title}
                    </h3>
                  </div>
                  <span className="flex-shrink-0 w-12 h-12 rounded-full border-2 border-text-dark flex items-center justify-center text-text-dark text-xl">
                    {isOpen ? <HiMinus /> : <HiPlus />}
                  </span>
                </button>

                {/* Expandable content */}
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? "max-h-40 mt-7 pt-7 border-t border-black/[0.08]" : "max-h-0"
                  }`}
                >
                  <p className="text-text-body text-[17px] leading-relaxed max-w-3xl">
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
