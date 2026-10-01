# Review: Controls & reporting workflows — round 1

Reviewer: independent (fresh context, no stake in the content). Date: 2026-09-30.
Scope: `content/workflows/month-end-reporting.yaml`, `content/workflows/fraud-investigation.yaml`,
`content/workflows/policy-compliance.yaml`, `content/glossary/wf-control.yaml` (all 14 terms read),
`content/sources/wf-control.yaml` (all 4 entries read), cross-checked against `content/companies.yaml`,
`docs/AUTHORING.md` (incl. "Canonical facts clarified after exemplar review"), and the gold-standard exemplars
`content/workflows/daily-cash-positioning.yaml` and `content/workflows/cash-forecasting.yaml` (both read in full).

Verification performed: `npm run check` → **0 errors, 0 warnings** (all `terms:`, `sources:`, `related:`,
`wf:`/`term:`/`co:` ids resolve). Rendering: `/workflows/fraud-investigation` and `/workflows/month-end-reporting`
screenshotted with `scripts/shot.mjs --full` at 1440 px — both render fully (steps, callouts, worked-example tables,
handoffs, evidence notes); the script reported **no MISSING refs and no runtime errors**. Both PNGs read.

Unlike round 1 of the exemplar review, **network access worked in this session**: every fraud statistic was checked
against the original publisher (AFP/AFP-underwriter Truist, FBI IC3, BACS, EPC). The verification table with URLs is
at the end. Statistics are marked VERIFIED or UNVERIFIED (R1) in the text.

---

## Scores (1–10)
factual accuracy: 8 | workflow realism: 9 | pedagogical quality: 8 | concreteness: 8 | source quality: 7

## Critical errors (must fix)
None. I checked every number in the worked examples against `companies.yaml` and the AUTHORING canonical facts and
they tie out (details in the verification appendix): net debt 160.0 − 54.0 = 106.0; 106.0/78.0 = 1.36x and
98.8/78.0 = 1.27x; RCF 60.0 drawn / 140.0 undrawn on a CHF 200m facility; headroom 54.0 − 7.9 + 140.0 − 10.0 = 176.1;
German-bank exposure 9.8 + 0.3 = 10.1 = 101% of a CHF 10m limit, cured back to ~82% by moving EUR 2m; EUR 486.3k −
61.2k = 425.1k loss; forecast accuracy (58.0 − 52.3)/58.0 = 9.8%. Dates work too: 1 Oct 2026 is a Thursday (WD1),
so the pack at 11:40 on 2 Oct matches the glossary's "WD2 12:00" deadline; 13 Oct 2026 is a Tuesday, 11 days after
the 2 Oct payment. The canonical "cash vs RCF at 0% SARON" lesson is applied correctly (reduce the drawing at the
15 Oct rollover instead of placing CHF deposits). The module correctly keeps "Lea prepares, Daniel decides" and
never gives Helvetic a cash pool.

## Major issues
1. **The month-end workflow never names the accounting framework, and its hedge-accounting language is IFRS-flavoured.**
   `month-end-reporting.yaml` (step 5, "Deliver the accounting pack"): *"Where hedge accounting is applied, treasury
   also supplies hedge documentation and effectiveness data."* Helvetic reports under **Swiss GAAP FER** and
   GlobalChem under **IFRS** — the AUTHORING canonical facts make this the module most expected to say so. Under
   Swiss GAAP FER, derivatives fall under **FER 27 "Derivative financial instruments"**, where guidance is limited
   compared with IFRS 9 (KPMG: "Swiss GAAP FER provides limited guidance for financial instruments";
   PwC's 2025 FER guide: "there is limited explicit guidance included in Swiss GAAP FER around…";
   https://www.fer.ch/en/standards/swiss-gaap-fer-27-derivate-finanzinstrumente/). "Effectiveness data" is
   IFRS 9 / ASC 815 vocabulary (even IFRS 9 has no bright-line effectiveness threshold, unlike the old IAS 39
   80–125% test a reader may meet in older material). A Swiss mid-market group's accounting pack and disclosure
   notes (liquidity-risk maturity analysis, market-risk and derivative notes) look different from a listed IFRS
   group's, and a founder interviewing both a Helvetic CFO and a GlobalChem treasurer needs to know why. Fix
   direction: one short paragraph or table row — Helvetic: FER 27, valuations per the group's FER policy, notes per
   FER 23/27 and the CO; GlobalChem: IFRS 9 designation documentation and effectiveness assessment, IFRS 7
   disclosures — and say explicitly which framework drives the "accounting pack" contents. (Do not assert a
   specific FER hedge-accounting mechanism without checking FER 27 text; the safe claim is that the two frameworks
   differ and that "effectiveness data" is IFRS vocabulary.)
2. **"Q3 VAT payment" as a September cash driver contradicts the manual's own VAT calendar.**
   `month-end-reporting.yaml` L201: *"Cash (bank) | 61.2 | 54.0 | Q3 VAT payment and seasonal working capital"*.
   In the same manual, `cash-forecasting.yaml` states "Swiss VAT is usually settled quarterly within 60 days of the
   quarter end" and puts the **Swiss Q3 settlement on 30 Nov at only ≈ CHF 0.8m** (most of HM AG's sales are
   zero-rated exports). German Q3 VAT prepayment falls on 10 Oct (statutory), UK quarter-end 31 Aug is due 7 Oct,
   Italian quarterly IVA is due in the autumn, and no main Helvetic entity has a Q3 VAT payment in September. A
   treasurer cross-checking the two workflows will find a CHF multi-million September "Q3 VAT payment" that the
   forecast calendar says does not exist. Fix: name the entity and the item (e.g. "CZ monthly VAT on 22 Sep; the
   Italian Q2 balance payment"), or make the driver purely seasonal working capital and move the VAT line to
   November, where the forecasting example already puts it.
3. **Two subsidiaries bank at banks that are not in the canonical bank list.**
   `fraud-investigation.yaml` L188/L194: *"Calls the Italian bank's fraud desk"*, *"Via the Italian bank"*;
   `policy-compliance.yaml` L191: *"still on the French bank's mandate"*. `companies.yaml` gives Helvetic exactly
   **five banks: 2 Swiss, 1 German, 1 global bank for US/UK, 1 Chinese bank in China** (12 accounts after
   rationalisation). There is no Italian or French bank. Fix: "the German bank's Italian branch" / "the global
   bank's Italian operation" / "the bank where HM France's account sits", or state once which bank covers
   IT/FR/CZ. This is the same class of canonical drift the exemplar review flagged as systemic; better to kill it
   here before it spreads.
4. **An unsupported survey claim whose own registered sources contradict it.**
   `month-end-reporting.yaml` L331: *"Survey context on the persistence of spreadsheets in treasury comes from
   Deloitte[](cite:deloitte-gts-2024) and PwC[](cite:pwc-gts-2025)."* Neither registered source note supports a
   spreadsheets claim — and `content/sources/core.yaml`'s `deloitte-gts-2024` note explicitly says the earlier
   quoted phrase about spreadsheets "could not be verified verbatim and is no longer quoted". The claim has been
   resurrected after its support was withdrawn. Fix: drop the sentence, or cite and register a survey figure that
   actually reports spreadsheet reliance, verified from the publisher.

## Missing concepts
- **Accounting framework difference (Swiss GAAP FER vs IFRS)** — see major issue 1. This is the single biggest
  pedagogical gap in `month-end-reporting`; the question "what goes in the accounts vs what goes in the treasury
  report, and who decides how a forward is valued" is exactly what a founder will ask.
- **Multilateral netting at GlobalChem.** `companies.yaml` lists "monthly multilateral netting" as part of
  GlobalChem's canonical structure, and month-end is when the netting run happens and the settlement is booked —
  but neither the example, the multinational `by_size` text nor the `companies.globalchem` cell mentions netting.
  Add one line ("Marta's team runs the monthly netting cycle before the close; mismatches are chased by WD1").
- **Collateral / CSA margin reconciliation** for derivatives (multinational tier): margin calls and collateral
  balances are month-end items in the accounting pack and a classic reconciliation gap; nothing in the data list.
- **Fraud: payroll diversion (employee bank-detail change fraud)** — the vendor-master variant is covered
  beautifully, but the mirror variant (an employee's salary redirected after a mailbox compromise) is one of the
  patterns AFP and practitioners name, and it has a different detection path (payroll provider, HR master data).
- **Fraud: the company as the fraudster's cover** — when the attacker changes bank details *in the company's own
  outbound communications* to customers (receivables diversion), treasury/AP becomes the reporter to customers,
  not the victim. One sentence in "scope the damage" would cover it.
- **Instant payments' effect on the response window.** The module says "the first hours decide how much money
  comes back" (L10) and "hours matter" (L96). For an SCT Inst payment (send capability mandatory for euro-area
  PSPs since 9 Oct 2025, per `ecb-ipr`) the money lands in seconds and the practical recall window is **minutes**;
  the realistic statement is "for instant rails, prevention is the only control; for batch/standard rails you have
  hours". The VoP mechanics are covered; the speed implication is not.
- **Whether the paying bank can be liable** (failed name-check, failed fraud screening) — practitioners discuss
  claims against the bank and "who bears the loss" as part of the legal step. Currently absent from the legal role.
- **Interest-rate-risk limits** in the policy contents (gap/DV01 limits, benchmark caps) — the policy outline covers
  FX and hedging ranges well but rate risk only by name.

## Unrealistic workflow descriptions
Very little here — this is the most workflow-realistic module set I have read. Two points:
- `fraud-investigation.yaml` example: on day 11 "The bank sends a fraud recall to the receiving bank and asks it to
  freeze the funds." Realistic as a form, but the text should say plainly that **11 days after credit a recall is a
  formality**; the operative routes at that point are the prosecutor's freeze order, the civil/insurance track and
  the loss-file work. As written, a beginner may think recalls work on an 11-day-old payment. (The example does
  later show the prosecutor's order returning the frozen EUR 61.2k four months on — the fix is one clause at 10:25.)
- `month-end-reporting.yaml` example week collides with the canonical weekly forecast cycle and does not mention
  it: WD3–WD4 (Mon 5 – Tue 6 Oct) is exactly when subsidiaries' Tuesday-noon forecast submissions land and Lea
  consolidates Tue–Wed. Practitioners describe month-end week as "close plus forecast plus everything else" — one
  sentence ("Lea pushes the forecast consolidation to Wednesday this week") would show the real workload clash.

## Vague / generic passages
The set is unusually concrete; only two:
- `fraud-investigation.yaml` `frequency`: "a paid fraud that triggers the full investigation is rare for any one
  company (every few years at a mid-market group)". The first half is defensible field observation; the "every few
  years" figure reads like data. Label it explicitly as a field note or use a range ("some see one in a decade,
  others one a year").
- `policy-compliance.yaml` `by_size.multinational`: "make mandate management a function of its own" — good line,
  but say who owns it (bank account management team / eBAM, often inside treasury operations) so the founder can
  go interview that person.

## Unsupported or mis-cited claims
- L331 of `month-end-reporting.yaml` (Deloitte/PwC spreadsheets) — see major issue 4. **UNSUPPORTED**.
- `fraud-investigation.yaml` L308: "only 30% of organisations recovered 75% or more of lost funds" cited to
  `afp-pfc-2026` (the press-release URL). **VERIFIED in substance** — AFP's 2026 report highlights (hosted by the
  underwriter Truist) say "the largest share … report recovering **more than 75%** of lost funds (30%), 20% report
  recovering none" (https://www.truist.com/content/dam/truist-bank/us/en/documents/info/cci/2026-afp-payments-fraud-control-survey-report-key-highlights.pdf).
  But it is unclear the press release at the registered URL contains the figure. Register the report highlights
  PDF (or note that the recovery figures live in the report, not the press release) and tighten "75% or more" to
  "more than 75%".
- `afp-pfc-2026` figures (76% affected in 2025; 74% BEC): **VERIFIED** (AFP key findings page and the 14 Apr 2026
  press release: "About three in four organizations (74%) were affected by business email compromise (BEC) in 2025").
- `afp-pfc-2025` figures (79%; vendor imposter 45%, +11 pp; 22% recovered 75%+): **VERIFIED** verbatim in the AFP
  press release of 15 Apr 2025.
- `ic3-2023-rat` (3,008 incidents, USD 758.05m potential losses, USD 538.39m frozen, 71%): **VERIFIED** in the IC3
  2023 report itself. The module's characterisation ("mostly quickly reported US BEC wires, not a general recovery
  rate") is correct and unusually careful — the RAT/FFKC covers domestic transfers (and, since April 2024,
  domestic-to-international; IC3 2024 report). Consider adding the 2024 figures (66% success, international
  extension) as a currentness refresh.
- `bacs-ceo-fraud-2026` (CEO-fraud reports 719 in 2024 → 971 in 2025; AI voices mentioned): **VERIFIED** — BACS's
  own year-end publication and multiple Swiss outlets repeat 719 → 971 (bacs.admin.ch; Netzwoche 28 Jan 2026).
  The registered source is a Netzwoche news item *about* BACS; prefer the BACS page (bacs.admin.ch) as primary.
- `cnn-arup-deepfake-2024` (HK$200m ≈ US$25.6m after a deepfaked video call): **VERIFIED** (CNN, Guardian, Arup
  confirmation; 15 transfers to 5 accounts).
- `ecb-ipr` / `kpmg-vop-2025` (VoP mandatory for euro SEPA credit transfers since 9 Oct 2025, **bulk-file opt-out
  available**): **VERIFIED** — including the opt-out, which is the load-bearing detail in the HM Italia example:
  the EPC's own FAQ says "The corporates are not obliged to make use of these services and can opt-out"
  (europeanpaymentscouncil.eu), and Deutsche Bank/BNP client pages describe the same bulk opt-out. The example is
  therefore realistic, including the 2025-26 detail that single-transaction files are treated differently from
  true bulks in some markets.
- `ch-co-board-duties` (Art. 716a(1)(3) non-transferable duty; **Art. 728a(1)(3): the audit firm examines whether an
  ICS exists**; Art. 725 solvency duty): **VERIFIED** — the Art. 728a para. 1 no. 3 citation, which looks
  suspicious, is correct ("Die Revisionsstelle prüft, ob … ein internes Kontrollsystem existiert"; see weka.ch's
  reproduction of Art. 728a). Good.
- `eact-guiding-principles` (segregation of duties as a core treasury principle): not independently re-checked this
  round; low-risk qualitative claim. **UNVERIFIED (R1)**.
- `swift-stop-recall` (gpi Stop and Recall, routed to the holding bank, "should process within 24 hours"): consistent
  with Swift's published description; **UNVERIFIED (R1)** at the registered URL but not contradicted.

## Better example opportunities
- **month-end:** show one artefact, not just a report table — e.g. the intercompany-interest schedule row behind the
  "2.10% vs the 2.35% reset rate" dispute (entity, principal, rate, accrued amount), so the founder sees the file
  that goes to Claudia. The example's WD3 mismatch hunt is the best teaching material in the module; make the fix
  visible too.
- **month-end:** one line on what the **auditor's** year-end version looks like (bank confirmations agreed to the
  same balances, derivative confirmations sampled — which is exactly where the "2 of 41 confirmed by Daniel" SoD
  issue surfaces in `policy-compliance`). The two examples are already linked in spirit; link them explicitly.
- **fraud:** a two-column "if the payment is still in flight / if it is already credited" minute-by-minute contrast
  in the first three steps. The classification exists in step 1; the times don't diverge afterwards, but in practice
  they do (cancel vs recall+freeze).
- **fraud:** the Kleio variant is excellent ("the call-back rule stops it") — add the counterfactual cost in
  startup terms ("CHF 48k is five days of Kleio's burn") to sharpen why the same fraud is existential at one tier
  and a bad afternoon at another.
- **policy:** show the signatory-review worksheet itself (4 lists: bank mandate / e-banking users / HR leavers /
  authority matrix, one reconciling row) — currently described as "the most tedious control" but never shown.

## Minor issues
- `month-end-reporting.yaml` L201: "of which **CNY 7.9** held in China" sits in a table whose unit is **CHF m**, and
  the headroom arithmetic (54.0 − 7.9 = 46.1) treats it as CHF 7.9m. Write "CNY ≈ 70m (CHF 7.9m equiv.)" or
  "CHF 7.9m equivalent, in CNY". As printed it reads as CNY 7.9m ≈ CHF 0.9m. (`daily-cash-positioning` has CNY 55m
  ≈ CHF 6m in mid-November; the two can coexist, but the label should be unambiguous.)
- Hedges paragraph: "market value of all forwards +CHF 0.9m (EUR +0.6m, USD +0.3m)" invites a naive spot-based check
  that fails: EUR 58m at an average contracted 0.9390 versus a 0.9350 closing rate is +CHF 0.23m, not +0.6m. The
  stated figure is defensible (banks value off forward curves, and with €STR ~2% vs SARON ~0% the curve is below
  spot), but say "per bank valuations off the forward curve" or give one deal's valuation so the reader doesn't
  think the numbers were made up.
- `policy-compliance.yaml` example table: the cure path doesn't tie — "fell to 55% on 31 Aug … topped up with
  EUR 3m forwards on 4 Sep" takes a ~EUR 25–30m quarterly exposure to ~65–67%, not the 80% recorded on 30 Sep.
  Add the second top-up or a forecast change. Also the row lists 30 Sep before 31 Aug; chronological order reads
  better.
- `fraud-investigation.yaml` `sources:` includes `nacha-ic3-2024` but no claim in `evidence_note` uses it. Either
  cite it (IC3 2024: BEC ≈ USD 2.8bn of losses; good currentness support alongside the 2023 RAT figure) or drop it
  from the module's list.
- Fraud step 3 says "for SEPA a recall message, for cross-border payments a Swift gpi Stop and Recall request" —
  correct, but SIC (Swiss) and euroSIC recalls have their own mechanics and the glossary `payment-recall` names
  SIC; one clause ("and the Swiss schemes' own recall procedures") keeps the Swiss framing the manual promises.
- `policy-compliance.yaml` L168 phrasing "the auditor must confirm that an internal control system exists" is right
  per Art. 728a(1)(3), but the statutory verb is "examines whether" — "assesses whether an ICS exists" is the
  tighter version. Trivial.
- Alpine's "collective signature for bank-detail changes" (`fraud-investigation.yaml` `companies.alpine`) mixes two
  controls: signature (Kollektivunterschrift) applies to payments; bank-detail changes need dual approval of the
  master-data change. The BACS recommendation the module cites distinguishes exactly this. Rephrase to "dual
  approval for bank-detail changes (and collective signature for payments)".
- Cross-module hedge-book continuity (not an error, just checked): 30 Sep "EUR 118m forecast, EUR 58m hedged, Q+1
  80% / Q+2 61% / Q+3 41% / Q+4 16%" is consistent with `cash-forecasting`'s November "Q1 2027 EUR 40m against
  EUR 30m of forwards, 75%" if quarterly EUR inflows are seasonal and ~EUR 6m of new hedges were added in
  Oct–Nov. Worth one parenthetical in one of the two so a reader who compares them doesn't assume a slip.

## What is done well (so round 2 does not "fix" it)
- The **passive vs active breach** taxonomy, the "recall is a request, not a reversal" warning, the call-back to an
  *independently sourced* number (with the failure mode "the verification goes back to the fraudster"), the
  insurance-condition angle (insurer disputing whether the call-back met the policy condition), and the HR-leaver
  → treasury gap in signatory reviews are all exactly how practitioners talk. Keep them verbatim where possible.
- The worked example's **judgment calls are graded** (technical/passive breach cured next day vs active control
  deviation escalated to the audit committee) — the best teaching device in the module.
- The evidence notes are honest about what is illustrative synthesis vs survey finding, and (apart from the
  spreadsheets sentence) the statistics I could verify all check out against the original publishers — including the
  fine print (RAT ≠ general recovery rate; AFP sample is mainly US; bulk-file VoP opt-out).

## Verification appendix (statistics checked this round)
| Claim | Where | Verdict | Evidence |
|---|---|---|---|
| AFP 2026: 76% attempted/actual payments fraud in 2025; 74% affected by BEC | fraud-investigation evidence_note | VERIFIED | afponline.org 2026 key findings; AFP press release 14 Apr 2026 ("About three in four (74%) … BEC") |
| AFP 2026: 30% recovered more than 75% of lost funds | fraud-investigation evidence_note | VERIFIED (wording: "more than 75%") | Truist-hosted 2026 AFP report Key Highlights PDF |
| AFP 2025: 79%; vendor imposter 45% (+11 pp); 22% recovered 75%+ (from 41%) | fraud-investigation evidence_note; `afp-pfc-2025` | VERIFIED | AFP press release 15 Apr 2025 (financialprofessionals.org) |
| IC3 2023 RAT: 3,008 incidents / USD 758.05m / USD 538.39m frozen / 71% | fraud-investigation evidence_note | VERIFIED | ic3.gov 2023 Internet Crime Report |
| Swiss CEO-fraud reports 719 (2024) → 971 (2025), AI voices | fraud-investigation + policy-compliance evidence notes | VERIFIED | bacs.admin.ch year-end publication; Netzwoche 28 Jan 2026 (registered) |
| Arup HK$200m ≈ US$25.6m deepfake video call | fraud-investigation + glossary | VERIFIED | CNN 16 May 2024 / CNN 4 Feb 2024 / Guardian; Arup confirmation |
| VoP mandatory for euro SCT since 9 Oct 2025; corporates may opt out for bulk files | fraud-investigation software + example | VERIFIED | EPC VoP FAQ ("corporates … can opt-out"); Deutsche Bank / BNP Paribas client pages |
| Art. 716a(1)(3) / 728a(1)(3) / 725 CO | month-end + policy-compliance evidence notes | VERIFIED | Fedlex SR 220 text (Art. 728a(1) 3: auditor examines whether an ICS exists) |
| Deloitte/PwC "persistence of spreadsheets" | month-end-reporting evidence_note (L331) | UNSUPPORTED — see major issue 4 | Registered source notes contain no such claim; core.yaml withdrew the phrase |
| EACT guiding principles cover segregation of duties | policy-compliance evidence_note | UNVERIFIED (R1) | Not re-checked this round |

## Verdict: REVISE
The workflow realism here is the strongest of anything I have reviewed (9), the fraud playbook is practitioner-grade,
and — unusually — every statistic I could reach verified against the original publisher. What blocks PASS is not
fabrication but consistency and framing: the accounting-framework gap (Swiss GAAP FER vs IFRS) in the module where
it matters most, the September "Q3 VAT payment" that the manual's own VAT calendar contradicts, two banks that do
not exist in the canonical bank landscape, and one survey sentence whose citations were already withdrawn elsewhere
in the repo. All four are half-day fixes; the concepts around them are already in place.
