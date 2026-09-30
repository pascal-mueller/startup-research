# Notes — "lens" stream (Agentic Treasury / Startup Lens + Digital Worker view)

## Files created / owned
- `content/data/lens.yaml` — 16 criteria (with direction + scale anchors), 3 class definitions, 20 workflow entries
  (scores 1–5 + one-line note per criterion, assignment, headline, already_automated, agent_does, human_keeps,
  narrow_start, expansion, must_be_true, startup_view, ai_note_view, evidence with cites, dw link), and 4 digital-worker
  models (inputs, reasoning, tools+access, output, verification, execution, feedback, failure modes/guardrails,
  autonomy ladder, metrics).
- `src/components/LensViews.tsx` — `<LensMatrix/>` (sortable/filterable, row → inline detail, hash anchors = workflow
  ids), `<LensCard id/>`, `<LensCriteria/>`, `<LensGroup cls detail/>`, `<LensSummary/>`, `<LensBadge/>`,
  `<DigitalWorker id/>`, `<DigitalWorkerIndex/>`. CSS in `src/styles/lens.css` (imported from the component).
- `content/pages/lens/`: `index.mdx`, `method.mdx`, `matrix.mdx`, `candidates.mdx`, `digital-worker.mdx`,
  `dw-liquidity-recommendation.mdx`, `dw-forecast-variance.mdx`, `dw-exposure-collection.mdx`, `dw-bank-fee-review.mdx`.
- `content/glossary/lens.yaml` (8 terms: large-language-model, human-in-the-loop, hallucination, evaluation-set, rpa,
  eu-ai-act, automation-bias, prompt-injection). Reuses competitors' `treasury-agent` (which aliases "digital worker").
- `content/sources/lens.yaml` (10 sources).

## Result
5 good (daily-cash-positioning, cash-forecasting, fx-exposure-management, bank-fee-analysis, month-end-reporting),
9 possible, 6 hard (payment-processing, large-payment-approval, fraud-investigation, acquisition-integration,
currency-shock, liquidity-crisis). Separate "startup view" per workflow; explicit list of poor startup targets
(bank reconciliation, payment release, approval, CHF investment, crises, bank fees alone).

## Key sources (all verified from original-publisher search results; WebFetch was blocked by egress policy)
- PwC 2025 GTS (pwc.com): 74% expanding/actively using AI; ML 71%, predictive 64%; 26% mature, 42% piloting, 32% early;
  RPA used for reconciliation, payments processing, exposure data gathering.
- EACT 2025 (eact.eu): AI ranked after data analytics and cloud due to absence of data lakes / standardised information.
- AFP 2026 Payments Fraud (existing id afp-pfc-2026): 76% fraud, 17% use AI.
- AFP 2023 conference poll on AI roadblocks (55/48/44%) — flagged as non-representative.
- Deloitte 2024: GenAI use cases most popular in forecasting, positioning, market risk.
- EU AI Act Annex III (credit scoring of natural persons, fraud-detection exception); DORA scope (financial entities);
  FINMA Guidance 08/2024 (addressed to supervised institutions).
- FinanceBench (81% incorrect/refused, 2023 models) and τ-bench (pass^8 < 25%, 2024 models) — caveated as dated.
- Vendor claims labelled as claims: SAP Joule Cash Management Agent, Kyriba TAI, GTreasury GSmart AI, HighRadius.

## Unresolved uncertainties
- All scores are synthesis; none tested in interviews. Size-dependence collapsed to a mid-market (Helvetic) default.
- No independent evidence found on accuracy gains from AI forecasting or agentic positioning in corporate treasury.
- Strategic Treasurer's 2025 AI in Treasury survey exists but its numbers were not visible in search results — not cited.
- Web search budget for the session was exhausted mid-research; no deepfake/BEC case (e.g. Arup) cited for that reason.
- Swiss ICS statement (Art. 728a CO, auditor confirms existence of ICS for ordinary audits) and bank collective-signature
  practice are stated as established concepts without a registered source.
- credit-facility-management and covenant-monitoring workflow files did not exist at time of rating; re-check their
  ai_note and frequency when written.

## Disagreements / comparisons with workflow ai_notes
Broadly consistent with all 18 workflow ai_notes available. Differences of emphasis:
- fx-exposure-management: lens rates it GOOD (collection/reconciliation slice at mid-market groups without a TMS
  exposure module); the workflow note is slightly more cautious (TMS tools already do part of it).
- bank-reconciliation / bank-fee-analysis / payment-processing: lens adds explicit "poor standalone business" verdicts,
  which the neutral ai_notes correctly do not make.
- policy-compliance: adopted the workflow note's insight that the messy part is signatory/mandate/user reconciliation
  and audit evidence, not limit checks.

## Requests for other authors
- core sources owner: consider adding PwC 2025 AI figures (74% / 71% / 64% / 26% / 42% / 32%) to the `pwc-gts-2025`
  note — lens pages cite them.
- org stream: `/day/lea` is linked from `/lens/candidates` (planned page).
- Whoever owns `content/pages/org/with-accounting.mdx`: at time of verification its frontmatter failed to parse
  ("Nested mappings are not allowed in compact mappings", line 4 `summary:` contains ": "), which 500s the eager
  MDX glob and blanks the whole app.
