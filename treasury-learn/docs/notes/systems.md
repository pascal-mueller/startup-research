# Systems & Data stream — author notes

## Files created / owned
- Pages: `content/pages/systems/{index,architecture,erp,bank-connectivity,tms,market-data,spreadsheets,vendors,data-quality}.mdx`
- Data: `content/data/systems.yaml` (stack layers, per-company stacks, categories, 16 product profiles with a `checked` currentness flag)
- Glossary: `content/glossary/systems.yaml` (19 terms: bank-connectivity, camt-053, camt-052, bai2, mt101, fileact, service-bureau, swift-score, multibank-connectivity, payment-hub, distributed-signature, bank-transaction-code, posting-rules, cash-flow-category, stp, system-of-record, trading-platform, fx-fixing, euc)
- Sources: `content/sources/systems.yaml` (14 sources)
- Components: `src/components/Diagrams.tsx` (`<StackDiagram company? tabs? caption?/>` with company tabs, `<DataFlowDiagram/>`, `<ConnectivityDiagram/>`), `src/components/DataViews.tsx` (kept `SourcesIndex`; added `<SystemsTable category?/>`, `<SystemCategories/>`, `<VendorProfiles category? ids?/>`, `<CompanyStacks/>`), CSS `src/styles/systems.css` (theme tokens only; single-column below 760px).

## Research constraints (important for the reviewer)
- **WebFetch was blocked** for every domain tried (vendor, Swift, SIX, Microsoft, SAP pages), and the **shared WebSearch budget ran out** after ~20 searches in this stream. All new sources were verified from search-result text published by the original publisher (marked "(search snippet)" in the source notes); none were opened in full.
- Verified in this session (Sept 2026): Ripple's USD 1bn GTreasury acquisition (announced 16 Oct 2025) and rebrand to Ripple Treasury (Jan 2026); GTreasury/Ripple Treasury's Solvexia acquisition (7 Jan 2026); Kyriba ownership (Bridgepoint majority since 2019, General Atlantic minority 2024) and April 2026 announcements; FIS Quantum Cloud Edition (29 Apr 2025, >1,000 orgs claim); ION treasury product list; Trovata's ATOM acquisition (24 Jul 2025); Embat EUR 30m Series B (May 2026); Coupa/BELLIN (2020); SAP MBC scope; SAP ECC maintenance dates; Swift corporate connectivity options; ZKB's EBICS 3.0 / 2019-version timeline.
- **Not re-verified** (flagged `checked: knowledge` in systems.yaml and shown in the UI): Oracle, Microsoft Dynamics 365, Agicap, Atlar, Nomentia, Bottomline, Bloomberg/LSEG, 360T. Descriptions kept deliberately generic. A later pass with web access should verify: Oracle Fusion treasury scope; Dynamics 365 Finance/Business Central cash features; Agicap/Atlar/Nomentia current product scope and ownership; Coupa ownership after 2023; whether LSEG fully retired Eikon.
- Not stated because unverifiable now: implementation durations, license costs, market shares, adoption statistics for bank APIs. Implementation timelines are phrased as practitioner patterns, not numbers.

## Unresolved uncertainties
- German EBICS 3.0 mandatory dates: not verified; pages only cite the Swiss (ZKB) timeline and say other banks publish their own dates.
- Corporate MT101 / MT940 end dates: pages say banks set their own timelines (consistent with core sources `swift-iso-mt9xx`, `six-sps-cash-mgmt`).
- Swift CSP attestation for corporate Swift users is stated as established fact without a citation (fetch blocked).

## Requests for other authors
- **days / people stream** (`content/data/days.yaml`): it references unknown terms `intraday-statement` and `ebics-key-initialisation`. Suggest linking to `camt-052` (intraday report) and `distributed-signature` / `ebics` instead of creating new ids. `trade-confirmation` could link to the existing `deal-confirmation`.
- **map stream**: `/map/technology` could embed `<StackDiagram />` or `<ConnectivityDiagram />` and link to `/systems/architecture`.
- **competitors stream**: `content/data/systems.yaml` product ids (`kyriba`, `fis`, `ripple-treasury`, `ion`, `coupa-treasury`, `trovata`, `agicap`, `atlar`, `embat`, `nomentia`, `sap`, …) and the verified sources in `content/sources/systems.yaml` can be reused; please keep GTreasury referred to as "Ripple Treasury (formerly GTreasury)".
- **workflow authors**: the `systems` sections of workflows can link `[camt.053](term:camt-053)`, `[multibank connectivity tool](term:multibank-connectivity)`, `[payment hub](term:payment-hub)`, `[cash-flow category](term:cash-flow-category)`.
