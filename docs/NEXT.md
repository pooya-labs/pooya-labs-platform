## Latest checkpoint — PR #26 publisher hardening verified (2026-11-09)

PR [#26](https://github.com/pooya-labs/pooya-labs-platform/pull/26) is open with latest head [`8037631`](https://github.com/pooya-labs/pooya-labs-platform/commit/8037631274fd1d086d1f90c1d68f42015116e8c7). The proposed migration changes all three reviewed screenshot publishers from direct-to-`main` pushes to GitHub App-authenticated PR creation on stable automation branches. The Actions job token stays read-only; the short-lived App token is restricted to this repository and contents/PR writes.

**Verified on the current PR head:**
- Repository CI [42623349335](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42623349335) passed 111/111 contract tests, lint/format, typecheck, all three builds, dependency audit, and credential scan.
- Browser QA [42623349393](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42623349393) passed 18/18 routes and 36/36 viewports, with zero confirmed axe violations and zero failures. 36 axe incomplete checks still need manual contrast/accessibility review.
- Performance measurements passed 20/20 samples each for local build, GitHub Pages and Cloudflare Pages. Report artifact: [13676544569](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42623349393/artifacts/13676544569).

### Owner-side activation still required

After PR #26 is merged, create/install a GitHub App only on `pooya-labs/pooya-labs-platform`, then add `CAPTURE_PUBLISHER_APP_ID` and `CAPTURE_PUBLISHER_APP_PRIVATE_KEY` as private Actions secrets. Manually run all three capture-publisher workflows and verify each creates a PR with passing Repository CI and Browser QA. Only then activate and test the `main` ruleset. No secrets or repository settings have been changed by this implementation.

### Remaining Phase 7 exit gates

Manual contrast/accessibility review; physical Android and desktop owner review; biography/featured-project/contribution/contact and media approvals; external crawler checks for 17 social cards; GitHub Pages source-setting confirmation; host rollback rehearsal; and the tested App-backed publisher plus active `main` ruleset. Keep release at **pre-alpha**; no V1 tag.

# Next Task — P7-13 owner activation and governance proof

**Canonical repository:** `pooya-labs/pooya-labs-platform`  
**Implementation PR:** [#26](https://github.com/pooya-labs/pooya-labs-platform/pull/26)  
**PR head:** `8037631274fd1d086d1f90c1d68f42015116e8c7`

**Next atomic task:** merge PR #26 after reviewing its final diff, install the dedicated GitHub App, add the two repository secrets, dispatch the three publishers and verify their PRs/checks. Then set up the active ruleset for `main` and prove required checks block an invalid test PR. Do not close Phase 7 until the remaining manual, device and content gates are also complete.

