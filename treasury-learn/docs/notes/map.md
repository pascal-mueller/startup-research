# Treasury Map — author notes (revision pass, round 2)

Owner: map stream. Files touched this pass: `content/pages/map/*.mdx` (all 11), `content/glossary/map.yaml`,
`content/why/map.yaml`, plus the map satellites `content/sources/map.yaml` and `content/compare/map.yaml`
(review map-r1 assigns fixes to them explicitly as "map-stream satellites"; see "Assumptions" below).

## Review findings (map-r1) — fixed

1. **Hedge bands + wrong hedge decision** (critical 1). `fx.mdx` exposure table now uses the canonical graded bands
   (Q+1 60–90 / Q+2 40–70 / Q+3 25–55 / Q+4 0–40, rolling calendar quarters; Q1 2027 = Q+2 = 40–70%) and the narrative
   decision is derived under those bands: Q1 2027 at 38% is below the 40% floor; EUR 0.8m is the mechanical minimum,
   Daniel adds ~EUR 6m to the 55% internal target (per `fx-hedging.yaml`, targets 75/55/40/25) → 56%.
   `glossary/map.yaml` `layered-hedging` realigned (was "30–60% for quarters 2–4") and links the decision's why-note.
   (The crashed run had already rebuilt the table; I verified the arithmetic and fixed the Q2/Q3 target wording,
   which claimed 14% was "exactly what the policy wants" while it is below the 25% internal target.)
2. **Helvetic financials** (critical 2). `debt.mdx` covenant example rebuilt on canonical: net debt 106 = bond 100 +
   drawings 60 (CHF 35 + EUR 27) − cash 54; LTM EBITDA 78 → 1.36x (limit 3.25x); interest cover 78 ÷ 3.4 net finance
   charges ≈ 23x (matches `covenant-monitoring.yaml`). Leases removed from the bridge with the FER explanation
   (off balance sheet; agreement excludes IFRS 16). Headroom restated: EBITDA could fall to ≈ CHF 33m (106/3.25,
   −58%). Glossary `net-debt`, `leverage-ratio`, `interest-cover`, `ebitda`, `operating-cash-flow`, `free-cash-flow`
   all re-derived (OCF ≈ 55 = 78 − 12 WC − 11 tax; FCF 27 = 55 − 28 capex → 15 dividend + 12 debt paydown).
   `cash-forecasting.mdx` medium-term plan re-derived (forward EBITDA ≈ 80; interest and fees ≈ 3.2 with bridge;
   leverage 1.36x now → ~1.8x December test → <1.5x mid-2027, matching `covenant-monitoring.yaml`'s trajectory).
3. **RCF facts** (critical 3). Everywhere: matures **Oct 2028** (signed Oct 2021, 5+1+1, both options accepted);
   commitments **60/50/50/40** (banking wallet table, `syndicated-loan`, `wallet-share`); margin **0.85%** with the
   real grid (0.85 ≤1.50x, then 1.05/1.30/1.55), commitment fee **0.2975%** (`credit-spread`, `commitment-fee`,
   `debt.mdx` cost bullet, `investments.mdx`). Drawn state per canonical v2 shown both ways: CHF 35m + EUR 27m
   (≈ CHF 60m drawn / ≈ 140m undrawn) until the 15 Oct 2026 rollover, then CHF 30m + EUR 35m (≈ 63m / ≈ 137m).
   The "RCF runs to 2027 / 2027 refinancing" story in `debt.mdx`, `banking.mdx` and `refinancing-risk` rewritten:
   both instruments now mature 2028 → both current in the 2027 accounts → amend-and-extend to 2031+1+1 signed by
   mid-2027 (mirrors `credit-facility-management.yaml`). Interest-period mechanics: rolls on the **15th**, notices
   10:00 Zurich, three business days (was "11:00").
4. **Signing** (critical 3 payments). `payments.mdx`: ≤ CHF 2m four-eyes in treasury (Lea prepares, Daniel releases);
   > CHF 2m Thomas (CFO) **and the CEO** co-sign as well — the CHF 4m example now waits for the CEO's signature
   (matches `large-payment-approval.yaml`). Also fixed in the by-size table, `compare/map.yaml` and the
   `four-eyes-principle` glossary example.
5. **Hedge accounting** (critical 4). The crashed run had fixed `fx.mdx` (FER 27 vs IFRS 9) — confirmed. I fixed the
   remaining satellite `compare/map.yaml` (map-fx cell said IFRS 9) and upgraded `glossary/map.yaml`
   `hedge-accounting` (professional + example now show FER's lighter regime vs IFRS 9 designation/documentation).
6. **13-week low point** (critical 6). `cash-forecasting.mdx`: **week 4 (w/c 14 Dec), CHF 18m**, driven by December
   payrolls incl. Swiss 13th salary and Italian tredicesima, year-end supplier runs, CHF 1.8m capex milestone;
   bond coupon explicitly "a separate, later event"; usable low ≈ CHF 12m after the ≈ CHF 6m in China; ≈ CHF 137m
   undrawn after the October rollover. `cash-management.mdx` headroom table row fixed (was "week 6"). Italy bias
   harmonised to the workflow's "8 of the last 10 weeks at the 4-week lag" (page + glossary + index). Cycle table now
   "Tuesday–Wednesday consolidation"; `rolling-forecast` glossary now "Monday roll, new week 13 added" (was
   "Tuesday … week 14").
7. **Alpine project sizes** (critical 7). Acceptance milestones re-derived from the canonical 30/50/20 split and
   CHF 0.5–4m projects: `working-capital.mdx` example is now 20% of a CHF 3.5m project = **CHF 0.7m** (was CHF 2.0m
   = 20%, implying a CHF 10m project); `cash-forecasting.mdx` "CHF 1.4m acceptance" → CHF 0.7m and "two acceptances
   CHF 3.4m" → ~CHF 1.5m (0.7 + 0.8 of a 3.5m and a 4m project); `risk.mdx` scenario aligned. The "month moves by
   CHF 2m" phrase from companies.yaml is kept and now derived (two slipping certificates).
8. **Stale canonical sweep** across all 11 pages + glossary + satellites: €STR 2.2–2.4% (was 1.9–2.0% in
   `investments.mdx`, `reference-rate`, `term-deposit`); EUR drawing cost ≈3.1–3.2%; 12m forward 0.913–0.915 (was
   0.917 in `forward-points`); CNY ≈ 55m ≈ CHF 6m at HM Suzhou (was 44m/45m); "Helvetic Machines AG" — no
   "Helvetic AG" anywhere in map files; headroom printed at 30 Sep 2026 = **CHF 177.9m** with the canonical bridge
   (54.0 − 6.1 + 140 − 10) in `cash-management.mdx`; the page's headroom *definition* fixed to match (usable cash +
   undrawn committed − policy minimum, then tested against the forecast low point). HM AG CHF account operating
   minimum set to CHF 2.0m per canonical buffers. German payroll shown as monthly EUR 4.2m on the 27th.

## Minor review items also fixed
- `payment-terms`: EUR 1.5m (formula was right, number was wrong); `term-deposit`: "call money" moved to
  confusedWith; `investment-grade`: high-yield/junk moved to confusedWith; `rtgs`: bond coupon CHF 1.25m / CHF 100m
  principal at maturity; `repatriation` + `cash-visibility` (11 of 12 statements via the tool, Wei emails the Chinese
  export — the "9 of 12 after an acquisition" story removed); `cash-buffer` now names the canonical buffers;
  `overdraft` example now points at the bank that holds Alpine's German account (companies.yaml: the large Swiss bank).
- `payments.mdx`: "SWIFT" → "Swift" in prose (organisation); tables keep "EBICS/SWIFT" as channel specs.
- `cash-management.mdx`: interview prompt no longer trains the wrong time-zone intuition (asks which statement never
  arrives automatically and why); "ignore" → "exclude from available liquidity"; field note grounded (netting
  reconciliation at GlobalChem).
- `technology.mdx`: withdrawn Deloitte "spreadsheet-based forecasting" phrasing **removed** (per canonical v2);
  Kleio "bank APIs" → "bank feeds (API where offered)"; payment-systems section now says who works the rejection/
  acknowledgement queue (Marta's treasury operations, morning).
- `risk.mdx`: commodity price risk added as a flagged out-of-scope risk (review "missing concepts"); NeuGroup
  characterisation labelled community-sourced.
- `banking.mdx`: missing concept "when a bank relationship breaks" added (commitment re-allocation, service
  replacement, guarantee re-issuing).
- `cash-management.mdx`: missing concepts in-house bank + monthly multilateral netting (2–3 sentences with the
  ~30-currency example) added to intercompany funding.
- `index.mdx`: Italy haircut phrasing harmonised; "rolls CHF 3m more" → "keeps CHF 3m more outstanding at the next
  15th rollover"; risk item cross-links `/map/risk`.
- `sources/map.yaml`: `bis-triennial-2025` title corrected ("surge to $7.9 trillion"; IRD +59%); `sec-mmf-2023` URL
  spaces encoded; `snb-mpa-2026-09` now points at snb.ch (review confirmed the SNB release).

## Statistics policy applied
- ACT/HSF 2025 "76%/41%": **figure withdrawn** (could not be re-verified; the 2026 write-up reuses "41%" for another
  question) — `debt.mdx` now states the qualitative finding and explicitly notes the pair is unconfirmed.
- AFP 2026 "49%": kept as "about half (49% as reported; figure not confirmed against the primary text)" per v2.1.
- ST/TIS 39→53: kept with the "(vendor-sponsored)" label and "as reported by the sponsors" (sanctioned by canonical v2).
- AFP 2025 liquidity 46%/20% reworded as "primary choice" figures (review nit).

## Why notes (content/why/map.yaml) — 10 total
Existing (verified on paper, kept): `hedge-topup-judgment` (32m exposure / 12m hedged / 38%; 0.8m floor-scrape vs ~6m
to the 55% target → 18/32 = 56% — arithmetic re-derived against the fx.mdx table and `fx-hedging.yaml`'s 75/55/40/25
targets), `forward-points-below-spot` (0.935 × 1.000/1.023 ≈ 0.914; 4-month ≈ 0.928 — re-derived; check extended with
the sign flip the brief asked for).
Added:
- `leverage-bridge-136` — full 100 + 35 + 25.2 − 54 = 106 ÷ 78 = 1.36x bridge, incl. why leases and trapped cash do /
  don't belong.
- `covenant-test-dates` — why 30 Jun/31 Dec, seasonal 1.36x → 1.80x → <1.5x, grid reset on the certificate.
- `commitment-fee-cost` — 0.2975% × ~137m ≈ 410k; ties to the agent's Q3 invoice 0.2975% × 139.8m × 92/360 = 106,287.
- `cp-needs-rcf-backstop` — rollover risk; committed (not uncommitted) backstop; drawstops.
- `deposit-protection-negligible` — CHF 100k vs Kleio 22m (220×) / Helvetic 54m (540×); limits instead of insurance.
- `dso-per-day` — 7bn/365 ≈ 19.2m/day; 3 days = 57m; Helvetic 1.8m/day, 70 days ≈ 125m.
- `guarantee-line-reduces-headroom` — EUR 900k guarantee under the CHF 12m facility's guarantee sub-limit.
- `alpine-line-sizing` — the canonical sizing rationale (stacked project gaps + cash floor + guarantee headroom +
  slip buffer ≈ 10–12m → CHF 12m), linked at every place the CHF 12m appears in map files per canonical v2.

## Examples corrected because the why derivation failed
- Alpine acceptance sizes (CHF 2.0m/CHF 1.4m/CHF 3.4m) — implied CHF 7–17m projects against companies.yaml's
  CHF 0.5–4m; re-derived to 20% milestones (0.7m/0.7+0.8m).
- Medium-term plan: "CHF 5m interest" could not be derived from the instruments (1.25 coupon + ~0.5 CHF loan + ~1.0
  EUR loan + 0.41 commitment fee ≈ 3.2) → lowered to CHF 3.2m with the bridge; forward EBITDA restated 88 → ~80 so
  the plan does not re-introduce a second "CHF 88m EBITDA" into the manual.
- Glossary OCF/FCF chain rebuilt from 78 (was 85 → 60 → 32).
- `payment-terms` 1.8m → 1.5m (the stated formula gives 1.5m).

## Assumptions
- `content/sources/map.yaml` and `content/compare/map.yaml` are the map stream's own satellites (map-r1 assigns
  fixes in them to this module: "satellite file, same fix"); I treated them as mine. If ownership says otherwise,
  the diffs are small and self-contained.

## Unresolved / verification status
- **Screenshots blocked at the time of writing**: the app renders the Vite error overlay on every route because
  `content/data/days.yaml` (day stream) has a YAML parse error at line 61 ("bad indentation of a mapping entry",
  an unquoted `input: Closing balances of the 7 accounts: …` value) which breaks the eager
  `import.meta.glob('/content/data/*.yaml')` in `src/lib/content.ts`. `npm run check` reports 24 errors, all from
  days.yaml / pages/day/* / why/day — **zero from map files**, 0 warnings. Retry the screenshot pass once the day
  stream fixes its file (see map-requests.md).
- FX exposure table dates: the map's exposure table is one cycle's snapshot; `fx-exposure-management.yaml`/
  `fx-hedging.yaml` pin other cycle states (Oct 9: 31/28/29/30 exposures; late Nov: Q1 ≈ 40/30). The reviewer's fix
  direction accepts the map's own illustrative table with correct bands/decisions; I kept it and labelled it a
  snapshot. Flagged to the reviewer implicitly via the "(one cycle's snapshot)" wording.
