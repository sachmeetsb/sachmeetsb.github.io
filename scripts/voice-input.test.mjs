import test from 'node:test';
import assert from 'node:assert/strict';
import {createVoiceSession, recognitionTranscript, suggestVoiceOption} from '../src/lib/voiceInput.js';

test('typed-only booking and idle cleanup never announce a microphone session',()=>{
  const states=[];
  const voice=createVoiceSession({onState:s=>states.push(s),onTranscript:()=>{}});
  voice.stop(); voice.stop();
  assert.deepEqual(states,[]);
});

test('ambiguous and negated qualification statements never silently select an option', () => {
  const options = ['Up to ₹5 lakh', '₹5–15 lakh', '₹15 lakh+', 'Final decision-maker'];
  for (const text of ['five to fifteen lakh', 'under fifteen lakh', 'I am not the final decision maker']) {
    assert.equal(suggestVoiceOption(text, options), '');
  }
  assert.equal(suggestVoiceOption('Final decision-maker', options), 'Final decision-maker');
  assert.equal(suggestVoiceOption('₹5–15 lakh', options), '₹5–15 lakh');
});

test('cumulative recognition results do not duplicate final text', () => {
  assert.equal(recognitionTranscript([[{transcript:'Improve'}], [{transcript:'the workflow'}]]), 'Improve the workflow');
});

test('old callbacks cannot stop or write into a newer session', () => {
  const sessions = [], states = [], drafts = [];
  class Recognition {
    constructor(){sessions.push(this);}
    start(){this.onstart();}
    abort(){this.onend?.();}
  }
  const voice = createVoiceSession({Recognition,onState:s=>states.push(s),onTranscript:(...args)=>drafts.push(args)});
  voice.start('company'); voice.start('role');
  sessions[0].onend();
  sessions[0].onresult({results:[[{transcript:'old field'}]]});
  assert.equal(states.at(-1).field,'role'); assert.equal(drafts.length,0);
  sessions[1].onresult({results:[[{transcript:'Engineer'}]]});
  assert.deepEqual(drafts.at(-1), ['role','Engineer']);
  voice.stop(); assert.equal(states.at(-1).field,'');
  sessions[1].onresult({results:[[{transcript:'late'}]]});
  assert.equal(drafts.length,1);
});

test('permission failure and missing API leave no active recording', () => {
  let latest, instance;
  class Recognition {constructor(){instance=this;} start(){} abort(){this.onend?.();}}
  const voice=createVoiceSession({Recognition,onState:s=>latest=s,onTranscript:()=>{}});
  voice.start('outcome'); instance.onerror({error:'not-allowed'});
  assert.equal(latest.field,''); assert.match(latest.status,/permission/);
  createVoiceSession({onState:s=>latest=s,onTranscript:()=>{}}).start('outcome');
  assert.equal(latest.field,''); assert.match(latest.status,/unavailable/);
});

test('a browser abort exception cannot block confirmation or cleanup',()=>{
  let latest;
  class Recognition {start(){} abort(){throw new Error('InvalidStateError');}}
  const voice=createVoiceSession({Recognition,onState:s=>latest=s,onTranscript:()=>{}});
  voice.start('budget');
  assert.doesNotThrow(()=>voice.stop());
  assert.equal(latest.field,'');
  assert.doesNotThrow(()=>voice.stop());
});
