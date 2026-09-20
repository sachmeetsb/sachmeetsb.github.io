import test from 'node:test';
import assert from 'node:assert/strict';
import {treeBudget,canopyGap,createForest,stepForest,drawForest,attachBranchingTree,FRAME_MS,CYCLE_SECONDS} from '../src/lib/branchingTree.js';

function seeded(seed) {
  return () => ((seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0) / 2 ** 32);
}

function bounds(tree) {
  let left=Infinity, right=-Infinity;
  for(let i=0;i<tree.branches.length;i+=5){
    left=Math.min(left,tree.branches[i],tree.branches[i+2]);
    right=Math.max(right,tree.branches[i],tree.branches[i+2]);
  }
  // The widest stroke has a 1.5px radius, including round caps.
  return {left:left-1.5,right:right+1.5};
}

function assertSeparated(field) {
  let previous;
  for(const tree of field.trees){
    const envelope=bounds(tree);
    assert.ok(envelope.left>=0&&envelope.right<=field.width,'silhouette stays within canvas');
    if(previous)assert.ok(envelope.left-previous.right>=canopyGap(field.width,field.trees.length)-0.01,'full canopies retain their gap');
    previous=envelope;
  }
}

test('canopies never touch across sizes, random extremes and independent regrowth',()=>{
  for(const [width,height] of [[320,1800],[390,844],[390,1376],[767,900],[768,900],[1440,900],[2560,1440],[6000,3000]]){
    for(let seed=0;seed<100;seed++){
      const random=seeded(seed),field=createForest(width,height,random);
      assertSeparated(field);
      // Regenerate each tree individually against its existing neighbours.
      for(const tree of field.trees){
        tree.age=CYCLE_SECONDS;
        stepForest(field,0,random);
        assertSeparated(field);
      }
    }
    for(const value of [0,0.5,0.999999])assertSeparated(createForest(width,height,()=>value));
  }
});

test('randomness varies silhouettes without adding per-frame random work',()=>{
  let calls=0;
  const random=seeded(42);
  const field=createForest(1440,900,()=>{calls++;return random();});
  const callsAtBirth=calls;
  const before=field.trees.map(tree=>tree.branches.slice());
  stepForest(field,0.05,()=>{calls++;return random();});
  assert.equal(calls,callsAtBirth);
  field.trees.forEach((tree,i)=>assert.deepEqual(tree.branches,before[i]));
  assert.notDeepEqual(field.trees[0].branches,createForest(1440,900,seeded(43)).trees[0].branches);
  const b=field.trees[0].branches;
  const children=[];
  for(let i=0;i<b.length;i+=5)if(b[i+4]===1)children.push(Math.hypot(b[i+2]-b[i],b[i+3]-b[i+1]));
  assert.notEqual(children[0],children[1],'siblings no longer mirror one another');
  const lengths=field.trees.map(tree=>Math.hypot(tree.branches[2]-tree.branches[0],tree.branches[3]-tree.branches[1]));
  assert.equal(new Set(lengths).size,field.trees.length,'trunk heights vary');
});

test('fully-grown forests keep the same branch and stroke budgets',()=>{
  for(const width of [390,1440]){
    const field=createForest(width,900,seeded(1));
    field.trees.forEach(tree=>{tree.age=13;});
    let lines=0,strokes=0;
    drawForest({clearRect(){},beginPath(){},moveTo(){},lineTo(){lines++;},stroke(){strokes++;}},field);
    assert.equal(lines,width<768?126:381);
    assert.equal(strokes,width<768?12:21);
  }
});

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
