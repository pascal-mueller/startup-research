# Map stream — requests for other authors (revision pass)

## 1. URGENT — day stream: `content/data/days.yaml` breaks the whole app
The Vite dev server serves the error overlay on **every route** (all screenshots fail for all streams) because
`content/data/days.yaml` has a YAML parse error at **line 61:54** ("bad indentation of a mapping entry") — an
unquoted mapping value containing ": " (`input: Closing balances of the 7 accounts: the CHF operating account, …`).
Since `src/lib/content.ts` eager-globs `/content/data/*.yaml`, the parse error fails the entire app module.
`npm run check` also reports 24 errors (all day stream): unknown why notes `day-us-payroll-topup`,
`day-kleio-cash-policy`, `day-runway-range`, `day-rcf-keep-drawn`, `day-covenant-ltm`, `day-china-manual-balance`,
`day-german-funding-3m`, `day-escalation-two-million`, `day-hedge-ratio-by-quarter`, `day-exception-list`,
`day-morning-window` referenced from `content/data/days.yaml` and `content/pages/day/*.mdx` — presumably
`content/why/day.yaml` is not written yet. Quote the offending scalars and add the why file.

## 2. Workflow stream: gold-standard files contradict canonical v2 in two places
- `content/workflows/cash-forecasting.yaml` (13-week example, week starting 23 Nov 2026) says "CHF 140m undrawn on
  the RCF" and "the CHF 35m RCF loan's interest period runs to 15 January". Canonical v2 + `credit-facility-management.yaml`
  say the post-rollover state is **CHF 30m + EUR 35m ≈ CHF 63m drawn, ≈ CHF 137m undrawn** from November onward
  (CHF 35m + EUR 27m only until the 15 Oct 2026 rollover). Map files follow canonical v2.
- Same file: "Q1 2027 net EUR inflows EUR 40m against EUR 30m of forwards, 75%, inside the 60–90% policy band".
  Canonical v2 says **Q1 2027 = Q+2 = 40–70%** — so 75% is above the band (or the text must say the quarter has
  rolled up into the Q+1 band when Q4 closes). Please reconcile; map pages state Q1 2027 = Q+2 = 40–70%.

## 3. Core/companies streams: stale Helvetic figures (canonical: EBITDA 78, net debt 106, 1.36x, FER)
- `content/glossary/core.yaml` `covenant` example: "about CHF 144m net debt (RCF 60m + bond 100m + leases 25m − cash
  41m) and about CHF 88m covenant EBITDA … about 1.6x" → rebuild on 100 + 60 − 54 = 106 ÷ 78 = 1.36x; leases are off
  balance sheet under Swiss GAAP FER. Same file `free-cash-flow` example: "2027 plan: EBITDA CHF 85m … − interest 5m"
  → stale; interest ≈ CHF 3.2–3.5m is derivable (coupon 1.25 + RCF interest/commitment fee ≈ 1.6 + fees).
- `content/pages/companies/helvetic.mdx` line ~99: "EBITDA of about CHF 85m and net debt of about CHF 119m (RCF 60 +
  bond 100 − cash 41) … roughly 1.4x" → canonical 78 / 106 / 1.36x (cash is CHF 54m at 30 Sep 2026).
- `content/glossary/wf-risk.yaml` `example`: "Helvetic AG's USD 5m loan" → the parent's legal name is
  **Helvetic Machines AG** (never "Helvetic AG").

## 4. Compare/workflow streams: RCF maturity in comparison cells
- `content/compare/companies.yaml` (map-… cell): "The RCF (CHF 200m, ~CHF 60m drawn) runs to 2027" → matures
  **October 2028** (5 + 1 + 1 extension options accepted); with the bond also due 2028 the story is the
  amend-and-extend to 2031 to be signed in 2027.
- `content/compare/wf-cash.yaml` helvetic cell: "the undrawn RCF (~CHF 140m)" in a November-plan context →
  ~CHF 137m (140m is the pre-rollover state).

## 5. €STR level sweep (canonical v2.1: €STR ≈ 2.2–2.4%, replaces every 1.9–2.0%)
Still saying "€STR ≈ 1.9–2.0%": `content/pages/start/index.mdx`, `content/pages/systems/market-data.mdx`,
`content/data/lens.yaml`, `content/workflows/surplus-cash-investment.yaml`. Map files are fixed (2.2–2.4%).
Note the knock-on: a EUR drawing at €STR + 0.85% costs ≈ 3.1–3.2% (not 2.8–2.9%).

## 6. FYI — satellite files edited by the map stream
`content/sources/map.yaml` and `content/compare/map.yaml` were treated as map-stream satellites and fixed
(BIS title, SNB URL, sec-mmf URL encoding; IFRS 9 → Swiss GAAP FER in the map-fx cell; signing threshold in
map-payments; cash range in map-investing). If another stream owns them, please review these diffs rather than
reverting them — they implement map-r1 findings.
