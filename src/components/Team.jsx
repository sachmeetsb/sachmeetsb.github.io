import React from "react";
import Section from "./motion/Section";
import { Stagger, StaggerItem } from "./motion/Reveal";

const collaborations = [
  {project:"Khoj", people:[{name:"Bhupendra Bhatore", detail:"Education-sector experience in Indore."}]},
  {project:"Kartar Hardware", people:[{name:"Swetank Vaidya", detail:"Five years of experience in EV charging infrastructure."}]},
  {project:"VR Architecture", href:"/products/vr-real-estate-tour/", people:[
    {name:"Vikas Kumar",detail:"Delhi-based architect."},
    {name:"Manas Joshi",detail:"Ahmedabad-based 3D developer."}
  ]},
];
export default function Team() {
  return <Section id="team" className="py-24 md:py-32">
    <div className="grid md:grid-cols-[minmax(240px,380px)_1fr] items-center gap-10 lg:gap-20 mb-16">
      <img src="/sachmeet.jpg" alt="Sachmeet Singh Bhatia" width="640" height="640" loading="lazy" className="w-full max-w-[380px] aspect-square object-cover object-top rounded-card border border-white/15" />
      <div>
        <span className="inline-block bg-saffron text-white rounded-pill px-6 py-2 font-display font-bold text-[22px] mb-6">About Kartar</span>
        <h2 className="font-display font-extrabold text-[32px] md:text-[44px] text-white leading-tight mb-6">I’m Sachmeet Singh Bhatia.</h2>
        <p className="text-white/75 text-[18px] leading-relaxed mb-5">I founded Kartar AI Labs to build AI-native products and useful workflows. I work across research, prototyping and the engineering that turns an idea into a working product.</p>
        <p className="text-white/75 text-[18px] leading-relaxed mb-6">When you bring a project to Kartar, you work directly with me. The products on this site show the problems I’m working on; for projects that need domain expertise, I work with the partners below.</p>
        <div className="flex flex-wrap gap-x-6 gap-y-3 text-saffron-core font-display font-semibold">
          <a href="mailto:sachmeet@kartar.ai">Email me</a>
          <a href="#portfolio">Explore my products</a>
          <a href="https://www.linkedin.com/company/kartar-ai/" target="_blank" rel="noopener noreferrer">Kartar on LinkedIn ↗</a>
        </div>
      </div>
    </div>
    <h3 className="font-display text-[26px] text-white font-bold mb-7">Project partners</h3>
    <Stagger className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {collaborations.map(group => <StaggerItem key={group.project}>
        <article className="h-full rounded-card border border-white/10 bg-white/[0.04] p-8">
          <h4 className="font-display text-[22px] text-saffron-core font-bold mb-6">{group.href ? <a href={group.href}>{group.project} ↗</a> : group.project}</h4>
          {group.people.map(person => <div key={person.name} className="mb-6 last:mb-0">
            <p className="font-display text-[20px] font-bold text-white">{person.name}</p>
            <p className="text-[13px] text-white/65 mb-2">Project Partner — {group.project}</p>
            <p className="text-white/70 text-[16px]">{person.detail}</p>
          </div>)}
        </article>
      </StaggerItem>)}
    </Stagger>
  </Section>;
}
