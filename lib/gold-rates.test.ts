import { describe, expect, it } from 'vitest';
import {
  BOUNDS,
  MAX_DAILY_MOVE_PCT,
  MAX_PROVIDER_DIVERGENCE_PCT,
  averageOverHistory,
  buildSnapshot,
  deriveCaratTable,
  derivePerGramFine,
  guardrailFailures,
  purity,
} from '../scripts/gold/derive.mjs';
import { CARAT_FINENESS, LOAN_VALUATION_CARAT, getGoldRateSnapshot, hasLiveGoldRate } from './gold-rates';

// A self-consistent reading used to exercise the maths. Not a market quote.
const SAMPLE = { xauUsd: 3400, usdInr: 87.5, importDutyPct: 15 };

describe('gold rate derivation', () => {
  it('converts troy ounces to grams and applies FX then duty, in order', () => {
    const perGramFine = derivePerGramFine(SAMPLE);
    const expected = (3400 / purity.troyOunceGrams) * 87.5 * 1.15;
    expect(perGramFine).toBeCloseTo(expected, 6);
  });

  it('excludes GST from the valuation rate by default', () => {
    // GST is a transaction tax charged at billing, not part of metal value.
    expect(derivePerGramFine(SAMPLE)).toBe(derivePerGramFine({ ...SAMPLE, gstPct: 0 }));
    expect(derivePerGramFine({ ...SAMPLE, gstPct: 3 })).toBeGreaterThan(derivePerGramFine(SAMPLE));
  });

  // Regression lock. On 22 Aug 2026 the reported national rates were 24K
  // Rs 16,309/g and 22K Rs 14,950/g, with XAU/USD 4610 and USD/INR 95.765.
  // Duty-only derivation reproduced both to within 0.02%; adding GST overshot
  // by ~3%. If this test breaks, the levy model drifted -- do not "fix" it by
  // loosening the tolerance.
  it('reproduces the observed 22 Aug 2026 Indian market rate to within 0.1%', () => {
    const fine = derivePerGramFine({ xauUsd: 4610, usdInr: 95.765, importDutyPct: 15 });
    const { perGram } = deriveCaratTable(fine);
    expect(Math.abs((perGram['24K'] - 16_309) / 16_309) * 100).toBeLessThan(0.1);
    expect(Math.abs((perGram['22K'] - 14_950) / 14_950) * 100).toBeLessThan(0.1);
  });

  it('overshoots the observed market rate if GST is wrongly folded in', () => {
    const wrong = derivePerGramFine({ xauUsd: 4610, usdInr: 95.765, importDutyPct: 15, gstPct: 3 });
    const { perGram } = deriveCaratTable(wrong);
    expect((perGram['24K'] - 16_309) / 16_309 * 100).toBeGreaterThan(2);
  });

  it('derives every carat from a single fine-gold price using hallmark fineness', () => {
    const perGramFine = derivePerGramFine(SAMPLE);
    const { perGram, per10Gram } = deriveCaratTable(perGramFine);

    expect(perGram['22K']).toBeCloseTo(perGramFine * 0.916, 1);
    expect(perGram['18K']).toBeCloseTo(perGramFine * 0.75, 1);
    expect(perGram['14K']).toBeCloseTo(perGramFine * 0.585, 1);
    // 10g must be exactly 10x per-gram, never independently rounded.
    expect(per10Gram['22K']).toBeCloseTo(perGram['22K'] * 10, 0);
  });

  it('uses the 916 hallmark for 22K rather than the 22/24 ratio', () => {
    // 22/24 = 0.91667 overstates 22K against the Indian hallmark standard.
    expect(CARAT_FINENESS['22K']).toBe(0.916);
    expect(CARAT_FINENESS['22K']).not.toBeCloseTo(22 / 24, 4);
  });

  it('keeps the shared purity table in sync between the script and the app', () => {
    for (const [carat, spec] of Object.entries(purity.carats)) {
      expect(CARAT_FINENESS[carat as keyof typeof CARAT_FINENESS]).toBe(
        (spec as { fineness: number }).fineness
      );
    }
    expect(LOAN_VALUATION_CARAT).toBe(purity.loanValuationCarat);
  });
});

describe('guardrails', () => {
  const base = { xauUsd: 3400, usdInr: 87.5, perGram24k: 10_000 };

  it('passes a plausible reading', () => {
    expect(guardrailFailures(base)).toEqual([]);
  });

  it('rejects a spot price outside the plausible envelope', () => {
    expect(guardrailFailures({ ...base, xauUsd: BOUNDS.xauUsd.max + 1 })).toHaveLength(1);
    expect(guardrailFailures({ ...base, xauUsd: 0 })[0]).toMatch(/XAU\/USD/);
  });

  it('rejects an FX rate outside the plausible envelope', () => {
    expect(guardrailFailures({ ...base, usdInr: 5 })[0]).toMatch(/USD\/INR/);
  });

  it('holds when two spot providers disagree beyond the tolerance', () => {
    const failures = guardrailFailures({
      ...base,
      spotQuotes: [
        { provider: 'a', xauUsd: 3400 },
        { provider: 'b', xauUsd: 3400 * (1 + (MAX_PROVIDER_DIVERGENCE_PCT + 1) / 100) },
      ],
    });
    expect(failures.some((failure) => failure.includes('disagree'))).toBe(true);
  });

  it('accepts two providers that agree within tolerance', () => {
    expect(
      guardrailFailures({
        ...base,
        spotQuotes: [
          { provider: 'a', xauUsd: 3400 },
          { provider: 'b', xauUsd: 3410 },
        ],
      })
    ).toEqual([]);
  });

  it('holds on an implausible day-over-day move', () => {
    const failures = guardrailFailures({
      ...base,
      previousPerGram24k: base.perGram24k * (1 + (MAX_DAILY_MOVE_PCT + 5) / 100),
    });
    expect(failures.some((failure) => failure.includes('Day-over-day'))).toBe(true);
  });

  it('allows an ordinary day-over-day move', () => {
    expect(guardrailFailures({ ...base, previousPerGram24k: base.perGram24k * 1.01 })).toEqual([]);
  });
});

describe('trailing average', () => {
  const entries = Array.from({ length: 40 }, (_, index) => ({
    asOf: `2026-07-${String(index + 1).padStart(2, '0')}`,
    perGram22K: 9_000 + index,
  }));

  it('averages only the most recent 30 days', () => {
    const result = averageOverHistory(entries, '22K', 30);
    const last30 = entries.slice(-30);
    const expected = last30.reduce((sum, entry) => sum + entry.perGram22K, 0) / 30;
    expect(result.average).toBeCloseTo(expected, 2);
    expect(result.sampleDays).toBe(30);
    expect(result.sufficient).toBe(true);
  });

  it('reports insufficient rather than passing off a short window as a 30-day average', () => {
    const result = averageOverHistory(entries.slice(0, 4), '22K', 30);
    expect(result.sampleDays).toBe(4);
    expect(result.sufficient).toBe(false);
  });

  it('handles empty history without throwing', () => {
    expect(averageOverHistory([], '22K', 30)).toEqual({ average: null, sampleDays: 0, sufficient: false });
  });
});

describe('committed snapshot', () => {
  it('never ships a fabricated price: an unavailable snapshot carries no rate', () => {
    const snapshot = getGoldRateSnapshot();
    if (snapshot.status === 'unavailable') {
      expect(snapshot.derived).toBeNull();
      expect(snapshot.asOf).toBeNull();
      expect(hasLiveGoldRate()).toBe(false);
    } else {
      expect(snapshot.derived).not.toBeNull();
      expect(snapshot.asOf).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });
});

describe('snapshot assembly (fixture-driven, no network)', () => {
  const spotQuotes = [
    { provider: 'stooq', xauUsd: 3400, fetchedAt: '2026-08-22T06:30:00.000Z' },
    { provider: 'yahoo', xauUsd: 3405, fetchedAt: '2026-08-22T06:30:01.000Z' },
  ];
  const usdInrQuote = { provider: 'frankfurter', usdInr: 87.5, fetchedAt: '2026-08-22T06:30:02.000Z' };

  it('builds a publishable snapshot from agreeing providers', () => {
    const { snapshot, historyEntry, failures } = buildSnapshot({
      asOf: '2026-08-22',
      fetchedAt: '2026-08-22T06:30:03.000Z',
      spotQuotes,
      usdInrQuote,
      history: [],
    });

    expect(failures).toEqual([]);
    expect(snapshot.status).toBe('ok');
    expect(snapshot.derived.perGram['24K']).toBeGreaterThan(0);
    // Carats must be internally consistent with the single fine price.
    expect(snapshot.derived.perGram['22K']).toBeCloseTo(snapshot.derived.perGramFine * 0.916, 1);
    expect(snapshot.inputs.spot).toHaveLength(2);
    expect(historyEntry.asOf).toBe('2026-08-22');
  });

  it('refuses to call a one-day window a 30-day average', () => {
    const { snapshot } = buildSnapshot({
      asOf: '2026-08-22',
      fetchedAt: '2026-08-22T06:30:03.000Z',
      spotQuotes,
      usdInrQuote,
      history: [],
    });
    expect(snapshot.loanValuation.sufficient).toBe(false);
    expect(snapshot.loanValuation.sampleDays).toBe(1);
    expect(snapshot.loanValuation.note).toMatch(/NOT yet a 30-day average/);
  });

  it('reports sufficient once a full window of history exists', () => {
    const history = Array.from({ length: 40 }, (_, index) => ({
      asOf: `2026-07-${String(index + 1).padStart(2, '0')}`,
      perGram22K: 9_500,
      perGram24K: 10_360,
    }));
    const { snapshot } = buildSnapshot({
      asOf: '2026-08-22',
      fetchedAt: '2026-08-22T06:30:03.000Z',
      spotQuotes,
      usdInrQuote,
      history,
    });
    expect(snapshot.loanValuation.sufficient).toBe(true);
    expect(snapshot.loanValuation.sampleDays).toBe(30);
    expect(snapshot.loanValuation.note).toBeNull();
  });

  it('surfaces guardrail failures instead of silently publishing', () => {
    const { failures } = buildSnapshot({
      asOf: '2026-08-22',
      fetchedAt: '2026-08-22T06:30:03.000Z',
      spotQuotes: [
        { provider: 'stooq', xauUsd: 3400, fetchedAt: '' },
        { provider: 'yahoo', xauUsd: 4200, fetchedAt: '' },
      ],
      usdInrQuote,
      history: [],
    });
    expect(failures.length).toBeGreaterThan(0);
    expect(failures.some((failure) => failure.includes('disagree'))).toBe(true);
  });

  it('replaces same-day history rather than double-counting a re-run', () => {
    const history = [
      { asOf: '2026-08-21', perGram22K: 9_500, perGram24K: 10_360 },
      { asOf: '2026-08-22', perGram22K: 9_400, perGram24K: 10_250 },
    ];
    const { snapshot } = buildSnapshot({
      asOf: '2026-08-22',
      fetchedAt: '2026-08-22T12:30:00.000Z',
      spotQuotes,
      usdInrQuote,
      history,
    });
    // 2 prior days, one of which is today and gets replaced -> 2 samples.
    expect(snapshot.loanValuation.sampleDays).toBe(2);
  });
});

describe('instrument classes', () => {
  const base = { xauUsd: 4600, usdInr: 95.7, perGram24k: 16_275 };

  it('does not treat a futures basis as provider disagreement', () => {
    // Observed on CI 22 Aug 2026: gold-api.com spot 4604.40 vs Yahoo GC=F
    // futures 4680.60 is a 1.64% basis, not a 1.64% error.
    const failures = guardrailFailures({
      ...base,
      spotQuotes: [
        { provider: 'gold-api.com', instrument: 'spot', xauUsd: 4604.4 },
        { provider: 'yahoo-gc-f', instrument: 'futures', xauUsd: 4680.6 },
      ],
    });
    expect(failures).toEqual([]);
  });

  it('still flags two genuine spot providers that disagree', () => {
    const failures = guardrailFailures({
      ...base,
      spotQuotes: [
        { provider: 'a', instrument: 'spot', xauUsd: 4604 },
        { provider: 'b', instrument: 'spot', xauUsd: 4780 },
      ],
    });
    expect(failures.some((f) => f.includes('disagree'))).toBe(true);
  });

  it('flags a futures quote that is implausibly far from spot', () => {
    const failures = guardrailFailures({
      ...base,
      spotQuotes: [
        { provider: 'a', instrument: 'spot', xauUsd: 4604 },
        { provider: 'f', instrument: 'futures', xauUsd: 5200 },
      ],
    });
    expect(failures.some((f) => f.includes('sanity band'))).toBe(true);
  });

  it('publishes the spot quote, not the futures quote, when both are present', () => {
    const { snapshot } = buildSnapshot({
      asOf: '2026-08-22',
      fetchedAt: '2026-08-22T18:23:11.000Z',
      // Futures listed first, to prove ordering does not decide this.
      spotQuotes: [
        { provider: 'yahoo-gc-f', instrument: 'futures', xauUsd: 4680.6, fetchedAt: '' },
        { provider: 'gold-api.com', instrument: 'spot', xauUsd: 4604.4, fetchedAt: '' },
      ],
      usdInrQuote: { provider: 'frankfurter', usdInr: 95.7, fetchedAt: '' },
      history: [],
    });
    const fromSpot = derivePerGramFine({ xauUsd: 4604.4, usdInr: 95.7, importDutyPct: 15 });
    expect(snapshot.derived.perGramFine).toBeCloseTo(Math.round(fromSpot * 100) / 100, 1);
  });

  it('reproduces the CI-observed 22 Aug 2026 derivation', () => {
    // CI printed 24K Rs 16,275.69 from gold-api.com 4604.399902 / frankfurter 95.7.
    const fine = derivePerGramFine({ xauUsd: 4604.399902, usdInr: 95.7, importDutyPct: 15 });
    const { perGram } = deriveCaratTable(fine);
    expect(perGram['24K']).toBeCloseTo(16_275.69, 1);
    expect(perGram['22K']).toBeCloseTo(14_923.45, 1);
  });
});
