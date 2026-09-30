# Treasury Field Manual — Internal Plan

## Goal
A dense, navigable local reference that takes a technical founder from zero to interview-ready on corporate
treasury. Every abstract concept must resolve to "what does the person ACTUALLY do" (a workflow).

## Information architecture (how sections connect)

```
Start Here ──► Treasury Map (10 areas) ──► Area pages ──► Workflows (the spine)
     │                                      ▲   │              │
     │                                      │   ▼              ▼
     └──► Treasury by Size ◄── Company Scenarios (3 fictional cos) ◄── Day in the Life (3 personas)
                                            │
Glossary  ◄── every page links terms (hover tooltip + "appears in workflows" backlinks)
Systems & Data ◄── workflows reference systems by id
Interview Prep ◄── uses roles, terms, workflows
───────────────── separated, clearly labelled ─────────────────
Startup Lens (agent suitability per workflow)   Competitor Landscape
```

* **Workflows are the spine.** Area pages explain concepts and point to workflows; workflows point to terms,
  systems, companies and size variants; the Startup Lens rates workflows by id.
* **Three companies are reused everywhere**: Alpine Robotics AG (CHF 80m), Helvetic Machines Group (CHF 650m),
  GlobalChem AG (CHF 7bn). Plus a tiny startup (Ledgerly, 30 people) for the smallest size tier.
  The same problem is shown at each scale via a `<CompanyCompare>` component that reads structured company data.
* **Startup/AI content is quarantined** into its own section so it does not bias the learning material.
  Workflow pages only carry a short neutral "where software/agents could plausibly help" note linking there.

## Evidence discipline
Every claim is one of four types, shown with a visible label:
* **Concept** – established treasury practice/definition.
* **Survey** – finding from a named industry survey (must carry a citation).
* **Field note** – practitioner observation / anecdotal pattern (cited where possible).
* **Synthesis** – the manual's own reasoning.
Sources live in one registry (`content/sources.yaml`) and are cited by id (`<Cite id="..."/>`), so every page gets
a generated reference list and the Sources page lists everything. Never fabricate statistics.

## Content storage
```
content/
  pages/<section>/<slug>.mdx     narrative pages (frontmatter: title, summary, order, related)
  workflows/<id>.yaml            strict workflow schema (objective, trigger, steps, judgment, failure modes, size variants…)
  glossary/*.yaml                terms: plain, professional, example, related, workflows
  companies.yaml                 the fictional companies + per-topic comparison snippets
  systems.yaml                   systems & vendors by category
  competitors.yaml               competitor landscape entries
  agent-lens.yaml                per-workflow agent suitability ratings
  sources.yaml                   citation registry
```
React only renders; content is data/MDX. Adding a workflow = add one YAML file.

## Stack
Vite + React + TypeScript + MDX (@mdx-js/rollup, remark-gfm, remark-frontmatter) + react-router (hash router,
works from file or dev server) + MiniSearch (client-side full-text search) + js-yaml. No backend. Progress in
localStorage.

## Components (usable in MDX)
`Term`, `Cite`, `Callout` (concept/survey/field/synthesis/warning), `Flow` (step diagram), `Example` (expandable),
`CompanyCompare`, `WorkflowLink`, `WorkflowCard`, `SizeTable`, `Stack` diagram, `Steps`.

## Execution
1. Shell + schema + components.
2. Three exemplar modules: What is Treasury?, Daily Cash Positioning, Cash Forecasting — then independent review loop.
3. Fan out remaining sections (research → write → independent review ≤4 rounds → revise).
4. Cross-module reviews per major section; final adversarial "interview tomorrow" review; fix high-severity issues.
Unresolved uncertainty is recorded in `docs/REVIEW_LOG.md`.
