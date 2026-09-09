import fs from 'node:fs/promises';
import path from 'node:path';

// Records actual browser screenshots, retaining their measured wall-clock timing.
// Browser interaction is supplied by the supported browser runtime, not a second driver.
export async function captureDemo(tab, directory, steps, {maxMs=55000}={}) {
  await fs.mkdir(directory, {recursive:true});
  const frames=[], events=[];
  const started=Date.now();
  let stopped=false;
  const delay=ms=>new Promise(resolve=>setTimeout(resolve,ms));
  const loop=(async()=>{
    while(!stopped && Date.now()-started<maxMs){
      const t=(Date.now()-started)/1000;
      const bytes=await tab.screenshot({fullPage:false});
      const file=`frame-${String(frames.length).padStart(5,'0')}.jpg`;
      await fs.writeFile(path.join(directory,file),bytes);
      frames.push({file,t});
      await delay(60);
    }
  })();
  let error;
  try {
    for(const step of steps){
      if(Date.now()-started>=maxMs) throw new Error('Capture time limit reached');
      const evidence=step.action ? await step.action() : undefined;
      events.push({label:step.label,t:(Date.now()-started)/1000,evidence});
      await delay(step.holdMs??4000);
    }
  } catch(e){error=String(e);} finally {stopped=true; await loop;}
  const manifest={capturedAt:new Date(started).toISOString(),sourceUrl:await tab.url(),audio:false,
    duration:(Date.now()-started)/1000,frames,events,error};
  await fs.writeFile(path.join(directory,'capture.json'),JSON.stringify(manifest,null,2));
  if(error) throw new Error(error);
  return {directory,frames:frames.length,duration:manifest.duration,events};
}
