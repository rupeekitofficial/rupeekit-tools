# GA4 admin checklist — RupeeKit

Last reviewed: 2026-08-10

This checklist is the manual follow-up for issue #63. The repository now sends the calculator events in code; GA4 property configuration still requires a human with the appropriate Analytics/Search Console permissions.

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

Google documents Realtime and DebugView as the primary ways to verify events and key events as they arrive:
https://support.google.com/analytics/answer/12571843

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

After GA4 has received the event names, open the property's event/key-event management screen and mark the following as key events if they represent the actions you want in top-level reporting:

- `calculator_used`
- `result_viewed`
- `guide_click`
- `tool_cta_click`

Google's current terminology is **key event**. Any collected event can be marked as a key event when it represents an action important to the site's success:
https://support.google.com/analytics/answer/9267568

Recommended RupeeKit interpretation:

- `calculator_used`: primary product-use signal; mark as a key event.
- `result_viewed`: useful completion signal; mark as a key event while we establish baseline completion rates.
- `guide_click`: secondary engagement signal; mark if the team wants guide progression in key-event reports.
- `tool_cta_click`: secondary engagement signal; mark if cross-tool progression is an explicit KPI.

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

Google's official instructions for event-scoped custom dimensions are here:
https://support.google.com/analytics/answer/14239696

The parameter must already be collected before it becomes useful in reporting. Newly registered custom dimensions can take roughly 24–48 hours to become available in standard reporting/explorations.

## 4. Confirm data retention

Open the GA4 property's **Admin** area and locate **Data retention** under the property's data settings/data collection controls. Confirm the retention setting matches the site's analysis needs and privacy policy.

For a standard GA4 property, Google currently supports up to 14 months of event/user-level retention for explorations. Do not increase retention simply because the maximum exists; choose the period intentionally and keep the privacy page consistent with the actual setup.

Reference:
https://support.google.com/analytics/answer/12229528

## 5. Link GA4 to Google Search Console

Prerequisites:

- Editor access on the GA4 property.
- Verified owner access on the Search Console property.
- GA4 and Search Console must represent the same site pages.

Steps:

1. Open **GA4 → Admin**.
2. Under **Product links**, open **Search Console Links**.
3. Click **Link**.
4. Choose the verified RupeeKit Search Console property.
5. Confirm the selection.
6. Choose the RupeeKit web data stream.
7. Review and submit.

Official Google instructions:
https://support.google.com/analytics/answer/10737381

## 6. Engagement-time issue: code diagnosis and verification

### What the code audit found

Before issue #63, `app/layout.tsx` called `gtag('config', GA_ID)` once in the root layout. Next.js App Router client-side navigation does not remount the root layout, so the codebase had no explicit route-change `page_view` path. Calculator custom events could therefore fire on a client-navigated tool route without a corresponding explicit page-view transition in RupeeKit's own analytics code.

That is a concrete measurement gap. It is a plausible contributor to the observed `0.00s` engagement rows, but the historical GA4 export alone is not enough to prove it caused every zero-second row.

### What changed

- Automatic page-view sending from the initial `gtag('config')` call is disabled with `send_page_view: false`.
- `GoogleAnalyticsRouteTracker` explicitly emits a `page_view` on the initial route and every App Router pathname change.
- The tracker flushes a `user_engagement` event with `engagement_time_msec` when the page becomes hidden, unloads, or the route changes.
- The analytics helper ignores missing `window.gtag`, so ad blockers and SSR do not throw.

### How to verify after deploy

1. Open DebugView.
2. Load a calculator directly and confirm one `page_view`.
3. Navigate client-side to another calculator and confirm a new `page_view` without a full reload.
4. Spend at least 5–10 seconds on the page, interact with the calculator, then navigate away or background the tab.
5. Inspect `user_engagement` and confirm `engagement_time_msec` is present and non-zero.
6. Confirm there is not a duplicate initial `page_view`.
7. Re-check the affected pages after enough fresh traffic has accumulated; do not compare the historical zero-second rows as if they were rewritten retroactively.

## Privacy boundary

Analytics events must never include entered salary, loan amount, bank balance, tax values, PAN, Aadhaar, bank details, email addresses, or any other user-entered financial/personal values. RupeeKit sends only route/tool identifiers and CTA destinations required for aggregate product analytics.
