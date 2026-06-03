import React, { useMemo } from "react";
import ScrollScrubSequence from "./motion/ScrollScrubSequence";

/**
 * Hero "seek front & back" showcase. Until real AI/product frames or a clip are
 * supplied, it renders a procedural "agent at work" pipeline on canvas so the
 * scrub is demonstrable. To go live with real media, swap the `renderFrame`
 * prop for `frames={[...]}` (image sequence) or use <ScrollScrubVideo src=…/>.
 *
 * See MEDIA.md for the generation → encode pipeline and asset conventions.
 */
const STAGES = ["Read", "Reason", "Plan", "Act", "File"];

export default function ScrollScrubShowcase() {
  const renderFrame = useMemo(
    () =>
      (ctx, p, { width: w, height: h, dpr }) => {
        // Background
        const g = ctx.createLinearGradient(0, 0, w, h);
        g.addColorStop(0, "#0F0A1E");
        g.addColorStop(0.5, "#1B1240");
        g.addColorStop(1, "#0F0A1E");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, h);

        const cx = w / 2;
        const cy = h / 2;
        const n = STAGES.length;
        const span = Math.min(w * 0.72, 1100 * dpr);
        const startX = cx - span / 2;
        const step = span / (n - 1);
        const active = p * (n - 1);

        // Connecting track
        ctx.strokeStyle = "rgba(255,255,255,0.12)";
        ctx.lineWidth = 2 * dpr;
        ctx.beginPath();
        ctx.moveTo(startX, cy);
        ctx.lineTo(startX + span, cy);
        ctx.stroke();

        // Progress track (saffron)
        ctx.strokeStyle = "#FF5E0E";
        ctx.lineWidth = 3 * dpr;
        ctx.beginPath();
        ctx.moveTo(startX, cy);
        ctx.lineTo(startX + step * active, cy);
        ctx.stroke();

        // Nodes
        for (let i = 0; i < n; i++) {
          const x = startX + step * i;
          const lit = active >= i - 0.5;
          const isCurrent = Math.round(active) === i;
          const r = (isCurrent ? 16 : 11) * dpr;

          if (lit) {
            ctx.shadowColor = "rgba(255,94,14,0.7)";
            ctx.shadowBlur = 30 * dpr;
          }
          ctx.beginPath();
          ctx.arc(x, cy, r, 0, Math.PI * 2);
          ctx.fillStyle = lit ? "#FF7A35" : "#2A2150";
          ctx.fill();
          ctx.shadowBlur = 0;

          // Label
          ctx.fillStyle = lit
            ? "rgba(255,255,255,0.95)"
            : "rgba(255,255,255,0.35)";
          ctx.font = `${600} ${15 * dpr}px "Plus Jakarta Sans", sans-serif`;
          ctx.textAlign = "center";
          ctx.fillText(STAGES[i], x, cy + 44 * dpr);
        }

        // Progress %
        ctx.fillStyle = "rgba(255,255,255,0.9)";
        ctx.font = `${800} ${64 * dpr}px "Plus Jakarta Sans", sans-serif`;
        ctx.textAlign = "center";
        ctx.fillText(`${Math.round(p * 100)}%`, cx, cy - 80 * dpr);

        ctx.fillStyle = "rgba(255,255,255,0.4)";
        ctx.font = `${500} ${13 * dpr}px "JetBrains Mono", monospace`;
        ctx.fillText("AGENT PIPELINE — SCROLL TO SCRUB", cx, cy - 130 * dpr);
      },
    []
  );

  return (
    <ScrollScrubSequence
      renderFrame={renderFrame}
      scrollLength={2.2}
      className="h-screen w-full bg-void"
    >
      <div className="pointer-events-none flex h-full flex-col justify-end max-w-container mx-auto px-8 lg:px-16 pb-16">
        <span className="font-mono text-[12px] tracking-[0.12em] uppercase text-saffron mb-3">
          Watch an agent work
        </span>
        <h2 className="font-display font-extrabold text-white text-[clamp(28px,4vw,48px)] leading-tight max-w-2xl">
          Read → reason → plan → act → file.{" "}
          <span className="autonomous-gradient">Scroll to step through it.</span>
        </h2>
      </div>
    </ScrollScrubSequence>
  );
}
