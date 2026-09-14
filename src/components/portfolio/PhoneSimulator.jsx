import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { EASE_IN_OUT } from "../../lib/motion";
import { useReducedMotion } from "../../lib/useReducedMotion";
import { useDemoPlayer } from "./useDemoPlayer";

// Aspect ratios as height-per-width.
const RATIO = { portrait: 1566 / 720, landscape: 9 / 16 };
// Max rendered width: portrait stays phone-sized; landscape fills its column.
const MAX_W = { portrait: 380, landscape: Infinity };

/** Reactive desktop check so we can drop the frame on mobile. */
function useDesktop() {
  const [desktop, setDesktop] = useState(
    typeof window !== "undefined"
      ? window.matchMedia("(min-width: 1024px)").matches
      : true
  );
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const on = () => setDesktop(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return desktop;
}

function PlaceholderScreen({ product }) {
  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
      style={{
        background:
          "radial-gradient(circle at 50% 30%, rgba(255,94,14,0.25), rgba(10,10,12,0.95))",
      }}
    >
      <span className="font-display font-extrabold text-white text-[22px] mb-1">
        {product.name}
      </span>
      <span className="font-display text-saffron-core text-[13px] mb-4">
        {product.tagline}
      </span>
      <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/40">
        Demo coming soon
      </span>
    </div>
  );
}

function DemoControls({ player, product }) {
  if (!player.hasVideo) return null;
  const label = player.status === "ended" ? "Tap to replay" : player.status === "playing" ? "Pause demo" : "Tap to continue";
  return (
    <div data-demo-controls className="mb-4 w-full rounded-2xl border border-white/15 bg-surface-mid px-4 py-3 flex flex-col sm:flex-row items-center gap-3 min-h-[92px]">
      <p aria-live="polite" className="flex-1 text-white/85 text-sm leading-relaxed">{player.activeTip || (player.status === 'ended' ? 'Demo complete. Watch it again or explore another product.' : `Watch ${product.name}. Pause whenever you want a closer look.`)}</p>
      <button type="button" onClick={player.advance} aria-label={`${label}: ${product.name}`} className="shrink-0 rounded-pill bg-saffron min-h-11 px-5 py-3 font-display font-bold text-white text-sm">{label}</button>
    </div>
  );
}

function Screen({ player, demo, product }) {
  return (
    <>
      {player.hasVideo ? (
        <video
          key={demo.video}
          ref={player.videoRef}
          src={demo.video}
          poster={demo.poster}
          className="w-full h-full object-contain"
          muted
          playsInline
          onTimeUpdate={player.handleTimeUpdate}
          onEnded={player.handleEnded}
        />
      ) : (
        <PlaceholderScreen product={product} />
      )}
    </>
  );
}

export default function PhoneSimulator({ product }) {
  const reduced = useReducedMotion();
  const desktop = useDesktop();
  const demo = product?.demo ?? { stops: [] };
  const orientation = demo.orientation === "landscape" ? "landscape" : "portrait";
  const aspectRatio = demo.aspectRatio || 1 / RATIO[orientation];
  const player = useDemoPlayer(demo, reduced);

  // Measure the available column width so the device can fill it (landscape)
  // or stay capped at a phone size (portrait).
  const boxRef = useRef(null);
  const [boxW, setBoxW] = useState(0);
  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) =>
      setBoxW(entries[0].contentRect.width)
    );
    ro.observe(el);
    return () => ro.disconnect();
  }, [desktop]);

  // Mobile: no frame ; full-width screen with an aspect ratio matched to the
  // orientation; the title is rendered by Portfolio above.
  if (!desktop) {
    return (
      <div>
      <DemoControls player={player} product={product} />
      <button
        type="button"
        onClick={player.advance}
        disabled={!player.hasVideo}
        aria-label={`${product.name}: ${player.status === "ended" ? "replay" : player.status === "playing" ? "pause" : "play or continue"} demo`}
        className="relative w-full rounded-3xl overflow-hidden border border-white/15 bg-black cursor-pointer"
        style={{ aspectRatio }}
      >
        <Screen player={player} demo={demo} product={product} />
      </button>
      </div>
    );
  }

  const renderW = Math.min(boxW || MAX_W.portrait, MAX_W[orientation]);
  const renderH = (renderW - 16) / aspectRatio + 16;

  return (
    <div ref={boxRef} className="w-full flex flex-col items-center">
      <DemoControls player={player} product={product} />
      <motion.button
        type="button"
        onClick={player.advance}
        disabled={!player.hasVideo}
        aria-label={`${product.name}: ${player.status === "ended" ? "replay" : player.status === "playing" ? "pause" : "play or continue"} demo`}
        className="relative rounded-[52px] border-[8px] border-white/15 bg-black overflow-hidden shadow-2xl cursor-pointer"
        animate={{ width: renderW, height: renderH }}
        transition={reduced ? { duration: 0 } : { duration: 0.6, ease: EASE_IN_OUT }}
      >
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-28 h-2 rounded-full bg-white/20 z-20" />
        <Screen player={player} demo={demo} product={product} />
      </motion.button>
    </div>
  );
}
