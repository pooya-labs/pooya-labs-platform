# ADR-0006: Portfolio-first product and static public hosting

- **Status:** Accepted by the product owner's latest direction
- **Date:** 2026-11-05

## Context

The initial repository architecture was shaped around a proposed interactive web workspace and a possible public/customer application. A feasibility spike selected Apps Script HtmlService for that type of app because direct browser fetches from the GitHub Pages origin were blocked by CORS.

The owner has now clarified the primary purpose of this website: introduce Pooya and showcase his engineering projects to other people. This is a content-led personal portfolio, not a generic customer dashboard or service SaaS.

## Decision

1. The root website is a public personal portfolio. Its primary content is Pooya's reviewed profile, selected projects, detailed case studies, engineering focus, and contact links.
2. GitHub Pages is the primary public hosting runtime for this static portfolio.
3. The existing Spatial OS remains a secondary owner workspace / experiment and must not replace the portfolio as the homepage.
4. A generic customer login/dashboard is out of scope unless a separate real product requirement is approved.
5. A private owner content console may be considered after the content schema is stable; it must be isolated and authorized server-side.
6. Apps Script HtmlService and the earlier RPC work remain as a deferred optional adapter/experiment. Copying the UI bundle into Apps Script is not required to release the static portfolio.
7. A complete portfolio redesign based on the owner's feedback is a mandatory pre-release gate. V1 cannot ship until the owner reviews and explicitly approves the revised site.

## Consequences

- Site structure, roadmap, visual hierarchy, and release criteria prioritize portfolio storytelling over workspace mechanics.
- Project entries must use verified descriptions, honest statuses, and exact links. A project may be showcased without importing its source repository.
- The previous HtmlService transport finding remains valid for cross-origin GAS RPC; this decision simply avoids requiring that transport for the portfolio.
- Any future customer-facing product must be separate from the public portfolio, with its own identity and data model.

## Supersession

This ADR supersedes the earlier decision to treat Apps Script HtmlService as the primary runtime for the **whole public website**. ADR-0003 remains historical and applicable to the standalone HtmlService transport proof / any future Apps Script-hosted application.
