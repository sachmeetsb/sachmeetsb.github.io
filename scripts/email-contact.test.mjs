import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
test('contact and footer use the correct address and an accessible copy fallback',()=>{
  const source=read('src/components/EmailContact.jsx');
  assert.match(source,/CONTACT_EMAIL = 'sachmeet@kartar\.ai'/);
  assert.match(source,/href=\{`mailto:\$\{CONTACT_EMAIL\}`\}/);
  assert.match(source,/navigator.clipboard.writeText\(CONTACT_EMAIL\)/);
  assert.match(source,/role="status"/);
  for(const component of ['Footer','ContactForm'])assert.match(read(`src/components/${component}.jsx`),/<EmailContact/);
});
test('production build receives the public Vapi settings',()=>{
  const workflow=read('.github/workflows/deploy.yml');
  for(const name of ['VITE_VAPI_PUBLIC_KEY','VITE_VAPI_ASSISTANT_ID'])assert.ok(workflow.includes(`${name}: \${{ vars.${name} }}`));
});
