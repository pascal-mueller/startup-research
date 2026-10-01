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
- Alpine cash sheet: payroll ~CHF 3m/month; operating cash minimum ~CHF 5.5m (headroom = undrawn committed line + cash
  above the minimum; week-9 headroom = 12 − 6.5 + 0 = CHF 5.5m).
- Kleio: costs ~CHF 1.9m/month, receipts ~CHF 0.4m/month + Jan 5.0m + Jul 2.5m → ≈CHF 0.9m average net burn.
- Helvetic net debt ≈ CHF 106m (bond 100 + RCF 60.2 − cash 54) → 1.36x on LTM EBITDA ≈ CHF 78m (canonical v2 — this
  line previously read 119m / 1.4x on 85m and was corrected in the revision pass below).

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

---

# Revision pass v2 (after review companies-size-r1)

## Task A — review findings fixed
1. **Helvetic financials rebuilt to canonical (78 / 106 / 1.36x).** `companies/helvetic.mdx` position table is now the
   30 Sep 2026 close: group cash CHF 54m (28 + 12 + 8 + CNY ≈ 55m ≈ 6), RCF drawn CHF 35m + EUR 27m ≈ 60m, bond 100m;
   the one-line derivation is shown (gross 160 − cash 54 = 106; 106/78 ≈ 1.36x) with links to
   `why:net-debt-lender-view`, `why:covenant-excludes-leases`, `why:china-cash-excluded`. `compare/companies.yaml`
   (co-liquidity-planning) moved with it.
2. **RCF maturity** — "runs to 2027" removed from `helvetic.mdx` (×2) and `co-liquidity-planning`; both instruments now
   mature **2028** (RCF Oct 2028), and the refinancing story is "one 2026–27 project covering both". Drawn split and
   15th-rollover mechanics added (pre-rollover CHF 35m + EUR 27m; from 15 Oct 2026 CHF 30m + EUR 35m ≈ 63m drawn,
   ≈ 137m undrawn).
3. **AFP "46% < 5 staff"** kept in `size/index.mdx` + `size/midmarket.mdx` with `cite:afp-bench-2026` (canonical v2 =
   VERIFIED). The denying note still lives in `content/sources/core.yaml` — request filed in
   `docs/notes/companies-size-requests.md`.
4. **Lea's payment authority** made single-model everywhere (Lea prepares/analyses, never signs or releases; Daniel
   releases ≤ CHF 2m four-eyes; > CHF 2m Thomas + CEO co-sign, > CHF 10m board): `helvetic.mdx` roles table (Thomas/
   Daniel/Lea rows), workflow table (payment processing, large payment approval), `co-payment-approval`,
   `co-payment-run`, `co-controls`, and `size/midmarket.mdx` task table. Linked `why:lea-never-releases`,
   `why:four-eyes-threshold`.
5. **German payroll** moved from "Weekly" to "Monthly" (EUR 4.2m at month-end); **hedge policy** changed from one flat
   60–90% band to the graded quarterly bands (60–90 / 40–70 / 25–55 / 0–40) everywhere in my files (`helvetic.mdx`
   rhythm, typical problems, workflow table; `co-fx-hedging`; `size/midmarket.mdx`), linked `why:hedge-bands-graded`.
6. **Number sweep** against companies.yaml + canonical v2/v2.1: CNY 60m → **CNY ≈ 55m** (helvetic ×2);
   "Helvetic Machines AG" legal name correct everywhere (no "Helvetic AG" found); Alpine = 2 banking relationships +
   1 local US account (consistent); Helvetic **12 accounts** (consistent; "12 statements" → 11 via tool + Wei's emailed
   export, `why:systems-11-of-12-statements`); Kleio deposits = CHF term deposits at two banks + **USD government MMF,
   no CHF MMF** (kleio.mdx table/board rule/problems/workflow row + co-investments — the old "MMF not yet used" story is
   gone); €STR quoted as ≈ 2.2–2.4% where I quote it (co-investments).

## Other review items fixed
- Swiss GAAP FER vs IFRS now appears at Helvetic (covenant/definition + hedge "management policy, not IFRS 9
  designation", `why:fer-vs-ifrs-pack`) and GlobalChem (reports under IFRS 9/16).
- ERP count at Helvetic: five local ERPs (IT/FR/UK/US/CN) — `helvetic.mdx`, `co-systems`, `size/midmarket.mdx`.
- Rationalisation date reconciled: 2021 refinancing set the bank panel, 2024 clean-up cut 31 → 12.
- Chinese statement framed as a **connectivity** problem, not time zones (`companies/index.mdx` teaser rewritten).
- Alpine operating minimum stated (CHF 5.5m) with the week-9 headroom arithmetic (`why:alpine-headroom-floor`).
- Kleio runway phrasing → "cash ÷ the just-completed month's net burn"; runway rule harmonised at 12–15 months
  (`kleio.mdx`, `co-liquidity-planning`, `size/startup.mdx`).
- Kleio deposit rows: Bank A holds a deposit product of its CHF current account; the explicit deposit account sits at
  Bank B (still 7 accounts).
- co-fx-exposure Alpine: net EUR long ≈ EUR 25–27m (≈ EUR 39m sales − EUR 12m purchases), convention stated.
- co-forecast-error takeaway now scales the same CHF 2m miss by each company's cash (9% / 20–30% / ~4% / ~0.2%).
- GlobalChem: Singapore (3) marked as inside Priya's six (sum 23 stated); netting given concrete numbers
  (≈4,000 invoices → ~600 settlements, `why:netting-before-hedging`); "About 28 ERPs" → "local ERPs inherited from
  acquisitions" per canonical v2.1; `size/multinational.mdx` Systems got the GlobalChem example stack.
- Deloitte 22% → "roughly a fifth (22%, as reported by Deloitte — figure not confirmed against the primary text)";
  ACT/Kyriba 2013 percentages softened and attributed as trade-press-reported; deposit-protection wording adjusted.

## Task B — why-notes added (`content/why/companies-size.yaml`, 12 new ids)
`kleio-treasury-two-hours`, `kleio-bank-split-cap`, `fundraise-12-15-months`, `alpine-headroom-floor`,
`helvetic-first-analyst`, `helvetic-twelve-accounts`, `helvetic-no-cash-pool`, `helvetic-short-eur`,
`globalchem-in-house-bank`, `netting-before-hedging`, `account-counts-scale`, `same-problem-four-answers`.
Linked, not duplicated, from other streams: `alpine-credit-line` (CHF 12m sizing — 30/50/20 milestones),
`hedge-bands-graded`, `fifteenth-rollover-repayment`, `net-debt-lender-view`, `covenant-excludes-leases`,
`lea-never-releases`, `four-eyes-threshold`, `china-cash-excluded`, `systems-11-of-12-statements`, `fer-vs-ifrs-pack`,
`revolver-swap-awkward`.

**Derivations that failed and were fixed:** (a) the 119/85/1.4x trio — rebuilt on 78/106/1.36 with the cash line
re-derived (54 freely/group cash incl. the CNY ≈ 55m shown separately); (b) Alpine week-9 headroom "5.5m" was
underivable without an operating minimum — set CHF 5.5m so 12 − 6.5 + max(5.0 − 5.5, 0) = 5.5 checks; (c) Kleio's
"MMF not yet used" contradicted the canonical USD government MMF — rewritten; (d) "cash ÷ last month's burn = 12 in
February" only works if "last month" means the month just completed — reworded; (e) net EUR long EUR 24m failed the
CHF→EUR conversion — now 25–27m.

## Unresolved / not mine
- `content/sources/*` is not mine to edit (assignment + parent instruction) — the AFP 2026 registry note and the
  "(search snippet)" upgrades are itemised in `docs/notes/companies-size-requests.md` along with violations found in
  map/debt.mdx (RCF "2027", EBITDA 85m), compare/map.yaml (IFRS 9 at Helvetic), €STR 1.9–2.0% in three files,
  org/handoffs.mdx ("fortnightly"), org role pages (flat 60–90% band) and why/wf-risk.yaml's China CHF 7.9m vs 6.1m.
