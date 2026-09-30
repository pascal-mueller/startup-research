# Stream wf-risk — author notes

## Files created
- `content/workflows/fx-exposure-management.yaml` (FX & risk, order 1)
- `content/workflows/fx-hedging.yaml` (FX & risk, order 2)
- `content/workflows/credit-facility-management.yaml` (Debt & funding, order 1)
- `content/workflows/covenant-monitoring.yaml` (Debt & funding, order 2)
- `content/glossary/wf-risk.yaml` — 31 terms: booked-exposure, exposure-report, balance-sheet-hedging, budget-rate,
  hedge-documentation, multi-dealer-platform, hedge-roll, collar, lei, trade-reporting, facility-agent,
  utilisation-request, interest-period, utilisation-fee, margin-ratchet, extension-option, amend-and-extend,
  ancillary-facility, lma, compliance-certificate, covenant-headroom, event-of-default, covenant-waiver, equity-cure,
  majority-lenders, frozen-gaap, cross-default, negative-pledge, repeating-representations, ebitda-adjustments, equity-ratio
- `content/sources/wf-risk.yaml` — 14 sources
- `content/compare/wf-risk.yaml` — topics `fx-management`, `hedge-execution`, `facilities-covenants`

## Canonical facts I introduced (other authors: please stay consistent or tell me)
Helvetic (all "illustrative"):
- **Accounting framework: Swiss GAAP FER** (hedges of future sales recorded in equity; operating leases off balance
  sheet). GlobalChem: IFRS 9. If another stream already fixed Helvetic as IFRS, one of us must change.
- **FX policy bands** by quarter: Q+1 60–90%, Q+2 40–70%, Q+3 25–55%, Q+4 0–40% (Daniel's targets 75/55/40/25).
  These match the month-end-reporting numbers (80/61/41/16%). **Conflict:** `layered-hedging` in `glossary/map.yaml`
  says "30–60% of quarters 2–4", which would make month-end's Q+4 16% a breach.
- EUR 12-month net exposure EUR 118m by quarter 31/28/29/30; hedged 24.8/17.0/11.9/4.8 = 58.5 (month-end says 58).
  Booked EUR 21m, signed orders EUR 34m. USD net 54m, 29m hedged. Three hedging banks = Swiss bank A, Swiss bank B,
  German bank (the global bank in the RCF does no FX).
- **RCF:** signed Oct 2021, 5y + two 1-year extensions (both exercised) → matures Oct 2028 (same year as bond).
  Lenders: Swiss bank A 60 (coordinator/agent), Swiss bank B 50, German bank 50, global bank 40. Drawn: CHF 35m
  (compounded SARON, zero floor) + EUR 27m (EURIBOR) ≈ CHF 60.2m; from 15 Oct 2026 CHF 30m + EUR 35m ≈ CHF 62.7m.
  Margin grid 0.85% (≤1.50x) / 1.05% / 1.30% / 1.55% (>2.75x); commitment fee 35% of margin; utilisation fee 0.10%
  above one-third drawn. Bilateral lines outside the RCF: CHF 10m guarantee line at Swiss bank A (6.2m used), EUR 2m
  overdraft for HM Deutschland at the German bank (matches daily-cash-positioning).
- **Covenant figures:** 30 Jun 2026 certificate 1.40x (EBITDA 80, net debt 112), 23x cover; 30 Sep 1.36x (78/106,
  from month-end); Dec 2026 forecast 1.37x (76/104). Acquisition case "Project Lario" (EUR 95m Italian automation
  company, closing Mar 2027) → 2.39x base / 3.20x downturn / 3.87x severe at 30 Jun 2027. Acquisitions permitted
  without consent below 2.75x pro forma. Planned A&E to 2031+1+1, signed by Q2 2027.
- Czech EUR/CZK exposure (EUR 45m/yr) is outside the policy — on the treasury committee agenda (November).
Alpine: board minute 2023 — hedge ≥50% of signed EUR/USD contracts > CHF 1m with forwards; CHF 12m line at the
cantonal bank; covenants equity ratio ≥35% (actual ~44%) and net debt/EBITDA ≤3.0x, tested annually.
Kleio: no hedging; keeps ~USD 1.5m; venture-debt offer CHF 5m, 36 months, minimum-cash covenant CHF 8m (illustrative).
GlobalChem: RCF has no financial maintenance covenant; rating metrics are the effective constraint.

## Key sources and verification status
**WebFetch was blocked for every domain tried** (pwc.ch, db.com, lenzstaehelin, fedlex, six-group, treasurers.org,
financialprofessionals.org, law.ch, ctmfile …) and the shared WebSearch budget ran out after ~15 searches in this
session. All new sources were therefore verified only via the original publisher's search-result snippet. Key ones:
- FDF/EFD press release 30 Sep 2022: Swiss derivatives reporting for small NFCs postponed to 1 Jan 2028.
- FMIA Art. 108 (timely confirmation; portfolio reconciliation not required for small NFCs).
- ISDA doc on EMIR Refit mandatory delegated reporting (FCs report for NFC- since 18 Jun 2020).
- Linklaters on EMIR 3 (in force 24 Dec 2024; clearing-threshold RTS; July 2026 headline says Commission adopted RTS).
- IFRScommunity / BDO on IFRS 9 hedge documentation; PwC Switzerland 2025 on Swiss GAAP FER 27.
- 360T and LSEG FXall vendor material (platform capabilities; vendor-stated client numbers not repeated in text).
- LMA-form sample agreement (utilisation request 10:00, third business day); Heidelberg SFA (35% of margin
  commitment fee); Loomis/Symrise 5+1+1 structures; GlobalCapital on amend-and-extend in 2025; Zanders on compounded SARON.
Reused: milltech-fx-2025 (vendor survey, ~48% hedge ratio), clariant-frm-2020, schindler-holding-2021,
jonesday-emir-vm-2017, act-hsf-debt-2025, seco-kmu-finanzierung-2021, eact-guiding-principles, pwc-ch-fer-fi-2025.

## Unresolved uncertainties
- Exact current FinfraG position after the 2024–2026 FMIA revision (whether Parliament changed the small-NFC reporting
  duty before 2028) — not verified; text says only what the 2022 press release says.
- Swiss GAAP FER 27 revision referenced in KPMG's "2027 checklist" — not reviewed; statements reflect the PwC 2025 summary.
- No survey statistics on covenant headroom practice, facility administration effort, or exposure-data quality were
  found; the workflows say so rather than inventing numbers.
- Pricing (margin grid, fees, forward quotes) is illustrative; real margins vary by credit, size and period.
- "Many investment-grade RCFs have no financial covenants" is a practitioner observation without a cited statistic.

## Requests for other authors
- **map stream (`glossary/map.yaml` → `layered-hedging`)**: example says Helvetic's band is "30–60% of quarters 2–4";
  please change to the graded bands above (Q+2 40–70%, Q+3 25–55%, Q+4 0–40%) so month-end's 16% for Q+4 is compliant.
- **days stream (`content/data/days.yaml`)**: uses unknown term `trade-confirmation`; the existing id is
  `deal-confirmation` (aka trade confirmation).
- **wf-control (month-end-reporting)**: the facts above are aligned with your 30 Sep table; after the 15 Oct rollover
  drawings are ≈ CHF 62.7m, not 60.0m, if you show later months.
- **wf-events (currency-shock, acquisition-integration)**: Helvetic's FX policy bands, hedge register and the
  "Project Lario" acquisition case are available to reuse/link.
- Anyone writing Helvetic's accounts: framework assumed = Swiss GAAP FER.
