import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App';
import { HydratedCaseStudy } from './PortfolioHome';
import { portfolioProjects } from './content/projects';
import './styles.css';
import './portfolio.css';

// Prevent restoring a stale mid-page position when opening a project URL directly.
if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual';
if (!window.location.hash) {
  window.scrollTo(0, 0);
  window.requestAnimationFrame(() => window.scrollTo(0, 0));
}

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Platform root element was not found.');
}

const directCaseStudy = window.location.pathname.match(/\\/(?:en\\/)?projects\\/([^/]+)\\/?$/);
const directProject = directCaseStudy
  ? portfolioProjects.find((project) => project.slug === directCaseStudy[1]) ?? null
  : null;

if (directProject) {
  const language = window.location.pathname.includes('/en/projects/') ? 'en' : 'fa';
  hydrateRoot(
    rootElement,
    <React.StrictMode>
      <HydratedCaseStudy
        project={directProject}
        language={language}
        baseUrl={import.meta.env.BASE_URL}
      />
    </React.StrictMode>,
  );
} else {
  createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
}
