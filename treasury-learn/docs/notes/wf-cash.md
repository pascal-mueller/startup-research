# Notes — stream wf-cash

## Files created
- `content/workflows/liquidity-planning.yaml` — "Will we have enough money when obligations arrive?" Distinguished from
  forecasting (flows) and positioning (today): available liquidity = usable cash − trapped − minimum + undrawn committed
  facilities; covenant projections; stress + reverse stress; funding plan; board reporting (Art. 725 CO). Worked example:
  Helvetic Oct 2026 quarterly plan (base headroom CHF 150m+; combined downturn stress → leverage 3.3x vs 3.25x; dividend
  as lever; RCF and bond both maturing 2028 → A&E by mid-2027, refinancing late 2027).
- `content/workflows/surplus-cash-investment.yaml` — safety/liquidity/yield; "repay debt first"; limits incl.
  current-account balances; MMF types; quotes; confirmations/SSIs; cash-equivalent classification. Worked example:
  Helvetic December 2026 — repay CHF 15m of the CHF 35m RCF loan at the 15 Jan rollover, EUR 10m in an LVNAV MMF until the
  EUR loan's 15 Jan period end, USD 3m in a US government MMF, CNY stays local.
- `content/workflows/funding-subsidiary.yaml` — loan vs equity vs pool vs guaranteed local facility; arm's-length
  pricing (ESTV safe harbours); FX hedge at lender; documentation; booking/reconciliation; trapped cash and upstreaming
  (China). Worked example: HM Inc. USD 6m loan from HM AG at 4.00%, hedged with rolling swaps; HM Suzhou 2027 dividend
  arithmetic.
- `content/glossary/wf-cash.yaml` — 13 terms: liquidity-plan, liquidity-stress-test, sources-and-uses, funding-plan,
  mmf-types, negative-carry, laddering, cash-equivalents, ssi, capital-injection, safe-harbour-rates,
  hidden-profit-distribution, statutory-reserve.
- `content/sources/wf-cash.yaml` — 5 new sources (weka-725-liquidity, sp-liquidity-descriptors, mmfr-ms-im,
  china-briefing-dividends, safe-cash-pool-2024).
- `content/compare/wf-cash.yaml` — topics `liquidity-planning`, `surplus-investing`, `subsidiary-funding`.

## Consistency choices (aligned with other streams)
- Helvetic RCF: ~CHF 60m drawn = CHF 35m (compounded SARON) + EUR 27m (3-month EURIBOR) loans; interest periods end
  15 Jan / 15 Apr / 15 Jul / 15 Oct; RCF runs to October 2028 (from wf-risk glossary). Bond CHF 100m due 2028.
- Helvetic: no cash pool; Lea prepares, Daniel decides; CHF 10m parent buffer; EBITDA ~CHF 70m (illustrative,
  implies ~1.8x leverage) — other streams should keep leverage in the 1.5–2.3x range.
- Group cash CHF 45m in Oct 2026 → CHF 59.5m after Q4 collections; HM Suzhou ~CNY 60m (≈ CHF 6.8m) treated as trapped.
- CHF ≈ 0%: surplus CHF repays RCF drawings at rollover; EUR/USD earn €STR/SOFR-level rates (illustrative).

## Key sources (all via WebSearch extracts from publisher domains — WebFetch blocked)
- Art. 725 CO (reused `ch-co-board-duties`) + WEKA / Walder Wyss commentary on the 12-month liquidity plan.
- S&P liquidity descriptors (1.2x sources/uses for "adequate"; 12- vs 24-month horizons), via S&P Maalot PDF.
- AFP 2025 Liquidity Survey (reused `afp-liquidity-2025`): 61% safety first; ~80% in deposits/MMFs/Treasuries; ~46% deposits.
- EU MMFR portfolio rules via Morgan Stanley IM summary; US 2023 MMF reforms (reused `sec-mmf-2023`).
- ESTV 2026 safe-harbour rates (reused `estv-safe-harbour-2026`).
- China statutory reserve / dividend WHT (China Briefing); SAFE 2024 cross-border cash-pool pilot.

## Unresolved uncertainties
- **Foreign-currency safe-harbour rates** (EUR 2.50%, USD 4.00%, GBP 4.00% for 2026) came from a search-result
  summary of adviser publications (Deloitte/EY/BDO); the `estv-safe-harbour-2026` note (map stream) only lists CHF rates.
  Could not open the ESTV circular. Verify before relying on them.
- Whether the Swiss–US treaty removes US withholding on intercompany interest was not verified — the text deliberately
  says "tax confirms".
- China: the specific cap on outbound (overseas) lending was not verified; text says only "registration and
  macro-prudential caps".
- MMF net yields, deposit rates and RCF margin (~1.1%) and commitment fee (~0.4%) are illustrative, not sourced.
- Swiss deposit insurance and whether banks currently charge on large corporate CHF balances were not verified and are
  not stated as facts.
- S&P source is a 2019 copy of the methodology on the Maalot site; the current version may differ in detail.

## Requests for other authors
- **map stream** (`content/sources/map.yaml`): consider adding the 2026 foreign-currency safe-harbour rates to the
  `estv-safe-harbour-2026` note if you can verify them.
- **wf-risk / debt stream** (credit-facility-management, covenant-monitoring): my liquidity-planning example assumes
  EBITDA ~CHF 70m and a proposal to amend-and-extend the RCF by mid-2027 and refinance the bond in late 2027 — please
  keep consistent or tell me to adjust.
- **lens stream**: `content/glossary/lens.yaml` line 65 has a YAML error that breaks the whole dev server (500 on every
  page) at the time of writing.
