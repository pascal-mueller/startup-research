# Notes — stream wf-control

## Files created
- content/workflows/month-end-reporting.yaml — WD1–WD5 timeline; treasury's accounting pack (balances, deal register reconciliation, valuations, accruals, intercompany statements) vs treasury's own CFO/board report; covenant estimate with lender definitions; Helvetic September close with net debt / headroom / leverage / hedge ratio / counterparty / forecast-accuracy table.
- content/workflows/fraud-investigation.yaml — first-hour actions (classify, stop, bank fraud desk, recall + freeze), incident team, evidence, scoping, police, insurer, supplier/accounting, root cause, group-wide remediation; HM Italia vendor bank-detail fraud (EUR 486,300) timeline.
- content/workflows/policy-compliance.yaml — policy contents, approval chain (CFO → audit committee → board; Art. 716a CO), translation into system limits and mandates, pre-deal checks, exposure and hedge-ratio monitoring, signatory reviews, active/passive breach handling, audit; Helvetic Q3 compliance table.
- content/glossary/wf-control.yaml — 14 terms (month-end-close, treasury-report, debt-maturity-profile, interest-accrual, closing-rate, counterparty-exposure, limit-breach, internal-control-system, three-lines-model, vendor-bank-detail-fraud, deepfake-fraud, payment-recall, money-mule, crime-insurance).
  Removed my duplicates of forecast-accuracy (map), delegation-of-authority (org-structure), compliance-certificate and covenant-headroom (wf-risk) and link to theirs.
- content/sources/wf-control.yaml — 4 sources (CNN Arup 2024, FBI IC3 2023 RAT figures, Swift gpi Stop and Recall, Swiss CO Art. 716a/725/728a).
- content/compare/wf-control.yaml — 3 topics: month-end-treasury-report, payment-fraud-response, treasury-policy-in-practice.

## Key sources and verification status
- WebFetch was blocked for every domain tried (CNN, Guardian, SCMP, WEF, IC3, AFP, Truist, NCSC, treasurers.org, fedlex); the session's WebSearch budget ran out after a handful of searches.
  Figures are therefore verified only from original-publisher search snippets:
  - Arup: CNN (16 May 2024) — HK$200m (~US$25.6m), deepfaked CFO and colleagues on video call, police notified January 2024, fake voices and images confirmed. (15 transfers / 5 accounts appears only in secondary sources → not used.)
  - IC3 2023: RAT Financial Fraud Kill Chain 3,008 incidents, USD 758.05m potential losses, USD 538.39m held, 71% (ic3.gov PDF snippet).
  - AFP 2026 PFC press release (existing id afp-pfc-2026): 76% attempted/actual fraud; 74% BEC; only 30% recovered ≥75% of lost funds (up from 2024, below 41% in 2023) — the 30% figure is from the AFP snippet and is not yet in the wf-pay source note.
  - Swift developer portal: Stop and Recall stops in-flight payments or requests recall; assignee to process within 24 h.
- Reused existing: afp-pfc-2025, afp-pfc-2026, nacha-ic3-2024, bacs-ceo-fraud-2026, ecb-ipr, kpmg-vop-2025, deloitte-gts-2024, pwc-gts-2025, eact-guiding-principles.
- Swiss CO articles cited from established legal knowledge (fedlex not reachable).

## Unresolved uncertainties
- No verified survey data on month-end treasury reporting contents/timelines or on policy-breach frequency; both workflows are labelled as established practice + illustrative synthesis.
- SEPA recall timelines (10 banking days / 13 months RFRO) and whether fraud-reason recalls need beneficiary consent were NOT verified; the text stays generic ("a request, not a reversal … may need consent or a prosecutor's order").
- Legal points (whether paying a fraudster discharges the debt; Swiss freeze powers via prosecutor/MROS) are stated generally and flagged as jurisdiction-dependent.
- Crime-insurance sublimits/deductibles in the example are illustrative.
- Helvetic RCF maturity is not in companies.yaml; my content avoids stating it.

## Requests for other authors
- wf-pay: consider adding AFP 2026 "30% recovered ≥75% of funds" to the afp-pfc-2026 note (I cite it).
- wf-risk / wf-debt: covenant-headroom and compliance-certificate are yours; month-end-reporting links to them. Please keep Helvetic numbers consistent with my September figures if you reuse them: cash CHF 54.0m, net debt CHF 106m, LTM EBITDA CHF 78m (1.36x), net interest CHF 3.4m (~23x), undrawn RCF CHF 140m, EUR hedges EUR 58m of EUR 118m 12-month net inflows (next quarter 80%), per-bank limits CHF 25/25/20/10m (German bank 10m), headroom floor CHF 75m.
- Whoever owns the Helvetic company page / org pages: Helvetic's treasury policy is board-approved each December; independent deal confirmation is covered by group accounting when Lea is absent.
- Someone owns a broken YAML (liquidity-planning.yaml line 72, liquidity-crisis.yaml, lens.yaml) that makes the whole dev app show an error overlay — screenshots are blocked until fixed.
