'use client';

import type { ReactNode, SyntheticEvent } from 'react';
import { useEffect, useRef, useState } from 'react';
import { trackAnalyticsEvent } from '@/lib/analytics';
import FinancialUpdatesSignup from '@/components/updates/FinancialUpdatesSignup';

const UPDATE_ALERT_TOOL_SLUGS = new Set([
  '8th-pay-commission-salary-calculator-india',
  '8th-pay-commission-arrears-calculator-india',
  '8th-pay-commission-pension-calculator-india',
  'income-tax-calculator-old-vs-new-regime-india',
  'ppf-calculator-india',
  'sukanya-samriddhi-yojana-calculator-india',
  'scss-calculator-india',
  'post-office-monthly-income-scheme-calculator-india',
]);

export default function CalculatorAnalyticsBoundary({
  toolSlug,
  toolCategory,
  children,
}: {
  toolSlug: string;
  toolCategory: string;
  children: ReactNode;
}) {
  const [hasInteracted, setHasInteracted] = useState(false);
  const hasTrackedResult = useRef(false);

  useEffect(() => {
    if (!hasInteracted || hasTrackedResult.current) return;
    hasTrackedResult.current = true;
    const parameters = { tool_slug: toolSlug, tool_category: toolCategory };
    trackAnalyticsEvent('calculator_used', parameters);
    trackAnalyticsEvent('result_viewed', parameters);
  }, [hasInteracted, toolCategory, toolSlug]);

  const markUsed = () => setHasInteracted(true);
  const markButtonUse = (event: SyntheticEvent<HTMLElement>) => {
    const target = event.target;
    if (target instanceof Element && target.closest('button')) markUsed();
  };

  const showUpdateSignup = hasInteracted && UPDATE_ALERT_TOOL_SLUGS.has(toolSlug);

  return (
    <div onChangeCapture={markUsed} onInputCapture={markUsed} onClickCapture={markButtonUse}>
      {children}
      {showUpdateSignup ? (
        <div className="mt-6">
          <FinancialUpdatesSignup placement="calculator_result" context={toolSlug} />
        </div>
      ) : null}
    </div>
  );
}
