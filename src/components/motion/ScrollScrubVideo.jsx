import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  prefersReducedMotion,
  isMobileViewport,
} from "../../lib/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

/**
 * Scroll-scrubbed video — binds a muted <video>'s currentTime to scroll
 * progress so it plays forward as you scroll down and reverses as you scroll
 * up. For real AI/product clips. (Image sequence is smoother for hero set
 * pieces; this is the lightweight option when you already have a clip.)
 *
 * On reduced-motion / mobile it shows the poster (or a paused first frame).
 */
export default function ScrollScrubVideo({
  src,
  poster,
  scrollLength = 2,
  className = "",
  children,
}) {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const reduced = prefersReducedMotion() || isMobileViewport();
    if (reduced) return;

    let trigger;
    let duration = 0;

    const setup = () => {
      duration = video.duration || 0;
      trigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: `+=${window.innerHeight * scrollLength}`,
        pin: true,
        scrub: 0.6,
        onUpdate: (self) => {
          if (duration) {
            const t = self.progress * duration;
            // Seeking on every frame can stutter; requestVideoFrameCallback
            // would be smoother, but currentTime is the broadly-supported path.
            if (Math.abs(video.currentTime - t) > 0.01) video.currentTime = t;
          }
        },
      });
    };

    if (video.readyState >= 1) setup();
    else video.addEventListener("loadedmetadata", setup, { once: true });

    return () => trigger && trigger.kill();
  }, [scrollLength]);

  return (
    <section ref={sectionRef} className={`relative ${className}`}>
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="relative z-10 h-full">{children}</div>
    </section>
  );
}
