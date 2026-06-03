import React, { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "../../lib/useReducedMotion";

/**
 * Lazy, looping product/AI clip. Only loads + plays when scrolled into view
 * (IntersectionObserver), loops muted inline, and shows the poster still when
 * reduced-motion is preferred or before it enters view.
 *
 * Convention (see MEDIA.md): public/media/<name>.{webm,mp4} + <name>.jpg poster.
 *   <MediaLoop name="agent-triage" />
 * or pass explicit sources:
 *   <MediaLoop webm="/media/x.webm" mp4="/media/x.mp4" poster="/media/x.jpg" />
 */
export default function MediaLoop({
  name,
  webm,
  mp4,
  poster,
  className = "",
  aspclassName = "aspect-video",
  alt = "",
}) {
  const reduced = useReducedMotion();
  const ref = useRef(null);
  const videoRef = useRef(null);
  const [inView, setInView] = useState(false);

  const srcWebm = webm || (name ? `/media/${name}.webm` : null);
  const srcMp4 = mp4 || (name ? `/media/${name}.mp4` : null);
  const srcPoster = poster || (name ? `/media/${name}.jpg` : undefined);

  useEffect(() => {
    if (reduced || !ref.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        const v = videoRef.current;
        if (!v) return;
        if (entry.isIntersecting) v.play?.().catch(() => {});
        else v.pause?.();
      },
      { threshold: 0.25 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [reduced]);

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden rounded-card bg-surface-mid ${aspclassName} ${className}`}
    >
      {reduced || !(srcWebm || srcMp4) ? (
        srcPoster ? (
          <img
            src={srcPoster}
            alt={alt}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : null
      ) : (
        <video
          ref={videoRef}
          poster={srcPoster}
          muted
          loop
          playsInline
          preload={inView ? "auto" : "none"}
          className="absolute inset-0 w-full h-full object-cover"
        >
          {inView && srcWebm && <source src={srcWebm} type="video/webm" />}
          {inView && srcMp4 && <source src={srcMp4} type="video/mp4" />}
        </video>
      )}
    </div>
  );
}
