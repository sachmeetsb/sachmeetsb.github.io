import test from 'node:test';
import assert from 'node:assert/strict';
import {pageForProduct,swipeDirection} from '../src/lib/productNavigation.js';
import {productIndustries} from '../src/data/productIndustries.js';
import {products} from '../src/data/portfolio.js';
import {readFileSync} from 'node:fs';

test('product-list swipes turn pages while demo swipes select products',()=>{
  const source=readFileSync(new URL('../src/components/Portfolio.jsx',import.meta.url),'utf8');
  assert.match(source,/data-product-list role="region" aria-label="Product pages"/);
  assert.match(source,/if \(start.list\) changePage\(page \+ direction\)/);
  assert.match(source,/else selectProduct\(activeIndex \+ direction\)/);
  assert.match(source,/if \(nextPage === page\) return/);
});

test('old industry strip is removed and replacement has compact top spacing',()=>{
  assert.doesNotMatch(readFileSync(new URL('../src/App.jsx',import.meta.url),'utf8'),/LogoBar/);
  assert.match(readFileSync(new URL('../src/components/ProductCarousel.jsx',import.meta.url),'utf8'),/pt-10 md:pt-14/);
});

test('edited recordings use matching dimensions and rebased chapter timings',()=>{
  const lawyer=products.find(p=>p.slug==='lawyerboss').demo;
  assert.match(lawyer.video,/lawyerboss-trimmed\.mp4$/);
  assert.deepEqual(lawyer.stops.map(stop=>stop.t),[4,26,48]);
  for(const [slug,ratio] of [['instantconfig',1008/720],['datamind',1044/720],['vimarsha',720/1566],['lawyerboss',1206/2622]]){
    assert.equal(products.find(p=>p.slug===slug).demo.aspectRatio,ratio);
  }
  const screen=readFileSync(new URL('../src/components/portfolio/PhoneSimulator.jsx',import.meta.url),'utf8');
  assert.match(screen,/object-contain/);
  assert.doesNotMatch(screen,/object-cover/);
});

test('industry blocks contain the requested products exactly once',()=>{
  assert.deepEqual(productIndustries.map(group=>[group.name,group.slugs]),[
    ['Legal',['lawyerboss','nyayalegal']],
    ['Academics',['khoj-learning','vimarsha','quantumexp']],
    ['Enterprise',['instantconfig','vr-real-estate-tour','customsiq','datamind']],
    ['Media',['satya-social','newstime','tabletennis']],
  ]);
  const slugs=productIndustries.flatMap(group=>group.slugs);
  assert.equal(new Set(slugs).size,products.length);
  assert.deepEqual([...slugs].sort(),products.map(p=>p.slug).sort());
  assert.equal(new Set(productIndustries.map(group=>group.color)).size,4);
});

test('horizontal swipes navigate, without treating scrolls or taps as swipes',()=>{
  const start={x:200,y:200};
  assert.equal(swipeDirection(start,{x:100,y:210}),1);
  assert.equal(swipeDirection(start,{x:300,y:210}),-1);
  for(const end of [{x:205,y:204},{x:180,y:80},{x:260,y:260}]) assert.equal(swipeDirection(start,end),0);
  assert.equal(swipeDirection(null,start),0);
});
test('selected product remains on its matching page, including boundaries',()=>{
  const starts=[0,5,9];
  assert.deepEqual(Array.from({length:12},(_,i)=>pageForProduct(i,starts)),[0,0,0,0,0,1,1,1,1,2,2,2]);
});
