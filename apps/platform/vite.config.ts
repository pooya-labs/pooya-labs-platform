import { defineConfig, type Plugin, type OutputBundle } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';
import { fileURLToPath } from 'node:url';
import { readFileSync } from 'node:fs';
import { Resvg } from '@resvg/resvg-js';
import { portfolioProjects, type PortfolioProject } from './src/content/projects';
import { coreDossiers } from './src/content/case-study-dossiers-core';
import { productDossiers } from './src/content/case-study-dossiers-products';
import type { CaseStudyDossier } from './src/content/case-study-dossiers-types';
import { architectureDiagrams } from './src/content/architecture-diagrams';

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
    interfaceCaptures: 'تصاویر واقعی رابط کاربری',
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
    interfaceCaptures: 'Interface captures',
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
  const diagram = architectureDiagrams[project.slug];
  if (!diagram) throw new Error('Missing architecture diagram for ' + project.slug);
  const diagramPath = `${SITE_BASE}architecture/${project.slug}${locale === 'en' ? '-en' : ''}.svg`;
  const visual = project.visualAsset
    ? `<img class="case-study-visual-image visual-${project.visualAsset.kind}" src="${escapeHtml(project.visualAsset.url)}" alt="${escapeHtml(project.visualAsset.alt[locale])}" loading="eager" decoding="async">`
    : '';
  const tags = project.tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join('');
  const references = dossier.references.map((reference) =>
    `<a href="${escapeHtml(reference.url)}" target="_blank" rel="noopener noreferrer"><span>${escapeHtml(reference.label[locale])}</span><span aria-hidden="true">↗</span></a>`
  ).join('');
  const media = (project.caseStudyMedia ?? []).filter((item) => item.device !== 'desktop');
  const mediaSection = media.length
    ? `<section class="case-study-media-section">
        <div class="portfolio-eyebrow"><span class="eyebrow-index">05 /</span>${t.interfaceCaptures}</div>
        <div class="case-study-media-grid">${media.map((item) => `<figure class="case-study-media-card device-${item.device}">
          <img src="${escapeHtml(item.url)}" alt="${escapeHtml(item.alt[locale])}" loading="lazy" decoding="async">
          <figcaption>${escapeHtml(item.caption[locale])}</figcaption>
        </figure>`).join('')}</div>
      </section>`
    : '';

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
      ${mediaSection}
      <section class="case-study-section-grid">
        <article class="case-study-panel"><div class="portfolio-eyebrow"><span class="eyebrow-index">01 /</span>${t.challenge}</div><p>${escapeHtml(project.caseStudy.challenge[locale])}</p></article>
        <article class="case-study-panel"><div class="portfolio-eyebrow"><span class="eyebrow-index">02 /</span>${t.approach}</div><p>${escapeHtml(project.caseStudy.approach[locale])}</p></article>
      </section>
      <section class="case-study-dossier-grid">
        <article class="case-study-panel"><div class="portfolio-eyebrow"><span class="eyebrow-index">03 /</span>${t.role}</div><p>${escapeHtml(dossier.role[locale])}</p></article>
        <article class="case-study-panel"><div class="portfolio-eyebrow"><span class="eyebrow-index">04 /</span>${t.architecture}</div><p>${escapeHtml(dossier.architecture[locale])}</p></article>
      </section>
      <figure class="case-study-architecture-figure">
        <img src="${diagramPath}" alt="${escapeHtml(diagram.title[locale])}" width="1600" height="900" loading="lazy" decoding="async">
        <figcaption>${escapeHtml(diagram.caption[locale])}</figcaption>
      </figure>
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
  const socialImage = SITE_ORIGIN + SITE_BASE + `og/${slug}${locale === 'en' ? '-en' : ''}.png`;
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
  html = html.replace(/<meta property="og:image(?::[^"]+)?"[^>]*>\s*/g, '');
  html = html.replace('</head>', `
    <meta name="robots" content="index,follow,max-image-preview:large" />
    <meta property="og:image" content="${socialImage}" />
    <meta property="og:image:secure_url" content="${socialImage}" />
    <meta property="og:image:type" content="image/png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="627" />
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


function renderArchitectureDiagram(slug: string, locale: Locale): string {
  const diagram = architectureDiagrams[slug];
  if (!diagram) throw new Error('Missing architecture diagram for ' + slug);
  const width = 1600;
  const height = 900;
  const nodeWidth = 300;
  const nodeHeight = 155;
  const isRtl = locale === 'fa';
  const textAnchor = isRtl ? 'end' : 'start';
  const fontFamily = isRtl ? 'Amiri,Tahoma,Arial,sans-serif' : 'Inter,Segoe UI,Tahoma,Arial,sans-serif';
  const titleFontSize = isRtl ? 19 : 23;
  const detailFontSize = isRtl ? 13 : 15;
  const headingFontFamily = fontFamily;
  const labelX = (node: (typeof diagram.nodes)[number]) => isRtl ? node.x + nodeWidth - 24 : node.x + 24;
  const byId = new Map(diagram.nodes.map((node) => [node.id, node]));
  const edges = diagram.edges.map((edge) => {
    const from = byId.get(edge.from);
    const to = byId.get(edge.to);
    if (!from || !to) throw new Error('Invalid architecture edge in ' + slug);
    const fromCenterX = from.x + nodeWidth / 2;
    const fromCenterY = from.y + nodeHeight / 2;
    const toCenterX = to.x + nodeWidth / 2;
    const toCenterY = to.y + nodeHeight / 2;
    const deltaX = toCenterX - fromCenterX;
    const deltaY = toCenterY - fromCenterY;
    let sx: number, sy: number, tx: number, ty: number;
    if (Math.abs(deltaX) >= Math.abs(deltaY)) {
      sx = deltaX >= 0 ? from.x + nodeWidth : from.x;
      sy = fromCenterY;
      tx = deltaX >= 0 ? to.x : to.x + nodeWidth;
      ty = toCenterY;
    } else {
      sx = fromCenterX;
      sy = deltaY >= 0 ? from.y + nodeHeight : from.y;
      tx = toCenterX;
      ty = deltaY >= 0 ? to.y : to.y + nodeHeight;
    }
    const control = Math.max(48, Math.min(145, Math.hypot(tx - sx, ty - sy) * 0.38));
    const c1x = Math.abs(deltaX) >= Math.abs(deltaY) ? sx + Math.sign(deltaX) * control : sx;
    const c1y = Math.abs(deltaX) >= Math.abs(deltaY) ? sy : sy + Math.sign(deltaY) * control;
    const c2x = Math.abs(deltaX) >= Math.abs(deltaY) ? tx - Math.sign(deltaX) * control : tx;
    const c2y = Math.abs(deltaX) >= Math.abs(deltaY) ? ty : ty - Math.sign(deltaY) * control;
    return `<path d="M ${sx} ${sy} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${tx} ${ty}" fill="none" stroke="#69d9dc" stroke-opacity=".68" stroke-width="3" marker-end="url(#arrow)" />`;
  }).join('');
  const nodes = diagram.nodes.map((item, index) => {
    const kind = item.kind ?? 'core';
    const title = escapeXml(item.title[locale]);
    const detail = escapeXml(item.detail[locale]);
    return `<g>
      <rect x="${item.x}" y="${item.y}" width="${nodeWidth}" height="${nodeHeight}" rx="19" fill="${kind === 'storage' ? 'url(#storage)' : kind === 'external' ? 'url(#external)' : kind === 'local' ? 'url(#local)' : 'url(#node)'}" stroke="${kind === 'storage' ? '#78d9b1' : kind === 'external' ? '#76d8e8' : '#6edbce'}" stroke-opacity=".45" stroke-width="1.5" />
      <circle cx="${item.x + 27}" cy="${item.y + 29}" r="5" fill="${kind === 'storage' ? '#78e1b5' : '#75e5e5'}" />
      <text x="${item.x + nodeWidth - 24}" y="${item.y + 37}" text-anchor="end" font-family="Inter,Segoe UI,Tahoma,Arial,sans-serif" font-size="13" letter-spacing="2" fill="#7897a4">${String(index + 1).padStart(2, '0')}</text>
      <text x="${labelX(item)}" y="${item.y + 83}" text-anchor="${textAnchor}" direction="${locale === 'fa' ? 'rtl' : 'ltr'}" font-family="${fontFamily}" font-size="${titleFontSize}" font-weight="650" fill="#eaf8f8">${title}</text>
      <text x="${labelX(item)}" y="${item.y + 119}" text-anchor="${textAnchor}" direction="${locale === 'fa' ? 'rtl' : 'ltr'}" font-family="${fontFamily}" font-size="${detailFontSize}" fill="#9bb6bf">${detail}</text>
    </g>`;
  }).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" lang="${locale}" aria-label="${escapeXml(diagram.title[locale])}">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#070d15"/><stop offset=".58" stop-color="#0d1d2a"/><stop offset="1" stop-color="#102b2a"/></linearGradient>
      <linearGradient id="node" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#173442"/><stop offset="1" stop-color="#10232f"/></linearGradient>
      <linearGradient id="storage" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#173b37"/><stop offset="1" stop-color="#122a2c"/></linearGradient>
      <linearGradient id="external" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#19374a"/><stop offset="1" stop-color="#132538"/></linearGradient>
      <linearGradient id="local" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#29384a"/><stop offset="1" stop-color="#172937"/></linearGradient>
      <pattern id="grid" width="42" height="42" patternUnits="userSpaceOnUse"><path d="M42 0H0V42" fill="none" stroke="#b9d8e0" stroke-opacity=".055" stroke-width="1"/></pattern>
      <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path d="M0 0L10 5L0 10Z" fill="#79e5d1"/></marker>
      <radialGradient id="glow"><stop stop-color="#32b6bc" stop-opacity=".17"/><stop offset="1" stop-color="#32b6bc" stop-opacity="0"/></radialGradient>
    </defs>
    <rect width="1600" height="900" rx="26" fill="url(#bg)"/><rect width="1600" height="900" rx="26" fill="url(#grid)"/>
    <circle cx="1350" cy="120" r="430" fill="url(#glow)"/>
    <text x="${locale === 'fa' ? 1510 : 88}" y="91" text-anchor="${locale === 'fa' ? 'end' : 'start'}" direction="${locale === 'fa' ? 'rtl' : 'ltr'}" font-family="${headingFontFamily}" font-size="${isRtl ? 26 : 30}" font-weight="700" fill="#e8fbfa">${escapeXml(diagram.title[locale])}</text>
    <text x="${locale === 'fa' ? 1510 : 90}" y="132" text-anchor="${locale === 'fa' ? 'end' : 'start'}" direction="${locale === 'fa' ? 'rtl' : 'ltr'}" font-family="${headingFontFamily}" font-size="${isRtl ? 14 : 17}" fill="#8faeb7">${escapeXml(diagram.caption[locale])}</text>
    <path d="M88 164H1512" stroke="#9fc9d1" stroke-opacity=".15"/>
    ${edges}
    ${nodes}
    <text x="88" y="855" font-family="ui-monospace,monospace" font-size="13" letter-spacing="3" fill="#6c8792">POOYA LABS · DOCUMENTED SYSTEM VIEW</text>
    <text x="1512" y="855" text-anchor="end" font-family="ui-monospace,monospace" font-size="13" letter-spacing="2" fill="#6c8792">${slug.toUpperCase()}</text>
  </svg>`;
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
  const textFont = isRtl ? 'Amiri,Tahoma,Arial,sans-serif' : 'Inter,Arial,Tahoma,sans-serif';
  const textX = isRtl ? 1110 : 92;
  const textAnchor = isRtl ? 'end' : 'start';
  const descriptionLimit = isRtl ? 58 : 90;
  const descriptionText = description.length > descriptionLimit ? description.slice(0, descriptionLimit - 1) + '…' : description;
  const chipX = isRtl ? 680 : 90;
  const chipTextX = isRtl ? 1090 : 110;
  const chipAnchor = isRtl ? 'end' : 'start';
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="627" viewBox="0 0 1200 627" role="img" lang="${locale}" direction="${isRtl ? 'rtl' : 'ltr'}" aria-label="${name} — ${escapeXml(t.portfolio)}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#070d15"/><stop offset=".58" stop-color="#10212d"/><stop offset="1" stop-color="#102e2c"/></linearGradient>
    <linearGradient id="title" x1="0" y1="0" x2="1" y2="0"><stop stop-color="#efffff"/><stop offset=".58" stop-color="#74e5ea"/><stop offset="1" stop-color="#79e1b9"/></linearGradient>
    <radialGradient id="glow"><stop stop-color="#42d4d3" stop-opacity=".28"/><stop offset="1" stop-color="#42d4d3" stop-opacity="0"/></radialGradient>
    <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse"><path d="M48 0H0V48" fill="none" stroke="#b6d9df" stroke-opacity=".07" stroke-width="1"/></pattern>
  </defs>
  <rect width="1200" height="627" fill="url(#bg)"/>
  <rect width="1200" height="627" fill="url(#grid)"/>
  <circle cx="990" cy="115" r="360" fill="url(#glow)"/>
  <circle cx="990" cy="115" r="205" fill="none" stroke="#66e6ee" stroke-opacity=".18" stroke-width="2"/>
  <circle cx="990" cy="115" r="160" fill="none" stroke="#64e0b1" stroke-opacity=".16" stroke-width="1" stroke-dasharray="6 12"/>
  <rect x="78" y="70" width="72" height="72" rx="19" fill="#16313a" stroke="#75e5df" stroke-opacity=".58"/>
  <text x="114" y="122" text-anchor="middle" font-family="Inter,Arial,sans-serif" font-size="45" font-weight="750" fill="#efffff">P<tspan fill="#64e0b1">.</tspan></text>
  <text x="174" y="103" font-family="Inter,Arial,sans-serif" font-size="18" letter-spacing="5" fill="#dceced">POOYA LABS</text>
  <text x="1110" y="128" text-anchor="end" direction="${isRtl ? 'rtl' : 'ltr'}" font-family="${textFont}" font-size="${isRtl ? 20 : 12}" letter-spacing="${isRtl ? 0 : 3}" fill="#83a3ae">${label}</text>
  <text x="1115" y="102" text-anchor="end" font-family="ui-monospace,monospace" font-size="15" letter-spacing="2" fill="#8ba8b2">${index}</text>
  <text x="88" y="300" font-family="Inter,Arial,Tahoma,sans-serif" font-size="82" font-weight="760" letter-spacing="-3" fill="url(#title)">${name}</text>
  <text x="${textX}" y="358" text-anchor="${textAnchor}" direction="${isRtl ? 'rtl' : 'ltr'}" font-family="${textFont}" font-size="${isRtl ? 29 : 25}" fill="#85d9d8">${category}</text>
  <text x="${textX}" y="423" text-anchor="${textAnchor}" direction="${isRtl ? 'rtl' : 'ltr'}" font-family="${textFont}" font-size="${isRtl ? 18 : 20}" fill="#b5c8ce">${descriptionText}</text>
  <rect x="${chipX}" y="478" width="430" height="38" rx="19" fill="#193b39" stroke="#64e0b1" stroke-opacity=".5"/>
  <text x="${chipTextX}" y="503" text-anchor="${chipAnchor}" direction="${isRtl ? 'rtl' : 'ltr'}" font-family="${textFont}" font-size="${isRtl ? 22 : 17}" fill="#96edc8">${status}</text>
  <path d="M90 560H1110" stroke="#9cc5ce" stroke-opacity=".18"/>
  <text x="90" y="592" font-family="ui-monospace,monospace" font-size="13" letter-spacing="3" fill="#78929c">SOFTWARE / SYSTEMS / PRODUCT ENGINEERING</text>
</svg>`;
}

function renderSocialPng(svg: string): Uint8Array {
  const rendered = new Resvg(svg, { font: { loadSystemFonts: true } }).render();
  return rendered.asPng();
}

function staticCaseStudyPages(): Plugin {
  return {
    name: 'pooya-labs-static-case-study-pages',
    apply: 'build',
    generateBundle(_options, bundle: OutputBundle) {
      const entry = Object.values(bundle).find((item) => item.type === 'chunk' && item.isEntry);
      if (!entry || entry.type !== 'chunk') {
        this.error('Expected a JavaScript entry chunk before generating static case-study pages.');
      }
      const cssFiles = Object.values(bundle)
        .filter((item) => item.type === 'asset' && item.fileName.endsWith('.css'))
        .map((item) => item.fileName);
      let template = readFileSync(new URL('./index.html', import.meta.url), 'utf8');
      template = template.replace('src="/src/main.tsx"', `crossorigin src="${SITE_BASE}${entry.fileName}"`);
      template = template.replace('href="%BASE_URL%favicon.svg"', `href="${SITE_BASE}favicon.svg"`);
      template = template.replace('</head>', `${cssFiles.map((file) => `<link rel="stylesheet" crossorigin href="${SITE_BASE}${file}" />`).join('')}\n</head>`);
      const homeWithSocial = template;

      for (const project of portfolioProjects) {
        for (const locale of ['fa', 'en'] as const) {
          const route = locale === 'en' ? `en/projects/${project.slug}/index.html` : `projects/${project.slug}/index.html`;
          this.emitFile({ type: 'asset', fileName: route, source: staticPageHtml(homeWithSocial, project, locale) });
          const socialSvg = socialCard(project, locale);
          const socialName = `og/${project.slug}${locale === 'en' ? '-en' : ''}`;
          this.emitFile({ type: 'asset', fileName: `${socialName}.svg`, source: socialSvg });
          this.emitFile({ type: 'asset', fileName: `${socialName}.png`, source: renderSocialPng(socialSvg) });
          this.emitFile({ type: 'asset', fileName: `architecture/${project.slug}${locale === 'en' ? '-en' : ''}.svg`, source: renderArchitectureDiagram(project.slug, locale) });
        }
      }
      const homeSocialSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="627" viewBox="0 0 1200 627"><defs><linearGradient id="b" x2="1" y2="1"><stop stop-color="#070d15"/><stop offset="1" stop-color="#102e2c"/></linearGradient><linearGradient id="t"><stop stop-color="#efffff"/><stop offset="1" stop-color="#79e1b9"/></linearGradient></defs><rect width="1200" height="627" fill="url(#b)"/><circle cx="900" cy="130" r="350" fill="#43d4d3" opacity=".09"/><text x="90" y="160" font-family="Arial,sans-serif" font-size="28" letter-spacing="8" fill="#dceced">POOYA LABS</text><text x="90" y="330" font-family="Arial,sans-serif" font-size="100" font-weight="700" fill="url(#t)">Pooya</text><text x="96" y="405" font-family="Arial,sans-serif" font-size="34" fill="#9bb4be">Software engineering &amp; selected projects</text><path d="M90 500H1110" stroke="#8fe8d5" opacity=".35"/><text x="90" y="555" font-family="monospace" font-size="18" letter-spacing="5" fill="#80a0aa">PRODUCT / SYSTEMS / ENGINEERING</text></svg>`;
      this.emitFile({ type: 'asset', fileName: 'og/pooya-labs.svg', source: homeSocialSvg });
      this.emitFile({ type: 'asset', fileName: 'og/pooya-labs.png', source: renderSocialPng(homeSocialSvg) });
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
