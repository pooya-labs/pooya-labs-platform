# Release checklist

This checklist governs public portfolio releases. The current release remains **pre-alpha / portfolio draft** until the owner explicitly approves the complete site and every mandatory gate below is closed. The required order is Phase 7 readiness → Phase 8 full redesign and approval (penultimate) → Phase 9 complete project integration (last implementation stage before publication) → Phase 10 V1 release.

## Before any public release

- [x] Confirm that the active `main` ruleset [Protect main — PR + CI](https://github.com/pooya-labs/pooya-labs-platform/rules/26861856) is exercised by a normal PR whose two required checks pass and whose merge uses the regular path. Verified by PR #36: both required contexts passed, the PR merged without bypass, and post-merge CI passed. Do not use direct pushes or bypass actors. See [GITHUB-REPOSITORY-GOVERNANCE.md](GITHUB-REPOSITORY-GOVERNANCE.md).
- [ ] Confirm the change is on the intended commit and the working tree/branch contains no unrelated work.
- [ ] Pass `npm run lint`, `npm run format:check`, `npm run typecheck`, `npm test`, `npm run build`, and `npm run build:cloudflare`.
- [ ] Pass the portfolio browser QA workflow for the expected Persian/English routes, desktop/mobile viewports, reduced-motion behavior, and gallery scroll chaining.
- [ ] Review accessibility findings. Distinguish confirmed violations from incomplete automated checks; manually verify contrast, focus visibility, keyboard operation, and screen-reader flow in both languages and themes.
- [x] Improve final light-theme secondary text contrast and add an automated WCAG AA 4.5:1 contract test. PR #43 passed CI and Browser QA; both live host CSS assets contain the new token. Full human contrast review remains required.
- [ ] Verify public biography, project order, project descriptions, contribution/role statements, statuses, contact details, repository links, demo links, and all published media with the owner.
- [ ] Verify the Pooya Monogram owner signature and black-tile logo on the homepage and every bilingual case-study route, plus both README ownership blocks and structured metadata on the deployed hosts.
- [ ] Complete physical-device review on representative mobile hardware and browsers. Browser emulation does not satisfy this gate.
- [ ] Verify SEO/canonical/hreflang/sitemap/social-card output and test representative external sharing clients.
- [x] Confirm GitHub Pages and Cloudflare Pages publish the exact same current main application revision `e5ef6389`. Pages run 42659840309 deployed artifact `13693239378`; Cloudflare deployment `ed73cc8e` completed all five stages from the exact same SHA via the authorized API fallback. Live CSS assets on both hosts contain the light-theme contrast fix. Native Git-push triggering remains unverified; external crawler/cache and manual SEO review remain open.
- [ ] Review privacy, security, performance, and dependency changes. Never publish private customer or admin data.
- [ ] Rehearse the documented deployment and rollback path for each public host that is part of the release.
- [ ] Update `docs/STATUS.md`, `docs/NEXT.md`, `docs/CHANGELOG.md`, and the relevant roadmap items with evidence and exact commit/run/deployment identifiers.

## Publishing

- [x] Publish GitHub Pages and Cloudflare Pages independently for exact current main `e5ef6389`; Pages run 42659840309 / artifact 13693239378, Cloudflare deployment `ed73cc8e` / API trigger `ad_hoc`.

1. Confirm the main-branch commit has passing required checks.
2. Publish GitHub Pages and Cloudflare Pages independently; verify each host against the same intended application revision.
3. Record workflow run IDs, artifact IDs where relevant, and Cloudflare deployment IDs/URLs. A skipped deployment job is not a successful deployment.
4. Verify the canonical public URLs and check for stale cached assets.
5. Only after every mandatory owner and release gate is closed, create a version tag and publish release notes.

## V1 restrictions

A V1 tag is prohibited while any required Phase 7, Phase 8, Phase 9, or Phase 10 gate remains open. Phase 8 redesign approval must precede Phase 9's complete integration of all eight projects. Phase 9 must be complete before Phase 10 release hardening and publication. Do not downgrade a blocker to a completed item merely because an automated workflow passed. If a release is blocked, keep the current pre-alpha label and record the remaining work in `docs/NEXT.md`.
