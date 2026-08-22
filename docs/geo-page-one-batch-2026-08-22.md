# GEO batch 1 — page-one calculators — 2026-08-22

Follow-up to `docs/ai-controls-llms-robots-audit-2026-08-22.md`. With Search
generative AI set to Include, the remaining lever is content that AI surfaces
can quote. This batch targets pages that already rank, because generative
surfaces draw from pages with existing organic visibility.

## Selection

Prioritised by average position from `docs/ctr-readout-2026-08-19.md`
(8–14 Aug evidence cut), not by traffic potential:

| Page | Impr. | Avg pos | What was missing |
|---|---:|---:|---|
| `/tools/capital-gains-tax-calculator-india` | 332 | 4.32 | facts table only |
| `/tools/sip-calculator-india` | 187 | 3.33 | facts table only |
| `/tools/emergency-fund-calculator-india` | 507 | 8.90 | facts table only |
| `/tools/salary-in-hand-calculator-india` | 528 | 13.46 | everything |
| `/tools/emi-calculator-india` | — | — | everything |
| `/tools/gst-calculator-india` | — | — | everything |
| `/tools/fd-calculator-india` | — | — | sections, steps, facts |

Deliberately excluded: pages at position 30–70 (personal-loan-eligibility 54.6,
net-worth 45.9, income-tax-old-vs-new 42.1, SSY 37.6, gold-loan 30.0). Those
have a ranking problem, not an extraction problem, and structured answers there
would not be quoted by anything. `/tools/income-tax-calculator-old-vs-new-regime-india`
also renders from its own bespoke route with a Quick Answer, facts table and
question-shaped H2s already in place — its empty data record is not a content gap.

## Encoding bug fixed first

`data/tools.json` carried 116 mojibake runs — UTF-8 read as cp1252 — across nine
calculators: 109 rupee signs, four multiplication signs, two en dashes and one
minus sign. `app/tools/[slug]/page.tsx:1483` renders `formulaExplanation`
verbatim, so the EMI page was publishing `P Ã— r Ã— (1+r)^n` as its method
statement. `lib/seo/llms-full.ts` sanitises the same strings on the way into
llms-full.txt, which is why the catalog looked clean while the HTML pages did
not. Affected: emi, sip, gst, fd, income-tax, hra, 80c, gratuity,
recurring-deposit. A garbled formula is exactly what stops an answer engine
quoting the method.

## What was added

Per page: a `quickAnswer` phrased as the question a person actually types,
`howToUse` steps (these emit HowTo schema), `contentSections` with question
headings and bullet lists, `factRows`, and extra query-shaped FAQs where the
page had only two.

The previous state matters: 33 of 63 calculators have no hand-written
`quickAnswer` and fall back to `buildFallbackQuickAnswer`
(`app/tools/[slug]/page.tsx:1052`), which answers "How does this calculator
work?" — a question nobody searches. Likewise `factRows` was set on only 2 of
63 tools, so 61 pages rendered the same generic "Calculation type: Formula-based
educational estimate" table. Near-duplicate blocks sitewide are not the
structured data generative surfaces extract from.

Every figure quoted in the new copy is reproduced by the calculator's own
formula, verified against rendered build output — the EMI page states
Rs 20,758 / Rs 12,45,501 / Rs 2,45,501 and the calculator's default result
prints the same three numbers. No new statutory claim was introduced: GST slab
values and FD TDS thresholds are deliberately described by mechanism and
referred to official sources rather than quoted, since both have moved recently.

## Remaining

- 29 calculators still on the generic fallback Quick Answer.
- 56 calculators still on the generic facts table.
- The 27 August cluster tools still carry two FAQs each and no content sections.
