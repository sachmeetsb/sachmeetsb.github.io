import React, { useEffect, useRef, useState } from "react";
import Section from "./motion/Section";
import Reveal from "./motion/Reveal";
import { products } from "../data/portfolio";
import ProjectList from "./portfolio/ProjectList";
import PhoneSimulator from "./portfolio/PhoneSimulator";
import {pageForProduct, swipeDirection} from "../lib/productNavigation";

/** Follow catalogue order: five products on page 1, four on page 2, then the rest. */
function pageSizesFor(count) {
  const sizes = [];
  let remaining = count;
  for (const preferred of [5, 4]) {
    if (remaining <= 0) break;
    const take = Math.min(preferred, remaining);
    sizes.push(take);
    remaining -= take;
  }
  while (remaining > 0) {
    const take = Math.min(5, remaining);
    sizes.push(take);
    remaining -= take;
  }
  return sizes.length ? sizes : [count];
}
const PAGE_SIZES = pageSizesFor(products.length);
const pageStarts = PAGE_SIZES.reduce((acc, size, i) => {
  acc.push(i === 0 ? 0 : acc[i - 1] + PAGE_SIZES[i - 1]);
  return acc;
}, []);
const pageCount = PAGE_SIZES.length;
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
  const gesture = useRef(null);
  const suppressClick = useRef(false);
  const selectProduct = (index) => {
    const next = (index + products.length) % products.length;
    setActiveIndex(next);
    setPage(pageForProduct(next, pageStarts));
  };
  useEffect(() => {
    const select = event => {
      const index = products.findIndex(product => product.slug === event.detail);
      if (index < 0) return;
      setActiveIndex(index);
      setPage(pageForProduct(index, pageStarts));
      document.getElementById('portfolio')?.scrollIntoView({behavior:'auto', block:'start'});
    };
    window.addEventListener('portfolio:select', select);
    return () => window.removeEventListener('portfolio:select', select);
  }, []);

  const active = products[activeIndex];
  const isLandscape = active.demo?.orientation === "landscape";
  const changePage = (p) => {
    const nextPage = Math.max(0, Math.min(pageCount - 1, p));
    if (nextPage === page) return;
    setPage(nextPage);
    setActiveIndex(pageStarts[nextPage]);
  };

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
    <Section id="portfolio" className="pt-14 md:pt-20 pb-4" style={{touchAction:'pan-y pinch-zoom'}}
      onPointerDownCapture={event => {
        suppressClick.current = false;
        gesture.current = event.isPrimary && event.button === 0
          ? {id:event.pointerId,x:event.clientX,y:event.clientY,list:Boolean(event.target.closest('[data-product-list]'))} : null;
      }}
      onPointerMoveCapture={event => {
        if (gesture.current?.id === event.pointerId && swipeDirection(gesture.current,{x:event.clientX,y:event.clientY})) suppressClick.current = true;
      }}
      onPointerUpCapture={event => {
        const start = gesture.current;
        gesture.current = null;
        if (start?.id !== event.pointerId) return;
        const direction = swipeDirection(start,{x:event.clientX,y:event.clientY});
        if (direction) {
          suppressClick.current = true;
          if (start.list) changePage(page + direction);
          else selectProduct(activeIndex + direction);
        }
      }}
      onPointerCancelCapture={() => {gesture.current = null; suppressClick.current = false;}}
      onClickCapture={event => {
        if (suppressClick.current && event.detail !== 0) {event.preventDefault();event.stopPropagation();suppressClick.current = false;}
      }}>
      {/* Pill in its own row ; the grid below starts flush with its bottom, so
          a portrait phone's top lands exactly at the pill's ending. */}
      <Reveal className="mb-6">
        <span className="inline-block bg-saffron text-white rounded-pill px-6 py-2 font-display font-bold text-[22px] shadow-glow-saffron">
          Portfolio
        </span>
      </Reveal>

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,420px)_1fr] gap-10 items-start">
        {/* Left: heading + paginated list */}
        <div data-product-list role="region" aria-label="Product pages" tabIndex={0}
          className="min-w-0 select-none"
          onDragStart={event=>event.preventDefault()}
          onKeyDown={event=>{
            if(event.key==='ArrowLeft'||event.key==='ArrowRight') {
              event.preventDefault();changePage(page+(event.key==='ArrowRight'?1:-1));
            }
          }}>
          <h2
            ref={headingRef}
            className="font-display font-extrabold text-[32px] md:text-[40px] text-white leading-tight mb-10"
            style={{ letterSpacing: "-1px" }}
          >
            Products & projects
          </h2>

          <ProjectList
            items={products}
            activeIndex={activeIndex}
            onSelect={selectProduct}
            page={page}
            pageCount={pageCount}
            onPage={changePage}
            pageStart={pageStarts[page]}
            pageSize={PAGE_SIZES[page]}
          />
        </div>

        {/* One player at every breakpoint: no hidden duplicate playback. */}
        <div className="lg:pt-[var(--demo-offset)] min-w-0" style={{'--demo-offset':`${isLandscape ? headingOffset : 0}px`}}>
          <div className="flex items-center justify-between gap-3 mb-4">
            <button type="button" onClick={()=>selectProduct(activeIndex-1)} aria-label="Previous product demo" className="min-w-11 min-h-11 rounded-full border border-white/25 text-white">←</button>
            <p className="text-center text-white/70 text-sm" aria-live="polite">{active.name} · {activeIndex+1}/{products.length}<span className="block text-xs mt-1">Swipe anywhere in this product area</span></p>
            <button type="button" onClick={()=>selectProduct(activeIndex+1)} aria-label="Next product demo" className="min-w-11 min-h-11 rounded-full border border-white/25 text-white">→</button>
          </div>
          <div className="lg:hidden mb-4 pl-5">
            <h3 className="font-display font-bold text-[28px] text-white leading-tight">
              {active.name}
            </h3>
            <p className="font-display text-[15px] text-saffron-core">
              {active.tagline}
            </p>
            {active.frontendUrl && (
              <a
                href={active.frontendUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 mt-2 font-mono text-[11px] tracking-[0.12em] uppercase text-saffron-core"
              >
                Open app ↗
              </a>
            )}
          </div>
          <PhoneSimulator product={active} />
        </div>
      </div>
    </Section>
  );
}
