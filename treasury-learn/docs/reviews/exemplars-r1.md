# Exemplar modules — independent review, round 1

Reviewer: independent (fresh context). Date: 2026-09-30.
Scope: Start Here (3 pages), `daily-cash-positioning`, `cash-forecasting`, spot check of `content/glossary/core.yaml` (all 61 terms read, ~25 checked in detail, including every numeric example) and `content/sources/core.yaml`.
Rendering: `/start`, `/start/neighbours`, `/start/growth`, `/workflows/daily-cash-positioning`, `/workflows/cash-forecasting` and `/glossary/dso-link-placeholder` were rendered with `scripts/shot.mjs --full` at 1440 px. All render without runtime errors. The only MISSING refs are workflows that have not been written yet (liquidity-planning, fx-hedging, surplus-cash-investment, funding-subsidiary, bank-reconciliation, liquidity-crisis, fx-exposure-management), which is expected.

> **Limitation on source verification (applies to all four reviews).** The brief asks me to open every cited URL. In this session the egress proxy **blocked every source domain** (financialprofessionals.org, ctmfile.com, pwc.com, eact.eu, tispayments.com, deloitte.com, six-group.com, statestreet.com, theglobaltreasurer.com, treasurers.org), and the WebSearch budget was already used up. **I could not verify any statistic against its source.** No statistic below is marked "wrong" for that reason. They are all marked **UNVERIFIED (R1)**, and a round-2 reviewer with network access must check them. The source-quality scores reflect only what can be judged without fetching: how the sources are characterised, the URL hygiene, and whether a source is primary or secondary.

---

# Review: Start Here (/start, /start/neighbours, /start/growth) — round 1

## Scores (1–10)
factual accuracy: 7 | workflow realism: 7 | pedagogical quality: 8 | concreteness: 8 | source quality: 5

## Spec coverage check (section 1)
| Spec requirement | Covered? | Where / comment |
|---|---|---|
| What treasury is, why companies need it | Yes, well | index: one-paragraph version, the Alpine "profitable but short of cash" example, needs table |
| Treasury vs accounting | Yes, strong | neighbours: comparison table plus the "Where it rubs" field note |
| Treasury vs FP&A | Yes, strong | neighbours: Helvetic example with the same quarter forecast two ways |
| Treasury vs controlling | **Thin** | Only one table row and the US/DACH "controller" callout. There is no section on what controlling gives treasury or takes from it. Spec 1 names controlling explicitly, and the reference companies are Swiss, where controlling is a major neighbour. |
| Treasury vs corporate finance | Yes | neighbours: two meanings of the term. Adequate. |
| Treasury vs CFO | Yes | neighbours: three size bands |
| Treasury vs tax / AP / AR (not required in S1 but confused by beginners) | Partly | AP appears via payment runs. Tax is absent; a line would help (pooling, repatriation and intercompany loans are tax-driven). |
| How treasury changes with growth | Yes | growth page |
| Conceptual loop (operate → enter/leave → observe → forecast → decide → execute → monitor → reconcile) | Yes | `<Flow>` on the index. It merges "monitor" and "reconcile" into one box, which is acceptable. |
| 30 / 300 / 3,000 / 50,000-person examples and **who** does treasury at each | Yes, with a caveat | growth: four snapshots. See the "Better example opportunities" section: the snapshots do not line up with the canonical companies (70 / 320 / 2,600 / 17,000 people), and the page never says so for the startup tier. |

## Critical errors (must fix)
None that would make the reader badly wrong. The major issues come first below.

## Major issues
1. **The growth page's own summary table contradicts the canonical mid-market company.** `growth.mdx` L88 gives mid-market "Bank accounts | 15–100", and L49 says "dozens of accounts (Helvetic cut its from 31 to 12)". `companies.yaml` says Helvetic has **12** operating accounts, which is below the manual's own range, and 12 is not "dozens". A reader cross-checking the Helvetic page will lose trust. Fix: widen the range to about 10–100, or say "Helvetic, after rationalisation, sits at the low end". Also fix the typo "cut its from".
2. **Who builds the Helvetic cash position is inconsistent across the exemplars.** `index.mdx` L62–70 has **Daniel (Treasury Manager)** opening the connectivity tool, checking statements, refreshing the workbook and tracing variances. The daily-cash-positioning workflow and `who-does-treasury` have **Lea (Analyst)** doing all of that while Daniel reviews and decides. For a founder whose main question is "who does what", this is exactly the wrong thing to blur. Fix: rewrite the index callout as "Lea has built the position by 08:30; Daniel opens it, sees… , decides…". Alternatively, state explicitly that Daniel does it himself when Lea is out, which would also illustrate the key-person risk the growth page names.
3. **Missing "when does a company first need a treasurer?"** The growth page describes four static tiers but not the **transitions**, which are what founders and CFOs actually talk about. Common triggers include: first committed facility with covenants, first foreign subsidiary, material FX exposure, a large fundraise to invest, an acquisition, a lender or board request for a 13-week forecast, or the CFO's time running out. Present these as practitioner variation (a field note), not as a statistic. This is high-value interview vocabulary ("When did you hire your first treasury person, and why then?").
4. **Treasury vs controlling is under-served** (see the coverage table). Add a short section that covers what controlling knows and treasury needs (cost-centre plans, capex projects, business-unit forecasts), where they collide (the medium-term plan), and the fact that in a Swiss company the CFO's "Controlling" team often *owns* the planning process treasury derives its medium-term forecast from.

## Missing concepts
- **Gross vs net cash, and why a company holds cash while also borrowing.** Helvetic has about CHF 41m of cash *and* about CHF 60m drawn on its RCF plus a CHF 100m bond. A beginner will ask "why not repay?". The answer covers operating float, cash sitting in subsidiaries, trapped CNY, and RCF interest periods, and it is a core mental model. It belongs on the index or the neighbours page.
- **Cash vs profit vs VAT.** Treasury forecasts **gross** receipts including VAT and forecasts VAT payments separately. FP&A works net of VAT. One sentence in the FP&A comparison would make the reader sound informed.
- **Treasury vs tax**: repatriation, intercompany loan pricing and pooling are tax-constrained. One row in the neighbours table would cover it.
- **Front / middle / back office** (segregation of duties) as the organising logic of larger treasuries. It is mentioned only implicitly ("treasury operations (back office)").

## Unrealistic workflow descriptions
- `index.mdx` L64: "The Chinese bank's is missing; he notes it will arrive around 10:00." The timing logic is doubtful: China (UTC+8) closes its business day before the Swiss day starts, so a Chinese prior-day statement is normally among the *first* available. If it arrives late, the realistic reasons are connectivity (a local Chinese bank without SWIFT/EBICS corporate reporting to the group's tool, so the file is relayed via a global bank or sent manually by local finance), not time zone. See also the positioning workflow, where the reasoning is stated wrongly. Fix: give a connectivity reason.
- `index.mdx` L67: the EUR 3m top-up for a EUR 4.2m German payroll is plausible. But "documented as an intercompany loan" should mention that this sits under an **existing intercompany loan framework agreement at an arm's-length rate**. Otherwise it reads as though each transfer gets a new document.

## Vague / generic passages
- `index.mdx` L82: "A treasurer chasing yield is a red flag, not a skill." This is punchy but unsupported. Rephrase it as the SLY principle (safety, liquidity, yield) with a pointer to `investment-policy`.
- `growth.mdx` L90: SME "Cash visibility: Portals + spreadsheet, weekly". In practice, SME accountants look at portal balances **daily**; it is the *forecast* that is weekly. The workflow's own SME variant says "checks the portals daily". Align the two.

## Unsupported or mis-cited claims
All statistics are **UNVERIFIED (R1)** because the sources were unreachable from this session:
- `index.mdx` L87: AFP 73% (up from 68% in 2022). It is cited to `afp-sr-2025`, which is a **ctmfile.com news write-up**, not the AFP report. The source title "AFP Strategic Role of Treasury / priorities research (reported by Treasury News Network)" does not identify which AFP publication or year the number comes from. Cite the AFP primary report, or label the claim "as reported by ctmfile".
- `index.mdx` L87: AFP 62% "most challenging". The same number appears as 49% in the 2026 edition, and only the forecasting workflow mentions that. Start Here should either use the latest figure (2026: 49%) or give both, because "62%" alone is already a year out of date.
- `index.mdx` L87: EACT 2025 ranking and PwC 2025 "350 treasurers … top priority". Unverified.
- `index.mdx` L13: EACT *Guiding Principles* "put liquidity first…". Unverified, and the source has no year or edition date.
- `index.mdx` L13 / `act-what-is-treasury`: the URL is the **ACT homepage**, which cannot support a specific claim about how the body of knowledge is organised. Link the ACT page that actually describes it.
- `growth.mdx` L58: AFP "under USD 1bn typically 1–3 staff; average nearly 12 FTE"; 2026 "46% fewer than five". Unverified. The caveat about the US-only sample is good.
- `growth.mdx` L73: PwC ">USD 10bn: 67% IHB, 60% payment factory, 50% POBO". Unverified. The source note says "as reported in PwC's summary". Confirm the denominator (all respondents above USD 10bn, or those who answered the structure question).
- `growth.mdx` L66: "well over a hundred (field observation…)". It is labelled honestly, but it is a number with no source. Acceptable as a field note; better to anchor it to one public annual-report or job-posting example.

## Better example opportunities
- The **30-person startup** snapshot never mentions Kleio (70 people), though Kleio is the manual's startup. Say "Kleio, at 70 people, is a slightly larger version of this tier", as is already done for GlobalChem against the 50,000-person tier. Alternatively, reframe the snapshots as "about 30–100 / 300 / 3,000 / 50,000".
- 30-person snapshot: "not leaving CHF 10m sitting in one current account". In autumn 2026, with the SNB policy rate at 0% and SARON at about 0%, the *yield* motive for CHF term deposits or MMFs is close to nil. The real motive is **counterparty diversification** (the SVB lesson) and, for USD balances, the roughly 3.5–4% USD MMF yield. Stating this rate environment explicitly would make the reader sound current.
- The Alpine example on the index ("45% of revenue in euros while almost all costs are in Swiss francs") conflicts with the glossary `natural-hedge` entry (EUR 12m of German component purchases a year) and `companies.yaml` ("EUR and USD component purchases"). Say "most costs".

## Minor issues
- `growth.mdx` L49: "cut its from 31 to 12" is a typo.
- The `<Flow>` on `/start` wraps as 4 + 3 boxes at 1440 px, and the loop caption sits under the second row. It is readable. Consider `direction="col"` or fewer steps.
- `neighbours.mdx` Helvetic example: "a CHF 3m dividend from the Czech subsidiary" is an **intra-group** flow. It matters at the parent level but nets to zero in a *group* forecast. Say "at the parent level" or the example teaches double-counting, which the forecasting workflow explicitly warns against.
- `neighbours.mdx` L60: "treasury usually derives it from FP&A's plan using the indirect method". "Usually" is fine, but add "or FP&A/controlling own it and treasury reviews it"; practice varies.

## Verdict: REVISE
Pedagogically this is the strongest part of the set. It needs fixes for the Daniel/Lea ownership inconsistency, the Helvetic account-range contradiction, the missing growth triggers and the thin controlling section, plus primary sources for the index statistics.

---

# Review: Daily cash positioning (`content/workflows/daily-cash-positioning.yaml`) — round 1

## Scores (1–10)
factual accuracy: 7 | workflow realism: 7 | pedagogical quality: 8 | concreteness: 9 | source quality: 5

## Critical errors (must fix)
1. **The time-zone reasoning is backwards.** Step 1 (L72) says a statement can be missing because "the bank is in a later time zone (Asian banks deliver during their day; US banks after the US close)". Asian banks are *ahead* of Switzerland: a Chinese bank's prior-day close (17:00 CST, about 10:00–11:00 CET/CEST) happens before the Swiss treasurer even goes home. **Asian prior-day statements should be among the first to arrive, and US ones the last** (the US close is about 22:00–23:00 CET). The worked example (L143, L163), the glossary `bank-statement` example and the index page all repeat "the Chinese statement arrives at 10:00–10:30". If the author wants a late Chinese statement, the realistic cause is **connectivity**: a Chinese domestic bank with no SWIFT/EBICS corporate reporting into the group's tool, a file relayed via MT940 from a global bank's China branch, or a local accountant emailing a portal export. Fix the reasoning in all four places. A practitioner reading this would notice immediately.
2. **The investment decision in the example is unrealistic against the canonical company's own facts.** At 09:10 Daniel places CHF 2m (and elsewhere CHF 3m) "in a one-week deposit". In autumn 2026 the manual's own market levels put the SNB rate and SARON at about 0%, so a one-week CHF deposit earns roughly nothing, and many Swiss banks will not take short CHF deposits at a positive rate at all. Meanwhile Helvetic has **about CHF 60m drawn on its RCF** at SARON plus a margin. A real treasurer would (a) leave the CHF on the current account, if it is not charged, for the bond coupon and payroll, or (b) **reduce the RCF drawing at the next interest-period rollover**, which saves the full margin. Not using surplus to cut expensive debt is exactly the naive move the brief tells us to catch. Fix: make the decision "reduce the next RCF rollover by CHF 5m", or "leave it; the surplus is needed for the coupon", and explain why a deposit at 0% is pointless. The same issue appears in the forecasting example.

## Missing concepts
- **Ledger vs available vs value-dated balance and float**: listed in the data section ("booked and value-dated"), but never explained in a step. Bank statements carry *booked* balances, while *available* balances (net of holds and card authorisations) are what can be paid out. This is a common beginner confusion.
- **The intercompany loan framework**: step 6 and the example imply that each funding transfer is "an intercompany loan". In practice there is a framework loan or current-account agreement, priced at arm's length (for a Swiss lender, the ESTV safe-harbour rates, which the glossary mentions). A cross-border CHF/EUR flow may also have withholding-tax or thin-capitalisation implications. Otherwise the reader assumes someone drafts a contract every morning.
- **The payment channel for same-day EUR from Switzerland to Germany**: SEPA SCT is not same-day guaranteed. A same-day transfer normally means an urgent/express payment (via euroSIC/T2) or SCT Inst where both banks support it. The example says "both at banks with same-day EUR transfers" without naming the mechanism. This matters because the spec mentions instant payments and ISO 20022 as currentness topics, yet the workflow never says whether SCT Inst (mandatory for euro-area PSPs to receive since January 2025 and to send since October 2025 under the EU Instant Payments Regulation, **unverified R1**) changes the cut-off calculus. That is a genuine 2025–26 change a treasurer will talk about.
- **Why the RCF is drawn while cash is held**: see the Start Here review. It is also relevant to step 6's "draw on a credit facility" option.
- **The daily output format**: what the "position" actually looks like when it reaches the manager or CFO (a one-page email or PDF: group total, by currency, versus yesterday, versus forecast, actions taken). It appears only under manual_work.

## Unrealistic workflow descriptions
- **The name in the German tax example conflicts with the page's own teaching.** At 08:40 "Lea checks with the German **controller**". `/start/neighbours` warns that in DACH usage *Controlling* is management accounting, not the team that pays trade tax. The person who knows about a Gewerbesteuer prepayment is local accounting (Buchhaltung) or the local finance manager. The canonical cast has **Jens** (HM Deutschland finance manager): use him. The same applies to the people-list label "Local finance / subsidiary controllers".
- **"Quarterly trade-tax prepayment that the local team forgot to submit."** German trade-tax prepayments fall on fixed statutory dates (15 Feb, 15 May, 15 Aug, 15 Nov) and are often collected by direct debit by the municipality. A treasury calendar should never miss them, which is the point, but the example should say it was **a direct debit that nobody had put in the forecast**. The workflow would then also teach that direct debits are an unannounced outflow type.
- **The minimum-balance definitions conflict.** The table sets HM AG's CHF account minimum at CHF 2.0m, yet Daniel wants "the CHF 10m buffer at the parent", and the index calls CHF 10m the *group* minimum the CFO wants. Three different buffers are used interchangeably. Define them once: account operating minimum, parent buffer, group minimum liquidity.
- **Multinational variant**: "cash pools sweep automatically overnight". End-of-day sweeps at the bank are correct. Add that the *treasury* morning work at a multinational includes checking that the sweeps executed and the IHB accounts posted, which is a frequent exception source.

## Vague / generic passages
- Step 7, `when: "before 10:00–14:00 depending on currency"`. Give two or three concrete illustrative bank cut-offs (for example, same-day CNY/JPY/HKD must be instructed the day before or very early; EUR urgent about 14:00–15:00; CHF about 14:00–15:00; USD same-day from a European bank often mid-afternoon CET) and label them as varying by bank. Even illustrative numbers help a founder understand why ordering matters. The current range excludes USD, which is often later than 14:00.
- Step 9: "At large companies this runs continuously". Say what "continuously" means: an intraday balance dashboard, alerts on large debits, camt.052/054 notifications, or instant-payment credits arriving at any hour.

## Unsupported or mis-cited claims
- `evidence_note`: Deloitte 2024 "22% … requires development". **UNVERIFIED (R1).**
- `swift-iso-mt9xx`: the claim "MT940/942 remain in use after the November 2025 Swift milestone, which applied to interbank payment messages" is directionally what I understand to be correct. But the source is a **State Street Japanese-language (jp/ja) client guide**, not Swift. For a load-bearing currentness claim, cite Swift's own ISO 20022 programme pages or the CBPR+ scope documentation. **UNVERIFIED (R1).**
- `six-sps-cash-mgmt`: the URL is a **SIX glossary/downloads FAQ page**, while the title claims the Implementation Guidelines. The note's claim ("2009 versions discontinued on 21 Nov 2026; MT940/942/MT101 no fixed end date") is high-value and near-dated (7 weeks from today). Link the actual SIX document or news item. **UNVERIFIED (R1).**
- `software:` names Trovata, Agicap, Atlar and Embat as "cash-visibility / multibank tools". These vendors position themselves differently: Agicap is SME cash-flow management, Atlar is payments and treasury, Embat is TMS-lite. Say "products positioned as…" or defer to /systems, and check each vendor's current self-description.

## Better example opportunities
- The worked example is excellent in format: timestamps, a table with arithmetic that checks (1.8 − 2.6 − 0.3 = −1.1; short by 1.35 against a 0.25 minimum), explicit options and a recommendation. Keep it. Add one **fraud-flavoured exception** (an unknown CHF 180k debit that turns out to be a bank charge or a duplicate), because the judgment table names fraud but the example never exercises it.
- The Kleio variant has "CHF 8m in 3-month deposits". At 0% SARON, why? Say it explicitly: for bank-diversification (SVB) reasons, not yield. Also, the USD part (Kleio Inc.) would more plausibly sit in a USD government MMF or T-bills, as the glossary MMF example itself says.

## Minor issues
- The term id `rtgs-note` in `terms:` is a placeholder id for "Cut-off time" (see the glossary review).
- `frequency`: "weekly or on payment days at small companies" versus the SME variant "checks the portals daily". Harmonise.
- `data:` "Customer receipts are usually *not* counted until they arrive". Good. Add that incoming credit advices (camt.054 / MT910) can confirm them intraday.

## Verdict: REVISE
The structure, the worked example and the failure-mode tables are close to what the spec asks for. Two practitioner-visible errors (the time-zone logic, and a CHF deposit at 0% while the RCF is drawn) and the naming and buffer inconsistencies must be fixed. The sources must be replaced with primary ones and verified.

---

# Review: Cash forecasting (13-week) (`content/workflows/cash-forecasting.yaml`) — round 1

## Scores (1–10)
factual accuracy: 7 | workflow realism: 8 | pedagogical quality: 8 | concreteness: 8 | source quality: 6

## Critical errors (must fix)
None. The following are major.

## Major issues
1. **The storyline across exemplars contradicts itself.** The forecasting example's "last week" variance includes the German trade-tax EUR 0.3m, which is the *same* event as the daily-positioning example. So the positioning Tuesday was last week. On that Tuesday, "the forecast shows a **bond coupon and CHF payroll next week**". One week later, this example says the low point is "week 6, driven by the **annual bond coupon** and quarterly VAT". The coupon cannot be both next week and five weeks out. The index page repeats "low point week 6 CHF 18m". Fix: pick one timeline and check the dates. Reusing one scenario across modules is a great device, but only if it holds together.
2. **Payroll scale is inconsistent with the company and with the index page.** The example shows group payroll of CHF 6.1m in the week. Helvetic has about 2,600 staff, so monthly personnel cost is plausibly around CHF 15–20m (at an illustrative blended CHF 70–90k per head per year). The index page says **German payroll alone is EUR 4.2m**. If the 6.1m is only some entities' payroll that week, say so ("CZ and CN payroll this week; DE and CH at month-end"). As written, a sharp reader concludes the numbers were invented without a sanity check. Supplier payments of CHF 9.5m a week (about CHF 490m a year) plus payroll also exceed the cost base implied by CHF 650m revenue and EBITDA of about CHF 88m. Add a line that this is a heavy week, or scale it down.
3. **The same deposit-at-0% problem as positioning.** "Weeks 2–4 show a CHF 6m surplus at the parent, so Daniel approves a CHF 5m 3-week deposit." With SARON at about 0% and about CHF 60m drawn on the RCF, the realistic action is to reduce the RCF drawing at rollover, or to hold the cash. Fix, and use this as the teaching moment for "what decisions does the forecast drive".

## Missing concepts
- **Forecast accuracy measurement**: how accuracy is actually computed (for example, absolute percentage error by category, at a fixed lag such as 1 or 4 weeks, per entity), and why "±10%" means nothing without the horizon and the category. The GlobalChem variant gives "±10% on 4-week receipts", which is good; move the method into a step or data item.
- **Currency dimension**: the forecast by currency is the input to FX exposure and hedging (Helvetic's 60–90% EUR hedge ratio is computed on it). This is mentioned only as "FX flows to hedge". Show the currency view in the example: EUR net receipts per week feeding Lea's hedge-ratio report.
- **Direct method vs indirect method** are linked as terms. The example should make visible that the 13 weeks are built by the direct method and the 18-month plan by the indirect method, with the seam between them (the reconciliation of week 13 against month 3 of FP&A's plan) being where treasury and FP&A argue.
- **Why 13 weeks**: one quarter; the origin in lender, restructuring and turnaround practice; the fit with the quarterly VAT and tax cycle. It is currently asserted only as "the standard format".
- **Gross vs net of VAT** for receipts (see the Start Here review). It matters here because Swiss quarterly VAT is one of the two drivers of the low point.

## Unrealistic workflow descriptions
- **Frequency**: "Weekly update of a rolling 13-week forecast is the common pattern at mid-market **and large** companies." Many large multinationals run **monthly** entity submissions (often a 12-month rolling forecast), plus a daily or weekly short-horizon view built centrally from bank and ERP data, rather than asking 40 entities for weekly submissions. The multinational variant partly reflects this. Present it as practitioner variation and soften the frequency statement. Survey evidence on frequency would help; I could not search in R1.
- **Step order**: variance analysis is placed after consolidation (step 6). Many teams do last week's forecast-versus-actual *first*, on Monday, because it informs the adjustments and the chasing. This is practitioner variation, not an error; one sentence would cover it.
- Variance table: "Supplier payments … −0.3 Timing | German run released a day early". A run released one day early within the same week does not create a *weekly* variance unless it crossed a week boundary, and in that case the variance would be the whole run, not 0.3m. Either change the reason ("the German run was CHF 0.3m larger: two invoices approved late and added") or explain the week boundary.

## Vague / generic passages
- Step 8, "Run simple scenarios: largest customers pay 2–4 weeks late; sales down 20%". Good. But "sales down 20%" is not how a 13-week direct forecast is stressed (most weeks 1–8 receipts come from invoices already issued). Say that the scenario hits weeks 9–13 and new invoicing mostly, which is itself an insight.
- `software:` "a newer category of cloud tools … offers ML-based predictions of receipts". Acceptable, and the ai_note correctly says the evidence is mostly vendor-reported.

## Unsupported or mis-cited claims
All **UNVERIFIED (R1)** (sources blocked): AFP 62% (2025) / 49% (2026); Strategic Treasurer/TIS 68% / 53%; EACT 2025 priority; Deloitte "continued to primarily be supported by spreadsheets" (quoted phrase, so it must be verbatim; check it).
- `st-tis-cfv-2025` is correctly flagged as vendor-sponsored in the source note. Surface "(vendor-sponsored survey)" in the evidence_note text too, since readers see only the text.
- "Distressed or lender-monitored companies may be required to deliver a 13-week cash flow to lenders weekly." This is correct as general practice. No citation is needed, but label it as practice, not a rule.

## Better example opportunities
- The worked example is strong: arithmetic checks (14.0 − 9.5 − 6.1 = −1.6; 11.2 − 9.8 − 6.1 − 0.3 = −5.0), timing and permanent differences are split, and the "Italy over-forecast 9 of the last 12 weeks → 15% haircut" is exactly the kind of judgment the spec asks for. Add **a mini 13-week strip** (weeks 1–13 closing balance with the week-6 trough, the CHF 10m minimum and the CHF 140m undrawn RCF) so the reader *sees* "low point" and "headroom".
- Show one **subsidiary template row** (for example HM Italia, week 3: customer receipts EUR 2.4m, suppliers −1.6m, payroll −0.9m…) so the founder sees the actual artefact that gets emailed.
- Alpine variant ("which milestones slipped?") is excellent; keep it.
- Kleio variant: "January/July prepayments make the runway look better than it is for half the year" is muddled. The prepayments make *cash* look high right after receipt, while the service obligation (deferred revenue) is still owed. Say that directly.

## Minor issues
- The `terms:` list includes `dso` but the workflow never uses DSO in the text. Use it in step 4 ("Italy's effective DSO drifted from 75 to 90 days") or drop it.
- The glossary `variance-analysis` example (Italian customer CHF **3m** 10 days late, CHF 1m cancelled order) conflicts with this example (Italian CHF **2.1m** 10 days late, UK 0.7m). Same story, different numbers. Align them.
- The glossary `short-term-forecast` example has Lea updating "every Monday … with AR from SAP". Helvetic's Italian, French, UK, US and CN entities are *not* on SAP (`companies.yaml`), which is why the templates exist. Say "AR from SAP for CH/DE/CZ, templates for the rest".

## Verdict: REVISE
This is the most realistic of the modules: it names the judgment, the politics of overriding subsidiaries, and the chasing. It needs a consistent cross-module timeline, sane payroll and supplier scale, a realistic surplus decision, the currency and hedging link, and verified sources.

---

# Review: Glossary (`content/glossary/core.yaml`) and sources (`content/sources/core.yaml`) spot check — round 1

## Scores (1–10)
factual accuracy: 7 | workflow realism: n/a (not scored) | pedagogical quality: 8 | concreteness: 8 | source quality: 4

## Arithmetic and consistency checks performed (glossary examples)
| Term | Check | Result |
|---|---|---|
| forward | 0.94 / (1 + 0.02 × 0.25) ≈ 0.9353; quoted 0.9355; CHF 1.871m | OK |
| spot-fx | EUR 1m × 0.9412 = CHF 941,200, T+2 Tue→Thu | OK |
| fx-exposure | 3m × 0.94 × 5% ≈ CHF 141k | Arithmetic OK; **amount inconsistent with Alpine** (see below) |
| translation-exposure | 200m × (0.85 − 0.78) = CHF 14m | OK |
| liquidity | 900m + EUR 1.5bn × ~0.935 ≈ CHF 2.3bn | OK |
| liquidity-headroom | 7 − 3 + 9 = 13 | OK (consistent with Alpine's 0–5m drawn) |
| dso / dpo / DIO / ccc | 89.8 / 60.8 / 119.9 / 149 days; 650/365 × 10 ≈ 17.8m | OK |
| hedge-ratio | 30/40 = 75% inside 60–90% | OK |
| option premium | 1–2% for 3-month ATM-ish USD/CHF | Plausible |
| covenant | 2.4x → 3.2x after a 25% EBITDA fall | Arithmetic OK; **leverage level inconsistent with Helvetic** (see below) |
| physical-pooling / cash-concentration | Helvetic cash pool | **Contradicts companies.yaml** |

## Critical errors (must fix)
1. **The glossary gives Helvetic a cash pool it does not have.** `physical-pooling` (L82): "Helvetic's German subsidiary … the zero-balancing sweep moves it to the parent's EUR header account." `cash-concentration` (L109): "**Before its cash pool**, Helvetic's Daniel concentrated cash manually…". `companies.yaml` says: "Cash is concentrated manually (Daniel moves money by intercompany loan)". The daily-positioning workflow depends on that manual process (EUR 1.5m intercompany loan to Germany). If Helvetic had a zero-balancing pool, the whole worked example would be wrong. Fix: use GlobalChem for the physical-pooling example, and write cash-concentration in the present tense ("Daniel concentrates cash manually…").
2. **Placeholder ids are exposed as URLs.** The DIO term has `id: dso-link-placeholder`, so its page renders at `/glossary/dso-link-placeholder` (confirmed by screenshot). The cut-off term has `id: rtgs-note`, so it appears at `/glossary/rtgs-note`, and the daily-positioning `terms:` list links to it. Rename them to `dio` and `cut-off-time` and update references. These are the *template* files other authors will copy.

## Missing concepts (glossary coverage, for the exemplar workflows)
Terms used in the exemplars but missing from the glossary: **booking date / available balance**, **overdraft (uncommitted)** (it exists only as a `confusedWith`), **four-eyes principle / segregation of duties**, **runway / burn rate** (central to the Kleio tier), **SEPA / SCT Inst / instant payments**, **RTGS** (the placeholder id suggests it was planned), **SIC / euroSIC** (the Swiss framing), **camt.054 / credit advice**, **minimum operating balance**. A founder reading positioning and forecasting will hit all of these.

## Unrealistic or inconsistent examples
- `covenant` (L366): "Helvetic's net debt / EBITDA … At 2.4x". From canonical facts, gross debt is about CHF 60m RCF plus CHF 100m bond, or CHF 160m, and cash is about CHF 41m, giving net debt of roughly CHF 120m. EBITDA is about CHF 85–88m (the neighbours page has CHF 22m a quarter, and the indirect-method example CHF 85m). That puts leverage at about **1.4x, not 2.4x**. Either raise debt in companies.yaml (for example leases or pension liabilities in the covenant definition) or change the example. As it stands, the numbers across pages cannot all be true.
- `fx-exposure` (L186): "Alpine expects EUR 3m of receipts over the next 6 months". Alpine's EUR revenue is 45% of CHF 80m, about CHF 36m a year, or roughly EUR 19m per half-year. EUR 3m is off by a factor of about 6. If it is one project, say so.
- `natural-hedge` (L256): "EUR 36m sales". 45% × CHF 80m = **CHF** 36m ≈ EUR 38m. This is a unit slip.
- `sweeping` (L100): the Alpine automatic cross-border, cross-entity sweep from the German GmbH to the Swiss AG is presented as "a simple sweep, not a full cash pool". A cross-entity sweep *is* one-way physical concentration and creates intercompany loans with the same transfer-pricing and tax consequences. It is also at odds with the positioning workflow's Alpine variant (Martin approves manual transfers). Use a same-entity sweep example (Alpine AG's collection account to its main account), or make it consistent.
- `api-banking` (L312): "Kleio's US bank offers an API; a modern cash-visibility tool pulls intraday balances". Kleio's canonical systems are cloud accounting, Stripe, portals and one Google Sheet, with no cash-visibility tool. "The Swiss banks are still connected through daily statement files" is also questionable for a Swiss SME in 2026. Swiss SME accounting tools commonly connect to banks through open-banking-style interfaces (for example SIX **bLink**), and this is a currentness point. **UNVERIFIED (R1)**, but worth checking.
- `bank-statement` (L330): "12 prior-day statements; one is missing". Helvetic has 12 accounts, so it has received **11**. The Chinese time-zone logic is also wrong again (see the positioning review).
- `interest-rate-swap` (L535): "fixed 1.1% for 3 years". With SARON at about 0% and the SNB at 0% (the manual's autumn-2026 levels), a 3-year CHF swap rate around 1.1% looks high. The CHF swap curve has been well below 1% in the recent zero-rate regime. **UNVERIFIED (R1)**; label it illustrative or lower it. Also note that swapping *revolving* drawings is awkward in practice (the drawn amount fluctuates, and hedge-accounting designation is harder), which is a nice nuance to add.
- `payment-factory` (L446): "payment proposals from 28 ERPs". `companies.yaml` describes GlobalChem as "SAP S/4HANA with SAP treasury modules". 28 ERPs is plausible after acquisitions but should be reflected in companies.yaml, or reduced ("SAP plus a dozen local ERPs from acquisitions").
- `liquidity` versus `liquidity-headroom` give two different headroom formulas (one minus the minimum operating cash; one minus forecast needs over a period). Both occur in practice. Say so in one of them.

## Unsupported or mis-cited claims (sources file)
- **Source verification was impossible in R1** (all publisher domains blocked). Every numeric note in `core.yaml` is **UNVERIFIED (R1)**.
- `afp-sr-2025`: the publisher is "AFP via ctmfile.com" and the title is a paraphrase. This is a **secondary news source** standing in for a survey. Register the actual AFP publication (title, year, n).
- `swift-iso-mt9xx`: attributed to "Swift (as summarised by … State Street)" with a **Japanese-language State Street URL**. Use Swift's own page.
- `six-sps-cash-mgmt`: the URL points to a SIX glossary/FAQ page, not the implementation guideline named in the title.
- `act-what-is-treasury`: the URL is the ACT homepage. `eact-guiding-principles`: no year.
- `kpmg-gts-2025` and `act-hsf-debt-2025` are registered but, as far as I can see, not cited by the exemplars. That is harmless. The `act-hsf-debt-2025` note relies on a Global Treasurer summary; prefer the ACT report page.
- **Primary-source balance**: of 13 sources, 4 are second-hand summaries (ctmfile, State Street, Global Treasurer, and the AFP "article" as a stand-in for the report). The brief's standard is to cite what you opened from the original publisher.

## Better example opportunities
- Many glossary examples are excellent (forward points, translation, netting, KYC workload, signatory removal taking three weeks, SAP F110, the POBO "ultimate debtor in the pain.001"). They are practitioner-flavoured and exactly right for interviews.
- `money-market-fund`: add the CHF angle. CHF MMFs yield about 0% at a 0% SNB rate, which is why Swiss treasurers talk about MMFs mostly for USD and EUR.
- `value-date`: add a Swiss example (a SIC CHF payment) alongside the SEPA one.

## Minor issues
- `mt940` uses `aka: [MT942]`. MT942 is a different message; use a related term instead.
- `swap` has `aka: [currency swap, FX swap]`. "Currency swap" is commonly used for a *cross-currency* swap, which the professional text itself distinguishes. Remove "currency swap" from aka.
- The header comment on L2 lists categories without "Accounting & tax", which AUTHORING.md includes.
- `dpo`: the "EU Late Payment Directive limits" wording is fine. Note that the proposed EU Late Payment *Regulation* (a hard 30-day cap) has an uncertain status. **UNVERIFIED (R1).**

## Verdict: REVISE
Glossary quality is generally high and the numeric examples mostly add up. The Helvetic cash-pool contradiction and the placeholder ids must be fixed before these files serve as templates, and the covenant and Alpine exposure numbers must be reconciled with `companies.yaml`. The sources file needs primary URLs and a verification pass.

---

## Cross-cutting summary for the authors
1. **Canonical-fact consistency is the top systemic problem.** Items: Helvetic has no cash pool; Helvetic has 12 accounts; Helvetic leverage is about 1.4x on the stated facts; the Alpine EUR volumes; Kleio's systems; who builds Helvetic's position (Lea); the bond-coupon week. Before round 2, run a scripted pass over every mention of each company and check it against `companies.yaml`.
2. **Rate environment.** The manual sets SNB/SARON at about 0% but still has treasurers placing CHF term deposits for yield while holding drawn RCF debt. Say explicitly, once, what a 0% CHF environment does to treasury decisions (the motive becomes diversification, reducing debt, and USD/EUR placements).
3. **Time zones and connectivity.** Fix the "Asian banks deliver late" reasoning everywhere.
4. **Sources.** Replace secondary URLs with primary ones and have a reviewer with network access verify every statistic (AFP 62%/49%/46%/73%, PwC 67/60/50, Deloitte 22% and the quoted phrase, Strategic Treasurer/TIS 68/53, the SIX 21 Nov 2026 date).
