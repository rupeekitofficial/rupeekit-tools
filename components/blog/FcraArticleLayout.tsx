'use client';

import Link from 'next/link';
import type { BlogPost } from '@/data/blog-posts';
import TableOfContents from './TableOfContents';
import FAQSection from './FAQSection';
import FinanceDisclaimer from './FinanceDisclaimer';
import QuickAnswerBox from '@/components/seo/QuickAnswerBox';
import AnswerEngineSummary from '@/components/seo/AnswerEngineSummary';

interface Props {
  post: BlogPost;
}

const statusData = [
  { label: 'Active', value: 14433 },
  { label: 'Cancelled', value: 22476 },
  { label: 'Expired', value: 15184 },
] as const;

const feeData = [
  { label: 'Registration (FC-3A)', value: 10000 },
  { label: 'Prior permission (FC-3B)', value: 5000 },
  { label: 'Renewal (FC-3C)', value: 5000 },
  { label: 'Revision application', value: 3000 },
] as const;

const portalSteps = [
  {
    title: 'Choose the correct service',
    detail: 'Use New Registration for FC-3A or FC-3B. Existing associations should use Registered Associations for renewal, FC-4 returns, FC-6 changes and other compliance services.',
  },
  {
    title: 'Create or access the account',
    detail: 'Select Sign Up when the association does not yet have a portal account. Existing users log in using PAN or the existing user ID, password and CAPTCHA.',
  },
  {
    title: 'Complete identity and organisation details',
    detail: 'Keep PAN, NGO Darpan ID, registration document, governing-body details and key-functionary information ready. Names and identifiers should match linked government systems.',
  },
  {
    title: 'Select purpose and geography',
    detail: 'Choose the precise approved purpose and every State or Union Territory where the foreign-funded activity will be carried out. Existing associations use FC-6F for the 2026 transition.',
  },
  {
    title: 'Add SBI FCRA bank information',
    detail: 'Foreign contribution must first be received through the designated FCRA account at SBI New Delhi Main Branch. Add permitted utilisation accounts separately where applicable.',
  },
  {
    title: 'Upload, validate and e-sign',
    detail: 'Upload the requested documents, review OCR-extracted details, complete Aadhaar-based authentication where required, pay the fee and e-sign before final submission.',
  },
  {
    title: 'Save the acknowledgement',
    detail: 'Download the acknowledgement and keep the application reference number. Use Track Application on the portal to monitor status and respond to any clarification request.',
  },
] as const;

function formatNumber(value: number) {
  return new Intl.NumberFormat('en-IN').format(value);
}

function PortalWindow({ login = false }: { login?: boolean }) {
  return (
    <figure className="my-8 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg">
      <div className="flex items-center gap-2 border-b border-slate-200 bg-slate-100 px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-slate-300" />
        <span className="h-3 w-3 rounded-full bg-slate-300" />
        <span className="h-3 w-3 rounded-full bg-slate-300" />
        <div className="ml-3 flex-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-[11px] text-slate-500">
          fcraonline.gov.in
        </div>
      </div>
      <div className="bg-gradient-to-b from-slate-50 to-white p-5 md:p-8">
        <div className="flex flex-col gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Ministry of Home Affairs</p>
            <h3 className="mt-1 text-xl font-black text-brandDeepNavy">FCRA Online</h3>
            <p className="text-xs text-slate-500">Foreign Contribution (Regulation) Act, 2010</p>
          </div>
          <div className="rounded-xl bg-brandDeepNavy px-4 py-2 text-xs font-bold text-white">Government of India</div>
        </div>

        {login ? (
          <div className="mx-auto mt-7 max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h4 className="text-center text-lg font-black text-brandDeepNavy">Login to your Account</h4>
            {['User ID (PAN / Existing User ID)', 'Password', 'Enter CAPTCHA'].map((label) => (
              <div key={label} className="mt-4">
                <p className="mb-1 text-xs font-semibold text-slate-600">{label}</p>
                <div className="h-10 rounded-lg border border-slate-300 bg-slate-50" />
              </div>
            ))}
            <div className="mt-5 rounded-lg bg-brandGrowthGreen px-4 py-2.5 text-center text-sm font-bold text-white">Login</div>
            <p className="mt-5 text-center text-xs text-slate-500">Don&apos;t have an account? <span className="font-bold text-brandNavy">Sign Up</span></p>
          </div>
        ) : (
          <div className="mt-7 grid gap-4 md:grid-cols-3">
            {[
              ['Foreign Hospitality', 'FC-2 applications for eligible individuals'],
              ['New Registration', 'FC-3A registration and FC-3B prior permission'],
              ['Registered Associations', 'Renewal, annual returns and change intimations'],
            ].map(([title, detail]) => (
              <div key={title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-4 h-10 w-10 rounded-xl bg-brandNavy/10" />
                <h4 className="font-black text-brandDeepNavy">{title}</h4>
                <p className="mt-2 text-xs leading-relaxed text-slate-600">{detail}</p>
                <div className="mt-4 text-xs font-bold text-brandNavy">Explore service →</div>
              </div>
            ))}
          </div>
        )}
      </div>
      <figcaption className="border-t border-slate-200 bg-slate-50 px-5 py-3 text-xs leading-relaxed text-slate-600">
        Visual walkthrough recreated from the live Ministry of Home Affairs FCRA 2.0 portal interface on 5 August 2026. It is an explanatory representation, not a substitute for the live portal.
      </figcaption>
    </figure>
  );
}

function StatusChart() {
  const max = Math.max(...statusData.map((item) => item.value));
  return (
    <figure className="my-8 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:p-7">
      <h3 className="text-lg font-black text-brandDeepNavy">FCRA cases shown on the official portal</h3>
      <p className="mt-1 text-xs leading-relaxed text-slate-600">Snapshot displayed by the portal when researched on 5 August 2026.</p>
      <div className="mt-6 space-y-5">
        {statusData.map((item) => (
          <div key={item.label}>
            <div className="mb-2 flex items-center justify-between gap-4 text-sm">
              <span className="font-bold text-slate-700">{item.label}</span>
              <span className="font-black text-brandDeepNavy">{formatNumber(item.value)}</span>
            </div>
            <div className="h-4 overflow-hidden rounded-full bg-slate-100">
              <div className="h-full rounded-full bg-brandNavy" style={{ width: `${(item.value / max) * 100}%` }} />
            </div>
          </div>
        ))}
      </div>
      <figcaption className="mt-5 text-xs text-slate-500">Source: Ministry of Home Affairs FCRA Online portal. Counts are a live portal snapshot and may change.</figcaption>
    </figure>
  );
}

function VolumeCards() {
  return (
    <div className="my-8 grid gap-4 sm:grid-cols-3">
      {[
        ['14,500 approx.', 'Active FCRA organisations nationwide'],
        ['15,000–20,000', 'Applications received each year'],
        ['17,000 approx.', 'Annual returns received each year'],
      ].map(([value, label]) => (
        <div key={label} className="rounded-2xl border border-brandNavy/10 bg-brandNavy/[0.03] p-5">
          <p className="text-2xl font-black text-brandNavy">{value}</p>
          <p className="mt-2 text-xs font-semibold leading-relaxed text-slate-600">{label}</p>
        </div>
      ))}
    </div>
  );
}

function FeeChart() {
  const max = Math.max(...feeData.map((item) => item.value));
  return (
    <figure className="my-8 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:p-7">
      <h3 className="text-lg font-black text-brandDeepNavy">Official portal application fees</h3>
      <p className="mt-1 text-xs text-slate-600">Base service fees shown on the FCRA portal; additional purpose or State/UT fees may apply under the 2026 Rules.</p>
      <div className="mt-6 space-y-4">
        {feeData.map((item) => (
          <div key={item.label} className="grid gap-2 sm:grid-cols-[190px_1fr_80px] sm:items-center">
            <span className="text-xs font-bold text-slate-700">{item.label}</span>
            <div className="h-3 overflow-hidden rounded-full bg-slate-100">
              <div className="h-full rounded-full bg-brandGrowthGreen" style={{ width: `${(item.value / max) * 100}%` }} />
            </div>
            <span className="text-right text-sm font-black text-brandDeepNavy">₹{formatNumber(item.value)}</span>
          </div>
        ))}
      </div>
      <figcaption className="mt-5 text-xs text-slate-500">Verify the fee shown at final payment because government fees and service conditions can change.</figcaption>
    </figure>
  );
}

function PortalGuide() {
  return (
    <div className="my-8 rounded-3xl border border-slate-200 bg-slate-50 p-5 md:p-7">
      <h3 className="text-xl font-black text-brandDeepNavy">Portal walkthrough: from login to filing</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">The exact fields differ by form, but this is the safe sequence for FC-3A, FC-3B, FC-3C, FC-4 and FC-6 services.</p>
      <ol className="mt-6 space-y-4">
        {portalSteps.map((step, index) => (
          <li key={step.title} className="grid grid-cols-[38px_1fr] gap-4 rounded-2xl bg-white p-4 shadow-sm">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brandNavy text-sm font-black text-white">{index + 1}</span>
            <div>
              <h4 className="font-black text-brandDeepNavy">{step.title}</h4>
              <p className="mt-1 text-sm leading-relaxed text-slate-600">{step.detail}</p>
            </div>
          </li>
        ))}
      </ol>
      <div className="mt-6 flex flex-wrap gap-3">
        <a href="https://fcraonline.gov.in/" target="_blank" rel="noreferrer" className="rounded-full bg-brandNavy px-5 py-2.5 text-xs font-bold text-white">Open official FCRA portal</a>
        <a href="https://fcraonline.gov.in/Home/RequiredDocument.aspx" target="_blank" rel="noreferrer" className="rounded-full border border-brandNavy px-5 py-2.5 text-xs font-bold text-brandNavy">Open portal login</a>
      </div>
    </div>
  );
}

function SourcePanel() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="font-black text-brandDeepNavy">Primary sources used</h3>
      <ul className="mt-4 space-y-3 text-xs leading-relaxed text-slate-600">
        <li><a className="font-bold text-brandNavy hover:underline" href="https://fcraonline.gov.in/" target="_blank" rel="noreferrer">MHA FCRA Online portal</a> — live services, fees, deadlines and case counts.</li>
        <li><a className="font-bold text-brandNavy hover:underline" href="https://www.pib.gov.in/PressReleasePage.aspx?PRID=2279410&lang=1&reg=48" target="_blank" rel="noreferrer">PIB portal-launch release</a> — portal features and annual processing volumes.</li>
        <li><a className="font-bold text-brandNavy hover:underline" href="https://fcraonline.nic.in/home/PDF_Doc/fc_gaz_23062026.pdf" target="_blank" rel="noreferrer">Official Gazette</a> — 2026 Amendment Rules.</li>
        <li><a className="font-bold text-brandNavy hover:underline" href="https://prsindia.org/billtrack/the-foreign-contribution-regulation-amendment-bill-2026" target="_blank" rel="noreferrer">PRS Legislative Research</a> — pending Bill and legal issues.</li>
      </ul>
    </div>
  );
}

export default function FcraArticleLayout({ post }: Props) {
  const slugify = (text: string) => text.toLowerCase().replace(/[^\w\s-]/g, '').trim().replace(/\s+/g, '-');

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <nav className="mb-6 flex items-center gap-2 text-xs text-brandMuted md:text-sm">
        <Link href="/" className="font-medium hover:text-brandNavy">Home</Link><span>/</span>
        <Link href="/blog" className="font-medium hover:text-brandNavy">Blog</Link><span>/</span>
        <span className="truncate text-brandText">{post.title}</span>
      </nav>

      <header className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl">
        <div className="grid items-stretch lg:grid-cols-[1.05fr_0.95fr]">
          <div className="bg-gradient-to-br from-brandDeepNavy via-brandNavy to-slate-900 p-7 text-white md:p-11">
            <span className="inline-block rounded-full border border-brandGrowthGreen/30 bg-brandGrowthGreen/15 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-brandBrightGreen">{post.category}</span>
            <h1 className="mt-5 text-3xl font-black leading-tight tracking-tight md:text-5xl">{post.h1}</h1>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-200 md:text-base">{post.metaDescription}</p>
            <div className="mt-6 flex gap-4 text-xs text-slate-300"><span>Published: {post.date}</span><span>•</span><span>{post.readTime}</span></div>
          </div>
          <div className="min-h-[260px] bg-slate-100 lg:min-h-full">
            <img src={post.heroImage || '/images/blog/fcra-2-0-india-2026-guide.png'} alt={post.heroImageAlt || post.h1} className="h-full min-h-[260px] w-full object-cover" loading="eager" />
          </div>
        </div>
      </header>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_0.36fr]">
        <article className="flex flex-col gap-8">
          <div className="rounded-3xl border border-brandBorder bg-white p-6 shadow-sm md:p-8">
            <p className="text-base font-medium leading-relaxed text-slate-800 md:text-lg">{post.intro}</p>
            {post.quickAnswer && <div className="mt-6"><QuickAnswerBox title={post.quickAnswer.title || 'Quick Answer'} question={post.quickAnswer.question} answer={post.quickAnswer.answer} formula={post.quickAnswer.formula} example={post.quickAnswer.example} note={post.quickAnswer.note} links={post.quickAnswer.links} /></div>}
            <AnswerEngineSummary className="mt-6" summary={post.answerEngineSummary || post.intro} />
            <VolumeCards />
            <StatusChart />
            <PortalWindow />

            <div className="mt-8 space-y-10">
              {post.sections.map((section) => (
                <section key={section.title} id={slugify(section.title)} className="scroll-mt-24 border-t border-brandBorder pt-8 first:border-0 first:pt-0">
                  <h2 className="text-xl font-black tracking-tight text-brandDeepNavy md:text-2xl">{section.title}</h2>
                  {section.paragraphs.map((paragraph) => <p key={paragraph} className="mt-4 text-sm leading-relaxed text-slate-700 md:text-base">{paragraph}</p>)}
                  {section.bullets && <ul className="mt-4 list-disc space-y-2.5 pl-6 text-sm text-slate-700 md:text-base">{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}
                  {section.example && <div className="mt-5 rounded-2xl border border-brandNavy/10 bg-brandNavy/[0.02] p-5"><h4 className="text-sm font-bold uppercase tracking-wider text-brandDeepNavy">Practical example: {section.example.title}</h4><p className="mt-2 text-sm leading-relaxed text-slate-700">{section.example.details}</p></div>}
                  {section.title === 'FCRA 2.0 is not one new law' && <FeeChart />}
                  {section.title === 'What the FCRA 2.0 portal changes' && <><PortalWindow login /><PortalGuide /></>}
                </section>
              ))}
            </div>
          </div>
          <FAQSection faqs={post.faqs} />
          <FinanceDisclaimer />
        </article>

        <aside className="flex flex-col gap-6 lg:sticky lg:top-24 lg:self-start">
          <TableOfContents sections={post.sections} />
          <SourcePanel />
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-xs leading-relaxed text-amber-900">
            <p className="font-black">Legal-information notice</p>
            <p className="mt-2">Portal fields and legal requirements can change. Verify the current form, notification and deadline before submitting, and take professional advice for organisation-specific issues.</p>
          </div>
        </aside>
      </div>
    </div>
  );
}
