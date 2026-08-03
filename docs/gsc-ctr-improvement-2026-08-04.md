# GSC CTR Improvement — 4 August 2026

## 1. GSC baseline (last 28 days, export dated 4 August 2026)

- **Impressions:** ~9,567
- **Clicks:** 54
- **Overall CTR:** 0.56%
- **Average position:** 17.35
- ~5,702 impressions came from pages averaging positions 1–10.
- ~1,101 impressions came from page-one-ranking pages that received **zero clicks**.

Highest-impression zero/low-click pages targeted in this change:

| URL | Clicks | Impressions | CTR | Position |
| --- | ---: | ---: | ---: | ---: |
| /blog/itr-2-ay-2026-27-filing-guide | 5 | 961 | 0.52% | 4.54 |
| /tools/personal-loan-emi-calculator-india | 3 | 602 | 0.50% | 12.9 |
| /tools/8th-pay-commission-salary-calculator-india | 3 | 521 | 0.58% | 7.15 |
| /tools/emergency-fund-calculator-india | 1 | 507 | 0.20% | 8.9 |
| /blog/zerodha-vs-upstox-vs-angel-one-demat-account | 2 | 467 | 0.43% | 5.04 |
| /blog/new-labour-code-gratuity-rules-india-2026 | 3 | 458 | 0.66% | 4.83 |
| /tools/income-tax-calculator-old-vs-new-regime-india | 0 | 398 | 0% | 42.12 |
| /tools/capital-gains-tax-calculator-india | 0 | 332 | 0% | 4.32 |
| /tools/sip-calculator-india | 0 | 187 | 0% | 3.33 |

## 2. Why the work prioritises existing high-impression pages

These pages already rank (several average position 3–9) but convert impressions to clicks
poorly. Improving title/description intent-match, adding direct answers above the fold,
and fixing functional gaps (notably missing FY 2025-26 support in the tax calculator)
is the fastest path to more organic clicks — no new URLs, no new crawling/indexing risk,
no cannibalisation. All slugs and canonical URLs are unchanged.

## 3. Page-by-page changes

### /blog/itr-2-ay-2026-27-filing-guide
- Title: `ITR-2 Filing AY 2026-27: July 31 Deadline, Who Must File` → `ITR-2 AY 2026-27: Deadline, Documents & Late Filing`
- Meta description rewritten (old one hardcoded a stale "due date is July 31, 2026" claim).
- Quick-answer box repurposed into a **deadline/status box**: statutory 31 July baseline with explicit "CBDT can extend — verify on the portal" language, belated-return deadline 31 Dec 2026, revised-return availability, §234F fee bands (₹1,000/₹5,000), verification date (3 Aug 2026).
- New sections: who should **not** file ITR-2; salary/pension & house-property income; capital gains (Schedule CG); foreign assets (Schedule FA); unlisted shares & directorship; revised return; belated return; what to do next.
- Stale FAQs updated (standard deduction ₹75,000 for AY 2026-27; regime comparison at ₹12L; belated/revised windows).
- Descriptive internal links to the capital gains calculator, old-vs-new regime calculator, salary in-hand calculator, and the LTCG-exemption guide.
- Fixed chart data: revised-return deadline corrected from "before 31 Mar 2027" to 31 Dec 2026.

### /blog/new-labour-code-gratuity-rules-india-2026
- Title: `Gratuity Rules 2026: New 1-Year Rule for Contract Workers` → `New Gratuity Rules 2026: 1-Year vs 5-Year Rule`
- Meta description rewritten to cover both regular and fixed-term eligibility.
- New above-the-fold **eligibility comparison table** (regular employee / eligible fixed-term employee / death-disablement) with an explicit caution that not every contract worker qualifies after one year.
- New sections: death & disablement exceptions; common misconceptions (myth-vs-reality format).
- Quick-answer links to the gratuity calculator, the old-vs-new gratuity guide, and the fixed-term one-year guide.
- All existing official citations (PIB, Ministry of Labour FAQs) preserved.

### /tools/capital-gains-tax-calculator-india
- Title: `Capital Gains Tax Calculator AY 2026-27: 20% STCG, 12.5% LTCG` → `Capital Gains Tax Calculator India 2026 | STCG & LTCG`
- Scope banner near the H1: listed equity + equity-oriented MFs only; explicitly **not** property, debt funds, gold, crypto or unlisted shares.
- Four accessible presets: ₹1L STCG, ₹3L LTCG, LTCG below exemption, both combined. (No tax-loss set-off preset — the calculator does not implement set-off, and per instructions no preset was added for unsupported functionality.)
- New content section: why final filing liability may differ (87A special-rate treatment, loss set-off, surcharge, grandfathering).
- Official source reference added (Income Tax e-filing portal).

### /tools/sip-calculator-india
- Title: `SIP Calculator India 2026: Corpus, Step-Up & Cost of Delay` → `SIP Calculator India 2026 | Step-Up, Goal & Delay Cost`
- Above-the-fold feature strip: regular / step-up / goal SIP, delay cost, missed SIP, pause-restart, inflation-adjusted value, EMI-to-SIP redirect.
- Six scenario presets (₹5k×10y, ₹10k×15y, ₹1 crore goal, regular-vs-step-up, start-late, 6-month pause) wired into the existing SIP planner state.
- All result copy retains "estimates, not guarantees" language.

### /tools/emergency-fund-calculator-india
- Title: `Emergency Fund Calculator India 2026 | Include EMIs` → `Emergency Fund Calculator India | 3-12 Months + EMI`
- Direct answer rendered **above the calculator**: target = (essential expenses + unavoidable EMIs) × months of protection, with guidance on choosing 3/6/9/12 months.
- Five transparent scenario presets (stable salaried, single-income family, family with home-loan EMI, freelancer, job-loss preparation) — each description states exactly which multiplier/buffer it sets.
- Internal links extended: salary in-hand calculator and the emergency-fund-with-EMI guide (SIP/FD/personal-loan links already existed).

### /blog/zerodha-vs-upstox-vs-angel-one-demat-account
- Title: `Zerodha vs Upstox vs Angel One 2026: Best Demat Account India` → `Zerodha vs Upstox vs Angel One 2026: Brokerage & AMC`
- Comparison card moved to render **immediately after the first section** and expanded with account-opening, delivery, intraday, F&O, AMC, platform, MF, API, NRI and best-for rows.
- **Corrected factual error:** the article claimed all three brokers charge zero delivery brokerage. As of verification, only Zerodha is ₹0; Upstox and Angel One charge ₹20 or 0.1% per delivery order (whichever lower).
- "Charges last verified: 3 August 2026" added to the card and body copy.
- Removed a leftover internal editor note ("replace the placeholder links…") that was rendering publicly.
- Neutral affiliate disclosure retained/expanded; "no broker is universally best" statement added.

### /tools/8th-pay-commission-salary-calculator-india
- Title: `8th Pay Commission Salary Calculator India 2026 — Free Estimate` → `8th Pay Commission Calculator | Fitment Factor Scenarios`
- Five scenario presets: 1.92×, 2.08×, 2.57×, 2.86×, 3.00× — none labelled "expected/confirmed/official".
- Side-by-side revised-basic-pay table for all five factors, driven by the user's current basic.
- Visible disclaimer that no final fitment factor has been notified.
- Stale copy fixed: "implementation expected from January 2026" replaced with the verified status (commission constituted 3 Nov 2025, ToR approved 28 Oct 2025, ~18-month report window, nothing notified).

### /tools/personal-loan-emi-calculator-india
- Metadata retained (existing title/description already matched the target).
- Eight presets: ₹5L/₹10L/₹15L/₹20L scenarios, 3-yr vs 5-yr tenure, 11%/14%/18%/24% example rates, processing-fee+GST — all labelled as examples, not live lender offers.
- New "Flat rate vs reducing-balance rate" section linking the existing guide.
- Internal links extended: eligibility calculator, true-APR guide, flat-vs-reducing guide, foreclosure net-savings calculator, salary in-hand calculator.

### /tools/income-tax-calculator-old-vs-new-regime-india (functional fix)
- See §5 below. Page copy updated: "planning only" fallback removed, FY 2025-26 declared supported and default, AY 2026-27 stated, special-rate-income scope banner added, FAQs updated, `dateModified` set to 2026-08-03.

## 4. Before-and-after metadata summary

| URL | Old title | New title |
| --- | --- | --- |
| /blog/itr-2-ay-2026-27-filing-guide | ITR-2 Filing AY 2026-27: July 31 Deadline, Who Must File | ITR-2 AY 2026-27: Deadline, Documents & Late Filing |
| /blog/new-labour-code-gratuity-rules-india-2026 | Gratuity Rules 2026: New 1-Year Rule for Contract Workers | New Gratuity Rules 2026: 1-Year vs 5-Year Rule |
| /tools/capital-gains-tax-calculator-india | Capital Gains Tax Calculator AY 2026-27: 20% STCG, 12.5% LTCG | Capital Gains Tax Calculator India 2026 \| STCG & LTCG |
| /tools/sip-calculator-india | SIP Calculator India 2026: Corpus, Step-Up & Cost of Delay | SIP Calculator India 2026 \| Step-Up, Goal & Delay Cost |
| /tools/emergency-fund-calculator-india | Emergency Fund Calculator India 2026 \| Include EMIs | Emergency Fund Calculator India \| 3-12 Months + EMI |
| /blog/zerodha-vs-upstox-vs-angel-one-demat-account | Zerodha vs Upstox vs Angel One 2026: Best Demat Account India | Zerodha vs Upstox vs Angel One 2026: Brokerage & AMC |
| /tools/8th-pay-commission-salary-calculator-india | 8th Pay Commission Salary Calculator India 2026 — Free Estimate | 8th Pay Commission Calculator \| Fitment Factor Scenarios |
| /tools/personal-loan-emi-calculator-india | (unchanged) Personal Loan EMI Calculator 2026 \| EMI, Fees & Total Cost | (unchanged) |
| /tools/income-tax-calculator-old-vs-new-regime-india | (unchanged) Old vs New Tax Regime Calculator India FY 2025-26 \| Free | (unchanged; description updated) |

## 5. Functional changes

### Reusable preset component
`components/calculators/CalculatorPresets.tsx` — accessible button group (`type="button"`,
`aria-pressed`, focus-visible rings, flex-wrap for mobile), values validated and clamped
against each input's min/max before applying, active state cleared on manual edits, no
form submission/reload/auto-scroll. Config-driven via an optional `presets` field on the
`Tool` type (data lives in `data/tools.json`); custom calculators (SIP planner,
personal-loan simulator) wire the same component into their own state. The personal-loan
integration uses the existing `trackToolEvent` analytics abstraction.

### FY 2025-26 tax engine (`lib/tax/`)
- `indiaIncomeTaxRules.ts`: new `'2025-26'` config (AY 2026-27) — new-regime slabs 0/5/10/15/20/25/30% at 4/8/12/16/20/24L boundaries, standard deduction ₹75,000, rebate limit ₹12,00,000, `maxRebate` ₹60,000, marginal relief on; old regime unchanged (₹50,000 SD, ₹5L rebate limit, `maxRebate` ₹12,500).
- New explicit `maxRebate` field on `TaxRegimeConfig`; rebate is now `min(totalSlabTax, maxRebate)` instead of conceptually unlimited. Existing years given their statutory caps (₹12,500 old / ₹25,000 new) — behaviour verified unchanged by tests.
- `calculator.ts`: cess now uses the configured `cessRate` (was hardcoded 0.04); unused `remainingIncome` removed; marginal relief logic unchanged and verified at the ₹12L threshold.
- UI: year selector now derives from `availableTaxYears` (FY 2025-26 first), default year 2025-26.

## 6. Tax-rule implementation notes

| Item | Value implemented | Basis |
| --- | --- | --- |
| New-regime slabs FY 2025-26 | 0–4L nil; 4–8L 5%; 8–12L 10%; 12–16L 15%; 16–20L 20%; 20–24L 25%; >24L 30% | Finance Act, 2025 (Budget 2025) |
| New-regime standard deduction | ₹75,000 (salaried) | Finance Act, 2025 |
| §87A rebate (new regime) | up to ₹60,000, taxable income ≤ ₹12,00,000, marginal relief above | Finance Act, 2025 |
| Old-regime | unchanged: ₹50,000 SD, ₹12,500 rebate ≤ ₹5L | unchanged law |
| Cess | 4% from config | unchanged law |
| Scope limitation | resident individual, normal slab income only; special-rate income (equity STCG/LTCG) not modelled — stated on-page | §87A restrictions on special-rate income |

## 7. Official sources consulted

- Income Tax Department portal guidance (deadline framework, §234F, §139(4)/(5)) — regular AY 2026-27 due-date status could **not** be conclusively confirmed from a primary CBDT circular at implementation time; content therefore states the statutory baseline plus "verify on incometax.gov.in", and the belated/revised windows.
- Finance Act, 2025 / Budget 2025 tax parameters (corroborated across multiple current tax references).
- Broker pricing (Zerodha /charges, Upstox, Angel One published pricing, corroborated via multiple 2026 pricing trackers; direct fetch of broker pricing pages was blocked by the build environment's proxy — flagged for manual re-verification below).
- PIB / 8th CPC status: commission constituted 3 Nov 2025, ToR approved 28 Oct 2025, no fitment factor notified.
- PIB release + Ministry of Labour & Employment FAQs for gratuity (citations already present in the article, preserved).

## 8. Files changed

- `app/tools/[slug]/page.tsx` — SEO override map refactor, above-the-fold blocks, link clusters
- `app/tools/income-tax-calculator-old-vs-new-regime-india/page.tsx` — FY 2025-26 support copy, scope banner, metadata
- `components/Calculator.tsx` — preset wiring, 8th CPC side-by-side table
- `components/calculators/CalculatorPresets.tsx` — new reusable component
- `components/sip/SipPlannerCalculator.tsx` — SIP presets
- `components/personal-loan/PersonalLoanDecisionSimulator.tsx` — loan presets
- `components/tax/TaxCalculatorApp.tsx`, `components/tax/TaxInputForm.tsx` — default year, dynamic year list
- `components/blog/BlogArticleLayout.tsx` — gratuity table, broker card repositioned
- `components/blog/BrokerComparisonCard.tsx` — verified charges, new rows, verification date
- `lib/tax/indiaIncomeTaxRules.ts`, `lib/tax/calculator.ts`, `lib/tax/calculator.test.ts` — FY 2025-26 engine + tests
- `lib/tools.ts` — `ToolPreset` type
- `data/tools.json` — metadata, presets, 8th CPC copy fixes
- `data/blog-posts.ts` — ITR-2, gratuity, broker articles
- `data/itr2-ay-2026-27-chart-data.ts` — revised-return date fix
- `public/llms.txt` — 8th CPC and tax-calculator descriptions, last-updated date
- `docs/gsc-ctr-improvement-2026-08-04.md` — this document

## 9. URLs to request indexing for after deployment

1. /blog/itr-2-ay-2026-27-filing-guide
2. /blog/new-labour-code-gratuity-rules-india-2026
3. /tools/capital-gains-tax-calculator-india
4. /tools/sip-calculator-india
5. /tools/emergency-fund-calculator-india
6. /blog/zerodha-vs-upstox-vs-angel-one-demat-account
7. /tools/8th-pay-commission-salary-calculator-india
8. /tools/personal-loan-emi-calculator-india
9. /tools/income-tax-calculator-old-vs-new-regime-india

## 10. Validation commands run

| Command | Result |
| --- | --- |
| `npm ci` | OK |
| `npx tsc --noEmit` | OK, no errors |
| `npm test` (vitest) | 9 files, 43 tests passed (incl. 14 new FY 2025-26 tax tests) |
| `npm run lint` | No ESLint warnings or errors |
| `npm run validate` (tools, growth, ai-seo, discover-images) | All passed |
| `npm run build` + postbuild `validate:discover-rendered` | Build OK; 67 Discover pages validated |
| Rendered-HTML checks (script) | Titles/descriptions server-rendered; single canonical; no noindex; `max-image-preview:large`; all JSON-LD parses; no duplicate schema |
| Playwright smoke tests against `next start` | 6/6 passed — presets on capital-gains/8th-pay/emergency-fund/personal-loan, SIP preset on 390px mobile viewport, tax calculator defaults to FY 2025-26; zero page errors |

## 11. Expected KPI and measurement plan

- Monitor GSC page-level impressions, clicks, CTR and average position at **7, 14 and 28 days** after re-indexing.
- Primary target: **≥ 2% CTR** on the page-one opportunity set (ITR-2 guide, gratuity guide, broker comparison, capital gains calculator, SIP calculator, 8th CPC calculator).
- Secondary: non-zero clicks on /tools/capital-gains-tax-calculator-india and /tools/sip-calculator-india (currently 0 clicks at positions 4.3 / 3.3); improved position for the tax-regime calculator as FY 2025-26 relevance signals build.
- These targets are goals, **not guarantees** — search CTR depends on SERP features, competitors and query mix.

## 12. Manual follow-ups

- **Broker charges**: re-verify Zerodha/Upstox/Angel One pricing on their official pricing pages periodically (direct fetch was proxy-blocked during this change); Angel One first-year AMC treatment specifically flagged.
- **ITR deadline**: if/when CBDT publishes a circular on the AY 2026-27 regular due date, update the ITR-2 deadline box.
- **8th CPC**: replace scenario language once official recommendations are notified.
- **Discover images**: all nine priority pages already have valid ≥1200px mappings — no new images needed in this PR.
