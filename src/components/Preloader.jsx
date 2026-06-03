import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "../lib/useReducedMotion";
import { useLenis } from "../lib/SmoothScroll";
import { EASE_IN_OUT } from "../lib/motion";

/**
 * Branded intro loader: a counter races 0 → 100, then the panel wipes up to
 * reveal the hero. Skipped entirely under reduced-motion.
 */
export default function Preloader() {
  const reduced = useReducedMotion();
  const lenis = useLenis();
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(reduced);

  useEffect(() => {
    if (reduced) {
      setDone(true);
      return;
    }
    // Lock scroll while loading.
    lenis?.stop();
    document.body.style.overflow = "hidden";

    const duration = 1500;
    const start = performance.now();
    let raf;
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setCount(Math.round(eased * 100));
      if (t < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => setDone(true), 250);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduced, lenis]);

  useEffect(() => {
    if (done) {
      lenis?.start();
      document.body.style.overflow = "";
    }
  }, [done, lenis]);

  if (reduced) return null;

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-void"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: EASE_IN_OUT }}
        >
          <div className="flex flex-col items-center gap-6">
            <motion.div
              className="font-display font-extrabold text-white text-[40px] tracking-tight"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              kartar<span className="autonomous-gradient">AI</span>
            </motion.div>
            <div className="font-mono text-[13px] tracking-[0.3em] uppercase text-white/40 tabular-nums">
              {String(count).padStart(3, "0")}
            </div>
            <div className="w-40 h-[2px] bg-white/10 overflow-hidden rounded-full">
              <div
                className="h-full bg-saffron"
                style={{ width: `${count}%` }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
