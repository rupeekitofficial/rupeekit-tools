/**
 * All network access lives in this file. Everything downstream operates on the
 * plain quote objects returned here, so the derivation and guardrail logic can
 * be tested without a network.
 *
 * Each provider returns { provider, xauUsd | usdInr, fetchedAt } or throws.
 * Adding a licensed source later (IBJA, MCX) means adding an adapter here and
 * listing it in SPOT_PROVIDERS: no page or schema change.
 */

const USER_AGENT = 'RupeeKitGoldRates/1.0 (+https://www.rupeekit.co.in)';
const TIMEOUT_MS = 15_000;

async function getText(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: { 'user-agent': USER_AGENT, accept: '*/*' },
    });
    if (!response.ok) throw new Error(`HTTP ${response.status} from ${url}`);
    return await response.text();
  } finally {
    clearTimeout(timer);
  }
}

async function getJson(url) {
  const text = await getText(url);
  try {
    return JSON.parse(text);
  } catch {
    throw new Error(`Non-JSON response from ${url}: ${text.slice(0, 120)}`);
  }
}

function requireFinite(value, label) {
  const parsed = typeof value === 'number' ? value : Number.parseFloat(value);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    throw new Error(`${label} did not yield a usable number (got ${JSON.stringify(value)})`);
  }
  return parsed;
}

/** Stooq: free CSV, no API key. */
export async function spotFromStooq() {
  const csv = await getText('https://stooq.com/q/l/?s=xauusd&f=sd2t2ohlcv&h&e=csv');
  const [header, row] = csv.trim().split('\n');
  if (!row) throw new Error('Stooq returned no data row');
  const columns = header.split(',').map((name) => name.trim().toLowerCase());
  const values = row.split(',');
  const close = values[columns.indexOf('close')];
  return { provider: 'stooq', xauUsd: requireFinite(close, 'stooq close'), fetchedAt: new Date().toISOString() };
}

/** Yahoo Finance chart endpoint: free, no key, unofficial. */
export async function spotFromYahoo() {
  const payload = await getJson(
    'https://query1.finance.yahoo.com/v8/finance/chart/XAUUSD=X?interval=1d&range=5d'
  );
  const result = payload?.chart?.result?.[0];
  const price = result?.meta?.regularMarketPrice;
  return { provider: 'yahoo', xauUsd: requireFinite(price, 'yahoo regularMarketPrice'), fetchedAt: new Date().toISOString() };
}

/** GoldAPI.io: needs GOLDAPI_KEY. Skipped silently when unset. */
export async function spotFromGoldApi() {
  const key = process.env.GOLDAPI_KEY;
  if (!key) throw new Error('GOLDAPI_KEY not set');
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const response = await fetch('https://www.goldapi.io/api/XAU/USD', {
      signal: controller.signal,
      headers: { 'x-access-token': key, 'user-agent': USER_AGENT },
    });
    if (!response.ok) throw new Error(`HTTP ${response.status} from goldapi.io`);
    const payload = await response.json();
    return { provider: 'goldapi', xauUsd: requireFinite(payload?.price, 'goldapi price'), fetchedAt: new Date().toISOString() };
  } finally {
    clearTimeout(timer);
  }
}

/** Frankfurter: ECB-derived, free, no key. */
export async function fxFromFrankfurter() {
  const payload = await getJson('https://api.frankfurter.app/latest?from=USD&to=INR');
  return { provider: 'frankfurter', usdInr: requireFinite(payload?.rates?.INR, 'frankfurter INR'), fetchedAt: new Date().toISOString() };
}

/** exchangerate.host fallback: free, no key. */
export async function fxFromExchangerateHost() {
  const payload = await getJson('https://api.exchangerate.host/latest?base=USD&symbols=INR');
  return { provider: 'exchangerate.host', usdInr: requireFinite(payload?.rates?.INR, 'exchangerate.host INR'), fetchedAt: new Date().toISOString() };
}

export const SPOT_PROVIDERS = [spotFromStooq, spotFromYahoo, spotFromGoldApi];
export const FX_PROVIDERS = [fxFromFrankfurter, fxFromExchangerateHost];

/**
 * Collect every spot quote we can get. We want more than one: two independent
 * providers agreeing is the cross-check that lets us publish at all.
 */
export async function collectSpotQuotes(providers = SPOT_PROVIDERS) {
  const quotes = [];
  const errors = [];
  for (const provider of providers) {
    try {
      quotes.push(await provider());
    } catch (error) {
      errors.push(error.message);
    }
  }
  return { quotes, errors };
}

/** FX is a single number from a stable source: first success wins. */
export async function resolveFxQuote(providers = FX_PROVIDERS) {
  const errors = [];
  for (const provider of providers) {
    try {
      return { quote: await provider(), errors };
    } catch (error) {
      errors.push(error.message);
    }
  }
  return { quote: null, errors };
}
