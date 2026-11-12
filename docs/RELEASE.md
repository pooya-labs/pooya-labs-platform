# Release checklist

This checklist governs public portfolio releases. The completed redesign has been explicitly approved for promotion by Pooya and merged to `main` on 2026-11-12; Phase 8 is complete. The current release remains **pre-alpha / portfolio draft**, because Phase 7 owner-acceptance/readiness carry-over, Phase 9 project-level evidence/content integration and Phase 10 final release gates remain open. Required order: Phase 7 readiness → Phase 8 redesign (complete) → Phase 9 full project integration → Phase 10 V1 hardening and publication.

## Latest exact-main evidence — 2026-11-12

- PR [#75](https://github.com/pooya-labs/pooya-labs-platform/pull/75) merged the semantic skill-group role and contract test. Final main application SHA: `64c5966cba21a2d25d8f357b351593cbe51f26b2`.
- Exact-main Repository CI [43221461282](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/43221461282) and Browser QA [43221461301](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/43221461301) passed.
- Browser QA: 18/18 routes; 36/36 viewport checks; 18/18 keyboard skip links; 34/34 social-crawler checks; zero confirmed Axe violations and zero ARIA-incomplete records. Thirty-six color-contrast checks per theme remain incomplete and require human rendered-background measurement.
- GitHub Pages run [43221461285](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/43221461285) published artifact `13944694071`; Cloudflare Pages Production deployment [975b9e6d](https://975b9e6d.pooya-labs-platform.pages.dev/) published the same SHA with all five stages successful.
- This is a post-redesign accessibility/deployment correction, not a V1 release. Phase 7 owner/device/accessibility/privacy/social-cache/rollback gates, Phase 9 final evidence integration and Phase 10 release hardening remain open.

## Before any public release

- [x] Promote the owner-declared-complete redesign via PR [#71](https://github.com/pooya-labs/pooya-labs-platform/pull/71) and merge the targeted post-merge theme-label contrast correction via PR [#72](https://github.com/pooya-labs/pooya-labs-platform/pull/72); final application SHA `b7d4d136d58e2121d6bd2bd11c03ff774431a2d7`.

- [x] Confirm that the active `main` ruleset [Protect main — PR + CI](https://github.com/pooya-labs/pooya-labs-platform/rules/26861856) is exercised by a normal PR whose two required checks pass and whose merge uses the regular path. Verified by PR #36: both required contexts passed, the PR merged without bypass, and post-merge CI passed. Do not use direct pushes or bypass actors. See [GITHUB-REPOSITORY-GOVERNANCE.md](GITHUB-REPOSITORY-GOVERNANCE.md).
- [x] Confirm the promoted application change is on main at exact commit `b7d4d136d58e2121d6bd2bd11c03ff774431a2d7`; PR #71 and PR #72 were merged through the protected PR path.
- [ ] Pass `npm run lint`, `npm run format:check`, `npm run typecheck`, `npm test`, `npm run build`, and `npm run build:cloudflare`.
- [x] Pass the portfolio Browser QA workflow on exact main SHA `b7d4d136d58e2121d6bd2bd11c03ff774431a2d7`: run 43215080506; 18/18 routes, 36/36 desktop/mobile viewports, 18/18 keyboard skip-link checks, 34/34 crawler checks and zero confirmed Axe violations in both themes. Forty incomplete contrast checks per theme remain for human review.
- [ ] Review accessibility findings. Distinguish confirmed violations from incomplete automated checks; manually verify contrast, focus visibility, keyboard operation, and screen-reader flow in both languages and themes.
- [x] Improve final light-theme secondary text contrast and add an automated WCAG AA 4.5:1 contract test. PR #43 passed CI and Browser QA; both live host CSS assets contain the new token. Full human contrast review remains required.
- [ ] Verify public biography, project order, project descriptions, contribution/role statements, statuses, contact details, repository links, demo links, and all published media with the owner.
- [ ] Verify the Pooya Monogram owner signature and black-tile logo on the homepage and every bilingual case-study route, plus both README ownership blocks and structured metadata on the deployed hosts.
- [ ] Complete physical-device review on representative mobile hardware and browsers. Browser emulation does not satisfy this gate.
- [x] Validate all 17 routes on both hosts under LinkedInBot and Facebook externalhit User-Agent simulations: 34 route/host checks per User-Agent, zero failures, valid OG metadata/canonical URLs, and same-origin 1200×627 PNG assets. This does not prove authenticated share-debugger success or cache refresh.
- [ ] Validate cached cards through authenticated LinkedIn Post Inspector and Meta Sharing Debugger; request refresh where available and record actual platform results.
- [x] Confirm GitHub Pages and Cloudflare Pages publish the same exact application source revision `b7d4d136d58e2121d6bd2bd11c03ff774431a2d7`. GitHub Pages run 43215080845 deployed artifact `13941954722`; Cloudflare Production deployment `b7ed72f1-7507-4598-9e61-9f5745997751` completed all five stages from the same SHA through the connected Cloudflare API. The native Git-push trigger remains unverified; external social-cache and manual SEO review remain open.
- [ ] Review privacy, security, performance, and dependency changes. Never publish private customer or admin data.
- [ ] Rehearse the documented deployment and rollback path for each public host that is part of the release.
- [ ] Update `docs/STATUS.md`, `docs/NEXT.md`, `docs/CHANGELOG.md`, and the relevant roadmap items with evidence and exact commit/run/deployment identifiers.

## Publishing

- [x] Publish GitHub Pages and Cloudflare Pages independently for application source `b7d4d136d58e2121d6bd2bd11c03ff774431a2d7`; GitHub Pages run 43215080845 / artifact `13941954722`, Cloudflare deployment `b7ed72f1-7507-4598-9e61-9f5745997751` / API trigger `ad_hoc`.

1. Confirm the main-branch commit has passing required checks.
2. Publish GitHub Pages and Cloudflare Pages independently; verify each host against the same intended application revision.
3. Record workflow run IDs, artifact IDs where relevant, and Cloudflare deployment IDs/URLs. A skipped deployment job is not a successful deployment.
4. Verify the canonical public URLs and check for stale cached assets.
5. Only after every mandatory owner and release gate is closed, create a version tag and publish release notes.

## V1 restrictions

A V1 tag is prohibited while any required Phase 7, Phase 8, Phase 9, or Phase 10 gate remains open. Phase 8 redesign approval must precede Phase 9's complete integration of all eight projects. Phase 9 must be complete before Phase 10 release hardening and publication. Do not downgrade a blocker to a completed item merely because an automated workflow passed. If a release is blocked, keep the current pre-alpha label and record the remaining work in `docs/NEXT.md`.
