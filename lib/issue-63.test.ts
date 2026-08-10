import { afterEach, describe, expect, it, vi } from 'vitest';
import { trackAnalyticsEvent, trackPageView } from './analytics';

describe('issue #63 analytics plumbing', () => {
  afterEach(() => vi.unstubAllGlobals());

  it('keeps calculator events safe when gtag is blocked', () => {
    vi.stubGlobal('window', {});

    expect(
      trackAnalyticsEvent('result_viewed', {
        tool_slug: 'term-life-insurance-cover-calculator-india',
        tool_category: 'Insurance',
      })
    ).toBe(false);
  });

  it('sends explicit route page views', () => {
    const gtag = vi.fn();
    vi.stubGlobal('window', {
      gtag,
      location: {
        origin: 'https://www.rupeekit.co.in',
        search: '',
      },
    });
    vi.stubGlobal('document', { title: 'RupeeKit calculator' });

    expect(trackPageView('/tools/sip-calculator-india')).toBe(true);
    expect(gtag).toHaveBeenCalledWith('event', 'page_view', {
      page_path: '/tools/sip-calculator-india',
      page_location: 'https://www.rupeekit.co.in/tools/sip-calculator-india',
      page_title: 'RupeeKit calculator',
    });
  });

  it('preserves query strings in page_location', () => {
    const gtag = vi.fn();
    vi.stubGlobal('window', {
      gtag,
      location: {
        origin: 'https://www.rupeekit.co.in',
        search: '?utm_source=newsletter',
      },
    });
    vi.stubGlobal('document', { title: 'RupeeKit calculator' });

    trackPageView('/tools/sip-calculator-india');
    expect(gtag).toHaveBeenCalledWith(
      'event',
      'page_view',
      expect.objectContaining({
        page_location:
          'https://www.rupeekit.co.in/tools/sip-calculator-india?utm_source=newsletter',
      })
    );
  });

  it('reports a dropped send so the caller can retry until gtag exists', () => {
    vi.stubGlobal('window', {});
    vi.stubGlobal('document', { title: 'RupeeKit calculator' });

    expect(trackPageView('/tools/sip-calculator-india')).toBe(false);
  });
});
