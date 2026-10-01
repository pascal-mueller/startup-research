# Authoring guide — Treasury Field Manual

Read this fully before writing. Then read these gold-standard examples:
- `content/workflows/daily-cash-positioning.yaml` and `content/workflows/cash-forecasting.yaml` (workflow format)
- `content/pages/start/index.mdx`, `content/pages/start/neighbours.mdx`, `content/pages/start/growth.mdx` (narrative pages)
- `content/glossary/core.yaml` (glossary), `content/sources/core.yaml` (sources), `content/companies.yaml` (canonical company facts), `content/compare/core.yaml`

## Reader and quality bar
The reader is a **technical startup founder** who knows almost nothing about treasury and wants to interview
treasurers, treasury managers, CFOs and finance teams about their real work. Optimise for practical understanding.

- Always answer: **"Okay, but what does the person ACTUALLY do?"** Replace "treasury analyses liquidity" with
  "Lea opens X, pulls Y, compares Z, notices A, emails B, updates C, then Daniel decides D."
- Concrete numbers and realistic business examples (use the reference companies). Show how things differ by company size.
- Distinguish **established concepts**, **survey findings** (cite), **field notes** (practitioner patterns), and
  **synthesis** (your reasoning). Use the Callout types for this.
- **Never fabricate statistics, quotes, product features or customer claims.** Every statistic needs a citation to a
  source you actually opened (WebFetch) or found in a search result snippet from the original publisher. If you
  can't verify it, don't state it — or say explicitly it is unverified.
- Prefer 2025–2026 sources: AFP, ACT, EACT, PwC/Deloitte/EY/KPMG treasury surveys, bank research, regulators
  (SNB, ECB, BIS, FINMA, SIX, Swift), vendor documentation (for what a product does — not for market claims),
  annual reports, practitioner publications (Treasury Today, The Global Treasurer, TMI, Strategic Treasurer, AFP articles).
  Do not infer a whole profession from one vendor blog.
- Use the terminology practitioners use, and point out common beginner confusions (`<Callout type="confusion">`).
- Dense, professional, reference-manual tone. No motivational copy, no emojis, no "In today's fast-paced world".
  No quizzes. Tables where they help.
- Swiss/European framing by default (the reference companies are Swiss), but note US differences where material.
- Use **ranges** rather than fake precise universal numbers.
- The educational sections must stay **neutral about AI/startups**. Only the Agentic Treasury and Competitor sections
  take the startup lens. Workflow YAML may have a short, skeptical, neutral `ai_note`.

## Research
Use WebSearch (mode "standard"; "extended" only for hard/niche/recent facts) and WebFetch. Record every source you
cite in **your own** sources file `content/sources/<your-stream>.yaml` (schema below). Before adding a source, grep
`content/sources/` — reuse existing ids when the same source is already registered.

## Files and ownership
You own ONLY the files listed in your assignment. Never edit other files (except appending new glossary terms/sources
in your own files). If you need a change elsewhere, write it in your notes file `docs/notes/<your-stream>.md`
under "Requests for other authors".

```
content/pages/<section>/<slug>.mdx   narrative pages; route = /<section>/<slug>; index.mdx = /<section>
content/workflows/<id>.yaml          one workflow per file (schema = see gold standard)
content/glossary/<stream>.yaml       your glossary terms
content/sources/<stream>.yaml        your sources
content/compare/<stream>.yaml        your "same problem, four companies" topics
content/data/<name>.yaml             structured data (roles, raci, orgs, interview-topics, systems, competitors, lens)
```

### MDX frontmatter
```yaml
---
title: Full page title
nav: Short sidebar label        # optional
order: 3                         # sidebar order within section
summary: One or two sentences shown as the lede.
related: [/start, /map/fx]       # optional list of page paths
cluster: liquidity               # only for /map pages: liquidity | markets | infra
subtopics: [bank balances, ...]  # only for /map pages
---
```
Do NOT repeat the title as an `# H1` in the body. Use `##` and `###` headings (they populate the right-hand TOC).

### Link syntax (works in MDX and in Markdown strings inside YAML)
- `[value date](term:value-date)` → glossary term with hover tooltip
- `text[](cite:source-id)` → citation superscript. **No space before `[]`.** Multiple: `[](cite:a,b)`
- `[Cash forecasting](wf:cash-forecasting)` or `[](wf:cash-forecasting)` → workflow link
- `[Helvetic](co:helvetic)` → company page
- `[text](/org/roles)` → internal page; `[text](https://…)` → external

### MDX components (no import needed)
- `<Callout type="concept|survey|field|synthesis|warning|interview|confusion|actually" title="optional">…markdown…</Callout>`
  Leave blank lines inside the component around markdown content.
- `<Flow steps={["Label|sub text", "Label 2"]} direction="row|col" loop="optional" caption="optional" />`
- `<Example title="…" company="helvetic" open>…markdown…</Example>` (expandable worked example)
- `<CompanyCompare topic="topic-id" />` (topic defined in `content/compare/*.yaml`)
- `<CompanyCards />`, `<CompanyFacts id="alpine" />`
- `<Workflows ids={["cash-forecasting", "fx-hedging"]} />` (cards), `<WorkflowIndex />`
- `<SizeTabs startup="md…" sme="md…" midmarket="md…" multinational="md…" />`
- `<T id="term-id">text</T>` (same as term link)
- Org components: `<OrgChart id="…" />`, `<RaciMatrixView />`, `<InterviewFinder />`, `<RoleKnows id="…" />`,
  `<RoleExists id="…" />`, `<RoleCalendar id="…" index={0} />`, `<RoleIndex family="treasury" />`, `<RoleLink id="…" />`,
  `<Handoffs workflow="…" />`, `<AllHandoffs />`
- Use GitHub-flavoured markdown tables freely.
- Beware MDX syntax: `{`, `}`, `<` in prose must be escaped (`\{`, `&lt;`) or avoided. Write "less than" or "&lt;".

## Schemas

### Glossary term (`content/glossary/<stream>.yaml`, a list)
```yaml
- id: kebab-id                 # must be unique across ALL glossary files — grep first!
  term: Display name
  aka: [synonyms]
  category: Cash & liquidity | Forecasting | Payments | Banking & connectivity | FX | Debt & funding | Investments | Working capital | Risk & control | Systems | Organisation | Accounting & tax
  plain: One or two plain-English sentences.
  professional: How a practitioner would define it, precisely.
  example: A concrete numeric example, ideally with a reference company.
  related: [other-term-ids]     # must exist
  confusedWith: optional "**X** — why it's different"
```

### Why note (`content/why/<stream>.yaml`, a list) — "why" hoverables
Explains the reasoning behind a **number or decision** inline, without breaking the prose. Use when the derivation has
more than one step or a driver worth teaching (sizing, thresholds, decision rules, judgment calls in worked examples).
If the derivation does not hold, the example is wrong — fix the example.
```yaml
- id: kebab-id                 # must be unique across ALL why files — grep first!
  claim: "CHF 12m committed line"    # the thing being justified, short
  short: One or two sentences shown in the hover tooltip (answer "why this number?").
  detail: |
    Markdown: the full derivation with arithmetic, links to terms/sources/workflows as usual.
  check: Optional — what would make this wrong (a falsifiability line).
  terms: [other-term-ids]      # optional
  sources: [source-ids]        # optional
```
Link it inline: `[CHF 12m](why:alpine-credit-line)` or `<Why id="alpine-credit-line">CHF 12m</Why>`.
Style: `claim` names the artefact; `short` gives the one-breath answer; `detail` shows the arithmetic; `check` states
the falsifier. Numbers in a derivation must be re-derivable from `content/companies.yaml` and the canonical facts.

### Source (`content/sources/<stream>.yaml`, a list)
```yaml
- id: kebab-id
  title: Exact title
  publisher: Organisation
  year: 2025
  url: https://…
  type: survey | official | standard | vendor | practitioner | news | filing | academic
  note: What exactly this source supports (key numbers, sample size, sponsor if vendor-sponsored).
```

### Workflow (`content/workflows/<id>.yaml`)
Follow the gold standard exactly. Required: id, title, question, group, order, summary, objective, trigger, frequency,
people[{role,does}], systems[{name,use}], data[{name,source,notes}], steps[{title,who,where,when?,detail,judgment?,manual?}],
judgment[{decision,why}], failure_modes[{mode,consequence,detection}], software, manual_work[], by_size{startup,sme,midmarket,multinational},
companies{kleio,alpine,helvetic,globalchem}, example{title,body}, handoffs[{from,gives,to,note?}], interview, ai_note,
terms[], related[], sources[], evidence_note.
`group` must be one of: `Cash & liquidity`, `Payments & banking`, `FX & risk`, `Debt & funding`, `Controls & reporting`, `Events & crises`.
Aim for 8–12 steps with realistic who/where/when, and at least 2 judgment and 1 manual flags. The worked example
should contain real numbers (a table is good) and be consistent with `content/companies.yaml`.

### Compare topic (`content/compare/<stream>.yaml`, a list)
```yaml
- id: topic-id
  title: Short
  question: The question
  cells: { kleio: "md", alpine: "md", helvetic: "md", globalchem: "md" }
  takeaway: One sentence.
```

## Canonical cast (keep consistent everywhere)
Company facts: `content/companies.yaml` (don't contradict it).
- **Kleio Software AG** (`kleio`, startup tier, ~70 people SaaS): **Sarah** (CFO, does treasury herself), **Nina** (accountant), external fiduciary/payroll.
- **Alpine Robotics AG** (`alpine`, SME, CHF 80m): **Martin** (CFO), **Petra** (Head of Accounting; runs cash, payments, bank recs), subsidiary managing directors in DE/US with a local bookkeeper each.
- **Helvetic Machines Group** (`helvetic`, mid-market, CHF 650m): **Thomas** (CFO), **Daniel** (Treasury Manager), **Lea** (Treasury Analyst), **Claudia** (Head of Group Accounting), **Marco** (Head of FP&A), subsidiary finance managers (e.g. **Giulia**, HM Italia; **Jens**, HM Deutschland; **Wei**, HM Suzhou).
- **GlobalChem AG** (`globalchem`, multinational, CHF 7bn): **Markus** (CFO), **Anna** (Group Treasurer), **Priya** (Head of Cash & Liquidity / in-house bank), **Jonas** (Head of Financial Risk: FX & rates), **Olivier** (Head of Corporate Finance: debt, ratings), **Marta** (Head of Treasury Operations, back office + payment factory, based in the Kraków shared-service centre), **Ben** (Treasury Systems lead), Singapore regional treasury centre.
- Approximate market levels to use (autumn 2026, illustrative): EUR/CHF ≈ 0.93–0.94, USD/CHF ≈ 0.79–0.81, SNB policy rate 0%, SARON ≈ 0%, €STR ≈ 2.2–2.4%, SOFR ≈ 3.5–4%. Say "illustrative" when precision matters.

## Canonical workflow ids (link to these even if not yet written)
Cash & liquidity: `daily-cash-positioning`, `cash-forecasting`, `liquidity-planning`, `surplus-cash-investment`, `funding-subsidiary`
Payments & banking: `payment-processing`, `large-payment-approval`, `bank-reconciliation`, `bank-account-management` (opening/closing accounts), `bank-fee-analysis`
FX & risk: `fx-exposure-management`, `fx-hedging`
Debt & funding: `credit-facility-management`, `covenant-monitoring`
Controls & reporting: `month-end-reporting`, `fraud-investigation`, `policy-compliance`
Events & crises: `acquisition-integration`, `currency-shock`, `liquidity-crisis`

## Canonical role ids (`content/data/roles.yaml`)
Leadership: `ceo`, `cfo`, `board`
Treasury: `head-of-treasury` (Group Treasurer / Head of Treasury / Corporate Treasurer), `treasury-manager`, `treasury-analyst`,
`cash-manager`, `fx-risk-manager`, `treasury-operations` (back office), `bank-relationship-manager`, `corporate-finance` (debt / capital markets),
`treasury-systems`, `payments-lead` (payment factory / payments operations lead)
Finance: `head-of-accounting` (chief accountant / financial controller), `controlling` (DACH controlling / management accounting),
`fpa`, `accounts-payable`, `accounts-receivable` (incl. credit control), `tax`, `procurement`, `legal`, `internal-audit`
Business / external: `subsidiary-finance` (local finance manager / subsidiary CFO), `business-unit`, `external-fiduciary`, `bank-rm` (the bank's relationship manager)

## Planned page paths (link freely; they will exist)
- /start, /start/neighbours, /start/growth
- /map, /map/cash-management, /map/cash-forecasting, /map/payments, /map/fx, /map/debt, /map/investments, /map/working-capital, /map/risk, /map/banking, /map/technology
- /org, /org/structures, /org/neighbours, /org/with-accounting, /org/with-fpa, /org/with-ap, /org/with-ar, /org/with-tax, /org/with-procurement, /org/with-subsidiaries,
  /org/responsibility-matrix, /org/handoffs, /org/roles, /org/roles-cfo, /org/roles-head-of-treasury, /org/roles-treasury-manager, /org/roles-analyst,
  /org/roles-cash-manager, /org/roles-fx-risk, /org/roles-operations, /org/roles-bank-relationship, /org/roles-debt, /org/roles-payments,
  /org/who-knows-what, /org/interview-finder, /org/calendars
- /workflows, /workflows/<id>
- /day, /day/sarah, /day/petra, /day/daniel, /day/anna
- /companies, /companies/kleio, /companies/alpine, /companies/helvetic, /companies/globalchem, /companies/same-problem
- /size, /size/startup, /size/sme, /size/midmarket, /size/multinational
- /systems, /systems/architecture, /systems/erp, /systems/bank-connectivity, /systems/tms, /systems/market-data, /systems/spreadsheets, /systems/vendors, /systems/data-quality
- /glossary, /glossary/<term-id>
- /interview, /interview/by-role, /interview/questions, /interview/bad-questions, /interview/vocabulary, /interview/before-and-after
- /lens, /lens/method, /lens/matrix (anchors = workflow ids), /lens/candidates
- /competitors, /competitors/method, /competitors/landscape, plus category pages if useful
- /reference/how-to-use, /reference/sources, /reference/open-questions

## Verification (do this before reporting back)
1. `npm run check` — must show 0 errors from your files (warnings about not-yet-written workflows/pages are OK).
2. `npx tsc --noEmit` if you touched `src/`.
3. A dev server runs at http://localhost:5173. Screenshot your pages:
   `node scripts/shot.mjs <scratch-dir> "/your/route,/other/route" [--dark] [--width=390] [--full]`
   It prints MISSING refs and runtime errors. Look at at least one screenshot (Read the PNG) to confirm rendering.
4. Write `docs/notes/<your-stream>.md`: files created, key sources, unresolved uncertainties, requests for other authors.

## Parallel-work rules (session 2)
- Many authors work at the same time. **Never run git commands that change state** (no commit, checkout, stash, reset).
- Do not edit `src/styles.css`, `src/lib/*`, or another stream's files. If your component needs CSS, create
  `src/styles/<stream>.css` and import it from your own component file. Define component-specific TypeScript types
  inside your component file.
- If `npm run check` reports a duplicate glossary/source id that another stream added at the same time, remove or
  rename **yours** and link to theirs.
- Day-in-the-Life pages: /day/sarah (CFO, Kleio), /day/petra (Head of Accounting, Alpine), /day/daniel (Treasury
  Manager, Helvetic), /day/lea (Treasury Analyst, Helvetic), /day/anna (Group Treasurer, GlobalChem),
  /day/priya (Head of Cash & Liquidity / cash manager, GlobalChem).
- Screenshots: `node scripts/shot.mjs <your scratch dir> "/route"` (Chromium is at /opt/pw-browsers/chromium).

## Canonical facts v2 — resolved after review wave 1 (apply everywhere; overrides v1 where they differ)
Cross-file contradictions are resolved HERE. If a worked example cannot be made consistent with these facts, the
example is wrong — change the example. If you believe a fact here is wrong, do not silently deviate: write it in
`docs/notes/<stream>-requests.md`.

**Helvetic finances (LTM 30 Sep 2026):** EBITDA ≈ CHF 78m; net debt ≈ CHF 106m; net debt/EBITDA ≈ 1.36x.
No other leverage/net-debt figure may appear without an explicit bridge. "Including leases under IFRS" is NOT a valid
bridge: Helvetic reports under Swiss GAAP FER (leases off balance sheet). GlobalChem reports under IFRS 9/16.
**RCF:** CHF 200m syndicated, 4 banks at 60/50/50/40, matures **Oct 2028**, margin **0.85%** over SARON/EURIBOR,
interest periods roll on the **15th**. Drawn: **CHF 35m + EUR 27m until the 15 Oct 2026 rollover; from the November
2026 scenarios onward CHF 30m + EUR 35m** (≈ CHF 63m drawn, ≈ CHF 137m undrawn). CHF 100m bond due 2028. Never
"RCF runs to 2027", never "CHF 140m undrawn" after the rollover, never "the RCF and bond are all CHF" (EUR 27m→35m
drawing exists).
**13-week forecast (gold = cash-forecasting.yaml):** low point **week 4, ≈ CHF 18m**, driven by December payrolls
including 13th salary (the annual bond coupon is a separate, later event — never "week 6"). December is a quiet
receipts month; Q4 collections land Jan–Feb; Q4-2026 closes ≈ CHF 25m, never CHF 59m. Restate the low point only if
it matches cash-forecasting.yaml exactly.
**Cadence (never "fortnightly"):** 13-week forecast updated **weekly** — subsidiaries submit by Tuesday noon, Lea
consolidates Tue–Wed, Daniel reviews Wednesday.
**Hedge bands, rolling calendar quarters** (as of Nov 2026: Q+1 = Q4 2026 … Q4 = Q3 2027): Q+1 60–90%, Q+2 40–70%,
Q+3 25–55%, Q+4 0–40%. "The 60–90% band" refers to Q+1 only. Q1 2027 = Q+2 = 40–70%.
**FX exposure cycle:** subsidiaries submit exposures by **WD5** (collection window WD2–WD6), Lea consolidates, Daniel
reviews the report **WD7**; hedge adjustments run after the review. (lens dw pages: same timeline, Lea collects — no
"back office confirmations" at Helvetic.)
**Signing (ground truth = large-payment-approval.yaml):** payments ≤ CHF 2m — four-eyes in treasury (Lea prepares,
Daniel releases). **> CHF 2m — Thomas (CFO) and the CEO co-sign** in addition. Lea prepares and analyses; she is not
a payment signatory and never approves/releases.
**Covenant computation:** Group Accounting (Claudia) computes LTM covenant ratios; Lea supplies the net-debt
schedule; Daniel reviews and presents to banks; FP&A (Marco) supplies **forecast** EBITDA only, never LTM actuals.
**Helvetic buffers (name which one you mean):** account operating minimum CHF 2.0m (HM AG CHF account); parent buffer
CHF 10m; group minimum liquidity CHF 10m (CFO's rule).
**Helvetic banks: 5 relationships** — 2 Swiss, 1 German, 1 global (USD), 1 Chinese. **No Italian or French bank.**
The Chinese account has no EBICS/SWIFT corporate reporting: Wei emails a portal export daily → **11 of 12** statements
arrive through the connectivity tool. Asian prior-day statements arrive early; US last; a missing Chinese statement is
a connectivity problem, never a time-zone one.
**Alpine:** 2 main banking relationships (cantonal house bank: line/mortgage/guarantees; large Swiss bank: FX +
guarantees) plus 1 local US operating account (minor third). Projects ≈ CHF 0.5–4m each: a 20% acceptance is
≈ CHF 0.7–0.8m, never CHF 2.0m. CHF 12m committed operating line, usually CHF 0–5m drawn; sizing rationale = stacked
project gaps + cash floor + guarantee headroom + slip buffer (make this explicit wherever the CHF 12m appears).
German payroll at Helvetic is **monthly** EUR 4.2m, never weekly.
**VAT/tax calendar:** Swiss Q3 VAT ≈ CHF 0.8m on **30 Nov**; German Q3 VAT prepayment **10 Oct**; German trade-tax
prepayments 15 Feb/May/Aug/Nov. **No Q3 VAT outflow in September.**
**0%-CHF rule:** surplus CHF reduces RCF drawings at the next 15th rollover or stays on the current account; CHF
deposits/MMFs yield ≈ 0% (diversification only). EUR/USD surplus can use €STR/SOFR-level products. Never a CHF
term deposit "for yield" while the RCF is drawn.
**Payments standards (current as of 30 Sep 2026):** camt.053 = end-of-day statement (MT940 successor, **per
account/currency**); camt.052 = intraday; camt.054 = debit/credit notification (MT910/900 successor). MT940/942/MT101
corporate reporting is unaffected by the Nov 2025 CBPR+ milestone; in interbank scope they are **deprecated, not
withdrawn**, with coexistence end communicated as Nov 2028 (label "per bank communications"). Swift's 27 Aug 2026
SR2026 deferral concerns the CBPR+ structured-address requirement (new date due by Dec 2026); Swiss/SEPA Nov 2026
dates unchanged. SIX 2009 formats discontinued **14 Nov 2026** ("November 2026" is fine; bank letters vary). LSV+
sunsets end-2028. EPC VoP brings **no liability shift**. Swiss direct debits (LSV+/BDD), SDD and eBill belong in the
Swiss payments picture.
**Verified statistics policy:** AFP 2026 "46% of teams <5 FTE" is **VERIFIED** (org review r1, AFP publisher) — allowed
with `afp-bench-2026`. The Deloitte "spreadsheet-based forecasting" phrase is **withdrawn — never quote it**; use
Deloitte's "≈22% rate forecasting maturity above average" or ST/TIS 39%→53% labelled "(vendor-sponsored survey)".
Burckhardt: 7.9% is the Compressor Systems **segment** (group −0.6%), cause = customers postponing large projects.
Swissmem: 51% (Mar 2025) / 69% (Jun 2025) cut prices; 18% relocated. China–Switzerland DTA: **5%** dividend WHT for a
directly-held ≥25% subsidiary (the Helvetic pattern). Hidden profit distribution: below-market loan to a
**subsidiary** risks imputed income at the Swiss lender; the 35% WHT constructive-dividend consequence is for benefits
to **shareholders**.

### Canonical facts v2.1 — addendum (after day + exemplar-r2 reviews)
- **The shared scenario Tuesday is Tue 17 Nov 2026** (the `/start` + `daily-cash-positioning` day). Any page claiming
  "the same Tuesday" must match those facts exactly: Helvetic gap CHF 2.6m with 3 causes (incl. the German direct
  debit nobody forecast), EUR 1.5m top-up to HM Deutschland under the standing IC framework. The 13-week forecasting
  week starts **Mon 23 Nov**. Pages telling their own story on another date must not claim "the same Tuesday".
- **€STR ≈ 2.2–2.4%** (ECB: ~2.2% Q3-2026 average, 2.44% on 28 Sep 2026) — replaces every "1.9–2.0%". EUR/CHF 12m
  forwards at spot 0.935 price at ≈ 0.913–0.915 (not 0.917). SOFR ≈ 3.5–4% unchanged.
- RCF drawings are tranches with interest periods rolling on the **15th** — there is no "one-month tranche maturing
  on a Friday"; never invent tranche maturity dates.
- **Kleio cash policy:** CHF in short term deposits at two banks (diversification, ≈0% yield) + USD in a **USD
  government MMF**. No CHF money-market fund.
- The parent's legal name is **Helvetic Machines AG** (never "Helvetic AG").
- Unconfirmed exact figures (AFP 2026 "49%", Deloitte "22%", ST/TIS "68%"): either phrase qualitatively ("about a
  fifth", "around half", "roughly two-thirds, vendor-sponsored") or keep the figure with "as reported by X (figure not
  confirmed against the primary text)".
- A 3-year PLN loan hedged back to CHF is hedged with a **cross-currency swap** — never a plain "FX swap".
- GlobalChem ERP estate must match `companies.yaml` ("SAP S/4HANA with SAP treasury modules"); a payment-factory
  example needing legacy ERPs says "local ERPs inherited from acquisitions" — **do not edit companies.yaml**; request
  changes in `docs/notes/<stream>-requests.md`.
- Account lists must enumerate the full canonical list (Helvetic: 12 accounts). Example balances: CNY ≈ 55m where not
  otherwise specified. Numbers inside one example must be internally re-derivable (e.g. "CHF 200k = two months of US
  payroll" is wrong by ~2×; "spare" figures must tie to the example's own balance math).

### Canonical facts v2.2 — the November 2026 EUR hedge state (settles the last cross-file conflict)
One canonical exposure report for November 2026 (rolling calendar quarters, EUR m; Q+1 = Q4 2026 … Q+4 = Q3 2027):

| | Q+1 (Q4 2026) | Q+2 (Q1 2027) | Q+3 (Q2 2027) | Q+4 (Q3 2027) |
|---|---|---|---|---|
| Net EUR long | 34 | 40 | 29 | 30 |
| Hedged (forwards) | 25 | 30 | ~12 | ~8 |
| Ratio | 74% | **75%** | 41% | 26% |
| Band | 60–90% | **40–70%** | 25–55% | 0–40% |
| Target | 75% | 55% | 40% | 25% |

Continuity: October (fx-hedging.yaml) ends Q1 at 32/19/59%; the slipped German acceptances and November top-ups move it
to 40/30 — the bridge (32→40, 19→30) is stated in fx-exposure-management/fx-hedging.
**Q1 2027 at 75% is ABOVE its 40–70% band — a passive over-hedge, never "inside the 60–90% band".** The 60–90% band
applies to the front quarter only (Q4 2026 at 74% is the in-band, on-target one). Resolution action: Daniel rolls
≈EUR 3m of Q1 forwards out to Q2 (→ Q1 27/40 = 68%, Q2 15/29 ≈ 51% — both in band), corrected within the month per
policy, reported as passive. "No new hedges this week" stays true: no new *buying*; the rebalance is a roll.
Mechanical replacements everywhere: "0.917" forward ≈ **0.913–0.915**; "CHF 140m undrawn" ≈ **CHF 137m** (CHF 30m +
EUR 35m drawn post-rollover); leverage 1.6x/1.7x/1.8x/2.4x → **≈1.36x** LTM (bridge if showing a forecast state);
low point "week 6" → **week 4** (December payrolls incl. 13th salary); €STR 1.9–2.0% → **2.2–2.4%**.
- **Group-cash trajectory (all Helvetic examples):** day pages put group cash at ≈CHF 45.6/44.2m on Mon 26/Tue 27 Oct;
  `/start` opens at CHF 41m on Tue 17 Nov; the forecasting week (Mon 23 Nov) must open **re-derived** from the 17 Nov
  opening plus that week's own flows (the 17→23 Nov week is the ~CHF 5–6m continuity error flagged in exemplars-r2 —
  one trajectory, re-derivable across the seam, no third version).
- **Four-eyes wording:** "Lea prepares, Daniel releases" describes *treasury-owned* work. For bank supplier runs the
  preparer may be AP (e.g. SAP F110 at Helvetic); the releaser is always treasury. The preparer role varies by work
  type; the release never does.

## Canonical facts clarified after exemplar review (v1 — still valid where v2 does not override)
- **Helvetic has NO cash pool.** Daniel concentrates cash manually by intercompany loan (a pool is at most "under evaluation").
- At Helvetic, **Lea (analyst) prepares** the daily position and forecast; **Daniel decides**.
- **Time zones:** for a Swiss company, Asian banks' prior-day statements arrive *early* (they are ahead of CET); US statements arrive last. A missing Chinese statement is a connectivity/bank problem, not a time-zone one.
- **CHF rates ≈ 0%:** a company with a drawn RCF uses surplus CHF to repay/reduce drawings at the next rollover rather than placing CHF deposits; CHF deposits earn ~nothing. EUR/USD surplus can earn €STR/SOFR-level rates.
- Keep amounts consistent with companies.yaml (bank-account counts, debt, covenant ratios, payroll scale).
- **Web access:** WebFetch is blocked for most domains by the environment's egress policy; WebSearch works. Verify from search results that come from the original publisher; otherwise don't state the number.
- **Helvetic financials (canonical, 30 Sep 2026 LTM):** EBITDA ≈ CHF 78m; net debt ≈ CHF 106m; net debt/EBITDA ≈ 1.36x;
  RCF drawn CHF 35m + EUR 27m, interest periods roll on the 15th, RCF matures Oct 2028 (4 banks, 60/50/50/40); CHF 100m bond 2028.
  Reports under **Swiss GAAP FER** (GlobalChem under IFRS). EUR hedge bands graded by quarter: Q+1 60–90%, Q+2 40–70%,
  Q+3 25–55%, Q+4 0–40%. Thomas (CFO) co-signs payments above CHF 2m. The 13-week forecast is updated **weekly**: subsidiaries submit by Tuesday noon, Lea consolidates Tue–Wed, Daniel reviews Wednesday.
