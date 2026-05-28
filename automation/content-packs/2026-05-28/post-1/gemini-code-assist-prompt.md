# Gemini Code Assist Prompt — RupeeKit Post 1

You are editing the RupeeKit Next.js project. Do not publish directly without review. Create or improve a calculator-backed content page using the details below.

## Target

- Site: https://www.rupeekit.co.in
- Content title: Income Tax Calculator 2026: Prepare for Future Tax Planning with RupeeKit
- Suggested slug: `income-tax-calculator-2026-calculator-guide`
- Target calculator: `income-tax-calculator-old-vs-new-regime-india` — Income Tax Calculator: Old vs New Regime India (FY 2023-24)
- Search intent: Informational and navigational. Users are seeking to understand what 'income tax calculator 2026' implies, how to estimate potential future tax liabilities in India, and how to use a calculator for forward-looking financial planning.
- Google Discover angle: Explain income tax calculator 2026 with a simple India-focused RupeeKit calculator example

## Content requirements

Write human-readable, India-focused content. Avoid generic AI filler. Every section should either explain a calculation, show an example, answer a real user question, or help the user use the calculator correctly.

### Required page sections
- [object Object]
- [object Object]
- [object Object]
- [object Object]
- [object Object]
- [object Object]
- [object Object]
- [object Object]
- [object Object]
- [object Object]
- [object Object]

### Primary keywords
- income tax calculator 2026
- income tax India 2026
- future tax planning India
- income tax estimation India

### Secondary keywords
- new tax regime 2026
- old tax regime 2026
- income tax slabs 2026 India
- tax planning tips India
- financial year 2025-26 tax
- assessment year 2026-27 tax
- RupeeKit income tax calculator
- income tax budget changes India

### Calculator improvements
- Add a prominent disclaimer on the calculator page stating that calculations are based on current FY rules and future rules (e.g., for FY 2025-26 / AY 2026-27) may vary significantly.
- Introduce an optional 'Future Projection' input field where users can specify an expected annual income growth percentage to see how their tax liability might change over time based on current rules.
- Include a tooltip or small info icon next to the calculator title explaining the distinction between Financial Year and Assessment Year, especially concerning the '2026' context.
- Develop a 'Compare Years' feature allowing users to see their current year's tax vs. a hypothetical future year's tax (based on current rules and projected income/deductions).

## Implementation rules

1. Preserve existing calculator formula logic unless a human explicitly asks to change it.
2. Use numeric inputs only for calculator fields.
3. Formula syntax must remain compatible with the current RupeeKit parser.
4. Add clear assumptions, examples, FAQ, and internal links.
5. Add schema suggestions where appropriate: FAQPage, BreadcrumbList, SoftwareApplication/Calculator-like structured data if already supported by the project.
6. Add or confirm `max-image-preview:large` is enabled in site metadata/robots configuration.
7. Do not include financial advice, tax advice, investment recommendations, guaranteed returns, or fake urgency.

## CSS animation requirement

Implement subtle animation only where it improves understanding:
- Subtle hover effects on calculator input fields and result boxes to indicate interactivity and focus.
- A smooth, progressive loading animation for the example tables or charts, revealing data points one by one.
- Small, engaging animation (e.g., numbers counting up) when the calculator results are displayed, making the output feel dynamic.
- A 'scroll to top' button that subtly appears after scrolling down a certain distance, with a smooth scroll animation.

Prefer CSS transitions and lightweight React state. Avoid heavy animation libraries unless already installed. Keep performance mobile-friendly.

## Image handling

Do not call Gemini image API from the website code. The automation will create blank RupeeKit logo templates and prompts. Add image slots/placeholders so the reviewed final image can be placed later.

Website hero prompt to use separately:
Create a clean finance calculator hero image.

## Manual source checklist
- Official Income Tax Department of India website (incometax.gov.in) for current tax laws, rules, and notifications.
- Union Budget documents for the relevant financial years (e.g., FY 2023-24, and any future budgets that might impact FY 2025-26).
- Notifications and circulars issued by the Central Board of Direct Taxes (CBDT).
- Reputable Indian financial news publications (e.g., Livemint, The Economic Times, Business Standard) for expert analysis and commentary on tax policy.
- Publications or insights from recognized chartered accountants or tax consulting firms in India (for general principles and explanations, not specific advice).

## Acceptance criteria

- Page is useful without depending on search traffic.
- Calculator is visible above or near the key explanation.
- Content has a worked example and assumptions.
- Metadata title is under ~60 characters where practical.
- Meta description is under ~155 characters where practical.
- No hallucinated official rules or claims.
- Build/lint passes.
