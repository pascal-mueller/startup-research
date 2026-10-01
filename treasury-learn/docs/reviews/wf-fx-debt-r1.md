# Review: FX/risk & debt/funding workflows — round 1

Scope: `content/workflows/fx-exposure-management.yaml`, `fx-hedging.yaml`, `credit-facility-management.yaml`,
`covenant-monitoring.yaml`, plus `content/glossary/wf-risk.yaml` and `content/sources/wf-risk.yaml`. Cross-checked
against `docs/AUTHORING.md` (incl. "Canonical facts clarified"), `content/companies.yaml`, the gold-standard exemplars
`daily-cash-positioning.yaml` / `cash-forecasting.yaml`, and the shared glossary/sources the module links to.
Verification: `npm run check` → **0 errors, 0 warnings** (all `terms:`, `sources:`, `related:`, `cite:` and `term:`
ids resolve, including cross-stream reuse of `clariant-frm-2020`, `schindler-holding-2021`, `seco-kmu-finanzierung-2021`
(companies-size.yaml), `milltech-fx-2025` (map.yaml), `act-hsf-debt-2025`, `eact-guiding-principles` (core.yaml),
`jonesday-emir-vm-2017` (wf-events.yaml)). Screenshots of `/workflows/fx-hedging` and `/workflows/covenant-monitoring`
show no MISSING refs and no runtime errors; I read the fx-hedging PNG — tables, callouts, term links and the worked
example render correctly.

## Scores (1–10)
factual accuracy: 8 | workflow realism: 9 | pedagogical quality: 9 | concreteness: 9 | source quality: 8

## Critical errors (must fix)

1. **Helvetic's RCF drawn amount is contradicted across the date-ordered Helvetic story.**
   `credit-facility-management.yaml` (worked example, Oct 2026): *"Daniel's decision: roll the CHF loan at **CHF 30m**
   (repay 5m) and the EUR loan at **EUR 35m** (27m + 8m new), both for three months… Drawings after: CHF 30m + EUR 35m
   ≈ CHF 62.7m (31%)"*, settling **Thu 15 Oct 2026**. But the gold-standard exemplars *later in the same story* still
   show the pre-rollover state: `daily-cash-positioning.yaml` (Tue 17 Nov): *"The CHF 35m RCF loan is in an interest
   period to 15 January and cannot be prepaid mid-period"*; `cash-forecasting.yaml` (Mon 23 Nov): *"the CHF 35m RCF
   loan's interest period runs to 15 January… Daniel pencils in a reduction of that loan by CHF 10–15m at the 15 January
   rollover"* and *"CHF 140m undrawn on the RCF"* (140m only reconciles with CHF 35m + EUR 27m ≈ 60.2m drawn).
   Why wrong: 17 and 23 November come after the 15 October settlement, so the CHF loan is CHF 30m and undrawn is
   ≈ CHF 137m. A reader who follows the Helvetic timeline hits three files disagreeing about the same fact.
   Fix direction: either update the two exemplar figures (CHF 30m; "CHF ~137m undrawn"; the "reduce by CHF 10–15m"
   plan still works) or move the rollover example to a later date/adjust amounts so the November scenarios stay true.
   `docs/notes/wf-risk.md` already raises this for month-end-reporting ("after the 15 Oct rollover drawings are
   ≈ CHF 62.7m") but not for the two exemplars. Everything else in the module matches the AUTHORING canonical facts
   (EBITDA 78 / net debt 106 / 1.36x, 60/50/50/40 commitments, Oct 2028 maturity, bond 2028, Swiss GAAP FER,
   15th-of-the-month interest periods, graded bands).

2. **A linked glossary term contradicts the canonical hedge bands.** Both FX workflows list `layered-hedging` in
   `terms:`, but its example in `content/glossary/map.yaml` still says: *"Helvetic's policy band is 60–90% of the next
   quarter's net EUR inflows and **30–60% of quarters 2–4**"*. AUTHORING's canonical bands are Q+2 40–70%,
   Q+3 25–55%, Q+4 0–40%, and the module's own tables show Q3 2027 at 16% and 26% *inside* policy — which
   "30–60% of quarters 2–4" would make a breach. The hover tooltip on a term both workflows depend on therefore
   contradicts the workflow tables. (This is already a documented request from `docs/notes/wf-risk.md` to the map
   stream and is still unfixed as of this review.) Fix direction: map stream to restate the example with the graded
   bands; until then the FX workflows should not point readers at a term whose worked example is wrong.

3. **Worked-example mislabel in covenant arithmetic (small but technically wrong).**
   `covenant-monitoring.yaml`, Part 2: *"Without the pro forma clause (if only post-closing EBITDA counted), the base
   case would be 2.68x"*. 2.68x is 198/74 — i.e. the target's EBITDA counted as **zero**. If only post-closing EBITDA
   counted (Apr–Jun 2027, ≈ CHF 2.5–3m of the CHF 9m LTM), the ratio would be ≈ 198/77 ≈ **2.57–2.60x**. The
   parenthetical describes one convention while the number uses another. Since the whole point of the passage is how
   pro forma EBITDA definitions move leverage, this is worth fixing: either say "≈2.6x (counting only the target's
   earnings since closing)" or "2.68x (ignoring the target's EBITDA until a full LTM has elapsed)". Everything else in
   this example checks: 106/78 = 1.36x, 112/80 = 1.40x, 104/76 = 1.37x, 23x cover = 78/3.4, 113.9/78 = 1.46x,
   198/83 = 2.39x, 208/65 = 3.20x, 213/55 = 3.87x, breach threshold 198/3.25 = 60.9 → 27% EBITDA fall,
   0.45% × CHF 155m ≈ CHF 0.7m pricing step, 200 − 155 ≈ CHF 45m undrawn. Credit-facility arithmetic likewise checks
   to the franc (27m × 2.90% × 92/360 = EUR 200,100; 35m × 0.85% × 92/360 = CHF 76,028; 0.2975% × 139.8m × 92/360
   ≈ CHF 106.3k; 35 + 35 × 0.935 = 67.7m > one-third; 30 + 32.7 = 62.7m < one-third), and the forward quotes in
   fx-hedging are consistent with interest-rate parity (spot 0.9352, 10.7m forward ≈ 0.919 = 1.7% below spot at
   €STR 1.95% vs SARON 0%; swap legs 0.93117/0.92667 consistent with 2.7m/5.7m tenors; 2m × (0.9420 − 0.93117)
   = CHF 21,660; 2m × 0.0045 ≈ CHF 9k of extra points). Dates also check (30 Sep 2026 is a Wednesday → WD2 = Fri 2 Oct;
   5/6/9/12/15/22 Oct 2026 are Mon/Tue/Fri/Mon/Thu/Thu; notice three business days before the 15th).

## Missing concepts

- **Forecast → firm → booked migration double-counting.** The exposure failure modes cover intercompany double-counting
  and copied submissions, but not the classic one: the same EUR receipt moves from "forecast" to "signed order" to
  "booked" across months; if hedge allocation and the three columns are not moved together, the same flow is counted
  twice or hedges are double-allocated. One failure-mode line would close this.
- **An NDF worked line.** `ndf` is in fx-hedging's `terms:` and NDFs get one clause in two `by_size`/`companies`
  entries, but nowhere in the module does the reader see how an NDF actually settles (fixing date, contracted rate vs
  official fixing, cash difference paid in USD/EUR, no delivery). The map.yaml glossary entry is good — a two-line
  GlobalChem INR example in fx-hedging would tie it together (see "Better example opportunities").
- **Option cost anchor.** Options appear in steps/judgment/failure modes, but the reader never learns the order of
  magnitude of a premium (typically a few percent of notional for 6–12 month ATM protection). Without it, "an option
  costs premium whether or not it is used" is abstract; the collar glossary gives zero-premium mechanics but no prices.
- **Derivatives in net-debt definitions.** The covenant "what counts as debt" list (bank loans, bonds, leases,
  guarantees, pension deficits) omits derivative receivables/ISDA close-out netting and restricted cash beyond China —
  a real definitional fight at test dates.
- Minor: the utilisation-fee two-thirds tier is only in the glossary; the workflow mentions "thresholds" in the
  singular. Fine as is, but the example story only ever exercises the one-third tier.

## Unrealistic workflow descriptions

- **Sequence slip in the fx-hedging example.** It is dated *"Helvetic, Thursday 8 October"* (= WD6) but consumes
  Daniel's decision on the two German acceptances, which `fx-exposure-management` dates at **WD7** (*"WD7 — Daniel
  reviews… He asks Lea to show Q4 with and without the two acceptances (EUR 27m vs 31m) and takes that into the
  hedging decision"*). Move the hedging round to Fri 9 Oct or the review to WD6. Otherwise the workflows are the most
  realistic in the set I have seen: named systems per step, deadlines and cut-offs, someone-other-than-the-dealer
  confirmation matching, chasing late submitters "after two reminders", the guarantee line that runs out before the
  RCF does, the bank RM using a guarantee request to raise the RCF renewal, window-dressing called out honestly as
  "common and legally grey". A practitioner would recognise all four.

## Vague / generic passages

- `credit-facility-management` judgment 5: *"Some terms matter only in a downturn; it takes experience to know which
  ones will matter."* — true but aphoristic; name one (e.g. the acquisition basket and the EBITDA add-back cap are the
  terms that matter in a downturn; the margin grid does not).
- `fx-hedging` software: *"A newer category of **hedging-automation** providers targets mid-sized companies with
  rule-based programmes."* — every other tool in the paragraph is named; one example (or a pointer to
  /competitors) would keep the section at the same concreteness.
- Otherwise the module is conspicuously free of "treasury analyses X" filler; the manual-work lists and failure-mode
  detection lines do the founder-usefulness job well.

## Unsupported or mis-cited claims

- **UNVERIFIED (R1):** `credit-facility-management` evidence_note — *"76% of ACT/HSF 2025 respondents expected
  macroeconomic and geopolitical factors to influence debt strategy considerably (41% in 2024)"*. The publisher pages
  (https://www.treasurers.org/hub/research/corporate-debt-report-2025 and
  https://www.hsfkramer.com/insights/2025-05/corporate-debt-and-treasury-report-2025) confirm only the direction
  ("significant increase in respondents reporting material negative impact… far fewer respondents anticipating no or
  minor impact on their 2025 debt strategy"; "91%… cash management"). I could not confirm the 76%/41% pair from the
  original publisher via search. Keep the qualitative claim; mark or drop the number until someone opens the report.
- **Imprecise (minor):** fx-exposure/fx-hedging cite MillTech for *"an average hedge ratio of about 48% and average
  hedge tenor of about 5 months"*. For the same MillTechFX Global FX Report 2025 (750 corporate respondents —
  confirmed by Reuters, https://www.reuters.com/markets/currencies/geopolitical-angst-prompts-over-60-companies-hedge-fx-longer-survey-shows-2025-03-28),
  The Full FX reports **49% and 5.3 months** (https://thefullfx.com/currency-hedging-in-focus-as-volatility-bites).
  Suggest "≈49%, tenor ≈5.3 months". Currentness: MillTech's own later surveys are materially different
  (Corporate Hedging Monitor Q1 2026: 57% / 6.62 months — https://cfotech.co.uk/story/companies-boost-fx-hedging-as-currency-losses-mount;
  UK 2025 report: 53% / 5.52 months). The "indicative only" framing is good; the numbers are now the old end of the
  vendor's own series, which is worth one clause.
- **VERIFIED:** the FinfraG statement (*"the Swiss trade-reporting duty for small non-financial counterparties was
  postponed to 1 January 2028"*) matches the original publisher: admin.ch press release 30 Sep 2022 — *"It also
  decided to put the reporting duty for derivatives transactions into force for small non-financial counterparties
  with effect from 1 January 2028"* (https://www.admin.ch/en/nsb?id=90555). This resolves the "unresolved uncertainty"
  in `docs/notes/wf-risk.md` in the module's favour; I found no evidence the date changed. Two optional currentness
  clauses: (a) the same Federal Council package proposes **abolishing** the small-NFC reporting duty entirely, with
  Parliament to decide before 2028 (https://cms.law/en/che/legal-updates/swiss-federal-council-commissions-revision-of-financial-market-infrastructure-act-fmia);
  (b) the FMIA revision reached the dispatch/parliament phase in 2025–2026
  (https://www.six-group.com/dam/download/company/events/2024/lutz-meyer-finfrag-finmia-revision.pdf).
- **VERIFIED:** SECO/HSLU 2021 — 32% of Swiss SMEs have a bank loan, survey of 2,712 companies
  (https://www.kmu.admin.ch/dam/en/sd-web/Bbiwc3QYYJac/studie-zur-finanzierung-der-kmu-in-der-schweiz-2021.pdf,
  "32 Prozent der KMU haben einen Bankkredit"; https://www.kmu.admin.ch/de/kmu-finanzierung-in-der-schweiz-bankenkredite).
  **VERIFIED:** Loomis 2025 — EUR 415m syndicated RCF, "tenor of five years with two extension options of one year
  each" (https://news.cision.com/loomis-ab/r/loomis-signs-a-five-year-credit-facility-of-eur-415-million%2Cc4118884).
  EMIR dates (Refit delegated reporting 18 Jun 2020; EMIR 3 in force 24 Dec 2024; physically settled FX forwards
  outside EU margin rules) are consistent with the cited ISDA/Linklaters/Jones Day notes. Vendor claims (FXall, 360T)
  are correctly labelled vendor-stated, and "investment-grade facilities often lack financial maintenance covenants"
  is correctly labelled practitioner observation rather than a statistic. Heidelberg's 35% commitment fee is presented
  as one filing, not a market average — correct framing (I did not open the filing; treat as UNVERIFIED (R1) in the
  strict sense, but the claim is bounded).

## Better example opportunities

- **NDF mini-example (fx-hedging, GlobalChem):** "Jonas sells INR 400m forward at 62.50 for the June fixing; at fixing
  USD/INR is 63.50, so the bank pays GlobalChem the USD difference — no rupees move." Two lines would demystify the
  one instrument the module names but never shows.
- **A tender/option line with a price:** e.g. "a 6-month EUR call on EUR 5m with strike 0.94 costs ≈ 1.5–2% of
  notional (≈ CHF 75–100k) whether or not the tender is won" — turns the forward-vs-option judgment into arithmetic
  the founder can repeat in an interview. (Illustrative is fine; say so.)
- **Hedge accounting two-column table (fx-hedging step 7):** one month of EUR 10m hedged forecast sales, market value
  of the forward +CHF 0.2m, with vs without hedge accounting — P&L effect vs equity effect in one small table would
  settle the "hedging volatility" question far faster than prose.
- **A covenant-definition diff table (covenant-monitoring step 1):** "reported EBITDA 74 vs covenant EBITDA 83:
  +6 exceptional, +9 pro forma" — the reconciliation the text describes ("reconcile line by line") deserves to be
  shown once, especially since Project Lario hinges on exactly this.
- **Contrast case for the hedge bands:** show one month where the ratio sits outside the band *passively* (Q4 92%
  case exists) and one *actively* (a deal done above target) side by side — the passsive/active distinction is used
  in two places but never illustrated.

## Minor issues

- **Band-labelling convention is never stated and flips between files.** In fx-exposure/fx-hedging, the current
  quarter Q4 2026 carries the Q+1 band (60–90%) and Q1 2027 the Q+2 band (40–70%); in `cash-forecasting` (23 Nov) and
  the `hedge-ratio` glossary example, Q1 2027 is *"75%, inside the 60–90% policy band"*. Both are defensible (bands
  roll as quarters close), but the manual nowhere says which convention applies, and a learner comparing the two
  tables sees the same quarter under different bands. One sentence — "bands are assigned by quarters from the current
  one and roll forward as quarters close" — would fix it.
- **Unexplained bridge between the October and November Helvetic numbers.** Q1 2027 EUR exposure goes 28.0 → 32.0m
  (Oct 8) → 40m (Nov 23) and hedges 17.0 → 19.0m → 30m. Plausible in business terms (forecast growth, top-ups as Q1
  became the front quarter), but the worked examples read as one story; a bridging clause ("by late November the
  forecast had grown and Daniel had added hedges as Q1 moved into the front band") would prevent a false impression
  of contradiction. Note fx-exposure's own rule — *"the first quarter of the exposure view should agree with [the
  13-week forecast]; large differences mean one of them is wrong"* — is exactly the check a reader will run here
  (32m vs 40m).
- **Implied group cash drifts between streams.** Covenant net debt 106m at 30 Sep (bond 100 + RCF 60.2 drawn) implies
  ≈ CHF 54m cash; daily positioning shows ≈ CHF 41m on 17 Nov and cash-forecasting opens at CHF 35m on 23 Nov. Each
  figure is locally fine, but the three are never reconciled; one clause ("cash drifted from CHF ~54m at September
  close as Q4 working capital built") would make the shared universe feel as tight as the rest of it.
- **FER hedge wording (fx-hedging example):** *"the market value of forwards hedging future sales is recorded in
  equity until the sale is booked"* — under FER 27 §18 it is the change in fair value attributable to the hedge of a
  *highly probable* future transaction that may be deferred in equity (or disclosed in the notes), not the forward's
  whole market value. The glossary (`hedge-documentation`) gets this right; the workflow sentence could use the same
  precision, since "highly probable" is the actual condition.
- **MillTech sample label:** the Global FX Report 2025 surveys 750 corporates *and* 750 fund managers; the corporate
  sample is mid-sized (market cap $50m–1bn). "Survey of mid-sized corporates" is right for the way the module uses
  it; adding "(corporate sample)" would be tidier.
- Trivial: commitment-fee invoice CHF 106,285 vs the recomputation ≈ CHF 106,287 on "average undrawn CHF 139.8m" —
  rounding of the average; immaterial, but if the example wants the reader to recompute exactly, give 139.77m.
- `fx-exposure-management` example title says "an Italian mistake, a missing UK payable" but the table shows the
  missing item as a UK *payable* the UK entity omitted — correct — while the title order implies the Italian mistake
  and the UK gap are the two story beats; fine, just noting the example could name its third beat (the Czech
  out-of-policy exposure) in the title, since it is the one that travels onward into fx-hedging.

## Verdict: REVISE

The four workflows are at or near the exemplars' bar on realism, judgment and concreteness — every worked-example
computation I checked (interest, fees, forward pricing, hedge ratios, leverage, headroom, day-of-week dates) is
correct, the canonical Helvetic financials match AUTHORING exactly, and the sourcing is unusually honest about what
is survey, vendor and synthesis. REVISE is for three small-but-real defects: (1) the drawn-RCF amount contradicts the
November exemplar scenarios across the shared Helvetic timeline, (2) the `layered-hedging` tooltip still contradicts
the canonical graded bands, and (3) the "2.68x without the pro forma clause" label misdescribes its own calculation —
plus the survey-number cleanup (76% → unverified or dropped; 48%/5 → 49%/5.3). None of these is a workflow-realism
problem; all are fixable in minutes-to-an-hour, and with them fixed this module passes comfortably.
