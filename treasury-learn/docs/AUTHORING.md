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
- Approximate market levels to use (autumn 2026, illustrative): EUR/CHF ≈ 0.93–0.94, USD/CHF ≈ 0.79–0.81, SNB policy rate 0%, SARON ≈ 0%, €STR ≈ 1.9–2.0%, SOFR ≈ 3.5–4%. Say "illustrative" when precision matters.

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
