import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App';
import { HydratedCaseStudy } from './PortfolioHome';
import { portfolioProjects } from './content/projects';
import './styles.css';
import './portfolio.css';
import './novels.css';

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

const routeSegments = window.location.pathname.split('/').filter(Boolean);
const projectsSegmentIndex = routeSegments.lastIndexOf('projects');
const directProjectSlug = projectsSegmentIndex >= 0 ? routeSegments[projectsSegmentIndex + 1] : null;
const directProject = directProjectSlug
  ? portfolioProjects.find((project) => project.slug === directProjectSlug) ?? null
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
