# GA4 admin checklist — RupeeKit

Last reviewed: 2026-08-29

This checklist is the manual follow-up for issue #63. The repository sends the calculator events in code; GA4 property configuration still requires a human with the appropriate Analytics/Search Console permissions.

## 1. Verify the four calculator events first

Open **GA4 → Reports → Realtime** and **Admin → Data display → DebugView** while using the production or preview site with analytics enabled.

Confirm these events appear:

- `calculator_used`
- `result_viewed`
- `guide_click`
- `tool_cta_click`

For every calculator event, confirm the event parameters include:

- `tool_slug`
- `tool_category`

For click events also confirm:

- `destination`
- `cta_type` on `tool_cta_click`

### Six-file smoke-test matrix

Use at least one tool backed by each tool data file:

| Data file | Suggested live tool |
|---|---|
| `data/tools.json` | `/tools/personal-loan-emi-calculator-india` |
| `data/growth-tools.json` | `/tools/home-loan-swp-stress-test-india` |
| `data/decision-tools-2026.json` | `/tools/rent-vs-buy-calculator-india` |
| `data/insurance-tools-2026.json` | `/tools/term-life-insurance-cover-calculator-india` |
| `data/investing-tools-2026.json` | `/tools/index-fund-vs-active-fund-cost-calculator-india` |
| `data/lifestage-tools-2026.json` | `/tools/child-education-cost-planner-india` |

For each tool, change an input or use a calculator control and verify `calculator_used` and `result_viewed` carry that tool's slug and category. Then click a guide/related-tool CTA where available and verify the matching click event.

## 2. Mark the important events as key events

After GA4 has received the event names, mark the following as key events if they represent the actions you want in top-level reporting:

- `calculator_used`
- `result_viewed`
- `guide_click`
- `tool_cta_click`

Recommended RupeeKit interpretation:

- `calculator_used`: primary product-use signal.
- `result_viewed`: completion signal while baseline completion rates are established.
- `guide_click`: secondary engagement signal.
- `tool_cta_click`: secondary cross-tool engagement signal.

Do not create fake conversions or assign monetary values that do not exist.

## 3. Register `tool_slug` and `tool_category` as custom dimensions

Open **Admin → Data display → Custom definitions → Custom dimensions → Create custom dimension**.

Create:

1. Dimension name: `Tool slug`
   - Scope: **Event**
   - Event parameter: `tool_slug`
2. Dimension name: `Tool category`
   - Scope: **Event**
   - Event parameter: `tool_category`

## 4. Confirm data retention

Open the GA4 property's **Admin** area and locate **Data retention**. Confirm the retention setting matches RupeeKit's analysis needs and privacy policy. Do not increase retention simply because a longer setting is available.

## 5. Link GA4 to Google Search Console

1. Open **GA4 → Admin**.
2. Under **Product links**, open **Search Console Links**.
3. Click **Link**.
4. Choose the verified RupeeKit Search Console property.
5. Choose the RupeeKit web data stream.
6. Review and submit.

## 6. Engagement-time issue: code diagnosis and verification

### What the code audit found

Before issue #63, `app/layout.tsx` called `gtag('config', GA_ID)` once in the persistent root layout. The codebase had no explicit App Router route-change `page_view` path. Calculator custom events could therefore fire on a client-navigated tool route without a corresponding RupeeKit-owned route-transition page view.

That is a concrete measurement gap and a plausible contributor to the observed `0.00s` engagement rows. Historical GA4 data alone cannot prove it caused every zero-second row.

### What changed

- Automatic page-view sending from the initial GA4 config is disabled with `send_page_view: false`.
- `GoogleAnalyticsRouteTracker` explicitly emits a `page_view` on the initial route and every App Router pathname change.
- The tracker flushes `user_engagement` with `engagement_time_msec` when the page is hidden, on page hide, or on route transition.
- Analytics calls are guarded when `window.gtag` is unavailable, so SSR and ad blockers do not throw.

### How to verify after deploy

1. Open DebugView.
2. Load a calculator directly and confirm one `page_view`.
3. Navigate client-side to another calculator and confirm a second `page_view` without a full reload.
4. Spend at least 5–10 seconds on the page, interact, then navigate away or background the tab.
5. Inspect `user_engagement` and confirm `engagement_time_msec` is present and non-zero.
6. Confirm there is no duplicate initial `page_view`.
7. Re-check affected pages after enough fresh traffic has accumulated; historical zero-second rows will not be rewritten.

## Privacy boundary

Analytics events must never include entered salary, loan amount, bank balance, tax values, PAN, Aadhaar, bank details, email addresses, or any other user-entered financial/personal values. RupeeKit sends only route/tool identifiers and CTA destinations required for aggregate product analytics.
