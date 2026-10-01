# Revision pass brief (author role)

You are the AUTHOR for one module of the Treasury Field Manual. Your review round is done; your job is to make the
module pass the next round. Read `docs/AUTHORING.md` fully — especially **Canonical facts v2 and v2.1**, which resolve
every cross-file contradiction the reviews found — plus `content/companies.yaml` (ground truth) and your review file
`docs/reviews/<module>-r1.md`.

## Task A — fix the review findings
Fix every critical and major issue in your review, and as many minor ones as sensible. Where the review gives a fix
direction, follow it. Where two reviews disagree, `docs/AUTHORING.md` canonical facts v2/v2.1 has the resolution.

## Task B — "why" pass over every example (do this after Task A)
For every worked example and every non-obvious number, threshold or decision in your files:
1. Derive the why on paper (from `companies.yaml` + canonical facts).
2. If the derivation does NOT hold, the example is wrong: fix the example (the number, the scenario, or the claim).
3. Add a why-note in `content/why/<stream>.yaml` (schema in AUTHORING.md) and link it inline `[claim](why:id)` or
   `<Why id="id">text</Why>` wherever the number/decision appears in prose. At least 5 per module; be generous where a
   founder would ask "why that number?" (sizings, thresholds, decision rules, judgment calls in worked examples).
   Do not add hoverables for things the text already explains in one breath inline.

## Task C — verify
1. `npm run check` — 0 errors, 0 warnings from your files.
2. `npx tsc --noEmit` if you touched `src/`.
3. Screenshot your routes: `node scripts/shot.mjs "$TMPDIR/<stream>-v2" "/route,..." --full` — no MISSING refs, no
   runtime errors. View one PNG. To verify a popover renders, hover with a one-off playwright snippet.
4. Update `docs/notes/<stream>.md`: what you changed, why-notes added, anything unresolved.
   Fixes needed in files you do NOT own go in `docs/notes/<stream>-requests.md` — never edit another stream's files.

## Files and ownership
You own ONLY the files listed in your assignment (including their glossary/sources/why files). `content/companies.yaml`
and `docs/AUTHORING.md` are read-only for you: if a canonical fact is wrong, write a request. Never run git state
commands. A dev server runs at http://localhost:5173.

## Report back (final message)
Scores target: all ≥8 with no critical issues. List: review issues fixed (with file:line), issues left unfixed and why,
why-notes added (ids), examples corrected because the why failed, and requests for other streams.
