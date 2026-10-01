# Requests from stream "day" for other authors (round 2)

Never edit another stream's files — everything below is a request. Canonical authority: `docs/AUTHORING.md`
"Canonical facts v2 / v2.1". My files are now aligned with it; these spots are not.

## Critical / factual (canonical v2 and v2.1 violations)

1. **`content/workflows/daily-cash-positioning.yaml` — `companies.kleio`** still says the Series B cash was partly
   "moved … into a CHF money-market fund". Canonical v2.1: **no CHF MMF** — CHF in short term deposits at two banks
   (diversification, ≈0% yield) + USD in a USD government MMF. (Round-1 note; still open.)
2. **`content/workflows/cash-forecasting.yaml`** example (Mon 23 Nov): "CHF 140m undrawn on the RCF" and "the CHF 35m
   RCF loan's interest period runs to 15 January". Canonical: after the 15 Oct rollover the drawings are
   **CHF 30m + EUR 35m ≈ CHF 63m, ≈ CHF 137m undrawn**; never a flattened "CHF 60m/CHF 35m" figure. Same file:
   "Q1 2027 … 75%, inside the 60–90% policy band" — canonical v2.1 puts **Q1 2027 in Q+2 = 40–70%** (see item 3).
3. **Hedge-band labelling in `/start` and the gold workflows.** `/start` ("next quarter is 75% hedged, inside the
   60–90% policy band") and `cash-forecasting.yaml` apply the 60–90% band to Q1 2027. Canonical v2/v2.1: bands are
   per **rolling calendar quarter** (as of Nov 2026: Q+1 = Q4 2026 = 60–90%; **Q1 2027 = Q+2 = 40–70%**; Q2 2027 =
   25–55%; Q3 2027 = 0–40%). "The 60–90% band" refers to Q+1 only. /day/daniel now shows Q4 85% / Q1 62% / Q2 30% /
   Q3 10% against those bands (matching the October exposure cycle in `fx-exposure-management.yaml`).
4. **`content/pages/start/index.mdx`** — the "What a 0% Swiss franc does" callout: "EUR balances earn around €STR
   (about 1.9–2.0%)". Canonical v2.1: **€STR ≈ 2.2–2.4%** (replaces every "1.9–2.0%"). Same page, "Why hold cash while
   borrowing?": "about CHF 60m drawn on its credit facility" — please show the mixed currency (CHF 30m + EUR 35m
   after the 15 Oct roll) and "≈ CHF 137m undrawn" (the page's "CHF 140m undrawn" is the pre-rollover figure).
5. **`content/pages/map/debt.mdx` and `content/glossary/map.yaml`** (leverage examples): "RCF CHF 60m + bond CHF 100m
   + **leases CHF 25m** − cash CHF 41m = CHF 144m net debt" and "covenant EBITDA CHF 88m". Helvetic reports under
   **Swiss GAAP FER** (leases off balance sheet; the covenant definition excludes IFRS 16 — see `covenant-excludes-leases`), and the canonical LTM is EBITDA ≈ CHF 78m / net debt ≈ CHF 106m / 1.36x. Either bridge the
   different figures explicitly or align them.
6. **`content/pages/map/working-capital.mdx`**: "Alpine's German customer owes a **CHF 2.0m acceptance milestone
   (20% of a robot project)**". Canonical: projects are CHF 0.5–4m; a 20% acceptance is ≈ CHF 0.7–0.8m, **never
   CHF 2.0m**. (I fixed the same error in my Petra timeline — the certificate gates a chain of receipts, which is how
   "one delayed certificate moves the month by CHF 2m" is true.)
7. **`content/pages/map/payments.mdx`**: "Policy: above CHF 1m, Daniel reviews and Thomas (CFO) co-signs." Canonical
   signing (ground truth `large-payment-approval.yaml`): ≤ CHF 2m four-eyes in treasury; **> CHF 2m Thomas (CFO) and
   the CEO co-sign** in addition.
8. **`content/pages/org/roles-treasury-manager.mdx`** (from round 1, several still open):
   "next Friday's rollover" → interest periods roll on the **15th** (no Friday tranche);
   "Thursday's payroll top-up" for HM Deutschland → German payroll is **monthly EUR 4.2m, value the last business
   day**, and my pages fund it on the Tuesday of that week;
   "adds the bond coupon, which a copied template had dropped" and "CHF 17m in week 6 after the coupon fix" → the
   low point is **≈ CHF 18m in the week of 14 December** (December payrolls incl. 13th salary) and the annual bond
   coupon is a **separate, later event** (the gold 13-week example, 23 Nov–19 Feb, contains no coupon);
   the Wednesday "supplier whose IBAN changed last week" hold now also appears on /day/daniel's Tuesday 27 Oct (with
   different details) — deliberate thematic repetition, but if you want it unique to the roles page, tell me and I
   will change my row.

## Consistency requests (not canonical violations)

9. **Kleio's 7-account composition.** `content/why/companies-size.yaml` (`kleio-bank-split-cap`: "a deposit product
   under Bank A's CHF account … seven accounts, three banks") and `account-counts-scale` ("the parent needs
   CHF/EUR/USD current accounts plus a deposit leg, Kleio Inc. needs operating + payroll accounts = 7") do not add up
   to 7 unambiguously. `content/data/days.yaml` (Sarah Mon 07:30) now enumerates: bank A = CHF operating + CHF 4m term
   deposit + EUR + USD (4), bank B = CHF operating + CHF 4m term deposit (2), US bank = Kleio Inc. USD (1) = **7**,
   with the two CHF 4m deposits split across the two banks (canonical v2.1 "CHF in short term deposits at two
   banks"). Please match, or tell me which composition is right and I will follow.
10. **Group-cash drift across files.** Canonical trajectory (from `covenant-monitoring.yaml`): ≈ CHF 54m at the Sep
    close → ≈ CHF 41m → ≈ CHF 35m in mid/late Nov → seasonal low ≈ CHF 25m at the Q4 close. But `/start` +
    `daily-cash-positioning` show CHF 41m on **17 Nov** while `covenant-monitoring` has ≈ CHF 35m in mid/late
    November, and `cash-forecasting` week 1 (23 Nov) opens at 29.5. My day pages now use CHF 45.6m (Mon 26 Oct) and
    CHF 44.2m (Tue 27 Oct) so the whole set reads 54 → 44 → 41 → 35 monotonically. Someone should own the 17 Nov /
    23 Nov figures — happy to adjust mine if the trajectory is restated.
11. **`content/pages/org/roles-treasury-manager.mdx`'s "41 Swiss supplier payments"** vs my "58 payments, CHF 4.3m"
    and round 1's "64-payment batch" elsewhere: fine as different days, but if the roles page is meant to be the same
    week as /day, say so and I will match the counts.

## Informational (no action needed)

- `content/why/day.yaml` deliberately does **not** duplicate `morning-sequence`, `leverage-bridge-136`,
  `covenant-test-dates`, `ceo-cosign-threshold`, `four-eyes-threshold`, `kleio-bank-split-cap`,
  `helvetic-twelve-accounts`, `systems-11-of-12-statements`, `hedge-bands-graded`, `systems-kleio-runway`,
  `week-four-trough`, `fifteenth-rollover-repayment` or `repay-rcf-not-chf-deposit` — it cross-links them and covers
  the day-page scene angle (11 notes, all linked inline).
- `content/glossary/map.yaml`'s `cross-currency-swap` term is now used by /day/priya and /day/anna for the 3-year PLN
  loan hedge (canonical v2.1: never a plain "FX swap" for that).
- Anchor format for links to the day pages is `/day/<persona>#<monday|tuesday>-hhmm` (unchanged; one new anchor
  `#tuesday-1430` for Daniel's hedge-ratio row).
