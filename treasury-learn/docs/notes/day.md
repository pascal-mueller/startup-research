# Notes — stream "day" (Day in the Life)

## Files created / touched
- `content/pages/day/index.mdx` (/day) — no universal day; the shared week; `<DayCompare>` table of six personas; who-feeds-whom flows (Helvetic, GlobalChem); "the clock everyone works to" (statement arrival, SIC/T2/CHAPS/Fedwire, payroll dates); common patterns; interview use; evidence note.
- `content/pages/day/{sarah,petra,daniel,lea,anna,priya}.mdx` — persona card, Monday + Tuesday timelines, rest-of-week/month rhythm, one unusual event, "what keeps them awake", interview callout (good questions + what they won't know), one concept/confusion callout each.
- `content/data/days.yaml` — all persona data; 96 timeline entries, each with time, kind, systems, call (short decision), why, input, decision, who, next, optional wf links. Cross-links at hand-over points (`/day/lea#monday-0845` → `/day/daniel#monday-0850`, `/day/priya#monday-1030` → `/day/anna#monday-1045`, Priya's loan recommendation → Anna's approval, etc.).
- `src/components/DayViews.tsx` — `PersonaCard`, `DayTimeline` (expandable rows, time column, kind + system chips, decision chip, expand-all, auto-opens the row targeted by a `#day-hhmm` hash), `DayRhythm`, `DayUnusual`, `DayAwake`, `DayPersonaIndex`, `DayCompare`. Types are local.
- `src/styles/day.css` — tokens only; dark mode via global tokens; 600px breakpoint stacks the detail grid.
- `src/components/MdxPage.tsx` — one import line + `...Day` spread (as allowed).
- `content/glossary/day.yaml` — `key-person-risk`, `ebics-key-initialisation`, `thirteenth-month-salary`, `jour-fixe`.
- `content/sources/day.yaml` — `frb-fedwire-hours`, `boe-chaps-faq`, `aos-t2-hours`, `ubs-sic-hours-2017`, `rw-day-global-treasurer`.

## Canonical-fact decisions
- All six personas live the same week: Mon 26 / Tue 27 Oct 2026 (EU clock change Sunday 25 Oct, US on 1 Nov → New York 5 h behind that week; Swiss payroll paid Fri 23 Oct; German payroll value Fri 30 Oct).
- Daniel's Tuesday is the Start-page Tuesday (CHF 41m, CHF 3m gap, Italian CHF 2.1m, EUR 3m to Germany for EUR 4.2m payroll, week-6 low point CHF 18m vs CHF 10m minimum, hedge 72% in 60–90% band, 64 payments). Per the clarified canon, **Lea prepares** (starts 07:30, refreshes workbook, sizes the funding, enters the transfer) and **Daniel reviews/decides/approves**; Daniel opening the tools himself at 07:45 is framed as looking before her proposal arrives.
- Missing Chinese statement is framed as a recurring relay/format problem with a ticket, not a time-zone delay.
- CHF ≈ 0%: Daniel's Monday decision is whether to repay part of a CHF 20m RCF tranche at rollover (he rolls it unchanged — saving is margin net of commitment fee, likely redraw before the December coupon). Undrawn RCF stays CHF 140m, consistent with the forecast example. Sarah's CHF deposit roll is justified by bank split/segregation, explicitly not yield. GlobalChem invests EUR surplus in MMFs.
- Helvetic has no cash pool — only manual intercompany loans (stated on Daniel's page).

## Research and evidence limits (important for the reviewer)
- WebFetch was blocked by the egress proxy for every publisher tried (financialprofessionals.org, robertwalters.co.uk, ubs.com, ecb.europa.eu, frbservices.org, six-group.com, treasury-management.com). The session's shared WebSearch budget was exhausted after six searches from this stream.
- Therefore the only new cited facts are payment-system hours taken from search-result extracts attributed to the original publisher (Fed, BoE, UBS notice on SIC) or a law-firm summary (T2 18:00 end of day). Each source note says so. The Robert Walters interview is used only qualitatively.
- Uncertain / worth verifying when fetch works: exact T2 customer-payment cut-off (believed 17:00 CET, not stated on the page); current SIC clearing-stop times for customer payments (the 2017 15:00→17:00 change is what's cited); BoE's 01:30 CHAPS opening plan date.
- Timelines, amounts and calendars are labelled illustrative synthesis. Reused registered sources: `bacs-ceo-fraud-2026`, `afp-pfc-2026`, `six-sps-cash-mgmt`.
- Swiss VAT "due 60 days after quarter-end" and payroll-date conventions (CH ~25th, DE last business day) are stated as common practice without a citation.

## Requests for other authors
- **Start page (`content/pages/start/index.mdx`)**: item 1 says the Chinese statement "will arrive around 10:00" and Daniel himself builds the Tuesday position. The clarified canon says Lea prepares and a missing Chinese statement is a connectivity problem. Suggest: "The Chinese bank's is missing again — a known relay problem; Lea has already raised a ticket" and "Opens the workbook Lea refreshed at 07:40". /day/daniel is written to fit either wording.
- **`daily-cash-positioning.yaml`** worked example: "the Chinese bank's arrives later" and "places CHF 2m in a one-week deposit" at HM AG — the second conflicts with the CHF ≈ 0% / drawn-RCF rule; consider "reduce the next RCF rollover by CHF 2m" instead.
- **`cash-forecasting.yaml`** example: "Daniel approves a CHF 5m 3-week deposit" — same CHF ≈ 0% issue.
- **Org/roles authors**: persona pages link to `/org/roles-cfo`, `/org/roles-head-of-treasury`, `/org/roles-treasury-manager`, `/org/roles-analyst`, `/org/roles-cash-manager`, `/org/roles-fx-risk`, `/org/roles-operations`, `/org/with-accounting`, `/org/with-subsidiaries`, `/org/who-knows-what`. If role pages want to point to the day pages, the anchors are `/day/<persona>#monday-hhmm` / `#tuesday-hhmm`.
- `content/pages/org/with-accounting.mdx` frontmatter currently fails to parse in Vite (colon inside `summary`), which blanks the whole app while it persists.

## Implementation notes
- Citations inside `days.yaml` render as superscripts, but `MdxPage` only collects cite ids from the MDX source for the References list. Every cite used in YAML (`bacs-ceo-fraud-2026`, `afp-pfc-2026`, `six-sps-cash-mgmt`) is therefore also cited in an "Evidence" callout in the MDX of the page that shows it (sarah, anna). A lib-level fix (collect cites from rendered data) would be cleaner — request for the core owner.
- `/workflows/...` paths in frontmatter `related` render as raw paths (they are not MDX pages), so persona pages list only MDX pages there; workflows are linked inline and as chips in timeline rows.
