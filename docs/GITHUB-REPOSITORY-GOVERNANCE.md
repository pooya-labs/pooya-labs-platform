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

### Post-merge fail-closed runtime verification

All three publisher workflows were triggered automatically by the PR #28 merge and completed successfully:

| Publisher | Run | Result |
|---|---|---|
| Portfolio captures | [42625390767](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42625390767) | App configuration missing; token and PR steps skipped; no image files published |
| Full-page captures | [42625390703](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42625390703) | App configuration missing; token and PR steps skipped; no image files published |
| Reviewed interface captures | [42625390732](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42625390732) | App configuration missing; token and PR steps skipped; no image files published |

The workflow logs explicitly recorded the pause and confirmed that no files were published or pushed to `main`. This proves the safe failure path; it does **not** prove a live App installation or real App-authenticated PR creation. No images were published by these runs.

## Owner-side GitHub App activation

The following private repository secrets are required:

- `CAPTURE_PUBLISHER_APP_ID`: the GitHub App ID.
- `CAPTURE_PUBLISHER_APP_PRIVATE_KEY`: the generated PEM private key, preserving line breaks.

Recommended App setup:

1. Create a dedicated GitHub App and install it only on `pooya-labs/pooya-labs-platform`.
2. Grant only repository **Contents: Read and write** and **Pull requests: Read and write**; keep Metadata at its default read-only permission.
3. Add the two values as private Actions secrets under **Settings → Secrets and variables → Actions**. Never put the private key in a repository file, issue, pull request, or workflow log.
4. Manually dispatch each of the three publisher workflows.
5. Confirm that each run opens or updates its dedicated `automation/...` PR branch.
6. Verify Repository CI and Portfolio Browser QA run successfully on each generated PR. Review the exact image diff before merging.

Until these steps pass, the real App-backed publisher is not considered live and the publisher jobs will pause safely.

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

پس از ادغام، هر سه ناشر با موفقیت اجرا شدند و به‌دلیل نبود تنظیمات App، ساخت توکن و PR را رد کردند؛ گزارش اجراها تأیید می‌کند هیچ تصویری روی `main` نوشته نشد. برای فعال‌شدن انتشار واقعی، باید App اختصاصی فقط روی همین مخزن نصب و دو Secret خصوصی `CAPTURE_PUBLISHER_APP_ID` و `CAPTURE_PUBLISHER_APP_PRIVATE_KEY` ثبت شوند. سپس هر سه گردش‌کار باید دستی اجرا شوند و PRهای ساخته‌شده، CI و Browser QA را با موفقیت بگذرانند.

پس از اثبات مسیر واقعی App، می‌توان Ruleset شاخهٔ `main` را با الزام PR و دو check مشاهده‌شده فعال و آزمایش کرد. تا آن زمان، دروازهٔ حاکمیت باز می‌ماند و وضعیت پلتفرم همچنان **Pre-alpha / Phase 7** است.
