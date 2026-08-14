import fs from 'node:fs/promises';
import path from 'node:path';

const SITE_URL = process.env.CWV_SITE_URL || 'https://www.rupeekit.co.in';
const API_KEY = process.env.PAGESPEED_API_KEY || '';

const FALLBACK_TOP_PAGES = [
  { path: '/blog/itr-2-ay-2026-27-filing-guide', impressions: 961, position: 4.54 },
  { path: '/tools/personal-loan-emi-calculator-india', impressions: 602, position: 12.9 },
  { path: '/tools/8th-pay-commission-salary-calculator-india', impressions: 521, position: 7.15 },
  { path: '/tools/emergency-fund-calculator-india', impressions: 507, position: 8.9 },
  { path: '/tools/personal-loan-eligibility-calculator-india', impressions: 476, position: 70.8 },
  { path: '/tools/gold-loan-calculator-india', impressions: 474, position: 30.3 },
  { path: '/blog/zerodha-vs-upstox-vs-angel-one-demat-account', impressions: 467, position: 5.04 },
  { path: '/blog/new-labour-code-gratuity-rules-india-2026', impressions: 458, position: 4.83 },
  { path: '/tools/income-tax-calculator-old-vs-new-regime-india', impressions: 442, position: 42.1 },
  { path: '/tools/net-worth-calculator-india', impressions: 344, position: 45.9 },
  { path: '/tools/capital-gains-tax-calculator-india', impressions: 332, position: 4.32 },
  { path: '/blog/how-to-calculate-in-hand-salary-from-ctc-india', impressions: 259, position: 13.0 },
  { path: '/tools/nps-calculator-india', impressions: 205, position: 3.3 },
  { path: '/tools/sukanya-samriddhi-yojana-calculator-india', impressions: 201, position: 63.8 },
  { path: '/tools/sip-calculator-india', impressions: 187, position: 3.33 },
  { path: '/blog/income-tax-on-12-lakh-salary-new-regime-india-2026', impressions: 179, position: 21.0 },
  { path: '/tools/cagr-calculator-india', impressions: 165, position: 18.5 },
  { path: '/blog/mutual-funds-for-beginners-india', impressions: 163, position: 14.8 },
  { path: '/tools/salary-in-hand-calculator-india', impressions: 154, position: 30.2 },
  { path: '/tools/step-up-sip-calculator-india', impressions: 134, position: 12.4 },
];

function argValue(name, fallback) {
  const index = process.argv.indexOf(name);
  if (index === -1 || index === process.argv.length - 1) return fallback;
  return process.argv[index + 1];
}

function metricValue(metric) {
  if (!metric) return null;
  if (typeof metric.numericValue === 'number') return metric.numericValue;
  if (Array.isArray(metric.percentile)) return metric.percentile[0] ?? null;
  return typeof metric.percentile === 'number' ? metric.percentile : null;
}

function fieldMetric(metric) {
  if (!metric) return null;
  return {
    percentile: typeof metric.percentile === 'number' ? metric.percentile : null,
    category: metric.category || null,
  };
}

function extract(payload) {
  const audits = payload?.lighthouseResult?.audits || {};
  const categories = payload?.lighthouseResult?.categories || {};
  const field = payload?.loadingExperience?.metrics || {};

  return {
    lighthouse: {
      performanceScore:
        typeof categories?.performance?.score === 'number'
          ? Math.round(categories.performance.score * 100)
          : null,
      lcpMs: metricValue(audits['largest-contentful-paint']),
      cls: metricValue(audits['cumulative-layout-shift']),
      inpMs: metricValue(audits['interaction-to-next-paint']),
      totalByteWeight: metricValue(audits['total-byte-weight']),
      mainThreadWorkMs: metricValue(audits['mainthread-work-breakdown']),
      bootupTimeMs: metricValue(audits['bootup-time']),
    },
    field: {
      overallCategory: payload?.loadingExperience?.overall_category || null,
      lcp: fieldMetric(field.LARGEST_CONTENTFUL_PAINT_MS),
      cls: fieldMetric(field.CUMULATIVE_LAYOUT_SHIFT_SCORE),
      inp: fieldMetric(field.INTERACTION_TO_NEXT_PAINT),
    },
  };
}

async function runPsi(url, strategy) {
  const endpoint = new URL('https://www.googleapis.com/pagespeedonline/v5/runPagespeed');
  endpoint.searchParams.set('url', url);
  endpoint.searchParams.set('strategy', strategy);
  endpoint.searchParams.set('category', 'performance');
  if (API_KEY) endpoint.searchParams.set('key', API_KEY);

  const response = await fetch(endpoint, {
    headers: { 'user-agent': 'RupeeKit-CWV-Audit/1.0' },
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`PageSpeed ${strategy} failed for ${url}: HTTP ${response.status} ${body.slice(0, 300)}`);
  }

  return extract(await response.json());
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function readGscTopPages() {
  const gscPath = argValue('--gsc', 'automation/reports/gsc/2026-08-12.json');
  try {
    const raw = await fs.readFile(gscPath, 'utf8');
    const report = JSON.parse(raw);
    const rows = report?.searchConsole?.topPages;
    if (!Array.isArray(rows) || rows.length < 20) return null;

    return rows.slice(0, 20).map((row) => {
      const parsed = new URL(row.page || row.url);
      return {
        path: parsed.pathname,
        impressions: row.impressions ?? null,
        position: row.position ?? row.averagePosition ?? null,
      };
    });
  } catch {
    return null;
  }
}

async function main() {
  const output = argValue('--output', 'automation/reports/cwv-baseline-2026-08-14.json');
  const limit = Number(argValue('--limit', '20'));
  const delayMs = Number(argValue('--delay-ms', '800'));
  const gscPages = await readGscTopPages();
  const pages = (gscPages || FALLBACK_TOP_PAGES).slice(0, Math.max(1, Math.min(limit, 20)));
  const source = gscPages ? 'day-10-gsc-report' : 'issue-57-authoritative-baseline-fallback';

  const results = [];
  for (const [index, page] of pages.entries()) {
    const url = new URL(page.path, SITE_URL).toString();
    console.log(`[${index + 1}/${pages.length}] ${page.path}`);

    const record = { ...page, url, mobile: null, desktop: null, errors: [] };
    for (const strategy of ['mobile', 'desktop']) {
      try {
        record[strategy] = await runPsi(url, strategy);
      } catch (error) {
        record.errors.push(String(error instanceof Error ? error.message : error));
      }
      await sleep(delayMs);
    }
    results.push(record);
  }

  const report = {
    schemaVersion: 1,
    generatedAt: new Date().toISOString(),
    asOfDate: '2026-08-14',
    source: {
      pages: source,
      performance: 'Google PageSpeed Insights API v5',
      mobileFirst: true,
      note:
        source === 'day-10-gsc-report'
          ? 'Top 20 pages taken from the Day 10 page-level GSC report.'
          : 'Day 10 bootstrap report had no topPages rows because service-account access was unavailable; the fallback is reconstructed from the authoritative page-level issue #57 / Aug 4 tables without using query-level aggregation.',
    },
    thresholds: {
      good: { lcpMs: 2500, inpMs: 200, cls: 0.1 },
      needsImprovement: { lcpMs: 4000, inpMs: 500, cls: 0.25 },
    },
    pages: results,
  };

  await fs.mkdir(path.dirname(output), { recursive: true });
  await fs.writeFile(output, `${JSON.stringify(report, null, 2)}\n`, 'utf8');
  console.log(`Wrote ${output}`);

  if (results.some((row) => row.mobile === null || row.desktop === null)) {
    process.exitCode = 2;
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
