# GitHub Repository Governance — Phase 7

**Audit date:** 2026-11-09  
**Repository:** `pooya-labs/pooya-labs-platform`  
**Audited default branch:** `main`  
**Observed main HEAD:** [`659189dd99af59154cbfd88ce5f9dcecb23e1e0e`](https://github.com/pooya-labs/pooya-labs-platform/commit/659189dd99af59154cbfd88ce5f9dcecb23e1e0e)

## Executive findings

- **Main is not protected.** GitHub's branch endpoint reported `protected: false`, `protection.enabled: false`, and no required status-check contexts.
- **No repository rulesets were present.** The repository rulesets endpoint returned an empty list.
- The exact main commit above had a successful Repository CI check: [run 42523193131](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42523193131), job **Typecheck, three-target build, and contract tests**.
- The latest observed Browser QA passed on PR #18: [run 42522600586](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42522600586), job **Chromium responsive and keyboard smoke**. That run belongs to the PR head, not to main HEAD `659189d`.
- This audit changed no repository settings, secrets, deployment configuration, application files, or public deployment.

The absence of branch protection is a release-governance blocker: successful Actions runs exist, but GitHub is not configured to require those checks before changes reach `main`.

## GitHub Actions permission audit

All ten workflow files under `.github/workflows/` were inspected on the audited main revision.

| Workflow | Declared token permissions | Assessment |
|---|---|---|
| `ci.yml` | `contents: read` | Read-only validation |
| `deploy-cloudflare.yml` | `contents: read` | Read-only checkout; Cloudflare uses a private deployment secret |
| `deploy-gas.yml` | `contents: read` | Read-only checkout; clasp uses private deployment secrets |
| `external-gas-browser.yml` | `contents: read` | Read-only browser diagnostic |
| `portfolio-browser-qa.yml` | `contents: read` | Read-only browser and performance QA |
| `project-interface-captures.yml` | `contents: read` | Read-only screenshot capture |
| `pages-platform.yml` | `contents: read`, `pages: write`, `id-token: write` | Deployment-specific Pages/OIDC permissions |
| `publish-portfolio-fullpage-captures.yml` | `contents: write`, `actions: read` | Downloads and publishes owner-approved capture artifacts |
| `publish-reviewed-captures.yml` | `contents: write`, `actions: read` | Downloads and publishes owner-approved capture artifacts |
| `publish-reviewed-portfolio-captures.yml` | `contents: write`, `actions: read` | Downloads and publishes owner-approved capture artifacts |

The reviewed files declare explicit workflow-level token permissions. The validation/capture workflows remain read-only; the Pages workflow receives only its deployment permissions; and only the three artifact publishers receive repository write access. No `actions: write` permission was found. No `pull_request_target` or `workflow_run` trigger was found in the ten inspected files.

### Important interaction with branch protection

The three capture-publisher workflows currently commit their checksum-verified assets directly to `main` using `git push origin HEAD:main`. A ruleset that requires every change to arrive through a pull request will block these bot pushes unless a bypass is granted.

Do not activate a strict PR-required ruleset without first choosing and testing one of these paths:

1. **Preferred hardening:** change the publishers to create a reviewable branch/PR using a dedicated GitHub App installation token, and verify that CI and Browser QA run on that PR.
2. **Compatibility path:** grant the GitHub Actions app a narrowly reviewed ruleset bypass for these publisher writes. This is an application-wide bypass, not a per-workflow exception, so it is broader and should be treated as a security trade-off.

The current workflows have not been changed in this audit. The direct-push behavior remains functional while the main branch is unprotected.

## Required owner-side governance setup

After the publisher path above is resolved, configure a branch ruleset for `main` in **Repository Settings → Rules → Rulesets**.

Recommended baseline:

- Target only the `main` branch and set enforcement to **Active**.
- Require pull requests for normal human changes. For a single-maintainer workflow, zero required approvals is acceptable only if the owner continues to review each PR personally; increase it when an independent reviewer is available.
- Require these exact check names after confirming they are available in the ruleset picker:
  - `Typecheck, three-target build, and contract tests`
  - `Chromium responsive and keyboard smoke`
- Block force pushes and branch deletion.
- Keep bypass actors empty where possible. If the artifact-publisher compatibility path is selected, document the GitHub Actions bypass explicitly and recheck which workflows possess `contents: write`.
- Do not mark the governance gate complete until a test PR demonstrates that required checks block merge when pending/failing and allow merge only after both pass.

The names above are the observed job/check names, not assumptions about workflow display titles.

## Separate deployment-secret status

The static portfolio does not require Apps Script publishing. The latest recorded Apps Script production workflow skipped its publish job because `CLASPRC_JSON`, `CLASP_JSON`, and `GAS_DEPLOYMENT_ID` were not configured. Configure them only if the Apps Script Web App is still an intended release target.

GitHub Actions Cloudflare publishing also remains credential-gated by the private `CLOUDFLARE_API_TOKEN`; a previous Cloudflare production deployment was completed separately through the authorized Pages API. Do not paste any secret into a PR, issue, or repository file.

## فارسی — جمع‌بندی ممیزی

در بررسی ۹ نوامبر ۲۰۲۶ مشخص شد شاخهٔ `main` محافظت نشده و هیچ Ruleset فعالی برای مخزن وجود ندارد؛ بنابراین با وجود موفقیت CI، گیت‌ها هنوز در تنظیمات GitHub اجباری نشده‌اند.

از میان ۱۰ گردش‌کار Actions، دسترسی‌ها صریح و عمدتاً فقط‌خواندنی هستند. تنها سه گردش‌کار انتشار تصویر مجوز نوشتن محتوا دارند و هر سه فایل‌های تأییدشده را مستقیماً روی `main` ثبت می‌کنند. به همین دلیل، پیش از فعال‌کردن الزام PR باید مسیر انتشار آن‌ها به PR مبتنی بر GitHub App تبدیل شود یا استثنای ربات با آگاهی از دامنهٔ اثر آن انتخاب شود.

این ممیزی صرفاً مستندات را تغییر می‌دهد؛ هیچ تنظیم GitHub، Secret، کد اجرایی یا انتشار عمومی تغییر نکرده است. محافظت شاخه و آزمایش واقعی قواعد همچنان نیازمند اقدام مالک مخزن است.
