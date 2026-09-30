# Stream notes — wf-pay (payments & banking workflows)

## Files owned / created
- `content/workflows/payment-processing.yaml` (new) — invoice → approval → vendor master → proposal → file → signing → bank → rejects → clearing.
- `content/workflows/large-payment-approval.yaml` (new) — "CHF 4m request": Helvetic down payment with guarantee + changed IBAN; fraud variant.
- `content/workflows/bank-reconciliation.yaml` (new) — accounting-owned control; treasury as supplier of explanations.
- `content/workflows/bank-account-management.yaml` (new) — opening/closing/maintaining accounts; Helvetic Czech bank move timeline.
- `content/workflows/bank-fee-analysis.yaml` (new) — fee statements, camt.086/822, AFP codes, indirect costs (FX), wallet, RFP.
- `content/compare/wf-pay.yaml` (new) — topics `payment-approval`, `large-payment`, `bank-accounts`, `reconciliation-owner`.
- `content/glossary/wf-pay.yaml` (inherited, extended) — fixed `sic` (IP since Aug 2024; companies never connect to SIC directly);
  replaced references to `rtgs-note` with `rtgs` / `cut-off-time`; new terms: `manual-payment`, `ebics-signature`, `matching-rules`,
  `reconciling-item`, `board-resolution`, `charge-bearer`, `earnings-credit-rate`, `bank-rfp`, `advance-payment-guarantee`,
  `assignment-of-receivables`, `structured-address`. The ECR example was moved from Alpine Inc. to Kleio Inc. (Alpine has only two Swiss banks).
- `content/sources/wf-pay.yaml` (inherited, extended) — added `afp-pfc-2026-highlights`, `swift-eoc-2025`, `epc-vop-bulk-faq`,
  `epc-vop-golive`, `six-address-factsheet`, `six-sps-ig-ct-2026`, `six-ebics`, `encompass-kyc-2024`, `crowe-swiss-account`,
  `lenz-transparency-2026`, `gtreasury-automatch` (vendor claim only), `gt-bsb-2013`.

## Research method and limits (session 2)
- WebFetch was egress-blocked for every domain tried (AFP, ECB, SIX, trade press). Facts were verified from WebSearch result
  snippets restricted to the original publisher's domain (swift.com, europeanpaymentscouncil.eu, six-group.com, snb.ch,
  financialprofessionals.org / truist.com, encompasscorporation.com, lenzstaehelin.com). The session's WebSearch budget ran out
  after these searches.
- The session-1 notes on `afp-pfc-2025` (521 respondents, 63% BEC, etc.) could not be re-opened; only the 79% headline was
  re-confirmed. The workflows cite the 2026 edition figures instead (76% fraud, 74% BEC, checks 58%, ACH debits 30%, wires 25%, 17% AI).

## Key verified facts used
- Swift: MT/MX coexistence for cross-border interbank payment instructions ended 22 Nov 2025 (contingency conversion for MT103/202).
- EPC/IPR: VoP for euro credit transfers from 9 Oct 2025 for EU/EEA PSPs; non-consumers may opt out for bulk files; go-live issues with "no match" on trade names.
- SIX: structured/hybrid addresses mandatory in Swiss pain.001 from Nov 2026 (unstructured only for execution dates before 14 Nov 2026); pain.001.001.09 and camt.05x.001.08 required from then. Swiss banks: EBICS 3.0 migration period ends 13 Nov 2026.
- SIC IP: large banks receiving since Aug 2024, all retail SIC participants by end-2026.
- Swiss Transparency Act (beneficial-owner register) in force 1 Oct 2026.
- BACS: CEO-fraud reports 719 (2024) → 971 (2025).
- Encompass (vendor, UK/US 250 treasurers): 41 days average to open an account.

## Unresolved uncertainties
- Whether Swiss banks offer VoP on EUR payments (they are SEPA participants outside the EU obligation) — the workflows say it depends on the bank.
- No independent benchmark for bank-reconciliation auto-match rates found; only vendor claims (cited as such).
- No reliable data on typical bank-fee overcharge rates; the fee example is illustrative.
- Bank cut-off times are described as ranges ("late morning to early afternoon") — they vary by bank and currency.

## Requests for other authors
- **map / core glossary owners**: there are overlapping term pairs — `bec` (map) vs `business-email-compromise` (wf-pay);
  `correspondent-bank` (map) vs `correspondent-banking` (wf-pay); `payment-status` (map) vs `pain-002` (wf-pay);
  `bank-account-management-term` (map) vs `ebam` (wf-pay); `account-analysis` (map) vs `bank-services-billing` (wf-pay).
  Suggest keeping both but adding `confusedWith`/`related` cross-links, or merging into the map ids and redirecting. I kept mine because other streams may already link to them.
- **exemplar reviser**: if `sic`, `camt-054` or instant-payment terms are added to core.yaml with the same ids, tell me and I will remove mine.
- **wf-cash stream**: `content/glossary/wf-cash.yaml` line 29 has a YAML error that breaks the whole dev server (seen during my screenshots).
- **org/roles**: payments roles page should reflect the split used here — AP prepares, treasury owns bank side/formats/liquidity, signatories release, payment factory at large groups.
