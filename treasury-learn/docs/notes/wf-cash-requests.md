# wf-cash — requests for other authors (revision round)

Owner of this stream: liquidity-planning, surplus-cash-investment, funding-subsidiary, glossary/wf-cash,
sources/wf-cash, why/wf-cash. Everything below is in files I do not own.

## 1. cash-forecasting.yaml + daily-cash-positioning.yaml (exemplar owner) — RCF figures are pre-rollover
Canonical v2: "CHF 35m + EUR 27m until the 15 Oct 2026 rollover; from the November 2026 scenarios onward CHF 30m +
EUR 35m (≈ CHF 63m drawn, ≈ CHF 137m undrawn). Never 'CHF 140m undrawn' after the rollover."
- `cash-forecasting.yaml` example says "the CHF 35m RCF loan's interest period runs to 15 January" and "CHF 140m
  undrawn on the RCF" in the 23 Nov scenario → please change to CHF 30m / ≈ CHF 137m undrawn (as
  `credit-facility-management.yaml` and `covenant-monitoring.yaml` already state).
- `daily-cash-positioning.yaml` 09:10 paragraph: "The CHF 35m RCF loan is in an interest period to 15 January" →
  same fix (the 17 Nov date is after the rollover).
- `cash-forecasting.yaml` also says the Q1-2027 hedge ratio of 75% is "inside the 60–90% policy band". Per canonical
  v2.1, Q1 2027 = Q+2 = **40–70%**, so 75% is above the band (or the ratio needs re-deriving).
- Nice-to-have: the exemplar's "Daniel pencils in a reduction of that loan by CHF 10–15m at the 15 January rollover"
  is honoured in my files as CHF 15m on 15 January plus an EUR 10m prepayment on 15 February (the combined 15 Jan
  repayment would cut usable cash below the CFO's CHF 10m floor — derivation in `why:repayment-split-jan-feb`). If you
  change the pencil, tell me.

## 2. map/debt.mdx + map/cash-forecasting.mdx (map stream) — bond coupon placement
- `map/debt.mdx`: "the coupon payment in week 6 is one of the lumpy items in the 13-week forecast" and
  `map/cash-forecasting.mdx`: "the group low point is CHF 18m in week 6 (bond coupon and quarterly VAT in the same
  week)" both contradict canonical v2 ("low point week 4 driven by December payrolls incl. 13th salary; the annual
  bond coupon is a separate, later event — never 'week 6'") and the exemplar's week table.
- My resolution (please align or challenge): the CHF 100m bond's **1.25% coupon (CHF 1.25m) is paid on 1 March** —
  consistent with `map/debt.mdx`'s 1.25% rate and with `month-end-reporting.yaml`'s "bond coupon CHF 0.73m accrued
  since the last coupon date" at 30 Sep (= 7/12 × 1.25m ⇒ last coupon ≈ 1 March). The coupon therefore sits in
  Q1 2027 in my liquidity plan, once inside the horizon.

## 3. sources/map.yaml (map stream) — two source notes
- `estv-safe-harbour-2026`: the note records only CHF rates. The 2026 circulars set minimums **CHF 0.75%, EUR 2.50%,
  USD 4.00%** (verified this round; corroborated by VATupdate 2026-02-06 and RSM 2026-02-05 — I registered
  `estv-2026-minimum-rates` in `sources/wf-cash.yaml` with those figures). Please add the FX rates to your note (or
  point to mine) so the USD 4.00% in the funding example is covered by the shared source too.
- `afp-liquidity-2025`: the note says "Average 80% of short-term investment balances in bank deposits, MMFs and
  Treasury securities… bank deposits ~46% of short-term investments". The AFP press release states **share of
  respondents**: bank products were the "primary choice" cited by 46% of respondents, 20% government MMFs, 61% safety
  first; the ~80% combined-allocation figure is not in the release. My module now uses only the verified framing.

## 4. content/compare/wf-cash.yaml (compare file, not in my assignment)
- Line 8: "the undrawn RCF (~CHF 140m)" → please change to ≈ CHF 137m (post-rollover state).

## 5. month-end-reporting.yaml (wf-control stream) — counterparty limits
- The example shows "German bank: cash 9.8 + forward 0.3 = CHF 10.1m against a CHF 10m limit", while
  `map/investments.mdx` and `map/risk.mdx` state Helvetic's policy as **CHF 30m per A-rated bank, CHF 15m per
  BBB-rated bank** (including operating balances and positive forward MtM). My surplus example adopts the 30/15
  per-rating policy (so Swiss bank A's ≈ CHF 20.6m + a EUR 10m deposit would breach its CHF 30m limit). Please
  reconcile the German bank's limit (10 vs 15) with the policy tiers — or say which is canonical and I will follow.

## 6. companies-size stream
- `docs/reviews/companies-size-r1.md` critical 1 (same trio): canonical Helvetic figures are EBITDA ≈ CHF 78m,
  net debt ≈ CHF 106m, ≈ 1.36x at 30 Sep 2026. My module now bridges these explicitly to the November position
  (net debt ≈ 128m) — see `why:net-debt-bridge-nov` if you want to reuse the derivation.

## 7. day stream — blocking, please fix ASAP
- `content/data/days.yaml` has a YAML parse error ("bad indentation of a mapping entry (61:54)"). It breaks the whole
  dev app (HTTP 500 on that module blanks every page), so no author can screenshot anything right now. It also shows
  as 8 unknown-why errors (`day-us-payroll-topup`, `day-kleio-cash-policy`, `day-runway-range`, `day-rcf-keep-drawn`,
  `day-covenant-ltm`, `day-china-manual-balance`, `day-german-funding-3m`) — presumably your `content/why/` file is
  coming.

## 8. For information (no action unless you disagree)
- My liquidity plan's base case includes: CHF 15m repaid 15 Jan 2027, EUR 10m prepaid 15 Feb 2027 (one-month interest
  period elected at the 15 Jan rollover), CHF 15m re-drawn in May 2027 before the dividend payment → undrawn
  137 → 152 → 162 → 147. Covenant stress projected at 30 Jun 2027 and 31 Dec 2027 (breach at 3.45x without the
  dividend cut). If the debt or covenant streams date anything differently, tell me and I will re-derive.
- CNY ≈ 55m ≈ CHF 6.1m everywhere in my files (canonical "CNY ≈ 55m where not otherwise specified"; matches
  `month-end-reporting`'s "CNY 55m (CHF 6.1m equivalent)" and `daily-cash-positioning`'s account table).
