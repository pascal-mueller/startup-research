# Notes — stream wf-control (revision pass after wf-control-r1)

## Files changed in this pass
- content/workflows/month-end-reporting.yaml
- content/workflows/fraud-investigation.yaml
- content/workflows/policy-compliance.yaml
- content/glossary/wf-control.yaml
- content/sources/wf-control.yaml
- content/why/wf-control.yaml (new, 13 why-notes)

## Task A — review findings fixed
1. **Framework gap (major 1) — FIXED.** `month-end-reporting.yaml` step 5 now names the split explicitly: Helvetic =
   Swiss GAAP FER (FER 27 "Derivative financial instruments"; hedge ratios are management practice; no formal
   hedge-documentation or effectiveness testing), GlobalChem = IFRS 9/16 (designation documentation, ongoing
   effectiveness assessment — the sentence now says "effectiveness data" is IFRS vocabulary, no IAS 39 80–125%
   bright line) + IFRS 7 data. Same split in the worked example (WD2 paragraph), `by_size.multinational` and
   `companies.globalchem`. Verified against fer.ch FER 27 summary + PwC's 2025 FER guide (both registered as
   sources: `fer-27-derivatives`, `pwc-fer-financial-instruments-2025`) — FER 27 allows a hedge valuation choice
   but "there is no formal documentation requirement of the hedge relationship and no requirement for testing
   effectiveness" (PwC), so the review's safe-claim instruction is now a verified claim.
2. **"Q3 VAT payment" in September (major 2) — FIXED.** Table comment + WD5 answer re-derived from the VAT calendar:
   the September driver is the **HM Deutschland August VAT prepayment (due 10 Sep** — German monthly filings pay on
   the 10th of the following month) **plus seasonal working capital** (quarter-end supplier runs, Italian receipts
   late — ties to the −CHF 5.7m receipts miss already in the example). Swiss Q3 VAT ≈ 0.8m stays in Nov (30 Nov,
   cash-forecasting wk 2); Swiss Q2 left end-August (before the table starts); German Q3 prepayment 10 Oct. Explained
   in why-note `september-vat-driver`.
3. **Canonical bank drift (major 3) — FIXED.** "the Italian bank's fraud desk" / "Via the Italian bank" →
   **the German bank's fraud desk**, with one clause establishing HM Italia's accounts sit with the group's German
   bank (continental European entities). "the French bank's mandate" → **the German bank's mandate** for HM France's
   EUR account.
4. **Mis-cited spreadsheets sentence (major 4) — FIXED.** Deleted the Deloitte/PwC "persistence of spreadsheets"
   claim. Replaced with the verified Deloitte figure (22% say cash-positioning maturity requires development —
   verified in Deloitte's own 2024 survey PDF) and a PwC claim its source actually supports (cash/liquidity top
   priority; large groups invest in in-house banks, payment factories, POBO).
5. **Concreteness nits — FIXED.** "CNY 7.9" → "CNY 55m (CHF 6.1m equivalent)" (canonical 55m; labels currencies in
   the mixed table); headroom re-derived (31 Aug 185.1, 30 Sep 177.9 = 47.9 + 140.0 − 10.0) and mirrored in
   policy-compliance + glossary `treasury-report`. Hedge MTM now ties: +CHF 0.9m "per bank valuations off the forward
   curve" with the arithmetic (4m EUR/CHF forward ≈ 0.928 at €STR 2.2–2.4% vs SARON 0%; (0.9390 − 0.928) × 58 ≈ +0.6m)
   and the naive spot-only +0.23m shown and explained (why-note `hedge-mtm-forward-curve`). Policy cure path
   re-derived: Q4 2026 exposure EUR 24m; 55% (13.2) on 31 Aug → +3m on 4 Sep (67%) → +3m on 18 Sep → **80% (19.2) on
   30 Sep**; rows now chronological.
6. **Canonical sweep — FIXED.** Covenant ratios: Group Accounting (Claudia's team) computes LTM ratios, Lea supplies
   the net-debt schedule, Daniel presents to banks, FP&A supplies forecast EBITDA only (was "78.0 from FP&A" — now
   "from group accounting"; people/data/handoffs updated). "Daniel moves EUR 2m" → "releases an EUR 2m transfer
   (prepared by Lea)". RCF reduction proposal aligned to the canonical November state (CHF 5m, 35→30, not 8m).
   Signing tiers in the policy example = canonical (≤ CHF 2m: Lea prepares / Daniel releases; > CHF 2m: Thomas +
   CEO; non-routine > CHF 10m: board). Alpine: "dual approval for bank-detail changes (and collective signature for
   payments)" (was mixed up).

## Other review points handled
- Missing concepts added: multilateral netting (GlobalChem: Marta runs the monthly cycle before the close,
  mismatches chased by WD1) in `companies.globalchem` + `by_size.multinational`; CSA/margin data row (multinational);
  payroll diversion + receivables diversion in "Scope the damage"; instant-rail window (summary + step 3: minutes
  on SCT Inst, prevention is the only control); paying-bank liability in the legal role; interest-rate-risk limits
  (gap/DV01, benchmark/tenor caps) in policy contents + data.
- Unrealistic passages fixed: day-11 recall labelled a formality at 10:25 with the operative routes named; close week
  vs weekly forecast cycle clash (Lea pushes consolidation to Wed–Thu) in the example.
- Vague passages fixed: fraud frequency labelled a field observation with a range ("one in a decade to about one a
  year"); mandate management ownership named (bank account management team inside treasury operations, Marta's area).
- Citations tightened: "recovered **more than** 75%" cited to `afp-pfc-2026-highlights` (new source, Truist-hosted
  report highlights — the recovery figures live in the report, not the press release); `nacha-ic3-2024` now used
  (IC3 2024: BEC ≈ USD 2.8bn, second-costliest); Swiss schemes (SIC/euroSIC) recall procedures added to step 3;
  Art. 728a(1)(3) verb corrected to "examines whether an ICS exists" in the workflow, the glossary and the source note.
- Better-example items: intercompany-interest schedule row behind the 2.10%/2.35% mismatch (EUR 8m principal,
  EUR 15.7k vs 14.0k monthly accrual); auditor's year-end version (bank confirmations to the same balances, sampled
  derivative confirmations — explicitly linked to policy-compliance's "2 of 41"); signatory-review worksheet
  (4 lists + reconciling rows) shown in policy-compliance; Kleio counterfactual cost.
- Cross-module hedge continuity parenthetical added (Nov: Q1 2027 EUR 30m forwards vs EUR 40m exposure, 75% =
  ~EUR 6m of new Oct–Nov hedges over the 30 Sep 61%).

## Task B — why-notes added (content/why/wf-control.yaml, 13)
`four-eyes-threshold`, `lea-never-releases`, `callback-independent-number`, `pack-wd2-report-wd5`,
`corporate-fraud-loss-allocation`, `compliance-sample-testing`, `hedge-mtm-forward-curve`, `september-vat-driver`,
`china-cash-excluded`, `recall-window`, `hedge-bands-graded`, `passive-vs-active-breach`, `fer-vs-ifrs-pack`
— all linked inline in the three workflows.

### Examples corrected because the why derivation failed
1. **Kleio "CHF 48k is five days of burn"** (review's suggested counterfactual) — fails: companies.yaml has net burn
   CHF 0.9m/month ≈ CHF 30k/day, so CHF 48k ≈ **1.6 days / ~5% of one month's burn**. Written at the derived figure.
2. **Policy cure path** 55% + EUR 3m ≠ 80% — re-derived to two top-ups against a stated EUR 24m Q4 exposure (above).
3. **Hedge MTM** EUR +0.6m vs naive +0.23m — the example failed a naive check; kept the figure but the derivation
   (forward curve) is now shown in the text.
4. **"Q3 VAT payment" in September** — failed against the VAT calendar; re-derived (above).
5. **Headroom 176.1/183.3** with "CNY 7.9" — the row mixed currencies and the CNY figure conflicted with the
   canonical 55m; re-derived to 177.9/185.1.

## Verification
- `npm run check`: 0 errors, 0 warnings from my files (filter run per file). Repo-wide there were transient errors
  from other streams' in-flight why files, all resolved; the one remaining repo-wide error at the time of writing is
  a **duplicate why id `forward-points-below-spot` in content/why/wf-risk.yaml and content/why/map.yaml** — not my
  files (see requests). It crashes the app's search index (MiniSearch duplicate id) until one side renames.
- Screenshots (`scripts/shot.mjs --full`, 1440px) of /workflows/month-end-reporting, /workflows/fraud-investigation,
  /workflows/policy-compliance at $TMPDIR/wf-control-v2: no MISSING refs, no runtime errors; month-end PNG read —
  steps, tables, worked example and why-chips render.
- Why-popover hover test: run via a one-off playwright snippet; result recorded in the report. (If the app is blank,
  the cause is the wf-risk/map duplicate id above, not my content.)

## Unresolved uncertainties
- The German August VAT prepayment is stated as a "low-single-digit-million" item rather than a precise figure
  (HM Deutschland's monthly net VAT is not in companies.yaml; the CHF 7.2m drop's split is not printed).
- The EUR 24m Q4-2026 exposure (policy example) is new illustrative detail; it ties to month-end's 80% and does not
  contradict cash-forecasting's Q1 2027 EUR 40m/30m/75%.
- bacs-ceo-fraud-2026 is registered (wf-pay) as a Netzwoche item about BACS; substance verified, but the BACS page
  itself would be the better primary (request below).
- Fraud-reimbursement legal points are UK/US-grounded and labelled jurisdiction-dependent; Swiss law has no
  mandatory APP reimbursement regime (stated only via the why-note's check line).

## Requests for other authors
- **wf-risk + map**: `forward-points-below-spot` is defined in BOTH `content/why/wf-risk.yaml` and
  `content/why/map.yaml` — duplicate id crashes the app (MiniSearch) and fails `npm run check`. One of you must
  rename (per parallel-work rules the later writer renames and links to the other). Blocks all screenshots.
- **wf-pay**: please point `bacs-ceo-fraud-2026` at the BACS primary page (bacs.admin.ch year-end publication) —
  the Netzwoche item is secondary (reviewer request).
- **day (data/days.yaml)**: `days.yaml` still says the forecast's "week-6 low point (December bond coupon plus Q3
  VAT)" (lines ~461/569) — canonical v2 says the low point is **week 4** (December payrolls incl. 13th salary) and
  the bond coupon is a separate, later event. Please align.
- **wf-risk / wf-debt**: month-end September figures changed slightly in this pass: liquidity headroom now
  **CHF 177.9m** (30 Sep) / 185.1 (31 Aug) — the China balance is canonical CNY 55m ≈ CHF 6.1m, not CHF 7.9m;
  everything else unchanged (cash 54.0/61.2, net debt 106.0/98.8, LTM EBITDA 78.0 from group accounting, RCF 60.0
  drawn/140.0 undrawn, hedge book EUR 58m of EUR 118m). The RCF reduction proposed at the 15 Oct rollover is now
  CHF 5m (→ CHF 30m) to match the canonical November state (CHF 30m + EUR 35m).
- **Exemplar/gold streams**: the month-end example states Q4 2026 EUR exposure EUR 24m (hedged 55% → 80%); Q1 2027
  remains EUR 40m vs EUR 30m forwards per cash-forecasting. If you print quarterly EUR exposures, 24/40 are taken.
