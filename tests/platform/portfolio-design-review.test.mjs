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
  const scrollRule = css.lastIndexOf('/* One scroll surface for the public portfolio');
  assert.ok(scrollRule >= 0);
  assert.match(css.slice(scrollRule, scrollRule + 900), /height:100vh(?:!important)?;\s*height:100dvh(?:!important)?;[\s\S]*?overflow-y:auto(?:!important)?/);
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

test('the signal-orbit emerald monogram is used throughout the site identity', () => {
  assert.match(mark, /viewBox="0 0 128 128"/);
  assert.match(mark, /linearGradient id="mark-main"/);
  assert.match(mark, /linearGradient id="mark-fold"/);
  assert.match(home, /className="stamp-core"><img/);
  assert.match(home, /portfolio-github-mark/);
  assert.match(home, /portfolio-contact-github/);
  assert.match(home, /github\.com\/pooya-labs/);
  assert.match(favicon, /viewBox="0 0 96 96"/);
  assert.match(favicon, /#30C49A/);
  assert.doesNotMatch(mark, /gold|metallic|#d8b36a|#fff3c9/i);
});



test('project screenshot scroll regions have unique, project-specific accessible names', () => {
  assert.doesNotMatch(home, /قاب اسکرول‌پذیر تصویر پروژه|Scrollable project screenshot frame/);
  assert.match(home, /\$\{project\.name\} — نمای واقعی محیط دسکتاپ/);
  assert.match(home, /\$\{project\.name\} — \$\{item\.caption\.fa\}/);
  assert.match(home, /\$\{project\.name\} — \$\{item\.caption\.en\}/);
});


test('the first-page English headline runs are isolated from surrounding RTL direction', () => {
  assert.match(home, /className="portfolio-hero-title" dir="auto"/);
  assert.match(home, /dir="auto" className="hero-title-line"/);
  assert.match(home, /<bdi dir="auto">\{t\.capabilityTitle\}<\/bdi>/);
  assert.match(home, /capabilityTitle: 'Thoughtful engineering, from interface to infrastructure\.'/);
  assert.match(css, /\.hero-title-line\[dir="auto"\] \{ unicode-bidi:isolate/);
});

test('two additional animated sections are bilingual, responsive, and reduced-motion safe', () => {
  assert.match(home, /className="portfolio-system-field portfolio-container"/);
  assert.match(home, /className="system-field-node"/);
  assert.match(home, /className="portfolio-craft portfolio-container"/);
  assert.match(home, /className="craft-principle"/);
  for (const copy of ['systemEyebrow:', 'systemTitle:', 'systemNode1:', 'systemNode2:', 'systemNode3:', 'craftEyebrow:', 'craftTitle:', 'craft1Title:', 'craft2Title:', 'craft3Title:', 'craft4Title:']) {
    assert.equal((home.match(new RegExp(copy, 'g')) ?? []).length, 2, copy + ' must be localized in Persian and English');
  }
  assert.match(css, /@keyframes system-wire-travel/);
  assert.match(css, /@keyframes craft-orbit/);
  assert.match(css, /\.system-field-wires,.system-wire-flow/);
  assert.match(css, /@media \(prefers-reduced-motion:reduce\)[\s\S]*?system-wire-flow[\s\S]*?animation:none!important/);
});

test('the redesigned signal-orbit monogram and matching favicon replace the previous mark', () => {
  assert.match(mark, /viewBox="0 0 128 128"/);
  assert.match(mark, /linearGradient id="mark-main"/);
  assert.match(mark, /linearGradient id="mark-fold"/);
  assert.match(mark, /linearGradient id="mark-orbit"/);
  assert.match(favicon, /viewBox="0 0 96 96"/);
  assert.match(favicon, /#30C49A/);
  assert.doesNotMatch(mark, /#fff3c9|#e9bf76|#d8b36a/i);
});
