# Review: Day in the Life — round 1

Scope reviewed: `content/pages/day/*.mdx` (index, sarah, petra, daniel, lea, anna, priya) and `content/data/days.yaml`
(1,281 lines, read in full). Spot-checked against `content/pages/org/roles-{cfo,treasury-manager,analyst,cash-manager,head-of-treasury}.mdx`,
`content/workflows/daily-cash-positioning.yaml`, `content/workflows/cash-forecasting.yaml`, `content/pages/start/index.mdx`,
`content/companies.yaml`, and the "Canonical facts clarified" block in `docs/AUTHORING.md`.

## Scores (1–10)
factual accuracy: 7 | workflow realism: 8 | pedagogical quality: 8 | concreteness: 7 | source quality: 8

## Critical errors (must fix)

1. **Covenant estimate contradicts the canonical Helvetic financials.** `content/data/days.yaml` (Daniel, Mon 09:30):
   > "Claudia's preliminary Q3 LTM EBITDA (about CHF 70m, illustrative); gross debt CHF 160m (RCF CHF 60m drawn + CHF 100m bond); cash about CHF 41–46m" … "Net debt / EBITDA about 1.7x against the 3.25x limit".
   `docs/AUTHORING.md` ("Canonical facts clarified", apply everywhere): "Helvetic financials (canonical, 30 Sep 2026 LTM): EBITDA ≈ CHF 78m; net debt ≈ CHF 106m; net debt/EBITDA ≈ 1.36x". The Q3 LTM period in the timeline *is* the canonical period, yet EBITDA is 70m vs 78m and the ratio 1.7x vs 1.36x. It also computes a 30 Sep covenant from *late-October* cash (41–46m), while the canonical net debt of 106m implies ~CHF 54m cash at 30 Sep. A reader comparing `/day/daniel` with the Helvetic company page gets two different leverage stories. **Fix:** use EBITDA ≈ 78m, 30 Sep cash ≈ 54m (can note October cash fell to ~41–46m), ratio ≈ 1.36x — or first change the canonical file (out of scope for this stream).

2. **The "same Tuesday" cross-reference is false.** `days.yaml` (Daniel, Tue intro) and `content/pages/day/daniel.mdx`:
   > "the same Tuesday described on the [Start page](/start)".
   But `/start`'s callout is titled "Tuesday 17 November", while the day pages live through "Monday 26 and Tuesday 27 October 2026" (`/day/index.mdx`), and the two Tuesdays describe *different events*: Start/daily-cash-positioning have a CHF 2.6m gap from three causes (Italian EUR 2.25m, a Gewerbesteuer direct debit, a CHF 180k duplicate payment) and a EUR 1.5m transfer covering a EUR 1.35m German shortfall after a supplier run; `days.yaml` has a CHF 3m gap from two causes and a EUR 3m transfer covering a EUR 4.2m German payroll. Also "next quarter is 75% hedged" (Start, prepared yesterday) vs "Q1 2027 at 72%" (`days.yaml`, read Tue 09:15). The 64-payment batch and the changed-IBAN hold are copied across, which makes the mismatch look like drift rather than two different days. **Fix:** either delete the "same Tuesday" claim and let the day pages stand alone (and say so), or reconcile date, gap size, causes, funding amount and hedge ratio with `/start` and the workflow example.

3. **RCF schedule contradicts the canonical "interest periods roll on the 15th"** and the gold-standard workflow examples. `days.yaml` (Daniel, Mon 09:05):
   > "Of the CHF 60m drawn on the RCF, a CHF 20m one-month tranche matures Friday" … "Roll the CHF 20m tranche unchanged for one month" … "Sends the rollover notice to the RCF agent bank by Wednesday".
   Canonical: "RCF drawn CHF 35m + EUR 27m, **interest periods roll on the 15th**"; `daily-cash-positioning` example: "The CHF 35m RCF loan is in an interest period to 15 January and cannot be prepaid mid-period without break costs"; `cash-forecasting` example: "a reduction … at the 15 January rollover". A one-month tranche maturing Friday 30 Oct cannot coexist with monthly interest periods ending on the 15th, and the mixed-currency drawn amount (CHF 35m + EUR 27m) disappears ("the CHF 60m drawn"). Internal wobble too: a one-month roll matures ~30 Nov, but "he … revisits after the December coupon". **Fix:** make the tranche mature on a 15th (e.g. 15 Nov), show the drawn amount as CHF 35m + EUR 27m ≈ CHF 60m, and tie the repayment decision to the next 15th rollover. (`roles-treasury-manager.mdx` has the same "next Friday's rollover" problem — request to the org stream.)

4. **Chinese statement mechanics contradict the exemplar it is supposed to match.** `days.yaml` (Lea Mon 07:30 / Tue 07:30; Daniel Tue 07:45):
   > "She emails the global bank's service desk" / "logs a ticket with the global bank that relays the Chinese bank's statements" / "it usually arrives by about 10:00 after the service desk re-sends it".
   `/start/index.mdx`: "HM Suzhou's account at a Chinese domestic bank, **is never in the tool**, because that bank has no EBICS or Swift reporting to the group; Wei in Suzhou emails a portal export, and Lea types it in"; `daily-cash-positioning` example: "as every day, Wei has emailed a portal export from Suzhou". Either the Chinese statement normally arrives via a global-bank relay (day pages) or it never does and is typed in from an emailed export (Start + workflow). Both stories teach the right lesson (it is a connectivity problem, not a time zone), but they describe different infrastructures for the same fictional account. **Fix:** pick one mechanics story; the emailed-export version is the more distinctive mid-market reality and is already used twice.

5. **Lea's cadence contradicts itself and the rest of the module.** `days.yaml` Lea persona: "Builds the daily cash position **three days a week**"; `firstCheck`: "07:30 **Mon/Wed/Fri**: are all 12 prior-day statements in the connectivity tool?". But `lea.mdx` says "**Daily:** statements in, balances checked, known flows added, gaps explained, proposal sent", `days.yaml`'s own Tuesday intro says "Lea builds the position **every morning**", and `daniel.mdx` says "**Every morning**, decisions before the cut-offs". Her Tuesday timeline starts at 07:30 with statements, contradicting the Mon/Wed/Fri firstCheck. **Fix:** make it daily (recommended — it matches the workflow and the positioning-heavy storyline), or carve out a genuine light day (Tue/Thu) and show it.

6. **Kleio's CHF money-market fund: day page and workflow say opposite things.** `days.yaml` (Sarah, Mon 15:00): "She considered a CHF money-market fund and decided it adds paperwork (new account, custody) for no meaningful gain at 0% rates", with two CHF 4m term deposits at bank B. `daily-cash-positioning.yaml` companies/kleio: "After the Series B she split the cash across two Swiss banks and **moved part into a CHF money-market fund**". One of these must change. The day version is the more canonical-compliant one (CHF at ~0% → term deposits kept for the board-mandated bank split, not for yield); the fix may belong in the workflow file (request to the wf stream), but as it stands the manual tells beginners two different stories about what Sarah did with the Series B money.

## Missing concepts

- **Cut-offs as an active constraint inside a timeline.** `/day/index.mdx`'s clock table is excellent, but no timeline row shows the pressure: every execution (Daniel's 08:20 EUR 3m, Petra's 08:20 file) finishes hours before any cut-off. One row near a bank deadline — e.g. a rejected payment discovered at 11:00 with the house bank's CHF cut-off at 14:00 and a fix at 11:30 (Petra has this, but the cut-off time is never named) — would make the table concrete.
- **US statements arriving last** is taught in the callouts and the index but never shown: in all twelve timeline days no one is ever waiting for the US statement. A single row ("HM Inc.'s statement lands mid-morning; Lea uses the US bank's intraday report first") would land the point.
- **Intraday credit / daylight overdraft limits** at the banks — mentioned obliquely ("the bank debits an overdraft") but not as a thing a person watches.
- **A number for the TMS payback claim.** Daniel's business case is "hours saved, not features" and cites "Lea's time log" — showing one such figure (e.g. "the position takes Lea 45 min/day; forecast collection 4 h/week") would give founders the size of the prize.
- Minor: value-dated vs booked balances appears in the workflow as a real decision input but never in a day page, where the control column is only "opening = prior close".

## Unrealistic workflow descriptions

The timelines are, on the whole, the most realistic content in the manual: timestamps, named systems, interruptions, four-eyes sequences, and explicit judgments. Only these row-level realism problems:

- **Daniel's Tuesday is overloaded at the front end.** Statement check (07:45), workbook review (07:55), gap trace with a manager-to-manager email (08:10), funding decision (08:20), forecast (08:45), hedge report (09:15), payment signatures (09:40), CFO walk-in (10:30) — with a four-hour TMS block after lunch this is a heroic Monday-morning calendar for a two-person team. Plausible as an exceptional day; presented as a normal Tuesday it will make an interviewee smile. Consider moving the forecast row to 10:30 and the hedge report to after lunch (Lea sends it Monday 16:00 and "it is not urgent unless a quarter is outside the band").
- **Lea's Tue 13:30 "Consolidate and compute variances"** is a half-day job compressed into one row whose `next` is "Variance table to Daniel at 15:30", while France has not submitted (and the canonical cadence is "Lea consolidates Tue–Wed"). Consistent with the canonical cadence only if this row is explicitly a *first pass* — worth one word.
- **Petra's Mon 15:00 → Tue 11:00 German funding** requires "Martin's signature as second signatory because it is an intercompany transfer" (Mon) and "Petra enters; Martin signs" (Tue) — but Petra's mandate is "approves payments up to CHF 250k with one other signatory" and the EUR 300k transfer is below that. The stated reason (intercompany) is a real-world variation, but the page should say the rule is "intercompany transfers always need Martin", otherwise it reads as an inconsistency.

## Vague / generic passages

Very few; the module is dense and concrete. The only ones:

- `/day/index.mdx`: "Spreadsheets are everywhere below the largest companies — and still present at the largest." True but unsupported; one concrete instance ("Priya's team still keeps the counterparty-limit report in Excel") would carry it.
- Anna's Tue 16:00 "Team development" row: "Development plans." input, "Supports a 12-month rotation." Realistic, but the `input`/`decision` fields could name what made this rotation the right one (e.g. Singapore needs a Basel-experienced analyst for the RTC handover).
- `days.yaml` Priya's `firstCheck` "the TMS exception list" is fine, but the index Flow says "Priya's cash managers|07:30 exceptions" while Priya's own 07:30 row says "14 exceptions; 3 need her" — which is it, her or the managers? One clause ("she triages the list her two cash managers own") fixes it.

## Unsupported or mis-cited claims

Verified against the original publishers via WebSearch (WebFetch egress-blocked):

- **CONFIRMED:** BACS CEO-fraud reports 719 (2024) → 971 (2025) — `days.yaml` Sarah; stated on BACS's own site (bacs.admin.ch "Im Fokus": "von 719 auf 971 Fällen zugenommen"), also Netzwoche 28 Jan 2026. Accurate as cited.
- **CONFIRMED:** Fedwire third-party deadline 18:45 ET (federalreserve.gov: "deadline for initiating transfers for the benefit of a third party … is 6:45 p.m. ET"); the 00:45/23:45 Zurich conversion is correct for the DST week.
- **CONFIRMED:** CHAPS customer payments by 17:40, system closes 18:00 (BoE FAQ; also the BoE 2026 consultation on opening at 01:30 from 2027, which the source note handles honestly).
- **CONFIRMED:** T2's day ends 18:00 CET (ECB TARGET Services AR 2025 confirms the 17:00 CET *customer* cut-off and an 18:00 close).
- **PARTIALLY CONFIRMED:** "SIC extended its operating hours from 15:00 to 17:00 in 2017" — corroborated indirectly (AFP Switzerland guide: "SIC operating hours are expected to be extended by two additional hours in 2017"; BNP Paribas cash management: SIC customer cut-off 17:00 CET). The specific UBS notice details (SIX SIS DvP deadline 14:30 → 16:30) are UNVERIFIED (R1).
- **OVER-PRECISE:** "Swiss banks discontinue the 2009 ISO 20022 message versions **on 21 November 2026**" (Anna's day, `/day/anna.mdx`). SIX says support runs "until November 2026"; the registered source note itself says "SIX's SME factsheet dates the switch at 14 Nov 2026 for payment orders; some banks communicate 21 Nov 2026". Use "with the November 2026 release (banks communicate 14 or 21 November)" or cite the bank whose date you use (ZKB: 21 Nov).
- **UNVERIFIED (R1):** the Robert Walters "day in the life of a global treasurer" characterisation ("split between operational treasury with 'live' decisions and structured work") — the article exists (robertwalters.co.uk, interview with Simon Neville, ex-Tesco) but its content could not be confirmed from search snippets. Qualitative, no numbers, low risk; consider softening to "a recruiter's practitioner interview describes…".
- **UNSUPPORTED GENERALISATION:** `/day/index.mdx`: "German salaries are paid for value on the last business day" — German practice varies (25th, month-end, or the 1st; value-dated in advance or arrears). Fine as the fictional GmbH's convention; not fine as a general rule. Similarly Priya's rhythm "the DST mismatch … for a week or two": the spring mismatch is ~three weeks (US changes 2nd Sunday of March, EU last Sunday).
- AFP figures used in `days.yaml` (Anna's "payment fraud attempts are routine") are generic and consistent with the registered AFP 2026 source notes; no mis-citation found.

## Better example opportunities

- **One cut-off near-miss** in a timeline (see Missing concepts) would convert the clock table from reference material into lived experience, and is the single highest-value addition.
- **A reconciled covenant row** for Daniel: a 4-line table (gross debt 160 − cash 54 = net debt 106; ÷ EBITDA 78 = 1.36x vs 3.25x) matching `companies.yaml` exactly. It is the one place a founder will do arithmetic and find the manual disagreeing with itself.
- **Sarah's runway arithmetic** as a tiny table (22m ÷ 0.9m = 24 months; adjusted for the January prepayment and the venture-debt minimum-cash lock-up → 21–24). The words are there; the numbers would make the "runway is not a forecast" callout stick.
- **Priya's exception list shown once as data** — e.g. a 6-line "07:30 exception list" table (missing statement / failed sweep / account below minimum / …) with who takes each. It is the clearest possible demonstration of "by exception" and is currently only described.
- **Petra's payment file as a Flow** (Business Central journal → pain.001 → EBICS upload → signatures → pain.002 status) would teach the file chain that founders most often ask about; it is currently buried in row `systems` fields.

## Minor issues

1. `days.yaml` Lea Tue 08:00: "EUR 3m … still covers HM AG's forward settlement with **about EUR 1.5m to spare**" — against Daniel's own figures (HM AG EUR 11.9m − 3m − 8m forward = EUR 0.9m). Either add expected receipts or change to ~0.9m.
2. `days.yaml` Sarah `awake`: "a single CHF 200k loss is two months of US payroll" — her own numbers say USD 118k gross-to-net **plus employer taxes** per semi-monthly run ≈ CHF 190k/month at USD/CHF 0.80, i.e. CHF 200k ≈ **one** month.
3. Account-count lists don't enumerate to the canonical totals: Petra's "9 accounts" input lists 8 (3+3+German EUR+US USD); Sarah's "7 accounts" lists 5–7 depending on whether the two term deposits are separate accounts. Enumerate fully or write "eight of the nine".
4. `days.yaml` Petra Mon 13:30: "Invoices due by **next Tuesday** (CHF 1.34m)" — on Monday, for the next-morning run; should be "due by tomorrow" or "by Tuesday".
5. The bond coupon is handled three ways: `days.yaml` ("week 6 carries the **December bond coupon**"), `roles-treasury-manager.mdx` ("adds the bond coupon, which a copied template had **dropped**" — though Daniel's Tuesday forecast already contains it), and the `cash-forecasting` example (23 Nov–19 Feb, **no bond coupon anywhere** in 13 weeks). Pick one date and show it.
6. The forecast low point is CHF 18m everywhere but in a different week everywhere: `days.yaml` week 6 (w/c 30 Nov), `/start` "mid-December", `cash-forecasting` wk 4 (14 Dec, 18.0). Identical value, different weeks — looks like copy-paste. Also `roles-treasury-manager.mdx` Wednesday then says CHF 17m in week 6 after the coupon fix.
7. Terminology: a 3-year PLN loan "hedged with an **FX swap**" (Priya Mon 15:00, Anna Tue 11:00) — for a three-year cross-currency exposure the practitioner term is a **cross-currency swap** (or matched local borrowing); FX swaps are rolled short-term instruments. Petra's use of "extend with a swap" (short-dated roll) is correct.
8. `/day/index.mdx` clock table frames SIC as closing "17:00" but T2 as "18:00" — in both systems the *customer* cut-off is 17:00 and interbank/cover settlement runs to 18:00 (BIS Red Book; ECB TARGET AR 2025). Presenting system close for one and customer cut-off for the other invites a wrong comparison.
9. Minor recycling across files makes cross-checking hard: "CHF 180k" is a duplicate payment (workflow), an insurance premium (`roles-treasury-manager.mdx`) and an unexplained debit (both); the "supplier changed IBAN last week" hold happens on Daniel's Tuesday *and* the roles-page Wednesday; `roles-cash-manager.mdx` has a German sweep failure where Priya's day has a Spanish one.
10. `roles-treasury-manager.mdx`'s "normal Wednesday" funds a "Thursday's payroll top-up" for HM Deutschland, while the day module's German payroll pays **value Friday** and was fully funded on Tuesday — request to the org stream to align the German payroll mechanics.
11. `days.yaml` Sarah Monday 07:30: "Cash fell CHF 0.3m, mostly Friday's Swiss payroll" — the Swiss payroll for ~62 CH staff (CHF 150–180k fully loaded each, per her own 09:00 row) is ~CHF 0.8m/month, so a weekly fall of 0.3m cannot be "mostly" that debit; "net of the week's receipts" would fix it.
12. Index promises the timelines "cross-reference each other" — they do, and the anchors (`#monday-0845` etc.) match `anchorFor()` in `src/components/DayViews.tsx`. Confirmed working; no change needed (noted so round 2 does not re-test).

## Rendering and checks

- `npm run check`: 0 errors, 0 warnings (336 terms, 181 sources, 20 workflows, 94 pages, 26 roles).
- `node scripts/shot.mjs` on `/day`, `/day/daniel`, `/day/anna`, `/day/sarah`, `/day/petra`, `/day/lea`, `/day/priya` (`--full`): **no MISSING refs, no runtime errors**, exit 0 on both runs.
- Read the PNGs for `/day` and `/day/daniel`: PersonaCard, timeline rows (time / call / systems chips / expandable why-input-decision-who-next), rhythm table, unusual-event card, awake list, interview callouts and the Sources footnotes all render correctly. No broken layout at 1440px.

## What works well (for balance)

The fraud vignettes (Sarah's look-alike domain and call-back, Petra's vendor-master change, Anna's deepfake voice) are exactly the "what goes wrong and what the human does about it" material the brief asks for, and the responses (call-back on a directory number, headers to IT, BACS report, audit-committee note) are procedurally right. The CHF≈0% judgment in Daniel's Monday 09:05 row (repay-vs-deposit with commitment fee, three-day drawdown notice) is the best single decision row in the manual. Lea's EBICS key-expiry event, the "Asian statements arrive first" callout, the prepare/decide/own/approve framing and the per-person interview sections ("what she won't know") are all strong founder material. The numbers that I could check against `companies.yaml` (12 accounts/5 banks/CHF 200m RCF/CHF 100m bond/9 accounts/7 accounts/CHF 22m cash/CHF 0.9m burn/CHF 140m undrawn) are consistent.

## Verdict: REVISE

Workflow realism and pedagogy are at 8 and the module is close, but the canonical-fact violations (covenant ratio/EBITDA, RCF rollover dates), the false "same Tuesday" claim and the China-connectivity contradiction are exactly the errors an interviewee would catch, and PASS requires all scores ≥8 with no critical issues.
