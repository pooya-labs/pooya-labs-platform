import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const home = await readFile(new URL('../../apps/platform/src/PortfolioHome.tsx', import.meta.url), 'utf8');
const main = await readFile(new URL('../../apps/platform/src/main.tsx', import.meta.url), 'utf8');
const css = await readFile(new URL('../../apps/platform/src/portfolio.css', import.meta.url), 'utf8');
const vite = await readFile(new URL('../../apps/platform/vite.config.ts', import.meta.url), 'utf8');
const metadata = await readFile(new URL('../../apps/platform/index.html', import.meta.url), 'utf8');
const monogram = await readFile(new URL('../../apps/platform/public/brand/pooya-monogram.webp', import.meta.url));
const wordmark = await readFile(new URL('../../apps/platform/public/brand/pooya-wordmark.webp', import.meta.url));
const favicon = await readFile(new URL('../../apps/platform/index.html', import.meta.url), 'utf8');

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
  assert.match(home, /className="portfolio-proof-stats" role="group" aria-label=\{t\.proofEyebrow\}/);
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
  assert.ok(monogram.length > 3000);
  assert.ok(wordmark.length > 8000);
  assert.match(home, /brand\/pooya-monogram\.webp/);
  assert.match(home, /brand\/pooya-wordmark\.webp/);
  assert.match(home, /className="pooya-wordmark"/);
  assert.match(home, /className="stamp-core"><img/);
  assert.match(home, /portfolio-github-mark/);
  assert.match(home, /portfolio-contact-github/);
  assert.match(home, /github\.com\/pooya-labs/);
  assert.match(favicon, /rel="icon"[^>]+href="%BASE_URL%(?:favicon\.svg|brand\/pooya-monogram\.webp)"/);
  assert.doesNotMatch(home, /brand\/pooya-mark\.svg|brand\/pooya-mark-emerald\.webp/);
});



test('project screenshot scroll regions have unique, project-specific accessible names', () => {
  assert.doesNotMatch(home, /قاب اسکرول‌پذیر تصویر پروژه|Scrollable project screenshot frame/);
  assert.match(home, /heroVisual\.alt\[language\]/);
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

test('the owner-designed monogram and wordmark replace the generated identity', () => {
  assert.ok(monogram.byteLength > 3000);
  assert.ok(wordmark.byteLength > 8000);
  assert.match(home, /brand\/pooya-monogram\.webp/);
  assert.match(home, /brand\/pooya-wordmark\.webp/);
  assert.match(favicon, /rel="icon"[^>]+href="%BASE_URL%(?:favicon\.svg|brand\/pooya-monogram\.webp)"/);
  assert.doesNotMatch(home, /brand\/pooya-mark\.svg|brand\/pooya-mark-emerald\.webp/);
});


test('the English hero keeps thoughtful as an isolated, unbroken LTR word', () => {
  assert.ok(home.includes("headlineB: 'into',") && home.includes("headlineWord: 'thoughtful'"));
  assert.ok(home.includes('hero-title-word-line'));
  assert.ok(home.includes('<bdi dir="ltr" className="hero-title-word">{t.headlineWord}</bdi>'));
  assert.ok(css.includes('.portfolio-hero-copy .hero-title-word-line'));
  assert.ok(css.includes('white-space:nowrap!important'));
  assert.ok(css.includes('-webkit-text-fill-color:#79e5c5!important'));
  assert.ok(css.includes('background:none!important'));
  assert.ok(css.includes('color:#79e5c5!important'));
  const browserQa = readFile(new URL('../../apps/platform/scripts/portfolio-browser-qa.mjs', import.meta.url), 'utf8');
  return browserQa.then((source) => assert.ok(source.includes('thoughtful headline word is missing, split, or clipped')));
});

test('the supplied monogram is borderless and its reveal respects reduced motion', () => {
  const ownerBrandRule = css.slice(css.indexOf('/* Owner-supplied Pooya identity'), css.indexOf('.pooya-wordmark'));
  assert.ok(ownerBrandRule.includes('border:0!important'));
  assert.ok(ownerBrandRule.includes('background:transparent!important'));
  assert.ok(css.includes('@keyframes pooya-user-mark-enter'));
  assert.ok(css.includes('@media (prefers-reduced-motion:reduce)'));
  assert.ok(home.includes('pooya-wordmark.webp'));
});

test('Instagram contact uses a dedicated brand glyph instead of a camera icon', async () => {
  const instagram = await readFile(new URL('../../apps/platform/public/brand/instagram-glyph.svg', import.meta.url), 'utf8');
  assert.ok(home.includes('instagram-glyph.svg'));
  assert.ok(home.includes('className="instagram-brand-icon"'));
  assert.doesNotMatch(home, /Camera/);
  assert.ok(instagram.includes('aria-label="Instagram"'));
  assert.ok(instagram.includes('instagram-gradient'));
});

test('each case study and selected-project card receives a product-specific motion composition', async () => {
  const projects = await readFile(new URL('../../apps/platform/src/content/projects.ts', import.meta.url), 'utf8');
  const slugs = ['aetherflow','orbit','pooya-os','nexus-canvas','lumina-glass','aura-pulse','global-cart','salon-booking'];
  for (const slug of slugs) {
    assert.ok(projects.includes("slug: '" + slug + "'"), `Missing content entry for ${slug}`);
    assert.ok(css.includes('.scene-' + slug + ' {'), `Missing case-study scene styling for ${slug}`);
    assert.ok(css.includes('.card-scene-' + slug), `Missing project-card motion for ${slug}`);
  }
  assert.match(home, /function ProjectMotionScene/);
  assert.match(home, /const heroVisual = project\.caseStudyHeroAsset \?\? project\.visualAsset/);
  assert.match(home, /<ProjectMotionScene slug=\{project\.slug\} \/>/);
  assert.match(home, /case-study-motion-art scene-\$\{slug\}/);
  assert.match(home, /<ProjectMotionScene slug=\{project\.slug\} \/>/);
  assert.match(home, /<ProjectMotionScene slug=\{project\.slug\} \/>/);
  for (const visual of ['flow-sequence','orbit-dashboard','os-desktop','nexus-stage','glass-stage','market-stage','commerce-stage','booking-stage']) {
    assert.ok(home.includes(visual), `Missing product narrative visual: ${visual}`);
  }
  for (const animation of ['flow-packet-pass','orbit-trace-draw','os-window-front-float','nexus-edge-flow','glass-prism-hover','market-line-draw','commerce-route-pulse','booking-slot-breathe']) {
    assert.ok(css.includes('@keyframes ' + animation), `Missing motion behavior: ${animation}`);
  }
  assert.match(home, /market-simulated/);
  assert.match(home, /SIMULATED/);
  assert.match(css, /@media \(prefers-reduced-motion:reduce\)[\s\S]*?\.case-study-motion-art \.scene-animated[\s\S]*?animation:none!important/);
});


test('progressive reveal triggers as soon as a section intersects a mobile scroll root', () => {
  assert.match(home, /threshold: 0, rootMargin: '0px 0px -3% 0px'/);
  assert.match(home, /if \(!entry\.isIntersecting\) continue/);
  assert.match(home, /observer\.unobserve\(entry\.target\)/);
});


test('homepage Projects content is never hidden behind intersection-based reveal gates', () => {
  assert.match(home, /className="portfolio-projects portfolio-container" id="projects"/);
  assert.doesNotMatch(home, /id="projects" data-reveal="projects"/);
  assert.doesNotMatch(home, /portfolio-section-heading" data-reveal="projects-heading"/);
  assert.doesNotMatch(home, /portfolio-project-card" key=\{project\.name\} data-reveal="project-card"/);
  assert.match(home, /<ProjectMotionScene slug=\{project\.slug\} \/>/);
});


test('header contrast remains inspectable without a decorative pseudo-element over its text', () => {
  assert.doesNotMatch(css, /\.portfolio-header::after/);
  assert.match(css, /\.portfolio-header\s*\{[\s\S]*?background:\s*var\(--pf-control-bg\)/);
  assert.match(css, /\.portfolio-nav\s*\{[\s\S]*?background:\s*var\(--pf-control-surface\)/);
  assert.match(css, /--pf-control-bg:#0d1516/);
  assert.match(css, /--pf-control-bg:#fffffc/);
});
