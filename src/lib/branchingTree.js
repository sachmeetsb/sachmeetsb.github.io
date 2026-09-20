export const FRAME_MS = 1000 / 20;
export const CYCLE_SECONDS = 18;
const STRIDE = 5; // start x/y, end x/y, depth
const MAX_LINE_WIDTH = 3;

// Separate full-grown envelopes, not just trunks. Geometry only changes on
// resize/regrowth, so canopies stay apart even while neighbours grow out of phase.
export function canopyGap(width, roots) {
  const lane = width / roots;
  return Math.min(lane * 0.3, Math.max(24, Math.min(72, lane * 0.12)));
}

export function treeBudget(width, height) {
  return {
    scale: Math.min(1, Math.sqrt(777000 / Math.max(1, width * height))),
    roots: width < 768 ? 2 : 3,
    depth: width < 768 ? 5 : 6,
  };
}

function growTree(tree, field, index, random) {
  let cursor = 0;
  let minX = Infinity, maxX = -Infinity;
  const forkStyle = 0.34 + random() * 0.16;
  const shrinkStyle = 0.67 + random() * 0.06;
  const add = (x, y, angle, length, depth) => {
    const endX = x + Math.cos(angle) * length;
    const endY = y + Math.sin(angle) * length;
    tree.branches.set([x, y, endX, endY, depth], cursor * STRIDE);
    minX = Math.min(minX, x, endX);
    maxX = Math.max(maxX, x, endX);
    cursor++;
    if (depth >= field.depth) return;
    // Independent siblings break mirror symmetry without jittering during growth.
    const leftFork = forkStyle + (random() - 0.5) * 0.16;
    const rightFork = forkStyle + (random() - 0.5) * 0.16;
    const leftShrink = shrinkStyle + (random() - 0.5) * 0.06;
    const rightShrink = shrinkStyle + (random() - 0.5) * 0.06;
    add(endX, endY, angle - leftFork, length * leftShrink, depth + 1);
    add(endX, endY, angle + rightFork, length * rightShrink, depth + 1);
  };
  const lane = field.width / field.trees.length;
  const length = field.height * (0.22 + random() * 0.05);
  add(0, field.height * 1.02, -Math.PI / 2 + (random() - 0.5) * 0.28, length, 0);

  // Fit the whole silhouette into its lane once. A little width/position variation
  // keeps the forest irregular; the gap includes stroke caps and rounding slack.
  const available = Math.max(1, lane - canopyGap(field.width, field.trees.length) - MAX_LINE_WIDTH - 2);
  const scaleX = Math.min(1, available * (0.86 + random() * 0.12) / Math.max(1, maxX - minX));
  const span = (maxX - minX) * scaleX;
  const center = lane * (index + 0.5) + (random() - 0.5) * (available - span) * 0.6;
  const midpoint = (minX + maxX) / 2;
  const b = tree.branches;
  for (let i = 0; i < b.length; i += STRIDE) {
    b[i] = center + (b[i] - midpoint) * scaleX;
    b[i + 2] = center + (b[i + 2] - midpoint) * scaleX;
  }
}

export function createForest(width, height, random = Math.random) {
  const {roots, depth} = treeBudget(width, height);
  const count = 2 ** (depth + 1) - 1;
  const field = {width, height, depth, trees: Array.from({length: roots}, (_, index) => ({
    branches: new Float32Array(count * STRIDE),
    age: 3 + index * 4,
    generation: 0,
  }))};
  field.trees.forEach((tree, index) => growTree(tree, field, index, random));
  return field;
}

export function stepForest(field, seconds, random = Math.random) {
  const elapsed = Math.max(0, Math.min(seconds, 0.1));
  field.trees.forEach((tree, index) => {
    tree.age += elapsed;
    if (tree.age >= CYCLE_SECONDS) {
      tree.age -= CYCLE_SECONDS;
      tree.generation++;
      // Reuse the same bounded storage: an endless effect, not an endless tree in memory.
      growTree(tree, field, index, random);
    }
  });
}

export function drawForest(ctx, field) {
  ctx.clearRect(0, 0, field.width, field.height);
  ctx.lineCap = 'round';
  field.trees.forEach((tree, index) => {
    const alpha = Math.min(1, tree.age / 1.5, (CYCLE_SECONDS - tree.age) / 4);
    ctx.globalAlpha = Math.max(0, alpha);
    ctx.strokeStyle = index % 2 ? 'rgba(255,170,112,0.23)' : 'rgba(212,200,255,0.30)';
    // Batch each depth into a single stroke; no filters, shadows or per-frame geometry.
    for (let depth = 0; depth <= field.depth; depth++) {
      const progress = Math.max(0, Math.min(1, (tree.age - depth * 1.3) / 1.3));
      if (!progress) continue;
      ctx.lineWidth = Math.max(1.4, MAX_LINE_WIDTH - depth * 0.24);
      ctx.beginPath();
      const b = tree.branches;
      for (let i = 0; i < b.length; i += STRIDE) {
        if (b[i + 4] !== depth) continue;
        ctx.moveTo(b[i], b[i + 1]);
        ctx.lineTo(b[i] + (b[i + 2] - b[i]) * progress, b[i + 1] + (b[i + 3] - b[i + 1]) * progress);
      }
      ctx.stroke();
    }
  });
  ctx.globalAlpha = 1;
}

export function attachBranchingTree(canvas, {paused = false, environment = window} = {}) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return () => {};
  const env = environment;
  let motionPaused = paused;
  let field, frame = null, timer = null, visible = false, last = null, disposed = false;
  const allowed = () => !disposed && !motionPaused && visible && !env.document.hidden && field;
  const stop = () => {
    if (frame !== null) env.cancelAnimationFrame(frame);
    if (timer !== null) env.clearTimeout(timer);
    frame = timer = last = null;
  };
  const tick = now => {
    frame = null;
    if (!allowed()) return;
    stepForest(field, last === null ? FRAME_MS / 1000 : (now - last) / 1000);
    last = now;
    drawForest(ctx, field);
    timer = env.setTimeout(() => {
      timer = null;
      if (allowed()) frame = env.requestAnimationFrame(tick);
    }, FRAME_MS);
  };
  const sync = () => {
    if (!allowed()) stop();
    else if (frame === null && timer === null) frame = env.requestAnimationFrame(tick);
  };
  const resize = () => {
    const {width, height} = canvas.getBoundingClientRect();
    if (!width || !height) { field = null; stop(); return; }
    const {scale} = treeBudget(width, height);
    canvas.width = Math.max(1, Math.floor(width * scale));
    canvas.height = Math.max(1, Math.floor(height * scale));
    ctx.setTransform(canvas.width / width, 0, 0, canvas.height / height, 0, 0);
    field = createForest(width, height);
    drawForest(ctx, field);
    sync();
  };
  const size = new env.ResizeObserver(resize);
  const intersection = new env.IntersectionObserver(entries => {
    visible = entries[0].isIntersecting;
    sync();
  }, {threshold: 0});
  size.observe(canvas);
  intersection.observe(canvas);
  env.document.addEventListener('visibilitychange', sync);
  resize();
  const dispose = () => {
    disposed = true;
    stop();
    size.disconnect();
    intersection.disconnect();
    env.document.removeEventListener('visibilitychange', sync);
  };
  dispose.setPaused = value => { motionPaused = value; sync(); };
  return dispose;
}
