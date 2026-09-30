# Notes — org-roles stream

## Files created
- `content/data/roles.yaml` — 26 canonical roles (leadership 3, treasury 10, finance 9, business/external 4). Every role has title, aka, family, oneLiner, reportsTo, exists (per size, with who does the work instead), owns, knows {best/some/not}, vocabulary; most have escalates. `page` set for the 10 treasury role pages + CFO; finance roles point to the other author's `/org/with-*` pages; `bank-rm` points to `/org/roles-bank-relationship`.
  - Calendars: cfo (Thomas, month), head-of-treasury (Anna, month), treasury-manager [0] Daniel's week, [1] Daniel's month/quarter/year, treasury-analyst (Lea's week), cash-manager (Priya's desk, day+week+month), treasury-operations (Marta's team, week).
- Pages (all `content/pages/org/`), sidebar orders 3–13 (contiguous block after Structures) plus who-knows-what at 38: `roles.mdx` (index), `roles-cfo`, `roles-head-of-treasury`, `roles-treasury-manager` (the quality template), `roles-analyst`, `roles-cash-manager`, `roles-fx-risk`, `roles-operations`, `roles-bank-relationship`, `roles-debt`, `roles-payments`, `who-knows-what`.
- `content/glossary/org-roles.yaml` — front-office, middle-office, back-office, deal-confirmation, dealing-mandate, cash-disposition. (Removed my static-data, shared-service-centre and treasury-committee because other streams registered them at the same time; I link to theirs.)
- `content/sources/org-roles.yaml` — 16 sources (ACT competency framework, ACT Wiki front/middle/back office and SoD, job ads: SIX Treasury Manager, Bosch Cash Manager, Kraków Treasury Manager and Treasury Team Leader, Deutsche Börse back office, Disney FX risk, East West Bank "Treasury Relationship Manager"; ctmfile BRM leading practices; DBS payment factory; LearnSignal career guide; a titles-only source for cash/liquidity job titles). Reused: afp-bench-2025-article, afp-bench-2026, pwc-gts-2025, eact-guiding-principles, act-what-is-treasury, tt-share-of-wallet, encompass-kyc-2025.

## Research limitations (important for the reviewer)
- WebFetch was blocked by the egress proxy for every domain tried (treasurers.org, financialprofessionals.org, company career sites, wikipedia). All source notes are based on the original publisher's search-result text (title + snippet), which AUTHORING.md allows. Nothing was quoted beyond what the snippet showed.
- The session's WebSearch budget ran out (shared 200-call cap) after about 20 searches of mine, so I could NOT verify: an exact percentage of treasurers reporting to the CFO (AFP 2026 People & Policies covers it, but I didn't see a number, so none is stated; the CFO page states it as a field note without a number); EY 2025 "DNA of the Treasurer" findings; capital-markets/debt role job ads; payments-lead job ads. The debt, payments-lead and bank-relationship pages therefore rest more on synthesis and the canonical cast than on job-ad evidence.
- Job ads are single-employer evidence and are labelled as such. Deutsche Börse (market infrastructure) and SIX (market infrastructure) are not industrial corporates. This is flagged in the source notes and on the page.

## Canonical facts I introduced (please keep consistent or tell me)
- Helvetic: Thomas co-signs payments above CHF 2m. Daniel's dealing mandate is FX forwards up to 12 months and CHF 20m per deal; options or larger deals need Thomas. Lea is not on the mandate. EUR hedge band 60–90% for the next quarter (from /start). CHF surplus is used to repay RCF drawings at rollover (per the clarified canon), not deposited.
- GlobalChem headcounts aligned with `orgs.yaml`: Marta 7, Priya 6 (Singapore RTC 3), Jonas 4, Olivier 3, Ben 2. Treasury control (middle-office tasks) sits inside Marta's team, as in orgs.yaml.
- GlobalChem: 22 European entities under POBO in the payment factory (my number; orgs.yaml says "European entities" without a count).

## Uncertainties
- The operational vs strategic time split for a pattern-A Treasury Manager is explicitly synthesis ("well over half operational").
- "Refinancing starts well over a year ahead" is justified by current-liability classification (an accounting fact), not by a survey.
- The US Treasurer as corporate officer / Assistant Treasurer ladder is stated as common practice without a citation.

## Requests for other authors
- **orgs.yaml / structures author:** Helvetic's `whoDoesWhat` says subsidiaries submit the 13-week template "every second Thursday". The gold-standard `cash-forecasting.yaml` example (and my pages) use a weekly cycle: Lea rolls forward Monday, templates due Tuesday noon, Daniel reviews Wednesday. Please align to weekly, or tell me and I'll change.
- **days.yaml author:** uses unknown terms `trade-confirmation` (please use `deal-confirmation`, registered by me with aka "trade confirmation") and `key-person-risk` (not registered by anyone yet).
- **with-accounting.mdx author:** the frontmatter `summary:` contains ": " and breaks the Vite YAML parser (the whole app shows an error overlay). Quote the summary or remove the colon. Same issue in `systems/data-quality.mdx`.
- **OrgViews.tsx owner (no change strictly needed):** RoleIndex shows `reportsTo` in a muted column. Some reportsTo strings are long (size caveats); a max-width or smaller font on that column would help. Optional: RoleKnows could accept a `compact` prop for /org/who-knows-what, where 26 three-column blocks make a long page.
