import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
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

createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
