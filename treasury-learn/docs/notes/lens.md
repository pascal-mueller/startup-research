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
- `content/why/lens.yaml` (r2: 9 `lens-` prefixed why notes — see the revision-pass section below).

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

## Disagreements / comparisons with workflow ai_notes
Re-checked against all 20 workflow files at the end (ai_note, frequency, examples). Broadly consistent. Differences of emphasis:
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

## Late consistency fixes
- dw-forecast-variance example re-aligned with the revised cash-forecasting example (week of 16 Nov, net variance −3.6, duplicate CHF 180k payment, Italy 8 of 10 weeks).

## Revision pass r2 (after docs/reviews/lens-r1.md)

### Task A — review findings fixed
- **C1 (Chinese balance).** `dw-liquidity-recommendation.mdx` + `data/lens.yaml` dw model rebuilt around the canonical
  input: no EBICS/SWIFT on the Chinese account, Wei emails a portal export daily, 11 of 12 statements via the
  connectivity tool. The worked morning teaches the "input arrives by email" failure mode explicitly (source-tagged
  balance, chase Wei not the provider, flagged-unconfirmed fallback, time-zone rule inverted for connected accounts),
  with a dedicated confusion callout. Links `why:systems-11-of-12-statements`, `why:day-china-manual-balance`.
- **C2 (bank fee review).** Aligned to `workflows/bank-fee-analysis.yaml`: annual review, Lea's ~4 days each January,
  feeding Daniel's wallet review ("nobody does it" removed); worked example rebuilt on the workflow's numbers
  (explicit fees 2025 ≈ CHF 410k, CHF 21k recovered/avoided, three closed accounts at Swiss bank B, the German
  SEPA mispricing line incl. the `210150 SCT FILE` translation) and — the review's key point — the **FX-spread item
  (~CHF 40k on ~CHF 16m CZK conversions)** as the cost that appears on no fee statement, bridging to wallet share.
  The one deliberate divergence (system checks every statement) is marked as the lens's own assumption.
- **C3 (exposure collection).** Timeline re-phased to the canonical cycle: submissions by WD5 noon (window WD2–WD6),
  Lea consolidates, Daniel reviews WD7, hedges after ([why:wd5-wd7-hedge-cycle]); staffing corrected to "roughly
  WD2–WD6 of each month"; "authorised dealers / back office" replaced by Daniel dealing within his mandate and
  **Lea matching confirmations and keeping the hedge register** (no back office at Helvetic — that is GlobalChem/Marta).
- **Mis-citations.** `afp-bench-2025-article` (an FTE/team-size article) removed from all three forecasting-priority
  claims (dw-forecast-variance.mdx, matrix.mdx, data/lens.yaml); replaced with `afp-bench-2025` (62% most challenging),
  `afp-top-tasks-2025` (73% top priority) and `afp-bench-2026`. Deloitte phrase restored to the survey's own "cash flow
  forecasting, cash positioning, and FX and interest rate management" (index.mdx).
- **Numeric/label drift.** method.mdx "three criteria context only" → two; HM AG CHF minimum → CHF 2.0m (parent buffer
  CHF 10m / group minimum CHF 10m labelled as such via `why:buffer-layers`); the undated worked morning is now the
  shared **Tuesday 17 November 2026** and matches `/start` + the daily-cash-positioning example line by line (CHF 41m
  group, CHF 2.6m gap with 3 causes, EUR 1.5m IC top-up, 09:10 release before the early-afternoon EUR cut-off);
  dw-forecast-variance German supplier line typed "missing input" to tie to cash-forecasting; bank-fee magnitudes
  reconciled (CHF 410k/yr ≈ the workflow); "Daniel reviews 09:30 / EUR cut-off" → 09:10 / Swiss bank's early-afternoon
  cut-off; glossary example fixed to "Lea prepares, Daniel releases".
- **Canonical v2.2 sweep.** No "CHF 140m"/leverage/"0.917"/"Helvetic AG" instances existed; `€STR 1.9–2.0%` →
  2.2–2.4% (data/lens.yaml); "bond coupon in week 6" removed. dw-exposure-collection now uses the canonical November
  hedge state and teaches the **Q1 2027 75% = passive over-hedge above the 40–70% band** with the canonical roll
  (≈EUR 3m Q1→Q2 → 68% / 51%) — the "inside 60–90%" error cannot recur in this section.
- **Missing concepts (all six) added:** vendor-security/procurement gate (index.mdx, digital-worker.mdx rule 7,
  candidates.mdx, must_be_true ×4, `why:lens-vendor-access-gate`); system-availability + format-drift failure mode
  incl. the Nov 2026 camt.05x sunset (digital-worker.mdx rule 8, dw-liquidity failure modes, `cite:six-sps-cash-mgmt`);
  liability/commercial model incl. HighRadius outcome-based pricing (candidates.mdx, `why:lens-who-eats-the-error`,
  new source `highradius-obp-2026`); willingness-to-pay bound with arithmetic (candidates.mdx,
  `why:lens-time-price-bound`); evaluation-set ownership (digital-worker.mdx rule 4, `why:lens-eval-set-ownership`);
  sampling when the expert cannot verify (digital-worker.mdx rule 5, `why:compliance-sample-testing`).
- **Minors.** Matrix "Loop" ties acknowledged; a hard assignment (CHF 4m approval dossier) now modelled briefly on
  candidates.mdx; the opening-balance≠prior-close check exercised in the worked morning; automation-bias countermeasure
  shown (edit rate + seeded test item); method.mdx pre-committed falsifiers per class; vendor "what shipped" status
  (SAP beta per Discovery Center, Kyriba Co-Innovation Lab pilots, HighRadius OBP Feb 2026); sources/lens.yaml UNVERIFIED
  (R1) marks on sap-cash-agent / kyriba-tai-2025 / gtreasury-gsmart-2025 wording; the "outside the US… PDFs" claim
  labelled a field note; evaluation-set chicken-and-egg acknowledged in glossary.

### Task B — why pass (content/why/lens.yaml created; 9 notes, all unique `lens-` prefixed ids)
`lens-recommendation-not-instruction`, `lens-dw-owner-split`, `lens-matrix-scoring`, `lens-variance-cutoffs`,
`lens-fee-check-vs-negotiation`, `lens-vendor-access-gate`, `lens-who-eats-the-error`, `lens-time-price-bound`,
`lens-eval-set-ownership`. Linked inline across all four dw pages, method, matrix-adjacent prose, candidates and
digital-worker; existing why notes reused rather than duplicated (`wd5-wd7-hedge-cycle`, `day-china-manual-balance`,
`systems-11-of-12-statements`, `fee-review-annual`, `hedge-bands-graded`, `passive-vs-active-breach`, `buffer-layers`,
`week-four-trough`, `fifteenth-rollover-repayment`, `cut-offs-order-the-day`, `ceo-cosign-threshold`,
`lea-never-releases`, `prepare-decide-split`, `china-cash-excluded`, `compliance-sample-testing`, `kleio-fx-spread-cost`).
**Examples corrected because the derivation failed:** (1) the dw-bank-fee "worked quarter" (its ~CHF 3.5k finding
contradicted the workflow's annual review and omitted the largest cost — replaced by the workflow's own review incl.
the FX-spread derivation); (2) the dw-liquidity "Tuesday" (its CHF 14.2m opening shared with the dated 17 Nov example
but every other account differed — re-derived as the 17 Nov morning itself); (3) the exposure "hedge gap below the
corridor" line (contradicts the canonical passive over-hedge — replaced by the canonical roll arithmetic); (4) the
variance triage cutoff (the "below threshold" rule alone would have buried the CHF 0.18m duplicate — flag rule made
explicit).

### Task C — verification
- `npm run check`: **338 terms, 225 sources, 20 workflows, 94 pages, 26 roles, 158 why notes — 0 errors, 0 warnings.**
- Screenshots (`scripts/shot.mjs --full`, no MISSING refs, no runtime errors): `/lens`, `/lens/matrix`,
  `/lens/digital-worker`, `/lens/dw-liquidity-recommendation`, plus `/lens/method`, `/lens/candidates`,
  `/lens/dw-bank-fee-review`, `/lens/dw-exposure-collection`, `/lens/dw-forecast-variance`. PNG of the dw-liquidity
  page read in full (DigitalWorker layout, worked morning, confusion callout all render).
- Why popover verified by one-off Playwright hover on `why:systems-11-of-12-statements`: popover shows claim, short
  derivation and the "What would make it wrong" line; screenshot at `$TMPDIR/opencode/lens-v2/why-hover.png`.
- Requests for other streams: `docs/notes/lens-requests.md` (Deloitte source-note extension for core.yaml; /start
  85%-vs-74% nearest-quarter hedge ratio).
- Unresolved: all scores remain untested synthesis; the `highradius-obp-2026` gain-share percentage is undisclosed in
  the vendor release; the four dw models remain illustrative synthesis, not product descriptions.
