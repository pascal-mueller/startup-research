# Review: Exemplar modules — round 2

Reviewer: independent (fresh context, no stake in the content). Date: 2026-09-30.
Scope: `content/pages/start/*.mdx`, `content/workflows/daily-cash-positioning.yaml`, `content/workflows/cash-forecasting.yaml`, `content/glossary/core.yaml`, `content/sources/core.yaml`, checked against `content/companies.yaml`, `docs/AUTHORING.md` (canonical facts) and, where relevant, other streams' files (cited as cross-module evidence only).

STEP 3 (rendering/checks) results, before the critique:
- `npm run check`: **0 errors, 0 warnings** (336 terms, 181 sources, 20 workflows, 94 pages).
- `scripts/shot.mjs --full` on `/start`, `/start/growth`, `/workflows/daily-cash-positioning`, and additionally `/start/neighbours`, `/workflows/cash-forecasting`, `/glossary/dio`: **no MISSING refs, no runtime errors** on any route (R1's missing-workflow refs are gone; all 20 workflows now exist). PNGs read: `/start` (flow now `direction="col"` — R1's wrapping issue resolved; sources block renders the new primary citations) and the daily-positioning worked-example table (12 rows, all statuses and term tooltips render correctly).
- Statistic verification: the egress proxy still blocks direct fetches, but WebSearch returned text **from the original publishers** (AFP/financialprofessionals.org, PwC, Deloitte, EACT/EACT PDF, Strategic Treasurer/TIS PDF, Swift, SIX, SNB, EUR-Lex/ECB). Outcomes are marked in "Unsupported or mis-cited claims". Anything not seen in the publisher's own text is marked **UNVERIFIED (R2)**.

---

## R1 issue fix-verification table

Status key: **FIXED** / **PARTLY FIXED** / **NOT FIXED**. All file:line references are current round-2 state.

### Start Here block (R1 issues 1–4, missing, unrealistic, vague, unsupported, better-examples, minors)

| # | R1 issue | Status | Evidence (round 2) |
|---|---|---|---|
| M1 | Growth table contradicts Helvetic (15–100 vs 12 accounts); "cut its from" typo | FIXED | `growth.mdx:49` "from about 10 to 100 accounts (Helvetic, after cutting its accounts from 31 to 12 in 2024, sits at the low end)"; table `growth.mdx:106` "10–100". Typo gone. |
| M2 | Daniel/Lea ownership split inconsistent (index had Daniel building the position) | FIXED | `index.mdx:60` "Lea … builds the cash position; Daniel … reviews it and decides"; callout `index.mdx:64–70` Lea 07:30–08:40, Daniel 09:10–10:00; `index.mdx:74` "When Lea is on holiday, Daniel does all of it himself" (the suggested key-person note is in). Matches workflow `daily-cash-positioning.yaml:177–207`. |
| M3 | Missing "when does a company first need a treasurer?" | FIXED | `growth.mdx:77–93` new section with the seven triggers, correctly labelled a field note, with the interview question. |
| M4 | Treasury vs controlling under-served | FIXED | `neighbours.mdx:66–82` full section: what controlling owns, what treasury needs, "where they collide: the medium-term plan", Marco/Daniel at Helvetic, Alpine does both, interview callout. |
| Miss1 | Gross vs net cash; why hold cash while borrowing | FIXED | `index.mdx:76–86` (trapped CNY, operating floats, intra-month swings, interest periods, currency mismatch, undrawn CHF 140m as the real reserve). |
| Miss2 | Cash vs profit vs VAT (gross receipts) | FIXED | `neighbours.mdx:54` (treasury gross incl. VAT, FP&A net) + glossary `vat-cash`. |
| Miss3 | Treasury vs tax | FIXED | `neighbours.mdx:84–93` (safe-harbour rates, pooling sign-off, repatriation, tax payments as lumpy lines). |
| Miss4 | Front / middle / back office | FIXED | `growth.mdx:66` with `front-middle-back-office` term (defined in glossary/interview.yaml). |
| Unr1 | Chinese statement "arrives ~10:00" time-zone logic | FIXED | `index.mdx:64` "(Time zones are not the problem: the Chinese business day ended while Switzerland slept.)" + connectivity reason. See workflow/glossary rows. |
| Unr2 | Intercompany transfer needs framework agreement mention | FIXED | `index.mdx:67` "a drawing under the existing intercompany framework agreement (priced at arm's length, so no new contract is needed)". |
| Vague1 | "A treasurer chasing yield is a red flag" | FIXED | `index.mdx:96` SLY order with `investment-policy` link; `index.mdx:106` "breaking the policy, not showing skill". |
| Vague2 | SME cash visibility "weekly" | FIXED | `growth.mdx:108` "Portals daily; spreadsheet on payment days" (see Minor 7 for a residual wording wobble). |
| Src1 | AFP 73% cited to ctmfile write-up; "68% in 2022" | FIXED | Now `afp-top-tasks-2025` (AFP's own article) at `index.mdx:111`; the 68%-comparison was dropped with an honest note in `sources/core.yaml:26`. |
| Src2 | AFP 62% stale vs 2026's 49% | FIXED | `index.mdx:111` gives both editions; `cash-forecasting.yaml:330–332` likewise. |
| Src3 | EACT 2025 / PwC 2025 unverified | FIXED | Verified against EACT's own page/PDF (priority #1, 30.5%) and PwC's own page (350 treasurers). |
| Src4 | EACT *Guiding Principles* no year | FIXED | `sources/core.yaml:97–103`: 4th edition, English 2025. |
| Src5 | ACT URL is the homepage | FIXED | `sources/core.yaml:90–96`: treasurers.org/hub/careers/what-is-treasury. (URL itself UNVERIFIED (R2) — see claims section.) |
| Src6 | growth AFP 1–3 staff / ~12 FTE / "46% fewer than five" | FIXED | The 46% figure is removed (`sources/core.yaml:33` explains why). 1–3 FTE and ~12 FTE (`growth.mdx:58`) verified verbatim against AFP's own article "Examining benchmarks for treasury teams". |
| Src7 | PwC 67/60/50 denominator | FIXED | `growth.mdx:73` now mirrors PwC's own wording ("organisations with more than USD 10bn revenue … 67% adoption / 60% / 50%"), verified verbatim. |
| Src8 | "well over a hundred (field observation)" | NOT FIXED (acceptable) | `growth.mdx:66` unchanged; still honestly labelled "field observation, not a survey figure". No action required. |
| Ex1 | 30-person snapshot never mentions Kleio | FIXED | `growth.mdx:28–30` tier renamed "30–100-person startup", Kleio named with its facts. |
| Ex2 | Yield motive for CHF placements | FIXED | `growth.mdx:35` (safety/diversification, USD money-market rates); reinforced by `index.mdx:88–98`. |
| Ex3 | Alpine "almost all costs in CHF" vs glossary/company | FIXED | `index.mdx:29` "most of its costs are in Swiss francs (only some components are bought in EUR)". |
| Min1 | "cut its from" typo | FIXED | See M1. |
| Min2 | `<Flow>` wraps 4+3 at 1440px | FIXED | `index.mdx:49` `direction="col"`; screenshot confirms a single column. |
| Min3 | Czech dividend double-count at group level | FIXED | `neighbours.mdx:60` "(it matters in the parent's cash forecast, but nets to zero in the group view, so counting it at group level would double-count)". |
| Min4 | "usually derives it from FP&A" | FIXED | `neighbours.mdx:62` "in other companies FP&A or controlling own it and treasury reviews it. Practice varies, so ask." |

### Daily cash positioning block

| # | R1 issue | Status | Evidence |
|---|---|---|---|
| C1 | Time-zone reasoning backwards (Asian statements arrive late) | FIXED | `daily-cash-positioning.yaml:85–93` (Asian prior-day statements "among the first available"; US close 22:00–23:00 Swiss time; missing statement = connectivity: "common for domestic banks in China"); example `:177`; glossary `bank-statement` `core.yaml:330`; index `:64`. All four places corrected. |
| C2 | CHF 2m/3m deposit at 0% while RCF drawn | FIXED | Step 6 `:136–138` ("if the company has drawn debt, reducing the drawing at the next interest-period rollover usually beats a deposit"); example 09:10 `:205` ("The CHF 35m RCF loan is in an interest period to 15 January … the reduction decision waits for that rollover. He leaves the cash on the current account."). |
| Miss1 | Booked vs available vs value-dated / float | FIXED | Data `:50–55`, failure mode `:229–231`, glossary `available-balance` `core.yaml:538–546` (three balances, card holds). |
| Miss2 | Intercompany loan framework | FIXED | Step 6 `:133–134` + glossary `intercompany-framework-agreement` `core.yaml:586–593`; example `:201`. |
| Miss3 | Same-day EUR mechanism; SCT Inst / IPR currentness | FIXED | Step 7 `:152–156` ("SEPA credit transfers are not same-day guaranteed; same-day EUR means an urgent/express payment or SCT Inst"); evidence note `:335–337` with IPR dates; source `ecb-ipr`. |
| Miss4 | Why the RCF is drawn while cash is held | FIXED | `index.mdx:76–86` + example `:205`. |
| Miss5 | The daily output format | FIXED | Step 6 `:140–141` + `manual_work:256` (one-page position email contents). |
| Unr1 | "German controller" for trade tax | FIXED | `:196` "Jens confirms it is real"; people list `:28` "Subsidiary finance managers / local accountants". |
| Unr2 | "Quarterly trade-tax prepayment the local team forgot to submit" | FIXED | `:196` direct debit "nobody had put it in the forecast"; `:192` Daniel adds all four statutory dates; glossary `direct-debit` `core.yaml:563`. |
| Unr3 | Minimum-balance definitions conflict (2.0m / 10m) | FIXED | Data `:67–73` defines account minimum vs CFO group minimum vs headroom; glossary `minimum-operating-balance` `core.yaml:554` states the three Helvetic layers explicitly. |
| Unr4 | Multinational variant: sweeps can silently fail | FIXED | `:238–240` (failure mode with morning sweep/IHB check) + by_size `:272–278`. |
| Vague1 | Cut-off range "before 10:00–14:00" | FIXED | Step 7 `:151–156` concrete illustrative cut-offs per currency block, "they vary by bank and channel", USD "mid- to late afternoon". |
| Vague2 | "At large companies this runs continuously" | FIXED | Step 9 `:171–173` (camt.052/API every 15–60 min, alerts, camt.054, instant credits "at any hour including weekends"). |
| Src1 | Deloitte 22% "requires development" | PARTLY FIXED | 213 respondents and the qualitative phrase verified against Deloitte's own page; the **22% figure is UNVERIFIED (R2)**. |
| Src2 | swift-iso-mt9xx sourced to a State Street JP page | FIXED | `sources/core.yaml:83–89` now a Swift PDF; content verified against swift.com ("coexistence ended 22 November 2025"; MT940/942 "until an end date is defined" per Swift/BNY notices). |
| Src3 | six-sps-cash-mgmt URL ≠ the named document | PARTLY FIXED | `sources/core.yaml:69–75` now names and links SIX's Roadmap Swiss Payments page (which does say the parallel phase runs "up until the standard release in November 2026" — verified), and the MT940-end-date claim is correctly moved to the ZKB factsheet. The 14 vs 21 Nov 2026 discrepancy is honestly noted. ZKB PDF URL itself UNVERIFIED (R2). |
| Src4 | Vendor positioning claims (Trovata/Agicap/Atlar/Embat) | FIXED | `:245–247` "The vendors in that space position themselves differently (for example …)" + "examples, not endorsements". |
| Ex1 | Add a fraud-flavoured exception | FIXED | `:198` the CHF 180k duplicate investigated as "the fraud-shaped exception" — same beneficiary/IBAN, camt.054 trace, and the counterfactual recall. Exactly what R1 asked for. |
| Ex2 | Kleio "CHF 8m in 3-month deposits" at 0% SARON | FIXED | `:281–285` CHF MMF "for counterparty diversification after SVB rather than for yield"; USD in a USD government MMF "which does earn a money-market rate". |
| Min1 | `terms:` references placeholder id `rtgs-note` | FIXED | `:324` uses `cut-off-time` (now defined in glossary/interview.yaml). |
| Min2 | frequency vs SME variant | FIXED | `:19–22` "the accountant glances at portal balances daily and builds the fuller account-by-account view on payment days". |
| Min3 | Add credit advices confirming receipts intraday | FIXED | `:58` (camt.054 / MT910 before the next statement). |

### Cash forecasting block

| # | R1 issue | Status | Evidence |
|---|---|---|---|
| M1 | Cross-module timeline (coupon "next week" vs "week 6") | FIXED | The coupon is gone from both examples; positioning `:205` names only 25 Nov payroll + December payrolls; forecasting low point is week 4 (w/c 14 Dec) at CHF 18m (`:201`), and `index.mdx:69` says "mid-December" — consistent. |
| M2 | Payroll/supplier scale implausible (6.1m/week group payroll; 9.5m/week suppliers) | FIXED | Payroll is now split by entity-week (CZ/CN/US mid-month `:186`, CH/DE at month-end `:198`), Swiss ≈7.0 + German EUR 4.2m ≈ 3.9 + 13th ≈5.5 (`:198, :201`); suppliers ≈6.8–7.3m/week (`:185`). Sanity check: ≈CHF 16m/month payroll (≈190m/yr) + ≈380m/yr suppliers ≈ the 570m cost base implied by CHF 650m revenue at the canonical CHF 78m EBITDA. Coherent. |
| M3 | Deposit-at-0%-while-RCF-drawn again | FIXED | `:208` "(1) No deposit … (2) Debt: … Daniel pencils in a reduction of that loan by CHF 10–15m at the 15 January rollover … it can be redrawn at a few days' notice" (consistent with the 3-business-day notice in credit-facility-management). |
| Miss1 | Forecast-accuracy measurement | FIXED | Step 10 `:166–174` (fixed lags 1 and 4 weeks, absolute error + sign for bias, "'±10%' means nothing without the category, the lag and the entity") + data `:79–81`. |
| Miss2 | Currency dimension → FX hedging | FIXED | Data `:76–78`; example `:208` net EUR inflows EUR 30m over 13 weeks → Q1 2027 EUR 40m vs EUR 30m forwards = 75% inside the 60–90% band (consistent with glossary `hedge-ratio` and the canonical bands). |
| Miss3 | Direct vs indirect seam | FIXED | `:210` "Where the 13 weeks meet the 18-month plan … reconcile them line by line: usually working-capital timing and VAT". |
| Miss4 | Why 13 weeks | FIXED | evidence_note `:334–336` (one quarter, VAT/tax cycle, lender-monitoring and restructuring lineage, labelled practice not survey). |
| Miss5 | Gross vs net of VAT | FIXED | Data `:57–58, :61`; failure mode `:232–234`; VAT example `:199` (Swiss Q3 settlement due 30 Nov — correct 60-day rule, verified). |
| Unr1 | "Weekly … at mid-market **and large** companies" | FIXED | `:15–20` "Practice varies… Many large multinationals instead collect monthly entity submissions…" |
| Unr2 | Variance analysis order | FIXED | Step 2 `:90–98` is now first ("Many teams do this first, on Monday … others do it after consolidation"). |
| Unr3 | Supplier −0.3 "run released a day early" | FIXED | `:185` "Two German invoices approved late and added to the run (0.3)" + the CHF 180k duplicate as timing 0.2. |
| Vague1 | "sales down 20%" not how a 13-week forecast is stressed | FIXED | Step 8 `:152–154` "receipts in weeks 1–8 come mostly from invoices already issued … 'sales down 20%' mainly hits weeks 9–13". |
| Vague2 | ML-prediction software claim | Unchanged, acceptable | `:247–248`; ai_note correctly flags vendor-reported evidence. |
| Src1 | AFP 62/49, ST/TIS 68/53, EACT, Deloitte quote | PARTLY FIXED | 53% and 39%→53%/28%→14% verified (TIS PDF); 62% verified in substance; **49% and 68% are UNVERIFIED (R2)**; the unverified Deloitte verbatim quote was removed (`sources/core.yaml:47`). |
| Src2 | Surface "vendor-sponsored" in the evidence text | FIXED | `:332` "in the vendor-sponsored Strategic Treasurer/TIS 2025 survey". |
| Src3 | Lender-required 13-week: label as practice | FIXED | `:19–20` "(a contractual practice, not a general rule)". |
| Ex1 | Add a mini 13-week strip | FIXED | `:194–206` with week-by-week closes, drivers, trapped-cash adjustment ("usable figure is about CHF 12m"). But see Critical 2 (opening balance). |
| Ex2 | Show one subsidiary template row | FIXED | `:190` HM Italia week 3 with a checkable net (+0.5). |
| Ex3 | Kleio prepayment muddle | FIXED | `:277–281` deferred-revenue framing ("still owes a year of service … judges runway on average burn across the whole annual cycle"). |
| Min1 | `terms:` lists `dso` unused | FIXED | Step 5 `:123` "effective DSO has drifted (say from 75 to 90 days)". |
| Min2 | glossary `variance-analysis` numbers conflict | FIXED | `core.yaml:508` now 2.1 timing / 0.7 permanent — identical to the workflow table. |
| Min3 | `short-term-forecast` "AR from SAP" wrong for non-SAP entities | FIXED | `core.yaml:473` "from SAP for the Swiss, German and Czech entities, Excel templates from the subsidiaries on other ERPs (Italy, France, UK, US, China)". |

### Glossary + sources block

| # | R1 issue | Status | Evidence |
|---|---|---|---|
| Cr1 | Glossary gives Helvetic a cash pool | FIXED | `physical-pooling` `core.yaml:82` uses GlobalChem and adds "(Helvetic has no cash pool: Daniel concentrates cash by manual intercompany loans.)"; `cash-concentration` `:109` present tense "Helvetic has no cash pool; Daniel concentrates cash manually" with the framework-agreement booking. |
| Cr2 | Placeholder ids exposed as URLs (`dso-link-placeholder`, `rtgs-note`) | FIXED | `dio` (`core.yaml:259`) and `cut-off-time` (glossary/interview.yaml); `/glossary/dio` renders; `npm run check` clean. |
| Miss1 | Missing terms: available balance, overdraft, four-eyes, runway/burn, SEPA/SCT Inst, RTGS, SIC/euroSIC, camt.054, minimum balance | FIXED | `available-balance`, `minimum-operating-balance`, `direct-debit`, `eurosic` in core; `overdraft`, `four-eyes-principle`, `cash-runway`, `burn-rate` in map.yaml; `sic`, `sct-inst`, `camt-054` in wf-pay.yaml. (RTGS only appears as a related id — fine.) |
| Ex1 | `covenant` 2.4x vs canonical ~1.4x | PARTLY FIXED | `core.yaml:366` now 1.6x with a visible bridge (60+100+leases 25−41 = 144 over 88). But this still contradicts the canonical (EBITDA ≈ 78m, net debt ≈ 106m, ≈1.36x, AUTHORING:203–204) — see Critical 1. |
| Ex2 | `fx-exposure` Alpine EUR 3m off by 6x | FIXED | `core.yaml:186` EUR 19m receipts / 6m purchases / 13m net / CHF 0.6m impact; arithmetic checks (13×0.94×5% = 0.61). |
| Ex3 | `natural-hedge` "EUR 36m sales" unit slip | FIXED | `core.yaml:256` "roughly EUR 38m of EUR sales (CHF 36m at 0.94) … EUR 26m a year of net". |
| Ex4 | `sweeping` cross-entity example at odds with Alpine | FIXED | `core.yaml:100` same-entity sweep now, plus the explicit explanation that a cross-entity sweep "would be one-way physical pooling, creating an intercompany loan … Alpine avoids that". |
| Ex5 | `api-banking` Kleio cash-visibility tool; Swiss SME connectivity | FIXED | `core.yaml:312` Helvetic global-bank API + "Swiss SMEs usually meet bank APIs through their accounting software … SIX's bLink". |
| Ex6 | `bank-statement` "12 of 12" and time zones | FIXED | `core.yaml:330` "11 of its 12 … The twelfth … a Chinese domestic bank … emails a portal export" — consistent with both workflows. |
| Ex7 | `interest-rate-swap` 1.1% too high | FIXED | `core.yaml:526` "In mid-2026, 3-year CHF swap rates were only a few tenths of a percent (illustrative)" — matches market data (CHF 3y IRS ≈ 0.42% mid-July 2026, ≈ 0.59–0.74% late Sep 2026, Zanders/UBS/BlueGamma) — plus the over-hedging/hedge-accounting nuance for revolving drawings. |
| Ex8 | `payment-factory` "28 ERPs" vs companies.yaml | PARTLY FIXED | `core.yaml:446` "SAP S/4HANA and about a dozen smaller local ERPs inherited from acquisitions"; companies.yaml still lists only "SAP S/4HANA with SAP treasury modules" (minor residual mismatch). |
| Ex9 | `liquidity` vs `liquidity-headroom` two formulas | FIXED | `core.yaml:18` "The word 'headroom' is used both for this snapshot and for the forward-looking version … ask which one is meant." |
| Src1 | `afp-sr-2025` ctmfile secondary | FIXED | Replaced by AFP-owned pages (`afp-bench-2025`, `afp-top-tasks-2025`, `afp-bench-2025-article`); unverifiable 68%-2022 comparison dropped with a note. |
| Src2 | swift-iso-mt9xx Japanese State Street | FIXED | Swift's own document (`sources/core.yaml:83–89`). |
| Src3 | six-sps-cash-mgmt wrong URL | PARTLY FIXED | See positioning Src3. |
| Src4 | act-what-is-treasury homepage; eact-guiding-principles no year | FIXED | ACT hub page; 4th edition 2025. |
| Src5 | act-hsf-debt-2025 via Global Treasurer; kpmg-gts-2025 uncited | FIXED | Now the ACT/HSF (hsfkramer.com) page; the unused KPMG source is gone. |
| Src6 | Primary-source balance (4 of 13 second-hand) | FIXED | All 19 sources are now publisher-owned pages/PDFs except none; the only "via" relationships left are AFP summarising its own survey. Verified as below. |
| Ex10 | Add CHF angle to `money-market-fund` | FIXED | `core.yaml:394`. |
| Ex11 | Swiss example for `value-date` | FIXED | `core.yaml:152` (SIC same-day value / after cut-off next-day). |
| Min1 | `mt940` aka includes MT942 | FIXED | `core.yaml:335` aka [MT 940]; MT942 described as the intraday version and used as `related`. |
| Min2 | `swap` aka "currency swap" | FIXED | `core.yaml:225` aka [foreign-exchange swap]; confusedWith covers cross-currency and IRS. |
| Min3 | Header comment missing "Accounting & tax" | FIXED | `core.yaml:2`. |
| Min4 | dpo: note the proposed EU Late Payment *Regulation* status | NOT FIXED | `core.yaml:55` still only "EU Late Payment Directive limits". Minor. |

### Cross-cutting (R1 summary items)

1. Canonical-fact consistency — cash pool, account count, Alpine volumes, Kleio systems, Lea's ownership, bond-coupon week: all FIXED. **Leverage/EBITDA/net debt: NOT reconciled** (Critical 1).
2. Rate environment — FIXED (`index.mdx:88–98` synthesis callout; echoed in both workflows and glossary).
3. Time zones — FIXED everywhere.
4. Sources — replaced with primaries and verified except three exact percentages (below).

**Tally: of 63 distinct R1 items, 56 FIXED, 5 PARTLY FIXED (covenant figures, Deloitte 22%, SIX page identity, AFP/ST percentages as a group, payment-factory ERPs), 2 NOT FIXED but low-stakes (dpo Regulation note; the "well over a hundred" field note, which R1 accepted).**

---

## Scores (1–10)

factual accuracy: 8 | workflow realism: 9 | pedagogical quality: 9 | concreteness: 9 | source quality: 8

Per module: Start Here 8/9/9/9/8 · Daily cash positioning 8/9/9/9/8 · Cash forecasting 8/9/9/9/8 · Glossary+sources 7 (the covenant example)/n-a/9/9/8.

## Critical errors (must fix)

1. **The Helvetic financials now exist in two irreconcilable versions, and the exemplar glossary uses the wrong one.** `core.yaml:366`: "With about CHF 144m net debt (RCF 60m + bond 100m + **leases 25m** − cash 41m) and about CHF **88m covenant EBITDA** it sits at about **1.6x**." The canonical facts (AUTHORING.md:203–204, "apply everywhere") say EBITDA ≈ **CHF 78m**, net debt ≈ **CHF 106m**, **≈1.36x** — and the rest of the manual follows the canonical: `month-end-reporting.yaml:206` ("LTM EBITDA (78.0 from FP&A) … 1.36x"), `covenant-monitoring.yaml:173` (1.40x/1.36x/1.37x), `glossary/wf-risk.yaml:183` (1.40x), `currency-shock.yaml:212` ("LTM EBITDA CHF 78m"). The rival cluster (85m reported / 88m covenant / 144m net debt / 1.6x) lives in `core.yaml:366`, `glossary/map.yaml:177,195,204` and `/map/debt.mdx:93` — three of which are outside my scope, but the **exemplar** is the template other authors copy. Two compounding errors: (a) "about CHF 88m covenant EBITDA" cannot be true alongside a canonical LTM of 78m unless a bridge is shown (map.yaml's bridge — "reported CHF 85m + 3m restructuring" — itself contradicts 78m, and `neighbours.mdx:58`'s "Q3 EBITDA of CHF 22m" implies ~88m/yr, a third implied level); (b) the net-debt bridge adds "leases 25m", but the group's own covenant definition excludes leases — `glossary/wf-risk.yaml:237`: "Helvetic reports under Swiss GAAP FER, where operating leases stay off balance sheet; its RCF says that if the group moves to IFRS, lease liabilities under IFRS 16 are **excluded from net debt**." Fix direction: rewrite the example on the canonical bridge (gross debt CHF 35m + CHF 27m EUR ≈ 60m drawn + CHF 100m bond − cash; ≈1.4x on LTM 78m, "covenant EBITDA slightly higher after add-backs"), state once — in the covenant example or `net-debt` — that covenant EBITDA/net debt differ from reported and how, and delete the "leases 25m" line or justify it as finance leases under FER. Then align `map.yaml`/`map/debt.mdx` (other streams) and `neighbours.mdx:58` (pick a Q3 EBITDA consistent with the LTM, or say H2 is stronger).

2. **The two worked examples' opening balances cannot both be true.** The positioning example (Tue 17 Nov) opens at **CHF 41m** (`daily-cash-positioning.yaml:194`; `index.mdx:65`), and its own Tuesday group-level outflows are about −CHF 3.5m. The forecasting example (Mon 23 Nov) opens at **CHF 35m** (`cash-forecasting.yaml:194`) and reports last week's net at **+0.3m** (`:188`) — while reusing the same week's events, including receipts of CHF 10.7m total and a CHF 1.8m Italian supplier run on Thursday (`:202`). Back-solving: Monday 16 Nov would need a net −CHF 6.0m and Wed–Fri a net +CHF 9.2m, but the week's total receipts (10.7m, of which 0.84m landed Tuesday) minus the stated remaining outflows cannot produce +9.2m. The numbers are off by roughly CHF 5–6m. Fix direction: open the strip at CHF 37–38m (or say the strip excludes trapped cash — but `:206` shows it includes the CHF 6m in China), or move the positioning total; the same-scenario linkage is a great device and only works if it survives this arithmetic.

## Missing concepts

- Nothing significant remains from R1. Two small additions worth considering: (a) in `daily-cash-positioning`, one sentence on *who is authorised to do what* when the manager is unavailable (the Lea-holiday key-person note at `index.mdx:74` is good but the workflow's people section doesn't cover the deputy/signatory gap); (b) a glossary line on **booking date vs value date vs cash flow date in forecasts** (the forecast's weekly buckets are cash-value-dated; beginners confuse this with due dates) — `available-balance` touches it but does not name the forecast convention.

## Unrealistic workflow descriptions

None blocking. Two places where the phrasing is cruder than practice:
- `index.mdx:83` "Credit-facility drawings … are **normally reduced at rollover dates, not mid-period**" and `index.mdx:68` "the drawn credit facility **can only be reduced** at its next rollover date" overstate it. Most LMA-based RCFS permit voluntary prepayment at any time subject to break costs and notice; the workflow's own wording ("cannot be prepaid mid-period without break costs", `daily-cash-positioning.yaml:205`) is the accurate version. Align the index to it.
- `daily-cash-positioning.yaml:198` "The bank's camt.054 shows it came from a payment file uploaded twice" — a camt.054 carries transaction data and remittance, not the upload history; the realistic trail is the identical end-to-end/invoice references plus the file/batch reference in the payment tool or a call to the bank. One clause would fix it.

## Vague / generic passages

None of consequence. The step-level detail is consistently "who opens what, compares what, decides what". The `software:` fields are appropriately hedged.

## Unsupported or mis-cited claims

Verified this round against original-publisher text via WebSearch (fetches blocked):

**VERIFIED (R2)**
- AFP 2025: 523 US practitioners, fielded autumn 2024 (AFP press release 24 Mar 2025) ✓; "top priorities … nearly three-quarters" ✓ (the 73% is AFP's own article); "over 60% … most challenging" ✓, 62% corroborated by two write-ups citing AFP; "average is nearly 12 full-time employees", "<$1bn typically 1–3 FTE" — **verbatim on AFP's own page** ✓ (`growth.mdx:58` is exact).
- AFP 2026: 425 responses, May 2026, PNC-sponsored; "cash forecasting remains treasury's top priority and biggest challenge" ✓ (PR Newswire/AFP release).
- PwC 2025: "350 treasurers" ✓; ">$10 billion … in-house banks (67% adoption), payment factories (60%) and … POBO models (50%)" ✓ **verbatim**; 74% AI ✓.
- EACT 2025: cash-flow forecasting #1, long-term funding #2, treasury technology #3; "30,5%" ✓ (EACT page + official survey PDF).
- Strategic Treasurer/TIS 2025: 200+ respondents; "difficult" 39%→53%, "easy" 28%→14% ✓ (TIS-hosted report PDF); vendor sponsorship ✓.
- SNB 24 Sep 2026: policy rate unchanged at 0%, 0.25pp discount above the sight-deposit threshold ✓ (snb.ch — matches `sources/core.yaml:110` exactly).
- Swift: CBPR+ coexistence ended 22 Nov 2025; payment instructions MT-less; reporting MTs (MT940/941/942/950) remain "until an end date is defined" ✓ (swift.com + Swift-endorsed notices) — the glossary's "deprecated rather than withdrawn" is directionally right, though Swift's formal word for out-of-scope MTs is "de-prioritised/retained"; MT99-class messages are the ones Swift calls deprecated. Consider softening `core.yaml:338` to "left in place (out of scope of the 2025 milestone), no end date defined".
- SIX: 2009 message versions supported "up until the standard release in November 2026" ✓ (SIX Roadmap Swiss Payments); 14 Nov 2026 on the SPS 2026 business rules ✓; banks quoting 15/21 Nov 2026 ✓ — the sources note's nuance is correct and useful.
- euroSIC: discontinuation date/last clearing day **Friday, 31 December 2027** ✓ (SIX Info Hub); SECB remains a euro correspondent ✓ (as `core.yaml:582` says).
- EU Instant Payments Regulation (2024/886): euro-area PSPs receive from 9 Jan 2025, send from 9 Oct 2025 ✓ (EUR-Lex) — `daily-cash-positioning.yaml:335–336` is exactly right, and correctly notes Swiss banks are not bound.
- CHF swap rates: 3y ≈ 0.42% (Jul 2026) to 0.6–0.74% (Sep 2026) ✓ — "a few tenths of a percent" is fair for mid-2026.
- SARON ≈ −0.04% (Sep 2026) ✓ "around zero"; SOFR 3.66–3.87% (Sep 2026) ✓ "about 3.5–4%".
- Swiss VAT 8.1%, quarterly, payable within 60 days (Art. 86 MWSTG) ✓; GewStG §19 dates 15 Feb/May/Aug/Nov ✓.

**UNVERIFIED (R2)** — stated numbers I could not see in the publisher's own text; all are consistent with the publisher's qualitative claims, so none is "wrong", but the exact figures need a look inside the reports:
- AFP 2026 "**49%**" named forecasting the most challenging task (`index.mdx:111`, `cash-forecasting.yaml:331–332`, `sources/core.yaml:33`). AFP's release confirms forecasting is "the biggest challenge" but I could not surface 49%.
- Deloitte 2024 "**22%**" say cash-positioning capability requires development (`daily-cash-positioning.yaml:330–331`, `sources/core.yaml:47`). Deloitte's page confirms the qualitative claim and the 213 interviews; 22% not seen.
- Strategic Treasurer/TIS "**68%** report higher management expectations" (`cash-forecasting.yaml:332–333`, `sources/core.yaml:40`). The survey question exists in the report; the 68% not seen.
- URLs I could not open at all (existence plausible, content claims consistent): `zkb-iso20022-factsheet` PDF, `act-what-is-treasury`, `eact-guiding-principles`, `act-hsf-debt-2025` (its 76%/41%/17%/12% numbers are also unverified — the source is registered but not cited by these exemplars, so it is low-stakes).

**New currentness issue (not previously raised):** the manual's illustrative EUR level is too low. `index.mdx:94` "EUR balances earn around €STR (about **1.9–2.0%**)" and the canonical in AUTHORING.md:139 say 1.9–2.0%, but €STR printed **2.19%** in July–early September 2026 and **2.44%** on 28 September 2026 (ECB; corroborated by Zanders market data), with the ECB deposit rate at 2.25%. SOFR's 3.5–4% band is fine (3.66–3.87%). Since this is the authoring guide's canonical level, it should be corrected there (suggest "≈2.1–2.5%, illustrative") and in the callout; the `forward` example's 2% EUR-rate assumption is harmless but moves slightly (0.9353 → ~0.9345).

## Better example opportunities

- The 13-week strip is a big improvement. One addition would make it sing: a "last week's version vs this week's version" delta line (e.g. "week 4 trough moved from CHF 21m to CHF 18m because the Italian receipt slipped"), which is what the weekly CFO note actually communicates.
- The duplicate-payment exception (`daily-cash-positioning.yaml:198`) is exactly right. Consider showing the forecast classification beside it (it already says "timing difference") — one clause tying the daily exception to the weekly variance table it will reappear in (`cash-forecasting.yaml:185`) would reinforce the cross-module loop. (It already does; a forward pointer "see next week's variance table" would make the linkage explicit for skimmers.)

## Minor issues

1. **HM Deutschland's balances differ across two examples of the same account.** The positioning table opens at "EUR 1.5m (expected 1.8m)" (`daily-cash-positioning.yaml:185`) while the glossary's `available-balance` example (`core.yaml:544`) has the same Monday-night statement at "booked EUR 1.8m → value-dated EUR 1.6m → available EUR 1.55m", with "Lea builds the position on EUR 1.6m". The positioning table says 1.5m. The 0.1m is small but the two examples are demonstrably the same night; align them (1.6m value-dated, with the 0.3m tax debit explaining the "expected 1.8m").
2. `index.mdx:68` "the December payrolls with 13th salaries **four weeks** later" vs the forecast's week-4 trough (w/c 14 Dec, i.e. ~three weeks after 25 Nov). Either say "in three weeks' time" or move the December payruns to 22–23 Dec (which would move the trough to week 5).
3. `core.yaml:526` glossary `interest-rate-swap` says "In mid-2026 … a few tenths of a percent" — fine for July 2026 (0.42%) but by late September 2026 3y CHF swaps are ~0.6–0.74%. It is labelled illustrative; a "low, well under 1%" phrasing would age better.
4. `core.yaml:118` "Helvetic AG lends USD 5m" — the canonical parent is **Helvetic Machines AG**. (Elsewhere the glossary gets this right.)
5. `core.yaml:126` trapped-cash example says "CNY 60m" while the positioning table shows HM Suzhou at CNY 55m and the index rounds China to "about CHF 6m". Undated examples can drift, but the CNY 55m/60m pair is easy to align.
6. `core.yaml:446` payment factory "about a dozen smaller local ERPs" is still not reflected in `companies.yaml` ("SAP S/4HANA with SAP treasury modules"). Either add "plus local ERPs in acquired subsidiaries" to companies.yaml (other stream) or soften to "SAP plus local systems in some acquired subsidiaries".
7. Residual wording wobble on SME cash-sheet cadence: `growth.mdx:43` "a weekly cash sheet" vs `growth.mdx:108` "spreadsheet on payment days" vs `daily-cash-positioning.yaml:262–266` "on payment days (often twice a week)". These are reconcilable (a weekly sheet touched on payment days) but a single phrase would be better; R1 flagged this area once already.
8. `core.yaml:55` dpo still omits the R1-suggested caveat that the proposed EU Late Payment **Regulation** (hard 30-day cap) has an uncertain legislative status. NOT FIXED since R1; trivial.
9. Swift wording nit: `core.yaml:338` "deprecated (no longer maintained, with disincentives to follow later)" — Swift's deprecated wording applies to MT199/299; reporting MTs are formally "out of scope, no end date defined". Say that instead to be unimpeachable.

## Verdict: REVISE

This is a near-pass. Round 2 fixed essentially everything that made R1 a revise: the time-zone logic, the 0%-CHF/deposit-vs-debt reasoning, the Daniel/Lea ownership, the cash-pool contradiction, the placeholder ids, the cross-module timeline, payroll and supplier scale, the growth-page ranges, the growth triggers, the controlling section, and the source layer (now primary publishers, with most statistics independently verified this round). The workflows are genuinely practitioner-grade.

Two things block PASS. First, the covenant example in the glossary template still contradicts the manual's own canonical Helvetic financials (1.6x on 88m/144m vs 1.36x on 78m/106m) and even the group's own covenant lease definition — this is the same class of canonical-fact error R1 called critical, explicitly listed for fixing, and now partially "fixed" against the wrong baseline. Second, the two worked examples' opening balances (CHF 41m vs CHF 35m with a +0.3m week between them) do not survive arithmetic — the kind of sanity check a sharp reader will run precisely because the cross-module scenario linkage invites it. Fix those two, nudge the €STR level, and this set passes.
