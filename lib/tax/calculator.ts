import { indiaIncomeTaxRules, TaxRegimeConfig, TaxSlab } from './indiaIncomeTaxRules';

export type TaxInput = {
  grossSalary: number;
  hraExemption: number;
  homeLoanInterest: number;
  section80C: number;
  section80D: number;
  employerNPS: number;
  otherDeductionsOldRegime: number;
  otherDeductionsBothRegimes: number;
  isSalaried: boolean;
};

export type RegimeTaxResult = {
  totalDeductions: number;
  taxableIncome: number;
  slabTaxBreakdown: { slab: TaxSlab; tax: number; amountInSlab: number }[];
  totalSlabTax: number;
  rebate: number;
  taxAfterRebate: number;
  cess: number;
  finalTax: number;
  effectiveTaxRate: number;
};

export type TaxResult = {
  taxYear: string;
  grossIncome: number;
  oldRegime: RegimeTaxResult;
  newRegime: RegimeTaxResult;
  savingsAmount: number;
  recommendedRegime: 'Old' | 'New' | 'Equal';
};

function calculateRegimeTax(
  taxableIncome: number,
  config: TaxRegimeConfig
): Pick<RegimeTaxResult, 'slabTaxBreakdown' | 'totalSlabTax' | 'rebate' | 'taxAfterRebate' | 'cess' | 'finalTax'> {
  let remainingIncome = taxableIncome;
  let totalSlabTax = 0;
  const slabTaxBreakdown = [];

  for (const slab of config.slabs) {
    const min = slab.min;
    const max = slab.max === null ? Infinity : slab.max;
    
    if (taxableIncome > min) {
      const amountInSlab = Math.min(taxableIncome, max) - min;
      const tax = amountInSlab * slab.rate;
      totalSlabTax += tax;
      slabTaxBreakdown.push({ slab, tax, amountInSlab });
    }
  }

  let rebate = 0;
  let taxAfterRebate = totalSlabTax;

  if (taxableIncome <= config.rebateLimit) {
    rebate = totalSlabTax;
    taxAfterRebate = 0;
  } else if (config.marginalReliefOnRebate && taxableIncome > config.rebateLimit) {
    // Marginal relief for 87A: If tax > (Income - RebateLimit), then tax = Income - RebateLimit
    const incomeExceedingLimit = taxableIncome - config.rebateLimit;
    if (totalSlabTax > incomeExceedingLimit) {
      rebate = totalSlabTax - incomeExceedingLimit;
      taxAfterRebate = incomeExceedingLimit;
    }
  }

  // 4% Health and Education Cess
  const cess = taxAfterRebate * 0.04;
  const finalTax = Math.round(taxAfterRebate + cess);

  return {
    slabTaxBreakdown,
    totalSlabTax,
    rebate,
    taxAfterRebate,
    cess: Math.round(cess),
    finalTax
  };
}

export function calculateIndianIncomeTax(input: TaxInput, taxYear: string): TaxResult {
  const config = indiaIncomeTaxRules[taxYear];
  if (!config) {
    throw new Error(`Tax rules for year ${taxYear} not found.`);
  }

  const { grossSalary, isSalaried } = input;

  // OLD REGIME DEDUCTIONS
  const standardDeductionOld = isSalaried ? config.oldRegime.standardDeduction : 0;
  const totalDeductionsOld = 
    standardDeductionOld + 
    input.hraExemption + 
    input.homeLoanInterest + 
    input.section80C + 
    input.section80D + 
    input.employerNPS + 
    input.otherDeductionsOldRegime + 
    input.otherDeductionsBothRegimes;
  
  const taxableIncomeOld = Math.max(0, grossSalary - totalDeductionsOld);

  // NEW REGIME DEDUCTIONS
  const standardDeductionNew = isSalaried ? config.newRegime.standardDeduction : 0;
  const totalDeductionsNew = 
    standardDeductionNew + 
    input.employerNPS + // Sec 80CCD(2) allowed in new regime
    input.otherDeductionsBothRegimes; // e.g. 80CCH Agniveer
  
  const taxableIncomeNew = Math.max(0, grossSalary - totalDeductionsNew);

  // CALCULATE TAX
  const oldRegimeResultBase = calculateRegimeTax(taxableIncomeOld, config.oldRegime);
  const newRegimeResultBase = calculateRegimeTax(taxableIncomeNew, config.newRegime);

  const oldRegime: RegimeTaxResult = {
    totalDeductions: totalDeductionsOld,
    taxableIncome: taxableIncomeOld,
    ...oldRegimeResultBase,
    effectiveTaxRate: grossSalary > 0 ? (oldRegimeResultBase.finalTax / grossSalary) * 100 : 0
  };

  const newRegime: RegimeTaxResult = {
    totalDeductions: totalDeductionsNew,
    taxableIncome: taxableIncomeNew,
    ...newRegimeResultBase,
    effectiveTaxRate: grossSalary > 0 ? (newRegimeResultBase.finalTax / grossSalary) * 100 : 0
  };

  let recommendedRegime: 'Old' | 'New' | 'Equal' = 'Equal';
  let savingsAmount = 0;

  if (oldRegime.finalTax < newRegime.finalTax) {
    recommendedRegime = 'Old';
    savingsAmount = newRegime.finalTax - oldRegime.finalTax;
  } else if (newRegime.finalTax < oldRegime.finalTax) {
    recommendedRegime = 'New';
    savingsAmount = oldRegime.finalTax - newRegime.finalTax;
  }

  return {
    taxYear,
    grossIncome: grossSalary,
    oldRegime,
    newRegime,
    savingsAmount,
    recommendedRegime
  };
}
