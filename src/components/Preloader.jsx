import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useAnimationControls } from "framer-motion";
import { useReducedMotion } from "../lib/useReducedMotion";
import { useLenis } from "../lib/SmoothScroll";
import { EASE_IN_OUT } from "../lib/motion";
import { ShaderAnimation } from "./ui/ShaderAnimation";

/**
 * Branded intro loader: a counter races 0 → 100, then the wordmark flies up to
 * the navbar logo's resting place while the backdrop fades, handing off
 * seamlessly to the real logo. Skipped entirely under reduced-motion.
 */
export default function Preloader() {
  const reduced = useReducedMotion();
  const lenis = useLenis();
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(reduced);
  const [morphing, setMorphing] = useState(false);

  const logoRef = useRef(null);
  const logoControls = useAnimationControls();

  // Entrance reveal for the wordmark.
  useEffect(() => {
    if (reduced) return;
    logoControls.start({ opacity: 1, y: 0, transition: { duration: 0.5 } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

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
      else setTimeout(() => runMorph(), 250);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced, lenis]);

  // Fly the intro wordmark onto the navbar logo, then hand off to the real one.
  const runMorph = () => {
    const source = logoRef.current;
    const target = document.getElementById("nav-logo-target");
    if (!source || !target) {
      window.dispatchEvent(new Event("preloader:done"));
      setDone(true);
      return;
    }
    const from = source.getBoundingClientRect();
    const to = target.getBoundingClientRect();
    setMorphing(true);
    logoControls
      .start({
        x: to.left - from.left,
        y: to.top - from.top,
        scale: to.width / from.width,
        transition: { duration: 0.9, ease: EASE_IN_OUT },
      })
      .then(() => {
        // Flying logo has landed exactly on the navbar slot — reveal the
        // real logo there before we fade out, for a seamless handoff.
        window.dispatchEvent(new Event("preloader:done"));
        setDone(true);
      });
  };

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
          className="fixed inset-0 z-[100] overflow-hidden pointer-events-none"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop: void, animated saffron shader, scrim — fades on handoff */}
          <motion.div
            className="absolute inset-0 bg-void"
            animate={{ opacity: morphing ? 0 : 1 }}
            transition={{ duration: 0.6, ease: EASE_IN_OUT }}
          >
            <ShaderAnimation className="absolute inset-0 w-full h-full" />
            <div className="absolute inset-0 bg-void/40" />
          </motion.div>

          {/* Centered intro stack */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
            {/* The flying wordmark — lands exactly on the navbar logo */}
            <motion.div
              ref={logoRef}
              className="font-display font-extrabold text-white text-[40px] tracking-tight will-change-transform"
              style={{ transformOrigin: "top left" }}
              initial={{ opacity: 0, y: 12 }}
              animate={logoControls}
            >
              kartar<span className="autonomous-gradient">AI</span>
            </motion.div>

            {/* Counter + progress — fade away as the wordmark flies off */}
            <motion.div
              className="flex flex-col items-center gap-6"
              animate={{ opacity: morphing ? 0 : 1 }}
              transition={{ duration: 0.3, ease: EASE_IN_OUT }}
            >
              <div className="font-mono text-[13px] tracking-[0.3em] uppercase text-white/40 tabular-nums">
                {String(count).padStart(3, "0")}
              </div>
              <div className="w-40 h-[2px] bg-white/10 overflow-hidden rounded-full">
                <div
                  className="h-full bg-saffron"
                  style={{ width: `${count}%` }}
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
