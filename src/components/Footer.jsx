import React from "react";
import Logo from "./Logo";
import { products } from "../data/portfolio";

export default function Footer() {
  return (
    <footer id="footer" className="bg-void pt-20 pb-10 overflow-hidden">
      <div className="max-w-container mx-auto px-8 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_1.4fr_1fr] gap-12 mb-16">
          <div>
            <Logo size="lg" variant="on-dark" />
            <p className="mt-5 text-white/65 text-[16px] max-w-xs">AI products and engineering, built with Sachmeet Singh Bhatia.</p>
            <a href="#contact" className="inline-flex mt-6 px-7 py-3 bg-saffron hover:bg-saffron-light text-white font-display font-semibold rounded-pill">Book a Call</a>
          </div>
          <nav aria-label="Footer products">
            <h2 className="font-mono text-[12px] tracking-[0.12em] uppercase text-white/60 mb-5">Products</h2>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2">
              {products.map(p => <li key={p.slug}><a href={`/products/${p.slug}/`} className="inline-flex items-center min-h-11 text-white/70 hover:text-white font-display text-[15px] leading-relaxed">{p.name}</a></li>)}
            </ul>
          </nav>
          <div>
            <nav aria-label="Footer navigation" className="grid grid-cols-2 gap-3 mb-8">
              <a href="#portfolio">Products</a><a href="#services">Services</a>
              <a href="#process">Process</a><a href="#team">About</a>
              <a href="#contact">Book a Call</a><a href="/privacy/">Privacy</a>
            </nav>
            <a className="block text-white/75 hover:text-white" href="mailto:sachmeet@kartar.ai">sachmeet@kartar.ai</a>
            <a className="inline-flex min-h-11 items-center text-saffron-core" href="https://www.linkedin.com/company/kartar-ai/" target="_blank" rel="noopener noreferrer">Kartar on LinkedIn ↗</a>
          </div>
        </div>
        <a href="#hero" aria-label="Kartar AI — back to top" className="footer-wordmark block border-t border-white/10 pt-10 pb-8 font-display font-extrabold leading-none text-white whitespace-nowrap" style={{fontSize:'clamp(60px, 18vw, 250px)',letterSpacing:'-0.06em'}}>kartar<span className="autonomous-gradient">AI</span></a>
        <p className="border-t border-white/10 pt-7 text-[13px] text-white/60">© {new Date().getFullYear()} Kartar AI Labs. Built by Sachmeet Singh Bhatia.</p>
      </div>
    </footer>
  );
}
