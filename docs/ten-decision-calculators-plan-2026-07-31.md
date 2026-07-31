# RupeeKit Ten Decision Calculators — Design and Rollout Plan

Date: 2026-07-31

## Scope

This release adds ten data-driven calculators through the existing `/tools/[slug]` route and shared calculator engine:

1. Rent vs Buy Calculator India
2. Home Affordability Calculator India
3. Job Offer Comparison Calculator India
4. Salary Increment Calculator India
5. Bonus Tax Calculator India
6. FIRE Calculator India
7. Net Worth Calculator India
8. Education Loan EMI & Tax Benefit Calculator India
9. Rental Yield Calculator India
10. Debt Snowball Calculator India

## Product design

Each page uses the existing RupeeKit calculator UI, metadata generation, self-canonical URL, visible FAQ rendering, related-tool links, and formula evaluation. The calculators are intentionally decision-focused rather than copies of basic EMI or SIP tools.

## Review priorities

- Verify every default scenario manually against an independent spreadsheet.
- Check zero and boundary values, especially interest rates and payment amounts.
- Review tax-related wording for the bonus and education-loan tools.
- Confirm all related slugs resolve to live pages; unresolved links are automatically omitted by the shared engine.
- Add Discover-ready hero artwork before promoting these pages.
- Review mobile labels and output ordering.

## Release sequence

Recommended launch order: Home Affordability, Rent vs Buy, Salary Increment, Job Offer Comparison, Rental Yield, Net Worth, FIRE, Bonus Tax, Education Loan, Debt Snowball.

## Search and internal-link clusters

- Housing: affordability → rent vs buy → rental yield → home-loan EMI
- Salary: increment → offer comparison → in-hand salary → bonus tax
- Planning: net worth → FIRE → emergency fund → SIP
- Debt: education loan → EMI → debt snowball → credit utilisation

## Safety boundaries

All results are educational estimates. No page promises approval, savings, returns, tax outcomes, or personalised advice. User-entered rates and returns are assumptions rather than live market data.
