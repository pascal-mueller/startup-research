# Notes — stream "day" (Day in the Life)

## Revision pass (round 2, after `docs/reviews/day-r1.md`) — what changed and why

### Task A — review findings fixed
1. **Covenant row (critical).** `content/data/days.yaml` Daniel Mon 09:30 is now the canonical bridge: gross debt
   CHF 160m (CHF 100m bond + the RCF's then-drawn CHF 35m + EUR 27m ≈ CHF 25m) − cash CHF 54m = net debt CHF 106m;
   ÷ LTM EBITDA CHF 78m ≈ **1.36x** vs 3.25x. The row states that 30 Sep is *not* a test date (tests: 30 Jun and
   31 Dec — both named), that October cash of CHF 41–46m + post-roll drawings only give a labelled pro-forma ≈ 1.5x,
   and who computes what (Claudia computes LTM ratios, Lea supplies the net-debt schedule, Daniel reviews/presents,
   Marco's forecast EBITDA never enters an LTM number).
2. **"Same Tuesday" (critical).** Decision: **keep Mon 26 / Tue 27 Oct 2026** and delete every "same Tuesday" claim
   (canonical v2.1 allows pages on another date if they do not claim it). The whole week's scaffolding is late October
   (DST mismatch week, German payroll value Fri 30 Oct, month-end Friday, GlobalChem Q3 update Thu 29 Oct, Swiss
   payroll Fri 23 Oct); re-aligning to 17 Nov would have rewritten all six calendars. Explicit disambiguation now
   appears in `days.yaml` (header comment + Daniel Tue intro), `content/pages/day/index.mdx` (a `confusion` callout
   naming the 17 Nov scenario's CHF 2.6m gap / 3 causes / EUR 1.5m IC top-up) and `daniel.mdx`. Copied details were
   differentiated: batch 64 → 58 payments, group cash CHF 41m → CHF 44.2m, gap CHF 3m from 2 causes (vs /start's
   CHF 2.6m from 3), German payroll-week funding (EUR 3m) vs /start's EUR 1.5m top-up.
3. **RCF (critical).** No more "CHF 20m one-month tranche maturing Friday", no "CHF 60m drawn", no "CHF 140m
   undrawn". Now: drawn **CHF 30m + EUR 35m (≈ CHF 63m, ≈ CHF 137m undrawn)** after the 15 Oct roll, interest
   periods roll on the 15th; Daniel Mon 09:05 is the **15 November roll** decision (roll settles the next business
   day — 15 Nov is a Sunday); repayment is revisited at the 15 January roll (matches `cash-forecasting.yaml`'s
   pencil-marked reduction). Fixed in `days.yaml` (Mon 08:50/09:05, Tue 11:00) and `daniel.mdx`.
4. **China mechanics (critical).** Every "global bank relay / ticket / re-send" story is gone. Now: the Chinese bank
   has **no EBICS/SWIFT corporate reporting**; Wei emails a portal export daily and Lea keys it in; **11 of 12**
   statements arrive through the tool (the twelfth is manual); a late export is chased, never excused by time zones
   (Lea Mon 07:30 + 10:40, Tue 07:30 + 10:05; Daniel Tue 07:45; `lea.mdx` callout).
5. **Lea's cadence (major).** She builds the position **every morning** (oneLiner, `firstCheck`, rhythm rows now
   "Position first, as every morning"); the **weekly** cycle is the 13-week forecast (submissions Tue noon,
   consolidation Tue–Wed). Lea's Tue 13:30 consolidation is labelled a *first pass* (France missing, finishes Wed).
6. **Secondary findings.** Kleio cash policy (CHF term deposits split across the two Swiss banks + **USD government
   MMF**, no CHF MMF — Sarah Mon 07:30/15:00, Tue 14:00); "EUR 1.5m to spare" → **EUR 0.9m** (11.9 − 3 − 8, stated
   both sides in Lea Tue 08:00 and Daniel Tue 08:20); "CHF 200k = two months of US payroll" → **one month**
   (≈ USD 118k per semi-monthly run ≈ CHF 190k/month at 0.80); Petra's 9-account and Sarah's 7-account lists now
   enumerate exactly; low point framed as **mid-December (week of 14 Dec), ≈ CHF 18m, December payrolls incl. 13th
   salary** — no "week 6", and the annual bond coupon is a **separate, later event**; the PLN loan is hedged with a
   **cross-currency swap** (Priya Mon 15:00, Anna Tue 11:00, Priya talksTo); "21 November 2026" → **"with the
   November 2026 release (banks communicate 14 or 21 November)"** (Anna Tue 10:00 + `anna.mdx` evidence).

### Other review points addressed (missing concepts, realism, vagueness)
- **Cut-off as active constraint:** Petra Tue 10:10 now names the house bank's 14:00 CHF cut-off and shows the fix at
  11:30 ("why the call-back could be done properly instead of rushed").
- **US statements last, shown not just told:** new Lea Tue 11:15 row (US files land mid-morning; intraday report
  meanwhile).
- **Intraday credit / daylight overdraft:** Lea Tue 14:45 (the EUR 8m forward settles against the account's intraday
  credit line, past that into an overdraft).
- **TMS payback number:** Daniel Tue 13:30 — position 45 min/normal morning (~2 h Monday), forecast cycle ~4 h/week.
- **Value-dated vs booked:** Daniel Tue 07:55 input.
- **Daniel's Tuesday de-front-loaded** (per the review's suggestion): the 13-week forecast moved 08:45 → 11:00 and the
  hedge-ratio report 09:15 → 14:30 (it was sent Monday 16:00 and is "not urgent unless a quarter is outside the
  band"); cross-links updated (`#tuesday-1430`).
- **Petra's intercompany signatory:** the EUR 300k transfer (≈ CHF 280k) is *above* her CHF 250k mandate **and**
  intercompany transfers always carry Martin — both stated (Mon 15:00, Tue 11:00).
- Small: "invoices due by next Tuesday" → "by Friday"; Swiss payroll ≈ CHF 0.8m so the weekly CHF 0.3m fall is "net
  of receipts"; SIC and T2 rows now compare the same measure (system day end + customer cut-off); the German
  salary/pay-date convention is attributed to the subsidiaries, not to "German practice"; the Robert Walters
  characterisation is softened and flagged unverified; Priya's exception triage ("3 of 14 reach Priya") and Anna's
  rotation rationale (Singapore needs a Basel-experienced analyst) named; spreadsheets claim given a concrete instance
  (Priya's counterparty-limit report is Excel on top of SAP); DST mismatch spelled out (≈1 week in autumn, ≈3 weeks
  in spring).
- **Cross-file differentiation** of copied details: Daniel's supplier batch 58 payments CHF 4.3m (not 64) and a
  **CHF 2.4m payment routed to CFO + CEO** (new: demonstrates the > CHF 2m co-signing rule inline).

### Task B — why-notes added (`content/why/day.yaml`, 11 notes, all linked inline)
| id | claim | linked from |
|---|---|---|
| `day-morning-window` | money work finished before the cut-offs | `daniel.mdx`, `lea.mdx` |
| `day-escalation-two-million` | what reaches the CFO (amount + type) | `daniel.mdx`, Daniel Tue 09:40 |
| `day-runway-range` | 21–24 months, not 24 | `sarah.mdx`, Sarah Tue 10:00 |
| `day-hedge-ratio-by-quarter` | ratios by quarter vs band | `anna.mdx`, Anna Tue 14:00, Daniel Tue 14:30 |
| `day-exception-list` | 14 exceptions, 3 reach Priya | `priya.mdx`, Priya Mon 07:30 |
| `day-german-funding-3m` | EUR 3m sizing (4.2 + 0.25 − 1.9) | Lea Tue 08:00, Daniel Tue 08:20 |
| `day-covenant-ltm` | 1.36x at 30 Sep; date discipline | Daniel Mon 09:30 |
| `day-rcf-keep-drawn` | why surplus CHF does not repay now | `daniel.mdx`, Daniel Mon 09:05 |
| `day-china-manual-balance` | yesterday's balance, flagged unconfirmed | `lea.mdx`, Daniel Tue 07:45, Lea Tue 07:30 |
| `day-kleio-cash-policy` | deposits at 2 banks + USD MMF | Sarah Mon 15:00 |
| `day-us-payroll-topup` | USD 150k sizing; CHF 200k ≈ 1 month | Sarah Mon 08:05, Sarah awake |

Overlapping notes from other streams (`morning-sequence`, `leverage-bridge-136`, `covenant-test-dates`,
`ceo-cosign-threshold`, `four-eyes-threshold`, `kleio-bank-split-cap`, `helvetic-twelve-accounts`,
`systems-11-of-12-statements`, `hedge-bands-graded`, `systems-kleio-runway`, `week-four-trough`,
`fifteenth-rollover-repayment`, `repay-rcf-not-chf-deposit`) are **cross-linked from mine** rather than restated; my
notes take the "why this scene's number/decision" angle.

### Task B — derivations that failed and the examples I fixed
- **Duisburg "final 20% (EUR 1.9m)"** implied a ~EUR 9.5m project — outside Alpine's canonical CHF 0.5–4m project
  range and exactly the forbidden "20% acceptance ≈ CHF 2.0m". Fixed: the certificate gates the final 20% (≈ EUR 0.7m
  of a EUR 3.5m contract) + 10% retention + the follow-on deposit — "one certificate moves the month by CHF 1–2m"
  (companies.yaml), and the CHF 2m drawing request covers the chain plus margin (`days.yaml` Petra Mon 09:30,
  `petra.mdx`).
- **"CHF 200k = two months of US payroll"** — off by ~2×; now one month (derivation in `day-us-payroll-topup`).
- **"EUR 1.5m to spare"** — 11.9 − 3 − 8 = 0.9; fixed and stated.
- **"Q1 2027 at 72% is inside the band"** — under canonical v2.1 Q1 2027 is Q+2 with a **40–70%** band, so 72% would
  be *above* it. Report restated to Q4 2026 85% (60–90), Q1 2027 62% (40–70), Q2 2027 30% (25–55, near its floor →
  Friday quote round), Q3 2027 10% (0–40) — consistent with the October exposure cycle in `fx-exposure-management.yaml`.
- **"Four hires move runway by roughly two months"** — 22 ÷ 0.955 ≈ 23.0 vs 24.4 months ≈ six weeks; fixed.
- **"Cash fell CHF 0.3m, mostly Friday's Swiss payroll"** — Swiss payroll ≈ CHF 0.8m (62 CH staff × CHF 150–180k);
  fixed to "net of receipts".
- **Gap causality** — a German run debiting Monday cannot be a surprise against *yesterday's* expectation; the gap is
  now measured against **last week's plan** (which assumed a Tuesday debit), and the funding waits until Tuesday
  because the German need is final after the early run.

## Files touched in this revision
`content/data/days.yaml`, `content/pages/day/{index,daniel,lea,anna,petra,sarah,priya}.mdx`,
`content/glossary/day.yaml` (jour-fixe example), `content/why/day.yaml` (new), `docs/notes/day.md`,
`docs/notes/day-requests.md` (new). No `src/` changes (anchors still `#<day>-hhmm`; `#tuesday-1430` created and
linked).

## Verification
- `npm run check`: **0 errors, 0 warnings from day files** (the only errors at run time were transient
  missing-why/source ids in `content/data/competitors.yaml` and `content/pages/systems/bank-connectivity.mdx`,
  owned by other streams mid-write).
- `node scripts/shot.mjs "$TMPDIR/day-v2" "/day,/day/daniel,/day/lea,/day/anna" --full`: no MISSING refs, no runtime
  errors. Read the /day/daniel PNG: PersonaCard, ordered Monday/Tuesday rows (09:05 RCF roll, 09:30 leverage 1.36x,
  Tue 09:40 "Release 57 of 58", 11:00 forecast, 14:30 hedge report), rhythm table, unusual event, awake list and
  interview callout all render.
- One-off Playwright hover on the `day-covenant-ltm` note (button.why on /day/daniel): popover visible, showing
  claim + short + full derivation + "What would make it wrong" line.

## Unresolved / judgement calls
- **27 Oct kept** (see above). If a later round insists the day module share the /start Tuesday, the re-alignment is a
  full rewrite of six calendars — flag before attempting.
- The gold `cash-forecasting.yaml` and `/start` still put "next quarter / Q1 2027" in the 60–90% band, which
  contradicts canonical v2.1 ("Q1 2027 = Q+2 = 40–70%"); my pages follow v2.1. Request filed.
- Kleio's 7-account composition differs in wording across streams; `days.yaml` now enumerates 4+2+1 = 7. Request filed.
- The Swiss supplier run at HM AG is prepared by Swiss AP with treasury co-signing, while the canonical signing line
  says "Lea prepares, Daniel releases" for payments ≤ CHF 2m; kept the AP-prepared run (as `roles-treasury-manager`
  does) and worded the matrix as "accounting prepares, treasury signs; > CHF 2m CFO + CEO in addition". If the
  canonical line is meant to cover supplier runs too, tell me and I will move preparation to Lea.
- Evidence limits from round 1 still apply (WebFetch egress-blocked; the SIC 2017 extension is indirectly
  corroborated; the Robert Walters interview content is unverified and now labelled as such).
