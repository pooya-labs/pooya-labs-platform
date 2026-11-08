# Static host deployment and rollback runbook

**Scope:** public portfolio on GitHub Pages and Cloudflare Pages. This runbook is separate from the Apps Script proof and does not authorize deployment of independent Workers/D1 projects.

## Source and current deployment baseline

- Repository: pooya-labs/pooya-labs-platform; production source branch: main.
- GitHub Pages output: dist/pages; host: https://pooya-labs.github.io/pooya-labs-platform/.
- Cloudflare Pages output: dist/cloudflare; host: https://pooya-labs-platform.pages.dev/.
- Latest verified application output is still source commit c7a86a2e2f54d157b7e0b806c9c022afd41fd208. Later main commits in the Phase 7 roadmap/docs work do not change application output.
- Cloudflare production deployment a1a69456-fc5a-4ac3-917b-f5cb0cb909a5 was successfully published from that application commit through the authorized Pages API.
- Cloudflare GitHub Actions publishing remains credential-gated. The deploy job skips until the private CLOUDFLARE_API_TOKEN secret exists. Do not treat a skipped job as a deployment.

## Pre-deployment checks

1. Confirm the exact main commit to publish and inspect its diff. Avoid deploying a documentation-only or unrelated commit as if it contained application changes.
2. Confirm Repository CI passes for that source SHA: dependency audit, lint, formatting, TypeScript, all required build targets, and contract tests.
3. Confirm Browser QA passes for the same application source SHA, including route, viewport, keyboard, reduced-motion, accessibility, and performance reports.
4. Build each host independently. GitHub Pages uses the Pages mode and /pooya-labs-platform/ base path; Cloudflare uses the Cloudflare mode and / base path.
5. Retain the build artifact and record the exact source SHA before publishing.

## GitHub Pages publish and smoke test

1. Merge the approved application change to main. The Platform GitHub Pages workflow is triggered by changes under apps/platform, root package.json, or its own workflow file.
2. Confirm the build and Deploy to GitHub Pages job both complete successfully. Record the workflow run ID and published page_url.
3. Open the canonical Pages URL and smoke-test the homepage, one English case study, one Persian case study, the language/theme toggles, the novels route/section, and contact links.
4. Verify canonical URLs and static case-study paths resolve beneath /pooya-labs-platform/ and that no Cloudflare root-base assets are accidentally used.

## Cloudflare Pages publish and smoke test

Preferred automated path:
- Store CLOUDFLARE_API_TOKEN as a GitHub Actions secret with Account → Cloudflare Pages → Edit permission. Never commit it or paste it into chat.
- Confirm the Cloudflare production deploy job runs rather than skipping, builds dist/cloudflare from the exact main SHA, and confirms the deployment's build and deploy stages succeeded.
- Record the workflow run ID, Cloudflare deployment ID, unique deployment URL, source SHA, and canonical production host.

Authorized manual fallback while the secret is absent:
- Use the approved Cloudflare Pages API/deployment interface to publish the Cloudflare build produced from the exact verified commit.
- Do not publish an unverified local folder or a build made from a different SHA.
- Confirm the returned deployment identifier and successful build/deploy stages before declaring the release live.

Smoke test the canonical Cloudflare host independently: homepage, English/Persian project routes, static assets at the root base path, theme/language toggles, and contact links. A successful GitHub Pages deployment does not prove Cloudflare was updated.

## Rollback

Preferred source-consistent rollback for both hosts:
1. Identify the last known-good application commit and the commit being rolled back.
2. Create a normal git revert commit on main for the bad application change. Never reset or force-push shared history.
3. Wait for Repository CI and Browser QA on the revert commit. Do not deploy while required checks fail.
4. Publish the revert commit to GitHub Pages and verify its deploy job.
5. Publish the same revert commit to Cloudflare Pages through the configured GitHub Actions path or the authorized manual API fallback.
6. Confirm both canonical hosts serve the reverted application, then record both run/deployment IDs and the rollback verification.

Emergency host-only rollback:
- Re-publish the previously verified build artifact only when it can be tied to an immutable source SHA and its original CI/Browser QA evidence.
- Record the deployment ID and unique URL; follow immediately with a source-consistent revert on main so repository and production do not remain divergent.
- Never delete prior Cloudflare deployments or rewrite Git history as a substitute for a rollback.

## Recovery evidence

Each release/rollback checkpoint must record the source SHA, CI run, Browser QA run and artifact, host, deployment identifier, unique URL, canonical smoke-test result, and any cache invalidation required. If either host cannot be verified, explicitly report it as not verified.

## Current rehearsal state

- GitHub Pages publication has succeeded for previous application commits; a full rollback rehearsal on the current redesigned portfolio has not been recorded here.
- Cloudflare's last verified production deployment succeeded through the authorized API. Automated GitHub Actions publishing is still blocked by the missing private token.
- A real rollback rehearsal remains open in Phase 7. This document is the procedure, not proof that the procedure has been executed.

## Security boundary

Keep API tokens and account credentials in approved secret stores. Do not place them in repository files, public workflow logs, screenshots, browser bundles, or chat. Do not use live customer data for release or rollback smoke tests.
