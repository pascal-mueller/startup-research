# Review: Interview Prep — round 1

Scope: `content/pages/interview/{index,by-role,questions,bad-questions,vocabulary,before-and-after}.mdx`, `content/data/interview-topics.yaml`, cross-checked against `content/companies.yaml`, `docs/AUTHORING.md` canonical facts, `content/data/roles.yaml`, `content/pages/org/roles-*.mdx`, `content/workflows/*.yaml`, `content/glossary/*`, `content/sources/interview.yaml`. Reader standpoint: technical founder interviewing treasurers/CFOs tomorrow.

## Scores (1–10)
factual accuracy: 7 | workflow realism: 8 | pedagogical quality: 8 | concreteness: 9 | source quality: 9

## Critical errors (must fix)

1. **The flagship "good answer" contradicts the app's own canonical Helvetic forecast schedule.**
   `questions.mdx` §1: *"Monday I consolidate the 13-week forecast — Italy and China are usually late, I chase them by 11 — then Daniel reviews it Tuesday before the CFO call."*
   Canonical facts (`docs/AUTHORING.md` end section): *"The 13-week forecast is updated **weekly**: subsidiaries submit by Tuesday noon, Lea consolidates Tue–Wed, Daniel reviews Wednesday."* Reinforced by `content/workflows/cash-forecasting.yaml` (example: "Lea rolls the forecast forward on Monday… Tuesday noon, 7 of 8 subsidiaries have submitted; **France** submits Wednesday morning"), by `content/glossary/interview.yaml` `forecast-submission` ("Every Tuesday by 12:00 Giulia… uploads"), and `content/data/roles.yaml` analyst calendar ("Templates are due Tuesday noon").
   Why it matters: this is the model answer the founder is told a "good answer sounds like" — a founder who learns this rhythm and mirrors it back ("so you consolidate Monday, review Tuesday?") will contradict Helvetic's own pages and, worse, will mis-schedule the real conversation ("walk me through *Tuesday's* consolidation"). The late-entity detail (Italy/China vs France) contradicts the workflows too.
   Fix direction: rewrite the answer to the canonical week — Monday: roll forward + chase + explain last week's variances; Tuesday noon: submissions; Tue–Wed: consolidation; Wednesday: Daniel reviews — and use France (or say "two entities" generically).

2. **MT940 is paired with the wrong ISO 20022 successor in the vocabulary the founder is told to memorise.**
   `by-role.mdx` (Treasury Analyst terms): *"[MT940](term:mt940) / [camt.054](term:camt-054)"*; `vocabulary.mdx` daily-cash-positioning row: *"MT940, camt.054"*, and connectivity row good-to-know: *"MT940, camt.054"*.
   The glossary itself defines it correctly: `camt-053` = "the modern electronic **end-of-day bank statement**" (the like-for-like successor of MT940), `camt-054` = "debit/credit notification… individual items behind a single booking". For daily positioning the practitioner works from MT940/**camt.053** (prior-day statements; intraday is MT942/camt.052). The org stream already has it right (`roles.yaml` analyst vocabulary: "MT940 / camt.053").
   Why it matters: this page promises "the terms you must not have to ask about". A founder who says "so you load the camt.054s each morning" will be corrected on the spot by any treasury ops person. Evidence: glossary entries `content/glossary/systems.yaml` (camt-053) and `content/glossary/wf-pay.yaml` (camt-054).
   Fix direction: "MT940 / camt.053 (statement) — plus camt.054 (item detail behind a booking)".

3. **The module contradicts itself on payment-fraud sensitivity — the founder is told to ask exactly what they are told never to ask.**
   `bad-questions.mdx` (Sensitive table) bans: *"How do you verify supplier bank-detail changes?"* — *"Asks them to describe a live control to a stranger"*, and `index.mdx` "Never ask for" lists *"the specifics of a current control: approval thresholds… call-back procedures, which system checks what"*.
   But `questions.mdx` (Fraud and controls) probes: *"What does the process look like when a supplier sends new bank details?"*; `interview-topics.yaml` (fraud) opener: *"What happens, step by step, when a supplier emails new bank details?"*; and `interview-topics.yaml` (payments → treasury-manager) says *"Good on **approval limits**, what gets escalated"* while `questions.mdx` §3 probes *"Is there a written threshold, or is it a feeling?"*.
   Why it matters: the supplier-bank-detail question is the single most fraud-recon-sensitive discovery question in payments (BACS specifically warns about reconnaissance of payment processes; the module cites this itself). As written, the founder gets three different rules from three pages and no way to tell a "sequence" question from a "describe your live control" question. Note also "What does the process look like when…?" is a *general/habitual* question by the module's own taxonomy.
   Fix direction: draw the boundary explicitly once (payment signatory limits / call-back specifics = off-limits; internal escalation norms and past events = fine at the level of "who looks at it next, roughly"), and rewrite the two openers as past-instance questions ("the last time a supplier's bank details changed — without the details, what happened?").

## Missing concepts

1. **No prep block for the Head of Accounting or AP**, although `interview-topics.yaml` ranks `accounts-payable` as `best` for payments *and* fraud, and `head-of-accounting` runs the whole payment chain at SMEs (Petra at Alpine). `by-role.mdx` gives them one line under "Roles not covered in depth here", and the "Adapting to seniority" table in `questions.mdx` has no row for them. A founder meeting an Alpine-type Petra tomorrow has no "what they own / can't answer / terms" block. Moderate gap — these are among the most likely interviewees at SME/mid-market.
2. **No interview guidance for `acquisition-integration`** (it appears in `interview-topics.yaml` bank-accounts' workflow list with no opener) and only one line for `bank-fee-analysis`. Post-M&A treasury integration is a common mid-market story ("we went from 31 to 12 accounts") and a natural interview topic.
3. Minor: no note on conducting these interviews in German/Italian (DACH terms differ: Kollektivzeichnung, Liquiditätsplan/13-Wochen-Plan) — the vocabulary page trains English terms only.

## Unrealistic workflow descriptions

None major. The question sets map well onto the real workflow mechanics (cross-checked against `daily-cash-positioning`, `cash-forecasting`, `funding-subsidiary`, `large-payment-approval` interview boxes and steps: missing Chinese statement as a connectivity problem, subsidiary chase behaviour, tax constraints on loans — all consistent).

One realism wobble: `questions.mdx` §2 good answer has Lea logging into *"three bank portals and the connectivity tool"*, while `before-and-after.mdx`'s debrief example (same company) has *"Connectivity tool for 4 banks; Chinese bank by portal screenshot"*. Pick one setup.

## Vague / generic passages

Very few — this is the most concrete module of the set. Two soft spots:
- `by-role.mdx` Treasurer (hands-on): *"does or closely reviews almost all Cash & liquidity workflows"* — sweeping; the workflow-by-workflow table pattern used for CFO/Treasury Manager would be sharper here too.
- `index.mdx`: *"Most practitioners belong to a national association, attend one or two events a year"* — unmeasurable generalisation; it is hedged as field note, keep the hedge or drop the "most".

## Unsupported or mis-cited claims

Verified (original publisher / publisher-reported figures):
- **BACS CEO fraud 719 (2024) → 971 (2025)** — VERIFIED. Reported consistently across Swiss outlets citing BACS (e.g. schweizer-gemeinde.ch; BACS's own weekly review bacs.admin.ch covers CEO fraud as a top-reported method). `index.mdx` states it accurately.
- **AFP: "three-quarters of organisations surveyed by AFP experienced attempted or actual payments fraud in 2025"** — VERIFIED (2026 AFP Payments Fraud and Control Survey: 76%, US firms; AFP press release "Over 75 Percent of US Firms Experienced Payments Fraud in 2025"). Correctly framed as US.
- **VDT "2,000+ members from almost 900 companies"** — VERIFIED (vdtev.de: "mehr als 2.000 Finanzverantwortliche aus fast 900 Unternehmen").
- **ACT Annual Conference Liverpool 12–13 May 2026** — VERIFIED (treasurers.org). **EuroFinance Barcelona, CCIB, 16–18 Sept 2026, 35th edition** — VERIFIED (eurofinance.com). **Swiss Treasury Summit, 15 Sept 2026, HSLU IFZ Zug-Rotkreuz, CAS Swiss Certified Treasurer link** — VERIFIED (hslu.ch / event listings).

UNVERIFIED (R1):
- `index.mdx`: SwissTreasurer/ACTSR *"holds a forum and AGM in Geneva **each June**"* — one confirmed instance (18 June 2026, Compenswiss) does not establish the annual pattern, and the source note itself says the SwissTreasurer = ACTSR identity "was not verified". The page's "/" hedge is good; soften "each June" or mark as observed once.
- `index.mdx`: HSLU summit *"active treasurers and CFOs get a 50% discount"* — consistent with the source note (HSLU snippets) but not re-confirmable from the publisher in this review. UNVERIFIED (R1).
- `index.mdx`: *"EACT lists national associations in ~26 European countries"* — consistent with the registered source note; not independently re-confirmed. UNVERIFIED (R1).

Unsupported absolute (practitioner variation, not error): `vocabulary.mdx`: *"Mid-market groups do not have in-house banks, payment factories or FX desks — mis-sizing their world."* Some CHF 500m–2bn groups do run POBO-lite / a central payment factory or an informal in-house bank, and "FX desk" is used loosely for "the person who deals FX". Say "typically do not" — a founder who disbelieves a mid-market treasurer describing a simple payment factory would be wrong.

## Better example opportunities

1. Fix the §1 "good answer" to the canonical Helvetic week (see Critical 1) — it is currently the best teaching example on the page and is teaching the wrong rhythm.
2. Replace the contested supplier-bank-detail question with a short redacted transcript showing the safe version ("Without details — walk me through what happened the last time a supplier's bank details changed" → "AP flagged it, someone called the supplier on the number we already had…") — this resolves Critical 3 concretely instead of by rule.
3. `before-and-after.mdx` "Red flags" table is strong; one 4-line scripted redirect exchange ("That's done in the subsidiaries" → "Understood — who in Italy would you suggest?" ) would make it actionable under interview pressure.
4. Vocabulary: one worked line distinguishing the statement pair from the notification pair (e.g. "the CHF 600k single booking in camt.053 vs the 40 supplier items behind it in camt.054").

## Minor issues

1. `bad-questions.mdx` heading *"The spec's three classics"* — "the spec" is the internal authoring document; the reader has never seen it. Rename (e.g. "Three questions that look reasonable").
2. `questions.mdx`: *"What did you export into Excel?"* presumes an Excel export — mildly leading on a page whose thesis is non-leading questions. "Did anything end up in Excel, and what did you do there?"
3. `questions.mdx`: *"Who do you sit closest to?"* is a weak org proxy for hybrid/remote finance teams — fine to keep, but pair it with "who do you message most".
4. `vocabulary.mdx` table: ISO 20022 is "Must know" in the daily-positioning row and "Good to know" in the connectivity row of the same table — reconcile.
5. `questions.mdx` "Cash pooling and intercompany funding" block promises pooling questions but links only `funding-subsidiary` (no pooling workflow exists) — acceptable, but note it in the block.
6. `before-and-after.mdx` "financial-risk note" advice: Helvetic reports under Swiss GAAP FER and will disclose far less than GlobalChem's IFRS 7 note — worth one clause so the founder isn't surprised.
7. `interview-topics.yaml` header comment references "spec §14" (file comment only — harmless).

## Checks run

- `npm run check`: 0 errors, 0 warnings (336 terms, 181 sources, 20 workflows, 94 pages, 26 roles).
- `node scripts/shot.mjs "$TMPDIR/int-shots" "/interview,/interview/by-role,/interview/questions,/interview/bad-questions,/interview/vocabulary,/interview/before-and-after" --full`: no MISSING refs, no runtime errors. Screenshot `_interview_1440.png` read: tables, callouts, Flow, related-links and the full source list render correctly.
- Role ids in `interview-topics.yaml` all exist in `content/data/roles.yaml` (incl. the deliberate `bank-relationship-manager` vs `bank-rm` split, used correctly).
- No files edited except this review.

## Verdict: REVISE

Strong, unusually concrete module — the discovery-method core, bad-question rewrites, sensitivity warnings and company-size mapping are correct and genuinely usable. But one flagship example teaches the wrong workflow rhythm, the vocabulary pairs MT940 with the wrong statement format, and the sensitivity rules contradict each other across three pages. All three are narrow fixes; after them this is a PASS-level module.
