# Requests for other streams — companies-size revision pass (v2)

These are fixes in files I do not own. Everything in `content/pages/companies/*`, `content/pages/size/*`,
`content/compare/companies.yaml`, `content/glossary/companies-size.yaml` and `content/why/companies-size.yaml` has been
fixed on my side; the items below only concern other streams' files.

## Sources (`content/sources/*` — not mine to edit)
1. **`core.yaml`, `afp-bench-2026`**: the note still says *"A '46% of teams have fewer than five people' figure
   previously attributed to this report could not be verified and has been removed from the exemplar pages."*
   Canonical facts v2 now says the figure is **VERIFIED** (org review r1, AFP publisher) and allowed with
   `afp-bench-2026`. My pages (`/size`, `/size/midmarket`) keep the stat with that citation. Please update the note so
   the registry stops contradicting the pages (other pages — org, competitors — cite it the same way).
2. **`companies-size.yaml`**: per the r1 review, these entries were confirmed against the original publisher and can
   lose or soften their "(search snippet)" markers: `pwc-gts-2023` (confirmed in PwC Germany's PDF), `seco-kmu-finanzierung-2021`
   (confirmed at kmu.admin.ch + the study PDF), and the AFP 2025 sources registered in core.yaml. `clariant-frm-2020`,
   `clariant-cash-mgmt-job`, `schindler-holding-2021` stay snippet-marked. `kyriba-act-2013`: consider adding the
   ACT-hosted PDF (treasurers.org/ACTmedia/ACT-Kyriba%20survey.pdf — see r1 review for the exact path) alongside the
   Global Treasurer news item.

## Canonical fact violations in other streams
3. **`pages/map/debt.mdx` (~line 53)**: *"the RCF runs to 2027"* → the RCF matures **Oct 2028** (same year as the
   CHF 100m bond). The 2026 amend-and-extend story is still fine, but the reason is "both instruments mature in 2028".
4. **`pages/map/debt.mdx` (~line 93)**: *"Covenant EBITDA (LTM) | Reported CHF 85m + CHF 3m restructuring add-back |
   CHF 88m"* → canonical LTM (30 Sep 2026) EBITDA is **≈ CHF 78m**. Any add-back presentation needs an explicit bridge.
5. **`compare/map.yaml`, `co-fx-hedging` helvetic cell**: *"hedge accounting under IFRS 9"* → Helvetic reports under
   **Swiss GAAP FER**; there is no IFRS 9 designation. The graded bands are management policy (see
   `why:fer-vs-ifrs-pack`). GlobalChem is the IFRS 9 case.
6. **€STR level**: `data/lens.yaml` (~line 305), `pages/map/investments.mdx` (~line 29) and
   `pages/systems/market-data.mdx` (~line 22) still say *"€STR ≈ 1.9–2.0%"*. Canonical v2.1: **€STR ≈ 2.2–2.4%**
   (ECB, Q3-2026 average ~2.2%, 2.44% on 28 Sep 2026).
7. **`pages/org/handoffs.mdx` (~line 32)**: *"Modelled on Helvetic, fortnightly cycle"* → canonical: never
   "fortnightly"; the 13-week forecast is **weekly** (subsidiaries submit Tuesday noon, Lea consolidates Tue–Wed,
   Daniel reviews Wednesday).
8. **`pages/org/roles-fx-risk.mdx` (~line 36) and `pages/org/roles-analyst.mdx` (~line 33)**: *"the 60–90% band"* as a
   flat band → the policy bands are **graded by quarter** (Q+1 60–90%, Q+2 40–70%, Q+3 25–55%, Q+4 0–40%); "60–90%" is
   the Q+1 band only.
9. **`why/wf-risk.yaml`, `net-debt-lender-view`**: uses *"the CHF 7.9m in China"*; `why/wf-control.yaml`'s
   `china-cash-excluded` and the gold workflows use CNY ≈ 55m ≈ **CHF 6.1m**. Canonical example balance is
   **CNY ≈ 55m** (≈ CHF 6m at illustrative rates) — please reconcile the 7.9 figure.

## Minor / optional
10. **`workflows/covenant-monitoring.yaml`** (companies block): *"comfortable at ~1.4x on current facts"* — the
    canonical ratio is 1.36x; "~1.4x" reads as a rounded restatement, which is fine if intended, but the canonical
    wording is ≈ 1.36x.
11. **Glossary (whoever owns the Alpine sweep example)**: the German sweep threshold should be in EUR, not CHF 500k.
12. **Glossary (owner of the cash-concentration example)**: "Before its cash pool, Helvetic's Daniel concentrated cash
    manually" — canonical: Helvetic has **no** cash pool (at most "under evaluation").
