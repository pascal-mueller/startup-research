# Editorial review log

Process: author writes v1 → independent reviewer (fresh context) scores 1–10 on accuracy, workflow realism, pedagogy,
concreteness, source quality → author investigates and revises → re-review; stop at all scores ≥ 8 with no critical
issues, or after 4 rounds. Org/roles modules use TREASURY_ORG_REVIEWER (role accuracy, org realism, ownership accuracy,
size nuance, discovery usefulness). Individual reviews are in `docs/reviews/`.

| Module | Round | Scores (acc / realism / pedagogy / concrete / sources) | Verdict | Notes |
|---|---|---|---|---|
| Start Here | 1 | 7 / 7 / 8 / 8 / 5 | REVISE | Cross-page fact inconsistencies; controlling gap; source primacy. Stats unverifiable (egress blocked). |
| Daily cash positioning | 1 | 7 / 7 / 8 / 9 / 5 | REVISE | Time-zone logic reversed; CHF deposits at 0% with RCF drawn; placeholder glossary ids. |
| Cash forecasting | 1 | 7 / 8 / 8 / 8 / 6 | REVISE | Consistency with companies.yaml; accuracy measurement; FX currency view. |
| Glossary/sources (core) | 1 | 7 / – / 8 / 8 / 4 | REVISE | Helvetic pool contradiction; missing terms; second-hand sources. |
| Interview Prep | 1 | 7 / 8 / 8 / 9 / 9 | REVISE | Week-rhythm contradiction in flagship example; MT940 vs camt.053; sensitivity rules self-contradictory; internal drafting language; absolute about mid-market org. |
| Systems & Data | 1 | 7 / 9 / 9 / 8 / 7 | REVISE | Deloitte mis-citation ×3; Swift CSP rationale backwards; MT940/942 scope (deprecated not withdrawn, coexistence to Nov 2028); missing gpi/instant-payments/SIX bLink; statement-count and Alpine balance inconsistencies. |
| FX/risk & debt/funding workflows | 1 | 8 / 9 / 9 / 9 / 8 | REVISE | RCF rollover (15 Oct) contradicts Nov exemplar scenarios; `layered-hedging` band contradicts canonical bands; covenant pro-forma arithmetic mislabelled; Q1-2027 band convention unexplained; ACT 76% unverified, MillTech figures need updating. All worked-example arithmetic checks. |
| Company Scenarios & Treasury by Size | 1 | 6 / 8 / 8 / 8 / 7 | REVISE | Helvetic financials contradict canonical (85/119/1.4x vs 78/106/1.36x); RCF maturity "2027" vs Oct 2028; AFP 46% stat denied by own source registry; Lea's payment authority contradicts itself ×4; German payroll mislabelled weekly; hedge band shown ungraded. PwC/AFP/SECO/Deloitte/EACT stats verified. |
| Payments & banking workflows | 1 | 8 / 9 / 8 / 9 / 8 | REVISE (narrow) | camt.054 example wrong statement model; pain.001 example contradicts workflow + Alpine (3 versions); CHF 2m one-week deposit violates 0%-CHF canonical rule; Swift SR2026 deferral + EPC VoP liability misstated; direct debits (LSV+/SDD) and eBill missing from Swiss payments set. All stats verified but 2. |
| Agentic Treasury lens | 1 | 8 / 7 / 9 / 8 / 9 | REVISE | Digital-worker models contradict reference workflows (Chinese balance via email not connectivity; bank-fee review vs Lea's annual review, FX-spread item omitted; exposure-collection timeline/staffing); AFP source mis-cited ×3; numeric/label drift (criterion count, CHF minimum, fee magnitudes). All external stats verified. |
| Treasury Map | 1 | 7 / 9 / 9 / 8 / 8 | REVISE | Hedge bands wrong ("30–60% for Q2–4" — makes the Q4 hedge call wrong); second Helvetic balance sheet (85/88m, 144m incl. leases, 1.6x vs canonical 78/106/1.36x, FER); RCF facts wrong (2027 vs Oct 2028, bank split, margin); CFO co-sign CHF 1m vs >CHF 2m; IFRS 9 vs FER; 13-week low point week 6 vs workflow's week 4. |
| Org & Roles | 1 | 9 / 9 / 7 / 9 / 9 (role/realism/**ownership**/size/interview) | REVISE | C1 forecast cadence two ways (fortnightly vs canonical weekly Tue/Wed); C2 >CHF 2m signing rule in 4 incompatible versions; C3 covenant calculation ownership split three ways; C4 Alpine has 2 or 3 banking relationships; secondary: hedge WD5 vs WD7, graded vs flat bands, matrix double-count. |
| Competitor Landscape | 1 | 6 / 7 / 8 / 6 / 6 | REVISE | Cashforce credited to Nomentia (actually TIS, 2022); AFP 46% stat re-used despite own registry saying unverified; Kantox is BNP Paribas-owned (framing issue); Deloitte spreadsheet claim ×3; Palm/Nilus wrongly "unconfirmable" (live vendors, funded); Agicap round date; Fides now UBS. Four-systems-types model and verification badges worth keeping. |
| Events & crises workflows | 1 | 7 / 8 / 8 / 8 / 7 | REVISE | currency-shock uses stale net debt (115m/1.5x vs canonical 106m/1.36x); "RCF and bond in CHF" false vs EUR 27m drawing; CHF surcharge misdirects the pricing response (exposed flow is EUR revenue); Burckhardt 7.9% is the segment not group + wrong cause attribution; Swissmem 51%/69% not "three-quarters". Art. 725 CO flag resolved correct. |
| Controls & reporting workflows | 1 | 8 / 9 / 8 / 8 / 7 | REVISE | FER vs IFRS framework never named (IFRS vocabulary for FER filer); "Q3 VAT in September" contradicts VAT calendar; Italian/French banks not in canonical 5-bank list; Deloitte/PwC spreadsheet phrase re-used after withdrawal; CNY in CHF table; hedge MTM untied; policy cure-path arithmetic. All fraud stats verified. |
| Cash & liquidity workflows | 1 | 7 / 8 / 8 / 6 / 8 | REVISE | Dec-2026 cash contradicts gold forecast (59.5m vs ~25m, opposite Q4 shape); RCF reconciliation failure (repayments ignored in undrawn/leverage); China dividend WHT 10% vs DTA 5%; implied EBITDA 70 / net debt 115 vs canonical 78/106; hidden-profit-distribution direction reversed. In-example arithmetic recomputes. |
| Day in the Life | 1 | 7 / 8 / 8 / 7 / 8 | REVISE | Covenant row breaks canon (70m/1.7x vs 78m/106m/1.36x); "same Tuesday as /start" false (27 Oct vs 17 Nov); RCF tranche maturing "Friday" vs rolls-on-the-15th + drawn mix flattened; China statement via bank relay vs Wei's emailed export; Lea's cadence self-contradicts. Cut-off stats verified. |
| Exemplars (start, positioning, forecasting, core) | 2 | 8 / 9 / 9 / 9 / 8 | REVISE (near-pass) | R1: 56/63 fixed, 5 partial, 2 not. Blocking: glossary `covenant` rebuilt on wrong baseline (88m/144m/1.6x incl. leases vs canon 78m/106m/1.36x, leases excluded); positioning↔forecasting cash continuity off ~5–6m. €STR 1.9–2.0% vs ECB 2.19–2.44%; 3 stats unverified (AFP 49%, Deloitte 22%, ST/TIS 68%); minor drifts. |

## Revision wave (after round 1) — status
Standard: fix all r1 findings against canonical facts v2/v2.1/v2.2 → derive every example's "why" on paper (derivation
fails ⇒ the example is wrong and is corrected) → add hoverable why-notes → verify (check 0/0, screenshots, popover
hover) → round 2.

| Stream | Revision | Examples fixed because the why failed | Why notes | Round 2 |
|---|---|---|---|---|
| Controls & reporting workflows | DONE | 5 (Kleio burn 48k=1.6d not 5d; cure path; hedge MTM curve; Sept VAT driver; CNY headroom) | 13 | running |
| FX/risk & debt workflows | DONE | 3 (forward quotes at €STR 2.2–2.4; Dec net-debt 137m/1.80x; option direction EUR put) | 10 | running |
| Cash & liquidity workflows | DONE (visual check folded into round 2 — blocked by days.yaml mid-edit) | review fixes incl. Dec cash shape aligned to gold, RCF schedule re-derived, China WHT 5% | 11 | queued |
| Day in the Life | DONE | 7 (Duisburg 20% acceptance EUR 1.9m→0.7m of a EUR 3.5m contract; Q1 72% was above the 40–70% band; spare 1.5→0.9m; CHF 200k=1 month US payroll not 2; 4 hires≈6 weeks runway not 2 months; payroll-dip causality; gap causality) | 11 | queued |
| Agentic Treasury lens | DONE | 4 (bank-fee "quarterly/CHF 3.5k" replaced by the workflow's annual review + CHF 40k FX-spread; undated Tuesday re-derived as 17 Nov matching /start; "below corridor" replaced with canonical passive-over-hedge roll; variance triage rule made explicit) | 9 | queued |
| Exemplars (start, positioning, forecasting, core) | DONE | 7 (covenant headroom 44m→33m; 13-week opening 35m→41.3m + strip rebuilt; hedge example 50/38/76%→canonical 34/25 & 40/30 + roll; liquidity-headroom 13m→10.5m; "four German prepayments per 13 weeks"→one per quarter; trade-tax 0.3m CHF→EUR; own-note arithmetic self-corrected 210–225→200–220 pts) | 17 | queued |
| All other streams | in progress | — | — | queued |
