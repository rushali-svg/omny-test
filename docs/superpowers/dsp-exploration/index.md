# DSP Exploration Artifact Index

This index tracks DSP discovery and design artifacts on branch `dsp-exploration`.

## Naming Contract

All markdown artifacts must follow:

`<artifact-type>-v<version>-<DD-MM-YYYY>-<slug>.md`

Example: `userflow-v2-25-05-2026-dsp-onboarding.md`

## Frontmatter Contract

Every artifact must include:

- `artifact_id`
- `module`
- `artifact_type`
- `version`
- `status`
- `owner`
- `created_on`
- `last_updated`
- `linked_prototype_paths`
- `related_artifacts`

`module` is always `DSP`.

## Artifact Registry

| Artifact ID | Type | Version | Status | Owner | File |
| --- | --- | --- | --- | --- | --- |
| DSP-BRIEF-001 | brief | v1 | draft | unassigned | [brief-v1-25-05-2026-dsp-global-brief.md](./briefs/brief-v1-25-05-2026-dsp-global-brief.md) |
| DSP-SITEMAP-001 | sitemap | v1 | draft | unassigned | [sitemap-v1-25-05-2026-dsp-module-information-architecture.md](./sitemaps/sitemap-v1-25-05-2026-dsp-module-information-architecture.md) |
| DSP-USERFLOW-001 | userflow | v1 | draft | unassigned | [userflow-v1-25-05-2026-dsp-onboarding-and-iteration.md](./userflows/userflow-v1-25-05-2026-dsp-onboarding-and-iteration.md) |
| DSP-USECASE-EDGECASE-001 | usecase-edgecase | v1 | draft | unassigned | [usecase-edgecase-v1-25-05-2026-dsp-core-scenarios.md](./usecases-edgecases/usecase-edgecase-v1-25-05-2026-dsp-core-scenarios.md) |
| DSP-DESIGN-ITER-001 | design-iteration | v1 | draft | unassigned | [design-iteration-v1-25-05-2026-dsp-prototype-direction.md](./design-iterations/design-iteration-v1-25-05-2026-dsp-prototype-direction.md) |
| DSP-FORMAT-REVIEW-001 | format-review | v1 | needs-format-decision | unassigned | [format-review-v1-25-05-2026-nonstandard-artifact-stub.md](./format-review/format-review-v1-25-05-2026-nonstandard-artifact-stub.md) |

## Non-Standard Artifact Flow

If an artifact does not fit markdown or code-file formats:

1. Create a metadata-only stub in `format-review/`.
2. Set `status: needs-format-decision`.
3. Add the stub to this index.
4. Do not store full artifact content until format is explicitly approved.

## Prototype Iterations

Code-based prototypes are stored in `src/prototypes/dsp/`:

- [iter-01-dsp-discovery/README.md](../../../src/prototypes/dsp/iter-01-dsp-discovery/README.md)
