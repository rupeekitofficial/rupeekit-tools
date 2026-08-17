'use client';

import React from 'react';
import type { Tool } from '@/lib/tools';
import SalaryInHandCalculatorV2 from './SalaryInHandCalculatorV2';
import GstCalculatorV2 from './GstCalculatorV2';
import IncomeTaxCalculatorV2 from './IncomeTaxCalculatorV2';
import PersonalLoanAprCalculator from './PersonalLoanAprCalculator';
import EighthPayCommissionCalculator from './EighthPayCommissionCalculator';
import EighthPayCommissionArrearsCalculator from './EighthPayCommissionArrearsCalculator';
import EighthPayCommissionPensionCalculator from './EighthPayCommissionPensionCalculator';
import GoldLoanCalculatorV2 from './GoldLoanCalculatorV2';
import PersonalLoanEligibilityCalculatorV2 from './PersonalLoanEligibilityCalculatorV2';
import SsyCalculatorV2 from './SsyCalculatorV2';
import { ADVANCED_CALCULATORS } from '@/lib/advanced-calculators';

export default function AdvancedCalculatorRenderer({ tool }: { tool: Tool }) {
  if (tool.slug === ADVANCED_CALCULATORS.SALARY) {
    return <SalaryInHandCalculatorV2 tool={tool} />;
  }

  if (tool.slug === ADVANCED_CALCULATORS.GST) {
    return <GstCalculatorV2 tool={tool} />;
  }

  if (tool.slug === ADVANCED_CALCULATORS.INCOME_TAX) {
    return <IncomeTaxCalculatorV2 tool={tool} />;
  }

  if (tool.slug === ADVANCED_CALCULATORS.PERSONAL_LOAN_APR) {
    return <PersonalLoanAprCalculator tool={tool} />;
  }

  if (tool.slug === ADVANCED_CALCULATORS.EIGHTH_PAY_COMMISSION) {
    return <EighthPayCommissionCalculator tool={tool} />;
  }

  if (tool.slug === ADVANCED_CALCULATORS.EIGHTH_PAY_COMMISSION_ARREARS) {
    return <EighthPayCommissionArrearsCalculator tool={tool} />;
  }

  if (tool.slug === ADVANCED_CALCULATORS.EIGHTH_PAY_COMMISSION_PENSION) {
    return <EighthPayCommissionPensionCalculator tool={tool} />;
  }

  if (tool.slug === ADVANCED_CALCULATORS.GOLD_LOAN) {
    return <GoldLoanCalculatorV2 tool={tool} />;
  }

  if (tool.slug === ADVANCED_CALCULATORS.PERSONAL_LOAN_ELIGIBILITY) {
    return <PersonalLoanEligibilityCalculatorV2 tool={tool} />;
  }

  if (tool.slug === ADVANCED_CALCULATORS.SSY) {
    return <SsyCalculatorV2 tool={tool} />;
  }

  return null;
}
