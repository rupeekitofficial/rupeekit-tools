// Registry mapping specific tool slugs to advanced V2 components

export const ADVANCED_CALCULATORS = {
  SALARY: 'salary-in-hand-calculator-india',
  GST: 'gst-calculator-india',
  INCOME_TAX: 'income-tax-calculator-old-vs-new-regime-india',
  PERSONAL_LOAN_APR: 'personal-loan-true-apr-calculator-india',
} as const;

export type AdvancedCalculatorSlug = typeof ADVANCED_CALCULATORS[keyof typeof ADVANCED_CALCULATORS];

export function isAdvancedCalculator(slug: string): boolean {
  return Object.values(ADVANCED_CALCULATORS).includes(slug as any);
}
