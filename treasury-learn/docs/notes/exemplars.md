# Exemplar stream — revision notes (round-2 fix pass, completed 2026-10-01)

Owner files: `content/pages/start/{index,neighbours,growth}.mdx`, `content/workflows/{daily-cash-positioning,cash-forecasting}.yaml`,
`content/glossary/core.yaml`, `content/sources/core.yaml`, `content/why/core.yaml`.
Reviews: `docs/reviews/exemplars-r1.md`, `docs/reviews/exemplars-r2.md`. Canonical: `docs/AUTHORING.md` v2 / v2.1 / v2.2.
Cross-file requests: `docs/notes/exemplars-requests.md`.

> Provenance: an earlier revision run crashed mid-edit. This pass re-verified every landed derivation on paper
> (all check out — see "Arithmetic verified" below) and completed the remaining r2 findings, chiefly the v2.2
> hedge-state corrections that the crashed run had left wrong.

## Task A — review findings fixed

**R2 Critical 1 — covenant on the canonical baseline.** `glossary/core.yaml:366` derives 1.36x from the canonical
bridge (30 Sep 2026: RCF drawn CHF 35m + EUR 27m ≈ CHF 60.2m + CHF 100m bond − ≈ CHF 54m group cash = CHF 106m net
debt ÷ LTM EBITDA CHF 78m = 1.359), states leases are excluded from the covenant's net-debt definition (Swiss GAAP
FER; the facility excludes IFRS 16 liabilities if the group ever moves), notes covenant-EBITDA add-backs, and
re-derives the headroom line (EBITDA must fall to 106/3.25 ≈ CHF 33m — the old "half, to CHF 44m" did not survive
the canonical numbers). Matches `pages/companies/helvetic.mdx` exactly. Why-note `covenant-baseline` carries the
bridge and the "what would make it wrong" cases (leases-in ⇒ 1.68x; wrong cash date ⇒ 1.53x).

**R2 Critical 2 — cash continuity.** The 13-week strip opens at **CHF 41.3m**: the positioning example's CHF 41m
group total (Mon 16 Nov close; the day's own receipts netted the two surprise debits to ≈ 0) plus the week's net
**+0.3m**, re-derivable from the variance table (10.7 − 7.3 − 2.8 − 0.3). Every week of the strip now shows its own
in/out flows and every close re-derives: 41.3 → wk4 **18.0** (canonical low point) → Q4 close **≈ 25m** → wk13
**50.0**. One monotone trajectory across day pages (45.6/44.2m late Oct) → /start (41m, 17 Nov) → the strip.
Why-note `strip-opens-41`; `liquidity-planning`/`covenant-monitoring` (other streams) still carry the old 35m —
requests filed.

**v2.2 hedge state (fixed this pass — the crashed run had left "85%" and "drifts back into band").**
- `/start` 09:30 (`index.mdx:69`): Q4 2026 = 25/34 ≈ **74%** (in band 60–90%, on the 75% target), Q1 2027 = 30/40 =
  **75%**, stated as *above* the 40–70% band — a passive over-hedge — with the resolution: roll ≈ EUR 3m of Q1
  forwards to Q2 at the next hedge run (→ 68% / ≈ 51%). "No new hedges today" survives only as "no new *buying*".
- `cash-forecasting.yaml:218`: same story executed in the forecast week — Q1 27/40 = 68%, Q2 15/29 ≈ 51%, both in
  band, reported to the CFO as a passive correction. The old "the ratio drifts back into band as the exposure lands"
  (i.e. doing nothing) is gone; the "EUR 30m over 13 weeks" figure that could not be tied to the exposure report was
  replaced by the derivable "January–February weeks + FP&A's rest-of-Q1 = EUR 40m".
- `glossary/core.yaml` `hedge-ratio` example rebuilt on the v2.2 exposure report (34/25 = 74% and 40/30 = 75% +
  the roll) instead of the invented 50/38/76%.

**€STR and mechanical sweep.** "1.9–2.0%" → 2.2–2.4% everywhere; `forward` re-derived (90d: 0.9400/(1+2.3%×¼) ≈
0.9346, CHF 1.869m; 12m at spot 0.935 ≈ 0.913–0.915, now backed by why-note `forward-points-12m`). Verified absent in
my files: "CHF 140m undrawn" (now ≈ CHF 137m everywhere), leverage 1.6/1.7/1.8/2.4x, "week 6", "0.917", "Helvetic
AG", "CNY 60m", "28 ERPs", "fortnightly".

**R2 minor cluster.** HM Deutschland 1.5/1.6m: `available-balance` re-derives on the same night (booked 1.7 =
expected 1.8 − 0.3 trade-tax debit + 0.2 credit valued tomorrow; value-dated **1.5** = the positioning opening;
available 1.45 after EUR 50k card holds) — both examples now share one night and one arithmetic. "December payrolls
four weeks later" → "in the week of 14 December" (`index.mdx:68`). "Helvetic AG" → "Helvetic Machines AG" (none
remain). CNY ≈ 55m canonical. Payment factory: "SAP S/4HANA — the group's ERP core — and local ERPs inherited from
acquisitions" (`glossary/core.yaml:446`), companies.yaml request filed.

**Unverified statistics (v2.1 phrasing).** AFP 2026 "49%", Deloitte "22%", ST/TIS "68%" appear only as "about half /
about a fifth / roughly two-thirds" or with the explicit "(as reported by X — figure not confirmed against the
primary text)" label: `index.mdx:111`, `daily-cash-positioning.yaml` evidence note, `cash-forecasting.yaml` evidence
note, and the three source notes in `sources/core.yaml`.

**Cross-review items (my files).** `hedge-ratio` graded bands (60–90 / 40–70 / 25–55 / 0–40, only Q+1 gets 60–90)
✓; `bank-statement` 11-of-12 + Wei's emailed export, connectivity not time zones ✓; `variance-analysis` 2.1
timing / 0.7 permanent matches the workflow table ✓; `natural-hedge` (EUR 38m ≈ CHF 36m, EUR 12m offset, EUR 26m
net) and `fx-exposure` (EUR 19m/6m/13m, CHF 0.6m = 13 × 0.94 × 5%) re-checked ✓; `interest-rate-swap` "low, well
under 1%, illustrative" + the revolving-drawing awkwardness ✓; `api-banking` (global-bank API + SIX bLink) ✓;
`liquidity` names both headroom formulas ✓; `mt940` aka [MT 940] ✓; `swap` aka drops "currency swap" ✓;
`money-market-fund` CHF ≈ 0% + Kleio's no-CHF-fund policy ✓; `value-date` SIC example ✓; `dso` used in
cash-forecasting step 5 ✓. Also fixed per r2 "Unrealistic": index rollover wording ("cannot be prepaid mid-period
without break costs"), camt.054 trail (identical end-to-end/invoice refs + the payment tool's file reference),
deputy/authorisation gap in the people list (now "prepares but never releases" per canonical v2.2 four-eyes
wording), booking-vs-value-vs-due-date convention in `short-term-forecast`, the "versus last week's version" delta
line on the strip, and the forward pointer from the duplicate payment to next week's variance table.

**Fixed this pass (failed on paper).**
1. `index.mdx:69` "the nearest quarter is about 85% hedged" — contradicts v2.2 (25/34 = 74%). Corrected, and the
   Q1 sentence rewritten from "a shade above… No trade today" to the passive-over-hedge + roll resolution.
2. `cash-forecasting.yaml:218` "the ratio drifts back into band as the exposure lands" — v2.2 mandates the roll;
   corrected with the 27/40 and 15/29 outcomes.
3. `glossary/core.yaml` `hedge-ratio` example (50m/38m/76% invented numbers) — rebuilt on the v2.2 report.
4. `glossary/core.yaml` `liquidity-headroom` example used "CHF 3m operating float" for Alpine against Alpine's
   canonical CHF 5.5m operating minimum (alpine.mdx) — re-derived: (7 − 5.5) + 9 = CHF 10.5m.
5. `thirteen-weeks` why-note claimed all four German trade-tax prepayments fall in any 13-week window — quarterly
   dates rotate (one per window). Rewritten.
6. `strip-opens-41` called the German trade-tax debit "CHF 0.3m" — it is EUR 0.3m (≈ CHF 0.28m). Unit fixed.
7. `buffer-layers` claim said "two different buffers" over a three-layer detail. Reworded.
8. `alpine-credit-line` headroom sentence: week-9 headroom is CHF 5.5m (5.5 undrawn + 0 above minimum), *at* the
   5.5 line of the derivation — reworded to "just above the board's CHF 5m floor" to match alpine.mdx's arithmetic.
9. Italy bias counts reconciled with the companies page: "8 of the last 10 weeks at the 4-week lag (9 of the last 12
   counting every week)".

## Task B — why pass

Every derivation in `content/why/core.yaml` re-checked on paper. Verified: covenant bridge (60.2 + 100 − 54 = 106;
106/78 = 1.36; 106/3.25 = 33; lease case 1.68; wrong-date case 1.53); the 13-week strip (all 13 closes re-derive;
week-4: 8.5 − 30.8 = −22.3 and 41.3 − 23.3 = 18.0); strip-opens-41 (10.7 − 7.3 − 2.8 − 0.3 = 0.3 → 41.3);
alpine line sizing (3.5 + 5.5 + 1.5 + 1.5 = 12); thursday-value-date (T+2; CHF 941,200); morning-sequence,
q4-collections, italy-haircut logic. Failures fixed: the six listed under "Fixed this pass" items 5–8.

**Why-notes added this pass (7 new ids, all linked inline):** `prepares-never-releases` (why Lea prepares / Daniel
releases; ≤ CHF 2m four-eyes in treasury, > CHF 2m CFO + CEO; preparer varies by work type, release never does),
`passive-over-hedge` (the v2.2 roll arithmetic and why it is labelled passive), `forward-points-12m` (0.935 ÷
1.022–1.024 ≈ 0.913–0.915), `supplier-run-rate` (570 − 190 = 380 ÷ 52 ≈ 7.3m/wk), `weekly-cadence` (Monday
variance-first, Tuesday-noon deadline, Wednesday review), `payroll-by-country` (≈ CHF 15m/month split across
country pay dates; 181 + 13ths ≈ 190m/yr ≈ 73k/head), `group-total-41m` (12 accounts → ≈ CHF 40.9m; the total is a
conversion artefact). File total: **17 notes**, all ids unique across `content/why/` (158 globally, 0 clashes —
`npm run check`). Candidates that already existed and are linked, not duplicated: `thirteen-weeks`,
`week-four-trough`, `buffer-layers`, `italy-haircut`, `alpine-credit-line`, and (other streams') 
`fifteenth-rollover-repayment` / `repay-rcf-not-chf-deposit` for "surplus CHF reduces the RCF at the 15th".

## Task C — verification

- `npm run check`: **0 errors, 0 warnings** (338 terms, 225 sources, 20 workflows, 94 pages, 158 why notes).
- Screenshots `--full`: `/start`, `/start/neighbours`, `/start/growth`, `/workflows/daily-cash-positioning`,
  `/workflows/cash-forecasting` — no MISSING refs, no runtime errors; the positioning PNG read (12-row table and
  all why links render).
- Why popover: one-off Playwright hover on `passive-over-hedge` (scripts/tmp-hover-exemplars.mjs) — popover renders
  claim + short + detail + "What would make it wrong" block; screenshot read. `.why-missing` count on the page: 0.

## Unresolved / anomalies

- AFP 2026 49% / Deloitte 22% / ST/TIS 68% remain unconfirmed against primary text (r2 could not open the reports).
  Handled per v2.1 phrasing; someone with report access should confirm or drop the figures.
- `zkb-iso20022-factsheet` URL unopenable from this environment; kept with the "per bank communications" labelling
  (matches AUTHORING v2).
- Cross-stream Alpine conflicts found and requested (not mine to edit): `glossary/map.yaml:882` week-9 cash 1.8m /
  7m-undrawn vs `companies/alpine.mdx` week-9 cash 5.0m / 6.5m drawn; "CHF 2m acceptance payment" in
  `companies/alpine.mdx:68` and `glossary/companies-size.yaml:55` vs canonical "a 20% acceptance ≈ CHF 0.7–0.8m".
- `neighbours.mdx` says German payroll goes out "on the 28th" in its Q3 narrative while the strip pins the 27th;
  month-end pay dates float with the last banking day (day pages: "value Friday 30 October"), so both are
  defensible — left as is deliberately.
