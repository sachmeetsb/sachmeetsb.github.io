import React, {useEffect, useRef, useState} from 'react';
import {useReducedMotion} from '../lib/useReducedMotion';
import {attachMengerSponge} from '../lib/mengerSponge';

export default function HeroMengerSponge() {
  const canvas = useRef(null);
  const controller = useRef(null);
  const reduced = useReducedMotion();
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    const title = canvas.current?.parentElement?.querySelector('.autonomous-gradient');
    const animation = title?.getAnimations().find(item => item.animationName === 'gradient-shift');
    const dispose = attachMengerSponge(canvas.current, {
      paused: true,
      pulseTime: () => Number(animation?.currentTime ?? document.timeline.currentTime ?? 0),
    });
    controller.current = dispose;
    return () => { dispose(); controller.current = null; };
  }, []);
  useEffect(() => { controller.current?.setPaused?.(reduced || paused); }, [reduced, paused]);

  return <>
    <canvas ref={canvas} data-hero-sponge aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none" />
    {!reduced && <button type="button" onClick={() => setPaused(value => !value)}
      aria-label={paused ? 'Resume motion; drag the cube to rotate while paused' : 'Pause motion and drag to rotate'} aria-pressed={paused}
      className="absolute z-20 bottom-3 right-8 min-h-11 px-3 text-xs text-white/65 hover:text-white rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-white">
      {paused ? 'Resume motion · drag to rotate' : 'Pause motion · drag to rotate'}
    </button>}
  </>;
}
