import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {
  CORE_PULSE_MS, corePulse, SPONGE_PIXEL_CAP, SPONGE_FRAME_MS, REST_ROTATION, spongeResolution,
  createMengerMesh, createCoreMesh, createSpongeScene, pointerRotation, drawSponge, attachMengerSponge,
} from '../src/lib/mengerSponge.js';

test('one Menger iteration keeps exactly 20 cubes and all three tunnels open', () => {
  const mesh = createMengerMesh();
  assert.equal(mesh.cubes.length, 20);
  assert.equal(new Set(mesh.cubes.map(cube => cube.join(','))).size, 20);
  for (const cube of mesh.cubes) {
    assert.ok(cube.filter(coordinate => coordinate === 0).length < 2);
    assert.ok(cube.every(coordinate => [-1, 0, 1].includes(coordinate)));
  }
  assert.equal(mesh.faces.length, 72, 'all internal neighbouring faces are removed');
  for (const {indices, normal} of mesh.faces) {
    assert.equal(new Set(indices).size, 4);
    const center = [0, 0, 0];
    for (const index of indices) for (let axis = 0; axis < 3; axis++) center[axis] += mesh.vertices[index * 3 + axis] / 4;
    const inside = center.map((value, axis) => value - normal[axis] * 0.5);
    const outside = center.map((value, axis) => value + normal[axis] * 0.5);
    assert.ok(mesh.cubes.some(cube => cube.join(',') === inside.join(',')));
    assert.ok(!mesh.cubes.some(cube => cube.join(',') === outside.join(',')));
  }
});

test('canvas backing store stays within 777,000 pixels without retina upscaling', () => {
  for (const [width, height] of [[320,1600], [390,844], [812,700], [1440,900], [3840,2160], [6000,3000]]) {
    const resolution = spongeResolution(width, height);
    assert.ok(resolution.width <= width && resolution.height <= height);
    assert.ok(resolution.width * resolution.height <= SPONGE_PIXEL_CAP);
    assert.ok(resolution.width > 0 && resolution.height > 0);
  }
});

function context() {
  return {draws: 0, fills: 0, strokes: 0,
    clearRect() { this.draws++; }, setTransform() {}, beginPath() {},
    moveTo() {}, lineTo() {}, closePath() {},
    arc() {}, createRadialGradient() { return {addColorStop() {}}; },
    fill() { this.fills++; }, stroke() { this.strokes++; },
  };
}

test('projection reuses geometry and draws at most 36 faces at every mouse angle', () => {
  const scene = createSpongeScene(1440, 900), ctx = context();
  const original = scene.mesh.vertices.slice(), projected = scene.projected, records = [...scene.faceRecords];
  for (let x = 0; x <= 10; x++) for (let y = 0; y <= 10; y++) {
    const count = drawSponge(ctx, scene, pointerRotation(x / 10, y / 10));
    assert.ok(count > 0 && count <= 36);
    assert.ok(scene.projected.every(Number.isFinite));
    for (let i = 1; i < scene.visibleFaces.length; i++) assert.ok(scene.visibleFaces[i - 1].depth <= scene.visibleFaces[i].depth);
  }
  assert.equal(ctx.fills, ctx.strokes);
  assert.equal(scene.projected, projected);
  scene.faceRecords.forEach((record, i) => assert.equal(record, records[i]));
  assert.deepEqual(scene.mesh.vertices, original);
  assert.deepEqual(pointerRotation(-10, -10), pointerRotation(0, 0));
  assert.deepEqual(pointerRotation(10, 10), pointerRotation(1, 1));
  assert.deepEqual(pointerRotation(0.5, 0.5), REST_ROTATION);
});

function fixture({paused = false, pulse = false} = {}) {
  let id = 0, intersection, resize, rectReads = 0, disconnected = 0;
  const frames = new Map(), timers = new Map(), hostListeners = new Map(), windowListeners = new Map(), documentListeners = new Map();
  const bounds = {left: 0, top: 0, width: 1440, height: 900};
  const ctx = context();
  const host = {
    getBoundingClientRect: () => { rectReads++; return {...bounds}; },
    addEventListener: (name, fn, options) => { assert.equal(options.passive, true); hostListeners.set(name, fn); },
    removeEventListener: name => hostListeners.delete(name),
  };
  const canvas = {parentElement: host, getContext: () => ctx};
  const env = {
    devicePixelRatio: 3,
    document: {hidden: false, addEventListener: (name, fn) => documentListeners.set(name, fn), removeEventListener: name => documentListeners.delete(name)},
    addEventListener: (name, fn) => windowListeners.set(name, fn), removeEventListener: name => windowListeners.delete(name),
    ResizeObserver: class {constructor(cb) {resize = cb;} observe() {} disconnect() {disconnected++;}},
    IntersectionObserver: class {constructor(cb) {intersection = cb;} observe() {} disconnect() {disconnected++;}},
    requestAnimationFrame: cb => { frames.set(++id, cb); return id; }, cancelAnimationFrame: key => frames.delete(key),
    setTimeout: (cb, ms) => { assert.ok(ms >= SPONGE_FRAME_MS); timers.set(++id, cb); return id; }, clearTimeout: key => timers.delete(key),
  };
  const dispose = attachMengerSponge(canvas, {environment: env, paused, pulse});
  const advance = () => {
    const queue = frames.size ? frames : timers;
    assert.equal(queue.size, 1);
    const [key, fn] = queue.entries().next().value;
    queue.delete(key); fn();
  };
  return {
    ctx, canvas, env, dispose, advance, frames, timers, bounds, hostListeners, windowListeners, documentListeners,
    get rectReads() {return rectReads;}, get disconnected() {return disconnected;},
    show: value => intersection([{isIntersecting: value}]), resize: () => resize(),
    move: (pointerType = 'mouse', x = 1200, y = 200) => hostListeners.get('pointermove')?.({pointerType, clientX: x, clientY: y}),
    hidden: value => {env.document.hidden = value; documentListeners.get('visibilitychange')();},
    idle: () => frames.size === 0 && timers.size === 0,
  };
}

test('idle has no loop; mouse movement eases at <=20fps and stops after settling', () => {
  const f = fixture();
  assert.equal(f.ctx.draws, 1);
  f.show(true); assert.ok(f.idle());
  f.move(); assert.equal(f.frames.size, 1);
  const rectReads = f.rectReads;
  for (let i = 0; i < 100; i++) f.move();
  assert.equal(f.frames.size, 1, 'pointer event bursts share one frame');
  assert.equal(f.rectReads, rectReads, 'no repeated layout reads');
  f.advance(); assert.equal(f.timers.size, 1); assert.equal(f.frames.size, 0);
  let steps = 0;
  while (!f.idle() && steps++ < 100) f.advance();
  assert.ok(steps < 100 && f.idle());
  const draws = f.ctx.draws;
  f.move(); assert.ok(f.idle()); assert.equal(f.ctx.draws, draws);
  f.dispose();
});

test('touch and pen gestures never start a render or prevent page scrolling', () => {
  const f = fixture(); f.show(true);
  f.move('touch'); f.move('pen'); assert.ok(f.idle());
  assert.equal(f.ctx.draws, 1);
  f.dispose();
});

test('offscreen, tab-hidden and paused motion cancels both queues with no replay', () => {
  const f = fixture();
  f.move(); assert.ok(f.idle());
  f.show(true); f.move(); f.advance(); assert.equal(f.timers.size, 1);
  f.show(false); assert.ok(f.idle()); f.show(true); assert.ok(f.idle());
  f.move(); assert.ok(!f.idle()); f.hidden(true); assert.ok(f.idle());
  f.move(); assert.ok(f.idle()); f.hidden(false); assert.ok(f.idle());
  f.move(); assert.ok(!f.idle()); f.dispose.setPaused(true); assert.ok(f.idle());
  f.move(); assert.ok(f.idle()); f.dispose.setPaused(false); assert.ok(f.idle());
  f.move(); assert.ok(!f.idle());
  f.dispose(); assert.ok(f.idle());
  assert.equal(f.disconnected, 2);
  assert.equal(f.hostListeners.size + f.windowListeners.size + f.documentListeners.size, 0);
  const draws = f.ctx.draws;
  f.show(true); f.resize(); assert.equal(f.ctx.draws, draws); assert.ok(f.idle());
});

test('reduced-motion renders a static still, and resizing stays within the pixel cap', () => {
  const f = fixture({paused: true}); f.show(true); f.move(); assert.ok(f.idle());
  f.bounds.width = 390; f.bounds.height = 1376; f.resize();
  assert.ok(f.idle()); assert.equal(f.canvas.width, 390); assert.equal(f.canvas.height, 1376);
  assert.equal(f.ctx.draws, 2);
  f.dispose();
});

test('scroll updates pointer coordinates lazily, without render or layout work during scroll', () => {
  const f = fixture(); f.show(true);
  const reads = f.rectReads;
  f.bounds.top = -300;
  for (let i = 0; i < 100; i++) f.windowListeners.get('scroll')();
  assert.equal(f.rectReads, reads); assert.ok(f.idle());
  f.move(); assert.equal(f.rectReads, reads + 1);
  f.dispose();
});

test('no canvas support degrades safely, and only the sponge is mounted in the hero', () => {
  assert.doesNotThrow(() => attachMengerSponge({getContext: () => null}, {environment: {}})());
  const hero = readFileSync(new URL('../src/components/Hero.jsx', import.meta.url), 'utf8');
  assert.match(hero, /<HeroMengerSponge \/>/);
  assert.doesNotMatch(hero, /HeroBranchingTree/);
});


test('core is a centered 3D sphere within the tunnels and shares cube depth sorting', () => {
  const core = createCoreMesh();
  for (let i = 0; i < core.vertices.length; i += 3) {
    assert.ok(Math.abs(Math.hypot(...core.vertices.slice(i, i + 3)) - 0.23) < 1e-6);
  }
  const scene = createSpongeScene(1440, 900);
  for (const rotation of [REST_ROTATION, {yaw:0,pitch:0}, pointerRotation(1,1)]) {
    drawSponge(context(), scene, rotation);
    const sphere = scene.visibleFaces.filter(record=>record.face.core);
    assert.ok(sphere.length > 0);
    assert.ok(sphere.every(record=>Math.abs(record.depth) <= 0.23));
    const lastSphere = scene.visibleFaces.findLastIndex(record=>record.face.core);
    assert.ok(scene.visibleFaces.slice(lastSphere + 1).some(record=>!record.face.core), 'front walls occlude the core');
    for (let i = 1; i < scene.visibleFaces.length; i++) assert.ok(scene.visibleFaces[i - 1].depth <= scene.visibleFaces[i].depth);
  }
});


test('core matches the three-second text rhythm and pauses when hidden or reduced', () => {
  assert.equal(CORE_PULSE_MS, 3000);
  assert.equal(corePulse(0), 0);
  assert.equal(corePulse(1500), 1);
  assert.equal(corePulse(3000), 0);
  const f = fixture({pulse:true});
  assert.ok(f.idle());
  f.show(true); f.advance(); assert.equal(f.timers.size, 1);
  f.hidden(true); assert.ok(f.idle());
  f.hidden(false); assert.ok(!f.idle());
  f.show(false); assert.ok(f.idle());
  f.show(true); f.dispose.setPaused(true); assert.ok(f.idle());
  f.dispose.setPaused(false); assert.ok(!f.idle());
  f.dispose(); assert.ok(f.idle());
  const reduced = fixture({pulse:true, paused:true});
  reduced.show(true); assert.ok(reduced.idle()); reduced.dispose();
});


test('paused mode rotates only on drag, preserves idle and cancels safely', () => {
  const f = fixture({paused:true,pulse:true}); f.show(true);
  const pointer = {pointerId:1, pointerType:'mouse', button:0, clientX:700, clientY:400};
  const fire = (name, changes={}) => f.hostListeners.get(name)({...pointer,...changes});
  fire('pointermove', {clientX:800}); assert.ok(f.idle());
  fire('pointerdown', {target:{closest:()=>true}});
  fire('pointermove', {clientX:800}); assert.ok(f.idle(), 'buttons do not start rotation');
  fire('pointerdown');
  for(let i=0;i<10;i++) fire('pointermove', {clientX:800+i});
  assert.equal(f.frames.size,1);
  f.advance(); assert.ok(f.idle()); assert.equal(f.ctx.draws,2);
  fire('pointerup'); fire('pointermove', {clientX:950}); assert.ok(f.idle());
  fire('pointerdown', {pointerType:'touch'});
  fire('pointermove', {pointerType:'touch',clientX:800});
  f.advance(); assert.equal(f.ctx.draws,3);
  fire('pointercancel'); fire('pointermove', {clientX:950}); assert.ok(f.idle());
  fire('pointerdown'); fire('pointermove', {clientX:800});
  f.hidden(true); assert.ok(f.idle());
  f.hidden(false); fire('pointermove', {clientX:950}); assert.ok(f.idle());
  f.dispose(); assert.ok(f.idle());
});


test('a full horizontal or vertical pointer sweep maps to exactly 360 degrees', () => {
  assert.ok(Math.abs(pointerRotation(1,.5).yaw - pointerRotation(0,.5).yaw - 2*Math.PI) < 1e-12);
  assert.ok(Math.abs(pointerRotation(.5,1).pitch - pointerRotation(.5,0).pitch - 2*Math.PI) < 1e-12);
  assert.equal(pointerRotation(1,.5).pitch, REST_ROTATION.pitch);
  assert.equal(pointerRotation(.5,1).yaw, REST_ROTATION.yaw);
});
