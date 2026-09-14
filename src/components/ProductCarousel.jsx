import React, {useEffect, useRef, useState} from 'react';
import Section from './motion/Section';
import {products} from '../data/portfolio';
import {productIndustries} from '../data/productIndustries';
import {useReducedMotion} from '../lib/useReducedMotion';

export default function ProductCarousel() {
  const track = useRef(null);
  const reduced = useReducedMotion();
  const [edges, setEdges] = useState({start:true,end:false});
  const update = () => {
    const el = track.current;
    if (el) setEdges({start:el.scrollLeft<=2,end:el.scrollLeft+el.clientWidth>=el.scrollWidth-2});
  };
  useEffect(() => {
    const observer = new ResizeObserver(update);
    if (track.current) observer.observe(track.current);
    return () => observer.disconnect();
  }, []);
  const move = direction => {
    const el = track.current;
    const card = el?.querySelector('article');
    if (el && card) el.scrollBy({left:direction*(card.offsetWidth+24),behavior:reduced?'auto':'smooth'});
  };
  return <Section id="product-carousel" aria-label="Products by industry" className="pt-10 md:pt-14 pb-10 md:pb-14">
    <div className="flex flex-wrap items-end justify-between gap-6 mb-8">
      <div>
        <h2 className="font-display font-extrabold text-[32px] md:text-[44px] text-white leading-tight">Products by industry</h2>
      </div>
      <div className="flex gap-3">
        <button type="button" aria-label="Previous industry" aria-controls="product-carousel-track" disabled={edges.start} onClick={()=>move(-1)} className="w-12 h-12 rounded-full border border-white/25 text-white disabled:opacity-30">←</button>
        <button type="button" aria-label="Next industry" aria-controls="product-carousel-track" disabled={edges.end} onClick={()=>move(1)} className="w-12 h-12 rounded-full border border-white/25 text-white disabled:opacity-30">→</button>
      </div>
    </div>
    <div ref={track} id="product-carousel-track" role="region" aria-label="Industry blocks; scroll horizontally or use arrow keys" tabIndex={0} onScroll={update}
      onKeyDown={event=>{if(event.target!==event.currentTarget)return;if(event.key==='ArrowRight'||event.key==='ArrowLeft'){event.preventDefault();move(event.key==='ArrowRight'?1:-1);}}}
      className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-5 rounded-2xl [scrollbar-color:#FF5E0E_#1E1535]">
      {productIndustries.map(industry=><article key={industry.name} aria-label={`${industry.name} products`} className="snap-start shrink-0 w-[85%] sm:w-[360px] min-h-[360px] rounded-3xl border-t-4 p-7 sm:p-8" style={{background:industry.background,borderColor:industry.color}}>
        <h3 className="font-display font-extrabold text-[32px] mb-8" style={{color:industry.color}}>{industry.name}</h3>
        <ul className="space-y-2">
          {industry.slugs.map(slug=>{
            const product=products.find(item=>item.slug===slug);
            if(!product)return null;
            return <li key={slug}>
              <button type="button" className="min-h-11 py-2 text-left font-display text-[22px] font-semibold text-white/90 hover:text-white underline-offset-4 hover:underline" aria-label={`Show ${product.name} in product area`} onClick={()=>window.dispatchEvent(new CustomEvent('portfolio:select',{detail:slug}))}>{product.name}</button>
            </li>;
          })}
        </ul>
      </article>)}
    </div>
  </Section>;
}
