import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

type ReviewEntry = {
  id: string;
  pagePattern: string;
  fact: string;
  primarySource: string;
  verificationDate: string;
  reviewIntervalDays: number;
  reviewTrigger: string;
};

const register = JSON.parse(
  readFileSync('data/freshness-review-register.json', 'utf8'),
) as { entries: ReviewEntry[] };

const byId = new Map(register.entries.map((entry) => [entry.id, entry]));

describe('issue #89 freshness maintenance', () => {
  it('registers the time-sensitive YMYL page families with sources and triggers', () => {
    for (const id of [
      'official-financial-updates',
      'small-savings-current-quarter',
      '8th-cpc-calculators',
      'itr2-ay-2026-27',
      'income-tax-calculator',
      'broker-comparison',
      'rbi-rate-and-loan-rule-pages',
      'epfo-pages',
      'labour-code-gratuity-pages',
      'government-da-dr-pages',
    ]) {
      const entry = byId.get(id);
      expect(entry, `missing ${id}`).toBeTruthy();
      expect(entry?.fact.length).toBeGreaterThan(10);
      expect(entry?.primarySource.length).toBeGreaterThan(5);
      expect(entry?.reviewTrigger.length).toBeGreaterThan(10);
      expect(entry?.verificationDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(entry?.reviewIntervalDays).toBeGreaterThan(0);
    }
  });

  it('keeps quarterly small-savings and 8th CPC on short review cycles', () => {
    expect(byId.get('small-savings-current-quarter')?.reviewIntervalDays).toBeLessThanOrEqual(31);
    expect(byId.get('8th-cpc-calculators')?.reviewIntervalDays).toBeLessThanOrEqual(14);
  });

  it('wires the freshness validator into the main validation command', () => {
    const pkg = JSON.parse(readFileSync('package.json', 'utf8')) as {
      scripts: Record<string, string>;
    };
    expect(pkg.scripts['validate:freshness']).toBe('node scripts/validate-content-freshness.mjs');
    expect(pkg.scripts.validate).toContain('validate:freshness');
  });

  it('shows the freshly verified broker-pricing date on the comparison surface', () => {
    const card = readFileSync('components/blog/BrokerComparisonCard.tsx', 'utf8');
    expect(card).toContain("BROKER_CHARGES_LAST_VERIFIED = '5 September 2026'");
    expect(card).toContain('Always verify current pricing and eligibility');
  });
});
