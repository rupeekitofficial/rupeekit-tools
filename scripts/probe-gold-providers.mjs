#!/usr/bin/env node

/**
 * Diagnostic: hit every configured provider and report what each one returns.
 *
 * The fetch script short-circuits on the first fatal problem, which is right
 * for production but useless for diagnosis -- a spot outage hides whether FX
 * works at all. This probes everything independently so one CI run tells you
 * exactly which endpoints are reachable from a real network.
 *
 *   node scripts/probe-gold-providers.mjs
 *
 * Exits non-zero only if no spot provider or no FX provider works, i.e. only
 * when the pipeline genuinely cannot run.
 */

import process from 'node:process';
import { FX_PROVIDERS, SPOT_PROVIDERS } from './gold/providers.mjs';

const PAD = 22;

async function probe(providers, label, valueKey) {
  console.log(`\n${label}`);
  console.log('-'.repeat(70));
  const working = [];
  for (const provider of providers) {
    const name = provider.name.replace(/^(spot|fx)From/, '');
    const started = Date.now();
    try {
      const quote = await provider();
      const ms = Date.now() - started;
      console.log(`  ✓ ${name.padEnd(PAD)} ${String(quote[valueKey]).padStart(12)}   ${ms}ms   [${quote.provider}]`);
      working.push(quote);
    } catch (error) {
      const ms = Date.now() - started;
      console.log(`  ✗ ${name.padEnd(PAD)} ${'—'.padStart(12)}   ${ms}ms   ${error.message.slice(0, 90)}`);
    }
  }
  return working;
}

function reportSpread(quotes, valueKey, label) {
  if (quotes.length < 2) return;
  const values = quotes.map((quote) => quote[valueKey]);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const spread = ((max - min) / ((max + min) / 2)) * 100;
  console.log(`\n  ${label} spread across ${quotes.length} working providers: ${spread.toFixed(3)}%`);
  if (spread > 2) {
    console.log('  ! Spread exceeds the 2% agreement guardrail; the pipeline would hold rather than publish.');
  }
}

async function main() {
  console.log('Probing gold rate providers from this network.\n');
  console.log(`GOLDAPI_KEY: ${process.env.GOLDAPI_KEY ? 'set' : 'not set (that provider will be skipped)'}`);

  const spot = await probe(SPOT_PROVIDERS, 'SPOT  (XAU/USD per troy ounce)', 'xauUsd');
  reportSpread(spot, 'xauUsd', 'XAU/USD');

  const fx = await probe(FX_PROVIDERS, 'FX  (USD/INR)', 'usdInr');
  reportSpread(fx, 'usdInr', 'USD/INR');

  console.log('\n' + '='.repeat(70));
  console.log(`spot providers working: ${spot.length}/${SPOT_PROVIDERS.length}`);
  console.log(`fx   providers working: ${fx.length}/${FX_PROVIDERS.length}`);

  if (spot.length === 0 || fx.length === 0) {
    console.error('\n✗ Pipeline cannot run: needs at least one working provider on each side.');
    process.exit(1);
  }
  if (spot.length === 1) {
    console.warn('\n! Only one spot provider works. The 2% cross-check cannot run; consider adding another source.');
  }
  console.log('\n✓ Pipeline has a usable provider on each side.');
}

main().catch((error) => {
  console.error(`probe failed: ${error.message}`);
  process.exit(1);
});
