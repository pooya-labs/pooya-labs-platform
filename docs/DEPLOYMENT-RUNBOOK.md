# Deployment, Rollback, Backup, and Restore Runbook

**Current deployment:** Phase 0 proof only. No production data or business actions are enabled.

## Source of truth

- Canonical source and decisions live in `pooya-labs/pooya-labs-platform` on `main`.
- Apps Script editor/deployment is a runtime copy, not the source of truth.
- GitHub Pages is a static docs/showcase host; it is not connected to privileged GAS RPC.
- Never commit the full deployment URL, script ID, spreadsheet ID, user records, or credentials to public source.

## Manual Apps Script source sync

1. Review the intended commit on `main`.
2. Copy `apps-script/Code.gs` into the matching Apps Script project file.
3. Copy `apps-script/Index.html` into the HTML file named `Index`.
4. Keep the V8 manifest configuration unless an approved change requires otherwise.
5. Save, then create a new version of the existing Web App deployment.
6. Open the deployment's `/exec` page and run the RPC health check.
7. Record commit SHA, deployed version, timestamp, and test result in the project checkpoint. Do not record the deployment URL or its ID in the public repository.

## Optional browser transport diagnostic

The one-off CORS diagnosis is complete. To run it again later, add a repository Actions secret named `GAS_WEB_APP_URL` under **Settings → Secrets and variables → Actions**. The workflow reads the URL from that secret and does not store it in the repository source. This diagnostic tests only the intentionally unsupported external Pages-to-GAS path; it is not part of application runtime verification.

## Rollback rehearsal

While only the health action exists:
1. Record the currently working deployment version.
2. Publish a deliberately known-good prior version or select the prior version in the deployment's edit flow.
3. Open the stable deployment URL and run the health check.
4. Restore the latest intended version and verify once more.
5. Record the result; never use production user data to test rollback.

For future production releases, define a maintenance window and a rollback trigger before deployment. A rollback must restore both script version and any compatible schema/configuration assumptions.

## Future spreadsheet backup policy

No production spreadsheet exists yet. Before one is created:
- Create it under the intended owner account and restrict sharing to the minimum required principals.
- Decide whether public intake and private/admin records belong in separate spreadsheets.
- Set a documented backup frequency based on acceptable data-loss window; a daily copy is a provisional starting point for low-volume records, not a universal guarantee.
- Keep backups in a restricted Drive folder with access reviewed separately from the live spreadsheet.
- Name snapshots with UTC timestamp and schema version.
- Do not store backup links or private data in the public repo or CI artifacts.

## Restore rehearsal

Before accepting real private data:
1. Create a non-production test spreadsheet with synthetic records.
2. Make a backup using the selected mechanism.
3. Delete or alter a synthetic record in the test copy.
4. Restore into a separate recovery spreadsheet; do not overwrite the live file during the first test.
5. Verify row counts, stable record IDs, timestamps, formulas, access settings, and schema version.
6. Document recovery time, missing data, and any manual correction.
7. Only then approve the backup mechanism for production.

## Recovery constraints

- Google Sheets is not an ACID database. Multi-row workflows need explicit lock/idempotency/compensation design.
- Apps Script quotas and time limits apply to backup scripts too.
- CacheService is not a backup or queue.
- Backups inherit the source data's classification and access restrictions.
