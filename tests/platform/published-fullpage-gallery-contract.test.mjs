import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const projects = await readFile(new URL('../../apps/platform/src/content/projects.ts', import.meta.url), 'utf8');
const styles = await readFile(new URL('../../apps/platform/src/portfolio.css', import.meta.url), 'utf8');

test('seven public project case studies use immutable reviewed desktop and mobile full-page captures', () => {
  assert.match(projects, /FULL_PAGE_CAPTURE_COMMIT = 'eba5e2d02047375ae8a42514f7bbb58c75106ba7'/);
  for (const slug of ['aetherflow','orbit','pooya-os','nexus-canvas','lumina-glass','aurapulse','salon-booking']) {
    assert.match(projects, new RegExp(slug.replaceAll('-', '\\-') + '-fullpage-desktop\\.png'));
    assert.match(projects, new RegExp(slug.replaceAll('-', '\\-') + '-fullpage-mobile\\.png'));
  }
  assert.match(projects, /GlobalCart's latest full-page catalog capture is intentionally held back/);
  assert.match(projects, /AuraPulse simulated dashboard/);
  assert.match(projects, /public Salon Booking flow/);
});

test('full-page captures remain scrollable and keyboard accessible inside case studies', () => {
  assert.match(styles, /\.case-study-media-frame\s*\{[^}]*overflow:auto/s);
  assert.match(styles, /\.case-study-media-frame:focus-visible/);
});
