# Project: Valmiki Ramayana Next.js Code Review and Audit

## Architecture
- **Web App Framework**: Next.js (App Router format in `src/app`).
- **UI / Styles**: Tailwind CSS, custom configurations for saffron/parchment aesthetics, dark mode ("Temple Night").
- **Components**: Reusable UI elements in `src/components`.
- **Data / Content**: Static content and text data under `data/`.
- **Scripts**: Maintenance or ingestion scripts under `scripts/`.

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| 1 | Specialized Exploration | Run R1, R2, R3 exploration subagents (Conv: 47fbf2bd-1d2b-48f0-b882-25fbb02c635e, ce77cbaf-9501-4b60-a821-7a99cb57e9dc, 6ba07a76-f499-44bc-9181-5b3b49dc7e14) | none | DONE |
| 2 | Report Compilation | Synthesize findings and write review_report.md (Conv: fdbfaea8-673e-475c-a724-43ed51bbd241) | M1 | DONE |
| 3 | Review & Verification | Review compiled report with Reviewer and Auditor - Pass 2 (Conv: 94de11b6-779c-49bf-a031-c27cdb81f504, 3cb7f52f-91ba-44b1-b4b9-0316249be9d2, db784c20-811d-405b-b59d-acc5455abbb2) | M2 | DONE |

## Interface Contracts
- The audit report `review_report.md` will be placed in the project root.
- The report must contain dedicated sections for Code Quality, Design/Aesthetics, Accessibility/Performance, and Prioritized Recommendations.
