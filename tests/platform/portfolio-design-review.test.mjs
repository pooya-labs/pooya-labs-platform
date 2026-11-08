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


test('the English hero keeps thoughtful as an isolated, unbroken LTR word', () => {
  assert.ok(home.includes("headlineB: 'into',") && home.includes("headlineWord: 'thoughtful'"));
  assert.ok(home.includes('<bdi dir="ltr" className="hero-title-word">{t.headlineWord}</bdi>'));
  assert.ok(css.includes('.portfolio-hero-title .hero-title-word'));
  assert.ok(css.includes('white-space:nowrap'));
  assert.ok(css.includes('padding-inline-end:.13em'));
  const browserQa = readFile(new URL('../../apps/platform/scripts/portfolio-browser-qa.mjs', import.meta.url), 'utf8');
  return browserQa.then((source) => assert.ok(source.includes('thoughtful headline word is missing, split, or clipped')));
});

test('the header mark has no square badge and uses a reduced-motion-safe reveal', () => {
  assert.doesNotMatch(mark, /<rect/);
  const latestMarkRule = css.slice(css.lastIndexOf('.portfolio-brand-mark {'));
  assert.ok(latestMarkRule.includes('border:0!important'));
  assert.ok(latestMarkRule.includes('background:transparent!important'));
  assert.ok(css.includes('@keyframes pooya-mark-arrive'));
  assert.ok(css.includes('@media (prefers-reduced-motion:reduce)'));
  assert.ok(css.includes('.portfolio-brand-mark img { opacity:1!important;'));
  assert.ok(favicon.includes('#35C99A'));
});

test('Instagram contact uses a dedicated brand glyph instead of a camera icon', async () => {
  const instagram = await readFile(new URL('../../apps/platform/public/brand/instagram-glyph.svg', import.meta.url), 'utf8');
  assert.ok(home.includes('instagram-glyph.svg'));
  assert.ok(home.includes('className="instagram-brand-icon"'));
  assert.doesNotMatch(home, /Camera/);
  assert.ok(instagram.includes('aria-label="Instagram"'));
  assert.ok(instagram.includes('instagram-gradient'));
});

test('each product case study receives its own decorative motion language', () => {
  const projects = readFile(new URL('../../apps/platform/src/content/projects.ts', import.meta.url), 'utf8');
  return projects.then((source) => {
    for (const slug of ['aetherflow','orbit','pooya-os','nexus-canvas','lumina-glass','aura-pulse','global-cart','salon-booking']) {
      assert.ok(source.includes("slug: '" + slug + "'"));
      assert.ok(css.includes('.scene-' + slug + ' {'));
    }
    assert.ok(home.includes('case-study-motion-art scene-${project.slug}'));
    assert.ok(home.includes('motion-calendar'));
    assert.ok(home.includes('motion-bars'));
    assert.ok(css.includes('.case-study-motion-art::before'));
  });
});
