import React from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

/**
 * Paginated list of products — Title + small subtitle only. The active item is
 * highlighted; clicking one selects it. A small pager (prev/next + segment bar)
 * sits directly below the items. Page changes do not change the selection.
 */
export default function ProjectList({
  items,
  activeIndex,
  onSelect,
  page,
  pageCount,
  onPage,
  perPage,
}) {
  const start = page * perPage;
  const slice = items.slice(start, start + perPage);

  return (
    <div className="flex flex-col">
      <div className="flex flex-col">
        {slice.map((p, i) => {
          const idx = start + i;
          const active = idx === activeIndex;
          return (
            <button
              key={p.name}
              onClick={() => onSelect(idx)}
              className={`text-left py-4 pl-5 border-l-2 transition-all bg-transparent ${
                active
                  ? "border-saffron"
                  : "border-white/10 hover:border-white/30"
              }`}
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
          );
        })}
      </div>

      {pageCount > 1 && (
        <div className="flex items-center gap-3 pl-5 mt-4">
          <button
            onClick={() => onPage(page - 1)}
            disabled={page === 0}
            aria-label="Previous page"
            className="text-white/50 hover:text-white disabled:opacity-30 disabled:hover:text-white/50 text-base bg-transparent shrink-0"
          >
            <HiChevronLeft />
          </button>
          <div className="flex flex-1 gap-1.5">
            {Array.from({ length: pageCount }).map((_, i) => (
              <button
                key={i}
                onClick={() => onPage(i)}
                aria-label={`Go to page ${i + 1}`}
                aria-current={i === page}
                className={`flex-1 h-1.5 rounded-full transition-colors ${
                  i === page ? "bg-saffron" : "bg-white/15 hover:bg-white/30"
                }`}
              />
            ))}
          </div>
          <button
            onClick={() => onPage(page + 1)}
            disabled={page === pageCount - 1}
            aria-label="Next page"
            className="text-white/50 hover:text-white disabled:opacity-30 disabled:hover:text-white/50 text-base bg-transparent shrink-0"
          >
            <HiChevronRight />
          </button>
        </div>
      )}
    </div>
  );
}
