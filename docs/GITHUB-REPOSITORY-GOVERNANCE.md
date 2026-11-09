# GitHub Repository Governance — Phase 7

**Audit date:** 2026-11-09  
**Repository:** `pooya-labs/pooya-labs-platform`  
**Audited default branch:** `main`  
**Audited main HEAD:** [`4482c96`](https://github.com/pooya-labs/pooya-labs-platform/commit/4482c96c6a6a8ec2548c8f37210c2f4674f617b2)

## Current findings

- GitHub reports `main` as unprotected: `protected: false`, with branch protection disabled.
- The repository rulesets endpoint returns an empty list.
- Main Repository CI [42621840105](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42621840105) passed on exact main `4482c96`.
- Current platform application deployment on GitHub Pages remains the app bundle from `558970f`; PR #24 was documentation/state only.
- No branch setting, ruleset, repository secret, Cloudflare credential, or Apps Script credential was changed during this work.

The missing active `main` ruleset remains a governance blocker: CI checks run, but GitHub does not enforce them before changes reach `main`.

## Reviewed-capture publisher hardening — PR #26

PR [#26](https://github.com/pooya-labs/pooya-labs-platform/pull/26) implements the preferred PR-based path on branch `chore/capture-publishers-app-prs-2026-11-09`.

- All three reviewed-capture publisher workflows now keep the default Actions token at `contents: read` and `actions: read`.
- The checkout disables persisted Git credentials.
- A short-lived GitHub App installation token is scoped to this single repository and only `contents: write` plus `pull-requests: write`.
- `peter-evans/create-pull-request@v8` opens or updates one stable automation branch per publisher.
- Original approval-manifest, source-run identity, PNG signature/dimension, path containment, byte-size, and SHA-256 checks remain before PR creation.
- Each publisher has a manual `workflow_dispatch` trigger.
- If App secrets are absent, the workflow records that publishing is paused and does not fall back to direct pushes.

### Verified checks on the PR head

The final tested PR head is [`8037631`](https://github.com/pooya-labs/pooya-labs-platform/commit/8037631274fd1d086d1f90c1d68f42015116e8c7).

- Repository CI [42623349335](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42623349335) passed: 111/111 contract tests, zero failures, dependency audit, lint/format, typecheck, all three build targets, and credential scan.
- Portfolio Browser QA [42623349393](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42623349393) passed: 18/18 localized routes, 36/36 viewport checks, zero confirmed axe violations, and zero failures. There are still 36 incomplete axe checks; they are not passes and remain in manual contrast/accessibility review.
- Cold-route performance checks completed 20/20 measurements each on local build, GitHub Pages, and Cloudflare Pages with zero test failures. Browser report artifact: [13676544569](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42623349393/artifacts/13676544569).

The code and tests are green, but the actual App-backed publishing path is **not yet live** because private App credentials have not been configured. PR #26 remains unmerged until final documentation checkpoint and review are complete.

## Owner-side GitHub App setup

Create a dedicated GitHub App for the `pooya-labs` owner and install it only on `pooya-labs/pooya-labs-platform`.

Grant only these repository permissions:

| Permission | Access |
|---|---|
| Contents | Read and write |
| Pull requests | Read and write |
| Metadata | Read-only (GitHub default) |

No webhook subscription is required for these publisher workflows. Add these repository Actions secrets under **Settings → Secrets and variables → Actions**:

- `CAPTURE_PUBLISHER_APP_ID`: the App ID.
- `CAPTURE_PUBLISHER_APP_PRIVATE_KEY`: the generated PEM private key, preserving line breaks.

Never add the private key to a repository file, issue, PR, or workflow log.

After PR #26 is merged and the secrets are saved:

1. Open **Actions** and manually dispatch each of the three publisher workflows.
2. Confirm each run opens/updates a PR on its dedicated `automation/...` branch.
3. Confirm Repository CI and Portfolio Browser QA both run on each generated PR.
4. Review the exact image diff and merge only after both checks pass.
5. Confirm the merge updates the expected public gallery assets.

Until these steps pass once, keep the governance gate open.

## Recommended `main` ruleset

Activate a ruleset only after the App-backed PR flow has been proven:

- Target only `main`; set enforcement to **Active**.
- Require pull requests for changes to `main`.
- Require these exact checks:
  - `Typecheck, three-target build, and contract tests`
  - `Chromium responsive and keyboard smoke`
- Block force pushes and branch deletion.
- Keep bypass actors empty. The App writes only to PR branches and does not need to bypass the `main` ruleset.
- With a single maintainer, zero mandatory approvals may be used if Pooya reviews and merges every PR personally; add independent review requirements when available.

Do not mark this governance gate complete until a test PR proves that pending/failing checks block merge and passing checks permit the normal merge path. The available GitHub connection cannot change repository Settings or create private App credentials on the owner's behalf.

## Other deployment credentials

- Cloudflare Actions publishing requires `CLOUDFLARE_API_TOKEN`. The latest main workflow publish job was skipped because this secret was absent; a previous production deployment was verified separately through the authorized Pages API.
- Apps Script publishing requires `CLASPRC_JSON`, `CLASP_JSON`, and `GAS_DEPLOYMENT_ID`. The latest publish job was skipped because they were not configured. Apps Script is not required for static portfolio V1 unless that target is explicitly retained.

## فارسی — جمع‌بندی

سه ناشر تصاویر تأییدشده از push مستقیم به `main` خارج شده‌اند و در PR شمارهٔ ۲۶ مسیر ساخت درخواست ادغام با GitHub App را جایگزین کرده‌اند. CI و Browser QA روی commit فعلی PR موفق شدند: ۱۱۱ تست از ۱۱۱ تست، ۱۸ مسیر از ۱۸ مسیر، ۳۶ viewport از ۳۶ viewport و بدون خطای تأییدشدهٔ axe.

برای فعال‌شدن انتشار واقعی تصاویر، باید GitHub App اختصاصی فقط روی همین مخزن نصب و دو Secret خصوصی آن اضافه شوند. پس از اجرای موفق هر سه ناشر و اثبات اجرای checkها، می‌توان Ruleset شاخهٔ `main` را فعال کرد. تا آن زمان شاخه محافظت‌نشده باقی می‌ماند و انتشار تصویر در صورت نبود Secretها متوقف می‌شود.
