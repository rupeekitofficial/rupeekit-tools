export const SEARCH_GROWTH_RULESET_VERSION = '2026-08-17.1';

const nonNegative = (value: number) => (Number.isFinite(value) ? Math.max(0, value) : 0);
const clamp = (value: number, minimum: number, maximum: number) =>
  Math.min(maximum, Math.max(minimum, Number.isFinite(value) ? value : minimum));

export function calculateReducingBalanceEmi(
  principalInput: number,
  annualRateInput: number,
  tenureMonthsInput: number
) {
  const principal = nonNegative(principalInput);
  const annualRate = nonNegative(annualRateInput);
  const tenureMonths = Math.max(1, Math.round(nonNegative(tenureMonthsInput)));
  const monthlyRate = annualRate / 12 / 100;

  if (principal === 0) return 0;
  if (monthlyRate === 0) return principal / tenureMonths;

  const growth = (1 + monthlyRate) ** tenureMonths;
  return (principal * monthlyRate * growth) / (growth - 1);
}

export type EighthPayCommissionInputs = {
  currentBasic: number;
  currentDaPercent: number;
  currentHraPercent: number;
  currentTransportAllowance: number;
  fitmentFactor: number;
  projectedDaPercent: number;
  projectedHraPercent: number;
  projectedTransportAllowance: number;
};

export function calculateEighthPayCommission(inputs: EighthPayCommissionInputs) {
  const currentBasic = nonNegative(inputs.currentBasic);
  const currentDaPercent = nonNegative(inputs.currentDaPercent);
  const currentHraPercent = nonNegative(inputs.currentHraPercent);
  const currentTransportAllowance = nonNegative(inputs.currentTransportAllowance);
  const fitmentFactor = nonNegative(inputs.fitmentFactor);
  const projectedDaPercent = nonNegative(inputs.projectedDaPercent);
  const projectedHraPercent = nonNegative(inputs.projectedHraPercent);
  const projectedTransportAllowance = nonNegative(inputs.projectedTransportAllowance);

  const currentDa = currentBasic * currentDaPercent / 100;
  const currentHra = currentBasic * currentHraPercent / 100;
  const currentGross = currentBasic + currentDa + currentHra + currentTransportAllowance;

  // The selected fitment factor is applied once to current basic pay. Current DA is
  // shown only in the current-pay baseline, so it cannot be counted twice.
  const revisedBasic = currentBasic * fitmentFactor;
  const projectedDa = revisedBasic * projectedDaPercent / 100;
  const projectedHra = revisedBasic * projectedHraPercent / 100;
  const projectedGross = revisedBasic + projectedDa + projectedHra + projectedTransportAllowance;
  const basicIncrease = revisedBasic - currentBasic;
  const grossChange = projectedGross - currentGross;

  return {
    currentBasic,
    currentDa,
    currentHra,
    currentTransportAllowance,
    currentGross,
    revisedBasic,
    projectedDa,
    projectedHra,
    projectedTransportAllowance,
    projectedGross,
    basicIncrease,
    grossChange,
    grossChangePercent: currentGross > 0 ? grossChange / currentGross * 100 : 0,
  };
}

export function getGoldLoanLtvCap(totalConsumptionLoanAmountInput: number) {
  const amount = nonNegative(totalConsumptionLoanAmountInput);
  if (amount <= 250_000) return 85;
  if (amount <= 500_000) return 80;
  return 75;
}

/**
 * Returns the largest loan that is self-consistent with the RBI consumption-loan
 * brackets. The capped values at Rs 2.5 lakh and Rs 5 lakh cover the transition
 * zones where moving into the next bracket would lower the permitted LTV.
 */
export function calculateMaximumGoldLoanFromValue(assessedGoldValueInput: number) {
  const assessedGoldValue = nonNegative(assessedGoldValueInput);
  const tierOne = Math.min(assessedGoldValue * 0.85, 250_000);
  const tierTwoUncapped = assessedGoldValue * 0.8;
  const tierTwo = tierTwoUncapped > 250_000 ? Math.min(tierTwoUncapped, 500_000) : 0;
  const tierThreeUncapped = assessedGoldValue * 0.75;
  const tierThree = tierThreeUncapped > 500_000 ? tierThreeUncapped : 0;
  return Math.max(tierOne, tierTwo, tierThree);
}

export type GoldLoanInputs = {
  netGoldWeightGrams: number;
  purityKarat: number;
  lenderReferencePrice24k: number;
  requestedLoanAmount: number;
  annualRate: number;
  tenureMonths: number;
};

export function calculateGoldLoan(inputs: GoldLoanInputs) {
  const netGoldWeightGrams = nonNegative(inputs.netGoldWeightGrams);
  const purityKarat = clamp(inputs.purityKarat, 0, 24);
  const lenderReferencePrice24k = nonNegative(inputs.lenderReferencePrice24k);
  const requestedLoanAmount = nonNegative(inputs.requestedLoanAmount);

  const assessedGoldValue = netGoldWeightGrams * lenderReferencePrice24k * purityKarat / 24;
  const requestedAmountLtvCapPercent = getGoldLoanLtvCap(requestedLoanAmount);
  const collateralLimitForRequestedBracket = assessedGoldValue * requestedAmountLtvCapPercent / 100;
  const maximumEligibleLoan = calculateMaximumGoldLoanFromValue(assessedGoldValue);
  const estimatedFundableAmount = Math.min(requestedLoanAmount, maximumEligibleLoan);
  const monthlyEmi = calculateReducingBalanceEmi(
    estimatedFundableAmount,
    inputs.annualRate,
    inputs.tenureMonths
  );
  const tenureMonths = Math.max(1, Math.round(nonNegative(inputs.tenureMonths)));
  const totalRepayment = monthlyEmi * tenureMonths;

  return {
    assessedGoldValue,
    requestedAmountLtvCapPercent,
    collateralLimitForRequestedBracket,
    maximumEligibleLoan,
    estimatedFundableAmount,
    requestedLtvPercent: assessedGoldValue > 0 ? requestedLoanAmount / assessedGoldValue * 100 : 0,
    requestedAmountWithinMaximum: requestedLoanAmount <= maximumEligibleLoan,
    shortfallAgainstRequest: Math.max(0, requestedLoanAmount - maximumEligibleLoan),
    monthlyEmi,
    totalRepayment,
    totalInterest: Math.max(0, totalRepayment - estimatedFundableAmount),
  };
}

export type PersonalLoanEligibilityInputs = {
  monthlyIncome: number;
  existingMonthlyEmi: number;
  foirPercent: number;
  annualRate: number;
  tenureMonths: number;
};

export function calculatePersonalLoanEligibility(inputs: PersonalLoanEligibilityInputs) {
  const monthlyIncome = nonNegative(inputs.monthlyIncome);
  const existingMonthlyEmi = nonNegative(inputs.existingMonthlyEmi);
  const foirPercent = clamp(inputs.foirPercent, 0, 100);
  const annualRate = nonNegative(inputs.annualRate);
  const tenureMonths = Math.max(1, Math.round(nonNegative(inputs.tenureMonths)));
  const totalEmiCap = monthlyIncome * foirPercent / 100;
  const maxAffordableEmi = Math.max(0, totalEmiCap - existingMonthlyEmi);
  const monthlyRate = annualRate / 12 / 100;

  const eligibleLoanAmount = monthlyRate === 0
    ? maxAffordableEmi * tenureMonths
    : maxAffordableEmi * (((1 + monthlyRate) ** tenureMonths) - 1)
      / (monthlyRate * (1 + monthlyRate) ** tenureMonths);
  const totalRepayment = maxAffordableEmi * tenureMonths;

  return {
    totalEmiCap,
    maxAffordableEmi,
    eligibleLoanAmount,
    totalRepayment,
    totalInterest: Math.max(0, totalRepayment - eligibleLoanAmount),
    existingObligationPercent: monthlyIncome > 0 ? existingMonthlyEmi / monthlyIncome * 100 : 0,
    hasAvailableCapacity: maxAffordableEmi > 0,
  };
}

export type SsyProjectionInputs = {
  girlAgeAtOpening: number;
  accountAgeYears: number;
  currentBalance: number;
  annualDeposit: number;
  annualInterestRate: number;
};

export function calculateSsyProjection(inputs: SsyProjectionInputs) {
  const girlAgeAtOpening = nonNegative(inputs.girlAgeAtOpening);
  const accountAgeYears = Math.min(21, Math.floor(nonNegative(inputs.accountAgeYears)));
  const currentBalance = nonNegative(inputs.currentBalance);
  const annualDeposit = Math.min(150_000, nonNegative(inputs.annualDeposit));
  const annualInterestRate = nonNegative(inputs.annualInterestRate);
  const annualRate = annualInterestRate / 100;
  const remainingDepositYears = Math.max(0, 15 - accountAgeYears);
  const yearsToMaturity = Math.max(0, 21 - accountAgeYears);

  let projectedBalance = currentBalance;
  for (let projectionYear = 0; projectionYear < yearsToMaturity; projectionYear += 1) {
    const schemeYear = accountAgeYears + projectionYear;
    if (schemeYear < 15) projectedBalance += annualDeposit;
    projectedBalance *= 1 + annualRate;
  }

  const futureDeposits = annualDeposit * remainingDepositYears;
  return {
    eligibleOpeningAge: girlAgeAtOpening < 10,
    accountAgeYears,
    remainingDepositYears,
    yearsToMaturity,
    futureDeposits,
    projectedMaturityAmount: projectedBalance,
    projectedInterestFromToday: Math.max(0, projectedBalance - currentBalance - futureDeposits),
  };
}
