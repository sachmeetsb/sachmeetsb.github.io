export function pageForProduct(index, starts) {
  return Math.max(0, starts.findLastIndex(start => start <= index));
}

// Leave vertical scrolling, small taps and multi-touch gestures to the browser.
export function swipeDirection(start, end) {
  if (!start || !end) return 0;
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  return Math.abs(dx) >= 48 && Math.abs(dx) > Math.abs(dy) * 1.5
    ? (dx < 0 ? 1 : -1) : 0;
}
