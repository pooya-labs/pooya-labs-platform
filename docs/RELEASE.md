# Release checklist

This checklist governs public portfolio releases. The current release remains **pre-alpha / portfolio draft** until the owner explicitly approves the complete site and every mandatory gate below is closed.

## Before any public release

- [ ] Confirm the change is on the intended commit and the working tree/branch contains no unrelated work.
- [ ] Pass `npm run lint`, `npm run format:check`, `npm run typecheck`, `npm test`, `npm run build`, and `npm run build:cloudflare`.
- [ ] Pass the portfolio browser QA workflow for the expected Persian/English routes, desktop/mobile viewports, reduced-motion behavior, and gallery scroll chaining.
- [ ] Review accessibility findings. Distinguish confirmed violations from incomplete automated checks; manually verify contrast, focus visibility, keyboard operation, and screen-reader flow in both languages and themes.
- [ ] Verify public biography, project order, project descriptions, contribution/role statements, statuses, contact details, repository links, demo links, and all published media with the owner.
- [ ] Complete physical-device review on representative mobile hardware and browsers. Browser emulation does not satisfy this gate.
- [ ] Verify SEO/canonical/hreflang/sitemap/social-card output and test representative external sharing clients.
- [ ] Review privacy, security, performance, and dependency changes. Never publish private customer or admin data.
- [ ] Rehearse the documented deployment and rollback path for each public host that is part of the release.
- [ ] Update `docs/STATUS.md`, `docs/NEXT.md`, `docs/CHANGELOG.md`, and the relevant roadmap items with evidence and exact commit/run/deployment identifiers.

## Publishing

1. Confirm the main-branch commit has passing required checks.
2. Publish GitHub Pages and Cloudflare Pages independently; verify each host against the same intended application revision.
3. Record workflow run IDs, artifact IDs where relevant, and Cloudflare deployment IDs/URLs. A skipped deployment job is not a successful deployment.
4. Verify the canonical public URLs and check for stale cached assets.
5. Only after every mandatory owner and release gate is closed, create a version tag and publish release notes.

## V1 restrictions

A V1 tag is prohibited while the roadmap's Phase 7 or Phase 8 release gates, required project-content audit entries, owner approvals, physical-device review, or manual accessibility checks remain open. Do not downgrade a blocker to a completed item merely because an automated workflow passed. If a release is blocked, keep the current pre-alpha label and record the remaining work in `docs/NEXT.md`.
