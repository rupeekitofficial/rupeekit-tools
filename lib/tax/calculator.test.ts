import { describe, it, expect } from 'vitest';
import { calculateIndianIncomeTax, TaxInput } from './calculator';

describe('calculateIndianIncomeTax - FY 2024-25', () => {
  const taxYear = '2024-25';

  const baseInput: TaxInput = {
    grossSalary: 0,
    hraExemption: 0,
    homeLoanInterest: 0,
    section80C: 0,
    section80D: 0,
    employerNPS: 0,
    otherDeductionsOldRegime: 0,
    otherDeductionsBothRegimes: 0,
    isSalaried: true,
    ageGroup: 'below60',
  };

  it('should return 0 tax for zero income', () => {
    const result = calculateIndianIncomeTax({ ...baseInput, grossSalary: 0 }, taxYear);
    expect(result.oldRegime.finalTax).toBe(0);
    expect(result.newRegime.finalTax).toBe(0);
  });

  it('should apply standard deduction correctly', () => {
    // 800,000 gross. Old regime std: 50,000. New regime std: 75,000
    const result = calculateIndianIncomeTax({ ...baseInput, grossSalary: 800000 }, taxYear);
    expect(result.oldRegime.taxableIncome).toBe(750000);
    expect(result.newRegime.taxableIncome).toBe(725000);
  });

  it('should apply Section 87A rebate and return 0 tax below limits', () => {
    // Old regime limit: 5L. So gross 5.5L with 50k std ded = 5L taxable.
    const resultOld = calculateIndianIncomeTax({ ...baseInput, grossSalary: 550000 }, taxYear);
    expect(resultOld.oldRegime.finalTax).toBe(0);

    // New regime limit: 7L. So gross 7.75L with 75k std ded = 7L taxable.
    const resultNew = calculateIndianIncomeTax({ ...baseInput, grossSalary: 775000 }, taxYear);
    expect(resultNew.newRegime.finalTax).toBe(0);
  });

  it('should apply marginal relief correctly in new regime', () => {
    // Gross 7.76L -> taxable 7.01L in new regime.
    // Tax without relief:
    // 3L to 7L (4L * 5% = 20k)
    // 7L to 7.01L (1k * 10% = 100)
    // Total slab tax = 20100.
    // Income exceeding limit = 1000.
    // Since 20100 > 1000, marginal relief applies.
    // Tax after rebate = 1000.
    // Cess 4% = 40.
    // Final tax = 1040.
    const result = calculateIndianIncomeTax({ ...baseInput, grossSalary: 776000 }, taxYear);
    expect(result.newRegime.rebate).toBe(19100);
    expect(result.newRegime.taxAfterRebate).toBe(1000);
    expect(result.newRegime.cess).toBe(40);
    expect(result.newRegime.finalTax).toBe(1040);
  });

  it('should calculate old regime with deductions accurately', () => {
    const input: TaxInput = {
      ...baseInput,
      grossSalary: 1200000,
      section80C: 150000,
      hraExemption: 100000,
      section80D: 25000,
    };
    const result = calculateIndianIncomeTax(input, taxYear);
    
    // Total Old Deds = 50k (std) + 150k + 100k + 25k = 325,000
    // Taxable Old = 12,00,000 - 325,000 = 8,75,000
    // Slabs Old: 0-2.5L (0), 2.5-5L (12500), 5-8.75L (3.75L * 20% = 75000) = 87500
    // Cess: 87500 * 0.04 = 3500
    // Final Old = 91000
    expect(result.oldRegime.taxableIncome).toBe(875000);
    expect(result.oldRegime.finalTax).toBe(91000);

    // New Deds = 75k (std)
    // Taxable New = 11,25,000
    // Slabs New: 0-3L(0), 3-7L(20k), 7-10L(30k), 10-11.25L(1.25L*15%=18750) = 68750
    // Cess: 68750 * 0.04 = 2750
    // Final New = 71500
    expect(result.newRegime.taxableIncome).toBe(1125000);
    expect(result.newRegime.finalTax).toBe(71500);

    expect(result.recommendedRegime).toBe('New');
    expect(result.savingsAmount).toBe(19500);
  });

  it('should support FY 2025-26 slabs and rebate for the new regime', () => {
    const result = calculateIndianIncomeTax({ ...baseInput, grossSalary: 1275000 }, '2025-26');
    expect(result.newRegime.taxableIncome).toBe(1200000);
    expect(result.newRegime.rebate).toBe(60000);
    expect(result.newRegime.finalTax).toBe(0);
  });

  it('should apply age-based old regime slabs for senior citizens', () => {
    const result = calculateIndianIncomeTax({ ...baseInput, grossSalary: 700000, ageGroup: 'senior' }, taxYear);
    expect(result.oldRegime.taxableIncome).toBe(650000);
    expect(result.oldRegime.finalTax).toBeGreaterThan(0);
  });
});
