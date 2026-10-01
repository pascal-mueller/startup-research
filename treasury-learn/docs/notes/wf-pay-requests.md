# Requests from wf-pay to other streams (r2 revision pass)

## 1. AUTHORING.md / canonical facts — "Swiss/SEPA Nov 2026 dates unchanged" is out of date (URGENT)
`docs/AUTHORING.md` ("Canonical facts v2", payments-standards block) and the revision brief say the Swiss **and SEPA**
November 2026 dates stand as of 30 Sep 2026. That is no longer true for SEPA: on **9 September 2026** the EPC's Payment
Scheme Management Board **delayed the 15 November 2026 end date of the unstructured address format** under all five EPC
scheme rulebooks (SCT, SCT Inst, SDD Core, SDD B2B, OCT Inst); unstructured addresses remain permitted past that date,
a new end date is to be set by the October 2026 PSMB. Primary: EPC news "EPC delays address format migration timeline"
(10 Sep 2026) and guidance document EPC153-22 **v2.2, dated 30 Sep 2026** ("a future still to be set end date"). Both are
registered as `epc-address-delay-2026` in `content/sources/wf-pay.yaml`.

As written in my files (per the "never fabricate / do not silently deviate" rules, I state the verified split):
- **Swiss domestic: 14 Nov 2026 stands** (structured/hybrid addresses mandatory in pain.001; 2009 message versions
  discontinued) — unchanged.
- **CBPR+ (cross-border): deferred** by Swift on 27 Aug 2026 (all SR2026 payments changes), new date due by December
  2026 at the latest (`swift-sr2026-deferral`). Fedwire/CHAPS moved to Nov 2027.
- **SEPA (EPC schemes): deferred** on 9 Sep 2026, new date pending (`epc-address-delay-2026`).

**Ask:** the AUTHORING.md canonical line "Swiss/SEPA Nov 2026 dates unchanged" and the revision-brief line
"Swiss 14 Nov / EPC 15 Nov 2026 dates stand as of 30 Sep 2026" should be corrected to the three-way split above.
Streams with address/migration copy to check: **systems** (`systems-swiss-2026-date` is fine — it covers the Swiss
message-version switch, which stands), **map**, **exemplars**, **wf-events**, **day**. Anything that says "SEPA
addresses must be structured from 15 Nov 2026" is now wrong.

## 2. Four-eyes wording (canonical v2.2) — for wf-control and org
`content/why/wf-control.yaml` (`four-eyes-threshold`) still states flatly "Lea prepares, Daniel releases". Canonical v2.2
clarifies: that pair describes *treasury-owned* work; for bank supplier runs the preparer may be AP (SAP F110 at
Helvetic) and the release is always treasury-side. My workflow prose now carries the v2.2 wording; please align the
hoverable's `short`/`detail` so the tooltip does not teach the narrower rule.

## 3. day (data/days.yaml) — week-6 low point (carried over from wf-control's list)
Still present in `content/data/days.yaml` (~lines 461/569) per wf-control's notes: canonical v2.2 says the 13-week low
point is **week 4** (December payrolls incl. 13th salary), bond coupon a separate later event. Not mine to fix; repeat
filing in case it was missed.

## 4. Terminology duplication (unchanged from r1)
`bec`/`business-email-compromise`, `correspondent-bank`/`correspondent-banking`, `payment-status`/`pain-002`,
`bank-account-management-term`/`ebam`, `account-analysis`/`bank-services-billing` remain duplicated across map/core and
wf-pay. I kept the wf-pay ids; propose `confusedWith` cross-links or merges into the map ids.

## 5. Note for anyone citing `afp-pfc-2026-highlights`
The same figures (76%/74%/58%/17%) are on the record in the AFP press release `afp-pfc-2026`; the review asked for the
press release to be cited instead of the underwriter PDF. My workflows now cite `afp-pfc-2026`; the highlights entry
stays registered for reuse.

## 6. Transient cross-stream state seen during verification
At one point `npm run check` showed 3 errors from `content/workflows/currency-shock.yaml` (unknown why notes
`eur-debt-natural-hedge`, `covenant-shock-pro-forma`, `price-the-exposed-currency`) — a mid-write state of the
wf-events stream; the final run is 0/0. No action needed if already resolved.
