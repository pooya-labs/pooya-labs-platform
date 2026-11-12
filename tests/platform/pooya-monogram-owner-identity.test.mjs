import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const portfolio = await readFile(new URL('../../apps/platform/src/PortfolioHome.tsx', import.meta.url), 'utf8');
const css = await readFile(new URL('../../apps/platform/src/portfolio.css', import.meta.url), 'utf8');
const metadata = await readFile(new URL('../../apps/platform/index.html', import.meta.url), 'utf8');
const monogramTile = await readFile(new URL('../../apps/platform/public/brand/pooya-monogram-tile.svg', import.meta.url), 'utf8');
const readme = await readFile(new URL('../../README.md', import.meta.url), 'utf8');
const browserQa = await readFile(new URL('../../apps/platform/scripts/portfolio-browser-qa.mjs', import.meta.url), 'utf8');
const ownerPacket = await readFile(new URL('../../docs/OWNER-REVIEW-PACKET.md', import.meta.url), 'utf8');
const releaseChecklist = await readFile(new URL('../../docs/RELEASE.md', import.meta.url), 'utf8');

test('Pooya Goodarzi is shown as owner on homepage and all case-study routes', () => {
  assert.equal((portfolio.match(/<OwnerAttribution language=/g) ?? []).length, 2);
  for (const value of ['POOYA GOODARZI','پویا گودرزی','PROJECT OWNER','مالک پروژه','Created & maintained by Pooya Goodarzi','ایجاد و نگه‌داری: پویا گودرزی','brand/pooya-monogram-tile.svg']) assert.ok(portfolio.includes(value), 'Missing owner signature detail: ' + value);
  assert.ok(css.includes('.portfolio-owner-attribution'));
});

test('bilingual README uses the matching owner name and tile', () => {
  for (const value of ['Project owner identity','Pooya Monogram','هویت مالک پروژه','alt="Pooya Monogram — project owner mark"','alt="نشان مالک پروژه، پویا مونوگرام"']) assert.ok(readme.includes(value), 'Missing README owner detail: ' + value);
});

test('structured data and the existing black-tile logo identify Pooya Monogram', () => {
  for (const value of ['"name": "Pooya Goodarzi"','"alternateName": ["Pooya Monogram", "پویا مونوگرام", "Pooya"]','"@type": "Brand"','"name": "Pooya Monogram"','brand/pooya-monogram-tile.svg']) assert.ok(metadata.includes(value), 'Missing structured data: ' + value);
  assert.ok(monogramTile.includes('<title id="title">Pooya Monogram — Project Owner Mark</title>'));
  assert.ok(monogramTile.includes('<rect width="96" height="96" rx="18" fill="#000000"/>'));
});

test('browser QA checks the owner name and loaded monogram on every localized route', () => {
  for (const value of ['ownerAttributionCount','ownerAttributionText','ownerAttributionImage','brand/pooya-monogram-tile.svg','POOYA GOODARZI','پویا گودرزی']) assert.ok(browserQa.includes(value), 'Missing browser owner check: ' + value);
});

test('owner approval is limited and the new release check stays open', () => {
  assert.ok(ownerPacket.includes('Owner-confirmed platform identity'));
  assert.ok(ownerPacket.includes('does not approve the eight independent project dossiers/media'));
  assert.ok(releaseChecklist.includes('Verify the Pooya Monogram owner signature'));
  assert.ok(releaseChecklist.includes('pre-alpha / portfolio draft'));
  assert.ok(releaseChecklist.includes('A V1 tag is prohibited'));
});
