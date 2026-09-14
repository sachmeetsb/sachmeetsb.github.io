import test from 'node:test';
import assert from 'node:assert/strict';
import {treeBudget,createForest,stepForest,drawForest,attachBranchingTree,FRAME_MS,CYCLE_SECONDS} from '../src/lib/branchingTree.js';

test('render resolution uses native CSS size up to a 777,000-pixel cap',()=>{
  for(const [w,h] of [[390,1376],[1440,1000],[6000,3000]]){
    const b=treeBudget(w,h);
    assert.ok(b.scale<=1);
    assert.ok(Math.abs(w*h*b.scale**2-Math.min(w*h,777000))<1);
    assert.equal(b.roots,w<768?2:3);
  }
});
test('each branch splits into exactly two connected children, with bounded geometry',()=>{
  for(const width of [390,1440]){
    const f=createForest(width,900,()=>0.5);
    for(const tree of f.trees){
      assert.equal(tree.branches.length/5,2**(f.depth+1)-1);
      assert.ok(tree.branches.every(Number.isFinite));
      const b=tree.branches;
      for(let i=0;i<b.length;i+=5){
        let children=0;
        for(let j=0;j<b.length;j+=5)if(b[j]===b[i+2]&&b[j+1]===b[i+3]&&b[j+4]===b[i+4]+1)children++;
        assert.equal(children,b[i+4]===f.depth?0:2);
      }
    }
  }
});
test('trees regenerate indefinitely while reusing storage and clamping pause catch-up',()=>{
  const f=createForest(1440,900);
  const arrays=f.trees.map(t=>t.branches);
  const age=f.trees[0].age;
  stepForest(f,10000);
  assert.ok(f.trees[0].age-age<=0.10001);
  for(let n=0;n<10000;n++)stepForest(f,0.1);
  f.trees.forEach((t,i)=>{
    assert.equal(t.branches,arrays[i]);
    assert.ok(t.age>=0&&t.age<CYCLE_SECONDS);
    assert.ok(t.generation>50);
  });
});
test('children appear only after parent growth, without per-frame geometry changes',()=>{
  const f=createForest(1440,900);
  f.trees=f.trees.slice(0,1);
  f.trees[0].age=1.2;
  let lines=0;
  const ctx={clearRect(){},beginPath(){},moveTo(){},lineTo(){lines++;},stroke(){}};
  const before=f.trees[0].branches.slice();
  drawForest(ctx,f);
  assert.equal(lines,1);
  assert.deepEqual(f.trees[0].branches,before);
  lines=0;f.trees[0].age=1.5;drawForest(ctx,f);assert.equal(lines,3);
});

function fixture(){
  let id=0,intersection,resize;
  const frames=new Map(),timers=new Map(),listeners=new Map();
  const ctx={clearRect(){},setTransform(){},beginPath(){},moveTo(){},lineTo(){},stroke(){}};
  const canvas={width:0,height:0,getContext:()=>ctx,getBoundingClientRect:()=>({width:390,height:844})};
  const env={devicePixelRatio:3,
    document:{hidden:false,addEventListener:(n,fn)=>listeners.set(n,fn),removeEventListener:n=>listeners.delete(n)},
    ResizeObserver:class{constructor(cb){resize=cb;}observe(){}disconnect(){}},
    IntersectionObserver:class{constructor(cb){intersection=cb;}observe(){}disconnect(){}},
    requestAnimationFrame:cb=>{frames.set(++id,cb);return id;},cancelAnimationFrame:n=>frames.delete(n),
    setTimeout:(cb,ms)=>{assert.ok(ms>=FRAME_MS);timers.set(++id,cb);return id;},clearTimeout:n=>timers.delete(n),
  };
  return{env,canvas,frames,timers,listeners,show:v=>intersection([{isIntersecting:v}]),resize:()=>resize()};
}
test('offscreen/hidden/paused scenes stop scheduling and clean up on unmount',()=>{
  const f=fixture();const dispose=attachBranchingTree(f.canvas,{environment:f.env});
  assert.equal(f.frames.size,0);
  f.show(true);assert.equal(f.frames.size,1);
  f.show(true);assert.equal(f.frames.size,1);
  dispose.setPaused(true);assert.equal(f.frames.size,0);
  dispose.setPaused(false);assert.equal(f.frames.size,1);
  const [id,run]=f.frames.entries().next().value;f.frames.delete(id);run(0);
  assert.equal(f.timers.size,1);assert.equal(f.frames.size,0);
  f.show(false);assert.equal(f.timers.size,0);
  f.show(true);assert.equal(f.frames.size,1);
  f.env.document.hidden=true;f.listeners.get('visibilitychange')();assert.equal(f.frames.size,0);
  f.env.document.hidden=false;f.listeners.get('visibilitychange')();assert.equal(f.frames.size,1);
  dispose();assert.equal(f.frames.size,0);assert.equal(f.timers.size,0);assert.equal(f.listeners.size,0);
  f.show(true);assert.equal(f.frames.size,0);
});
test('reduced-motion/static scene has zero scheduled frames, ignoring retina scaling',()=>{
  const f=fixture();const dispose=attachBranchingTree(f.canvas,{environment:f.env,paused:true});
  f.show(true);f.resize();
  assert.equal(f.frames.size,0);assert.equal(f.timers.size,0);
  assert.equal(f.canvas.width,390);
  assert.ok(f.canvas.width*f.canvas.height<=777000);
  dispose();
});
