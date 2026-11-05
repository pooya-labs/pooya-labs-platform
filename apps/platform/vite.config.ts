import { defineConfig, type Plugin, type OutputAsset, type OutputBundle } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';
import { fileURLToPath } from 'node:url';
import { portfolioProjects, type PortfolioProject } from './src/content/projects';
import { coreDossiers } from './src/content/case-study-dossiers-core';
import { productDossiers } from './src/content/case-study-dossiers-products';
import type { CaseStudyDossier } from './src/content/case-study-dossiers-types';

const root = fileURLToPath(new URL('.', import.meta.url));
const SITE_ORIGIN = 'https://pooya-labs.github.io';
const SITE_BASE = '/pooya-labs-platform/';
const SITE_NAME = 'Pooya Labs';

const pageCopy = {
  fa: {
    back: 'بازگشت به پروژه‌ها',
    demo: 'مشاهده دمو',
    source: 'مشاهده سورس',
    challenge: 'مسئله',
    approach: 'راهکار و رویکرد',
    role: 'نقش و انتساب',
    architecture: 'معماری فنی',
    implementation: 'جزئیات پیاده‌سازی',
    decisions: 'تصمیم‌های مهندسی',
    validation: 'تست و شواهد اعتبارسنجی',
    highlights: 'قابلیت‌ها و نکات فنی',
    boundaries: 'محدوده و محدودیت‌ها',
    sources: 'مستندات و منابع',
    portfolio: 'پورتفولیوی مهندسی نرم‌افزار',
    siteDescription: 'پروژه‌ها، تصمیم‌های فنی و آزمایش‌های نرم‌افزاری Pooya Labs.'
  },
  en: {
    back: 'Back to projects',
    demo: 'Open demo',
    source: 'View source',
    challenge: 'The challenge',
    approach: 'Approach',
    role: 'Role & attribution',
    architecture: 'Technical architecture',
    implementation: 'Implementation details',
    decisions: 'Engineering decisions',
    validation: 'Verification & evidence',
    highlights: 'Capabilities & highlights',
    boundaries: 'Scope & boundaries',
    sources: 'Documentation & sources',
    portfolio: 'Software engineering portfolio',
    siteDescription: 'Software projects, engineering decisions, and experiments by Pooya Labs.'
  }
} as const;

type Locale = keyof typeof pageCopy;

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[character] ?? character);
}

function escapeXml(value: string): string {
  return escapeHtml(value);
}

function dossierFor(project: PortfolioProject): CaseStudyDossier {
  const dossiers = {
    ...coreDossiers,
    ...productDossiers
  } as unknown as Record<string, CaseStudyDossier>;
  const dossier = dossiers[project.slug];
  if (!dossier) throw new Error('Missing case-study dossier for ' + project.slug);
  return dossier;
}

function renderList(items: readonly string[]): string {
  return items.map((item, index) =>
    `<li><span>${String(index + 1).padStart(2, '0')}</span>${escapeHtml(item)}</li>`
  ).join('');
}

function renderStaticCaseStudy(project: PortfolioProject, locale: Locale): string {
  const t = pageCopy[locale];
  const dossier = dossierFor(project);
  const visual = project.visualAsset
    ? `<img class="case-study-visual-image visual-${project.visualAsset.kind}" src="${escapeHtml(project.visualAsset.url)}" alt="${escapeHtml(project.visualAsset.alt[locale])}" loading="eager" decoding="async">`
    : '';
  const tags = project.tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join('');
  const references = dossier.references.map((reference) =>
    `<a href="${escapeHtml(reference.url)}" target="_blank" rel="noopener noreferrer"><span>${escapeHtml(reference.label[locale])}</span><span aria-hidden="true">↗</span></a>`
  ).join('');

  return `<main class="case-study-main portfolio-container">
    <a class="case-study-back" href="${SITE_BASE}#projects">← ${t.back}</a>
    <article>
      <header class="case-study-hero">
        <div class="case-study-visual${visual ? ' has-visual' : ''}">
          ${visual}
          <div class="case-study-art-fallback" aria-hidden="true"><div class="art-orbit orbit-outer"></div><div class="art-orbit orbit-inner"></div><div class="art-monogram"><span>${escapeHtml(project.name.slice(0, 1))}</span><i></i></div></div>
          <span class="case-study-index">${project.number} / POOYA LABS</span>
        </div>
        <div class="case-study-heading">
          <div class="portfolio-eyebrow"><span class="eyebrow-index">PROJECT / ${project.number}</span>${escapeHtml(project.category[locale])}</div>
          <h1>${escapeHtml(project.name)}</h1>
          <span class="case-study-status"><i></i>${escapeHtml(project.status[locale])}</span>
          <p>${escapeHtml(project.description[locale])}</p>
          <div class="project-tags">${tags}</div>
          <div class="case-study-actions">
            <a class="portfolio-primary" href="${escapeHtml(project.previewUrl)}" target="_blank" rel="noopener noreferrer">${t.demo} ↗</a>
            <a class="portfolio-secondary" href="${escapeHtml(project.repositoryUrl)}" target="_blank" rel="noopener noreferrer">${t.source} ↗</a>
          </div>
        </div>
      </header>
      <section class="case-study-section-grid">
        <article class="case-study-panel"><div class="portfolio-eyebrow"><span class="eyebrow-index">01 /</span>${t.challenge}</div><p>${escapeHtml(project.caseStudy.challenge[locale])}</p></article>
        <article class="case-study-panel"><div class="portfolio-eyebrow"><span class="eyebrow-index">02 /</span>${t.approach}</div><p>${escapeHtml(project.caseStudy.approach[locale])}</p></article>
      </section>
      <section class="case-study-dossier-grid">
        <article class="case-study-panel"><div class="portfolio-eyebrow"><span class="eyebrow-index">03 /</span>${t.role}</div><p>${escapeHtml(dossier.role[locale])}</p></article>
        <article class="case-study-panel"><div class="portfolio-eyebrow"><span class="eyebrow-index">04 /</span>${t.architecture}</div><p>${escapeHtml(dossier.architecture[locale])}</p></article>
      </section>
      <section class="case-study-detail-grid">
        <article class="case-study-highlights"><div class="portfolio-eyebrow"><span class="eyebrow-index">05 /</span>${t.implementation}</div><ul>${renderList(dossier.implementation[locale])}</ul></article>
        <article class="case-study-highlights"><div class="portfolio-eyebrow"><span class="eyebrow-index">06 /</span>${t.decisions}</div><ul>${renderList(dossier.decisions[locale])}</ul></article>
      </section>
      <section class="case-study-detail-grid">
        <article class="case-study-highlights"><div class="portfolio-eyebrow"><span class="eyebrow-index">07 /</span>${t.validation}</div><ul>${renderList(dossier.verification[locale])}</ul></article>
        <article class="case-study-panel case-study-source-panel"><div class="portfolio-eyebrow"><span class="eyebrow-index">08 /</span>${t.sources}</div><div class="case-study-source-list">${references}</div></article>
      </section>
      <section class="case-study-highlights"><div class="portfolio-eyebrow"><span class="eyebrow-index">09 /</span>${t.highlights}</div><ul>${renderList(project.caseStudy.highlights[locale])}</ul></section>
      <section class="case-study-boundaries"><div class="portfolio-eyebrow"><span class="eyebrow-index">10 /</span>${t.boundaries}</div><p>${escapeHtml(project.caseStudy.boundaries[locale])}</p></section>
    </article>
    <noscript><p>${escapeHtml(t.portfolio)} · ${escapeHtml(t.back)}</p></noscript>
  </main>`;
}

function replaceTag(html: string, pattern: RegExp, replacement: string, label: string): string {
  if (!pattern.test(html)) throw new Error('Cannot generate static case-study page; missing ' + label);
  return html.replace(pattern, replacement);
}

function staticPageHtml(template: string, project: PortfolioProject, locale: Locale): string {
  const t = pageCopy[locale];
  const slug = project.slug;
  const pagePath = locale === 'en' ? `en/projects/${slug}/` : `projects/${slug}/`;
  const canonical = SITE_ORIGIN + SITE_BASE + pagePath;
  const socialImage = SITE_ORIGIN + SITE_BASE + `og/${slug}${locale === 'en' ? '-en' : ''}.svg`;
  const title = locale === 'fa'
    ? `${project.name} | مطالعه موردی در Pooya Labs`
    : `${project.name} | Engineering Case Study — Pooya Labs`;
  const description = project.description[locale];
  const htmlLocale = locale === 'fa' ? 'fa' : 'en';
  const direction = locale === 'fa' ? 'rtl' : 'ltr';

  let html = template.replace(/<html lang="[^"]+" dir="[^"]+">/, `<html lang="${htmlLocale}" dir="${direction}">`);
  html = replaceTag(html, /<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(title)}</title>`, 'title');
  html = replaceTag(html, /<meta name="description"[^>]*>/, `<meta name="description" content="${escapeHtml(description)}" />`, 'description');
  html = replaceTag(html, /<meta property="og:type"[^>]*>/, '<meta property="og:type" content="article" />', 'Open Graph type');
  html = replaceTag(html, /<meta property="og:title"[^>]*>/, `<meta property="og:title" content="${escapeHtml(title)}" />`, 'Open Graph title');
  html = replaceTag(html, /<meta property="og:description"[^>]*>/, `<meta property="og:description" content="${escapeHtml(description)}" />`, 'Open Graph description');
  html = replaceTag(html, /<meta property="og:url"[^>]*>/, `<meta property="og:url" content="${canonical}" />`, 'Open Graph URL');
  html = replaceTag(html, /<meta property="og:locale"[^>]*>/, `<meta property="og:locale" content="${locale === 'fa' ? 'fa_IR' : 'en_US'}" />`, 'Open Graph locale');
  html = replaceTag(html, /<link rel="canonical"[^>]*>/, `<link rel="canonical" href="${canonical}" />`, 'canonical link');
  html = replaceTag(html, /<meta name="twitter:card"[^>]*>/, '<meta name="twitter:card" content="summary_large_image" />', 'Twitter card');
  html = html.replace('</head>', `
    <meta name="robots" content="index,follow,max-image-preview:large" />
    <meta property="og:image" content="${socialImage}" />
    <meta property="og:image:secure_url" content="${socialImage}" />
    <meta property="og:image:type" content="image/svg+xml" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="${escapeHtml(project.name + ' — ' + t.portfolio)}" />
    <link rel="alternate" hreflang="fa" href="${SITE_ORIGIN + SITE_BASE}projects/${slug}/" />
    <link rel="alternate" hreflang="en" href="${SITE_ORIGIN + SITE_BASE}en/projects/${slug}/" />
    <link rel="alternate" hreflang="x-default" href="${SITE_ORIGIN + SITE_BASE}projects/${slug}/" />
    </head>`);
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.name,
    description,
    url: canonical,
    inLanguage: locale,
    keywords: project.tags.join(', '),
    about: project.category[locale],
    isPartOf: { '@type': 'CollectionPage', name: SITE_NAME, url: SITE_ORIGIN + SITE_BASE }
  };
  html = replaceTag(html, /<script type="application\/ld\+json">[\s\S]*?<\/script>/, `<script type="application/ld+json">${JSON.stringify(structuredData)}</script>`, 'JSON-LD');
  html = replaceTag(html, /<div id="root"><\/div>/, `<div id="root">${renderStaticCaseStudy(project, locale)}</div>`, 'root mount');
  return html;
}

function socialCard(project: PortfolioProject, locale: Locale): string {
  const t = pageCopy[locale];
  const name = escapeXml(project.name);
  const category = escapeXml(project.category[locale]);
  const status = escapeXml(project.status[locale]);
  const description = escapeXml(project.description[locale]);
  const index = escapeXml(project.number + ' / POOYA LABS');
  const isRtl = locale === 'fa';
  const label = isRtl ? 'مطالعه موردی پروژه' : 'ENGINEERING CASE STUDY';
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" role="img" aria-label="${name} — ${escapeXml(t.portfolio)}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#070d15"/><stop offset=".58" stop-color="#10212d"/><stop offset="1" stop-color="#102e2c"/></linearGradient>
    <linearGradient id="title" x1="0" y1="0" x2="1" y2="0"><stop stop-color="#efffff"/><stop offset=".58" stop-color="#74e5ea"/><stop offset="1" stop-color="#79e1b9"/></linearGradient>
    <radialGradient id="glow"><stop stop-color="#42d4d3" stop-opacity=".28"/><stop offset="1" stop-color="#42d4d3" stop-opacity="0"/></radialGradient>
    <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse"><path d="M48 0H0V48" fill="none" stroke="#b6d9df" stroke-opacity=".07" stroke-width="1"/></pattern>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#grid)"/>
  <circle cx="990" cy="115" r="360" fill="url(#glow)"/>
  <circle cx="990" cy="115" r="205" fill="none" stroke="#66e6ee" stroke-opacity=".18" stroke-width="2"/>
  <circle cx="990" cy="115" r="160" fill="none" stroke="#64e0b1" stroke-opacity=".16" stroke-width="1" stroke-dasharray="6 12"/>
  <rect x="78" y="70" width="72" height="72" rx="19" fill="#16313a" stroke="#75e5df" stroke-opacity=".58"/>
  <text x="114" y="122" text-anchor="middle" font-family="Inter,Arial,sans-serif" font-size="45" font-weight="750" fill="#efffff">P<tspan fill="#64e0b1">.</tspan></text>
  <text x="174" y="103" font-family="Inter,Arial,sans-serif" font-size="18" letter-spacing="5" fill="#dceced">POOYA LABS</text>
  <text x="174" y="128" font-family="Inter,Arial,sans-serif" font-size="12" letter-spacing="3" fill="#83a3ae">${label}</text>
  <text x="1115" y="102" text-anchor="end" font-family="ui-monospace,monospace" font-size="15" letter-spacing="2" fill="#8ba8b2">${index}</text>
  <text x="88" y="300" font-family="Inter,Arial,Tahoma,sans-serif" font-size="82" font-weight="760" letter-spacing="-3" fill="url(#title)">${name}</text>
  <text x="92" y="358" font-family="Inter,Arial,Tahoma,sans-serif" font-size="25" fill="#85d9d8">${category}</text>
  <text x="92" y="423" font-family="Inter,Arial,Tahoma,sans-serif" font-size="20" fill="#b5c8ce">${description.length > 90 ? description.slice(0, 88) + '…' : description}</text>
  <rect x="90" y="478" width="330" height="38" rx="19" fill="#193b39" stroke="#64e0b1" stroke-opacity=".5"/>
  <text x="110" y="503" font-family="Inter,Arial,Tahoma,sans-serif" font-size="17" fill="#96edc8">${status}</text>
  <path d="M90 560H1110" stroke="#9cc5ce" stroke-opacity=".18"/>
  <text x="90" y="592" font-family="ui-monospace,monospace" font-size="13" letter-spacing="3" fill="#78929c">SOFTWARE / SYSTEMS / PRODUCT ENGINEERING</text>
</svg>`;
}

function staticCaseStudyPages(): Plugin {
  return {
    name: 'pooya-labs-static-case-study-pages',
    apply: 'build',
    generateBundle(_options, bundle: OutputBundle) {
      const indexAsset = bundle['index.html'];
      if (!indexAsset || indexAsset.type !== 'asset') {
        this.error('Expected Vite to emit index.html before generating static case-study pages.');
      }
      const template = typeof indexAsset.source === 'string'
        ? indexAsset.source
        : new TextDecoder().decode(indexAsset.source);
      const baseSocial = `${SITE_ORIGIN}${SITE_BASE}og/pooya-labs.svg`;
      const homeWithSocial = template.replace('</head>', `
        <meta property="og:image" content="${baseSocial}" />
        <meta property="og:image:type" content="image/svg+xml" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        </head>`);
      (indexAsset as OutputAsset).source = homeWithSocial;

      for (const project of portfolioProjects) {
        for (const locale of ['fa', 'en'] as const) {
          const route = locale === 'en' ? `en/projects/${project.slug}/index.html` : `projects/${project.slug}/index.html`;
          this.emitFile({ type: 'asset', fileName: route, source: staticPageHtml(homeWithSocial, project, locale) });
          this.emitFile({ type: 'asset', fileName: `og/${project.slug}${locale === 'en' ? '-en' : ''}.svg`, source: socialCard(project, locale) });
        }
      }
      this.emitFile({
        type: 'asset',
        fileName: 'og/pooya-labs.svg',
        source: `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630"><defs><linearGradient id="b" x2="1" y2="1"><stop stop-color="#070d15"/><stop offset="1" stop-color="#102e2c"/></linearGradient><linearGradient id="t"><stop stop-color="#efffff"/><stop offset="1" stop-color="#79e1b9"/></linearGradient></defs><rect width="1200" height="630" fill="url(#b)"/><circle cx="900" cy="130" r="350" fill="#43d4d3" opacity=".09"/><text x="90" y="160" font-family="Arial,sans-serif" font-size="28" letter-spacing="8" fill="#dceced">POOYA LABS</text><text x="90" y="330" font-family="Arial,sans-serif" font-size="100" font-weight="700" fill="url(#t)">Pooya</text><text x="96" y="405" font-family="Arial,sans-serif" font-size="34" fill="#9bb4be">Software engineering &amp; selected projects</text><path d="M90 500H1110" stroke="#8fe8d5" opacity=".35"/><text x="90" y="555" font-family="monospace" font-size="18" letter-spacing="5" fill="#80a0aa">PRODUCT / SYSTEMS / ENGINEERING</text></svg>`
      });
    }
  };
}

export default defineConfig(({ mode }) => {
  const gasBuild = mode === 'gas';

  return {
    root,
    base: gasBuild ? './' : SITE_BASE,
    plugins: [
      react(),
      ...(gasBuild ? [viteSingleFile({ removeViteModuleLoader: true })] : [staticCaseStudyPages()]),
    ],
    build: {
      outDir: gasBuild ? '../../dist/gas' : '../../dist/pages',
      emptyOutDir: true,
      sourcemap: !gasBuild,
      cssCodeSplit: !gasBuild,
      target: 'es2022',
      reportCompressedSize: true,
    },
    server: {
      host: '0.0.0.0',
      port: 5173,
      strictPort: true,
    },
  };
});
