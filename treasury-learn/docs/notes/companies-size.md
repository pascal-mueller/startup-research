# Notes — stream "companies-size" (/companies, /size)

## Files created / changed
- `content/pages/companies/index.mdx` — why four companies, cast table, how to use, what they don't cover.
- `content/pages/companies/kleio.mdx`, `alpine.mdx`, `helvetic.mdx`, `globalchem.mdx` — profile, CompanyFacts, entity/bank/account map,
  OrgChart (ids `kleio`, `alpine`, `helvetic`, `globalchem` from content/data/orgs.yaml), who does treasury (links to /org/roles-* and /day/*),
  systems, cash-flow pattern with numbers, typical problems, workflows-as-run table, interview callout.
- `content/pages/companies/same-problem.mdx` — six spec workflows + extras via `<CompanyCompare>`; reuses core topics
  `who-does-treasury`, `forecasting`, `positioning`.
- `content/pages/size/index.mdx`, `startup.mdx`, `sme.mdx`, `midmarket.mdx`, `multinational.mdx` — ranges, evidence, SizeTabs ownership,
  triggers between tiers; multinational page has a dedicated "~50,000-person group" section. OrgCharts used: `kleio`, `controller-led`,
  `helvetic`, `decentralised-group`, `large-rtc-ssc`.
- `content/compare/companies.yaml` — 14 topics: co-forecast-error, co-fx-exposure, co-fx-hedging, co-payment-approval, co-payment-run,
  co-liquidity-planning, co-bank-landscape, co-bank-account-opening, co-investments, co-intercompany, co-systems, co-controls,
  co-reporting, co-key-person.
- `content/glossary/companies-size.yaml` — fiduciary-treuhaender, shared-service-centre, treasury-centralisation,
  bank-account-rationalisation, deposit-protection, current-account-credit, milestone-payments, restricted-currency, annual-prepayment.
- `content/sources/companies-size.yaml` — pwc-gts-2023, seco-kmu-finanzierung-2021, clariant-frm-2020, clariant-cash-mgmt-job,
  schindler-holding-2021, kyriba-act-2013.
- `content/companies.yaml` — ONE refinement: Alpine "Banks" now reads "2 Swiss banks (…); the US subsidiary also keeps a local US
  account; 9 accounts in total" (other streams' glossary already describes Alpine Inc.'s own bank with lockbox/cheques).

## Research constraints (important for the reviewer)
- WebFetch was egress-blocked for every domain tried (financialprofessionals.org, pwc.com, pwc.be, treasury-management.com, ctmfile.com,
  wikipedia). The session's shared WebSearch budget was exhausted after ~12 of my queries. All new sources are therefore verified only
  against **publisher search-result snippets**; each is marked "(search snippet)" in its `note`.
- Clariant's euro cash pool ("with a leading European bank") appeared in search results but I could not confirm which document; the page
  text cites Clariant only for the central-treasury / selective-hedging statement.
- kyriba-act-2013 is old and vendor-sponsored; used only for the direction of the spreadsheet-by-size gradient, flagged as such.
- Uncited established facts: deposit-protection limits (esisuisse CHF 100k per depositor per bank; FDIC USD 250k; EU EUR 100k); Schindler
  headcount "about 70,000" (from memory, in a source note — verify).
- All tier ranges (entities, banks, accounts, team sizes, the 50,000-person group figures) are labelled synthesis / field observation,
  not survey data. Size-specific survey data I could use: AFP 2025 (1–3 FTE under USD 1bn), AFP 2026 (46% < 5 staff), PwC 2023/2025
  (IHB / payment factory / POBO above USD 10bn), SECO 2021 (32% of Swiss SMEs have bank financing).
- The Helvetic "weekly time budget" is explicitly an illustrative estimate.

## Consistency decisions
- Followed AUTHORING "canonical facts clarified": no Helvetic cash pool (pool "discussed but not implemented"); Lea prepares, Daniel
  decides; CHF surplus repays RCF drawings rather than CHF deposits; Chinese statement problem described as connectivity, not time zone.
- Aligned with orgs.yaml (org stream): at Helvetic Daniel trades, Lea matches confirmations, group accounting settles/books; Lea
  calculates covenants, Thomas signs; Daniel owns the bank-account register. GlobalChem team sizes 3/6(+3 Singapore)/4/7/2; Marta's
  team (incl. payment factory) sits in Kraków but reports to Anna. Kleio: surplus USD in short US deposits; government MMF allowed.
- Alpine cash sheet: payroll ~CHF 3m/month; operating cash minimum ~CHF 6m; headroom = undrawn committed line + cash above minimum.
- Kleio: costs ~CHF 1.9m/month, receipts ~CHF 0.4m/month + Jan 5.0m + Jul 2.5m → ≈CHF 0.9m average net burn.
- Helvetic net debt ≈ CHF 119m (RCF 60 + bond 100 − cash 41) → ~1.4x EBITDA 85m.

## Requests for other authors
- **/start/growth (owner of start pages):** mid-market "Bank accounts 15–100" excludes Helvetic's 12 — suggest "10–100 (low end after
  rationalisation)" as used on /size. Multinational "Legal entities 100+" excludes GlobalChem (~40 operating) — suggest "~30 to several
  hundred" or add a note. Startup accounts "2–8" vs /size "2–10" (minor).
- **orgs.yaml (org stream):** Helvetic `whoDoesWhat` says subsidiaries submit the forecast template "every second Thursday"; the gold
  workflow `cash-forecasting` says weekly, Tuesday noon. Please align to weekly/Tuesday.
- **Glossary (whoever owns the Alpine sweep example):** "sweeps anything above CHF 500k from the German subsidiary's EUR account" — the
  threshold should be in EUR.
- **Glossary (owner of cash-concentration example):** "Before its cash pool, Helvetic's Daniel concentrated cash manually" contradicts the
  canonical "Helvetic has NO cash pool".
- **core compare `positioning` (Alpine cell):** says DE and US balances come via "the same banks' multi-country views"; Alpine Inc. now
  has its own US bank (statements imported into the large Swiss bank's portal) — still consistent, but wording could be tightened.

## Late change
- Another stream revised `deloitte-gts-2024` (the "forecasting primarily supported by spreadsheets" phrase could not be verified). I
  removed that claim from helvetic.mdx, size/index.mdx and size/midmarket.mdx; size/index now cites only the 22% cash-positioning figure.
- `npm run check`: 0 errors from this stream's files (remaining error at time of writing: start/index.mdx unknown source "afp-sr-2025",
  not mine — note that /start/growth and /start/index are not my files).
