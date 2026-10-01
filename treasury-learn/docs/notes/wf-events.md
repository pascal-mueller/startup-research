# Stream wf-events — Events & crises workflows

## Revision pass (Sep 2026) — r1 findings fixed
Review file: `docs/reviews/wf-events-r1.md`. Everything below landed in this pass (a previous revision attempt crashed
before writing anything; `git diff` was empty for these files at session start).

### Critical findings (r1)
1. **Stale Helvetic baseline** — every "net debt ~CHF 115m → 1.5x / 1.7x" replaced with the canonical LTM 30 Sep 2026
   base: **EBITDA ≈ CHF 78m, net debt ≈ CHF 106m, ≈ 1.36x**. Shock math re-derived on that base:
   `currency-shock.yaml` example covenant check now runs 1.36x → ≈ 104/67 ≈ 1.6x (the CHF 11m full-year EBITDA hit),
   with the covenant formula and rate conventions shown once. `liquidity-crisis.yaml` helvetic cell re-derived from
   1.36x (see stress-leverage-bridge why note).
2. **"RCF and bond are in CHF, so net debt hardly moves" is false** — replaced with the canonical split (CHF 100m bond
   in CHF; RCF drawn CHF 35m + EUR 27m pre-rollover): net debt falls ≈ CHF 2m (27 × 0.075). The example's net-EUR
   balance-sheet line now includes the EUR 27m drawing (EUR 22m assets less the drawing = net EUR −5m → +0.4), and the
   text states the translation story: **EUR debt is a natural hedge for EUR earnings**.
3. **Pricing response pointed at the wrong customers** — the CHF surcharge on non-EU customers is gone. Step 9 and the
   Tuesday committee now aim at the exposed flow: EUR list-price increases / EUR surcharge on new EUR quotes for EU
   customers, reduced discounts, EUR quote validity cut to 30 days, CHF invoicing where accepted, cost-side actions.
   Step 9's ambiguous "in CHF terms" now names the currency.

### Citations (r1)
4. **Burckhardt** corrected in `currency-shock.yaml` step 9 and `sources/wf-events.yaml`: 7.9% is the **Compressor
   Systems segment** order intake (group −0.6%); the report attributes the decline to customers postponing large
   projects — **not** to the SNB decision.
5. **Swissmem** source note corrected to the surveys' own figures: 51% price cuts (Mar 2015 survey, with BAK Basel),
   69% (Jun 2015, >400 participants), 18% considering partial relocation at 1.05, 77% shifted cost blocks into EUR.
6. **Clariant bonus-target** and **Tecan subsequent-events** marked UNVERIFIED (R1) in prose ("as reported; not
   re-verified against the primary text") and in the source notes; kept as qualitative examples per v2.1.
7. **Art. 725 CO** flag resolved: the evidence_note now states the revised company law confidently (Art. 725(1)–(2) CO
   solvency monitoring and action on threatened illiquidity, in force 1 Jan 2023; 725a capital loss, 725b
   over-indebtedness) and cites the new source `co-art-725` (Fedlex CO + Walder Wyss commentary via the review).

### v2.2 canonical sweep + minors
- Acquisition example: canonical drawn state (CHF 30m + EUR 35m after the 15 Oct rollover), currency-split pro forma
  (CHF 125m + EUR 35m ≈ CHF 158m of 200m), undrawn **137m → ≈ 42m** (never "140m → 45m"), net-debt bridge
  106 + 95 + 17.2 − 5 ≈ CHF 213m / EBITDA ≈ CHF 88m → **≈ 2.4x** with the bridge spelled out.
- Acquisition example: EV vs funding conflation fixed (EV **EUR 117.7m**; total funding EUR 120.0m incl. fees — the
  Total row is relabelled).
- Acquisition example: EUR 5m escrow's fate spelled out (locked-box leakage/warranty security, released after the
  post-closing review and first annual accounts, ≈ 3–6 months; completion-accounts contrast one line).
- Acquisition: **signatory gap** added to Day-1 step + example (revocation immediate, mandates/register filings take
  weeks → interim signatory / power of attorney / advance-dated mandates).
- Acquisition step 10 ("bring the target under group policy") now leaves documentary evidence (signed matrix, issued
  limits, WD5 exposure cycle, investment rules) with the day-100 test criteria folded in.
- Liquidity-crisis: **payroll-side levers** added next to the freezes (short-time work, wage-payment timing).
- Liquidity-crisis Alpine example: stress+levers column footnote now states the phasing so every row foots to CHF 0.1m
  (one cell changed 8.6 → 8.3 to make it exact); "DE paid wk 11" vs the week-10 payment reconciled explicitly.
- Currency-shock: hedge-accounting/OCI nuance (IFRS 9 vs Swiss GAAP FER translation reserve) added to the accounting
  role, the translation data line and the example row.
- Glossary: `thirteen-week-cash-flow` aka "TWCF" dropped (practitioner usage is 13WCF).
- `neugroup-svb-2023` URL moved to connect.neugroup.com (recorded location from the review).
- 5-month forward re-priced at ≈ 0.852 for €STR 2.2–2.4% (was 0.853 at 1.9%); MTM row +6.2 accordingly.

## Why notes added (content/why/wf-events.yaml, 12)
`covenant-shock-pro-forma`, `eur-debt-natural-hedge`, `transaction-vs-translation`, `price-the-exposed-currency`,
`stress-leverage-bridge` (currency-shock + the Helvetic crisis cell); `crisis-opens-13-week`, `bank-before-board`,
`alpine-headroom-41`, `precautionary-draw-early` (liquidity-crisis); `day1-checklist-order`, `funds-flow-sequencing`,
`signatory-gap` (acquisition-integration). All linked inline; derivations cross-link existing notes
(`covenant-baseline`, `covenant-ebitda-source`, `thirteen-weeks`).

### Examples corrected because the why failed
- Currency-shock balance-sheet row: re-deriving the net EUR position showed the EUR 27m drawing was missing — net EUR
  22m assets → net EUR −5m after the drawing (+0.4, not −1.7). The finding is the natural-hedge story itself.
- Liquidity-crisis stress+levers column: deriving the phasing on paper showed the week-10 cell could not be
  reproduced (8.6 → 8.3); the footnote now publishes the phasing.
- Liquidity-crisis Helvetic cell: deriving the leverage move showed CNY 40m (≈ CHF 4.5m) alone can only reach ≈ 1.4x —
  the stress case now names the second component (broader China shortfall ≈ CHF 5m against plan) to reach ≈ 1.6x.

## Verification (this pass)
- `npm run check`: **0 errors, 0 warnings** (whole repo at the time of the run).
- `node scripts/shot.mjs "$TMPDIR/wf-events-v2" "/workflows/currency-shock,/workflows/liquidity-crisis,/workflows/acquisition-integration" --full`:
  no MISSING refs, no runtime errors; PNGs inspected.
- One-off playwright hover on the `covenant-shock-pro-forma` why button: popover renders (kicker/claim/short/detail/
  falsifier). Screenshot `$TMPDIR/wf-events-v2/why-hover.png`.

## Files owned
- content/workflows/acquisition-integration.yaml (order 1), currency-shock.yaml (order 2), liquidity-crisis.yaml (order 3)
- content/glossary/wf-events.yaml (10 terms), content/sources/wf-events.yaml (13 sources, incl. new `co-art-725`)
- content/why/wf-events.yaml (12 notes, created this pass)
- content/compare/wf-events.yaml exists but was NOT in my revision ownership — needed fixes are in
  `docs/notes/wf-events-requests.md`.

## Research constraints (round-1 session; unchanged)
- WebFetch blocked by the egress proxy; every cited source verified from search-result snippets of the original
  publisher. acquisition-integration still cites only a vendor KYC survey (no integration guide could be opened) —
  its evidence_note says so; a reviewer with web access should add 1–2 M&A treasury integration guides.
- Tornos "up to 43 hours from 1 March 2015" verified from snippets only (noted in the source entry).
- US Chapter 11 priority for recently delivered goods is described only generically.

## Consistency choices (updated)
- Helvetic: canonical financials used everywhere (EBITDA ≈ CHF 78m, net debt ≈ CHF 106m, ≈ 1.36x; the old
  "CHF 115m / 1.5x" assumption in this file is **withdrawn**). No cash pool; Lea prepares, Daniel decides.
- Currency-shock example is dated Thu 8 Oct 2026 so the pre-rollover drawn state (CHF 35m + EUR 27m) and the review's
  EUR 27m arithmetic hold; it is a separate event from the shared Tue 17 Nov 2026 scenario.
- Alpine: payroll ≈ CHF 2.4m/month for ~320 staff; 13th salary in December; line CHF 12m with CHF 3m drawn at the
  start of the squeeze; minimum cash CHF 1.5m (scenario assumption — see request 5 in wf-events-requests.md).
- GlobalChem: CSAs with two banks (threshold EUR 25m) labelled illustrative.

## Requests for other authors
See `docs/notes/wf-events-requests.md` (compare/wf-events.yaml stale cells; Alpine cash-floor canonisation; exemplar
group-cash vs net-debt tension; Project Lario / Norvia hypothetical collision).
