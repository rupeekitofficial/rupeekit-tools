export type CalculatorAnalyticsBase = {
  tool_slug: string;
  tool_category: string;
};

type NewsletterAnalyticsBase = {
  placement: 'financial_update' | 'calculator_result' | 'provider_confirmation';
  context: string;
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
  newsletter_form_viewed: NewsletterAnalyticsBase;
  newsletter_form_submitted: NewsletterAnalyticsBase;
  newsletter_confirmed: NewsletterAnalyticsBase;
};

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

type GtagParameters = Record<string, string | number | boolean>;

function sendGtagEvent(eventName: string, parameters: GtagParameters): boolean {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return false;
  window.gtag('event', eventName, parameters);
  return true;
}

export function trackAnalyticsEvent<EventName extends keyof AnalyticsEventMap>(
  eventName: EventName,
  parameters: AnalyticsEventMap[EventName]
): boolean {
  return sendGtagEvent(eventName, parameters);
}

export function trackPageView(pathname: string): boolean {
  const pageLocation =
    typeof window !== 'undefined' && window.location
      ? `${window.location.origin}${pathname}${window.location.search}`
      : pathname;
  const pageTitle = typeof document !== 'undefined' ? document.title : '';

  return sendGtagEvent('page_view', {
    page_path: pathname,
    page_location: pageLocation,
    page_title: pageTitle,
  });
}

export function trackUserEngagement(pathname: string, engagementTimeMs: number): boolean {
  if (!Number.isFinite(engagementTimeMs) || engagementTimeMs < 100) return false;

  return sendGtagEvent('user_engagement', {
    page_path: pathname,
    engagement_time_msec: Math.min(Math.round(engagementTimeMs), 3_600_000),
  });
}
