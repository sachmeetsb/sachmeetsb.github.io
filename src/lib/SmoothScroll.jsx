import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "./useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

const LenisContext = createContext(null);

/** Access the live Lenis instance (e.g. for nav scrollTo). May be null early. */
export function useLenis() {
  return useContext(LenisContext);
}

/**
 * Smooth-scroll engine. Wraps the app, drives Lenis from the GSAP ticker so
 * GSAP + Lenis share one RAF loop, and keeps ScrollTrigger in sync.
 * Disabled (native scroll) when the user prefers reduced motion.
 */
export default function SmoothScroll({ children }) {
  const [lenis, setLenis] = useState(null);
  const lenisRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) {
      // Native scrolling; ScrollTrigger still works off the window.
      ScrollTrigger.refresh();
      return;
    }

    const instance = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });
    lenisRef.current = instance;
    setLenis(instance);
    if (import.meta.env.DEV && typeof window !== "undefined")
      window.__lenis = instance;

    instance.on("scroll", ScrollTrigger.update);

    const tick = (time) => instance.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Re-measure once fonts/images settle.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);

    return () => {
      gsap.ticker.remove(tick);
      instance.off("scroll", ScrollTrigger.update);
      window.removeEventListener("load", refresh);
      instance.destroy();
      lenisRef.current = null;
      setLenis(null);
    };
  }, []);

  return (
    <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
  );
}
