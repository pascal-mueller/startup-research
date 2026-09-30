# Product specification (source of truth, from the user)

## Goal
A polished local web app that teaches corporate treasury from zero to the point where a technical founder can
intelligently interview corporate treasurers, treasury managers, CFOs, finance teams and related roles about their
actual work. The founder is exploring treasury as a possible startup / vertical-AI market; NOT becoming certified.

Understand: (1) what treasury actually does; (2) how it differs between small company, SME, mid-market, multinational;
(3) main workflows; (4) which roles perform which work; (5) how roles interact; (6) systems, data, banks,
counterparties, internal departments; (7) terminology; (8) where humans need judgment vs deterministic rules;
(9) what work is manual, repetitive, risky, frustrating, difficult or poorly automated; (10) what software exists;
(11) where AI/agents might plausibly perform parts of the job; (12) which workflows could become vertical-AI businesses
where the AI increasingly performs the expert's job.

Optimise for PRACTICAL UNDERSTANDING, not academic completeness. Recurring question everywhere:
**"Okay, but what does this person ACTUALLY do?"** No abstract finance theory.

Product concept: an interactive **Treasury Field Manual** — Wikipedia + interactive textbook + workflow explorer +
treasury org map + glossary + realistic case studies + customer-discovery reference. Several days of reading.
Not a generic online course / corporate training portal / marketing site / gamified app. No motivational copy, giant
cards everywhere, fake gamification, streaks, meaningless quizzes, excessive whitespace, shallow summaries.
Dense, technical, professional, navigable, practical, pleasant to read.

## Sections
1. **Start Here** — what treasury is; why companies need it; treasury vs accounting / FP&A / controlling / corporate
   finance / CFO responsibilities; how treasury changes as a company grows; conceptual flow (operations → money
   enters/leaves → observe → forecast → decide → execute → monitor → reconcile); examples of 30-person startup,
   300-person international SME, 3,000-person multinational, 50,000-person multinational — WHO performs treasury work.
2. **Treasury Map** — clickable areas leading to explanations, workflows, roles, glossary, examples:
   Cash management (bank balances, cash positioning, liquidity, cash pooling, intercompany funding, trapped cash, bank
   accounts, cash concentration, sweeping); Cash forecasting (short-term, 13-week, medium-term, actual vs forecast,
   inputs, uncertainty, error analysis); Payments (initiation, approval, payment factories, fraud controls, rails,
   settlement, reconciliation); FX (exposure, transaction, translation, spot, hedging, forwards, swaps, options, natural
   hedging, hedge ratios); Debt & financing (loans, RCFs, bonds, covenants, refinancing, CP, interest-rate risk, capital
   markets); Investments (deposits, MMFs, government securities, counterparty limits, investment policy, liquidity vs
   yield vs safety); Working capital (AR, AP, inventory, DSO, DPO, CCC); Risk (liquidity, FX, rate, counterparty,
   fraud, operational); Bank relationship management (accounts, fees, facilities, relationship banks, KYC, mandates,
   signatories); Treasury technology (ERP, TMS, portals, APIs, SWIFT, EBICS, host-to-host, spreadsheets, payment
   systems, market data).
3. **Treasury Organization & Roles** (MAJOR). Understand who does which work, who reports to whom, who provides
   information, decides, executes, approves, reconciles; how that changes with size. The ORGANIZATIONAL SYSTEM, not
   isolated job titles.
   - 3.1 Big picture: where treasury sits; relationships between CEO, CFO, Corporate Finance, Treasury, Accounting,
     FP&A, Controlling, Tax, AP, AR, Procurement, Legal, Risk, business units, subsidiaries, shared service centres.
     Who treasury reports to, who supplies data, who treasury supplies information to, who executes, who approves,
     overlaps. Visual org diagrams. Show common variants — not every company is identical.
   - 3.2 Every major role: **CFO** (what they own; how much treasury they personally do by size; what escalates;
     relationship with Head of Treasury; when too far removed to be the best interviewee). **Group Treasurer / Head of
     Treasury / Corporate Treasurer** (strategic + operational responsibilities, team, policies, banking, liquidity,
     funding, risk, investments, board/CFO reporting, what is delegated; title differences). **Treasury Manager**
     (especially important: what they ACTUALLY do in a normal day/week — recurring workflows, operational vs strategic,
     what they execute, what analysts prepare, what they review, escalate, judge). **Treasury Analyst** (data
     gathering, reporting, cash positioning, forecasting, FX calcs, reconciliation, systems work, ad hoc analysis,
     preparing decisions — concrete examples). **Cash / Liquidity Manager** (daily positioning, liquidity monitoring,
     pooling, subsidiary funding, forecasting, short-term investments; overlap with Treasury Manager). **FX / Financial
     Risk Manager** (identify exposures, calculate hedge requirements, execute hedges, hedge effectiveness, policy
     compliance, reporting; interactions with subsidiaries, BUs, accounting, CFO, banks, Treasury Ops). **Treasury
     Operations / Back Office** (confirmations, settlements, reconciliation, payment ops, static data, bank accounts,
     documentation, controls; front/middle/back office). **Bank Relationship Manager** (if it exists; otherwise who
     owns it). **Debt / Capital Markets / Corporate Finance** (inside treasury vs corporate finance; borrowing,
     refinancing, facilities, bonds, rating agencies, banks, capital markets). **Payments roles** (treasury vs AP vs
     shared service centres vs payment factories vs finance ops: who decides, prepares, approves, executes, reconciles).
4. **Roles outside treasury**: Accounting (what it owns vs treasury, data flows, confusion, reconciliation), FP&A
   (FP&A forecast vs treasury cash forecast), AP (what AP knows, payment schedules, forecast influence, who executes),
   AR / credit control (invoices, expected dates, overdue, collection assumptions), Tax (intercompany transfers,
   pooling, repatriation, entity funding, dividends, legal structures), Procurement (planned purchases, supplier terms,
   major contracts), Business units / subsidiaries (what local finance provides, how forecasts are submitted, where
   information quality breaks, central vs decentralised).
5. **Responsibility matrix** — interactive; rows: daily cash positioning, cash forecasting, liquidity planning, FX
   exposure calculation, FX hedge execution, payment preparation, payment approval, payment execution, bank account
   opening, short-term investing, subsidiary funding, cash pooling, debt issuance, covenant monitoring, fraud response,
   treasury reporting, bank reconciliation, TMS administration, bank relationship management. Columns: roles. Codes:
   OWNER, PERFORMS, CONTRIBUTES DATA, APPROVES, REVIEWS, INFORMED, USUALLY NOT INVOLVED. Variants: small company,
   international SME, mid-market, large multinational.
6. **Workflow hand-offs** for all major workflows (e.g. BUs → sales/costs; AR → expected receipts; AP → scheduled
   payments; Payroll → payroll; Tax → tax payments; Analyst aggregates; Manager investigates anomalies and adjusts;
   Head of Treasury reviews liquidity implications; CFO only when material).
7. **Workflows** (MOST IMPORTANT). Each: objective, trigger, frequency, people, role ownership, systems, data,
   step-by-step actions, judgment decisions, approvals, failure modes, current software, where spreadsheets/manual work
   appear, what changes by size, what happens when something goes wrong, possible AI/agent involvement. At minimum:
   daily cash positioning; cash forecasting (13 weeks); liquidity planning; surplus cash investment; funding a
   subsidiary; FX exposure management ("USD revenues, CHF costs"); FX hedging ("should we hedge, how much, which
   instrument"); payment processing; large/unusual payment approval ("CHF 4m payment request"); bank reconciliation;
   opening/closing a bank account; managing credit facilities; debt covenant monitoring; month-end treasury reporting;
   bank fee analysis; fraud investigation; treasury policy compliance; acquisition integration; currency shock
   ("EUR/CHF moves 8%"); liquidity crisis ("expected receivables don't arrive").
8. **Day in the Life** — realistic fictional characters (CFO at a 70-person Swiss SaaS without treasury team; Treasury
   Manager at a CHF 400–650m manufacturer; Head of Treasury at a CHF 4–7bn multinational; Treasury Analyst at a
   mid-market company; Cash Manager at a multinational). Monday/Tuesday: morning checks, systems, meetings, Excel,
   exceptions, decisions, recurring tasks, unusual events, who they talk to, what keeps them awake. For every activity:
   WHY, input, system, decision, who they interact with, what happens next. No corporate fluff; no universal day.
9. **Company Scenarios** — reused fictional companies (see content/companies.yaml); show the SAME workflow changing by
   complexity: cash forecasting, FX, payment approval, liquidity planning, bank account management, investments.
10. **Treasury by Company Size** — very small (founder/CFO manual), SME (finance team among many duties),
    international mid-market (treasury manager or small team), large multinational (full department). Each: team
    structure, systems, banks/accounts, currencies, complexity, workflows, biggest problems, centralisation, who owns
    which tasks. Ranges, not universal numbers.
11. **Glossary** — searchable; each term: plain-English, professional definition, simple example, related, where it
    appears in workflows.
12. **Systems & Data** — how the stack fits (ERP → invoices/AP/AR/GL; banks → balances/transactions/payments; TMS →
    workflows; market data → FX/rates; BUs → forecasts; treasury combines). Explain categories and products (SAP,
    Oracle, Microsoft Dynamics, Kyriba, FIS, GTreasury, Trovata, Agicap, Atlar, Embat): category, why used, data flows,
    users, what it does NOT solve. No marketing copy.
13. **Interview Preparation** (extremely important) — for CFO, Treasurer, Head of Treasury, Treasury Manager, Treasury
    Analyst, Cash Manager, Liquidity Manager, FX/Risk Manager, Treasury Operations, subsidiary finance leader: what they
    own, workflows they touch, questions they can answer, what they cannot, terminology to know first.
14. **"Who should I interview?" mode** — select a workflow (cash forecasting, payments, FX, liquidity, investments,
    bank connectivity, treasury systems, debt, fraud, cash pooling, bank accounts, intercompany funding) → best people
    (with why), less useful initially (with why).
15. **"What does this person know?"** per role: best source for / may know something about / probably will NOT know
    the operational details of.
16. **Customer-discovery questions** based on actual behaviour ("Walk me through what you did this morning", "Walk me
    through the last cash forecast you produced", "What triggered that work?", "Where did each input come from?",
    "Which systems did you open?", "What did you export into Excel?", "What required judgment?", "What happened the
    last time the forecast was badly wrong?", "What happens after you identify excess cash?", "What makes you escalate
    to your manager?", "What gets escalated to the Head of Treasury?", "What happens when something goes wrong?",
    "What have you built internally?", "What would you never trust software to do automatically?", "What would you
    happily delegate if you trusted the system?", "What changed in your job in the last 2–3 years?"). Also BAD
    questions and why ("Would you use AI for X?", "Would you pay for X?", "Is this a good startup?").
17. **Agentic Treasury / Startup Lens** — clearly separated. Framing: "Which assignments performed by treasury
    professionals could an AI system increasingly perform itself?" Per workflow evaluate: task frequency, economic
    value, expert judgment, data availability, data quality, ability to evaluate correctness, consequences of being
    wrong, regulatory burden, trust burden, current automation level, current human involvement, agent suitability,
    ability to start narrow, ability to expand into more of the person's job, expert feedback learning loop,
    defensibility of proprietary workflow/context/data. Classify GOOD AGENT CANDIDATE / POSSIBLE / HARD-DANGEROUS with
    WHY. Be skeptical; not everything is an AI opportunity.
18. **Digital Worker View** — for promising workflows: human assignment ("Prepare today's liquidity recommendation"),
    inputs, human reasoning, tools, output, verification (how an expert judges it), execution (who acts), feedback loop
    (how corrections/outcomes become training/eval data).
19. **Competitor Landscape** (secondary) — by category: traditional TMS, modern TMS, cash forecasting, bank
    connectivity, payments, FX/hedging, working capital, treasury intelligence/AI, treasury agents if they exist. Each:
    what they sell, target customer, core workflow, positioning, notable strengths, apparent gaps, system of record vs
    workflow tool vs analytics vs execution system. Do not invent gaps or make unsupported claims.

## Research requirements
Current information (prefer 2025–2026 where currentness matters). Credible sources: AFP, ACT, EACT, PwC Global
Treasury Survey, Deloitte, EY, KPMG, major bank treasury research, annual reports, real treasury job descriptions,
training material, practitioner articles, conference material, software documentation, banking/regulatory docs.
Cite and link. Distinguish established concepts, survey findings, practitioner observations, vendor claims, own
synthesis. Never fabricate statistics. Never present one company's process as universal. Don't infer the profession
from one vendor blog.

## Realism requirement
Bad: "Treasury analyzes liquidity and optimizes cash." Good: "At 08:15 the Treasury Analyst downloads prior-day bank
balances, compares them against expected transactions, notices the German entity is CHF 600k below forecast, checks
whether an expected receivable was delayed, contacts local finance, updates the forecast, and escalates the resulting
liquidity shortfall to the Treasury Manager." That is the required level of concreteness.

## Review principles
Every substantial module: primary author → independent reviewer (fresh context; experienced treasurer + educator +
skeptical fact checker + technical founder) scores accuracy, workflow realism, pedagogy, concreteness, source quality
(1–10), lists critical errors, missing concepts, unrealistic descriptions, vague passages, unsupported claims, weak
examples → author investigates (research facts, don't resolve by vibes) → revise → re-review. Stop when all ≥ 8 with no
critical issues, or after 4 rounds (then record uncertainty explicitly). Roles/org modules use TREASURY_ORG_REVIEWER
(role accuracy, org realism, workflow ownership accuracy, company-size nuance, customer-discovery usefulness). Cross-
module review after each major section. Final adversarial review: "the user interviews professional treasurers
tomorrow — find everything that could make them misunderstand the profession, misuse terms, ask naive questions, contact
the wrong role, confuse treasury with accounting/FP&A, assume multinational structures apply to SMEs, miss hand-offs,
mistake vendor marketing for reality, think a workflow is automated when humans still judge."

Do not over-optimise for startup ideas. If something is already well automated, say so. If humans are required for
trust/regulation, say so. If it's a bad startup opportunity, say so. Neutral understanding first; startup lens separate.

## Success criteria
After using the app, the user can sit with a Treasury Analyst, Treasury Manager, Head of Treasury or CFO and
understand what they likely do and do NOT do, who they interact with, recurring assignments, where data comes from,
systems used, decisions requiring judgment, what gets escalated, how ownership changes by size. Hearing "We perform a
weekly 13-week liquidity forecast" they understand who produces it, which data feeds it, where it breaks, who reviews it,
what decisions it drives, what software might be involved, and where human judgment remains.
