# Gemini Code Assist Prompt — RupeeKit Post 2

You are editing the RupeeKit Next.js project. Do not publish directly without review. Create or improve a calculator-backed content page using the details below.

## Target

- Site: https://www.rupeekit.co.in
- Content title: SIP Calculator Monthly Investment: Plan Your Wealth Growth in India with RupeeKit
- Suggested slug: `sip-calculator-monthly-investment-calculator-guide`
- Target calculator: `sip-calculator-india` — SIP Calculator India
- Search intent: Informational and navigational. Users are looking to understand how SIP monthly investments work, calculate potential returns, and find a reliable tool to do so.
- Google Discover angle: Explain sip calculator monthly investment with a simple India-focused RupeeKit calculator example

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
- sip calculator monthly investment
- sip
- investment
- calculator

### Secondary keywords
- monthly sip calculator
- sip investment plan
- best sip calculator india
- how to calculate sip monthly
- sip return calculator
- sip benefits
- long term sip investment
- rupeekit sip calculator
- sip planning india
- systematic investment plan monthly

### Calculator improvements
- **Scenario Comparison Tool:** Allow users to compare 2-3 different SIP scenarios side-by-side (e.g., different monthly amounts, different tenures, or varying expected returns) to visualize impact.
- **Goal-Based SIP Planning:** Add an input field where users can specify a financial goal (e.g., '₹X Lakhs in Y years') and the calculator suggests the required monthly SIP amount.
- **Inflation-Adjusted Returns:** Provide an option to show the 'real' value of the maturity amount after adjusting for a user-defined or average Indian inflation rate.
- **Interactive Growth Chart:** A dynamic line graph showing the growth of total investment vs. wealth gained over the investment period.
- **Download/Share Results:** Option to download the calculation results as a PDF or share a direct link to the specific calculation.

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
- **Subtle Number Increment:** When calculation results appear, the numbers (total investment, wealth gained, maturity amount) gently animate from zero or a lower value to their final calculated value.
- **Progress Bar for Tenure:** A subtle animation on the investment tenure input, perhaps a small bar filling up as the period increases.
- **Coin/Rupee Icon Animation:** Small, tasteful animation of a rupee coin or growth arrow appearing or subtly moving near the 'Wealth Gained' section.
- **Input Field Focus Effect:** A clean, minimal border or background highlight animation when an input field is focused, guiding the user's attention.

Prefer CSS transitions and lightweight React state. Avoid heavy animation libraries unless already installed. Keep performance mobile-friendly.

## Image handling

Do not call Gemini image API from the website code. The automation will create blank RupeeKit logo templates and prompts. Add image slots/placeholders so the reviewed final image can be placed later.

Website hero prompt to use separately:
Create a clean finance calculator hero image.

## Manual source checklist
- Official SEBI (Securities and Exchange Board of India) guidelines on mutual funds and investment regulations.
- AMFI (Association of Mutual Funds in India) data, reports, and investor awareness materials.
- Reputable Indian financial news outlets (e.g., Livemint, Economic Times, Business Standard) for market trends and expert opinions.
- RBI (Reserve Bank of India) publications or data relevant to inflation and economic indicators in India.
- Academic papers or studies on investment behavior and SIP effectiveness in emerging markets like India (if accessible and relevant).

## Acceptance criteria

- Page is useful without depending on search traffic.
- Calculator is visible above or near the key explanation.
- Content has a worked example and assumptions.
- Metadata title is under ~60 characters where practical.
- Meta description is under ~155 characters where practical.
- No hallucinated official rules or claims.
- Build/lint passes.
