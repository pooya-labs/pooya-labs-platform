# GitHub Repository Governance — Phase 7

**Audit date:** 9 November 2026  
**Repository:** `pooya-labs/pooya-labs-platform`  
**Audited default branch:** `main`  
**Audited main HEAD:** [`42d12a16354b`](https://github.com/pooya-labs/pooya-labs-platform/commit/42d12a16354b4fae2d88258c523401fd091ce532)

## Executive findings

- GitHub reports `main` as **unprotected**: `protected: false`, branch protection disabled, and no required status checks.
- The repository rulesets API returned **zero rulesets**. This was rechecked against the current main after PR #28 merged.
- App-created smoke PR [#34](https://github.com/pooya-labs/pooya-labs-platform/pull/34) was authored by `pooya-labs-capture-publisher[bot]`, changed only the non-product marker file, passed Repository CI [42637894225](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42637894225) and Browser QA [42637894236](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42637894236), and merged as `42d12a1`.
- The current published application bundle is still the earlier GitHub Pages app commit `558970f`; PRs #28 and #32 changed workflows/tests only. No new application deployment is claimed.
- No repository settings or secrets were changed as part of this work.

## GitHub App branch-push and PR-creation proof — PR #34

- Manual smoke run [42637851827](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42637851827) completed successfully, including App installation-token creation, branch push, PR creation, and the required PR URL assertion.
- The App bot `pooya-labs-capture-publisher[bot]` created [PR #34](https://github.com/pooya-labs/pooya-labs-platform/pull/34) from `automation/app-publisher-permission-smoke`. The only changed file was `.github/app-publisher-smoke/latest-run.md`; 8 additions and 0 deletions.
- Repository CI [42637894225](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42637894225) and Browser QA [42637894236](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42637894236) both passed on PR head `e4611d8`. Browser QA uploaded artifact [13682859892](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42637894236/artifacts/13682859892).
- PR #34 was squash-merged as [`42d12a1`](https://github.com/pooya-labs/pooya-labs-platform/commit/42d12a16354b4fae2d88258c523401fd091ce532). The marker is now present on `main`.
- This proves App-authenticated branch push and PR creation. It does not prove that a reviewed-capture workflow has a new screenshot diff to publish; all three real publishers previously found their approved images already current.

## Workflow inventory update — 11 workflows

The repository now contains eleven workflow files. In addition to the original ten-workflow audit, the newly added `.github/workflows/app-publisher-smoke.yml` was reviewed: it is manual-only, keeps the default Actions token read-only (`contents: read`, `actions: read`), and grants the installation token only `contents: write` and `pull-requests: write` for the single repository. Its only staged path is the non-product marker `.github/app-publisher-smoke/latest-run.md`. No `pull_request_target`, `workflow_run`, or `actions: write` permission was added.

## Reviewed-capture publisher hardening — PR #28

PR [#28](https://github.com/pooya-labs/pooya-labs-platform/pull/28) merged to `main` as [`01749d7`](https://github.com/pooya-labs/pooya-labs-platform/commit/01749d717f6e31a1096cde91ff7773a9b58e1626).

All three reviewed image publishers were changed from direct writes to `main` to GitHub App-authenticated pull-request creation on stable automation branches:

- `.github/workflows/publish-reviewed-captures.yml`
- `.github/workflows/publish-reviewed-portfolio-captures.yml`
- `.github/workflows/publish-portfolio-fullpage-captures.yml`

The workflows preserve the approval-manifest, source-run identity, PNG signature/dimension, path containment, byte-size, and SHA-256 checks before any publication is proposed. They now:

- Keep the default Actions token read-only (`contents: read`, `actions: read`).
- Disable persisted checkout credentials.
- Request a short-lived GitHub App token restricted to this repository with `contents: write` and `pull-requests: write`.
- Use `peter-evans/create-pull-request@v8` to open/update dedicated automation branches.
- Support manual `workflow_dispatch`.
- Fail closed when required App secrets are absent; there is no direct-push fallback.

### Exact PR verification

The code/test PR head was [`7421479`](https://github.com/pooya-labs/pooya-labs-platform/commit/7421479def8bf397fe3470561087cda383edd5a1).

- Repository CI [42624753678](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42624753678) passed: 111/111 contract tests, lint/format, TypeScript, all three build targets, dependency audit, and credential scan.
- Browser QA [42624753816](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42624753816) passed 18/18 routes and 36/36 viewport checks, with zero page failures and zero confirmed axe violations.
- Thirty-six axe color-contrast checks remain incomplete because layered gradients, pseudo-elements, overlays, and non-text-only elements prevent automated contrast calculation. They are not recorded as passes and still require visual review.
- Performance QA measured 20 samples each on local build, GitHub Pages, and Cloudflare Pages, with no failed samples. Report artifact: [13678551079](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42624753816/artifacts/13678551079).

### Post-merge fail-closed runtime verification — before App setup

Immediately after PR #28 merged, all three publishers ran and paused safely because the owner had not yet configured the App secrets:

| Publisher | Run | Result |
|---|---|---|
| Portfolio captures | [42625390767](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42625390767) | App secrets absent; token and PR steps skipped; no image files published |
| Full-page captures | [42625390703](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42625390703) | App secrets absent; token and PR steps skipped; no image files published |
| Reviewed interface captures | [42625390732](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42625390732) | App secrets absent; token and PR steps skipped; no image files published |

These are historical pre-activation runs and are retained as evidence of the fail-closed path.

### Owner App setup and manual publisher dispatches — 9 November 2026

The owner confirmed that the dedicated `Pooya Labs Capture Publisher` installation is limited to `pooya-labs/pooya-labs-platform` and that both private Actions secrets are configured. Each workflow requests a short-lived installation token for this repository only, with `contents: write` and `pull-requests: write`.

All three manual dispatches completed successfully:

| Publisher | Manual run | App token | PR action result |
|---|---|---|---|
| Reviewed ORBIT interface captures | [42631761203](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42631761203) | Created successfully | No diff; no PR needed |
| Portfolio captures | [42632714049](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42632714049) | Created successfully | No diff; no PR needed |
| Full-page portfolio captures | [42632732364](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42632732364) | Created successfully | No diff; no PR needed |

For every run, the approval manifest, source artifact, PNG signature, dimensions (where specified), byte size, destination containment, and SHA-256 checks passed. Both secret values were detected, the GitHub App installation-token action succeeded, and the pull-request action completed without error.

The action logs show `pull-request-operation = none` and `No publication diff was required; approved captures already match main.` Consequently, no automation branch was pushed and no publisher-generated PR was opened. No image files were changed or published. This proves the App credentials and installation-token flow, but the write path for a real PR remains unexercised because GitHub had no diff to publish.

### Controlled GitHub App PR-write smoke harness — PR #32

PR [#32](https://github.com/pooya-labs/pooya-labs-platform/pull/32) merged as [`7e2e5a2`](https://github.com/pooya-labs/pooya-labs-platform/commit/7e2e5a2ff0e43f46e125e5c63db2d453e9b6bf0c). It adds a manual-only workflow at `.github/workflows/app-publisher-smoke.yml` to exercise the App's actual branch-push and PR-creation permissions without creating a fake screenshot diff.

- The workflow must be dispatched from `main`; it checks for both private App secrets.
- Default Actions token remains read-only; the installation token is scoped to this repository with `contents: write` and `pull-requests: write`.
- It creates/updates only `.github/app-publisher-smoke/latest-run.md` and opens a reviewable PR from `automation/app-publisher-permission-smoke`.
- It does not touch application source, screenshot/public assets, customer data, credentials, independent project repositories, or deployments.
- PR CI [42635400246](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42635400246) passed 112/112 tests. PR Browser QA [42635400130](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42635400130) passed 18/18 routes and 36/36 viewports, zero failures and zero confirmed axe violations; 36 incomplete contrast checks remain manual. Performance recorded 20 samples per host with no failures; report [13683600592](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42635400130/artifacts/13683600592).
- Main CI [42635961927](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42635961927) passed after merge on `7e2e5a2`.

**Owner dispatch is still pending.** Run the workflow manually from `main`, then confirm that it opens a PR titled `test(platform): verify GitHub App PR creation`. Wait for Repository CI and Portfolio Browser QA on that generated PR, review the marker-only diff, and merge it after both checks pass. The automation branch is configured for deletion on merge.

## Recommended `main` ruleset — App proof complete; owner activation pending

The marker-only App permission smoke PR has now been created, passed Repository CI and Browser QA, and been merged. The remaining step is owner activation and verification:

- Target only `main` and set enforcement to **Active**.
- Require a pull request for changes to `main`.
- Require these observed check contexts:
  - `Typecheck, three-target build, and contract tests`
  - `Chromium responsive and keyboard smoke`
- Block force pushes and branch deletion.
- Keep bypass actors empty; the App now writes to PR branches and does not need a `main` bypass.
- With a single maintainer, zero mandatory approvals may be used only if Pooya personally reviews and merges every PR; increase approval requirements when an independent reviewer is available.
- Test that pending or failed checks block merge and that passing checks permit the normal merge path.

The current main remains unprotected (`protected: false`, protection disabled, no required contexts) and the rulesets endpoint returns zero rulesets. PR #34 and both required checks have passed; therefore the App proof gate is complete. Ruleset activation and the pending/failed-check enforcement test remain owner actions.

## Separate deployment-secret status

- Cloudflare Actions publishing requires the private `CLOUDFLARE_API_TOKEN` secret. Keep the skipped workflow distinct from any manually authorized Cloudflare Pages deployment.
- Apps Script publishing requires `CLASPRC_JSON`, `CLASP_JSON`, and `GAS_DEPLOYMENT_ID`. The static portfolio does not depend on Apps Script; configure these only if the Web App remains an intended release target.

## فارسی — جمع‌بندی ممیزی

در ۹ نوامبر ۲۰۲۶، PR شمارهٔ ۳۴ توسط ربات اختصاصی `pooya-labs-capture-publisher[bot]` ساخته شد، فقط فایل نشانگر غیرمحصولی را تغییر داد، بررسی‌های Repository CI و Browser QA را با موفقیت گذراند و با Commit `42d12a1` ادغام شد. بنابراین مسیر احراز هویت، نوشتن شاخه و ساخت PR با GitHub App اختصاصی اثبات شده است. با این حال، سه ناشر تصویر هنوز PR تصویری واقعی نساخته‌اند، چون تصاویر تأییدشده از قبل با نسخهٔ مخزن برابر بودند.

شاخهٔ `main` هنوز محافظت نشده و API شاخه مقدار `protected: false` را گزارش می‌کند؛ همچنین هیچ Ruleset فعالی وجود ندارد. گام بعدی مالک، ساخت Ruleset برای الزام PR و دو بررسی `Typecheck, three-target build, and contract tests` و `Chromium responsive and keyboard smoke` و سپس آزمون جلوگیری از ادغام هنگام شکست یا انتظار بررسی‌هاست. وضعیت پلتفرم همچنان **Pre-alpha / Phase 7** است.
