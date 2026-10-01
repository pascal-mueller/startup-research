# Review: Cash & liquidity workflows (planning/investment/funding) — round 1

Scope reviewed: `content/workflows/liquidity-planning.yaml`, `content/workflows/surplus-cash-investment.yaml`,
`content/workflows/funding-subsidiary.yaml`, plus `content/glossary/wf-cash.yaml` and `content/sources/wf-cash.yaml`
(id cross-check). Gold-standard context (not re-reviewed): `daily-cash-positioning.yaml`, `cash-forecasting.yaml`.
Ground truth: `content/companies.yaml`, "Canonical facts clarified after exemplar review" in `docs/AUTHORING.md`.

Verification performed: `npm run check` = **0 errors, 0 warnings** (all `terms:`, `sources:`, `related:` ids resolve —
no MISSING refs). Screenshots of all three routes via `scripts/shot.mjs` — **no MISSING refs, no runtime errors**; PNG of
/workflows/surplus-cash-investment read (full page renders: all sections, worked-example table, by-size tabs, sources).
Claims re-verified this round via WebSearch against original publishers are marked **VERIFIED**; nothing in this module
needs an **UNVERIFIED (R1)** tag except the AFP "about 80%" allocation figure (see below).

## Scores (1–10)
factual accuracy: 7 | workflow realism: 8 | pedagogical quality: 8 | concreteness: 6 | source quality: 8

## Critical errors (must fix)

**1. The December 2026 cash scenario contradicts the gold-standard 13-week forecast (CHF 59.5m vs ~CHF 25m at year-end).**
- `liquidity-planning.yaml`, example: *"Group cash is CHF 45m … | Q4 2026 | 45.0 | +24.0 | −8.0 | −1.5 (bond coupon) | **59.5** |"*
- `surplus-cash-investment.yaml`, example: *"Year-end collections have lifted Helvetic's group cash to about **CHF 59.5m** (see [liquidity planning])."*
- But `cash-forecasting.yaml` (exemplar, prepared Mon 23 Nov 2026, opening CHF 35m): *"Wk 5–6 | 21 Dec – 1 Jan | **23.0 → 25.6** | **Quiet weeks, low receipts**"* and *"9–13 | 18 Jan – 19 Feb | 43.2 → 52.6 | … **receipts from strong Q4 shipments**"*.

The exemplar's story is that cash dips to ~18m on 14 Dec and the year-end collections arrive in **Jan–Feb**; the new
workflows close 31 Dec 2026 at CHF 59.5m and attribute it to "year-end collections" landing in December. The **shape of
Q1 2027 also conflicts**: liquidity planning has Q1 = *"−4.0 (bonuses, tax, inventory build)"* closing 48.5 (a net
drain), while the exemplar forecast rises 25.6 → 52.6 through mid-Feb (+27m). A ~CHF 34m disagreement about the same
quarter-end and opposite Q1 directions, in an app whose scenario is meant to be shared. The entire surplus-cash worked
example (the CHF/EUR/USD allocation, the CHF 15m repayment, "surplus lasts until the May dividend") rests on the 59.5m
figure. Fix direction: rebuild the liquidity base case and the surplus example onto the exemplar's trajectory. The
narrative survives beautifully: a **February/March 2027** surplus example (cash ≈ CHF 50m per the exemplar, receipts
from strong Q4 shipments landing) with the 15-January rollover repayment referenced as already executed, or a December
example with a much smaller surplus where the CHF 15m repayment is justified by the January–February receipts (exactly
what the exemplar has Daniel *"penciling in … to be confirmed with the first January forecast"*). Whichever path, the
quarter-end closing-cash lines must tie to cash-forecasting's week table.

**2. RCF drawn/undrawn is not reconciled across the two workflows (140 vs ~165).**
`liquidity-planning.yaml` holds *"Undrawn RCF | 140"* constant in every quarter through Q3 2027 and computes *"Net debt
at the end of the horizon is 160 − 34.5 = CHF 125.5m"*. But `surplus-cash-investment.yaml` (December) decides to
*"Repay CHF 15m at the 15 January rollover"* and *"redeemed on 15 January to repay EUR 10m of the RCF loan at its period
end"*, checking it *"still leaves roughly CHF 165m undrawn"*. From mid-January 2027 gross debt is ≈ CHF 136m and undrawn
≈ CHF 165m, so the plan's Q1–Q3 2027 rows and the 1.8x leverage line are stale on their own scenario (horizon-end
leverage would be ≈1.45x). Fix direction: show the planned January repayment in the liquidity base case (undrawn 140 →
~165 from Q1 2027) or date-stamp the plan ("as of the October review, before the January repayment decision") and add
the updated row.

**3. HM Inc.'s USD flows contradict between funding-subsidiary and surplus-cash.**
`funding-subsidiary.yaml` (October 2026): *"HM Inc.'s US controller asks Daniel for USD 6m … the need peaks at USD 6m in
Q1 2027"* — with execution in the same narrative (*"Daniel buys USD 6m spot … The USD is sent via the global bank to
HM Inc.'s account"*). `surplus-cash-investment.yaml` (December 2026) then shows *"USD at HM Inc. (USD 5m; USD 2m
operating) | USD 3m | **3+ months** | … USD 3m into a US government MMF"*. Either the USD 6m arrived and the
Q1-2027 peak need (within three months) makes the USD 3m earmarked, not "surplus for 3+ months" — or the USD 3m is
genuinely spare and Lea's own validation step (*"whether part could be covered by…"*) should have cut the request. (The
exemplar's 17 Nov position shows HM Inc. at USD 3.1m, so the loan settles after that date — say when.) Fix direction:
make the December USD row "USD …m loan proceeds, of which USD …m earmarked for the demo-centre/inventory spend, USD 3m
to the government MMF for 4–8 weeks", and align the two narratives.

**4. China dividend WHT: the fact pattern gets the 5% treaty rate; the example uses 10%.**
`funding-subsidiary.yaml`: *"of the CNY 22.5m distributable, withholding tax (**10%, or a lower treaty rate if it
applies**) is deducted; the net ~CNY 20m (≈ CHF 2.3m)"*. Evidence: China–Switzerland DTA (2013) Art. 10(2): *"5 per
cent … if the beneficial owner is a company (other than a partnership) which holds directly at least 25 per cent of the
capital of the company paying the dividends; 10 per cent in all other cases"* (agreement text on admin.ch;
KPMG China Tax Alert 30/2013). HM Suzhou is wholly owned by the Swiss parent, so 5% applies (subject to beneficial
ownership / the treaty's limitation-of-benefits clause) → net ≈ **CNY 21.4m ≈ CHF 2.4m**, not ~20m/2.3m. The registered
source (`china-briefing-dividends`) only records the Hong Kong example ("5% for qualifying Hong Kong holding
companies"), suggesting the Swiss treaty rate was never checked. The hedge makes this not-quite-false, but a worked
example about tax-efficient funding that plans on the domestic 10% for its own country pair is the kind of thing a tax
practitioner flags instantly. Fix direction: use 5% with the conditions in one clause (or show 10% statutory / 5%
treaty side by side), update the source note, and fix the glossary `statutory-reserve` example if the numbers move.

**5. Canonical Helvetic financials drift in the liquidity example (EBITDA 70 vs 78; implied net debt 115 vs 106).**
`liquidity-planning.yaml`: *"with EBITDA of about CHF 70m, leverage is ~1.8x"* and stress *"cuts EBITDA from 70 to 50"*.
Canonical (AUTHORING, 30 Sep 2026 LTM): **EBITDA ≈ 78m, net debt ≈ 106m, 1.36x** (which implies group cash ≈ CHF 54m
against the RCF 35m + EUR 27m and the CHF 100m bond). The example's own opening position (cash 45, gross debt 160) gives
net debt 115 at the start, not 106, and base-case EBITDA 70 is 8m below LTM with no explanation. (cf.
`docs/reviews/companies-size-r1.md` critical error 1 — the same trio is broken there; this needs one coordinated fix.)
Fix direction: bridge the opening position explicitly (cash at the October review vs the 30 Sep LTM balance sheet) and
either use EBITDA ≈ 78 or state "Marco's 2027 budget: EBITDA ≈ 70 after the order slowdown" before the stress "70 → 50".

**6. "Hidden profit distribution" is applied in the wrong direction (glossary example + failure mode).**
`glossary/wf-cash.yaml`, `hidden-profit-distribution` example: *"Alpine had lent its **US subsidiary** money
interest-free for years; its tax adviser warned that the Swiss tax authority could treat the missing interest as a hidden
profit distribution"* (professional: *"… potentially 35% withholding tax on the deemed dividend"*); `funding-subsidiary`
failure mode: *"below-safe-harbour **lending** to related parties may be treated as a hidden profit distribution"*.
Direction matters. The constructive-dividend/35%-WHT consequence attaches to a benefit conferred on a **shareholder**
(e.g. a Swiss company lending cheaply to its own shareholder). A Swiss parent lending below-market to its **subsidiary**
(Alpine → Alpine Inc.; HM AG → HM Inc.) benefits a company it owns: the standard Swiss consequence is **imputed interest
income at the lender** (and possibly a hidden capital contribution at the sub), not a taxable deemed dividend with 35%
WHT. Evidence: ESTV practice as summarised for 2026 (AccountEX guide, 2026-07): *"If the rate is below the minimum (for
loans from the company **to a shareholder**), the shareholder receives a taxable economic benefit"* — the 35% WHT is
attached to that deemed dividend. Fix direction: split the two directions in the glossary and rewrite the Alpine
example ("the tax authority would impute the missing interest as income of Alpine AG — and the adviser noted the
constructive-dividend risk would arise if the benefit had flowed to Alpine's own shareholders").

## Missing concepts

- **Swiss 10/20 non-bank rule / Swiss WHT on intra-group interest.** `funding-subsidiary`'s evidence_note cites
  `bk-non-bank-rules` (*"Why Swiss withholding tax and the 10/20 non-bank rules shape group financing is explained by
  Bär & Karrer"*) but the concept appears **nowhere in the body**. For a Swiss group it is a genuine structuring
  constraint on intercompany and external borrowing (and a good interview question). One sentence in step 5 ("interest
  on Swiss borrowings from non-bank related lenders can fall into Swiss 35% interest WHT under the 10/20 rule; the
  intra-group exemption has conditions") or drop the cite.
- **GBP and CZK surplus.** Helvetic holds GBP and CZK (companies.yaml; the exemplar's 12-account table shows GBP 1.0m,
  CZK 30m). The surplus example's pots (CHF 26 + EUR 15 + USD 5 + CNY 60m ≈ CHF 51m equivalent) do not reconcile to the
  stated group cash and ignore the GBP/CZK accounts entirely — one row or a footnote ("GBP/CZK stay on current account —
  too small to place") would close both the reconciliation and a real question ("what about the small currencies?").
- **Liquidity vs solvency (Art. 725 has two halves).** The workflow cites only the liquidity-monitoring duty
  (Art. 725(1)); the over-indebtedness/surplus-report duty (Art. 725(2)) is the one that forces capital injections and
  board action — a natural bridge to `funding-subsidiary`'s "negative equity may force equity instead of debt".
- **Facility fees in the buffer-size trade-off.** The commitment fee appears in the surplus example's arithmetic but the
  "how big should the buffer/committed line be" judgment (liquidity-planning judgment 1) could name the trade-off
  explicitly: commitment fee on the undrawn line (~0.4% in the example) vs cost of a crisis. Minor.

## Unrealistic workflow descriptions

- **The CFO is missing from both money-moving worked examples.** Canonical: *"Thomas (CFO) co-signs payments above
  CHF 2m"*. The funding example moves USD 6m ≈ CHF 4.8m (*"the agreement is signed by HM AG's two authorised
  signatories…"* — no Thomas) and decides a 2-year loan as *"Daniel and Claudia … choose A"*, while the people section
  promises *"CFO / boards of both entities: Approve above treasury's limits"*. The surplus example repays CHF 15m +
  EUR 10m (≈ CHF 24m) at the 15 January rollover with no co-signature shown. The exemplar is scrupulous here
  (daily-cash-positioning: *"Daniel approves option 1 as second signatory"* for EUR 1.5m). Fix: show the CFO in the
  approval chain for the USD 6m transfer and the January repayments (or state the authority matrix exempts treasury
  deals — but then say so).
- **Covenant projection is computed "at the end of the horizon" (Q3 2027), not at the test dates.** companies.yaml:
  covenants *"tested semi-annually"* and the workflow's own data section says *"at 30 June and 31 December"*. The stress
  table's *"Stress result at the end of the horizon … 3.3x — breach"* should be projected at 30 Jun 2027 / 31 Dec 2027;
  that is what the covenant-monitoring workflow will teach and what banks look at.
- **Headroom definition slips inside the liquidity example.** Point 3: *"repaying the bond from the RCF would in any
  case cut undrawn headroom from 140 to about 40 — below the CHF 50m policy minimum."* Under the workflow's own headroom
  definition (cash − trapped − minimum + undrawn), the bond-from-RCF move leaves net debt and cash unchanged, so total
  headroom ≈ 17.5 + 40 = 57.5m > 50m; and by 2028 the RCF is inside its final year and, per the example's own rule
  (*"from late 2027 the RCF drops out of headroom"*), counts as zero anyway. The narrative conclusion (2028 refinancing
  is unavoidable) is right; the arithmetic mixes an undrawn-only number with a total-headroom policy minimum. Also note
  the internal rule conflict: step 1 says counted facilities are *"not expiring within the horizon"* (24 months would
  exclude the RCF today) while the example uses "drops out in its final year" (12 months). Pick one.

## Vague / generic passages

Remarkably few — these are among the most concrete workflows in the app (named people, systems, cut-offs, register,
PDF-to-model re-keying). Two softer spots:

- `surplus-cash-investment`, step 4 ("Collect quotes") names the mechanics well but the **who decides the counterparty
  shortlist** is implied rather than shown; a half-line ("Lea pulls the approved list from the policy annex; a bank not
  on it needs Thomas's exception approval") would kill the last generic sentence.
- `liquidity-planning`, people/Board row and `by_size.multinational` ("liquidity metrics aligned with rating-agency
  methodology") are the only places where the reader is told "it is aligned" rather than shown with what. The GlobalChem
  companies cell is better (sources-and-uses shape) — move that phrasing up.

## Unsupported or mis-cited claims

- **AFP 2025 "about 80% of short-term balances … bank deposits the largest single share (~46%)"** — **partially
  verified**. The AFP press release (2025-06-17, financialprofessionals.org — original publisher) confirms *"61% …
  safety"*, *"Bank products … cited by 46% of survey respondents as their **primary choice**"*, *"20% … government
  MMFs"*. It does **not** state the ~80% combined-allocation figure, and the registered source note's framing
  ("bank deposits ~46% of short-term investments") reads as share-of-balances while the press release says
  share-of-respondents. **UNVERIFIED (R1)** as written; fix the wording to match whichever the report chart says
  (the 2026 edition's Invesco summary does state an allocation framing: 83% combined, bank deposits 42%).
- **`estv-safe-harbour-2026` source note records only the CHF rates** while the worked example depends on the
  foreign-currency rates. **VERIFIED this round**: ESTV 2026 circulars (published 29–30 Jan 2026, per Deloitte
  Switzerland, 2026-02-03) set minimums **CHF 0.75% (equity-financed), EUR 2.5%, USD 4%** (VATupdate summary of the
  ESTV release, 2026-02-06). The workflow's *"EUR 2.50% and USD 4.00%"* and *"0.75% minimum for equity-financed CHF
  loans"* are correct — record them in the source note and drop the *"should be checked against the ESTV circular"*
  hedge (and fix the glossary example's "equity-financed" phrasing: the Deloitte text calls 0.75% a floor applying to
  CHF loans generally, with the debt-financed floor computed as cost-plus-spread).
- **S&P 1.2x** — **VERIFIED** against S&P's own criteria text (*"A/B of 1.2x or more over the upcoming 12 months"* for
  the adequate descriptor). `sp-liquidity-descriptors` is the 2019 methodology edition; the threshold is unchanged in
  current criteria, but note the year.
- **EU MMF thresholds** — **VERIFIED** against Regulation (EU) 2017/1131 Art. 24 (EUR-Lex): short-term LVNAV/public-debt
  CNAV: ≥10% daily maturing, ≥30% weekly maturing, WAM ≤60d, WAL ≤120d. Both the workflow and `mmf-types` state this
  correctly.
- **SNB 0% (Sep 2026), SVB full protection, China statutory reserve 10%/50%** — consistent with registered sources and
  corroborated in my searches. Fine.
- **`pwc-gts-2025` is listed in `liquidity-planning`'s `sources:` but cited nowhere** in body or evidence_note; use it
  (e.g. for "cash and liquidity management is a top priority") or remove it. `eact-2025` / `act-hsf-debt-2025` claims in
  the evidence_note match their registered notes ("long-term funding" is #2 in the EACT ranking — "among top priorities"
  is fair).

## Better example opportunities

- **Give the reverse stress test a number.** Step 7 teaches it and the example narrates the forward stress; one line
  closes the loop: "the reverse answer: at 3.25x and net debt ≈165, EBITDA below ~CHF 51m breaks the covenant — a 27%
  fall without a dividend cut; with the dividend cut, ~CHF 45m." Cheap, and it is the most quotable sentence in the
  workflow.
- **Counterparty-limit table in the surplus example.** The five-bank CHF 20m limit is currently a prose aside; a
  5-row "bank / current-account / deposits / fund / headroom" table would make step 3's limit check concrete and show
  why bank A gets no EUR deposit.
- **Show one intercompany loan register row** (principal, rate, reference, interest period, agreement ref) in the
  funding example — the register is named in systems/manual_work/company cells but never shown.
- **Show an intra-month low point** in the liquidity table (the workflow warns about month-end masking troughs; every
  row is a quarter-end).

## Minor issues

1. **Buffer vocabulary drift** — five labels for two concepts across the module: "minimum operating cash", "policy
   minimum cash", "operating minimums", "operating buffer", "safety buffer", "parent buffer". The exemplar defines it
   once ("Two different floors… minimum operating balance per account; the CFO's group minimum liquidity, Helvetic:
   CHF 10m, held at the parent"). Adopt that wording, and link `cash-buffer` / `minimum-operating-balance` in
   surplus-cash step 1 (currently unlinked prose).
2. **Kleio's CHF 8m ladder has two structures**: `laddering` glossary example ("eight CHF 1m deposits maturing
   monthly, each just before the month's payroll") vs surplus-cash companies cell ("~CHF 8m in 3–6-month CHF deposits").
   Pick one.
3. **Bond coupon convention unstated** (liquidity example: "−1.5 (bond coupon)" in Q4 2026 only). A CHF 100m bond paying
   ~1.5% annually is fine; if semi-annual a second coupon lands inside the horizon. One word ("annual coupon, paid
   November") fixes it.
4. **`safe-harbour-rates` glossary** says the circulars set rates "for loans between related parties"; the safe harbour
   is anchored in shareholder/related-party relationships (shareholder loans). Sibling-company loans (e.g. HM Suzhou →
   HM Inc. in option D) are not covered by the ESTV floors and need benchmarking — worth one clause, since option D is
   exactly a sibling flow.
5. **Signing authority on the surplus example's January repayment** — fold in with critical/realism item 1.
6. `funding-subsidiary` reference "IC LOAN HMAG-HMINC-2026-03" reads as the third 2026 loan; if it is the first,
   "2026-01" is more natural (or explain the numbering).
7. Positive check, recorded so it isn't "fixed" accidentally: the **0% CHF discipline is handled correctly everywhere**
   (CHF surplus → repay the RCF at the 15 Jan rollover, not deposits; Alpine repays its line first; Kleio has no debt;
   EUR/USD at €STR/SOFR is the stated exception), and the **EURIBOR interest-period / break-cost constraint** and the
   **forward-points parity** in the funding example (hedged return ≈ zero) are correct and well taught. Internal
   arithmetic that I re-computed all checks (base-case quarters, stress net debt 165.5/145.5/137.5, leverage 3.3x/2.9x/
   2.75x, the 0.7% × 15m × 4/12 ≈ CHF 35k saving, EUR 14k, USD 27k, CNY 25m → 2.5 reserve → 22.5 → WHT → ~20m). The
   nice cross-file touches (bank A's CHF 14m matching the exemplar's positioning table, "roughly CHF 165m undrawn",
   "three business days' notice", interest periods to 15 January) are exactly right — the critical errors above are
   cross-file reconciliation failures, not carelessness in the mechanics.

## Verdict: REVISE

Workflow realism, pedagogy and sourcing are strong (all ≥8 territory), but the worked-example concreteness fails the
module's own consistency standard: the December 2026 cash trajectory contradicts the gold-standard 13-week forecast
(critical 1–3), the example does not tie to the canonical Helvetic financials (critical 5), and two tax mechanics (China
WHT treaty rate, hidden-profit-distribution direction) are wrong for their own fact patterns (critical 4, 6). Fix the
six critical items and the module comfortably passes.
