import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "../lib/useReducedMotion";

/**
 * Big, soft background orb that follows the viewport (fixed) across the page
 * while a call is `active` — lives at z-0, behind the content, and is purely
 * decorative (pointer-events off) so it never blocks clicks. Alongside it, a
 * small "End call" pill sits to its right on a higher layer so the call can be
 * ended from anywhere. Brightens a touch while the agent is `speaking`.
 */
export default function FollowOrb({ active, speaking, onEnd }) {
  const reduced = useReducedMotion();
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key="orb"
          aria-hidden="true"
          className="fixed inset-0 z-0 pointer-events-none flex items-center justify-end pr-[9%] lg:pr-[11%]"
          initial={{ opacity: 0 }}
          animate={{ opacity: speaking ? 0.65 : 0.5 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className={reduced ? "" : "animate-orb-float"}>
            <div
              className="w-[360px] h-[360px] md:w-[540px] md:h-[540px] rounded-full animate-pulse-slow"
              style={{
                background:
                  "radial-gradient(circle at 40% 38%, #FFAA70 0%, #FF7A35 40%, #FF5E0E 100%)",
                boxShadow: speaking
                  ? "0 0 110px rgba(255,94,14,0.45), 0 0 220px rgba(255,94,14,0.18)"
                  : "0 0 90px rgba(255,94,14,0.35), 0 0 200px rgba(255,94,14,0.12)",
              }}
            />
          </div>
        </motion.div>
      )}

      {active && (
        <motion.button
          key="end"
          type="button"
          onClick={onEnd}
          aria-label="End voice call"
          className="hidden lg:flex fixed right-[3%] top-1/2 -translate-y-1/2 z-40 items-center gap-2 rounded-pill bg-void/70 backdrop-blur-md border border-white/15 px-4 py-2.5 text-white font-mono text-[11px] tracking-[0.15em] uppercase cursor-pointer hover:bg-void/90 transition-colors"
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 12 }}
          transition={{ duration: 0.4 }}
        >
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          End call
        </motion.button>
      )}
    </AnimatePresence>
  );
}
