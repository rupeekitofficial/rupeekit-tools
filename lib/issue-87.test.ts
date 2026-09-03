import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { BROKER_CHARGES_LAST_VERIFIED, BROKERS } from '../components/blog/BrokerComparisonCard';

describe('issue #87 monetisation readiness', () => {
  it('keeps commercial facts freshly verified and corrects the known broker-pricing errors', () => {
    expect(BROKER_CHARGES_LAST_VERIFIED).toBe('3 September 2026');

    const zerodha = BROKERS.find((broker) => broker.name === 'Zerodha');
    const upstox = BROKERS.find((broker) => broker.name === 'Upstox');
    const angel = BROKERS.find((broker) => broker.name === 'Angel One');

    expect(zerodha?.delivery).toContain('Rs 0');
    expect(zerodha?.nri).toContain('available');
    expect(upstox?.delivery).toBe('Rs 20 per executed order');
    expect(upstox?.intraday).toContain('0.1%');
    expect(angel?.delivery).toContain('0.1%');
    expect(angel?.intraday).toContain('Rs 5 minimum');
    expect(angel?.amc).toContain('First year Rs 0');
  });

  it('requires disclosure before partner links and forbids payout-based ordering', () => {
    const card = readFileSync('components/blog/BrokerComparisonCard.tsx', 'utf8');
    const disclosure = card.indexOf('Commercial disclosure before partner links');
    const firstPartnerLink = card.indexOf('rel="noopener noreferrer sponsored"');

    expect(disclosure).toBeGreaterThan(-1);
    expect(firstPartnerLink).toBeGreaterThan(disclosure);
    expect(card).toContain('does not order recommendations by payout');
  });

  it('keeps the future commercial slot disabled by default and reserves space when enabled', () => {
    const slot = readFileSync('components/monetization/ReservedCommercialSlot.tsx', 'utf8');
    expect(slot).toContain('enabled = false');
    expect(slot).toContain('if (!enabled) return null');
    expect(slot).toContain('min-h-[180px]');
    expect(slot).toContain('data-commercial-slot="reserved"');
  });

  it('records a no-monetisation-yet decision, thresholds and review cadence', () => {
    const readiness = readFileSync('docs/monetisation-readiness-2026-09-03.md', 'utf8');
    const policy = readFileSync('docs/commercial-editorial-policy.md', 'utf8');

    expect(readiness).toContain('5,000 organic sessions/month');
    expect(readiness).toContain('500 sessions/month on commercial-intent');
    expect(readiness).toContain('50,000 sessions/month');
    expect(readiness).toContain('No ad network, sponsored unit, tracking pixel, or new commercial placement');
    expect(readiness).toContain('3 October 2026');

    expect(policy).toContain('Recommendations are never ordered by commission');
    expect(policy).toContain('primary source');
    expect(policy).toContain('verification date');
    expect(policy).toContain('every 30 days');
    expect(policy).toContain('fabricate ratings, reviews, testimonials, or review schema');
  });
});
