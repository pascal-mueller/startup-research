# Stream notes: interview (spec §13, §14, §16)

## Files created
- `content/data/interview-topics.yaml` — 12 InterviewTopic entries exactly per spec §14 (cash-forecasting, payments, fx,
  liquidity, investments, bank-connectivity, treasury-systems, debt, fraud, cash-pooling, bank-accounts,
  intercompany-funding). Each: workflows, best (2–3), also (2–4), less (3) with why, sizeNote, 3 last-instance openers.
  All role ids validated against `content/data/roles.yaml` (26 roles) with a script — no missing ids.
- `content/pages/org/interview-finder.mdx` — `/org/interview-finder`: how to read the finder, `<InterviewFinder />`,
  "doer → reviewer → decider" rule, title confusion, what to do when the org chart doesn't match (no treasury, SSC, RTC, consultants).
- `content/pages/interview/index.mdx` — purpose + method (Mom Test / Torres / Blank), page map, where to find treasurers
  (warm intros, SwissACT, SwissTreasurer/ACTSR, ACT Treasury Network Switzerland, Swiss Treasury Summit, VDT, ACTA,
  ACT/EuroFinance/AFP conferences, LinkedIn, consultants), approach-message template, confidentiality & fraud
  sensitivity (never-ask list), permission-to-talk field note, interview sequencing (Flow + 5 rules).
- `content/pages/interview/by-role.mdx` — 10 roles per spec §13 (CFO, Treasurer, Head of Treasury, Treasury Manager,
  Analyst, Cash Manager, Liquidity Manager, FX/Risk, Treasury Ops, subsidiary finance): owns / workflows touched /
  can answer / can't answer / terms first / `<RoleKnows>`; Treasurer and Head of Treasury share `head-of-treasury`,
  Cash and Liquidity Manager share `cash-manager` (explained in a confusion callout). CFO has a size table.
- `content/pages/interview/questions.mdx` — all §16 questions, by phase (context, walk-through, judgment/escalation/failure,
  tools/change, close) with probes and good vs evasive answers; by workflow (10 blocks); seniority table.
- `content/pages/interview/bad-questions.mdx` — 5 failure categories; the spec's 3 classics + hypothetical, general,
  leading, sensitive (treasury-specific), naive questions, each with why + rewrite.
- `content/pages/interview/vocabulary.mdx` — always-terms, per-topic must/good-to-know/listen-for table (all glossary-linked),
  naivety phrases table, confusing-words callout.
- `content/pages/interview/before-and-after.mdx` — prep checklist (week/day/first 2 minutes), note template (text block),
  debrief (workflow mapping table, mini RACI, spotting the real owner, evidence classification), wrong-person red flags table.
- `content/glossary/interview.yaml` — 5 terms: front-middle-back-office, treasury-committee, cut-off-time, static-data, forecast-submission.
- `content/sources/interview.yaml` — 14 sources (method: mom-test, torres-story-based, torres-wrong-questions, torres-cdh,
  blank-customer-development, moesta-switch; associations/events: vdt-home, hslu-swiss-treasury-summit,
  swisstreasurer-forum-2026, act-tn-switzerland, eact-nta, act-annual-conference-2026, afp-conference-2026, eurofinance-2026).
  Reused existing: bacs-ceo-fraud-2026, afp-pfc-2026.

## Verification
- `npm run check`: 0 errors from my files. Remaining errors belong to other streams (lens.yaml / wf-control.yaml YAML
  parse errors, duplicate ids in systems/competitors/wf-risk/wf-events). Warnings from my files are only links to
  not-yet-written workflows/pages (/size, /org/roles, /org/handoffs, /org/responsibility-matrix, /org/who-knows-what).
- Note: `npm run check` does not parse `content/data/interview-topics.yaml` — I parsed it separately with js-yaml
  (a first draft had unquoted `why:` scalars containing ": " which broke parsing; fixed by folding all `why` values).
- All 7 MDX pages compile with @mdx-js/mdx + remark-gfm.
- Screenshots: at the time of writing, every route returned the Vite error overlay caused by another stream's
  `content/glossary/lens.yaml` parse error (line 65), so rendered screenshots of /org/interview-finder and
  /interview/questions could not be verified visually. Re-screenshot once lens.yaml is fixed.

## Research limitations (important for the reviewer)
- WebFetch was blocked for every domain tried (momtestbook.com, producttalk.org, steveblank.com, treasurers.org,
  eact.eu, hslu.ch, financialprofessionals.org, wikipedia). All sources were verified from WebSearch snippets of the
  publisher's page; the Mom Test rules were confirmed via quote pages/summaries, not the book. The WebSearch budget for
  the session (200) was then exhausted, so I could not add a treasury-specific source on vendor-pitch fatigue or
  social-engineering reconnaissance. Those points are labelled field note / synthesis and supported indirectly by
  BACS (CEO-fraud reports 719 → 971) and AFP 2026 payments-fraud figures.
- Swiss associations: SwissACT (confirmed via HSLU Swiss Treasury Summit page) and SwissTreasurer (Geneva forum/AGM
  18 June 2026; EACT's Swiss member listing). Whether SwissTreasurer is the current name of ACTSR (Suisse romande,
  founded 1981) is **unverified** — the text avoids asserting it.
- Years for Product Talk articles and the Moesta talk are approximate.
- No statistics about interview practice are stated. Association/conference figures are the organisers' own.

## Unresolved / judgment calls
- "Liquidity Manager" vs "Cash Manager": presented as one role family with a forward-looking vs same-day emphasis,
  explicitly flagged as varying by company. Reviewer may want a source (job descriptions) — none could be fetched.
- The channel ranking in "Where to find treasury people" is a field note, not measured.
- Canonical facts after exemplar review applied: Helvetic has no pool (manual intercompany loans); Lea prepares,
  Daniel decides; CHF surplus reduces RCF drawings rather than deposits (investments sizeNote).

## Requests for other authors
- **roles.yaml author:** by-role.mdx uses `<RoleKnows>` for cfo, head-of-treasury, treasury-manager, treasury-analyst,
  cash-manager, fx-risk-manager, treasury-operations, subsidiary-finance, and `<RoleLink>` for head-of-accounting,
  payments-lead, corporate-finance, treasury-systems. Consider adding "Liquidity Manager" to cash-manager `aka` and
  "Treasurer / Group Treasurer / Corporate Treasurer" to head-of-treasury `aka`.
- **workflow authors:** your `interview` field can link to `/org/interview-finder`, `/interview/questions#by-workflow`
  and `/interview/bad-questions`. Glossary terms available: `cut-off-time`, `static-data`, `forecast-submission`,
  `treasury-committee`, `front-middle-back-office`.
- **lens author:** please fix `content/glossary/lens.yaml` line 65 (YAML parse error) — it currently breaks every page.
- **check script owner:** consider parsing `content/data/*.yaml` and validating `interview-topics` role/workflow ids.
