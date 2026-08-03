import { describe, expect, it } from 'vitest';
import {
  calculate,
  getPublicCalculator,
  listPublicCalculators,
  PUBLIC_API_CALCULATOR_SLUGS,
} from './public-calculator-api';

describe('public calculator API pilot', () => {
  it('publishes only the explicit sourced pilot', () => {
    const calculators = listPublicCalculators();
    expect(calculators.map((calculator) => calculator.slug)).toEqual(PUBLIC_API_CALCULATOR_SLUGS);
    expect(calculators.every((calculator) => calculator.officialSources.length > 0)).toBe(true);
  });

  it('does not automatically expose a newly live web calculator', () => {
    expect(() => getPublicCalculator('term-life-insurance-cover-calculator-india')).toThrowError(
      /No public calculator found/
    );
    expect(() => calculate('term-life-insurance-cover-calculator-india', {})).toThrowError(
      /No public calculator found/
    );
  });

  it('keeps the reviewed personal-loan APR calculator callable', () => {
    const result = calculate('personal-loan-true-apr-calculator-india', {
      principal: 500000,
      annualInterestRate: 12,
      tenureMonths: 36,
      processingFeePercent: 2,
      gstPercent: 18,
      insuranceAndOtherUpfront: 5000,
      advanceEmis: 0,
    });

    expect(result.calculator.slug).toBe('personal-loan-true-apr-calculator-india');
    expect(result.sources.length).toBeGreaterThan(1);
    expect(result.outputs.every((output) => Number.isFinite(output.value))).toBe(true);
  });
});
