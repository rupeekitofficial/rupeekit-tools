'use client';

import React from 'react';
import type { Tool } from '@/lib/tools';
import SalaryInHandCalculatorV2 from './SalaryInHandCalculatorV2';
import GstCalculatorV2 from './GstCalculatorV2';
import { ADVANCED_CALCULATORS } from '@/lib/advanced-calculators';

export default function AdvancedCalculatorRenderer({ tool }: { tool: Tool }) {
  if (tool.slug === ADVANCED_CALCULATORS.SALARY) {
    return <SalaryInHandCalculatorV2 tool={tool} />;
  }

  if (tool.slug === ADVANCED_CALCULATORS.GST) {
    return <GstCalculatorV2 tool={tool} />;
  }

  return null;
}
