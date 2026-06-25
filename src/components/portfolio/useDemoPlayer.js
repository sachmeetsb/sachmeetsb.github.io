import { useCallback, useEffect, useMemo, useRef, useState } from "react";

/**
 * Drives an interactive product demo inside the PhoneSimulator.
 *
 * Two modes, same `stops` data:
 *  - Video mode (demo.video set): plays the video and auto-pauses when
 *    currentTime reaches each stop's `t`, showing that stop's tooltip; a tap
 *    (advance) resumes. After the last stop the video plays to its end → 'ended'.
 *  - Placeholder mode (no video): a pure tap-through — the first tooltip shows
 *    immediately and each tap reveals the next, ending on 'ended'.
 */
export function useDemoPlayer(demo, reduced) {
  const videoRef = useRef(null);
  const stops = useMemo(() => demo?.stops ?? [], [demo]);
  const hasVideo = Boolean(demo?.video);
  const [stopIndex, setStopIndex] = useState(0);
  const [status, setStatus] = useState("paused"); // 'playing' | 'paused' | 'ended'

  // (Re)start whenever the active demo changes.
  useEffect(() => {
    setStopIndex(0);
    if (hasVideo) {
      const v = videoRef.current;
      if (v) {
        v.currentTime = 0;
        if (reduced) {
          v.pause();
          setStatus("paused");
        } else {
          v.play().catch(() => {});
          setStatus("playing");
        }
      }
    } else {
      // Placeholder walkthrough: first tooltip is visible immediately.
      setStatus("paused");
    }
  }, [demo, hasVideo, reduced]);

  const handleTimeUpdate = useCallback(() => {
    if (!hasVideo) return;
    const v = videoRef.current;
    if (!v) return;
    const next = stops[stopIndex];
    if (status === "playing" && next && v.currentTime >= next.t) {
      v.pause();
      setStatus("paused");
    }
  }, [hasVideo, stops, stopIndex, status]);

  const handleEnded = useCallback(() => setStatus("ended"), []);

  const advance = useCallback(() => {
    if (status === "ended") {
      setStopIndex(0);
      if (hasVideo) {
        const v = videoRef.current;
        if (v) {
          v.currentTime = 0;
          v.play().catch(() => {});
          setStatus("playing");
        }
      } else {
        setStatus("paused");
      }
      return;
    }
    if (status !== "paused") return;
    if (hasVideo) {
      setStopIndex((i) => i + 1);
      const v = videoRef.current;
      if (v) {
        v.play().catch(() => {});
        setStatus("playing");
      }
    } else {
      // Placeholder: step through tooltips manually.
      if (stopIndex >= stops.length - 1) setStatus("ended");
      else setStopIndex((i) => i + 1);
    }
  }, [status, stopIndex, stops.length, hasVideo]);

  const activeTip = status === "paused" ? stops[stopIndex]?.tip ?? null : null;

  return {
    videoRef,
    status,
    activeTip,
    stopIndex,
    hasVideo,
    advance,
    handleTimeUpdate,
    handleEnded,
    total: stops.length,
  };
}
