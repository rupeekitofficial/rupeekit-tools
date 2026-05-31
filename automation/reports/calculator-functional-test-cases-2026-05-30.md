# Calculator Functional Test Cases (2026-05-30)

## Scope
- Shared calculator renderer: `components/Calculator.tsx`
- SIP planner: `components/sip/SipPlannerCalculator.tsx`
- Advanced calculators:
  - `salary-in-hand-calculator-india`
  - `gst-calculator-india`
  - `income-tax-calculator-old-vs-new-regime-india` (advanced renderer path)
- Dedicated income-tax page app: `components/tax/*` used by `app/tools/income-tax-calculator-old-vs-new-regime-india/page.tsx`
- Data-driven tools in `data/tools.json`

## Test Cases

### A. Numeric Input Behavior
1. Clearing a numeric input and retyping must not keep a forced leading zero prefix (`010`, `0100`, `01251`).
2. Empty input state should be editable, and recovered value should normalize to a valid number.
3. Input sanitization should ignore non-digits for legacy text-based currency inputs.
4. Leading zeros in typed raw input should normalize to canonical numeric value.

### B. SIP Preset Buttons
1. `Conservative 8%` sets expected return to 8.
2. `Moderate 10%` sets expected return to 10.
3. `Growth 12%` sets expected return to 12.
4. `Custom` button should be actionable:
   - restores last non-preset custom return when currently on a preset
   - focuses the expected return input for direct edit.

### C. Formula and Core Result Smoke Tests (All Tool Slugs)
1. Every tool output formula evaluates successfully with default inputs.
2. Every evaluated output is finite (not `NaN` / `Infinity`).

### D. Regression Safety
1. Lint passes.
2. Build passes.
3. Existing validator scripts pass.

## Execution Results
- Numeric parsing unit tests: **PASS**
- SIP preset helper tests: **PASS**
- Tool formula smoke test across all tool slugs: **PASS**
- `npm run test`: **PASS**
- `npm run validate`: **PASS**
- `npm run validate:ai-seo`: **PASS**
- `npm run lint`: **PASS**
- `npm run build`: **PASS**

## Bugs Found and Fixed
1. SIP input fields forced empty values back to `0`, causing bad re-entry UX and leading-zero behavior.
2. SIP `Custom` preset button had no `onClick` handler.
3. Legacy income-tax text inputs did not normalize leading zeros and lacked robust digit-only normalization path.
