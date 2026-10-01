# Stream wf-events — requests for other authors (revision pass, Sep 2026)

These are fixes needed in files I do NOT own. All of them were flagged in `docs/reviews/wf-events-r1.md` or found
during the v2.2 canonical sweep.

## Owner of `content/compare/wf-events.yaml` (compare was excluded from my revision ownership)
1. `events-missing-receivables` → helvetic cell: *"absorbed by CHF 140m undrawn RCF"* → **CHF 137m undrawn** (canonical
   post-rollover state: CHF 30m + EUR 35m drawn ≈ CHF 63m of the CHF 200m line).
2. `events-currency-shock` → helvetic cell: *"briefs the CFO by 14:00"* → **14:10** (aligns with the currency-shock
   example; the compare cell is one of two minor r1 findings).
3. `events-currency-shock` → helvetic cell: *"the EUR 81m forward book (+CHF 6.1m MTM)"* → **+CHF 6.2m** — the example
   now prices the 5-month forward at ≈ 0.852 (€STR 2.2–2.4% per v2.1), so 81 × (0.928 − 0.852) = 6.2.
4. `events-acquisition` → helvetic cell: *"funds flow of EUR 120m on closing day"* → EUR 120m is now the **total funding
   requirement including fees**; the enterprise value is **EUR 117.7m** (equity 95.7 incl. escrow + 22 debt repaid).

## Coordinator / cross-stream consistency
5. **Alpine's operating cash floor is not canonical.** My liquidity-crisis example uses minimum cash **CHF 1.5m** and a
   line drawn CHF 3m/12 at the start of the squeeze (both re-derived in the example); `content/why/companies-size.yaml`
   (`alpine-headroom-floor`) uses **CHF 5.5m** with CHF 6.5m/12 drawn in its own scenario. Both are labelled scenario
   assumptions, but a round-2 reviewer will flag "two Alpine floors". Suggest a canonical fact (my vote: CHF 1.5–2.0m
   operating minimum, board talking about raising it).
6. **Exemplar group-cash vs canonical net-debt tension** (flagged by the reviewer, unresolved centrally): canonical net
   debt CHF 106m implies ≈ CHF 54m group cash at 30 Sep 2026 (100 bond + 60.2 drawings − 54 cash), while the exemplar
   day/forecast pages run group cash at CHF 35–52m through Nov 2026. wf-events follows canonical; the trajectory
   question is for the exemplars' owner + AUTHORING.md.
7. **Two Helvetic acquisition hypotheticals.** `covenant-monitoring.yaml` "Project Lario" (closing Mar 2027, CHF 92m
   deal drawing → RCF CHF 155m drawn / CHF 45m undrawn) reads as if the RCF were still at ≈ CHF 63m drawn at that date,
   but the Norvia acquisition (acquisition-integration example, closing 30 Oct 2026) leaves ≈ CHF 158m drawn. Either
   state that Norvia's CHF 95m was termed out first (my example proposes a CHF 75m Schuldschein within 12 months), or
   label Project Lario "hypothetical, standalone". No numbers need to change if the disclaimer is added.

## Done in this pass (for the record)
- Burckhardt citation corrected (7.9% = Compressor Systems **segment**, group −0.6%, cause = customers postponing
  large projects, not the SNB decision) in `currency-shock.yaml` and `sources/wf-events.yaml`.
- Swissmem source note corrected to 51% (Mar 2015) / 69% (Jun 2015) price cuts, 18% relocation, 77% cost blocks into EUR.
- Clariant bonus-target and Tecan subsequent-events marked UNVERIFIED (R1) in prose and source notes.
- Art. 725 CO flag resolved confidently (revised company law, in force 1 Jan 2023; new source `co-art-725`).
