# Previous Project Integration Inventory

**Status:** Not yet inspected in this project.  
**Policy:** Read-only inspection before Phase 9; no repository modifications or code imports.

| Source repository | Planned review focus | Current integration status | Earliest integration |
|---|---|---|---|
| `pooya-labs/aetherflow` | Workflow/DAG concepts, manifests, durable execution patterns | Deferred; owner is completing it | Phase 9 |
| `pooya-labs/orbit` | Observability UX, audit workspace, API/docs explorer | Deferred; owner is completing it | Phase 9 |
| `pooya-labs/pooya-os` | Window manager, dock, terminal, shell interactions | Deferred; owner is completing it | Phase 9 |
| `pooya-labs/aurapulse` | Charts, command palette, dashboard interactions | Deferred; owner is completing it | Phase 9 |
| `pooya-labs/nexus-canvas` | Topology editor, graph layout, export formats | Deferred; owner is completing it | Phase 9 |
| `pooya-labs/lumina-glass` | Glass visual effects, Web Audio experiments | Deferred; owner is completing it | Phase 9 |
| `pooya-labs/salon-booking` | Booking flow, idempotency, admin/security patterns | Deferred; owner is completing it | Phase 9 |
| `pooya-labs/globalcart` | Potentially reusable showcase/product UI patterns | Deferred; owner is completing it | Phase 9 |

## Inspection record

No source repository has been inspected as part of the platform implementation yet. This is intentional: the first task will build a read-only inventory and record evidence without interrupting ongoing work.

For each future inspection, record:
- Date and source commit SHA.
- Relevant paths and capabilities.
- Build/runtime/dependency requirements.
- License and attribution requirements.
- Security/privacy concerns.
- Reuse decision: reuse, adapt, reference only, or reject.
- Required owner approval and integration test plan.

## Integration guardrail

The platform V1 must be independently useful with first-party implementations. Previous-project integration is a later enhancement, not a prerequisite for launch.
