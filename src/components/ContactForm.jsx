import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";

export default function Contact() {
  const formRef = useRef();
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    setError(false);

    emailjs
      .sendForm(
        "service_id",
        "template_id",
        formRef.current,
        "public_key"
      )
      .then(() => {
        setSent(true);
        setSending(false);
        formRef.current.reset();
      })
      .catch(() => {
        setError(true);
        setSending(false);
      });
  };

  return (
    <section id="contact" className="py-24 md:py-32">
      <div className="max-w-container mx-auto px-8 lg:px-16">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-center gap-5 md:gap-12 mb-14">
          <span className="inline-block self-start bg-saffron text-white rounded-pill px-6 py-2 font-display font-bold text-[22px] whitespace-nowrap">
            Get in Touch
          </span>
          <p className="text-text-muted text-[18px] max-w-2xl leading-relaxed">
            Tell us what's broken. We'll tell you if AI is the fix.
          </p>
        </div>

        {/* Contact container */}
        <div
          className="rounded-card p-10 md:p-14 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20"
          style={{
            background: "#2D1B69",
            backgroundImage:
              "radial-gradient(ellipse 60% 80% at 90% 50%, rgba(74,47,154,0.6) 0%, transparent 70%)",
          }}
        >
          {/* Form */}
          <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div>
              <label className="block font-mono text-[11px] tracking-[0.12em] uppercase text-white/[0.4] mb-2">
                Name
              </label>
              <input
                type="text"
                name="user_name"
                required
                className="w-full bg-white/[0.08] border border-white/[0.12] rounded-xl px-5 py-3.5 text-white text-[16px] placeholder:text-white/[0.25] focus:outline-none focus:border-saffron/50 transition-colors"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="block font-mono text-[11px] tracking-[0.12em] uppercase text-white/[0.4] mb-2">
                Email
              </label>
              <input
                type="email"
                name="user_email"
                required
                className="w-full bg-white/[0.08] border border-white/[0.12] rounded-xl px-5 py-3.5 text-white text-[16px] placeholder:text-white/[0.25] focus:outline-none focus:border-saffron/50 transition-colors"
                placeholder="you@company.com"
              />
            </div>

            <button
              type="submit"
              disabled={sending}
              className="mt-2 px-8 py-4 bg-saffron hover:bg-saffron-light text-white font-display font-semibold text-[17px] rounded-pill transition-colors disabled:opacity-50 self-start"
            >
              {sending ? "Sending..." : "Send it"}
            </button>

            {sent && (
              <p className="text-teal text-[15px] font-medium mt-2">
                Message sent. We'll get back to you within 24 hours.
              </p>
            )}
            {error && (
              <p className="text-saffron-light text-[15px] font-medium mt-2">
                Something went wrong. Try again or email us directly.
              </p>
            )}
          </form>

          {/* Right side info */}
          <div className="flex flex-col justify-center">
            <h3
              className="font-display font-bold text-[32px] text-white mb-6"
              style={{ letterSpacing: "-0.4px" }}
            >
              Let's talk about what you're building.
            </h3>
            <p className="text-white/[0.58] text-[17px] leading-relaxed mb-10">
              Whether you need an agentic workflow for your ops, a vertical
              product for your industry, or just want to know if AI is the right
              move -we're here to have an honest conversation.
            </p>

            <div className="flex flex-col gap-5">
              <div>
                <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-white/[0.35] block mb-1">
                  Email
                </span>
                <a
                  href="mailto:hello@kartar.ai"
                  className="text-white font-display font-semibold text-[17px] hover:text-saffron transition-colors"
                >
                  hello@kartar.ai
                </a>
              </div>
              <div>
                <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-white/[0.35] block mb-1">
                  Book a call
                </span>
                <a
                  href="https://calendly.com/sachmeet-kartar/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white font-display font-semibold text-[17px] hover:text-saffron transition-colors"
                >
                  calendly.com/sachmeet-kartar
                </a>
              </div>
            </div>

            <p className="mt-10 font-mono text-[11px] tracking-[0.08em] uppercase text-white/[0.25]">
              We respond within 24 hours. No auto-reply.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
