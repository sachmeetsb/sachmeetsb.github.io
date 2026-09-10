import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,statSync} from 'node:fs';
import {bookingHandoff,intakeFields} from '../src/lib/calendly.js';
import {products} from '../src/data/portfolio.js';
const read=path=>readFileSync(new URL('../'+path,import.meta.url),'utf8');

test('booking navigation does not depend on popup or new-tab support',()=>{
  const form=read('src/components/ContactForm.jsx');
  assert.match(form,/<a href=\{handoff.url\} className=/);
  assert.doesNotMatch(form,/target="_blank"/);
  assert.match(form,/Continues to Calendly in this tab/);
});

test('public catalogue includes Khoj and TT Coach and excludes withdrawn projects',()=>{
  for(const slug of ['speko','rezt','artrenamer','wingmen','prodvton']) assert.ok(!products.some(p=>p.slug===slug));
  assert.equal(products.find(p=>p.slug==='khoj-learning')?.name,'Khoj Learning');
  const tt=products.find(p=>p.slug==='tabletennis');
  assert.equal(tt.name,'TT Coach');
  assert.equal(tt.stage,'In development');
  assert.equal(tt.frontendUrl,undefined);
  assert.equal(tt.demo.video,'/media/demos/tt-coach.mp4');
  assert.equal(products.length,12);
  assert.equal(products.filter(p=>p.hasRecording).length,11);
  assert.equal(products.find(p=>p.slug==='newstime').name,'Kartar Media');
});

test('every recorded demo has a real local video, poster and ordered chapter times',()=>{
  for(const p of products.filter(p=>p.hasRecording)){
    assert.ok(statSync(new URL('../public'+p.demo.video,import.meta.url)).size>10000,p.name);
    assert.ok(statSync(new URL('../public'+p.demo.poster,import.meta.url)).size>1000,p.name);
    let previous=0;
    for(const stop of p.demo.stops){ assert.ok(Number.isFinite(stop.t)&&stop.t>previous,p.name); previous=stop.t; }
  }
  for(const slug of ['khoj-learning','quantumexp','nyayalegal','newstime']){
    const p=products.find(p=>p.slug===slug);
    assert.equal(p.stage,'In development');
    assert.ok(p.frontendUrl?.startsWith('https://'));
    assert.ok(p.hasRecording);
  }
});

test('Vimarsha Open app uses the verified public web reader and preserves its recording',()=>{
  const vimarsha=products.find(p=>p.slug==='vimarsha');
  assert.equal(vimarsha.frontendUrl,'https://kartar-vimarsha.exe.xyz/');
  assert.equal(vimarsha.demo.video,'/media/demos/vimarsha.mp4');
  assert.equal(products.find(p=>p.slug==='satya-social').frontendUrl,'https://pds.kartar.ai/');
});

test('Calendly receives complete current values in its verified preparation field',()=>{
  const values=Object.fromEntries(intakeFields.map(f=>[f.name,`Answer for ${f.name}`]));
  values.from_name='Test & Review';values.from_email='website-test@example.com';values.budget='₹5–15 lakh';
  const first=bookingHandoff(values);const url=new URL(first.url);
  assert.equal(url.origin,'https://calendly.com');assert.equal(url.pathname,'/sachmeet-kartar/30min');
  assert.equal(url.searchParams.get('name'),values.from_name);assert.equal(url.searchParams.get('email'),values.from_email);
  for(const field of intakeFields.filter(f=>!f.name.startsWith('from_')||f.name==='from_phone')) assert.ok(url.searchParams.get('a1').includes(values[field.name]));
  const changed=bookingHandoff({...values,from_email:'changed@example.com'});
  assert.equal(new URL(changed.url).searchParams.get('email'),'changed@example.com');
});
test('missing required brief and excessive handoff are rejected, not truncated',()=>{
  assert.throws(()=>bookingHandoff({}),/Complete/);
  assert.throws(()=>bookingHandoff({from_name:'Test',from_email:'t@example.com',discussion:'Other',outcome:'₹'.repeat(4000)}),/shorten/);
});
test('original app is active, without testimonials, newsletter or forced process pinning',()=>{
  assert.match(read('src/main.jsx'),/from '\.\/App.jsx'/);
  assert.doesNotMatch(read('src/App.jsx'),/Testimonials/);
  assert.doesNotMatch(read('src/components/Footer.jsx'),/newsletter|sender-form/i);
  assert.doesNotMatch(read('index.html'),/cdn.sender.net/);
  assert.doesNotMatch(read('src/components/WorkingProcess.jsx'),/ScrollTrigger|pin: true/);
  assert.match(read('src/components/Footer.jsx'),/grid-cols-2/);
  assert.match(read('src/components/Footer.jsx'),/footer-wordmark/);
});
test('industry copy contains no fabricated quantitative proof or absolute automation promises',()=>{
  assert.doesNotMatch(read('src/components/IndustrySolutions.jsx'),/98%|87%|99.3%|zero human intervention|10x throughput|94%|240%|74%|80%/);
});
test('intake retains thirteen distinct controls and labels; voice changes are explicit',()=>{
  assert.equal(intakeFields.length,13);assert.equal(new Set(intakeFields.map(f=>f.name)).size,13);
  const form=read('src/components/ContactForm.jsx');assert.match(form,/label htmlFor=\{id\}/);
  assert.match(form,/Use this answer/);assert.match(form,/Confirm or discard/);
  assert.doesNotMatch(form,/spoken.includes|selectVoiceOption|emailjs/);
});
