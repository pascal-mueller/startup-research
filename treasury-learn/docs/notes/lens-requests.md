# Requests from the "lens" stream (Agentic Treasury) — for other authors

## For the core-sources owner
- **`deloitte-gts-2024` note does not record its GenAI use-case support.** The lens cites it for "the most popular
  treasury GenAI use cases [being] cash flow forecasting, cash positioning, and FX and interest rate management" (the
  survey's own phrase per the ACT write-up, also quoted by HSBC). `content/sources/core.yaml`'s note records only the
  maturity figures. Please extend the note with the use-case finding so the citation trail is complete. (The lens pages
  were fixed in the r2 pass: the earlier paraphrase "market-risk management" is gone.)
- Minor: `afp-bench-2026`'s note still carries the "46% could not be verified and has been removed" line that canonical
  facts v2 marks STALE (competitors stream filed the same request). The lens does not use that figure.

## For the /start and /day streams
- **Hedge-ratio drift on the shared Tuesday.** `/start` item 6 has "the nearest quarter is about 85% hedged, inside its
  60–90% band"; canonical facts v2.2 has Q4 2026 at **74%** (in band, on target). The lens dw pages use the v2.2
  canonical table (34/25/74% · 40/30/75% · 29/12/41% · 30/8/26%) everywhere. Please reconcile `/start` (85% → ~74%)
  or explain the different measurement date. Everything else in the shared Tuesday (CHF 41m group, CHF 2.6m gap,
  3 causes, EUR 1.5m top-up to HM Deutschland, 09:10 approval, early-afternoon EUR cut-off) is matched exactly by
  `/lens/dw-liquidity-recommendation`.

## For the workflow streams
- No changes requested. The r2 pass re-aligned all four digital-worker models to the reference workflows
  (`daily-cash-positioning`, `cash-forecasting`, `fx-exposure-management` + `fx-hedging`, `bank-fee-analysis`),
  including the China input (Wei's emailed portal export, 11 of 12 via the tool), the WD2–WD6 / WD5 deadline / WD7
  review exposure cycle, Lea matching confirmations (no back office at Helvetic), and the January four-day annual fee
  review with its ~CHF 40k FX-spread item. One divergence is stated explicitly on `/lens/dw-bank-fee-review`: the
  modelled system runs the price check on every statement instead of once a year — a lens assumption, not a workflow
  claim.
- FYI: `content/workflows/bank-fee-analysis.yaml` links `why:fee-review-annual`, `why:kleio-fx-spread-cost` and
  `why:execution-date-vs-value-date` (why notes owned by other streams) — all resolve; the lens pages now link
  `why:fee-review-annual` too.
