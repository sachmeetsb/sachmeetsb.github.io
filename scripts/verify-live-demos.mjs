import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {products} from '../src/data/portfolio.js';

const origin='https://kartar.ai';
const hash=bytes=>createHash('sha256').update(bytes).digest('hex');
const report={origin,checkedAt:new Date().toISOString(),projects:products.length,recordings:products.filter(p=>p.hasRecording).length,pages:[],media:[],excluded:[]};
async function get(path){return fetch(origin+path,{signal:AbortSignal.timeout(30000)});}
for(const product of products){
  const path=`/products/${product.slug}/`;
  const response=await get(path);
  assert.equal(response.status,200,path);
  const html=await response.text();
  assert.ok(html.includes(product.name),`${path}: product name`);
  assert.ok(html.includes(`<title>${product.name}`),`${path}: title`);
  if(product.demo?.video)assert.ok(html.includes(product.demo.video),`${path}: video wiring`);
  report.pages.push({path,name:product.name,status:response.status});
  if(!product.demo?.video)continue;
  for(const mediaPath of [product.demo.video,product.demo.poster]){
    const media=await get(mediaPath);
    assert.equal(media.status,200,mediaPath);
    const bytes=Buffer.from(await media.arrayBuffer());
    const expected=readFileSync(new URL('../public'+mediaPath,import.meta.url));
    assert.equal(hash(bytes),hash(expected),`${mediaPath}: deployed bytes`);
    report.media.push({path:mediaPath,bytes:bytes.length,sha256:hash(bytes),contentType:media.headers.get('content-type')});
  }
}
const hub=await (await get('/products/')).text();
const home=await (await get('/')).text();
const sitemap=await (await get('/sitemap.xml')).text();
assert.ok(hub.includes('Kartar Media')&&!hub.includes('NewsTime'),'Kartar Media naming');
assert.ok(home.includes('AI Product Development with Sachmeet'),'Current homepage');
for(const slug of ['prodvton','wingmen','artrenamer','speko','rezt']){
  const path=`/products/${slug}/`;
  assert.ok(!hub.includes(path)&&!home.includes(path)&&!sitemap.includes(path),`${slug}: excluded from catalogue`);
  const response=await get(path);
  assert.equal(response.status,404,`${slug}: withdrawn route`);
  report.excluded.push({path,status:response.status});
}
console.log(JSON.stringify(report,null,2));
