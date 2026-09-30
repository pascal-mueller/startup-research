# Stream wf-events — Events & crises workflows

## Files created
- content/workflows/acquisition-integration.yaml (order 1) — 11 steps, due diligence → funds flow → Day 1 → 100 days; worked example: Helvetic buys fictional Norvia Spindle Systems GmbH (EUR 120m EV, funds-flow table, pro forma covenant 2.5x vs 3.25x).
- content/workflows/currency-shock.yaml (order 2) — 10 steps, hour-by-hour day 0 then days/weeks; worked example: Helvetic, EUR/CHF 0.935 → 0.860 (hedge MTM, unhedged, balance sheet, translation separated; covenant 1.5x → ~1.7x).
- content/workflows/liquidity-crisis.yaml (order 3) — 10 steps incl. a bank-failure branch (SVB/Credit Suisse); worked example: Alpine, Oct 2026, 13-week table (original / expected / stress / stress + levers).
- content/glossary/wf-events.yaml — 10 terms: change-of-control, transition-services-agreement, funds-flow-memo, locked-box, credit-support-annex, margin-call, thirteen-week-cash-flow, material-adverse-change, short-time-work, deposit-insurance.
  (budget-rate, covenant-waiver, cross-default were removed because wf-risk defined the same ids at the same time; my workflows link to theirs.)
- content/sources/wf-events.yaml — 12 sources (SNB 2015 press release, Tecan/Clariant/Burckhardt/Tornos reports, Swissmem, Jones Day on EMIR margin, Roku 8-K, US joint statement 12 Mar 2023, Credit Suisse 1Q23, FINMA 19 Mar 2023, NeuGroup post-SVB survey).
- content/compare/wf-events.yaml — topics events-currency-shock, events-missing-receivables, events-acquisition.

## Research constraints (important for the reviewer)
- WebFetch was blocked by the egress proxy for every domain tried (snb.ch, bis.org, sec.gov-adjacent news, wikipedia, financialprofessionals.org, neugroup, icdportal); curl likewise (403).
- The session-wide WebSearch budget ran out part-way (200 calls, shared across streams). Everything cited was verified from search snippets served from the original publisher's domain.
- **Not verified / no source:** Big-4, bank or AFP post-merger treasury integration guides could not be searched or opened. acquisition-integration.yaml therefore cites only a vendor KYC survey and its evidence_note says so explicitly. This is the weakest part of the stream; a reviewer with web access should add 1–2 integration guides.
- Swissmem 2015 figures (price cuts by >3/4 of members, 18% relocation plans) came from a search summary of the Swissmem page; a second targeted search did not reproduce them → labelled "indicative" in the source note.
- Tornos "up to 43 hours from 1 March 2015" and Burckhardt "order intake –7.9%" verified from snippets only (noted in source entries).
- NeuGroup 73% / 40% / 30% figures (seen in a secondary summary) were NOT used; only 81% / 69% / "deposit diversification most common" which appeared on neugroup.com.
- Art. 725 CO (board duty to monitor solvency since the 2023 company-law revision) is stated from knowledge, uncited; flagged in evidence_note for checking.
- US Chapter 11 priority for recently delivered goods is described only generically ("check priority or reclamation rights").

## Consistency choices
- Helvetic: no cash pool (manual concentration by intercompany loan); Lea prepares, Daniel decides; net debt ≈ CHF 115m (CHF 100m bond + CHF 60m RCF − ~CHF 45m cash), LTM EBITDA CHF 78m (illustrative, my assumption — not in companies.yaml). If another stream fixes a different Helvetic EBITDA/net debt, these examples should be aligned.
- Alpine: payroll ≈ CHF 2.4m/month for ~320 staff; 13th salary paid in December; committed line CHF 12m with CHF 3m drawn at start; minimum cash CHF 1.5m (my assumption). "Minimum equity ratio clause" in Alpine's credit agreement is labelled illustrative.
- GlobalChem: CSAs with two banks (threshold EUR 25m) labelled illustrative — not in companies.yaml.

## Requests for other authors
- wf-risk / fx-hedging: consider linking to [](wf:currency-shock) from fx-hedging and fx-exposure-management.
- Debt streams (credit-facility-management, covenant-monitoring): link to [](wf:liquidity-crisis) and [](wf:acquisition-integration); the change-of-control and material-adverse-change terms are in content/glossary/wf-events.yaml.
- Owner of content/data/days.yaml: the file had a YAML error (line ~580) that broke the whole dev server during my screenshot run.
