'use client';

import Link from 'next/link';

export const BROKER_CHARGES_LAST_VERIFIED = '5 September 2026';

export const BROKERS = [
  {
    name: 'Zerodha',
    tagline: 'Simple, reliable, self-directed',
    accountOpening: 'Rs 0 for resident individual online accounts',
    delivery: 'Rs 0 brokerage for resident individual delivery trades',
    intraday: 'Rs 20 or 0.03%/order (lower)',
    fo: 'Options flat Rs 20/order; futures Rs 20 or 0.03% (lower)',
    amc: 'First year Rs 0 for eligible new resident accounts; then non-BSDA Rs 300 + GST/year',
    accountType: '2-in-1',
    platform: 'Kite (web + mobile)',
    mf: 'Zerodha Coin — direct plans, zero commission',
    api: 'Kite Connect (paid)',
    research: 'Varsity (free education) — no advisory',
    nri: 'NRI trading and demat accounts available; separate pricing and eligibility apply',
    bestFor: 'Self-directed investors who value zero delivery brokerage and direct mutual funds',
    href: 'https://zerodha.com/open-account?c=IZ8333',
    label: 'Open Zerodha Account',
  },
  {
    name: 'Upstox',
    tagline: 'Modern platform and active-trading tools',
    accountOpening: 'Rs 0',
    delivery: 'Rs 20 per executed order',
    intraday: 'Rs 20 or 0.1%/order (lower)',
    fo: 'Options flat Rs 20/order; futures Rs 20 or 0.05% (lower)',
    amc: 'First year Rs 0 for eligible new users; then non-BSDA Rs 300 + GST/year',
    accountType: 'Trading + demat account',
    platform: 'Upstox web + mobile',
    mf: 'Rs 0 brokerage on mutual funds',
    api: 'Upstox API available',
    research: 'Options analytics and screeners available',
    nri: 'NRI onboarding is available; eligibility and charges differ from resident accounts',
    bestFor: 'Active traders who value platform tools and transparent per-order pricing',
    href: 'https://upstox.onelink.me/0H1s/ZT66',
    label: 'Open Upstox Account',
  },
  {
    name: 'Angel One',
    tagline: 'Research tools and broad account support',
    accountOpening: 'Rs 0 for standard resident online account opening',
    delivery: 'After intro offer: Rs 20 or 0.1%/order (lower; Rs 5 minimum)',
    intraday: 'After intro offer: Rs 20 or 0.1%/order (lower; Rs 5 minimum)',
    fo: 'After intro offer: flat Rs 20/order',
    amc: 'First year Rs 0; then non-BSDA Rs 60 + GST/quarter',
    accountType: 'Trading + demat account',
    platform: 'Angel One app and web',
    mf: 'Direct mutual-fund access via app',
    api: 'SmartAPI available',
    research: 'Research and analytics tools available',
    nri: 'NRI account options available; separate terms and charges apply',
    bestFor: 'Investors who want research tools alongside trading and investing access',
    href: 'https://angel-one.onelink.me/Wjgr/jbmek9om',
    label: 'Open Angel One Account',
  },
] as const;

const COMPARISON_ROWS: { label: string; key: keyof typeof BROKERS[0] }[] = [
  { label: 'Account Opening', key: 'accountOpening' },
  { label: 'Delivery Brokerage', key: 'delivery' },
  { label: 'Intraday Brokerage', key: 'intraday' },
  { label: 'F&O Brokerage', key: 'fo' },
  { label: 'Demat AMC', key: 'amc' },
  { label: 'Account Type', key: 'accountType' },
  { label: 'Platform', key: 'platform' },
  { label: 'Mutual Funds', key: 'mf' },
  { label: 'API Access', key: 'api' },
  { label: 'Research / Advisory', key: 'research' },
  { label: 'NRI Trading', key: 'nri' },
  { label: 'Best For', key: 'bestFor' },
];

export default function BrokerComparisonCard() {
  return (
    <div className="my-8 rounded-3xl border border-brandBorder bg-white shadow-sm overflow-hidden">
      <div className="px-6 py-5 bg-gradient-to-r from-brandDeepNavy to-brandNavy text-white">
        <span className="inline-block rounded-full bg-brandGrowthGreen/15 border border-brandGrowthGreen/30 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-brandBrightGreen mb-2">
          Broker Comparison 2026
        </span>
        <h3 className="text-lg font-black tracking-tight">Zerodha vs Upstox vs Angel One</h3>
        <p className="text-xs text-slate-300 mt-1">Charges, features, and platform — side by side.</p>
      </div>

      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr>
              <th className="text-left px-5 py-3 bg-slate-50 border-b border-brandBorder text-[10px] font-bold uppercase tracking-wide text-brandMuted w-40" />
              {BROKERS.map((broker) => (
                <th key={broker.name} className="px-4 py-3 bg-slate-50 border-b border-brandBorder text-center">
                  <div className="font-black text-brandDeepNavy text-sm">{broker.name}</div>
                  <div className="text-[10px] text-brandMuted font-normal mt-0.5">{broker.tagline}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {COMPARISON_ROWS.map((row, index) => (
              <tr key={row.key} className={index % 2 === 0 ? 'bg-white' : 'bg-slate-50/60'}>
                <td className="px-5 py-3 text-[11px] font-bold text-brandMuted border-b border-slate-100 align-top">
                  {row.label}
                </td>
                {BROKERS.map((broker) => (
                  <td key={broker.name} className="px-4 py-3 text-[12px] text-slate-700 border-b border-slate-100 text-center align-top">
                    {broker[row.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="md:hidden divide-y divide-brandBorder">
        {BROKERS.map((broker) => (
          <div key={broker.name} className="px-5 py-4">
            <div className="font-black text-brandDeepNavy text-base">{broker.name}</div>
            <div className="text-[11px] text-brandMuted mb-3">{broker.tagline}</div>
            <dl className="space-y-1.5">
              {COMPARISON_ROWS.map((row) => (
                <div key={row.key} className="flex gap-3">
                  <dt className="text-[11px] font-bold text-brandMuted w-32 shrink-0">{row.label}</dt>
                  <dd className="text-[11px] text-slate-700">{broker[row.key]}</dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>

      <div className="px-5 py-5 bg-brandBgSoft border-t border-brandBorder">
        <div className="mb-4 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-[11px] leading-relaxed text-blue-900">
          <span className="font-bold">Commercial disclosure before partner links:</span> RupeeKit may earn a referral or affiliate fee from some links below. Commercial relationships never determine comparison order, factual conclusions, or which broker is described as suitable for a use case. Always verify current pricing and eligibility on the broker&apos;s official site before opening an account.
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {BROKERS.map((broker) => (
            <Link
              key={broker.name}
              href={broker.href}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="flex flex-col items-center rounded-2xl border border-brandBorder bg-white px-4 py-3.5 text-center shadow-sm hover:shadow-md hover:border-brandNavy/30 transition-all"
            >
              <span className="text-sm font-black text-brandDeepNavy">{broker.name}</span>
              <span className="text-[10px] text-brandMuted mt-0.5 mb-2.5">{broker.tagline}</span>
              <span className="rounded-full bg-brandGrowthGreen px-4 py-1.5 text-[11px] font-bold text-white">
                {broker.label}
              </span>
            </Link>
          ))}
        </div>
        <p className="mt-3 text-[10px] text-brandMuted text-center leading-relaxed">
          Charges last verified: {BROKER_CHARGES_LAST_VERIFIED}, against each broker&apos;s official pricing/support pages. Statutory and depository charges can apply in addition and pricing can change. RupeeKit earns affiliate commissions from Angel One and Upstox; the Zerodha URL is a referral link. No broker is universally best, and RupeeKit does not order recommendations by payout.
        </p>
      </div>
    </div>
  );
}
