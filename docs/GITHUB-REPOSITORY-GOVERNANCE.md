# GitHub Repository Governance — Phase 7

**Audit date:** 2026-11-09  
**Repository:** `pooya-labs/pooya-labs-platform`  
**Audited default branch:** `main`  
**Observed main HEAD:** [`01749d7`](https://github.com/pooya-labs/pooya-labs-platform/commit/01749d717f6e31a1096cde91ff7773a9b58e1626)

## Executive findings

- **Main is still not protected.** GitHub reports `protected: false`, with no required status-check contexts.
- **No repository rulesets are active.** GitHub's rulesets endpoint returned an empty list.
- PR [#28](https://github.com/pooya-labs/pooya-labs-platform/pull/28) merged the reviewed-capture publisher hardening as [`01749d7`](https://github.com/pooya-labs/pooya-labs-platform/commit/01749d717f6e31a1096cde91ff7773a9b58e1626).
- Repository CI [42624753678](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42624753678) and Portfolio Browser QA [42624753816](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42624753816) both passed on PR head [`7421479`](https://github.com/pooya-labs/pooya-labs-platform/commit/7421479def8bf397fe3470561087cda383edd5a1) before merge.
- The merge changed only the three publisher workflows and two contract tests. It did not change application source, the public site bundle, or a deployment.
- Main push-triggered Repository CI [42625390685](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42625390685) was still running at the time of this checkpoint; it is not recorded as passed here.

Branch protection remains a release-governance blocker: the relevant checks pass when run, but GitHub is not configured to require them before changes reach `main`.

## GitHub Actions permission audit

All ten workflow files under `.github/workflows/` were inspected. The three reviewed-capture publishers were updated in PR #28.

| Workflow | Default Actions token permissions | Assessment |
|---|---|---|
| `ci.yml` | `contents: read` | Read-only validation |
| `deploy-cloudflare.yml` | `contents: read` | Read-only checkout; Cloudflare uses a private deployment secret |
| `deploy-gas.yml` | `contents: read` | Read-only checkout; clasp uses private deployment secrets |
| `external-gas-browser.yml` | `contents: read` | Read-only browser diagnostic |
| `portfolio-browser-qa.yml` | `contents: read` | Read-only browser and performance QA |
| `project-interface-captures.yml` | `contents: read` | Read-only screenshot capture |
| `pages-platform.yml` | `contents: read`, `pages: write`, `id-token: write` | Deployment-specific Pages/OIDC permissions |
| `publish-portfolio-fullpage-captures.yml` | `contents: read`, `actions: read` | Read-only default token; App token is conditional |
| `publish-reviewed-captures.yml` | `contents: read`, `actions: read` | Read-only default token; App token is conditional |
| `publish-reviewed-portfolio-captures.yml` | `contents: read`, `actions: read` | Read-only default token; App token is conditional |

The three publishers now disable persisted checkout credentials, remove direct `git push origin HEAD:main`, retain owner-approved manifest/source-run/PNG/path/size/SHA-256 validation, and create a reviewable PR on a dedicated automation branch. The short-lived GitHub App token, when configured, is limited to this one repository and only `contents: write` plus `pull-requests: write`. The default workflow token remains read-only.

## PR #28 — implementation and observed verification

PR [#28](https://github.com/pooya-labs/pooya-labs-platform/pull/28) merged on 2026-11-09 as [`01749d7`](https://github.com/pooya-labs/pooya-labs-platform/commit/01749d717f6e31a1096cde91ff7773a9b58e1626).

- Repository CI [42624753678](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42624753678) passed on PR head `7421479`: **111/111 contract tests**, zero failures, lint/format, typecheck, GitHub Pages/GAS/Cloudflare builds, dependency audit and credential scan.
- Portfolio Browser QA [42624753816](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42624753816) passed on the same PR head: **18/18 routes**, **36/36 viewports**, zero confirmed axe violations and zero failures. Axe reported **36 incomplete contrast checks**; these are not passes and remain manual accessibility work.
- Cold-route performance checks collected **20/20 measurements** on each of the local build, GitHub Pages and Cloudflare Pages, with zero test failures. Browser artifact: [13678551079](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42624753816/artifacts/13678551079).
- After merge, all three push-triggered publisher workflows completed successfully:
  - Portfolio captures: [42625390767](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42625390767)
  - ORBIT captures: [42625390732](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42625390732)
  - Full-page captures: [42625390703](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42625390703)
- Each run passed its approval-manifest and image-integrity checks, found that the App secrets were not configured, skipped token creation and PR creation, and wrote a notice that no image files were published or pushed to `main`. This verifies the fail-closed behavior; it does **not** yet verify a real App-authenticated PR creation.

## Owner-side GitHub App activation

Create a dedicated GitHub App for the `pooya-labs` owner and install it only on `pooya-labs/pooya-labs-platform`.

Grant only these repository permissions:

| Permission | Access |
|---|---|
| Contents | Read and write |
| Pull requests | Read and write |
| Metadata | Read-only (GitHub default) |

No webhook subscription is required by these publisher workflows. Add these private repository Actions secrets under **Settings → Secrets and variables → Actions**:

- `CAPTURE_PUBLISHER_APP_ID`: the App ID.
- `CAPTURE_PUBLISHER_APP_PRIVATE_KEY`: the generated PEM private key, preserving line breaks.

Never add the private key to a repository file, issue, PR, or workflow log.

After the App is installed and both secrets are present:

1. Manually dispatch each of the three `Publish Reviewed...` workflows from **Actions**.
2. Confirm each opens/updates its own `automation/...` branch PR.
3. Confirm Repository CI and Portfolio Browser QA both run on each generated PR.
4. Review the exact image diffs and merge only after both checks pass.
5. Confirm the expected capture gallery assets change on `main`.

Until the three real App-backed publisher PRs have passed their checks once, keep this owner-side activation gate open.

## Recommended `main` ruleset

After the App-backed PR flow is proven, configure a ruleset in **Repository Settings → Rules → Rulesets**:

- Target only `main`; set enforcement to **Active**.
- Require pull requests for changes to `main`.
- Require these exact checks:
  - `Typecheck, three-target build, and contract tests`
  - `Chromium responsive and keyboard smoke`
- Block force pushes and branch deletion.
- Keep bypass actors empty. The App writes to PR branches and does not need to bypass the `main` ruleset.
- With a single maintainer, zero mandatory approvals may be used only while Pooya personally reviews every PR; add independent review requirements when available.

Do not mark this governance gate complete until a test PR proves pending/failing checks block merge and passing checks permit the normal merge path. This GitHub connection cannot change repository Settings or create private App credentials on the owner's behalf. The main branch remains unprotected at this checkpoint.

## Separate deployment-secret status

- GitHub Actions Cloudflare publishing still needs the private `CLOUDFLARE_API_TOKEN`; the static portfolio has previously been deployed through the authorized Cloudflare Pages API, but that does not configure this Actions secret.
- Apps Script publishing requires `CLASPRC_JSON`, `CLASP_JSON`, and `GAS_DEPLOYMENT_ID`. Configure these only if the Apps Script Web App remains an intended release target.
- PR #28 did not change application source or trigger a Pages deployment.

## فارسی — جمع‌بندی

سه workflow انتشار تصویر اکنون دیگر به `main` push مستقیم نمی‌کنند؛ با توکن محدود GitHub App درخواست ادغام جداگانه می‌سازند. توکن پیش‌فرض Actions فقط دسترسی خواندن دارد. هر سه workflow پس از ادغام با موفقیت بررسی manifest و checksum را انجام دادند، اما چون App و Secretهایش هنوز تنظیم نشده‌اند، مرحلهٔ ساخت PR را متوقف کردند و هیچ تصویری منتشر نشد.

برای فعال‌سازی واقعی باید App اختصاصی روی همین مخزن نصب و دو Secret خصوصی اضافه شوند، سپس هر سه workflow دستی اجرا و PRهایشان بررسی شوند. پس از اثبات این مسیر، می‌توان Ruleset شاخهٔ `main` را فعال و آزمایش کرد. تا آن زمان شاخهٔ `main` همچنان محافظت‌نشده است و پلتفرم در Phase 7 و وضعیت pre-alpha باقی می‌ماند.
