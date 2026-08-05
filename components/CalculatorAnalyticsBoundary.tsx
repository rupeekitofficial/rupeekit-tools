'use client';

import type { ReactNode, SyntheticEvent } from 'react';
import { useEffect, useRef, useState } from 'react';
import { trackAnalyticsEvent } from '@/lib/analytics';

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

  return (
    <div onChangeCapture={markUsed} onInputCapture={markUsed} onClickCapture={markButtonUse}>
      {children}
    </div>
  );
}
