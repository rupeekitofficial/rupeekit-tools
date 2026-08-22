import fs from 'node:fs';
import path from 'node:path';

const dataDir = path.join(process.cwd(), 'data', 'gold-rates');

export const purity = JSON.parse(fs.readFileSync(path.join(dataDir, 'purity.json'), 'utf8'));
export const dutyConfig = JSON.parse(fs.readFileSync(path.join(dataDir, 'duty-config.json'), 'utf8'));

export const CARATS = Object.keys(purity.carats);

// Guardrail envelopes. These are deliberately wide: they exist to catch a broken
// feed (an HTML error page parsed as a number, a currency mix-up), not to second
// guess the market.
export const BOUNDS = {
  xauUsd: { min: 500, max: 20_000 },
  usdInr: { min: 50, max: 200 },
  perGram24k: { min: 1_000, max: 100_000 },
};

// Gold moving more than this in a single day is far more likely to be a data
// error than a real market move, so we hold rather than publish.
export const MAX_DAILY_MOVE_PCT = 10;

// Two independent spot providers disagreeing by more than this means we cannot
// say which one is right, so we publish neither.
export const MAX_PROVIDER_DIVERGENCE_PCT = 2;

export const MIN_AVERAGE_SAMPLE_DAYS = 30;

function round(value, dp = 2) {
  const factor = 10 ** dp;
  return Math.round(value * factor) / factor;
}

export function pctDiff(a, b) {
  if (!a || !b) return Infinity;
  return Math.abs((a - b) / ((a + b) / 2)) * 100;
}

/**
 * Landed price per gram of FINE gold (999.9), before hallmark fineness is applied.
 *
 *   troy ounce -> gram, USD -> INR, then statutory levies.
 *
 * This yields a bullion value: gold content only, excluding jeweller making
 * charges and stones. That is the correct basis for gold-loan valuation, where
 * lenders advance against metal content alone.
 */
export function derivePerGramFine({ xauUsd, usdInr, importDutyPct, gstPct }) {
  const perGramUsd = xauUsd / purity.troyOunceGrams;
  const perGramInr = perGramUsd * usdInr;
  const withDuty = perGramInr * (1 + importDutyPct / 100);
  return withDuty * (1 + gstPct / 100);
}

export function deriveCaratTable(perGramFine) {
  const perGram = {};
  const per10Gram = {};
  for (const [carat, spec] of Object.entries(purity.carats)) {
    const value = perGramFine * spec.fineness;
    perGram[carat] = round(value);
    per10Gram[carat] = round(value * 10);
  }
  return { perGram, per10Gram };
}

/**
 * RBI-regulated lenders value pledged gold on a trailing average rather than
 * today's spot, so a live-spot figure overstates eligibility on a rising
 * market. We report the average AND whether we actually have enough history to
 * call it a 30-day average, because a "30-day average" computed from four days
 * is a false claim.
 */
export function averageOverHistory(entries, carat, days = MIN_AVERAGE_SAMPLE_DAYS) {
  const key = `perGram${carat}`;
  const usable = entries
    .filter((entry) => typeof entry[key] === 'number' && Number.isFinite(entry[key]))
    .slice(-days);
  if (usable.length === 0) {
    return { average: null, sampleDays: 0, sufficient: false };
  }
  const sum = usable.reduce((total, entry) => total + entry[key], 0);
  return {
    average: round(sum / usable.length),
    sampleDays: usable.length,
    sufficient: usable.length >= days,
  };
}

function withinBounds(value, bound) {
  return Number.isFinite(value) && value >= bound.min && value <= bound.max;
}

/**
 * Every reason we would refuse to publish, collected in one place.
 * Returns [] when the reading is safe to publish.
 */
export function guardrailFailures({ xauUsd, usdInr, perGram24k, spotQuotes = [], previousPerGram24k = null }) {
  const failures = [];

  if (!withinBounds(xauUsd, BOUNDS.xauUsd)) {
    failures.push(`XAU/USD ${xauUsd} outside plausible range ${BOUNDS.xauUsd.min}-${BOUNDS.xauUsd.max}`);
  }
  if (!withinBounds(usdInr, BOUNDS.usdInr)) {
    failures.push(`USD/INR ${usdInr} outside plausible range ${BOUNDS.usdInr.min}-${BOUNDS.usdInr.max}`);
  }
  if (!withinBounds(perGram24k, BOUNDS.perGram24k)) {
    failures.push(`Derived 24K/gram ${perGram24k} outside plausible range ${BOUNDS.perGram24k.min}-${BOUNDS.perGram24k.max}`);
  }

  const quoted = spotQuotes.filter((quote) => Number.isFinite(quote.xauUsd));
  if (quoted.length >= 2) {
    for (let i = 0; i < quoted.length; i += 1) {
      for (let j = i + 1; j < quoted.length; j += 1) {
        const divergence = pctDiff(quoted[i].xauUsd, quoted[j].xauUsd);
        if (divergence > MAX_PROVIDER_DIVERGENCE_PCT) {
          failures.push(
            `Spot providers disagree by ${divergence.toFixed(2)}% (${quoted[i].provider} ${quoted[i].xauUsd} vs ${quoted[j].provider} ${quoted[j].xauUsd}), limit ${MAX_PROVIDER_DIVERGENCE_PCT}%`
          );
        }
      }
    }
  }

  if (Number.isFinite(previousPerGram24k) && previousPerGram24k > 0) {
    const move = pctDiff(perGram24k, previousPerGram24k);
    if (move > MAX_DAILY_MOVE_PCT) {
      failures.push(
        `Day-over-day move ${move.toFixed(2)}% exceeds ${MAX_DAILY_MOVE_PCT}% (was ${previousPerGram24k}, now ${perGram24k})`
      );
    }
  }

  return failures;
}

export function buildSnapshot({ asOf, fetchedAt, spotQuotes, usdInrQuote, history }) {
  const primary = spotQuotes[0];
  const perGramFine = derivePerGramFine({
    xauUsd: primary.xauUsd,
    usdInr: usdInrQuote.usdInr,
    importDutyPct: dutyConfig.importDutyPct,
    gstPct: dutyConfig.gstPct,
  });
  const { perGram, per10Gram } = deriveCaratTable(perGramFine);

  const previous = history.length > 0 ? history[history.length - 1] : null;
  const failures = guardrailFailures({
    xauUsd: primary.xauUsd,
    usdInr: usdInrQuote.usdInr,
    perGram24k: perGram['24K'],
    spotQuotes,
    previousPerGram24k: previous ? previous.perGram24K : null,
  });

  const loanCarat = purity.loanValuationCarat;
  const projectedHistory = [
    ...history.filter((entry) => entry.asOf !== asOf),
    { asOf, [`perGram${loanCarat}`]: perGram[loanCarat], [`perGram24K`]: perGram['24K'] },
  ];
  const average = averageOverHistory(projectedHistory, loanCarat);

  return {
    failures,
    historyEntry: {
      asOf,
      xauUsd: primary.xauUsd,
      usdInr: usdInrQuote.usdInr,
      perGram24K: perGram['24K'],
      [`perGram${loanCarat}`]: perGram[loanCarat],
    },
    snapshot: {
      schemaVersion: 1,
      status: 'ok',
      asOf,
      fetchedAt,
      derived: { perGramFine: round(perGramFine), perGram, per10Gram },
      loanValuation: {
        carat: loanCarat,
        basis: `${MIN_AVERAGE_SAMPLE_DAYS}-day trailing average of ${loanCarat} per-gram bullion value`,
        averagePerGram: average.average,
        sampleDays: average.sampleDays,
        sufficient: average.sufficient,
        note: average.sufficient
          ? null
          : `Only ${average.sampleDays} day(s) of history: this is NOT yet a ${MIN_AVERAGE_SAMPLE_DAYS}-day average and must not be presented as one.`,
      },
      inputs: {
        spot: spotQuotes.map((quote) => ({ provider: quote.provider, xauUsd: quote.xauUsd, fetchedAt: quote.fetchedAt })),
        fx: { provider: usdInrQuote.provider, usdInr: usdInrQuote.usdInr, fetchedAt: usdInrQuote.fetchedAt },
        levies: {
          importDutyPct: dutyConfig.importDutyPct,
          gstPct: dutyConfig.gstPct,
          reviewedOn: dutyConfig.reviewedOn,
        },
      },
      disclosure:
        'Indicative bullion value derived from international spot gold and the USD/INR rate, plus statutory import duty and GST. Excludes jeweller making charges, wastage and stones. Not a quoted dealing price.',
    },
  };
}
