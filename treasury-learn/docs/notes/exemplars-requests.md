# Requests for other authors — exemplar stream (2026-09-30)

I do not own these files. Each item names the file, the line and the fix. All stem from the canonical facts v2/v2.1
or from the corrected exemplar numbers.

## 1. `content/workflows/liquidity-planning.yaml` (wf-cash stream) — 13-week opening balance
Line ~197: "group cash drifted from CHF 54m to **CHF 35m — the 23 November forecast's opening** … Net debt at the
review is therefore ≈ CHF 128m."
The corrected `cash-forecasting.yaml` example opens the 23 Nov strip at **CHF 41.3m** (the 17 Nov daily position's
CHF 41m group total plus the week's net +0.3m; the old 35m could not be reconciled with a +0.3m week — see
`docs/notes/exemplars.md` and why-note `strip-opens-41`). Please restate the drift as "CHF 54m → ≈ CHF 41m by
mid-November (the 23 Nov forecast opens at 41.3)" and net debt at the review as ≈ CHF 100m + 63m − 41m ≈ **CHF 122m**.

## 2. `content/workflows/covenant-monitoring.yaml` (wf-risk stream) — November cash + the low point
Line ~181: "cash drifts … to ≈ CHF 41m **and ≈ CHF 35m** in mid/late November (the daily position and the 13-week
forecast show the same group cash), and the 13-week forecast puts it at the seasonal low of **≈ CHF 25m at the Q4
close**".
Two fixes: (a) the two November figures are now one — CHF 41m (17 Nov) and CHF 41.3m (23 Nov opening), not 41 and 35;
(b) the canonical low point is **week 4 (w/c 14 Dec) ≈ CHF 18m** (usable ≈ CHF 12m after the trapped CNY 6m), while
**Q4-2026 closes ≈ CHF 25m** — those are two different numbers, not one. Your year-end net-debt line
(CHF 100m + 62.7m − 25m ≈ CHF 137m) stays valid.

## 3. €STR level (canonical v2.1: **2.2–2.4%**, replaces every "1.9–2.0%")
- `content/pages/systems/market-data.mdx:22` — "€STR around 1.9–2.0%" (systems stream).
- `content/data/lens.yaml:305` — "€STR ≈ 1.9–2.0%" (lens stream).
- `docs/AUTHORING.md:157` (canonical market levels, read-only for me) — still says €STR ≈ 1.9–2.0%; v2.1 supersedes
  it, but the line should be updated so authors stop copying it.
(`glossary/map.yaml` forward/€STR examples and `pages/map/fx.mdx` are already on 2.2–2.4% / 0.913–0.915.)

## 4. "CHF 140m undrawn" in November-and-later scenarios (canonical v2: CHF 30m + EUR 35m drawn ≈ CHF 63m,
≈ CHF 137m undrawn)
- `content/workflows/liquidity-crisis.yaml:275` — "keeps the CHF 140m undrawn RCF as headroom".
- `content/compare/wf-cash.yaml:8` — "the undrawn RCF (~CHF 140m)".
- `content/compare/wf-events.yaml:18` — "absorbed by CHF 140m undrawn RCF".
(`pages/map/debt.mdx:50` handles this correctly with the pre/post-rollover distinction — use it as the model.)

## 5. `content/companies.yaml` (companies stream) — GlobalChem ERP estate
`Systems` currently reads "SAP S/4HANA with SAP treasury modules", while the payment-factory pattern needs legacy
ERPs. Canonical v2.1 says not to edit companies.yaml silently — please consider "SAP S/4HANA with SAP treasury
modules, plus local ERPs inherited from acquisitions in some subsidiaries". My `payment-factory` example now says
"SAP S/4HANA — the group's ERP core — and local ERPs inherited from acquisitions" and is written to remain true
either way.

## 6. `content/workflows/month-end-reporting.yaml` (wf-control stream) — hedge-ratio continuity, now settled by v2.2
Line ~226 (Nov: Q1 2027 EUR 30m forwards vs EUR 40m exposure, 75%) matches my example's *state* ✓ — but canonical
v2.2 now settles the interpretation: 75% is **above** Q1 2027's 40–70% band (Q+2), a passive over-hedge; the
resolution is Daniel rolling ≈ EUR 3m of Q1 forwards to Q2 (→ 27/40 = 68%, 15/29 ≈ 51%, both in band), reported as
passive, with "no new hedges this week" meaning no new *buying*. Never "inside the 60–90% band" — that band is
Q+1 only (Q4 2026 at 25/34 = 74% is the in-band one). My `cash-forecasting.yaml`, `index.mdx` and `hedge-ratio` all
follow this now; see why-note `passive-over-hedge` (`content/why/core.yaml`) if you want to link rather than
duplicate.

## 7. Alpine week-9 downside — two files disagree with the companies page
- `content/glossary/map.yaml:882` ("cash would fall to about CHF 1.8m in week 9 … at least CHF 7m … stays undrawn")
  contradicts `content/pages/companies/alpine.mdx:68–71` (week 9: cash **CHF 5.0m**, **CHF 6.5m** drawn → CHF 5.5m
  undrawn, headroom = 5.5 + 0 = CHF 5.5m just above the board's CHF 5m floor) and the linked why-note
  `alpine-credit-line`. The map-stream numbers also break the "CHF 12m line usually 0–5m drawn" fact less badly but
  the cash figure is from a different scenario. Suggest aligning map.yaml to the alpine.mdx table (map stream).
- The same map.yaml example describes the slip as "two robot acceptances (about CHF 1.5m together)" while
  alpine.mdx:77 has one Lübeck project ("CHF 2m final payment"). Different scenario variants of the same stress —
  worth picking one story across streams.

## 8. "CHF 2m acceptance payment" contradicts canonical v2 (companies + companies-size streams)
AUTHORING v2: "Projects ≈ CHF 0.5–4m each: a 20% acceptance is ≈ CHF 0.7–0.8m, never CHF 2.0m."
- `content/pages/companies/alpine.mdx:68` — table cell "CHF 2m acceptance payment slipped"; `:77` "The CHF 2m final
  payment". If this is the combined delivery+acceptance payment of a ~CHF 2.9m project it should say so; as written
  it reads as a 20% acceptance.
- `content/glossary/companies-size.yaml:55` — "when a CHF 2m acceptance payment slips a month". Suggest "a
  CHF 0.7–0.8m acceptance payment" or "a milestone payment".
(My `alpine-credit-line` why-note sizes the slip buffer on the canonical 20% ≈ CHF 0.8m.)

## 9. Minor observations (no action strictly needed)
- `content/compare/companies.yaml:13` — "Helvetic's CHF 54m of group cash" is the 30 Sep 2026 covenant figure; next
  to the November examples (CHF 41m) a date label would help.
