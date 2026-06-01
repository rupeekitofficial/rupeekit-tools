# FY 2025-26 Tax Rule Implementation TODO

Date: June 1, 2026 (IST)
Owner: RupeeKit engineering
Scope: `/tools/income-tax-calculator-old-vs-new-regime-india`

## Current status
- FY 2025-26 (AY 2026-27) is not configured in `lib/tax/indiaIncomeTaxRules.ts`.
- Currently supported years in code: FY 2024-25 and FY 2023-24.

## Required implementation steps
1. Add FY 2025-26 rule object in `lib/tax/indiaIncomeTaxRules.ts`.
2. Confirm old-regime slab, new-regime slab, standard deduction, rebate limits, basic exemption, and marginal relief logic from official notifications.
3. Confirm cess handling remains 4% and update only if officially changed.
4. Verify allowed deductions/exemptions under each regime for FY 2025-26 assumptions used in UI labels and help text.
5. Update FY selector defaults/messages in `components/tax/TaxInputForm.tsx`.
6. Update tool metadata and page copy only after rule object is verified and merged.

## Verification checklist (must pass before release)
1. Cross-check sample salary/deduction scenarios against official utility outputs from Income Tax India portal.
2. Re-run scenario checks for rebate edge cases and marginal-relief thresholds.
3. Validate old/new comparison for at least 10 salary+deduction combinations across low/mid/high incomes.
4. Run:
   - `npm run validate`
   - `npm run lint`
   - `npm run build`
5. Review final page content to ensure no unsupported FY claims remain.

## References
- Income Tax India portal: https://www.incometax.gov.in/iec/foportal/
- Use applicable Budget/Finance Act notifications for FY 2025-26 before changing rules.
