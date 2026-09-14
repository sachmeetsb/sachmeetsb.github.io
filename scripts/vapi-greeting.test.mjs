import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

test('website calls override the dashboard opening with the exact fixed greeting',()=>{
  const source=readFileSync(new URL('../src/lib/useVapiCall.js',import.meta.url),'utf8');
  const options=source.match(/await vapi\.start\(ASSISTANT_ID, \{([\s\S]*?)\n        \}\);/)?.[1];
  assert.ok(options,'the greeting must be supplied to call start');
  assert.match(options,/firstMessage: "Hi Welcome to Kartar AI Labs"/);
  assert.match(options,/firstMessageMode: "assistant-speaks-first"/);
  assert.doesNotMatch(options,/assistant-speaks-first-with-model-generated-message/);
  assert.match(options,/variableValues: \{ pageContent, currentSection \}/);
});
