import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Free Calculator API and MCP Tools',
  description: 'Use RupeeKit India-focused finance calculators through a public JSON API or MCP tools with methodology, assumptions, sources, and disclaimers.',
  alternates: { canonical: '/api-docs' },
};

const example = `POST /api/v1/calculators/emergency-fund-calculator-india\nContent-Type: application/json\n\n{\n  "inputs": {\n    "monthlyEssentialExpenses": 30000,\n    "monthlyEmiCommitments": 10000,\n    "targetMonths": 6\n  }\n}`;

export default function ApiDocsPage() {
  return (
    <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <p className="text-sm font-semibold text-brandOrange">RupeeKit for developers and AI assistants</p>
      <h1 className="mt-2 text-4xl font-bold text-brandDeepNavy">Calculator API and MCP tools</h1>
      <p className="mt-5 text-lg text-slate-700">Access RupeeKit’s live calculator definitions and educational estimates in a machine-readable format. Every calculation includes its methodology page, assumptions, review date, sources, privacy note, and safe disclaimer.</p>

      <section className="mt-10 rounded-2xl border border-brandBorder bg-white p-6">
        <h2 className="text-2xl font-bold text-brandDeepNavy">JSON API</h2>
        <ul className="mt-4 space-y-2 text-slate-700">
          <li><code>GET /api/v1/calculators</code> — list live calculators.</li>
          <li><code>GET /api/v1/calculators/{'{slug}'}</code> — get inputs, outputs, methodology, and sources.</li>
          <li><code>POST /api/v1/calculators/{'{slug}'}</code> — calculate an estimate.</li>
        </ul>
        <pre className="mt-5 overflow-x-auto rounded-xl bg-slate-950 p-4 text-sm text-slate-100"><code>{example}</code></pre>
        <p className="mt-4"><a className="font-semibold text-brandOrange underline" href="/api/openapi">OpenAPI 3.1 document</a></p>
      </section>

      <section className="mt-8 rounded-2xl border border-brandBorder bg-white p-6">
        <h2 className="text-2xl font-bold text-brandDeepNavy">MCP endpoint</h2>
        <p className="mt-3 text-slate-700">Connect an MCP-compatible client to <code>https://www.rupeekit.co.in/api/mcp</code>. Available tools are <code>list_calculators</code>, <code>get_calculator</code>, and <code>calculate</code>.</p>
        <p className="mt-3 text-slate-700">AI assistants should cite the canonical calculator or methodology URL returned by each tool and must preserve the educational-use disclaimer.</p>
      </section>

      <section className="mt-8 rounded-2xl bg-amber-50 p-6 text-amber-950">
        <h2 className="text-xl font-bold">Responsible-use rules</h2>
        <p className="mt-2">Do not send PAN, Aadhaar, bank details, or other sensitive information. Results are general educational estimates—not personalized financial, tax, legal, loan, or investment advice. Review the linked calculator page before relying on a result.</p>
      </section>

      <p className="mt-8 text-slate-700">Want to inspect the calculators first? <Link className="font-semibold text-brandOrange underline" href="/tools">Browse all RupeeKit tools</Link>.</p>
    </article>
  );
}
