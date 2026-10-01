# Stream wf-risk — requests for other authors (revision pass, post wf-fx-debt-r1)

I own only: fx-exposure-management, fx-hedging, credit-facility-management, covenant-monitoring,
glossary/wf-risk.yaml, sources/wf-risk.yaml, why/wf-risk.yaml. The items below live in files I must not edit.

## 1. RCF post-rollover state (canonical: after the 15 Oct 2026 rollover, drawings are CHF 30m + EUR 35m ≈ CHF 63m,
## ≈ CHF 137m undrawn of CHF 200m) — the November scenarios still show the pre-rollover state
- **wf-cash (`content/workflows/cash-forecasting.yaml` ~line 208):** *"the CHF 35m RCF loan's interest period runs to
  15 January"* → the CHF loan is **CHF 30m** from 15 Oct (interest period to 15 Jan 2027 is correct). The plan to
  *"reduce that loan by CHF 10–15m at the 15 January rollover"* still works unchanged. (~line 206:) *"CHF 140m undrawn
  on the RCF"* → **≈ CHF 137m**.
- **wf-cash (`content/workflows/cash-forecasting.yaml` ~line 208, FX bullet):** *"Q1 2027 net EUR inflows EUR 40m
  against EUR 30m of forwards, 75%, inside the 60–90% policy band"* — per canonical v2 (and my files), **Q1 2027 =
  Q+2 = 40–70%** until Q4 2026 closes; 75% is *above* that band. Either trim the hedges to ≤70% (e.g. "75% — above the
  40–70% band, so Lea flags a small trim") or restate the band. (My fx-hedging/fx-exposure examples bridge to your
  40m/30m figures with one line, so the numbers themselves can stay.)
- **wf-cash (`content/glossary/*` hedge-ratio example):** same "Q1 2027 … 75%, inside the 60–90% policy band" issue if
  it still appears.
- **wf-cash gold standard is fine on the timeline elsewhere;** the 13-week table (low point week 4, ≈ CHF 18m; Q4
  close ≈ CHF 25m) is exactly what my covenant example now re-derives its December net debt from — please keep it.
- **day stream (`content/workflows/daily-cash-positioning.yaml` ~line 205):** *"The CHF 35m RCF loan is in an interest
  period to 15 January and cannot be prepaid mid-period"* → **CHF 30m loan** (post-rollover); the rest is canonical.
- **wf-control (`content/workflows/month-end-reporting.yaml`):** continuity note says drawings are ≈ CHF 62.7m after
  15 Oct ✓ good; the hedge line quotes Q+2 61%/Q+3 41%/Q+4 16% for the Sep report ✓ consistent with my table. The
  November note ("Q1 2027 at EUR 30m forwards against EUR 40m of exposure, 75%") inherits the same band question as
  cash-forecasting above.

## 2. "CHF 140m undrawn" appears in several files I don't own (should be ≈ CHF 137m after 15 Oct 2026, or explicitly
## dated before the rollover)
- `content/pages/start/index.mdx` (~line 86), `content/compare/wf-cash.yaml`, `content/compare/wf-events.yaml`,
  `content/glossary/core.yaml` (liquidity layers + interest-period examples), `content/glossary/map.yaml` (~line 303,
  commitment-fee example), `content/data/days.yaml` (~line 570), `content/workflows/liquidity-crisis.yaml`,
  `content/workflows/liquidity-planning.yaml` (~line 182, "CHF 35m and EUR 27m loans" — that one is fine if dated
  before 15 Oct), `content/workflows/surplus-cash-investment.yaml` (~line 163, "repay part of the CHF 35m RCF loan …
  Repay CHF 15m at the 15 January rollover" — the loan is CHF 30m after 15 Oct; the repayment plan survives),
  `content/pages/map/cash-management.mdx`, `content/pages/map/debt.mdx`.

## 3. Map stream
- **`content/glossary/map.yaml` → `layered-hedging`:** the example still says *"60–90% of the next quarter's net EUR
  inflows and 30–60% of quarters 2–4"* — this contradicts the canonical graded bands (Q+2 40–70%, Q+3 25–55%,
  Q+4 0–40%) and would make my example tables' Q3 2027 at 16–26% a breach. Please restate with the graded bands and
  the rolling-bucket convention (front quarter = Q+1; buckets roll up when a quarter closes). This is the r1 critical
  finding 2 and it is still unfixed as of my pass.
- **`content/pages/map/fx.mdx`:** "the 12-month forward is about 0.917" and "€STR ≈ 2%" → canonical v2.1: €STR ≈
  2.2–2.4% and the 12m forward at spot 0.935 prices at **≈ 0.913–0.915**. (My glossary `budget-rate` example was
  corrected the same way.)
- **`content/pages/map/cash-forecasting.mdx` (~line 62):** *"the group low point is CHF 18m in week 6 (bond coupon and
  quarterly VAT in the same week)"* — canonical v2 says the low point is **week 4**, driven by December payrolls
  including 13th salary, and explicitly "never week 6"; the annual bond coupon is a separate, later event.
- **Why-note ids:** `hedge-bands-graded` now lives in `content/why/wf-risk.yaml` (your pages link it) — please don't
  re-add a note under that id; `forward-points-below-spot` remains yours (I deleted my duplicate and link to it).

## 4. Smaller items
- **days stream (`content/data/days.yaml`):** unknown term `trade-confirmation` (the id is `deal-confirmation`) —
  raised in round 1; may already be fixed.
- **interview stream:** `content/why/interview.yaml` referenced unknown term `span-of-control` mid-pass (the term does
  not exist in any glossary file); `npm run check` was clean at the end of my pass, so presumably fixed — flagging just
  in case it regresses.

## 5. What my files now guarantee (for anyone reusing the Helvetic story)
- RCF: signed Oct 2021, 5+1+1 both exercised → matures Oct 2028; 4 banks 60/50/50/40 (Swiss A coordinator/agent,
  Swiss B, German bank, global bank); margin grid 0.85%/1.05%/1.30%/1.55%; commitment fee 35% of margin (Q3 invoice
  CHF 106,287 = 0.2975% × 139.8m × 92/360); utilisation fee 0.10% above CHF 66.7m. Drawings CHF 35m + EUR 27m until
  15 Oct 2026, then **CHF 30m + EUR 35m ≈ CHF 62.7m drawn, ≈ CHF 137m undrawn**; Daniel plans a CHF 15m reduction at
  the 15 Jan 2027 rollover.
- Covenants: net debt/EBITDA ≤ 3.25x, interest cover ≥ 4x, tested 30 Jun/31 Dec. Canonical LTM 30 Sep 2026: EBITDA
  78, net debt 106, 1.36x (implied cash ≈ CHF 54m). My December forecast row is now **net debt ≈ 137m, 1.80x**,
  derived from the shared cash path (Q4 close ≈ CHF 25m) — if your stream revises the Q4 cash close, tell me and I
  will re-derive. Acquisition condition: pro forma leverage < 2.75x; "Project Lario" = EUR 95m Italian automation
  target, closing Mar 2027, base 2.39x / downturn 3.20x / severe 3.87x at the 30 Jun 2027 test.
- FX: bands Q+1 60–90% / Q+2 40–70% / Q+3 25–55% / Q+4 0–40% (rolling calendar quarters; Daniel's targets 75/55/40/25);
  exposure cycle WD2 call → WD5 submissions → WD7 Daniel's review → hedges after; three hedging banks (Swiss A,
  Swiss B, German bank). October: EUR 118m/12m exposure (31/28/29/30), hedged 58.5 (24.8/17/11.9/4.8). November:
  Q1 2027 ≈ 40m exposure / ≈ 30m hedged (bridged in both FX examples).
