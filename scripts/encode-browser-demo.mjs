import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';

const [directory,output,privacyBox,crop]=process.argv.slice(2);
if(!directory||!output) throw new Error('Usage: node encode-browser-demo.mjs CAPTURE_DIRECTORY OUTPUT.mp4 [privacy x:y:w:h] [crop w:h:x:y]');
const m=JSON.parse(fs.readFileSync(path.join(directory,'capture.json'),'utf8'));
if(m.error || m.frames.length<2) throw new Error('Incomplete capture');
const lines=[];
for(let i=0;i<m.frames.length;i++){
  const frame=m.frames[i];
  if(!/^frame-\d+\.jpg$/.test(frame.file)) throw new Error('Invalid capture filename');
  lines.push(`file '${frame.file}'`,`duration ${Math.max(.001,(m.frames[i+1]?.t??m.duration)-frame.t).toFixed(6)}`);
}
lines.push(`file '${m.frames.at(-1).file}'`);
fs.writeFileSync(path.join(directory,'frames.ffconcat'),lines.join('\n'));
const filters=[];
if(privacyBox){
  const parts=privacyBox.split(':').map(Number);
  if(parts.length!==4||parts.some(n=>!Number.isFinite(n)||n<0)) throw new Error('Invalid privacy rectangle');
  const [x,y,w,h]=parts; filters.push(`drawbox=x=${x}:y=${y}:w=${w}:h=${h}:color=0xf2f5f0:t=fill`);
}
if(crop){
  if(!/^\d+:\d+:\d+:\d+$/.test(crop)) throw new Error('Invalid crop rectangle: width:height:x:y');
  filters.push(`crop=${crop}`);
}
filters.push('scale=1280:720:force_original_aspect_ratio=decrease','pad=1280:720:(ow-iw)/2:(oh-ih)/2:color=0x0f0a1e','setsar=1','fps=24');
function ffmpeg(args){const r=spawnSync('ffmpeg',['-hide_banner','-loglevel','error','-n',...args],{stdio:'inherit'});if(r.status!==0)throw new Error('ffmpeg failed');}
ffmpeg(['-f','concat','-safe','0','-i',path.join(directory,'frames.ffconcat'),'-vf',filters.join(','),'-an','-c:v','libx264','-preset','fast','-crf','22','-pix_fmt','yuv420p','-movflags','+faststart',output]);
ffmpeg(['-ss','1','-i',output,'-frames:v','1','-q:v','2',output.replace(/\.mp4$/,'.jpg')]);
console.log(JSON.stringify({output,duration:m.duration,frames:m.frames.length,audio:false,privacyBox,events:m.events.map(({label,t})=>({label,t}))},null,2));
