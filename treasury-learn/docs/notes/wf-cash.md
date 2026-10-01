# Notes — stream wf-cash (revision round 1 → r2)

Owner: author for `liquidity-planning`, `surplus-cash-investment`, `funding-subsidiary`, `glossary/wf-cash`,
`sources/wf-cash`, `why/wf-cash`. Review file: `docs/reviews/wf-cash-r1.md`.

## What changed in this revision (Task A — review fixes)

### Critical 1 — December 2026 cash contradicted the gold standard (CHF 59.5m vs ≈ CHF 25m)
- `content/workflows/liquidity-planning.yaml` (example): the base case is rebuilt onto `cash-forecasting.yaml`'s
  trajectory. Q4 2026 now closes at **CHF 25.6m** (the exemplar's week-6 close), December is a quiet receipts month with
  the intra-quarter trough CHF 18m on 18 Dec (≈ CHF 12m usable), and the Q4 collections land Jan–Feb. Q1 2027 now
  **rises** (OCF +28.1) instead of draining; the closing cash line ties to the forecast (52.6 on 19 Feb before
  financing flows; ≈ 28m after the repayments; 21.0 at 31 Mar after the 1 March coupon and March capex).
- `content/workflows/surplus-cash-investment.yaml` (example): the "year-end collections lifted cash to 59.5m" premise is
  gone. The example is now dated mid-December 2026 and its premise is the forecast itself: no December surplus (the
  18 Dec trough), decisions made for the January–February collections. Pots table + a counterparty-limit table whose
  rows tie to the 11 Dec group cash of ≈ CHF 36.6m.

### Critical 2 — RCF schedule not re-derived from the example's own transactions
- Base state after the 15 Oct 2026 rollover: **CHF 30m + EUR 35m ≈ CHF 63m drawn, ≈ CHF 137m undrawn** (canonical v2,
  matching `credit-facility-management.yaml`). The plan's "undrawn 140" constant is gone: the financing column now
  shows CHF 15m repaid 15 Jan, EUR 10m (≈ CHF 9.4m) prepaid 15 Feb, CHF 15m re-drawn in May → undrawn
  **137 → 152 → 162 → 147**, and net debt/leverage move with the same transactions.

### Critical 3 — HM Inc. USD contradictions
- `funding-subsidiary.yaml`: the USD 6m drawdown now settles **15 December 2026** (after the 17 Nov position showing
  HM Inc. at USD 3.1m — consistent with the exemplar's account table), the loan is sized to the **Q1 2027 peak need**
  (not the average draw), and an intercompany-loan register row is shown.
- `surplus-cash-investment.yaml`: the USD row is now "USD 6m loan proceeds, of which USD 3m committed to the
  Jan–Feb demo-centre payments, USD 3m into a US government MMF for 4–8 weeks laddered to the Feb–Mar payments" — the
  old "USD 3m surplus for 3+ months" claim is gone.

### Critical 4 — China dividend WHT
- Now **5%** under the China–Switzerland DTA (2013) Art. 10(2) (directly-held ≥25% subsidiary; beneficial ownership +
  LOB clause noted), with the 10% domestic rate shown alongside: net **CNY 21.4m ≈ CHF 2.4m** (was ~20m/2.3m).
  Glossary `statutory-reserve` example updated. New source `ch-cn-dta-2013` (admin.ch agreement text + KPMG 30/2013).

### Critical 5 — canonical financials
- The example now states the canonical 30 Sep 2026 trio (EBITDA ≈ 78m, net debt ≈ 106m, 1.36x) and bridges explicitly
  to the review-date position: 15 Oct rollover (+CHF 2.5m gross debt from re-pricing) + Q4 working-capital build
  (cash 54 → 35) → net debt ≈ 128m. The stress uses "Marco's 2027 budget: EBITDA ≈ 70m after the order slowdown" then
  70 → 50. Everything is re-derivable (see the why-notes). This matches `covenant-monitoring.yaml`'s and
  `month-end-reporting.yaml`'s September-close figures (cash 61.2/54.0; net debt 98.8/106.0; EBITDA 78.0; 1.27x/1.36x).

### Critical 6 — hidden profit distribution direction
- Glossary `hidden-profit-distribution` now splits the two directions: benefit to a **shareholder** → constructive
  dividend / 35% WHT; below-market loan to a **subsidiary** → imputed interest income at the Swiss lender. Same fix in
  `funding-subsidiary` step 5 and the "interest rate not at arm's length" failure mode.

### Other review findings fixed
- **CFO in both money-moving examples**: USD 6m agreement signed by Thomas + CEO as HM AG's authorised signatories,
  payment >CHF 2m co-signed by Thomas and the CEO; the 2-year structure approved by Thomas (above delegation); the
  January/February repayments go through the full signature chain in the surplus example.
- **Covenant at test dates**: stress now projected at 30 Jun 2027 and 31 Dec 2027 (horizon extended to Q4 2027 to
  cover both tests), not "end of horizon".
- **Headroom definition slip** (bond-from-RCF arithmetic) and the **12-month vs horizon facility rule conflict**:
  picked one rule (committed, ≥12 months remaining life) in step 1 and in the example; point 3 rewritten.
- **Reverse stress test now has a number** (EBITDA ≈ 53m / 47m; `why:reverse-stress-53m`).
- **Counterparty-limit table** added (5 banks; ties to ≈ CHF 36.6m; shows why bank A gets no EUR deposit).
- **Intercompany loan register row** added to the funding example.
- **Intra-quarter low points** shown (18 Dec; 15 Jan post-repayment).
- **AFP 2025 wording** fixed to the press-release framing (61% safety; bank products primary choice of 46% of
  respondents; government MMFs 20%) — the "~80% of balances" figure is no longer used.
- **€STR ≈ 2.2–2.4%** (canonical v2.1) replaces 1.9–2.0% in the rates note and MMF yields (2.2% net EUR LVNAV).
- **10/20 non-bank rule** now in the body (step 5) so `bk-non-bank-rules` is used; **Art. 725(1)/(2) both halves** in
  the board row and step 10 with a bridge to funding-subsidiary.
- **GBP/CZK** row/footnote (small balances stay on current account); **CNY 55m ≈ CHF 6m** everywhere (was 60m/6.8m/7m).
- **Kleio ladder**: one structure now (eight CHF 1m deposits maturing monthly), matching the `laddering` example.
- **Bond coupon**: CHF 1.25m (1.25%) paid **1 March** — matches `map/debt.mdx` (1.25%) and `month-end-reporting`'s
  CHF 0.73m accrual at 30 Sep (= 7/12 × 1.25m) and canonical's "the coupon is a separate, later event, never week 6".
- **Buffer vocabulary** unified on the exemplar's two floors (per-account minimum operating balances; the CFO's group
  minimum liquidity CHF 10m held at the parent), with `cash-buffer`/`minimum-operating-balance` linked.
- **by_size.multinational** now shows the rating-agency shape (sources ≥ 1.2x uses) instead of "aligned with".
- **`pwc-gts-2025`** is now cited in the liquidity-planning evidence_note (was listed but unused).
- **ESTV hedge dropped** from funding-subsidiary's evidence_note; new corroborating source `estv-2026-minimum-rates`
  (CHF 0.75% / EUR 2.5% / USD 4% minimums; equity- vs debt-financed floors).

## Why-notes added (content/why/wf-cash.yaml) — 11
`repay-rcf-not-chf-deposit`, `repayment-split-jan-feb`, `peak-need-not-average`, `loan-vs-capital-contribution`,
`dividend-vs-intercompany-loan`, `deposit-ladder-to-outflows`, `china-wht-5-percent`, `net-debt-bridge-nov`,
`headroom-twelve-month-rule`, `reverse-stress-53m`, `may-redraw`. All derivations re-checked on paper against
companies.yaml + canonical facts. Examples corrected *because* a derivation failed:
1. The combined CHF 15m + EUR 10m repayment on 15 Jan fails the buffer derivation (usable ≈ CHF 6.2m < the CFO's
   CHF 10m floor) → the EUR prepayment moved to the 15 February period end (one-month interest period elected at the
   15 Jan rollover). Totals unchanged (CHF 15m + EUR 10m); the plan's schedule re-derives accordingly.
2. The old pots (CHF 26m etc.) could not exist at the December balance levels → the example's pots now tie to the
   11 Dec position (≈ CHF 36.6m) and to the forecast's own trajectory.
3. "USD 3m spare for 3+ months" contradicted the USD 6m Q1-2027 peak need → earmarking + 4–8-week ladder.
4. Q1-2027 "−4.0 drain" contradicted the exemplar's +27m Jan–Feb climb → rebuilt.

## Verification (Task C)
- `npm run check`: **0 errors, 0 warnings from wf-cash files** (the single tree-wide error at the time of writing was
  `content/data/days.yaml`, day stream — fixed by its owner during this session).
- Screenshots (full page, 1440px) of `/workflows/liquidity-planning`, `/workflows/surplus-cash-investment`,
  `/workflows/funding-subsidiary` via `scripts/shot.mjs --full`: **no MISSING refs, no runtime errors**; PNG of
  `/workflows/liquidity-planning` read — the full page renders (both example tables, by-size tabs, sources).
- Why-popover hover check via a one-off playwright snippet on `/workflows/surplus-cash-investment`
  (`button.why` "the split"): popover renders with the claim ("CHF 15m on 15 January, EUR 10m on 15 February — not
  both on one day"), the short answer and the "What would make it wrong?" check line. One-off script deleted after use.
- First screenshot run was blocked for ~15 minutes by `content/data/days.yaml` (HTTP 500 on that module blanked every
  page); re-run after the day stream fixed it.

## Requests for other authors
See `docs/notes/wf-cash-requests.md`.
