export type CalculatorAnalyticsBase = {
  tool_slug: string;
  tool_category: string;
};

export type AnalyticsEventMap = {
  calculator_used: CalculatorAnalyticsBase;
  result_viewed: CalculatorAnalyticsBase;
  guide_click: CalculatorAnalyticsBase & {
    destination: string;
  };
  tool_cta_click: CalculatorAnalyticsBase & {
    destination: string;
    cta_type: 'related_tool' | 'resource';
  };
};

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackAnalyticsEvent<EventName extends keyof AnalyticsEventMap>(
  eventName: EventName,
  parameters: AnalyticsEventMap[EventName]
): boolean {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return false;
  window.gtag('event', eventName, parameters);
  return true;
}
