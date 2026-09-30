# Stream notes — competitors (Section 19, Competitor Landscape)

Author session: 2026-09-30.

## Research constraint (important)
- **WebFetch was blocked by the egress proxy for every domain tried** (hgcapital.com, ripple.com, kyriba.com, businesswire.com,
  theblock.co, crowdfundinsider.com, finextra.com, wikipedia.org).
- **The session-wide WebSearch budget (200 calls, shared with other authors) was exhausted after ~8 of this stream's queries.**
  Retried after the coordinator note: still exhausted.
- Result: only a handful of facts were verified, against **search-result snippets** from the original publisher (not full pages).
  Every entry in `content/data/competitors.yaml` has a `verify` badge: `snippet` (key facts sourced), `background`
  (author knowledge up to mid-2026, not re-verified), `watchlist` (name from the brief only, nothing verified).
  The UI shows the badge on every row and in the map, and the pages say so plainly.
- **To finish this stream properly, raise CLAUDE_CODE_MAX_WEB_SEARCHES_PER_SESSION (or give a fresh session budget) and run a
  verification pass over the list below.**

## Files created / owned
- `content/data/competitors.yaml` — 4 system types, 11 categories (each mapped to canonical workflow ids), 35 entries (4 key-facts-sourced, 24 background, 7 watchlist)
- `src/components/CompetitorViews.tsx` — `<CompetitorTable category="id[,id]" filters={bool} />` (filters: category, size, type,
  text search, hide watchlist, expand all; deep-link `#v-<id>` opens a row), `<CompetitorMap />` (category × size grid, sticky
  first column, scrolls inside its own box at 390px), `<CompetitorCategories />`, `<CompetitorTypes />`, `<CompetitorVerifyLegend />`
- `src/styles/competitors.css` — uses global tokens only, so dark mode follows automatically
- `content/pages/competitors/`: `index.mdx`, `method.mdx`, `landscape.mdx`, `tms.mdx`, `cash-forecasting.mdx`,
  `connectivity-payments.mdx`, `fx-hedging.mdx` (incl. investment portals), `working-capital.mdx`, `ai-and-agents.mdx`
- `content/sources/competitors.yaml` (12 sources, all prefixed `comp-`), `content/glossary/competitors.yaml` (7 terms:
  deal-capture, swift-service-bureau, currency-management-automation, cash-investment-portal, stablecoin, treasury-agent,
  tms-selection). I removed my `system-of-record` and `multi-dealer-platform` because systems.yaml and wf-risk.yaml added the
  same ids at the same time; my pages link to theirs.

## Verified facts (snippet level) and their dates
| Fact | Date | Source id |
|---|---|---|
| Ripple announced acquisition of GTreasury, ~USD 1bn; GTreasury to operate as subsidiary; closing "within months" | 16 Oct 2025 | comp-ripple-gtreasury-pymnts, comp-ripple-gtreasury-bw |
| Hg first invested in GTreasury 2023, full exit; ">1,000 customers in 160 countries" (seller claim) | 16 Oct 2025 | comp-hg-gtreasury-exit |
| GTreasury launched "Ripple Treasury" (stablecoin/RLUSD settlement, custody, "AI-driven cash forecasting" as reported) | 27 Jan 2026 | comp-ripple-treasury-launch |
| GTreasury acquired Solvexia (deal-record title only) | date unknown | comp-gtreasury-solvexia |
| Treasury4 acquired TreasuryGo (deal-record title only) | date unknown | comp-treasury4-treasurygo |
| Bridgepoint majority in Kyriba, USD 160m round, ~USD 1.2bn valuation, closed 11 Apr 2019 | 2019 | comp-bridgepoint-kyriba-2019 |
| Melissa Di Donato is Chair & CEO of Kyriba | undated profile | comp-treasurytoday-didonato |
| General Atlantic minority investor in Kyriba (aggregator data only) | Oct 2024 | comp-kyriba-ga-aggregators |
| Coupa acquired BELLIN, completed June 2020 | 2020 | comp-coupa-bellin-2020 |
| Atlar seed (Index Ventures); no later round in aggregator data | Nov 2022 | comp-atlar-funding |
| Atlar–TreasurySpring partnership | May 2025 | comp-atlar-treasuryspring |

## Facts to re-verify (priority order; checked-as-of 2026-09-30 = NOT checked)
1. **GTreasury/Ripple**: formal closing date; whether the GTreasury brand persists next to "Ripple Treasury"; Solvexia deal date; any other GTreasury acquisitions (e.g. Visual Risk — background only).
2. **Kyriba**: General Atlantic investment (primary press release), any 2025–2026 ownership change, acquisitions, CEO still Di Donato, scope of its AI features.
3. **FIS**: whether the treasury line (Quantum, Integrity, Trax) was sold, rebranded or carved out during FIS's 2024–2026 restructuring (Worldpay/Global Payments issuer deal).
4. **ION Treasury**: current product list; any divestitures.
5. **Coupa Treasury**: 2025–2026 status of the ex-BELLIN product (still sold under Coupa? rebranded? divested?). Coupa taken private by Thoma Bravo 2023 (background).
6. **Nomentia**: owner(s), Cashforce combination date, any 2025–2026 deals.
7. **Serrala**: owner(s); acquisitions (background suggests US AR acquisitions — unverified). Hanse Orga → Serrala rebrand 2018 (background).
8. **TIS**: owner(s), 2025–2026 funding/deals.
9. **Bottomline**: Thoma Bravo 2022 take-private (background); any 2025–2026 divestitures.
10. **SAP**: Taulia acquisition date (2022, background); current names of treasury modules; Joule/AI treasury features.
11. **Oracle**: current Fusion treasury scope.
12. **Trovata, Embat, Agicap, Atlar**: latest rounds, investors, amounts, dates; product scope (payments? AI?).
13. **HighRadius**: 2021 round figures; treasury module scope; any 2025–2026 funding.
14. **Kantox**: current owner/investors (background uncertain); product scope.
15. **Ebury**: Santander stake size and date; any IPO plans.
16. **360T** (Deutsche Börse since 2015), **FXall** (LSEG via Refinitiv 2021), **Bloomberg FXGO**: stable, but confirm names.
17. **Chatham Financial, Hedgebook, Tesorio, C2FO, TreasurySpring**: ownership and funding.
18. **Fides** (Swiss connectivity): ownership (historically Credit Suisse-related — verify, especially after the UBS takeover) and scope.
19. **Treasury agents / AI-native startups**: verify existence, shipped scope, funding and customers for Palm, Nilus, Statement, Millimetric, Bound, Treasury4; search for other AI-native treasury startups launched 2024–2026 and whether anything is live in production (not only announced).
20. **Missing categories** to research next: banks' own treasury tools (multi-bank reporting, FX e-platforms), Swiss-specific treasury/payment software, treasury-as-a-service/outsourcing, US startup-banking "treasury" yield products, investment portals besides TreasurySpring (e.g. ICD).

## Unresolved uncertainties
- Customer-size placements on the map are the author's synthesis from positioning, not measured data.
- "Strengths" for `background` entries are structural (scope-based) rather than evidence of quality; no user reviews were consulted.
- The "status quo" entry makes a synthesis claim (Excel + bank portals is often the real competitor below multinational size), supported only indirectly by Deloitte 2024 and AFP 2026.

## Requests for other authors
- **/systems/vendors** author: the landscape links to `/systems/vendors` and `/systems/tms` for neutral product explanations. Please keep those routes. If you verify any ownership/funding fact, tell me (or add to your sources) so the badge here can be upgraded.
- **Glossary**: I rely on `system-of-record` (systems.yaml) and `multi-dealer-platform` (wf-risk.yaml).
- **Lens** author: `/competitors/ai-and-agents` links to `/lens` and `/lens/candidates`.
- Other streams: `content/data/days.yaml`, `content/glossary/lens.yaml`, `content/glossary/wf-cash.yaml`, `content/workflows/funding-subsidiary.yaml`,
  `content/workflows/liquidity-planning.yaml` failed YAML parsing at the time of my check, and `src/components/LensViews.tsx` had a TS error (line 594); the parse errors take the whole dev app down.
