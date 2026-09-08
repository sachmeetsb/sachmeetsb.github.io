import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

const EMAILJS_SERVICE_ID = "service_gtn59h8";
const EMAILJS_TEMPLATE_ID = "template_2l3bp6f";
const EMAILJS_PUBLIC_KEY = "kmCIQtGGQzq1RfE0w";
const CALENDLY_URL = "https://calendly.com/sachmeet-kartar/30min";

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-2 block font-mono text-[11px] uppercase tracking-[0.12em] text-white/[0.4]">
        {label}
      </span>
      {children}
    </label>
  );
}

const fieldClassName =
  "w-full rounded-xl border border-white/[0.12] bg-white/[0.08] px-5 py-3.5 text-[16px] text-white transition-colors placeholder:text-white/[0.25] focus:border-saffron/50 focus:outline-none";

export default function Contact() {
  const formRef = useRef();
  const [sending, setSending] = useState(false);
  const [bookingUrl, setBookingUrl] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSending(true);
    setError(false);

    const formData = new FormData(formRef.current);
    const name = formData.get("from_name")?.trim() || "";
    const email = formData.get("from_email")?.trim() || "";
    const brief = [
      `Company: ${formData.get("company") || "Not provided"}`,
      `Role: ${formData.get("role") || "Not provided"}`,
      `Phone: ${formData.get("from_phone") || "Not provided"}`,
      `Discussion: ${formData.get("discussion") || "Not provided"}`,
      `Decision role: ${formData.get("decision_role") || "Not provided"}`,
      `Desired outcome: ${formData.get("outcome") || "Not provided"}`,
      `Current situation: ${formData.get("current_state") || "Not provided"}`,
      `Timeline: ${formData.get("timeline") || "Not provided"}`,
      `Budget: ${formData.get("budget") || "Not provided"}`,
      `Meeting attendees: ${formData.get("attendees") || "Not provided"}`,
      `Helpful links: ${formData.get("links") || "Not provided"}`,
    ].join("\n\n");

    formRef.current.elements.message.value = brief;

    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY
      );

      const params = new URLSearchParams({ name, email });
      setBookingUrl(`${CALENDLY_URL}?${params.toString()}`);
      setSending(false);
    } catch (submissionError) {
      console.error("EmailJS send failed:", submissionError);
      setError(true);
      setSending(false);
    }
  };

  return (
    <section id="contact" className="py-24 md:py-32">
      <div className="mx-auto max-w-container px-8 lg:px-16">
        <div className="mb-14 flex flex-col gap-5 md:flex-row md:items-center md:gap-12">
          <span className="inline-block self-start whitespace-nowrap rounded-pill bg-saffron px-6 py-2 font-display text-[22px] font-bold text-white">
            Book a call
          </span>
          <p className="max-w-2xl text-[18px] leading-relaxed text-white/50">
            Share the context first. We use it to arrive prepared and make the
            conversation useful from minute one.
          </p>
        </div>

        <div
          className="grid grid-cols-1 gap-12 rounded-card p-10 lg:grid-cols-2 lg:gap-20 md:p-14"
          style={{
            background: "#2D1B69",
            backgroundImage:
              "radial-gradient(ellipse 60% 80% at 90% 50%, rgba(74,47,154,0.6) 0%, transparent 70%)",
          }}
        >
          <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-6">
            <input type="hidden" name="message" />

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <Field label="Name">
                <input
                  type="text"
                  name="from_name"
                  required
                  className={fieldClassName}
                  placeholder="Your name"
                />
              </Field>
              <Field label="Work email">
                <input
                  type="email"
                  name="from_email"
                  required
                  className={fieldClassName}
                  placeholder="you@company.com"
                />
              </Field>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <Field label="Company or organisation">
                <input name="company" required className={fieldClassName} placeholder="Company name" />
              </Field>
              <Field label="Your role">
                <input name="role" required className={fieldClassName} placeholder="Founder, operator, product lead..." />
              </Field>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <Field label="What would you like to discuss?">
                <select name="discussion" required defaultValue="" className={fieldClassName}>
                  <option value="" disabled>Choose a starting point</option>
                  <option>Build a new AI product</option>
                  <option>Improve an existing product or workflow</option>
                  <option>Agentic AI for operations</option>
                  <option>VR architecture or real estate</option>
                  <option>Kartar Hardware</option>
                  <option>Other</option>
                </select>
              </Field>
              <Field label="Your role in the decision">
                <select name="decision_role" required defaultValue="" className={fieldClassName}>
                  <option value="" disabled>Choose one</option>
                  <option>Final decision-maker</option>
                  <option>Part of the decision team</option>
                  <option>Researching options</option>
                </select>
              </Field>
            </div>

            <Field label="What outcome would make this conversation worthwhile?">
              <textarea
                name="outcome"
                required
                rows={3}
                className={`${fieldClassName} resize-none`}
                placeholder="The problem, who feels it, and what a better outcome looks like."
              />
            </Field>

            <Field label="What have you already tried or built?">
              <textarea
                name="current_state"
                rows={3}
                className={`${fieldClassName} resize-none`}
                placeholder="Current workflow, tools, data, constraints, or anything that would help us prepare."
              />
            </Field>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <Field label="Target timeline">
                <select name="timeline" required defaultValue="" className={fieldClassName}>
                  <option value="" disabled>Choose one</option>
                  <option>Exploring the problem</option>
                  <option>Ready to start this month</option>
                  <option>Starting in 1–3 months</option>
                  <option>Planning for a later quarter</option>
                </select>
              </Field>
              <Field label="Indicative budget">
                <select name="budget" required defaultValue="" className={fieldClassName}>
                  <option value="" disabled>Choose one</option>
                  <option>Exploring fit</option>
                  <option>Up to ₹5 lakh</option>
                  <option>₹5–15 lakh</option>
                  <option>₹15 lakh+</option>
                </select>
              </Field>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <Field label="Phone (optional)">
                <input type="tel" name="from_phone" className={fieldClassName} placeholder="+91..." />
              </Field>
              <Field label="Who else will join? (optional)">
                <input name="attendees" className={fieldClassName} placeholder="Names and roles" />
              </Field>
            </div>

            <Field label="Relevant links (optional)">
              <input name="links" className={fieldClassName} placeholder="Website, product, brief, or deck" />
            </Field>

            <button
              type="submit"
              disabled={sending}
              className="mt-2 self-start rounded-pill bg-saffron px-8 py-4 font-display text-[17px] font-semibold text-white transition-colors hover:bg-saffron-light disabled:opacity-50"
            >
              {sending ? "Saving your context..." : "Continue to calendar"}
            </button>

            {bookingUrl && (
              <p className="text-[15px] font-medium text-teal">
                Context received. Your name and email are ready on the booking page.
              </p>
            )}
            {error && (
              <p className="text-[15px] font-medium text-saffron-light">
                We could not save your context. Please try again or email hello@kartar.ai.
              </p>
            )}
          </form>

          <aside className="flex flex-col justify-center">
            <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.14em] text-saffron-light">
              A prepared conversation
            </p>
            <h3 className="mb-6 font-display text-[32px] font-bold text-white" style={{ letterSpacing: "-0.4px" }}>
              Book time when the brief is clear.
            </h3>
            <p className="mb-8 text-[17px] leading-relaxed text-white/[0.58]">
              We review the problem, operating context, decision path, timing,
              and constraints before the call. That lets us use the time for
              useful product and engineering decisions instead of discovery theatre.
            </p>

            {bookingUrl ? (
              <a
                href={bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mb-10 inline-flex w-fit items-center rounded-pill bg-white px-6 py-3.5 font-display text-[16px] font-semibold text-void transition-transform hover:-translate-y-0.5"
              >
                Choose a time in the calendar
              </a>
            ) : (
              <div className="mb-10 rounded-xl border border-white/[0.12] bg-white/[0.05] p-5 text-[15px] leading-relaxed text-white/[0.55]">
                Complete the brief and the calendar will open with your contact
                details already filled in.
              </div>
            )}

            <div className="flex flex-col gap-5 border-t border-white/[0.12] pt-7">
              <div>
                <span className="mb-1 block font-mono text-[11px] uppercase tracking-[0.12em] text-white/[0.35]">
                  Email
                </span>
                <a href="mailto:hello@kartar.ai" className="font-display text-[17px] font-semibold text-white transition-colors hover:text-saffron">
                  hello@kartar.ai
                </a>
              </div>
              <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-white/[0.25]">
                No auto-reply. A considered response within 24 hours.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
