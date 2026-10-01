# Org review: Org & Roles — round 1

Reviewer: TREASURY_ORG_REVIEWER. Scope: all 25 pages in `content/pages/org/`, `content/data/roles.yaml`,
`content/data/orgs.yaml`, `content/data/raci.yaml`, `content/data/interview-topics.yaml`,
`content/glossary/org-roles.yaml` + `org-structure.yaml`. Ownership claims cross-checked against
`content/workflows/daily-cash-positioning.yaml`, `payment-processing.yaml`, `fx-hedging.yaml`,
`month-end-reporting.yaml`, `cash-forecasting.yaml`, `large-payment-approval.yaml`, `covenant-monitoring.yaml`
and against `docs/AUTHORING.md` ("Canonical facts clarified after exemplar review") and `content/companies.yaml`.

Verification performed: `npm run check` → **0 errors, 0 warnings** (336 terms, 181 sources, 20 workflows, 94 pages,
26 roles). Independent checks: every role id used in RoleIndex/RoleCalendar/RoleKnows/RoleExists/RoleLink,
`raci.yaml` columns and `interview-topics.yaml` exists in `roles.yaml` and every registered role is reachable;
all `workflow:` refs in `raci.yaml` and `interview-topics.yaml` resolve to the 20 workflow ids; all four RACI
matrices carry the identical 19 task names (the "one workflow across sizes" matcher works); OrgChart ids
(kleio, alpine, helvetic, globalchem, us-treasurer-controller, controller-led, decentralised-group,
large-rtc-ssc) all resolve. Rendering: `node scripts/shot.mjs … "/org,/org/responsibility-matrix,/org/roles,/org/interview-finder" --full`
→ no MISSING refs, no runtime errors; read the responsibility-matrix and roles screenshots — matrix, RoleIndex
tables and legend render correctly and match the YAML. External claims spot-checked via WebSearch (results below).

## Scores (1–10)
role accuracy: **9** | organizational realism: **9** | workflow ownership accuracy: **7** | company-size nuance: **9** | usefulness for customer discovery: **9**

Overall this is a strong, genuinely practitioner-grade module: role definitions, size-by-size existence tables,
the four org charts, the front/middle/back-office treatment and the interview guidance would survive a meeting
with a real Group Treasurer. It fails round 1 on **internal coherence of the ownership artefacts** (RACI, hand-offs,
org data): the module states the Helvetic 13-week forecast cadence two incompatible ways (one of them contradicting
the canonical facts and the gold-standard workflow), the >CHF 2m payment signing rule four incompatible ways, and
the covenant-calculation ownership three ways. Those are exactly the facts a founder must get right in an interview.

## Critical errors (wrong role/responsibility/reporting line)

**C1 — Helvetic's 13-week forecast cadence contradicts the canonical fact, the gold-standard workflow and the role pages.**
Canonical (`docs/AUTHORING.md`): *"The 13-week forecast is updated **weekly**: subsidiaries submit by **Tuesday noon**,
Lea consolidates **Tue–Wed**, Daniel reviews **Wednesday**."* That cadence is used in `content/data/roles.yaml`
(Lea: "Templates are due Tuesday noon… Daniel reviews Wednesday"), `content/pages/org/roles-treasury-manager.mdx`
("Seven of eight subsidiaries submitted by Tuesday noon; France came in this morning"), `content/pages/org/roles-analyst.mdx`
("Monday: roll the model forward… Tuesday noon: collect them and chase France. Wednesday: consolidate") and
`content/workflows/cash-forecasting.yaml` ("Tuesday noon, 7 of 8 subsidiaries have submitted; France submits Wednesday
morning after two reminders", "Giulia fills in 13 weeks of this, in EUR, every Tuesday").
Four files say something else:
- `content/data/raci.yaml`, midmarket "Cash forecasting" note: *"Subsidiaries submit a template **every second Thursday**;
  Lea consolidates and flags variances; Daniel adjusts and presents the 13-week view to Thomas monthly."*
- `content/data/orgs.yaml`, helvetic whoDoesWhat: *"Subsidiary finance managers submit an Excel template **every second Thursday**…"*
- `content/pages/org/handoffs.mdx`: *"Cash forecasting (13-week) — Modelled on Helvetic, **fortnightly cycle**"* with
  steps "Monday, week 1", "Thursday 12:00 CET", consolidation "Friday".
- `content/pages/org/with-subsidiaries.mdx`: table "Fills group template **every two weeks**"; example *"**Every second
  Thursday** by 12:00 CET … Lea consolidates it on **Friday**"*.

Why it matters: the founder will ask "how often do you collect the forecast?" and get a different answer depending on
which page they memorised; at least one answer is wrong for the canonical company, and the RACI/hand-off artefacts —
the ones the app holds up as the ownership reference — are the wrong ones. Practitioner reality is mostly weekly for
a 13-week forecast at this size (the content itself argues this in `cash-forecasting.yaml` frequency).
Fix direction: standardise on the canonical weekly cycle everywhere (template out Monday, deadline Tuesday noon,
consolidate Tue–Wed, Daniel reviews Wed, one-pager to Thomas Thu); rewrite the handoffs.mdx chain timings and the
with-subsidiaries example; if a fortnightly variant is worth showing, show it explicitly as a variant, not as
Helvetic's fact.

**C2 — The >CHF 2m payment signing rule at Helvetic is stated four different, mutually incompatible ways.**
1. `content/data/raci.yaml` (midmarket "Payment approval") and `content/pages/org/with-ap.mdx` (midmarket SizeTabs) and
   `content/glossary/org-structure.yaml` (`delegation-of-authority` example): *"any payment above CHF 2m needs **one
   signature from treasury or the CFO**"* — i.e. Daniel's second signature alone would suffice.
2. `content/data/roles.yaml`, cfo calendar: *"Helvetic's signing matrix requires **two signatures above CHF 2m, one of
   them CFO or CEO**"* — Daniel alone does not qualify.
3. `content/pages/org/roles-cfo.mdx` ("Co-signs above CHF 2m"), `roles-treasury-manager.mdx` ("Payments above CHF 2m
   need Thomas's signature"), `roles-payments.mdx` ("Thomas above CHF 2m") and the canonical fact ("Thomas (CFO)
   co-signs payments above CHF 2m") — two signatures with the CFO always one of them.
4. Cross-module, but visible to the reader: `content/workflows/large-payment-approval.yaml` says the tool is
   *"configured to require **Thomas and the CEO** for single payments above CHF 2m"* and *"the matrix requires CFO and
   CEO for non-routine payments of CHF 2–10m and the board above CHF 10m"*.

Examples then apply the rule inconsistently: `content/pages/org/with-tax.mdx` releases a EUR 5m intercompany loan with
"Daniel and Thomas" (fine under (2)/(3), wrong under (4) which wants the CEO), while the large-payment-approval worked
example shows Thomas *and* the CEO signing CHF 4m.
Why it matters: "who can sign what" is the single most useful fact about an organisation and the most common
fraud-control question; the app currently cannot answer it coherently.
Fix direction: pick one matrix (suggestion: bank mandate = any two of the collective signatories; internal rule =
two signatures, one of whom is CFO or CEO above CHF 2m; board above CHF 10m — this reconciles (2), (3), (4) and the
canonical), state it once in `raci.yaml` + `roles.yaml` + the glossary example, align the with-tax and roles-cfo
wording ("one of them the CFO or the CEO", not "treasury or the CFO"), and file a request to the workflow stream in
`docs/notes/org-roles.md` if `large-payment-approval.yaml` keeps the stricter variant.

**C3 — Who computes the covenant figures at Helvetic? Three owners are named.**
- `content/data/roles.yaml`, cfo calendar: *"**Calculation by Claudia** (accounting figures) checked by Daniel (debt,
  cash definitions)"*.
- `content/data/raci.yaml` midmarket "Covenant monitoring": *"**Lea calculates** from Claudia's figures"*; same in
  `content/data/orgs.yaml` (helvetic whoDoesWhat) and `content/pages/org/roles-debt.mdx` ("Net debt per the facility
  agreement's definitions (cash, leases, bond) | **Lea calculates, Daniel checks**").
- `content/workflows/month-end-reporting.yaml`: *"With **LTM EBITDA from FP&A/controlling**, compute net debt, leverage…"*
  and its hand-off "FP&A / controlling → LTM EBITDA and outlook → Treasury analyst" (while `covenant-monitoring.yaml`
  itself sources EBITDA from the consolidation system and only the *forecast* from FP&A — the correct split).

Why it matters: the covenant certificate is a named hand-off chain in the app ("walk me through the last compliance
certificate" is one of its own recommended openers); the reader must be able to say who produced each number.
Fix direction: settle one chain — e.g. Group Accounting supplies EBITDA per the agreement's definition from the closed
accounts, Lea applies the net-debt definition and computes the ratios, Daniel checks and writes the headroom
commentary, Thomas signs, FP&A supplies only the forward outlook — and mirror it in roles.yaml (cfo calendar),
raci.yaml, orgs.yaml, roles-debt.mdx; request the workflow stream correct `month-end-reporting.yaml`'s "EBITDA from
FP&A" (its own `covenant-monitoring.yaml` contradicts it).

**C4 — Alpine has two or three banking relationships; the module and `companies.yaml` disagree.**
`content/companies.yaml` (canonical): *"2 Swiss banks (a cantonal bank as house bank + a large Swiss bank for FX,
EUR/USD and the German account); **the US subsidiary also keeps a local US account**; 9 accounts in total"*. The org
module says "two banks" throughout: `content/data/orgs.yaml` alpine summary *"9 accounts at two banks"*,
`raci.yaml` alpine *"Martin owns the two relationships"*, whoDoesWhat *"e-banking of **both** banks"*,
`roles-bank-relationship.mdx` *"the large Swiss bank provides FX and USD"* without mentioning the US bank.
If the US account is with a third (US) bank — the natural reading of companies.yaml and the pattern Kleio also uses —
then Petra has three portals, there is a third RM/KYC relationship and the "read access to both banks" statements are
wrong. Fix direction: either say explicitly "two Swiss banks plus the US subsidiary's local US bank" (and give Petra
three portals) or state that the US account sits with the large Swiss bank's US booking centre. Do not leave the
canonical file and the org charts in tension on bank count.

## Misleading universal statements

- `content/pages/org/structures.mdx`: *"Centralisation **almost always** happens in the same order, because the early
  steps need only policy and the later ones need systems…"* The sequence (policy → visibility → funding →
  rationalisation → pools/netting → payment factory) is a real pattern, but many groups reverse steps (payment factory
  with an ERP programme before pooling; account rationalisation only *after* a TMS; POBO driven by fraud). Practitioner
  variation, not a law — soften to "typically in roughly this order; acquisitive or ERP-driven programmes reorder it".
- `content/pages/org/with-ar.mdx` (multinational SizeTabs): *"Treasury uses aging data from the ERP and **statistical
  payer-behaviour models**"*. Most large groups still adjust receipts with credit-manager judgment plus static
  per-customer lags; statistical/ML payer models are a minority practice (and now a vendor category). Say "some groups
  use statistical payer-behaviour models; many still rely on regional credit managers' judgment" — otherwise a founder
  will ask "which model do you use?" and sound naive.
- `content/pages/org/with-accounting.mdx` (confusion callout): *"Hedge accounting (**IFRS 9 in Europe**) is an optional
  accounting treatment…"*. Helvetic reports under **Swiss GAAP FER** (canonical), where FER 27 applies and effectiveness
  testing is not required — as `content/workflows/fx-hedging.yaml` correctly states ("IFRS 9 or FER 27"). "in Europe"
  wrongly equates the continent with IFRS; Swiss, UK GAAP and FER reporters exist. Fix: "(IFRS 9 for IFRS reporters;
  FER 27 or local GAAP otherwise)".
- `content/pages/org/handoffs.mdx`: *"**Most treasury problems happen at hand-offs**, not inside anyone's own task"* —
  stated as fact; it is a plausible field belief but unmeasured. The neighbouring callout ("Practitioners describe…")
  does hedge; apply the same hedge to this sentence.
- `content/pages/org/roles-cfo.mdx` (relationship with head of treasury): *"The CFO is **often** a former auditor or
  controller"* — fine with "often", but it is asserted from no source; mark as field impression or drop.
- `content/data/interview-topics.yaml`, `liquidity` sizeNote (multinational): *"**much positioning is automated** and
  the human work is exceptions and funding decisions"* — true of mature pools/TMS shops; many multinationals still
  position manually outside EUR/USD pools (GlobalChem's own story says "many other currencies are managed account by
  account"). Add "in mature set-ups".
- `content/data/raci.yaml` startup "Bank account opening": `board: A` for every account opening. The note only defends
  board involvement for a *new banking relationship* (post-SVB); the board does not approve a routine additional
  account at an existing bank. Split the row or scope the code ("board approves new banks/relationships").

## Ownership unclear or wrong (by workflow)

Cross-check basis: the workflow YAMLs' `people`, `steps[].who` and `handoffs` blocks, plus the four spot-checked
workflows named in the task.

- **Daily cash positioning** — coherent everywhere (RACI rows, `orgs.yaml` whoDoesWhat, Lea 07:45 → Daniel 08:30–09:15,
  Alpine/Petra, GlobalChem/Priya's desk + Marta statement completeness). Matches
  `daily-cash-positioning.yaml` people/steps. No issues. This is the best-executed row in the module.
- **Cash forecasting** — ownership *chain* is right (Lea consolidates / Daniel overrides-haircuts / subsidiaries and
  AP-AR-tax-FP&A feed / Thomas decides), but see **C1** for the cadence contradiction and see C3 for the covenant-EBITDA
  knock-on. Also `raci.yaml` midmarket says Daniel "presents the 13-week view to Thomas **monthly**" while
  `roles.yaml` (treasury-manager calendar) has a **weekly** one-page note to Thomas and a Monday catch-up — decide
  whether the CFO sees the 13-week weekly or monthly and use it consistently.
- **Payment processing / large payment approval** — see **C2**. Secondary: `raci.yaml` midmarket "Payment preparation"
  marks `subs: O` (subsidiary AP owns preparation) while the parent's AP is a mere `P`; the "owner" of a distributed
  preparation step is really "each entity's AP lead" — consider an explanatory note. `content/pages/org/roles-treasury-manager.mdx`
  has Daniel release "a batch of 41 Swiss supplier payments" **on a Wednesday**, while `roles.yaml` (accounts-payable,
  treasury-manager calendars) says HM AG runs are prepared **Tuesday and Thursday** — reconcile the days.
- **FX hedging** — chain is accurate (Lea computes, Daniel deals within mandate, Lea matches confirmations, accounting
  books/documented, CFO/board approve outside policy; matches `fx-hedging.yaml`). Timing gap: `fx-hedging.yaml` step
  "Calculate the hedge requirement — after the monthly exposure report (e.g. **WD7**)" vs `roles.yaml` Daniel's calendar
  "**WD5** monthly — Monthly hedge layer". A layer placed at WD5 cannot use exposure data arriving WD7; move the layer
  after the exposure consolidation or state that exposures arrive earlier and the layer runs WD5.
  Also minor band drift: `roles-analyst.mdx` and `roles-fx-risk.mdx` say Lea computes cover "against **the 60–90% band**",
  while the canonical policy is graded (Q+1 60–90%, Q+2 40–70%, Q+3 25–55%, Q+4 0–40%); and `fx-hedging.yaml`'s dated
  example maps 60–90% onto the *current* quarter (Q4 2026 on 8 Oct) whereas `roles.yaml` describes 60–90% as "the next
  quarter". Define the buckets as time bands (0–3 months etc.) once and use them everywhere.
- **Month-end reporting** — see **C3** (EBITDA provider). Everything else (Lea's deal list WD1–3, accounting books,
  Daniel's report WD6–8, quarterly audit-committee section) matches `month-end-reporting.yaml` and `roles.yaml`.
- **Funding a subsidiary** — consistent and good: Daniel decides instrument/amount, tax sets rate and flags thin-cap/WHT
  (the with-tax example correctly reaches for the Swiss–EU interest/royalty agreement and Italian deductibility limits),
  legal documents, Lea prepares, accounting books both sides. Matches `funding-subsidiary.yaml` and the RACI rows.
- **Cash pooling** — consistently labelled "no pool at Helvetic, manual IC-loan concentration; EUR pool under evaluation"
  in `raci.yaml`, `orgs.yaml`, `structures.mdx`, glossary `back-office` example. Complies with the canonical fact. Good.
- **Bank account management / bank reconciliation / fraud response** — coherent across RACI, hand-offs and workflows
  (accounting owns reconciliation at all but the largest tier; treasury supplies deal data; recall-first fraud chain
  follows the BACS-recommended sequence). No ownership errors found.
- **Front/middle/back office** — definitions follow the ACT correctly and the "middle office is often not a team"
  nuance is handled well. Two points: (a) `structures.mdx` front/middle/back table gives Helvetic a middle-office
  activity — *"Thomas reviews limits monthly"* — that appears nowhere else (his calendar has a weekly 30-minute
  catch-up, no limit review); either add it to the CFO calendar or change to "Daniel monitors limits; Thomas reviews
  them at the monthly report"; (b) at GlobalChem the middle-office "treasury control" sits **inside Marta's back-office
  and payment-factory team** — a real-world compromise worth one sentence of warning (limit monitoring inside the team
  that releases payments weakens independence; the module only defends the reporting line to Anna).

## Size-nuance problems

Size handling is the module's strongest dimension — per-role `exists:` blocks, SizeTabs on nearly every page, the
role-page pattern tables (Treasury Manager patterns A–D), and interview-topics `sizeNote` blocks all distinguish
70 / 320 / 2,600 / 17,000-employee realities (e.g. "Alpine has none; Petra does the work", "Daniel is effectively
Helvetic's head of treasury", "Specialists on each desk"). Remaining gaps:

- The `/org/index.mdx` stage table column "Small (Kleio / Alpine)" merges the startup and SME tiers that the rest of
  the manual insists on separating (Kleio has no daily position at all; Alpine has a daily 08:30 cash sheet). Split
  the column or annotate per cell.
- `content/data/roles.yaml` `cash-manager` midmarket says "Usually not a separate role… A larger mid-market group
  (CHF 1–3bn) may have a cash manager" — good — but the `/org/roles-cash-manager.mdx` page then never shows what the
  job looks like at that CHF 1–3bn stage (only GlobalChem examples). One mid-market cash-manager example would close
  the gap between "Daniel does everything" and "Priya's 6-person desk".
- Mid-market band drift: the manual variously defines the Daniel-style pattern as "CHF 300m–2bn" (roles-treasury-manager),
  "CHF 300m–2bn revenue, 5–20 subsidiaries" (pattern A), and "roughly CHF 300m–2bn" (orgs.yaml helvetic typical:
  "CHF 300m–2bn"). Consistent enough; note that "treasury of 1–5 people" (orgs.yaml) vs "0–2 analysts" (pattern A) is
  fine as a range but worth one sentence saying where the 2–5-person variant sits.
- `with-ar.mdx` and `with-subsidiaries.mdx` mention credit insurance and receivables finance "may be run by treasury"
  at multinationals without the size caveat that this is mostly a large-group/working-capital-programme practice; the
  SME/mid-market reader may assume it exists. (Minor.)

## Interview-usefulness gaps

Overall the interview layer is excellent: the doer-first/reviewer-second/decider-third rule, "what did you do this
morning" openers, the first-two-minutes pattern check for Treasury Managers, the fraud-topic sensitivity rules
("never ask for thresholds or call-back numbers"), the "analysts are underrated, managers compress" guidance, and the
"when the org chart doesn't match" section (SSC, RTC, consultants) are all genuinely founder-useful.

- **No topic for organisation, policy and governance.** The founder's most common discovery question at CFO/treasurer
  level is "how is treasury organised and governed here — policy, mandates, treasury committee, board reporting?".
  `interview-topics.yaml` has 12 workflow topics but none for policy/governance/organisation design
  (`policy-compliance` is only a sub-bullet of `fraud`). The material exists in scattered callouts
  (`/org/index.mdx` "Map the organisation in the first ten minutes"); give it a finder entry.
- **InterviewFinder does not warn about the single most common trap at SMEs**: the person with "treasury" in the topic
  is often the *only* finance person (Petra), who will answer five topics in one hour and mix current with historical
  jobs. One sentence ("ask which hat they are wearing for each answer") would help.
- **Bank-side interviewing is thin** in the finder (`bank-rm` is in one `less` list and one `also` list): bank RMs are
  often the *easiest* interviews for a founder to get and the module's own warning ("sales-driven, treat as vendor
  view") should be reachable from the finder, not only from `/org/roles-bank-relationship`.
- **No "how many, how long" prompts.** For workflow-discovery the most valuable follow-ups are quantitative
  ("how many payments per run", "how many confirmations unmatched per week", "how long does KYC take"); they appear
  on role pages but not in the finder's openers. Add 2–3 to each topic's openers.
- Minor: several openers are double-barrelled ("What was the last day the position looked wrong, and how did you find
  out why?") — fine for practitioners, but a founder should ask the first half and let silence do the rest; a note to
  that effect would raise the yield.

## Questionable statements (list every one)

Numbers/claims I could verify are marked; everything else is **UNVERIFIED (R1)** per the brief (WebFetch blocked; only
search-result text available), not "wrong".

1. `content/pages/org/responsibility-matrix.mdx` — *"six functions plus eight subsidiaries at Helvetic, and five
   functions plus 40 reporting units at GlobalChem"*: the RACI cash-forecasting rows show **five** non-subsidiary data
   contributors at Helvetic (accounting, FP&A, tax, AP, AR) and **four** at GlobalChem (corporate finance, FP&A, tax,
   SSC) with subsidiary finance as a fifth/fourth D-cell — the sentence counts subsidiary finance as a "function" and
   then again as "plus subsidiaries". Recount (verified against `raci.yaml`).
2. `content/pages/org/responsibility-matrix.mdx` — *"At Kleio the CFO owns 16 of the 19 rows"* and *"she owns four"
   (Group Treasurer at GlobalChem)*: **verified correct** by counting `raci.yaml` cells. Good.
3. `content/pages/org/structures.mdx` — *"Helvetic | … | Thomas reviews limits monthly; no separate function"*:
   unsupported elsewhere; contradicts the CFO calendar in `roles.yaml`. UNVERIFIED (R1) / internally inconsistent (see above).
4. `content/pages/org/index.mdx` — *"In Deloitte's 2024 global survey (213 respondents) … more than 95% of
   respondents"* (value-adding partner to the CFO part of the mandate): the survey and 213 respondents are
   **verified** (deloitte.com 2024 Global Treasury Survey PDF); the *">95%"* is **UNVERIFIED (R1)** — Deloitte's own
   summaries say "vast majority"; the 2022 edition reported 91% "critical or important". Cite the exact chart or soften.
5. `content/pages/org/index.mdx` / `roles-treasury-manager.mdx` — *"AFP's 2025 summary put companies below USD 1bn
   revenue typically at 1–3 treasury FTE"*: **UNVERIFIED (R1)** (plausible; the 2026 AFP figure of 46% of orgs with
   fewer than 5 treasury employees is **verified** via AFP's own press release, 425 respondents, May 2026).
6. `content/pages/org/structures.mdx` — *"Singapore's Finance and Treasury Centre incentive offers a concessionary 8%
   or 10% tax rate"*: **verified** (ACT UK treasury-centre paper; EDB summaries). The substance conditions
   *"(for the 8% rate on a first award: at least 4 treasury professionals in Singapore and S$1.5m annual spend)"*:
   **UNVERIFIED (R1)** — award terms are negotiated; sources confirm only "dedicated treasury team + meaningful
   business spending". Keep the numbers but mark them as indicative award terms.
7. `content/pages/org/structures.mdx` — *"Nestlé's Singapore treasury centre, set up in 1998, runs treasury activities
   for all Nestlé entities in more than 20 Asia-Pacific markets with front, middle and back office segregated"*:
   **UNVERIFIED (R1)** (Treasury Today article; plausible, and the page's evidence note already flags practitioner
   sources as possibly dated).
8. `content/pages/org/structures.mdx` — *"ABSL counted 2,081 business-service centres employing about 488,700 people in
   Poland at the end of Q1 2025"*: **UNVERIFIED (R1)** (plausible; ABSL annual report).
9. `content/pages/org/structures.mdx` — *"Siemens Gamesa built an in-house bank and payment factory across 235 legal
   entities in 85 countries and reports closing about 600 bank accounts"*: **UNVERIFIED (R1)**, but correctly labelled
   vendor-published in the text. Acceptable.
10. `content/pages/org/roles-bank-relationship.mdx` — *"in one vendor-sponsored survey of 250 treasurers, 92% said
    banks asked for the same information more than once"*: **UNVERIFIED (R1)**; correctly labelled vendor-sponsored.
    Acceptable with the caveat.
11. `content/pages/org/with-subsidiaries.mdx` — *"Deloitte's 2024 global treasury survey found forecasting still
    primarily spreadsheet-based for many respondents and noted that business forecasts tend to focus on revenue and
    margin rather than cash"*: **UNVERIFIED (R1)** (plausible; PwC 2025 independently reports 52% of USD 1–10bn firms
    still consolidate forecasts manually — a verifiable alternative).
12. `content/data/orgs.yaml` (globalchem note) — *"PwC's 2025 survey reports in-house banks at 67%, payment factories at
    60% and POBO at 50% of respondents above USD 10bn … GlobalChem (about USD 8.7bn) is plausible but on the smaller
    side"*: **verified** against PwC's own page (and "350 treasurers worldwide" verified). The self-critical sizing note
    is good practice.
13. `content/pages/org/with-ap.mdx` — *"2025 AFP Payments Fraud and Control Survey (521 mainly US practitioners), 79% …
    63% named business email compromise the leading avenue"*: **verified** (AFP press release 15 Apr 2025; 521 corporate
    practitioners; 79% attempted/actual fraud in 2024; BEC 63%).
14. `content/glossary/org-roles.yaml` (`cash-disposition`) — *"Bosch's English-language cash-manager ad describes 'daily
    cash operations, including cash disposition and liquidity forecasts'"*: consistent with the registered source note;
    quote itself **UNVERIFIED (R1)** against the ad.
15. `content/pages/org/roles-treasury-manager.mdx` (job-ads callout, SIX and Kraków ads) and
    `content/pages/org/roles-operations.mdx` (Deutsche Börse, Kraków team-lead ads), `roles-fx-risk.mdx` (Disney ad):
    **UNVERIFIED (R1)** individually but registered in `content/sources/org-roles.yaml` and appropriately hedged as
    single-employer evidence ("They show the range, not a statistic"). Keep.
16. `content/pages/org/roles-treasury-manager.mdx` — Wednesday narrative *"releases a batch of 41 Swiss supplier
    payments"* vs `roles.yaml` *"HM AG supplier batches (Tue and Thu)"*: internal timing inconsistency (see workflow section).
17. Hedge-band wording — *"Compute cover per currency and month against the 60–90% band"* (`roles-analyst.mdx`), *"Lea
    computes cover against the 60–90% band"* (`roles-fx-risk.mdx`) vs the graded canonical bands and
    `fx-hedging.yaml`'s per-quarter table: the single-band phrasing is a simplification that will mislead on Q+2…Q+4.
18. `content/pages/org/with-tax.mdx` — *"which relief (treaty or Swiss–EU agreement) is available"* for Italian WHT on
    interest to a Swiss parent: technically sound (Italy–Switzerland DTT and the EU–Switzerland interest/royalty
    agreement for associated companies); flagging as **correct and unusually precise** — keep.
19. `content/pages/org/roles-debt.mdx` — *"debt due within 12 months is shown as a current liability"*: correct
    (IAS 1 / FER reclassification); no issue.
20. `content/pages/org/roles.mdx` — career-ladder cite `learnsignal-career-2026` is a training-provider blog; fine as
    corroboration next to the ACT framework, but the ladder claim ("usually Treasury Analyst → …") is the kind of
    statement to keep hedged as it currently is ("usually").

## Verdict: REVISE

Role accuracy (9), organizational realism (9), company-size nuance (9) and interview usefulness (9) are at or above
the bar, and the module's factual claims held up under spot-checking (PwC 2025, AFP 2025/2026, Deloitte 2024 sample
size, ACT office definitions all verified). But **workflow ownership accuracy is 7** because the ownership artefacts
themselves disagree with each other and with the canonical facts: the Helvetic 13-week forecast cadence (C1), the
>CHF 2m signing rule (C2), the covenant-calculation chain (C3) and Alpine's bank count (C4) each have 2–4 conflicting
versions inside this module. Under the brief's rule (PASS requires all scores ≥8 and no major role errors), this is
**REVISE**. Fixing C1–C4 plus the smaller coherence items (weekly vs monthly CFO forecast review, WD5 vs WD7 hedge
layer, "60–90% band" wording, "Thomas reviews limits monthly") should move ownership accuracy to 9 without new
research. Suggested ownership of fixes: C1/C2/C3 in `raci.yaml`, `orgs.yaml`, `roles.yaml`,
`handoffs.mdx`, `with-subsidiaries.mdx`, `with-ap.mdx`, `roles-debt.mdx`, glossary `delegation-of-authority`; requests
to the workflow stream (`month-end-reporting.yaml` EBITDA source, `large-payment-approval.yaml` signing wording,
`fx-hedging.yaml` WD7 layer timing) go in `docs/notes/org-roles.md` per the authoring rules.
