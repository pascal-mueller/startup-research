# Stream wf-risk — author notes

## Files owned
- `content/workflows/fx-exposure-management.yaml` (FX & risk, order 1)
- `content/workflows/fx-hedging.yaml` (FX & risk, order 2)
- `content/workflows/credit-facility-management.yaml` (Debt & funding, order 1)
- `content/workflows/covenant-monitoring.yaml` (Debt & funding, order 2)
- `content/glossary/wf-risk.yaml` — 31 terms (booked-exposure … equity-ratio)
- `content/sources/wf-risk.yaml` — 16 sources
- `content/why/wf-risk.yaml` — 10 why-notes (created this revision pass)
- `content/compare/wf-risk.yaml` — topics `fx-management`, `hedge-execution`, `facilities-covenants` (from round 1)

## Revision pass (post `docs/reviews/wf-fx-debt-r1.md`) — what changed and why

### Task A — review findings fixed
1. **RCF timeline contradiction (critical 1).** The 15 Oct 2026 rollover and the post-rollover state are now stated
   explicitly so readers can re-derive every later number: `credit-facility-management.yaml` (example, Mon 5 Oct → Thu
   15 Oct sequence; "The state from here on: CHF 30m + EUR 35m ≈ CHF 62.7m drawn — call it ≈ CHF 63m — so ≈ CHF 137m of
   the CHF 200m is undrawn. Every later Helvetic scenario starts from these figures") and `covenant-monitoring.yaml`
   (Part 1: "today's drawings are CHF 30m + EUR 35m ≈ CHF 63m after the 15 October rollover, so ≈ CHF 137m … undrawn").
   No "CHF 35m loan after 15 Oct" and no "CHF 140m undrawn" anywhere in my files. The November exemplar scenarios in
   *other* streams' files still carry pre-rollover figures — requests filed (see below); their streams own those fixes.
2. **Graded bands / rolling-bucket convention (critical 2 + minor 4).** All my texts use the canonical bands (Q+1
   60–90%, Q+2 40–70%, Q+3 25–55%, Q+4 0–40%) and now state the convention explicitly ("bands are assigned by rolling
   calendar quarters … as a quarter closes the remaining quarters roll up one band") in fx-hedging step 1 and both FX
   worked examples. `layered-hedging` (glossary/map.yaml, map stream) is still linked only from `terms:` lists; the map
   stream is fixing its example — my inline hoverables use my own `hedge-bands-graded` note instead. The Oct→Nov jump
   (Q1 2027 exposure 32→40m, hedges 19→30m) is bridged with one explanatory line in **both** FX worked examples
   ("Bridge to the November rounds").
3. **Pro-forma worked-example mislabel (critical 3).** `covenant-monitoring.yaml` Part 2 now derives all three
   conventions: full pro forma 198/83 = 2.39x; post-closing-only (Apr–Jun 2027 ≈ CHF 2.3m of the CHF 9m) 198/76.3 ≈
   2.6x; no target EBITDA at all 198/74 = 2.68x — with a "Where the base case comes from" reconciliation table
   (EBITDA 74 + 9 = 83; net debt 106 → ≈ 98 → +7.9 China + 92 deal ≈ 198). All other covenant math re-derived on the
   canonical LTM (78/106/1.36x); leases excluded from covenant net debt is now explicit and consistent with Swiss GAAP
   FER (plus derivatives/ISDA close-out netting added to the "what counts as debt" list per the review's missing
   concept).
4. **Source cleanup.** ACT/HSF "76%/41%" is gone; the claim is qualitative with "as reported by ACT/HSF; the exact
   share is not confirmed against the primary text". MillTech updated to the 2026 cut (57% / 6.62 months, Corporate
   Hedging Monitor Q1 2026 — verified on MillTech's own report page and via The Full FX + CFOtech) with a new source
   `milltech-hedge-monitor-2026`; the 2025 Global FX Report (≈48–49% / 5.3 months, 750 corporates + 750 fund managers)
   kept as the comparison and labelled "(corporate sample)". FinfraG 1 Jan 2028 (admin.ch), SECO 32%, Loomis 5+1+1
   kept as verified; added a currentness clause (FMIA revision proposes abolishing the small-NFC duty; Parliament
   2025–2026) with source `cms-fmia-revision-2025`.
5. **Ownership consistency.** Covenant ratios now computed by Group Accounting (Claudia) with Lea's net-debt schedule,
   Daniel reviews and presents to the banks, FP&A (Marco) supplies forecast EBITDA only (people list + step 3 + Part 1
   of the example). Exposure cycle fixed to the canonical timeline: submissions WD5 (collection window WD2–WD6), Lea
   consolidates, Daniel reviews WD7, hedges after the review (trigger + step 2 + step 10 + fx-hedging example).

### Other review items fixed (minor / "better example opportunities")
- Sequence slip: the fx-hedging example moved from Thu 8 Oct (WD6) to **Fri 9 Oct (WD7)**, afternoon timeline, opening
  with Daniel's WD7 review decision — no longer consuming a decision dated later than itself.
- Forecast→firm→booked migration double-counting: new failure mode in fx-exposure-management.
- NDF worked line: GlobalChem INR 400m at 62.50 / fixing 63.50 → bank pays ≈ USD 0.1m, no rupees move
  (fx-hedging `companies.globalchem`).
- Option cost anchor: 6-month EUR put on EUR 5m, strike 0.94, ≈ 1.5–2% of notional ≈ EUR 75–100k (≈ CHF 70–95k),
  paid whether or not the tender is won (fx-hedging step 4). Note the review's example said "EUR call" — for a
  receipt-side exposure the correct instrument is a EUR **put**; the note teaches the direction.
- Hedge-accounting two-column table (fx-hedging step 7): EUR 10m hedged at 0.930, EUR/CHF to 0.910, forward +CHF 0.2m,
  with vs without hedge accounting (P&L timing vs equity).
- Covenant-definition diff: the "Where the base case comes from" bridge table in covenant-monitoring Part 2.
- Passive vs active breach contrasted side by side in the fx-hedging example (linked to wf-control's
  `passive-vs-active-breach` note).
- Vague passages: credit-facility judgment 5 now names the acquisition basket / EBITDA add-back cap / net-debt
  definition vs the margin grid; fx-hedging software names Kantox-class dynamic hedging and MillTech as examples.
- FER hedge wording corrected to "the change in fair value attributable to hedging **highly probable** future sales …
  deferred in equity (or disclosed in the notes)".
- Commitment-fee recomputation now exact: invoice CHF 106,287 = 0.2975% × CHF 139.8m × 92/360; lender-share column
  marked "(shares rounded)".
- Utilisation-fee two-thirds tier mentioned (credit-facility step 3).
- fx-exposure example title now names the third beat (the Czech out-of-policy exposure).
- €STR updated to 2.2–2.4% per canonical v2.1; all forward quotes re-derived at ≈ 2.3% (see Task B below).

### Task B — why pass (`content/why/wf-risk.yaml`, 10 notes)
Ids: `hedge-bands-graded`, `bid-contingent-hedge`, `revolver-swap-awkward`, `fifteenth-rollover-repayment`,
`covenant-excludes-leases`, `net-debt-lender-view`, `utilisation-fee-threshold`, `acquisition-consent-test`,
`pro-forma-ebitda-effect`, `cover-not-binding`. Linked inline in the four workflows and three glossary examples.
`forward-points-below-spot` and `passive-vs-active-breach` were dropped/deduped in favour of the map and wf-control
streams' notes (see the id-race note below).

**Examples corrected because the derivation failed:**
1. **Forward quotes and swap legs (fx-hedging + glossary).** At €STR ≈ 2.2–2.4% (canonical v2.1) the old quotes
   (0.91885/0.91862/0.91901, swap 0.93117/0.92667, "1.7% below spot", €STR 1.95%) did not re-derive from parity. New:
   326-day forward at spot 0.9352 ≈ 0.9157; quotes 0.91565/0.91548/**0.91588** dealt (~2.1% below spot, best–worst
   CHF ~1,200 unchanged); swap legs 0.93025/0.92485; cash on 31 Dec = 2.0m × (0.9420 − 0.93025) = CHF 23,500; three
   more months of points = 0.0054 ≈ CHF 11k on EUR 2m. Glossary `multi-dealer-platform`, `hedge-roll`, `budget-rate`
   examples updated to match (0.917 → 0.913–0.915; "1.5% below budget" → "about 1.7%" = (0.93−0.914)/0.93).
2. **December net-debt forecast (covenant-monitoring Part 1).** The old "31 Dec 2026: net debt 104, 1.37x" failed
   against the shared cash path (54m Sep → 41m 17 Nov → 35m 23 Nov → ≈25m Q4 close → 52.6m Feb). Corrected to
   100 + 62.7 − 25 ≈ CHF 137m, leverage 1.80x (137/76) — with the cash-drift bridge the review asked for — and the
   consequence made explicit: the December certificate steps the margin to 1.05%, back to 0.85% at the half-year test.
   Part 2's net-debt bridge row now shows the whole path 106 → ≈137 → ≈98 → +7.9 → +92 ≈ 198.
3. **Option instrument direction.** The review's suggested tender example ("EUR call") is wrong for a receipt-side
   exposure; the worked line and the why-note use a EUR **put** (right to sell EUR 5m at 0.94) and teach the direction.
4. Everything else re-derived cleanly: band firmness (100/43/28/13% vs 75/55/40/25% midpoints), the utilisation-fee
   cliff (0.10% × 67.7m ≈ CHF 68k + 0.85% × 5m ≈ CHF 42.5k vs ≈0% deposit income), cover-vs-leverage binding order
   (EBITDA −83% vs −58%), the 2.75x consent test (2.39x base / 3.20x downturn — consent bites before the covenant),
  the NDF settlement (400m × (1/62.50 − 1/63.50) ≈ USD 0.1m), the hedge-accounting table (0.020 × 10m = CHF 0.2m),
   and the post-closing EBITDA slice (9/4 ≈ 2.3m).

### Task C — verification
- `npm run check`: **0 errors, 0 warnings** (whole repo at the time of writing).
- Screenshots (full page, 1440px) of all four routes in `$TMPDIR/wf-risk-v2/`: no MISSING refs, no runtime errors;
  PNGs read and rendering confirmed (tables, callouts, worked example).
- One-off Playwright hover: `button.why` ("graded band") on /workflows/fx-hedging opens the popover with claim, short,
  detail and the falsifier line (screenshot `why-hover-fx-hedging.png`); the corrected base-case table renders
  (`covenant-base-case-table.png`).

## Known concurrency events during this pass (for the record)
- Why-id collisions with streams writing at the same time: `hedge-bands-graded` and `passive-vs-active-breach`
  (wf-control), `forward-points-below-spot` (map). Resolution: `forward-points-below-spot` deleted (map's note is the
  canonical one and already v2.1-correct); `passive-vs-active-breach` deleted (wf-control's note covers it and my
  inline links point there); `hedge-bands-graded` ended up in this file after both streams deduped toward the id that
  the wf-control and map pages already link to — wf-control merged its derivation (the 90%-four-quarters-out argument,
  the FER/IFRS point) into the note here. If wf-control re-adds a note under this id we will collide again.
- A bulk find/replace run early in the pass briefly rewrote `why:hedge-bands-graded` links inside
  month-end-reporting.yaml, policy-compliance.yaml and pages/map/fx.mdx; those three files were restored to their
  original link targets immediately and are unchanged apart from that restoration.

## Unresolved uncertainties (carried over + new)
- Exact current FinfraG position after the FMIA revision (whether Parliament abolishes the small-NFC reporting duty)
  — text now says what the 2022 press release says plus a dated currentness clause sourced to a law-firm update.
- Swiss GAAP FER 27 revision referenced in KPMG's "2027 checklist" — not reviewed.
- No survey statistics on covenant headroom practice, facility administration effort or exposure-data quality; the
  workflows say so rather than inventing numbers.
- Pricing (margin grid, fees, forward quotes, option premium) is illustrative; the option premium anchor (1.5–2% of
  notional) is an order-of-magnitude teaching figure, not a quoted market price.
- "Many investment-grade RCFs have no financial covenants" remains a practitioner observation without a statistic.

## Requests for other authors
See `docs/notes/wf-risk-requests.md` (kept separately this round per the revision brief).
