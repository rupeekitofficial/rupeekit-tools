#!/usr/bin/env node

/**
 * Diagnostic: is the MCX bhavcopy reachable from a CI runner at all?
 *
 * The only publicly documented way to obtain it is Selenium automation of an
 * ASP.NET postback page, and an earlier attempt at the market-watch backpage
 * endpoint returned 403 from a GitHub runner. Before building a headless
 * browser into a twice-daily job, establish whether MCX serves datacenter IPs
 * at all. If everything here 403s, the route is closed and no amount of
 * parsing work will open it.
 *
 * Read-only. Reports and exits 0 regardless: this is a fact-finding run, not
 * a gate.
 */

import process from 'node:process';

const TIMEOUT_MS = 20_000;
const UA = 'RupeeKitGoldRates/1.0 (+https://www.rupeekit.co.in)';
const BROWSER_UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36';

const attempts = [
  { label: 'bhavcopy page (plain UA)', url: 'https://www.mcxindia.com/market-data/bhavcopy', ua: UA },
  { label: 'bhavcopy page (browser UA)', url: 'https://www.mcxindia.com/market-data/bhavcopy', ua: BROWSER_UA },
  { label: 'mcx home (browser UA)', url: 'https://www.mcxindia.com/', ua: BROWSER_UA },
  { label: 'market watch backpage', url: 'https://www.mcxindia.com/backpage.aspx/GetMarketWatch', ua: BROWSER_UA, method: 'POST' },
];

async function attempt({ label, url, ua, method = 'GET' }) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  const started = Date.now();
  try {
    const response = await fetch(url, {
      method,
      signal: controller.signal,
      headers: {
        'user-agent': ua,
        accept: method === 'POST' ? 'application/json' : 'text/html,*/*',
        ...(method === 'POST' ? { 'content-type': 'application/json' } : {}),
      },
      ...(method === 'POST' ? { body: '{}' } : {}),
    });
    const body = await response.text();
    const ms = Date.now() - started;
    console.log(
      `  ${response.ok ? '✓' : '✗'} ${label.padEnd(28)} HTTP ${response.status}  ${ms}ms  ${body.length} bytes`
    );
    if (response.ok) {
      // Does the page even contain the controls Selenium drives?
      const hasDatePicker = body.includes('txtDate_hid_val');
      const hasCsvLink = body.includes('lnkExpToCSV');
      console.log(`      date control present: ${hasDatePicker} | csv link present: ${hasCsvLink}`);
    }
  } catch (error) {
    console.log(`  ✗ ${label.padEnd(28)} ${error.message.slice(0, 80)}`);
  } finally {
    clearTimeout(timer);
  }
}

console.log('Probing MCX reachability from this runner.\n');
for (const a of attempts) await attempt(a);
console.log('\nIf every row is 403/blocked, MCX does not serve datacenter IPs and the');
console.log('bhavcopy route is closed regardless of how it is parsed.');
