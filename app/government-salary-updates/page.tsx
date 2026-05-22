'use client';

import { useState } from 'react';
import Link from 'next/link';
import { governmentSalaryUpdates, GovernmentSalaryUpdate } from '@/data/government-salary-updates';

const STATES_LIST = [
  'All India',
  'Central Government',
  'West Bengal',
  'Maharashtra',
  'Karnataka',
  'Tamil Nadu',
  'Kerala',
  'Telangana',
  'Andhra Pradesh',
  'Odisha',
  'Bihar',
  'Jharkhand',
  'Uttar Pradesh',
  'Rajasthan',
  'Gujarat',
  'Madhya Pradesh',
  'Punjab',
  'Haryana',
  'Assam',
  'Delhi',
  'Other States'
];

export default function GovernmentSalaryUpdatesPage() {
  const [selectedState, setSelectedState] = useState('All India');

  // Filter updates based on state selection
  const filteredUpdates = governmentSalaryUpdates.filter((update) => {
    if (selectedState === 'All India') {
      return true;
    }
    return update.state.toLowerCase() === selectedState.toLowerCase();
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:py-12 space-y-12 md:space-y-16">
      {/* Hero Section */}
      <section className="rounded-3xl bg-gradient-to-br from-brandDeepNavy via-brandNavy to-slate-900 px-6 py-10 md:px-12 md:py-12 text-white shadow-xl relative overflow-hidden">
        {/* Subtle decorative background accent */}
        <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-brandGrowthGreen/20 blur-3xl pointer-events-none" />
        <div className="absolute -left-16 -bottom-16 w-64 h-64 rounded-full bg-brandNavy/40 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white ring-1 ring-white/20 mb-4">
            Educational Tracker
          </span>
          <h1 className="text-3xl font-black tracking-tight leading-tight md:text-5xl text-white">
            State-wise Government Employee Updates
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-slate-200 md:text-base">
            Track state-wise DA, DR, pay revision, arrears, pension, and official salary communication updates in a simple educational format. Learn how adjustments are calculated and where to verify official circulars.
          </p>
        </div>
      </section>

      {/* State Filter Chips Section */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-brandDeepNavy">Filter Updates by State</h2>
          <p className="text-xs text-brandMuted mt-1">Select a state to view related educational tracking formats and update summaries.</p>
        </div>

        <div className="flex flex-wrap gap-2 py-2">
          {STATES_LIST.map((state) => {
            const isActive = selectedState === state;
            return (
              <button
                key={state}
                onClick={() => setSelectedState(state)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold border transition duration-150 ${
                  isActive
                    ? 'bg-brandNavy border-brandNavy text-white shadow-sm'
                    : 'bg-white border-brandBorder text-brandText hover:bg-brandBgSoft hover:border-brandNavy/30'
                }`}
              >
                {state}
              </button>
            );
          })}
        </div>
      </section>

      {/* Updates Cards List */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-brandBorder pb-4">
          <h3 className="text-lg font-black text-brandDeepNavy">
            Updates Matrix ({filteredUpdates.length})
          </h3>
          <span className="text-xs font-semibold text-brandMuted">
            Showing format for: <strong className="text-brandNavy">{selectedState}</strong>
          </span>
        </div>

        {filteredUpdates.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2">
            {filteredUpdates.map((update) => (
              <div
                key={update.id}
                className="flex flex-col justify-between rounded-3xl border border-brandBorder bg-white p-6 shadow-sm hover:shadow-md transition duration-300 relative overflow-hidden"
              >
                {/* Demo status label */}
                {update.status === 'sample' && (
                  <div className="absolute top-0 right-0 bg-amber-500/10 border-b border-l border-amber-500/25 px-3 py-1 rounded-bl-xl">
                    <span className="text-[10px] font-extrabold uppercase tracking-wide text-amber-700">
                      Sample / Demo Format
                    </span>
                  </div>
                )}

                <div className="space-y-4">
                  {/* Badges row */}
                  <div className="flex flex-wrap gap-2 items-center">
                    <span className="rounded-full bg-brandNavy/10 border border-brandNavy/20 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-brandNavy">
                      {update.state}
                    </span>
                    <span className="rounded-full bg-emerald-50 border border-emerald-100 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-brandGrowthGreen">
                      {update.category}
                    </span>
                    <span className="text-[10px] font-semibold text-brandMuted">
                      {update.employeeGroup}
                    </span>
                  </div>

                  {/* Title */}
                  <div>
                    <h4 className="text-base font-bold tracking-tight text-brandDeepNavy line-clamp-2">
                      {update.title}
                    </h4>
                  </div>

                  {/* Meta data */}
                  <div className="grid grid-cols-2 gap-2 rounded-xl bg-brandBgSoft p-3 text-[11px] text-brandMuted border border-brandBorder/60">
                    <div>
                      <span className="block font-semibold text-brandDeepNavy">Source Dept:</span>
                      <span className="truncate block">{update.sourceName}</span>
                    </div>
                    <div>
                      <span className="block font-semibold text-brandDeepNavy">Effective Date:</span>
                      <span>{update.effectiveDate}</span>
                    </div>
                  </div>

                  {/* Summary */}
                  <div>
                    <p className="text-xs leading-relaxed text-brandText">
                      {update.summary}
                    </p>
                  </div>

                  {/* Specific education boxes */}
                  <div className="space-y-2 border-t border-dashed border-brandBorder pt-3">
                    <div>
                      <strong className="block text-[11px] uppercase tracking-wider text-brandDeepNavy">Who May Be Affected:</strong>
                      <p className="text-[11px] text-brandMuted leading-relaxed">{update.whoMayBeAffected}</p>
                    </div>
                    <div>
                      <strong className="block text-[11px] uppercase tracking-wider text-brandDeepNavy">What to Verify:</strong>
                      <p className="text-[11px] text-brandMuted leading-relaxed">{update.actionToVerify}</p>
                    </div>
                  </div>
                </div>

                {/* Footer Link Button */}
                {update.sourceUrl && (
                  <div className="mt-6 pt-4 border-t border-brandBorder flex justify-between items-center">
                    <a
                      href={update.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full bg-brandNavy/5 border border-brandNavy/15 px-4 py-1.5 text-xs font-bold text-brandNavy hover:bg-brandNavy hover:text-white transition duration-200"
                    >
                      View official department source
                    </a>
                    <span className="text-[10px] text-brandMuted">Published: {update.publishedDate}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-brandBorder bg-white p-8 text-center max-w-lg mx-auto space-y-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brandNavy/5 text-brandNavy mx-auto">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h4 className="text-base font-bold text-brandDeepNavy">No sample updates for {selectedState}</h4>
            <p className="text-xs text-brandMuted">
              We are currently designing demo tracking layouts and checking verified sources for this region. Select &quot;All India&quot; or &quot;Central Government&quot; to view active samples.
            </p>
          </div>
        )}
      </section>

      {/* Guide Section: How to verify state-wise salary updates */}
      <section className="rounded-3xl border border-brandBorder bg-white p-6 md:p-10 shadow-sm space-y-6">
        <div>
          <span className="inline-block rounded-full bg-brandNavy/10 border border-brandNavy/20 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-brandNavy">
            Verification Guide
          </span>
          <h2 className="mt-4 text-2xl font-black text-brandDeepNavy md:text-3xl">
            How to verify state-wise salary updates
          </h2>
          <p className="mt-2 text-sm text-brandMuted">
            Official announcements regarding salary scales, dearness revisions, and pensions follow strict administrative channels. Always follow these verification practices before planning:
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brandNavy/10 text-brandNavy text-xs font-bold">1</div>
              <div>
                <h4 className="text-sm font-bold text-brandDeepNavy">Check the State Finance Department Website</h4>
                <p className="mt-1 text-xs text-brandMuted leading-relaxed">
                  All official revisions (DA order, pay revision resolutions, fitment directives) are issued as government resolutions or office memorandums directly on the state&apos;s official Finance Department portal.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brandNavy/10 text-brandNavy text-xs font-bold">2</div>
              <div>
                <h4 className="text-sm font-bold text-brandDeepNavy">Check Treasury or Payroll Department Notices</h4>
                <p className="mt-1 text-xs text-brandMuted leading-relaxed">
                  The directorate of accounts or state treasuries publish implementing orders showing how the drawing and disbursing officers (DDOs) should apply revised scales to the payroll system.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brandNavy/10 text-brandNavy text-xs font-bold">3</div>
              <div>
                <h4 className="text-sm font-bold text-brandDeepNavy">Check Pension Department Circulars</h4>
                <p className="mt-1 text-xs text-brandMuted leading-relaxed">
                  For Dearness Relief (DR) and pension commuted values, check the specific pension welfare portal or treasury pension branch circulars since disbursement dates can differ from active staff.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brandNavy/10 text-brandNavy text-xs font-bold">4</div>
              <div>
                <h4 className="text-sm font-bold text-brandDeepNavy">Verify Department-Specific Directives</h4>
                <p className="mt-1 text-xs text-brandMuted leading-relaxed">
                  Certain sectors (e.g., school education, police forces, health departments, municipal corporations, public sector undertakings) publish separate internal circulars adapting the general finance orders.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brandNavy/10 text-brandNavy text-xs font-bold">5</div>
              <div>
                <h4 className="text-sm font-bold text-brandDeepNavy">Confirm Dates and Implementation Limits</h4>
                <p className="mt-1 text-xs text-brandMuted leading-relaxed">
                  Verify the exact effective date (when calculations start accumulating), the payment implementation date (when it hits the bank account), and the split format for accumulated arrears (e.g., quarter deposits to provident funds).
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brandNavy/10 text-brandNavy text-xs font-bold">6</div>
              <div>
                <h4 className="text-sm font-bold text-brandDeepNavy">Avoid Social Media Unverified Forwards</h4>
                <p className="mt-1 text-xs text-brandMuted leading-relaxed">
                  Do not rely on text messages or third-party screenshots. Fake circulars are common. Ensure you cross-reference with official circular numbers on governmental domains ending in &apos;.gov.in&apos; or &apos;.nic.in&apos;.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Official Source Checklist Section */}
      <section className="rounded-3xl border border-brandBorder bg-brandBgSoft p-6 md:p-8 space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brandNavy/10 text-brandNavy">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-brandDeepNavy">Before acting on any state salary update, verify:</h3>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
          <div className="flex items-center gap-3 bg-white border border-brandBorder rounded-2xl p-4 shadow-sm">
            <div className="rounded-full bg-emerald-50 border border-emerald-100 p-1 text-brandGrowthGreen">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="text-xs font-bold text-brandDeepNavy">Official Source Portal</span>
          </div>

          <div className="flex items-center gap-3 bg-white border border-brandBorder rounded-2xl p-4 shadow-sm">
            <div className="rounded-full bg-emerald-50 border border-emerald-100 p-1 text-brandGrowthGreen">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="text-xs font-bold text-brandDeepNavy">Circular / Order Number</span>
          </div>

          <div className="flex items-center gap-3 bg-white border border-brandBorder rounded-2xl p-4 shadow-sm">
            <div className="rounded-full bg-emerald-50 border border-emerald-100 p-1 text-brandGrowthGreen">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="text-xs font-bold text-brandDeepNavy">Effective Date</span>
          </div>

          <div className="flex items-center gap-3 bg-white border border-brandBorder rounded-2xl p-4 shadow-sm">
            <div className="rounded-full bg-emerald-50 border border-emerald-100 p-1 text-brandGrowthGreen">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="text-xs font-bold text-brandDeepNavy">Eligible Employee Group</span>
          </div>

          <div className="flex items-center gap-3 bg-white border border-brandBorder rounded-2xl p-4 shadow-sm">
            <div className="rounded-full bg-emerald-50 border border-emerald-100 p-1 text-brandGrowthGreen">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="text-xs font-bold text-brandDeepNavy">Arrears / Payment Timeline</span>
          </div>

          <div className="flex items-center gap-3 bg-white border border-brandBorder rounded-2xl p-4 shadow-sm">
            <div className="rounded-full bg-emerald-50 border border-emerald-100 p-1 text-brandGrowthGreen">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="text-xs font-bold text-brandDeepNavy">Approval vs Announcement Status</span>
          </div>
        </div>
      </section>

      {/* Educational Disclaimer Section */}
      <section className="rounded-2xl border border-brandBorder bg-white p-6 text-xs leading-relaxed text-brandMuted shadow-sm">
        <p className="font-bold text-brandDeepNavy mb-2 text-sm">Educational Disclaimer</p>
        <p>
          State-wise government salary updates on RupeeKit are for general educational information only. Always verify rules, rates, eligibility, effective dates, arrears, and circulars from official state or central government sources.
        </p>
      </section>
    </div>
  );
}
