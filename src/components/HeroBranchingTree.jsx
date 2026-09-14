import React, {useEffect, useRef, useState} from 'react';
import {useReducedMotion} from '../lib/useReducedMotion';
import {attachBranchingTree} from '../lib/branchingTree';

export default function HeroBranchingTree() {
  const canvas = useRef(null);
  const controller = useRef(null);
  const reduced = useReducedMotion();
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    const dispose = attachBranchingTree(canvas.current, {paused: true});
    controller.current = dispose;
    return () => { dispose(); controller.current = null; };
  }, []);
  useEffect(() => { controller.current?.setPaused?.(reduced || paused); }, [reduced, paused]);

  return <>
    <canvas ref={canvas} data-hero-tree aria-hidden="true" className="absolute inset-0 w-full h-full pointer-events-none" />
    {!reduced && <button type="button" onClick={() => setPaused(value => !value)}
      aria-label={paused ? 'Resume background motion' : 'Pause background motion'}
      className="absolute z-20 bottom-3 right-8 min-h-11 px-3 text-xs text-white/65 hover:text-white rounded-full">
      {paused ? 'Resume motion' : 'Pause motion'}
    </button>}
  </>;
}
