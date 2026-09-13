# Search Console service account — what it needs

Last reviewed: 13 September 2026

`npm run report:gsc` is the only way to produce the authoritative page-level export described in
[`gsc-reporting-pipeline.md`](./gsc-reporting-pipeline.md). It refuses to run without credentials, so
until this setup is done the repository has no page rows and questions like "what is the CTR for
pages in positions 3–10" cannot be answered — only the stale `knownHistoricalFacts` block in
`automation/reports/gsc/2026-08-12.json` exists, and it carries `status: "bootstrap-partial"`.

This document is the checklist for standing that account up.

## What the account does and does not need

`scripts/gsc-report.mjs` signs a JWT with the service-account private key and exchanges it directly
for an access token at `oauth2.googleapis.com/token`. There is no user consent step and no
impersonation.

| Needed | Not needed |
| --- | --- |
| A Google Cloud service account with a JSON key | An OAuth consent screen |
| The Search Console API enabled on that project | Domain-wide delegation |
| The service-account email added as a user on the Search Console property | A Google Workspace account |
| Read-only scope `webmasters.readonly` | Any write or `Owner` API permission |

The two scopes requested are read-only:

- `https://www.googleapis.com/auth/webmasters.readonly` — Search Console
- `https://www.googleapis.com/auth/analytics.readonly` — GA4, only when `GA4_PROPERTY_ID` is set

## 1. Create the service account and key

In the Google Cloud console, in whichever project you want to own this:

1. **IAM & Admin → Service accounts → Create service account.** A name like `rupeekit-gsc-reporter`
   is enough. It needs **no project IAM role** — its access comes from Search Console, not from
   Google Cloud IAM. Skip the "Grant this service account access to project" step.
2. Open the account → **Keys → Add key → Create new key → JSON**. The file downloads once.
3. Keep the file out of the repository. `.gitignore` covers `.env` and `.env.*` (with `.env.example`
   re-included), so `.env.local` is safe — but the JSON key file itself matches none of those
   patterns and should never be written into the working tree at all.

From that JSON file you need exactly two fields:

- `client_email` → `GSC_CLIENT_EMAIL`
- `private_key` → `GSC_PRIVATE_KEY`

## 2. Enable the APIs

In the same project, **APIs & Services → Enable APIs and services**:

| API | Service name | Required? |
| --- | --- | --- |
| Google Search Console API | `searchconsole.googleapis.com` | Yes |
| Google Analytics Data API | `analyticsdata.googleapis.com` | Only for the optional GA4 totals |

If the Search Console API is not enabled, the token request succeeds and the first query fails with
a 403 naming the disabled API — see the troubleshooting table.

## 3. Grant the service account access to the property

This is the step most often missed. A service account is not automatically trusted by Search
Console; its email address is added like any human collaborator.

1. Open [Search Console](https://search.google.com/search-console) and select the RupeeKit property.
2. **Settings → Users and permissions → Add user.**
3. Paste the `client_email` value (it looks like
   `rupeekit-gsc-reporter@<project>.iam.gserviceaccount.com`).
4. Set permission to **Full**.

`Restricted` exposes Search performance data in the UI, but **Full** is what to use here — it is the
level that reliably serves `searchanalytics.query` and it avoids spending a debugging cycle on an
ambiguous 403. The account still cannot change anything: the token is only ever minted with
read-only scope.

Adding a user to a **Domain** property requires you to be an owner of that property.

## 4. Find the exact `GSC_SITE_URL`

The value must match the property identifier Search Console uses, not the website address.

- Domain property → `sc-domain:rupeekit.co.in`
- URL-prefix property → the full prefix including scheme and trailing slash, e.g.
  `https://www.rupeekit.co.in/`

`.env.example` records `sc-domain:rupeekit.co.in`, which is the domain-property form. A mismatch here
fails as a 403 on the query, not as a helpful "not found", so it is worth confirming rather than
assuming.

## 5. Format the private key

`scripts/gsc-report.mjs:280` reads the key as:

```js
privateKey: process.env.GSC_PRIVATE_KEY.replace(/\\n/g, '\n'),
```

It converts the two-character sequence `\n` into real newlines, so **both** storage styles work:

- **One line with escaped newlines** — required for anything that cannot hold multi-line values
  (GitHub Actions secrets, most hosting dashboards). This is what `.env.example` describes.
- **A real multi-line PEM** — the `replace` is then a no-op. Fine in a local `.env.local` that
  supports quoted multi-line values.

To produce the single-line form from the downloaded JSON key:

```bash
node -p "JSON.stringify(require('./path/to/key.json').private_key)"
```

That prints the value already quoted and `\n`-escaped, ready to paste. Keep the surrounding quotes
when assigning it in `.env.local`.

The key must stay a PKCS#8 PEM — the `private_key` field verbatim, beginning
`-----BEGIN PRIVATE KEY-----`. `crypto.sign('RSA-SHA256', …)` will reject anything else.

## 6. Where the variables go

```text
GSC_SITE_URL=sc-domain:rupeekit.co.in
GSC_CLIENT_EMAIL=rupeekit-gsc-reporter@<project>.iam.gserviceaccount.com
GSC_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIE...\n-----END PRIVATE KEY-----\n"
```

- **Local** — `.env.local`, which is gitignored. This is the only place needed to run a report today.
- **CI** — not currently required. `.github/workflows/validation.yml` does not run `report:gsc`; the
  validation job needs no `GSC_*` secrets. Only add repository secrets if reporting is later
  automated on a schedule.
- **Vercel** — not required. The report script is not part of `build` or `postbuild`.

## 7. Verify it works

Run a settled window. Search Console data lags roughly two to three days, and the script requests
`dataState: 'final'`, so an `--end` closer than that returns less than you expect:

```bash
npm run report:gsc -- --start 2026-08-10 --end 2026-09-06 --as-of 2026-09-13
```

A healthy run writes `automation/reports/gsc/2026-09-13.json`. Confirm it actually contains rows —
the failure mode to catch is a file that exists but is empty:

```bash
node -e "
const r = require('./automation/reports/gsc/2026-09-13.json');
const sc = r.searchConsole;
console.log('status      ', r.status);
console.log('totals      ', JSON.stringify(sc.totals));
console.log('top pages   ', sc.topPages.length);
console.log('bands       ', JSON.stringify(sc.positionBands));
"
```

`positionBands` populated and `topPages.length > 0` is the signal that the credentials are genuinely
working. All-`null` bands and empty arrays are the bootstrap shape this setup exists to replace.

Once that lands, the positions 3–10 question becomes answerable from the `4-10` band plus the page
rows, instead of from the July–August figure transcribed in issue #57.

## Optional: GA4 totals

Set `GA4_PROPERTY_ID` to the numeric property ID (GA4 **Admin → Property Settings**, not the
`G-XXXXXXX` measurement ID), enable the Google Analytics Data API, and grant the same
service-account email **Viewer** on the GA4 property.

GA4 is a genuinely optional seam. When `GA4_PROPERTY_ID` is absent the report records
`not-configured`; when the property is unreachable it records `unavailable`. Neither invalidates the
Search Console section, and neither is converted into a zero.

## Troubleshooting

Errors below are the literal strings the script emits.

| Message | Cause | Fix |
| --- | --- | --- |
| `Missing required environment variable(s): …` | Thrown before any network call | Export the `GSC_*` values; the script deliberately never treats absent credentials as zero traffic |
| `Google OAuth token request failed (400): invalid_grant` | Malformed or truncated private key, or clock skew | Re-copy `private_key` verbatim; check the `\n` escaping survived the paste |
| `Google OAuth token request failed (401)` | `client_email` does not match the key | Both values must come from the same JSON key file |
| `Search Console query failed (403): User does not have sufficient permission for site …` | Service account not added to the property, or `GSC_SITE_URL` does not match the property identifier | Redo step 3; confirm `sc-domain:` versus URL-prefix form |
| `Search Console query failed (403): … API has not been used in project …` | Search Console API not enabled | Enable `searchconsole.googleapis.com` and retry after a minute |
| Report written but `topPages` is empty | Window too recent for `dataState: 'final'`, or genuinely no data | Move `--end` back three days and re-run |

## Two scope limits worth knowing

1. **Web search only.** The query sends `type: 'web'`, so Discover and News impressions are excluded.
   The Discover work tracked by `validate:discover-images` will not show up in these totals, and a
   Discover-driven spike will not appear here. That is a deliberate constraint of the page-level KPI
   table, not a bug.
2. **Page dimension only.** Query rows are never fetched for the KPI table. Rules #57 and #65 forbid
   substituting them, because anonymised-query filtering omits a large share of traffic — the 8–14
   August export exposed only 4 of 18 site clicks at query level.

## Security

- The JSON key file is a long-lived credential. Store it in a password manager, not the repository.
- Rotate the key if it is ever pasted into a chat, a ticket, or a CI log.
- The account holds read-only scopes and no Google Cloud IAM role, so the blast radius of a leak is
  read access to Search Console performance data — still worth rotating promptly.
- Revoke by deleting the key in Google Cloud **and** removing the user in Search Console. Deleting
  only the key leaves a stale collaborator on the property.
