import React, { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "../../lib/useReducedMotion";

/**
 * Animated number counter. Accepts a full stat string (e.g. "99.3% accuracy",
 * "10x throughput", "60+ processes"), animates the first number from 0 → target
 * when scrolled into view, and preserves the surrounding text. Strings without
 * a number render as-is.
 */
export default function CountUp({ value, className = "", duration = 1500 }) {
  const reduced = useReducedMotion();
  const ref = useRef(null);
  const [display, setDisplay] = useState(value);
  const startedRef = useRef(false);

  const match = String(value).match(/(\d[\d,]*\.?\d*)/);

  useEffect(() => {
    if (reduced || !match) {
      setDisplay(value);
      return;
    }
    const el = ref.current;
    if (!el) return;

    const raw = match[1].replace(/,/g, "");
    const target = parseFloat(raw);
    const decimals = raw.includes(".") ? raw.split(".")[1].length : 0;
    const prefix = value.slice(0, match.index);
    const suffix = value.slice(match.index + match[1].length);

    const render = (n) =>
      `${prefix}${n.toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}${suffix}`;

    setDisplay(render(0));

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || startedRef.current) return;
        startedRef.current = true;
        const start = performance.now();
        const step = (now) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
          setDisplay(render(target * eased));
          if (t < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value, reduced, duration]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
