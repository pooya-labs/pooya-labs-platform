# GitHub Repository Governance — Phase 7

**Audit date:** 9 November 2026  
**Repository:** `pooya-labs/pooya-labs-platform`  
**Audited default branch:** `main`  
**Audited main HEAD:** [`01749d717f6e`](https://github.com/pooya-labs/pooya-labs-platform/commit/01749d717f6e31a1096cde91ff7773a9b58e1626)

## Executive findings

- GitHub reports `main` as **unprotected**: `protected: false`, branch protection disabled, and no required status checks.
- The repository rulesets API returned **zero rulesets**. This was rechecked against the current main after PR #28 merged.
- Post-merge Repository CI [42625390685](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42625390685) passed on exact main `01749d7`.
- The current published application bundle is still the earlier GitHub Pages app commit `558970f`; PR #28 only changed workflow and test files. No new application deployment is claimed.
- No repository settings or secrets were changed as part of this work.

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

### Remaining publisher proof

Use the next genuine owner-approved capture update to exercise one publisher's changed-file path. Confirm that the App pushes its automation branch, opens a PR, and that Repository CI plus Portfolio Browser QA pass on that exact PR. Do not fabricate or alter screenshot assets only to create a test diff. Repeat for the other publisher families when their approved artifacts genuinely change.

## Recommended `main` ruleset — do not activate before App proof

After all three App-generated PRs have been tested:

- Target only `main` and set enforcement to **Active**.
- Require a pull request for changes to `main`.
- Require these observed check contexts:
  - `Typecheck, three-target build, and contract tests`
  - `Chromium responsive and keyboard smoke`
- Block force pushes and branch deletion.
- Keep bypass actors empty; the App now writes to PR branches and does not need a `main` bypass.
- With a single maintainer, zero mandatory approvals may be used only if Pooya personally reviews and merges every PR; increase approval requirements when an independent reviewer is available.
- Test that pending or failed checks block merge and that passing checks permit the normal merge path.

The current main remains unprotected and the rulesets endpoint still returns zero active rulesets. Do not mark the governance gate complete until the real App PR flow and enforcement behavior have both been demonstrated.

## Separate deployment-secret status

- Cloudflare Actions publishing requires the private `CLOUDFLARE_API_TOKEN` secret. Keep the skipped workflow distinct from any manually authorized Cloudflare Pages deployment.
- Apps Script publishing requires `CLASPRC_JSON`, `CLASP_JSON`, and `GAS_DEPLOYMENT_ID`. The static portfolio does not depend on Apps Script; configure these only if the Web App remains an intended release target.

## فارسی — جمع‌بندی ممیزی

در ۹ نوامبر ۲۰۲۶، شاخهٔ `main` همچنان بدون محافظت است و هیچ Ruleset فعالی برای مخزن ثبت نشده است. PR شمارهٔ ۲۸ سه گردش‌کار انتشار تصویر را از نوشتن مستقیم روی `main` به ساخت PR با GitHub App محدود به همین مخزن منتقل کرد. توکن پیش‌فرض Actions فقط‌خواندنی است و در نبود Secretهای لازم، ناشرها بدون انتشار تصویر متوقف می‌شوند.

پس از نصب App اختصاصی و ثبت دو Secret خصوصی، هر سه اجرای دستی موفق شدند و توکن موقت GitHub App ساختند. بااین‌حال، تصاویر تأییدشده از قبل با فایل‌های موجود در `main` یکسان بودند؛ بنابراین هیچ شاخهٔ خودکاری یا PR تازه‌ای ساخته نشد. این نتیجه احراز هویت و ساخت توکن را تأیید می‌کند، نه مسیر واقعی نوشتن شاخه و ایجاد PR را.

برای اثبات نهایی، باید یک تغییر واقعی در تصاویر تأییدشده و مورد تأیید مالک وجود داشته باشد تا ناشر بتواند PR بسازد و CI و Browser QA روی همان PR اجرا شوند. تا آن زمان Ruleset شاخهٔ `main` نباید فعال شود و وضعیت پلتفرم همچنان **Pre-alpha / Phase 7** است.
