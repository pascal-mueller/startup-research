# Review: Events & crises workflows — round 1

Files reviewed: `content/workflows/acquisition-integration.yaml`, `content/workflows/currency-shock.yaml`,
`content/workflows/liquidity-crisis.yaml`, `content/glossary/wf-events.yaml`, `content/sources/wf-events.yaml`,
`content/compare/wf-events.yaml`. Cross-checked against `content/companies.yaml`, the canonical facts in
`docs/AUTHORING.md`, the gold-standard exemplars `daily-cash-positioning.yaml` / `cash-forecasting.yaml`, and
`docs/reviews/exemplars-r1.md`. All ids in `terms:`, `sources:`, `related:` and glossary `related:` resolve:
`npm run check` = **0 errors, 0 warnings**. Rendering: `node scripts/shot.mjs` for
/workflows/liquidity-crisis, /workflows/acquisition-integration, /workflows/currency-shock — **no MISSING refs, no
runtime errors**; PNG inspected, page and worked-example tables render correctly.

## Scores (1–10)
factual accuracy: 7 | workflow realism: 8 | pedagogical quality: 8 | concreteness: 8 | source quality: 7

## Critical errors (must fix)

1. **Helvetic baseline leverage contradicts the canonical financials** — `currency-shock.yaml` (example, covenant
   check): *"LTM EBITDA CHF 78m, net debt ~CHF 115m → 1.5x. Even with a full-year EBITDA hit of CHF 11m, leverage ≈
   1.7x against 3.25x."* AUTHORING.md ("Canonical facts clarified after exemplar review") fixes
   **net debt ≈ CHF 106m; net debt/EBITDA ≈ 1.36x** at 30 Sep 2026. The 115m/1.5x figure comes from the pre-canonical
   assumption in `docs/notes/wf-events.md` (bond 100 + 60 drawn − 45 cash) and contradicts the binding spec. The
   stale baseline also leaks into `liquidity-crisis.yaml` (helvetic cell: *"leverage rises from 1.5x to about 1.8x"*)
   and `compare/wf-events.yaml`. Fix: use 106m / 1.36x everywhere; the 11m EBITDA hit then gives ≈ 106/67 ≈ 1.6x
   (say "≈ 1.4x → ≈ 1.6x"), and the liquidity-crisis stress should be re-derived from 1.36x. Note for the
   coordinator: the exemplars' group cash (~CHF 41m on 17 Nov in daily-cash-positioning; ~CHF 35–52m in
   cash-forecasting) and canonical net debt 106m are themselves in tension (106m implies ~CHF 54m cash given
   100 bond + 35 CHF RCF + ~25 EUR drawing); wf-events must still follow canonical, but the exemplar tension is
   worth resolving once, centrally.

2. **"RCF and bond are in CHF, so net debt hardly moves"** — `currency-shock.yaml` (example, 13:45 covenant check).
   Canonical: **RCF drawn CHF 35m + EUR 27m**. The group does have EUR 27m of drawn debt; an 8% EUR/CHF fall
   *reduces* the CHF value of that drawing (≈ CHF 2m), a real and quotable point. Related: the same example's
   balance-sheet line — *"EUR receivables, EUR cash, EUR 40m loan to HM Deutschland (EUR 25m swapped) — net EUR 22m"* —
   does not include the EUR 27m drawing as a negative item. A treasurer computing the net EUR balance-sheet
   position on shock day would net the drawing (or explicitly say it is swapped/otherwise hedged). Fix: reword to
   "the bond is in CHF and only EUR 27m of the RCF is drawn in EUR, so net debt moves by about CHF 2m", and either
   include the EUR 27m in the net EUR 22m line or explain its treatment.

3. **Pricing response points at the wrong customers** — `currency-shock.yaml` (example, Tuesday committee):
   *"sales introduces a CHF-denominated surcharge on new quotes for non-EU customers and shortens EUR quote validity
   to 30 days."* The shock is EUR/CHF: the eroded margin is on **EUR** revenue (EUR ~50% of CHF 650m). USD/CNY/GBP
   customers are untouched by this move, while EU customers — the exposed ones — get only shorter quote validity.
   The classic 2015 response (Swissmem: 51% cut prices in Mar 2015, 69% in H1 2015) was EUR price increases /
   reduced discounts, EUR-denominated surcharges, or invoicing EU customers in CHF. Fix: reverse the direction
   (e.g. "EUR price increase / surcharge on new EUR quotes; for non-EU customers unchanged; quote validity for EUR
   quotes cut to 30 days"), or justify the current wording. Same pass: step 9's *"price increases or surcharges in
   CHF terms"* is ambiguous and should name the currency in which prices move.

## Missing concepts

- **The signatory gap on Day 1** (acquisition-integration): revoking the founder's mandate and EBICS access
  immediately, while new mandates and commercial-register filings (Handelsregister: days to weeks) are still being
  processed, leaves a window in which *nobody* is formally entitled to sign on the target's accounts. In practice
  this is handled with local powers of attorney, an interim authorised signatory kept in place, or advance-dated
  mandates. This is one of the real messes of the first weeks and the workflow currently presents Day-1 control as
  cleaner than it is.
- **Completion accounts / post-closing price adjustment and escrow release** (acquisition-integration): locked box
  is well covered, but the example parks EUR 5m in escrow and never mentions how or when it comes back
  (completion-accounts settlement, leakage claims, earn-outs). One sentence would complete the price-mechanism story.
- **Hedge accounting vs reporting framework** (currency-shock): "hedge-accounting documentation and effectiveness"
  is IFRS 9 territory. Helvetic reports under **Swiss GAAP FER** (canonical), where hedge accounting is at best
  limited; the step is really a GlobalChem (IFRS) concern. A one-line nuance would prevent a beginner assuming
  every company does hedge accounting. Same for "in equity (OCI)" — FER has a translation reserve in equity, not
  IFRS-style OCI.
- **Payroll-side levers in a liquidity squeeze** (liquidity-crisis): short-time work ([term:short-time-work],
  already in this stream's glossary) and wage-payment timing are cash levers in Switzerland/Germany and would sit
  naturally next to the capex/hiring freezes — currently only in currency-shock's structural step.

## Unrealistic workflow descriptions

- The pricing response above (critical error 3) is the only place where a treasurer who lived 2015 would object to
  the sequence itself. Otherwise all three workflows read as lived practice: the frozen trading blotter and
  forgotten stop orders filling in the gap (currency-shock step 2), "draw the committed line while the conditions
  are clearly met" because MAC is a draw-stop (liquidity-crisis step 4), guarantee lines dying with the repaid
  facility (acquisition example week 2), banks re-running KYC and re-asking for the same documents, credit
  insurers cutting suppliers stretched past tolerance. These details are exactly right.
- Minor: `liquidity-crisis.yaml` helvetic cell — *"a large Chinese distributor stops paying CNY 40m … leverage
  rises from 1.5x to about 1.8x in the stress case"*. CNY 40m ≈ CHF 4.5m; that alone cannot move leverage from
  1.36x (canonical) to 1.8x. If the stress case includes a broader China deterioration, say so; otherwise the
  numbers overstate the effect.
- Minor: `acquisition-integration.yaml` example — *enterprise value EUR 120m* with uses of price 90.7 + escrow 5.0 +
  debt repay 22.0 (= equity 95.7 + debt 22 = EV ≈ 117.7) + fees 2.3 = 120.0. The "Total 120.0" row conflates EV with
  transaction costs. Either state "total funding requirement EUR 120m including fees" or make EV ≈ 117.7.

## Vague / generic passages

- `acquisition-integration.yaml` step 10 ("Bring the target under group policy") is a list of topics rather than an
  action with an object: who presents what to whom, in which document, and what "applied" means at day 100. The
  day-100 checklist in the example (control / visibility / financing / policy) is the concrete version — fold its
  criteria into the step.
- Everything else is concrete. The manual_work and failure_modes sections are unusually good ("a bank that
  discovers a problem from overdraft usage or a missed covenant certificate reacts defensively").

## Unsupported or mis-cited claims

- **Burckhardt Compression — mis-cited twice** (`currency-shock.yaml` step 9; `sources/wf-events.yaml`
  `burckhardt-ar-2014`). Verified from the publisher's own release and the FY2014 annual report
  (burckhardtcompression.com, 9 Jun 2015): the **Compressor Systems segment's** order intake fell 7.9%
  (CHF 355.6m vs 386.3m) — **group** order intake fell only 0.6% (514.1 vs 517.1) — and the stated reason is
  "customer decisions to postpone several large projects" ("Der Hauptgrund liegt in der kundenseitigen Verschiebung
  einiger grosser Projekte"). The report does **not** attribute this to the SNB decision (the franc's impact is
  discussed separately, re guidance/translation). Fix: "Burckhardt Compression's compressor-systems order intake
  fell 7.9% in the fiscal year that contained the floor removal, which the company attributed mainly to customers
  postponing large projects" and delete the "as a direct consequence of the SNB's decision" wording from the source
  note.
- **Swissmem figures in the source note do not match the surveys** (`swissmem-2015-franc` note: "more than
  three-quarters of members surveyed in July 2015 had reduced prices"). Verified from Swissmem's own releases
  (swissmem.ch, 26 Mar 2015 and 19 Aug 2015): the Feb/Mar 2015 survey (with BAK Basel) found **51%** had been
  forced to cut prices, 63% expected margin declines of ≥ 4pp, 31% expected an operating loss, and **16%** planned
  to relocate part of the value chain at 1.05; the **June 2015** survey (>400 participants) found **69%** cut prices
  in H1 2015 and **18%** considered relocating part of production at 1.05 — and, usefully for this workflow,
  **77%** had shifted cost blocks into EUR (natural hedging). The workflow text ("widely cut prices and some
  planned partial relocation") is fine; the source note's "three-quarters … in July 2015" is wrong and can now be
  replaced with these exact figures.
- **Clariant bonus targets reviewed February 2015** (`clariant-ar-2015-bonus`): **UNVERIFIED (R1)**. Could not be
  reproduced from publisher search results this session (only the 2012 AR and later integrated reports surfaced).
  The claim is plausible and low-stakes; keep it but mark it unverified in the note, or drop it.
- **Tecan AR 2014 subsequent-events wording** (`tecan-ar-2014-subsequent`): **UNVERIFIED (R1)** — could not reopen
  the note this session. The characterisation is cautious; acceptable as "example of disclosure practice" with an
  unverified marker.
- **Verified exactly (good):** Roku 8-K, 10 Mar 2023 — "approximately $487 million … approximately 26% of the
  Company's cash and cash equivalents … largely uninsured" (SEC EDGAR); US Treasury/Fed/FDIC joint statement,
  12 Mar 2023 ("Depositors will have access to all of their money starting Monday, March 13"); Credit Suisse 1Q23 —
  "Customer deposits declined by CHF 67 billion in 1Q23", net asset outflows CHF 61.2bn concentrated in the second
  half of March (SEC/UBS); NeuGroup — 81% of treasuries reassessing, 69% planning fundamental changes, deposit
  diversification the most common strategy (connect.neugroup.com); Tornos — weekly hours at Swiss sites raised to
  "up to 43 hours as from March 1, 2015" (company media release, 25 Feb 2015); SNB 15 Jan 2015 press release
  (floor discontinued, sight-deposit rate −0.75%, 3M Libor target −1.25%/−0.25%).
- **Art. 725 CO is CORRECT — resolve the author's own flag.** The revised Swiss company law (in force 1 Jan 2023)
  puts the duty to monitor *Zahlungsfähigkeit* (solvency/liquidity) and to act on threatened illiquidity explicitly
  in **Art. 725(1)–(2) CO** (Art. 725a is capital loss, 725b over-indebtedness) — confirmed against the statutory
  text and law-firm commentary (Walder Wyss, "Pflichten des Verwaltungsrats in finanziellen Krisenlagen nach neuem
  Aktienrecht", 2023). `evidence_note` can drop the "should be checked" caveat and cite this.
- Jones Day on EMIR margining: accurate as summarised (NFC− corporates have no mandatory VM; physically settled FX
  forwards/swaps exempt from IM). Keep the "Swiss FinfraG follows similar logic" hedge.

## Better example opportunities

- **Currency-shock covenant line:** show the actual covenant formula once (EBITDA and net debt measurement in CHF,
  average vs closing rates for FX items — the data section flags this but the example never applies it) using the
  canonical 1.36x baseline. It is the single best "how a covenant actually behaves in an FX shock" moment in the
  module and it is currently arithmetically inconsistent.
- **Alpine 13-week table:** the columns do foot exactly under sensible phasing (stress = expected − DE 3.1 −
  CHF 0.3m/wk from week 5; stress+levers = +5.0 drawing from wk 1, +1.6 factoring from wk 4, extensions +1.2 in by
  wk 8 and repaid ~0.4/wk in wks 9–11, capex +0.4 by wk 8 / +0.8 by wk 12, hiring +0.1 → +0.2). I re-derived every
  shown row. Add one footnote sentence stating this phasing — right now a lender (or reader) cannot reproduce the
  last column without guessing, and this file is explicitly "the document shared with banks".
- **Acquisition:** one line on the EUR 5m escrow's fate (released on completion-account settlement at month +3)
  and a currency-split pro forma ("RCF drawn: CHF 35m + EUR 27m + CHF 95m new") would make the example
  canonical-exact end to end.

## Minor issues

- `compare/wf-events.yaml` `events-currency-shock`: *"briefs the CFO by 14:00"* vs the example's "14:10" — align.
- Example parentheticals in currency-shock and acquisition-integration say *"CHF 200m RCF with ~CHF 60m drawn"*;
  canonical wording is **CHF 35m + EUR 27m** (the aggregate is right, the split matters for the currency story).
- `liquidity-crisis.yaml` example: the "Expected" column header says "DE paid wk 11" while the narrative has the
  German acceptance/payment in week 10 (an improvement negotiated later — say so explicitly, or align).
- `thirteen-week-cash-flow` `aka: […, TWCF]` — "TWCF" is not practitioner usage; "13WCF" is.
- `sources/wf-events.yaml` `neugroup-svb-2023` URL (neugroup.com/svb-shockwaves-…) — the live page found this
  session is at connect.neugroup.com/public/blogs/svb-shockwaves-updating-bank-counterparty-credit-risk-strategy;
  check the recorded URL resolves (may redirect).
- `glossary/wf-events.yaml` `transition-services-agreement` related id `bank-account-management-term` resolves
  (owner: map stream) but is an oddly named id; not this stream's problem.
- Positive consistency notes: no-cash-pool / Lea-prepares-Daniel-decides / Thomas co-signs above CHF 2m /
  weekly 13-week cadence / CHF 0% rate logic / EUR hedge bands (54% hedged is inside the graded bands) / 2026
  calendar dates (Mon 5 Oct 2026, Fri 30 Oct 2026, Mon 2 Nov, 26 Nov, day-100 ≈ early Feb) all check out. The
  MTM arithmetic (+6.1 on EUR 81m vs 0.853 forwards; −5.2 unhedged 69 × 0.075; −11.3 run-rate; −14.3 translation)
  and the acquisition funds flow (95 + 17.2 = 112.2 = 120 × 0.935) are exact, and the 5-month forward of 0.853
  is right for €STR ≈ 1.9% vs SARON ≈ 0%.

## Verdict: REVISE

The workflow realism — the heaviest criterion — is genuinely strong: a treasurer who has run a Day-1 checklist, a
shock day or a crisis week will recognise the sequence, the people, the meetings and the mess. But the module
contradicts the canonical Helvetic financials in two places (baseline net debt/leverage; "RCF and bond are in CHF"
against the EUR 27m drawing), the worked example's pricing response points away from the exposed currency, and the
2015 evidence trail needs two citation corrections (Burckhardt segment/attribution; Swissmem source-note figures)
plus two unverified markers (Clariant, Tecan). Fix items 1–3 and the citation corrections and this comfortably
passes at 8+ across the board in round 2.
