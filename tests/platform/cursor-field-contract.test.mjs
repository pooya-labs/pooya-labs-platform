import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const app = await readFile(new URL('../../apps/platform/src/App.tsx', import.meta.url), 'utf8');
const css = await readFile(new URL('../../apps/platform/src/styles.css', import.meta.url), 'utf8');
const html = await readFile(new URL('../../apps/platform/index.html', import.meta.url), 'utf8');
const portfolio = await readFile(new URL('../../apps/platform/src/PortfolioHome.tsx', import.meta.url), 'utf8');
const portfolioCss = await readFile(new URL('../../apps/platform/src/portfolio.css', import.meta.url), 'utf8');

test('the custom pointer-following lens is fully removed from the platform', () => {
  const source = [app, portfolio, css, portfolioCss].join("\\n");
  for (const obsoleteToken of [
    'CursorField',
    'PointerLens',
    'cursor-field',
    'portfolio-pointer',
  ]) {
    assert.equal(source.includes(obsoleteToken), false, `obsolete pointer effect remains: ${obsoleteToken}`);
  }
});

test('the native pointer remains visible', () => {
  const styles = [css, portfolioCss].join("\\n");
  assert.equal(styles.includes('cursor: none'), false);
  assert.equal(styles.includes('cursor:none'), false);
});

test('platform page has responsive viewport metadata and Persian-first document direction', () => {
  assert.match(html, /name="viewport"/);
  assert.match(html, /lang="fa" dir="rtl"/);
  assert.match(html, /id="root"/);
});
