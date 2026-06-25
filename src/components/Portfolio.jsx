import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Section from "./motion/Section";
import Reveal from "./motion/Reveal";
import { EASE_IN_OUT } from "../lib/motion";
import { products } from "../data/portfolio";
import ProjectList from "./portfolio/ProjectList";
import PhoneSimulator from "./portfolio/PhoneSimulator";

const PER_PAGE = 4;
const pageCount = Math.ceil(products.length / PER_PAGE);
const H2_MARGIN_BOTTOM = 40; // matches `mb-10` on the heading

/**
 * Permanent split: a paginated project list (left) and an always-on iPhone
 * simulator (right) that plays each product's interactive demo. Selecting a
 * product loads its demo into the phone; scrolling is plain page scroll.
 *
 * Portrait demos top-align with the Portfolio pill; landscape demos (which are
 * short, 16:9) are pushed down to start at the top of the first list item.
 */
export default function Portfolio() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [page, setPage] = useState(0);

  const active = products[activeIndex];
  const isLandscape = active.demo?.orientation === "landscape";
  const changePage = (p) => setPage(Math.max(0, Math.min(pageCount - 1, p)));

  // Measure the heading so a landscape phone can drop to the first list item
  // (the list starts right below the heading).
  const headingRef = useRef(null);
  const [headingOffset, setHeadingOffset] = useState(0);
  useEffect(() => {
    const el = headingRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() =>
      setHeadingOffset(el.offsetHeight + H2_MARGIN_BOTTOM)
    );
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <Section id="portfolio" className="pt-14 md:pt-20 pb-4">
      {/* Pill in its own row — the grid below starts flush with its bottom, so
          a portrait phone's top lands exactly at the pill's ending. */}
      <Reveal className="mb-6">
        <span className="inline-block bg-saffron text-white rounded-pill px-6 py-2 font-display font-bold text-[22px] shadow-glow-saffron">
          Portfolio
        </span>
      </Reveal>

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,420px)_1fr] gap-10 items-start">
        {/* Left: heading + paginated list */}
        <div>
          <h2
            ref={headingRef}
            className="font-display font-extrabold text-[32px] md:text-[40px] text-white leading-tight mb-10"
            style={{ letterSpacing: "-1px" }}
          >
            Products we've{" "}
            <span className="autonomous-gradient">actually shipped</span>
          </h2>

          <ProjectList
            items={products}
            activeIndex={activeIndex}
            onSelect={setActiveIndex}
            page={page}
            pageCount={pageCount}
            onPage={changePage}
            perPage={PER_PAGE}
          />
        </div>

        {/* Desktop: docked phone on the right. Portrait sits at the pill;
            landscape drops to the first list item via animated padding. */}
        <motion.div
          className="hidden lg:block"
          animate={{ paddingTop: isLandscape ? headingOffset : 0 }}
          transition={{ duration: 0.6, ease: EASE_IN_OUT }}
        >
          <PhoneSimulator product={active} />
        </motion.div>

        {/* Mobile: title above, full-width demo below (no frame) */}
        <div className="lg:hidden">
          <div className="mb-4 pl-5">
            <h3 className="font-display font-bold text-[28px] text-white leading-tight">
              {active.name}
            </h3>
            <p className="font-display text-[15px] text-saffron-core">
              {active.tagline}
            </p>
          </div>
          <PhoneSimulator product={active} />
        </div>
      </div>
    </Section>
  );
}
