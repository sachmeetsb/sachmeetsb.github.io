import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';

const html = readFileSync(new URL('../dist/index.html', import.meta.url), 'utf8');

test('boot protection precedes external assets and preserves the static catalogue', () => {
  assert.ok(html.indexOf("classList.add('app-pending')") < html.indexOf('fonts.googleapis.com'));
  assert.match(html, /html\.app-pending #root\{visibility:hidden\}/);
  assert.match(html, /#site-boot\{display:none\}/);
  assert.match(html, /id="site-boot" role="status"/);
  assert.match(html, /id="root"><div/);
  assert.match(html, /href="\/products\/vimarsha\/"/);
});

test('boot protection expires if the application fails to mount', () => {
  const classes = new Set();
  let recovery;
  const script = html.match(/<script>\s*(document\.documentElement[\s\S]*?)<\/script>/)[1];
  runInNewContext(script, {
    document: {documentElement: {classList: {add: v => classes.add(v), remove: v => classes.delete(v)}}},
    window: {},
    setTimeout: (fn, delay) => { assert.equal(delay, 10000); recovery = fn; return 1; },
  });
  assert.ok(classes.has('app-pending'));
  recovery();
  assert.equal(classes.has('app-pending'), false);
});

test('generated SEO does not invent platform support or modification dates', () => {
  const sitemap = readFileSync(new URL('../dist/sitemap.xml', import.meta.url), 'utf8');
  assert.doesNotMatch(sitemap, /<lastmod>/);
  const product = readFileSync(new URL('../dist/products/vimarsha/index.html', import.meta.url), 'utf8');
  assert.doesNotMatch(product, /"operatingSystem":"Web"/);
});
