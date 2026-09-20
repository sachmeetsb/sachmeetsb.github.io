// One subdivision only: 20 cubes, 72 exposed quads. No WebGL or animation library.
export const SPONGE_PIXEL_CAP = 777000;
export const SPONGE_FRAME_MS = 1000 / 20;
export const REST_ROTATION = Object.freeze({yaw: -0.52, pitch: -0.34});
const SETTLE_EPSILON = 0.0005;
const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

export function spongeResolution(width, height) {
  const scale = Math.min(1, Math.sqrt(SPONGE_PIXEL_CAP / Math.max(1, width * height)));
  return {width: Math.max(1, Math.floor(width * scale)), height: Math.max(1, Math.floor(height * scale))};
}

export function createMengerMesh() {
  const cubes = [];
  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      for (let z = -1; z <= 1; z++) {
        if (Number(x === 0) + Number(y === 0) + Number(z === 0) < 2) cubes.push([x, y, z]);
      }
    }
  }
  const occupied = new Set(cubes.map(cell => cell.join(',')));
  const faces = [], vertices = [], vertexIndices = new Map();
  const cornerSigns = [[-1, -1], [1, -1], [1, 1], [-1, 1]];
  for (const cell of cubes) {
    for (let axis = 0; axis < 3; axis++) {
      for (const sign of [-1, 1]) {
        const neighbour = [...cell];
        neighbour[axis] += sign;
        if (occupied.has(neighbour.join(','))) continue;
        const normal = [0, 0, 0];
        normal[axis] = sign;
        const indices = cornerSigns.map(([a, b]) => {
          const point = [...cell];
          point[axis] += sign * 0.5;
          point[(axis + 1) % 3] += a * 0.5;
          point[(axis + 2) % 3] += b * 0.5;
          const key = point.join(',');
          if (!vertexIndices.has(key)) {
            vertexIndices.set(key, vertices.length / 3);
            vertices.push(...point);
          }
          return vertexIndices.get(key);
        });
        faces.push({indices, normal, axis, sign});
      }
    }
  }
  return {cubes, faces, vertices: new Float32Array(vertices)};
}

// A real sphere in model space, sharing the cube's rotation and projection.
export function createCoreMesh(radius = 0.23, rings = 12, segments = 24) {
  const vertices = [], faces = [];
  for (let ring = 0; ring <= rings; ring++) {
    const latitude = Math.PI * ring / rings;
    for (let segment = 0; segment < segments; segment++) {
      const longitude = Math.PI * 2 * segment / segments;
      vertices.push(radius * Math.sin(latitude) * Math.cos(longitude),
        radius * Math.cos(latitude), radius * Math.sin(latitude) * Math.sin(longitude));
    }
  }
  for (let ring = 0; ring < rings; ring++) for (let segment = 0; segment < segments; segment++) {
    const next = (segment + 1) % segments;
    const indices = [ring * segments + segment, ring * segments + next,
      (ring + 1) * segments + next, (ring + 1) * segments + segment];
    const normal = [0, 0, 0];
    for (const index of indices) for (let axis = 0; axis < 3; axis++) normal[axis] += vertices[index * 3 + axis];
    const length = Math.hypot(...normal);
    faces.push({indices, normal: normal.map(value => value / length), core: true});
  }
  return {vertices: new Float32Array(vertices), faces};
}

export function createSpongeScene(width, height) {
  const mesh = createMengerMesh();
  const core = createCoreMesh();
  const vertices = new Float32Array(mesh.vertices.length + core.vertices.length);
  vertices.set(mesh.vertices); vertices.set(core.vertices, mesh.vertices.length);
  const offset = mesh.vertices.length / 3;
  const coreFaces = core.faces.map(face => ({...face, indices: face.indices.map(index => index + offset)}));
  return {
    width, height, mesh, vertices,
    projected: new Float32Array(vertices.length),
    // Reuse the same tiny sort buffer and face records during mouse movement.
    visibleFaces: [],
    faceRecords: [...mesh.faces, ...coreFaces].map(face => ({face, depth: 0, light: 0})),
  };
}

export function pointerRotation(x, y) {
  return {
    yaw: REST_ROTATION.yaw + (clamp(x, 0, 1) - 0.5) * Math.PI * 2,
    pitch: REST_ROTATION.pitch + (clamp(y, 0, 1) - 0.5) * Math.PI * 2,
  };
}

export const CORE_PULSE_MS = 3000;
export function corePulse(time) {
  return (1 - Math.cos(2 * Math.PI * time / CORE_PULSE_MS)) / 2;
}

export function drawSponge(ctx, scene, rotation, pulse = 0) {
  const {width, height, vertices, projected, visibleFaces, faceRecords} = scene;
  const cy = Math.cos(rotation.yaw), sy = Math.sin(rotation.yaw);
  const cp = Math.cos(rotation.pitch), sp = Math.sin(rotation.pitch);
  // Orthographic projection: a flat canvas view, with no perspective distortion.
  const scale = Math.min(width * 0.84, height * 0.88, 850) / 5.2;
  const centerX = width * (width >= 1024 ? 0.56 : 0.74);
  const centerY = Math.min(height * 0.48, 510);
  for (let i = 0; i < vertices.length; i += 3) {
    const x = vertices[i], y = vertices[i + 1], z = vertices[i + 2];
    const rx = x * cy + z * sy, rz = z * cy - x * sy;
    projected[i] = centerX + rx * scale;
    projected[i + 1] = centerY - (y * cp - rz * sp) * scale;
    projected[i + 2] = y * sp + rz * cp;
  }
  visibleFaces.length = 0;
  for (const record of faceRecords) {
    const {indices, normal} = record.face;
    const nx = normal[0] * cy + normal[2] * sy;
    const rz = normal[2] * cy - normal[0] * sy;
    const ny = normal[1] * cp - rz * sp;
    const nz = normal[1] * sp + rz * cp;
    if (nz <= 0.00001) continue;
    record.depth = (projected[indices[0] * 3 + 2] + projected[indices[1] * 3 + 2]
      + projected[indices[2] * 3 + 2] + projected[indices[3] * 3 + 2]) / 4;
    record.light = clamp(nx * -0.35 + ny * 0.65 + nz * 0.68, 0, 1);
    visibleFaces.push(record);
  }
  visibleFaces.sort((a, b) => a.depth - b.depth);
  ctx.clearRect(0, 0, width, height);
  ctx.lineWidth = 1.15;
  ctx.lineJoin = 'round';
  for (const {face, light} of visibleFaces) {
    // Keep the scaffold subdued while allowing a fully saturated orange core.
    ctx.fillStyle = face.core
      ? `rgb(255, ${Math.round(76 + light * 85 + pulse * 26)}, ${Math.round(10 + light * 90 + pulse * 32)})`
      : `rgb(${Math.round(45 + light * 15)}, ${Math.round(28 + light * 12)}, ${Math.round(101 + light * 24)})`;
    ctx.strokeStyle = face.core ? ctx.fillStyle : face.axis === 1 && face.sign > 0 ? 'rgba(206,172,182,0.4)' : 'rgba(162,151,208,0.4)';
    ctx.lineWidth = face.core ? 0.6 : 1.15;
    ctx.beginPath();
    face.indices.forEach((index, corner) => {
      const i = index * 3;
      if (corner === 0) ctx.moveTo(projected[i], projected[i + 1]);
      else ctx.lineTo(projected[i], projected[i + 1]);
    });
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }
  return visibleFaces.filter(record => !record.face.core).length;
}

export function attachMengerSponge(canvas, {paused = false, pulse = true, pulseTime, environment = window} = {}) {
  const ctx = canvas?.getContext('2d');
  const host = canvas?.parentElement;
  if (!ctx || !host) return () => {};
  const env = environment;
  const rotation = {...REST_ROTATION};
  let target = {...rotation};
  let drag = null, frozenPulse = 0;
  const originalTouchAction = host.style?.touchAction || "";
  const originalCursor = host.style?.cursor || "";
  const originalSelection = host.style?.userSelect || "";
  let scene, rect, frame = null, timer = null;
  let visible = false, disposed = false, motionPaused = paused, rectDirty = false;
  const moving = () => Math.abs(target.yaw - rotation.yaw) > SETTLE_EPSILON
    || Math.abs(target.pitch - rotation.pitch) > SETTLE_EPSILON;
  const allowed = () => !disposed && !motionPaused && visible && !env.document.hidden && scene;
  const stop = () => {
    if (frame !== null) env.cancelAnimationFrame(frame);
    if (timer !== null) env.clearTimeout(timer);
    frame = timer = null;
  };
  const pulseValue = () => {
    if (!motionPaused) frozenPulse = pulse ? corePulse(pulseTime?.() ?? env.performance?.now() ?? 0) : 0;
    return frozenPulse;
  };
  const endDrag = () => {
    const previous = drag;
    drag = null;
    if (previous && host.hasPointerCapture?.(previous.id)) host.releasePointerCapture?.(previous.id);
    if (host.style) { host.style.cursor = motionPaused ? 'grab' : originalCursor; host.style.userSelect = originalSelection; }
  };
  const pointerDown = event => {
    if (!motionPaused || disposed || !visible || env.document.hidden || !scene || drag || event.button !== 0 || event.isPrimary === false) return;
    if (event.target?.closest?.('a, button, input, textarea, select, summary, [role="button"]')) return;
    drag = {id:event.pointerId, x:event.clientX, y:event.clientY, yaw:rotation.yaw, pitch:rotation.pitch};
    host.setPointerCapture?.(event.pointerId);
    if (host.style) { host.style.cursor = 'grabbing'; host.style.userSelect = 'none'; }
  };
  const pointerUp = event => { if (drag?.id === event.pointerId) endDrag(); };
  const tick = () => {
    frame = null;
    if (!allowed()) return;
    rotation.yaw += (target.yaw - rotation.yaw) * 0.28;
    rotation.pitch += (target.pitch - rotation.pitch) * 0.28;
    if (!moving()) Object.assign(rotation, target);
    drawSponge(ctx, scene, rotation, pulseValue());
    if (pulse || moving()) timer = env.setTimeout(() => {
      timer = null;
      if (allowed()) frame = env.requestAnimationFrame(tick);
    }, SPONGE_FRAME_MS);
  };
  const sync = () => {
    if (!allowed() || (!pulse && !moving())) stop();
    else if (frame === null && timer === null) frame = env.requestAnimationFrame(tick);
  };
  const resize = () => {
    if (disposed) return;
    rect = host.getBoundingClientRect();
    const {width, height} = rect;
    if (!width || !height) { scene = null; stop(); return; }
    const resolution = spongeResolution(width, height);
    canvas.width = resolution.width;
    canvas.height = resolution.height;
    ctx.setTransform(canvas.width / width, 0, 0, canvas.height / height, 0, 0);
    scene = createSpongeScene(width, height);
    drawSponge(ctx, scene, rotation, pulseValue());
    sync();
  };
  const refreshRect = () => { rect = host.getBoundingClientRect(); rectDirty = false; };
  const invalidateRect = () => { rectDirty = true; };
  const pointerMove = event => {
    if (motionPaused) {
      if (!drag || drag.id !== event.pointerId || disposed || !visible || env.document.hidden) return;
      rotation.yaw = drag.yaw + (event.clientX - drag.x) * 0.008;
      rotation.pitch = clamp(drag.pitch + (event.clientY - drag.y) * 0.008, -Math.PI / 2, Math.PI / 2);
      target = {...rotation};
      if (frame === null) frame = env.requestAnimationFrame(() => {
        frame = null;
        if (!disposed && visible && !env.document.hidden && scene) drawSponge(ctx, scene, rotation, pulseValue());
      });
      return;
    }
    // Never capture touch gestures or prevent their default scrolling behaviour.
    if (event.pointerType !== 'mouse' || !allowed() || !rect?.width || !rect?.height) return;
    if (rectDirty) refreshRect();
    target = pointerRotation((event.clientX - rect.left) / rect.width, (event.clientY - rect.top) / rect.height);
    sync();
  };
  const suspend = () => {
    // Do not replay old input after a tab switch, scroll-away or explicit pause.
    target = {...rotation};
    endDrag();
    stop();
  };
  const visibilityChange = () => { if (env.document.hidden) suspend(); else sync(); };
  const size = new env.ResizeObserver(resize);
  const intersection = new env.IntersectionObserver(entries => {
    visible = entries[0].isIntersecting;
    if (!visible) suspend(); else sync();
  }, {threshold: 0});
  size.observe(host);
  intersection.observe(host);
  host.addEventListener('pointerenter', refreshRect, {passive: true});
  host.addEventListener('pointermove', pointerMove, {passive: true});
  host.addEventListener('pointerdown', pointerDown, {passive: true});
  host.addEventListener('pointerup', pointerUp, {passive: true});
  host.addEventListener('pointercancel', pointerUp, {passive: true});
  host.addEventListener('lostpointercapture', pointerUp, {passive: true});
  // Scrolling only invalidates the cached rect. Refresh lazily on the next mouse
  // input, with no layout reads or renders caused by the scroll listener itself.
  env.addEventListener('scroll', invalidateRect, {passive: true});
  env.document.addEventListener('visibilitychange', visibilityChange);
  resize();
  const dispose = () => {
    disposed = true;
    endDrag();
    if (host.style) { host.style.touchAction = originalTouchAction; host.style.cursor = originalCursor; }
    stop();
    size.disconnect();
    intersection.disconnect();
    host.removeEventListener('pointerenter', refreshRect);
    host.removeEventListener('pointermove', pointerMove);
    host.removeEventListener('pointerdown', pointerDown);
    host.removeEventListener('pointerup', pointerUp);
    host.removeEventListener('pointercancel', pointerUp);
    host.removeEventListener('lostpointercapture', pointerUp);
    env.removeEventListener('scroll', invalidateRect);
    env.document.removeEventListener('visibilitychange', visibilityChange);
  };
  dispose.setPaused = value => {
    endDrag();
    motionPaused = value;
    if (host.style) { host.style.touchAction = value ? "pan-y pinch-zoom" : originalTouchAction; host.style.cursor = value ? "grab" : originalCursor; }
    if (value) suspend(); else sync();
  };
  return dispose;
}
