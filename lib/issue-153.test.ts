import { describe, expect, it } from 'vitest';
import { BLOG_CLUSTERS } from '@/data/blog-clusters';

describe('issue #153 emergency-fund ranking/depth intervention', () => {
  it('keeps the emergency-fund calculator as the primary money-planning destination', () => {
    const cluster = BLOG_CLUSTERS.find((item) => item.id === 'money-planning');
    expect(cluster?.calculatorHref).toBe('/tools/emergency-fund-calculator-india');
  });

  it('adds a contextual inbound path from savings and retirement content', () => {
    const cluster = BLOG_CLUSTERS.find((item) => item.id === 'savings-retirement');
    expect(cluster?.secondaryCalculatorHref).toBe('/tools/emergency-fund-calculator-india');
    expect(cluster?.secondaryCalculatorLabel).toBe('Emergency fund calculator');
  });
});
