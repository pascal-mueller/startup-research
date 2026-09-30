# Recovery plan (session 2)

The first build session ended without handing over. This is what the repository held when session 2 took it over, and the plan for continuing.

## What exists and is good (keep)
- **App shell**: Vite + React 19 + MDX + YAML content, hash router, left sidebar with per-section progress, breadcrumbs,
  right-hand TOC, MiniSearch search (⌘K), glossary hover tooltips, citations with per-page reference lists, dark mode,
  localStorage progress. Typecheck is clean.
- **Content schema and components**: workflow YAML schema + `WorkflowPage`, glossary/term pages, `Callout` (evidence-typed),
  `Flow`, `Example`, `CompanyCompare`, `SizeTabs`, org components (`OrgChart`, `RaciMatrixView`, `InterviewFinder`,
  `RoleKnows`, `RoleExists`, `RoleCalendar`, `RoleIndex`, `Handoffs`), `TreasuryMap`, `SourcesIndex`.
- **Content validator** `npm run check` (cross-refs: terms, sources, workflows, companies, pages, roles, org charts).
- **Exemplar content** (good quality, NOT yet independently reviewed): Start Here (3 pages), Daily cash positioning,
  Cash forecasting, 173 glossary terms (all terms the spec requires), 31 sources, 4 canonical companies.
- **Docs**: PLAN.md (IA), AUTHORING.md (style guide + schema + canonical cast/ids/paths), reviewer briefs.

## Missing (to build)
- Treasury Map area pages (10) — glossary for them exists (`glossary/map.yaml`), pages were lost.
- 18 of 20 workflows (payments glossary/sources exist in `wf-pay.yaml`, workflow files were lost).
- Org & Roles: `data/roles.yaml`, `orgs.yaml`, `raci.yaml`, `interview-topics.yaml` and every /org page.
- Day in the Life, Company Scenarios, Treasury by Size, Systems & Data, Interview Prep, Agentic Treasury (incl.
  digital-worker view), Competitor Landscape, Reference/open-questions.
- Component stubs: `Diagrams.tsx`, `LensViews.tsx`, `CompetitorViews.tsx`.
- Review log is empty: no module has been through the review loop.

## Needs revision
- `scripts/shot.mjs` hard-coded a macOS Chrome path (fixed: uses `/opt/pw-browsers/chromium` on Linux or `CHROME_PATH`).
- Day-in-the-Life list must add a Treasury Analyst (Lea, Helvetic) and a Cash Manager (Priya, GlobalChem) per spec.

## Execution
1. Wave 1 (parallel): independent review of exemplars; org/roles authors; map author; workflow authors (4 streams);
   people/companies/size author; systems author; interview author; lens author; competitor author.
   Each stream owns distinct files (see AUTHORING.md), writes its own glossary/sources files and component-specific CSS.
2. For each stream: independent reviewer (general or TREASURY_ORG_REVIEWER) → author revises → re-review, ≤4 rounds.
   Reviews in `docs/reviews/`, summary rows in `docs/REVIEW_LOG.md`.
3. Cross-section reviews (cash, payments, FX/debt, roles), then final adversarial "interview tomorrow" review; fix all
   high-severity defects.
