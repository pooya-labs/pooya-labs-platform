import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const app = await readFile(new URL('../../apps/platform/src/App.tsx', import.meta.url), 'utf8');
const css = await readFile(new URL('../../apps/platform/src/styles.css', import.meta.url), 'utf8');
const html = await readFile(new URL('../../apps/platform/index.html', import.meta.url), 'utf8');

test('platform shell mounts the cursor lens as a decorative layer', () => {
  assert.match(app, /<CursorField\s*\/>/);
  assert.match(app, /className="cursor-field-glow"/);
  assert.match(app, /className="cursor-field-lens"/);
  assert.match(app, /aria-hidden="true"/);
});

test('cursor effect follows fine pointers with an eased animation frame loop', () => {
  assert.match(app, /addEventListener\('pointermove'/);
  assert.match(app, /requestAnimationFrame\(render\)/);
  assert.match(app, /glowX \+= \(targetX - glowX\) \* 0\.17/);
  assert.match(app, /lensX \+= \(targetX - lensX\) \* 0\.31/);
  assert.match(app, /cancelAnimationFrame\(frame\)/);
});

test('cursor effect respects touch and reduced-motion preferences', () => {
  assert.match(app, /matchMedia\('\(pointer: fine\)'\)/);
  assert.match(app, /matchMedia\('\(prefers-reduced-motion: reduce\)'\)/);
  assert.match(css, /@media \(max-width: 760px\)[\s\S]*?\.cursor-field\s*\{\s*display:\s*none;/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)[\s\S]*?\.cursor-field\s*\{\s*display:\s*none\s*!important;/);
});

test('cursor lens uses a translucent backdrop-filter layer without replacing the native cursor', () => {
  assert.match(css, /backdrop-filter:\s*blur\(13px\) saturate\(165%\)/);
  assert.match(css, /mix-blend-mode:\s*screen/);
  assert.doesNotMatch(css, /cursor:\s*none/);
});

test('platform page has responsive viewport metadata and Persian-first document direction', () => {
  assert.match(html, /name="viewport"/);
  assert.match(html, /lang="fa" dir="rtl"/);
  assert.match(html, /id="root"/);
});
