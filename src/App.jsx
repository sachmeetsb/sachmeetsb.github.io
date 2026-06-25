import React, { useCallback, useEffect, useRef, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FollowOrb from "./components/FollowOrb";
import { useVapiCall } from "./lib/useVapiCall";
import { getPageText, getCurrentView } from "./lib/pageContext";
// CustomsIQ demo hidden for now
// import ScrollScrubShowcase from "./components/ScrollScrubShowcase";
import LogoBar from "./components/LogoBar";
import Services from "./components/Services";
import Portfolio from "./components/Portfolio";
import CtaBanner from "./components/CtaBanner";
import IndustrySolutions from "./components/IndustrySolutions";
import WorkingProcess from "./components/WorkingProcess";
import Team from "./components/Team";
import Testimonials from "./components/Testimonials";
import Contact from "./components/ContactForm";
import Footer from "./components/Footer";
import Preloader from "./components/Preloader";
import CustomCursor from "./components/CustomCursor";

function App() {
  // The orb starts/stops a Vapi voice call. While active, the FollowOrb is the
  // live indicator that follows you across the page.
  const { status, speaking, start, stop, sendContext } = useVapiCall();
  const callActive = status === "active" || status === "connecting";
  const lastSectionRef = useRef(null);

  // The follower orb appears only once the hero is scrolled out of view — in
  // the hero, the hero blob itself represents the call.
  const [heroInView, setHeroInView] = useState(true);
  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;
    const obs = new IntersectionObserver(
      ([e]) => setHeroInView(e.isIntersecting),
      { threshold: 0 }
    );
    obs.observe(hero);
    return () => obs.disconnect();
  }, []);

  const handleOrbClick = useCallback(() => {
    if (callActive) {
      stop();
      return;
    }
    const view = getCurrentView();
    lastSectionRef.current = view.id;
    start({
      pageContent: getPageText(),
      currentSection: `${view.label} (${view.scrollPct}% down the page)`,
    });
  }, [callActive, start, stop]);

  // While a call is live, tell the agent when the user scrolls to a new section.
  useEffect(() => {
    if (status !== "active") return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const view = getCurrentView();
        if (view.id && view.id !== lastSectionRef.current) {
          lastSectionRef.current = view.id;
          sendContext(
            `The user just scrolled to the "${view.label}" section (${view.scrollPct}% down the page).`
          );
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [status, sendContext]);

  return (
    <div className="App relative min-h-screen bg-void">
      <Preloader />
      <CustomCursor />
      <div className="grain-overlay" aria-hidden="true" />
      {/* Background follower — only while a call is active and past the hero */}
      <FollowOrb
        active={callActive && !heroInView}
        speaking={speaking}
        onEnd={stop}
      />

      {/* Mobile call button — the desktop hero orb is hidden on small screens,
          so phones get a persistent floating orb to start/end the call. */}
      <button
        type="button"
        onClick={handleOrbClick}
        aria-label={callActive ? "End voice call" : "Talk to the assistant"}
        className="lg:hidden fixed bottom-5 right-5 z-40 flex items-center gap-3 rounded-pill bg-void/70 backdrop-blur-md border border-white/15 pl-2.5 pr-5 py-2.5 text-white"
      >
        <span
          className="w-9 h-9 rounded-full animate-pulse-slow shrink-0"
          style={{
            background:
              "radial-gradient(circle at 40% 38%, #FFAA70 0%, #FF7A35 40%, #FF5E0E 100%)",
            boxShadow: "0 0 24px rgba(255,94,14,0.5)",
          }}
        />
        <span className="font-mono text-[11px] tracking-[0.15em] uppercase">
          {callActive
            ? status === "connecting"
              ? "Connecting…"
              : speaking
              ? "Speaking…"
              : "Tap to end"
            : "Talk to Naina"}
        </span>
      </button>

      <Navbar />
      <main className="relative z-10">
        <Hero
          callActive={callActive}
          connecting={status === "connecting"}
          speaking={speaking}
          onOrbClick={handleOrbClick}
        />
        {/* CustomsIQ demo hidden for now */}
        {/* <ScrollScrubShowcase /> */}
        <LogoBar />
        <Services />
        <Portfolio />
        <IndustrySolutions />
        <CtaBanner />
        <WorkingProcess />
        <Team />
        <Testimonials />
        <Contact />
      </main>
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}

export default App;
