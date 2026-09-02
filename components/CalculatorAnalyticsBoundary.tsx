'use client';

import type { ReactNode, SyntheticEvent } from 'react';
import { useEffect, useRef, useState } from 'react';
import { trackAnalyticsEvent } from '@/lib/analytics';

const CALCULATION_DEBOUNCE_MS = 350;

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
  const rootRef = useRef<HTMLDivElement | null>(null);
  const mountedAtRef = useRef<number>(0);
  const calculationCountRef = useRef(0);
  const resultPanelViewedRef = useRef(false);
  const summarySentRef = useRef(false);
  const calculationTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    mountedAtRef.current = performance.now();
  }, []);

  const elapsedMs = () => {
    if (!mountedAtRef.current) return 0;
    return Math.max(0, Math.round(performance.now() - mountedAtRef.current));
  };

  const baseParameters = () => ({ tool_slug: toolSlug, tool_category: toolCategory });

  const recordCalculation = () => {
    calculationCountRef.current += 1;
    const calculationNumber = calculationCountRef.current;
    const parameters = baseParameters();

    if (calculationNumber === 1) {
      trackAnalyticsEvent('calculator_used', parameters);
      trackAnalyticsEvent('result_viewed', parameters);
      trackAnalyticsEvent('calculation_completed', {
        ...parameters,
        calculation_number: calculationNumber,
        time_to_first_calculation_ms: elapsedMs(),
      });
      return;
    }

    trackAnalyticsEvent('calculation_completed', {
      ...parameters,
      calculation_number: calculationNumber,
    });
  };

  const scheduleCalculation = () => {
    setHasInteracted(true);
    if (calculationTimerRef.current) clearTimeout(calculationTimerRef.current);
    calculationTimerRef.current = setTimeout(recordCalculation, CALCULATION_DEBOUNCE_MS);
  };

  const markButtonUse = (event: SyntheticEvent<HTMLElement>) => {
    const target = event.target;
    if (target instanceof Element && target.closest('button')) scheduleCalculation();
  };

  useEffect(() => {
    if (!hasInteracted || resultPanelViewedRef.current || !rootRef.current) return;

    const labelledResults = rootRef.current.querySelector<HTMLElement>('[aria-label="Estimated results"]');
    const resultsHeading = Array.from(rootRef.current.querySelectorAll<HTMLElement>('h2, h3')).find((node) =>
      node.textContent?.trim().toLowerCase().includes('estimated results')
    );
    const resultPanel = labelledResults ?? resultsHeading?.parentElement ?? null;
    if (!resultPanel) return;

    const markResultViewed = () => {
      if (resultPanelViewedRef.current) return;
      resultPanelViewedRef.current = true;
      trackAnalyticsEvent('result_panel_viewed', {
        ...baseParameters(),
        calculation_number: Math.max(calculationCountRef.current, 1),
      });
    };

    if (typeof IntersectionObserver === 'undefined') {
      const rect = resultPanel.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) markResultViewed();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting && entry.intersectionRatio >= 0.25)) {
          markResultViewed();
          observer.disconnect();
        }
      },
      { threshold: [0.25] }
    );
    observer.observe(resultPanel);
    return () => observer.disconnect();
  }, [hasInteracted, toolCategory, toolSlug]);

  useEffect(() => {
    const finishSession = (reason: 'pagehide' | 'unmount') => {
      if (summarySentRef.current) return;
      summarySentRef.current = true;
      if (calculationTimerRef.current) {
        clearTimeout(calculationTimerRef.current);
        calculationTimerRef.current = null;
      }

      const engagementTime = elapsedMs();
      const parameters = baseParameters();
      if (calculationCountRef.current === 0) {
        trackAnalyticsEvent('calculator_abandoned', {
          ...parameters,
          engagement_time_msec: engagementTime,
          reason,
        });
        return;
      }

      trackAnalyticsEvent('calculator_session_summary', {
        ...parameters,
        calculations: calculationCountRef.current,
        recalculations: Math.max(calculationCountRef.current - 1, 0),
        result_panel_viewed: resultPanelViewedRef.current,
        engagement_time_msec: engagementTime,
      });
    };

    const onPageHide = () => finishSession('pagehide');
    window.addEventListener('pagehide', onPageHide);
    return () => {
      window.removeEventListener('pagehide', onPageHide);
      finishSession('unmount');
    };
  }, [toolCategory, toolSlug]);

  return (
    <div
      ref={rootRef}
      onChangeCapture={scheduleCalculation}
      onInputCapture={scheduleCalculation}
      onClickCapture={markButtonUse}
    >
      {children}
    </div>
  );
}
