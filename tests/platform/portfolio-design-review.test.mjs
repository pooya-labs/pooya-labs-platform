import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const home = await readFile(new URL('../../apps/platform/src/PortfolioHome.tsx', import.meta.url), 'utf8');
const main = await readFile(new URL('../../apps/platform/src/main.tsx', import.meta.url), 'utf8');
const css = await readFile(new URL('../../apps/platform/src/portfolio.css', import.meta.url), 'utf8');
const vite = await readFile(new URL('../../apps/platform/vite.config.ts', import.meta.url), 'utf8');
const metadata = await readFile(new URL('../../apps/platform/index.html', import.meta.url), 'utf8');
const mark = await readFile(new URL('../../apps/platform/public/brand/pooya-mark.svg', import.meta.url), 'utf8');
const favicon = await readFile(new URL('../../apps/platform/public/favicon.svg', import.meta.url), 'utf8');

test('architecture diagram labels are wrapped and centered within fixed node geometry', () => {
  assert.match(vite, /function wrapDiagramLabel/);
  assert.match(vite, /function renderDiagramTextLines/);
  assert.match(vite, /nodeHeight = 172/);
  assert.match(vite, /text-anchor="middle" direction="\$\{direction\}" unicode-bidi="plaintext"/);
  assert.match(vite, /wrapDiagramLabel\(item\.title\[locale\]/);
  assert.match(vite, /wrapDiagramLabel\(item\.detail\[locale\]/);
});

test('direct route startup uses document scrolling and disables browser position restoration', () => {
  assert.match(main, /window\.history\.scrollRestoration = 'manual'/);
  assert.match(main, /window\.scrollTo\(0, 0\)/);
  assert.match(css, /height:auto;min-height:100vh;overflow-x:clip;overflow-y:visible/);
  const finalRootRule = css.lastIndexOf('.portfolio-page {');
  assert.ok(finalRootRule >= 0);
  assert.match(css.slice(finalRootRule, finalRootRule + 700), /height:auto;min-height:100vh;overflow-x:clip;overflow-y:visible/);
});

test('proof scene follows the Stripe hierarchy with metrics before a full-width radial field', () => {
  assert.match(home, /const proofRays = Array\.from\(\{ length: 112 \}/);
  assert.match(home, /const proofParticles = Array\.from\(\{ length: 72 \}/);
  assert.match(home, /className="portfolio-proof"/);
  assert.match(home, /className="portfolio-proof-stats"/);
  assert.match(home, /className="proof-radial-svg"/);
  assert.match(home, /className="proof-ray"/);
  assert.match(home, /className="proof-particle"/);
  assert.match(css, /\.portfolio-proof \{[^}]*width:100%/);
  assert.match(css, /\.portfolio-proof-stats \{[^}]*grid-template-columns:repeat\(4,minmax\(0,1fr\)\)/);
  assert.match(css, /@keyframes proof-ray-flow/);
  assert.match(css, /\.portfolio-page\[data-theme="light"\] \.portfolio-proof/);
});

test('owner contact links are visible, labelled, and included in the footer and profile metadata', () => {
  assert.match(home, /https:\/\/t\.me\/pooyayee/);
  assert.match(home, /@pooyayee/);
  assert.match(home, /https:\/\/instagram\.com\/_p\.ooya/);
  assert.match(home, /@_p\.ooya/);
  assert.match(home, /className="portfolio-contact-actions"/);
  assert.match(home, /className="portfolio-footer-socials"/);
  assert.match(metadata, /https:\/\/t\.me\/pooyayee/);
  assert.match(metadata, /https:\/\/instagram\.com\/_p\.ooya/);
});

test('the supplied gold folded-ribbon mark is used in the About and GitHub surfaces', () => {
  assert.match(mark, /viewBox="0 0 167 183"/);
  assert.match(mark, /linearGradient id="gold"/);
  assert.match(mark, /#fff3c9/);
  assert.match(home, /className="stamp-core"><img/);
  assert.match(home, /portfolio-github-mark/);
  assert.match(home, /portfolio-contact-github/);
  assert.match(home, /github\.com\/pooya-labs/);
  assert.match(favicon, /linearGradient id="gold"/);
  assert.doesNotMatch(mark, /#4AC99A|mark-accent/);
});


test('project screenshot scroll regions have unique, project-specific accessible names', () => {
  assert.doesNotMatch(home, /قاب اسکرول‌پذیر تصویر پروژه|Scrollable project screenshot frame/);
  assert.match(home, /\$\{project\.name\} — نمای واقعی محیط دسکتاپ/);
  assert.match(home, /\$\{project\.name\} — \$\{item\.caption\.fa\}/);
  assert.match(home, /\$\{project\.name\} — \$\{item\.caption\.en\}/);
});
