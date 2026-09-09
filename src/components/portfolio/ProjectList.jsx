import React from "react";
import { HiChevronLeft, HiChevronRight, HiExternalLink } from "react-icons/hi";

/**
 * Paginated list of products ; Title + small subtitle only. The active item is
 * highlighted; clicking one selects it. A small pager (prev/next + segment bar)
 * sits directly below the items. Page changes select the first visible product.
 */
export default function ProjectList({
  items,
  activeIndex,
  onSelect,
  page,
  pageCount,
  onPage,
  pageStart,
  pageSize,
}) {
  const start = pageStart;
  const slice = items.slice(start, start + pageSize);

  return (
    <div className="flex flex-col">
      <div className="flex flex-col">
        {slice.map((p, i) => {
          const idx = start + i;
          const active = idx === activeIndex;
          return (
            <div
              key={p.slug}
              className={`py-4 pl-5 border-l-2 transition-all ${
                active
                  ? "border-saffron"
                  : "border-white/10 hover:border-white/30"
              }`}
            >
              <button
                type="button"
                onClick={() => onSelect(idx)}
                aria-pressed={active}
                aria-label={`Show ${p.name} demo`}
                className="text-left bg-transparent w-full p-0"
              >
                <h3
                  className={`font-display font-bold text-[26px] md:text-[32px] leading-[1.05] transition-colors ${
                    active ? "text-white" : "text-white/55"
                  }`}
                >
                  {p.name}
                </h3>
                <p
                  className={`font-display text-[14px] mt-0.5 transition-colors ${
                    active ? "text-saffron-core" : "text-white/35"
                  }`}
                >
                  {p.tagline}
                </p>
              </button>
              {p.frontendUrl && (
                <a
                  href={p.frontendUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-1 mt-1.5 font-mono text-[11px] tracking-[0.12em] uppercase transition-colors ${
                    active
                      ? "text-saffron-core hover:text-white"
                      : "text-white/30 hover:text-white/60"
                  }`}
                >
                  Open app
                  <HiExternalLink aria-hidden className="text-[13px]" />
                </a>
              )}
            </div>
          );
        })}
      </div>

      {pageCount > 1 && (
        <div className="flex items-center gap-3 pl-5 mt-4">
          <button
            onClick={() => onPage(page - 1)}
            disabled={page === 0}
            aria-label="Previous page"
            className="w-11 h-11 flex items-center justify-center text-white/70 hover:text-white disabled:opacity-30 text-base bg-transparent shrink-0"
          >
            <HiChevronLeft />
          </button>
          <div className="flex flex-1 gap-1.5">
            {Array.from({ length: pageCount }).map((_, i) => (
              <button
                key={i}
                onClick={() => onPage(i)}
                aria-label={`Go to page ${i + 1}`}
                aria-current={i === page ? "true" : undefined}
                className="flex-1 min-h-11 flex items-center"
              ><span aria-hidden="true" className={`w-full h-1.5 rounded-full ${i === page ? 'bg-saffron' : 'bg-white/25'}`} /></button>
            ))}
          </div>
          <button
            onClick={() => onPage(page + 1)}
            disabled={page === pageCount - 1}
            aria-label="Next page"
            className="w-11 h-11 flex items-center justify-center text-white/70 hover:text-white disabled:opacity-30 text-base bg-transparent shrink-0"
          >
            <HiChevronRight />
          </button>
        </div>
      )}
    </div>
  );
}
