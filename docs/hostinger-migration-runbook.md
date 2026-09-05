# Vercel to Hostinger VPS migration runbook

Last reviewed: 5 September 2026

## When to run this

Not yet. This runbook exists so the move is a one-day job when the trigger
arrives, not so it happens now.

The trigger is **both** of these being true at once:

1. RupeeKit is monetised. Vercel's Hobby plan forbids commercial use, so the
   first affiliate link forces the site onto Pro at $20/seat/month whether or
   not the traffic justifies it. See `docs/monetisation-readiness-2026-09-03.md`
   for the gates that decide when that happens.
2. The site needs a database. This is the whole financial argument: a VPS
   absorbs Postgres on the same box for nothing, and Vercel never will.

Until then Vercel Hobby costs Rs 0 and a Hostinger VPS costs Rs 12,000-14,000 a
year, so migrating early buys a bill and an ops burden in exchange for nothing.

| Stage | Vercel | Hostinger VPS |
|---|---:|---:|
| Today (no DB, not monetised) | Rs 0 | Rs 999-1,199/mo |
| Monetised, still no DB | Rs 1,760/mo (Pro) | Rs 999-1,199/mo |
| Monetised, with a database | Rs 2,300-4,000/mo (Pro + Neon or Supabase) | Rs 1,200-1,500/mo |

Prices are September 2026, at roughly Rs 88/$. Hostinger's advertised rates are
24-48 month prepay; budget the **renewal** number, because month-to-month runs
close to double the headline and renewal rises again after the initial term.

## Why this cannot be shared hosting

The obvious cheap move — Hostinger Premium or Business web hosting at
Rs 149-349/month — does not work, and it is worth being precise about why
before anyone buys the wrong plan. Four things in this repo need a live Node
process handling requests:

| Code | What it needs |
|---|---|
| `middleware.ts` | Sets `X-Robots-Tag: noindex, follow` on `/tools/*` and `/8th-pay-commission` when query parameters are present. Runs per request. |
| `app/api/updates/subscribe/route.ts` | POST handler that calls Buttondown with `BUTTONDOWN_API_KEY`. The key is server-side only and must never reach the client. |
| `app/api/mcp/route.ts` | JSON-RPC POST endpoint. |
| `app/8th-pay-commission/page.tsx` | `export const revalidate = 3600` — ISR, which needs a server to do the revalidating. `lib/eighth-cpc-calculator.test.ts` asserts this line exists, so removing it fails the suite. |

So `output: 'export'` is off the table, and the target is a **VPS running Node**,
fronted by Nginx.

Everything else is static and that is the good news: 40 pages, every dynamic
segment covered by `generateStaticParams`, and the machine-readable endpoints
that matter for SEO (`/api/v1/gold-rates`, `/api/openapi`, `/llms-full.txt`)
already declared `dynamic = 'force-static'`. Steady-state CPU is near zero. You
are renting a box to sit still, not to compute.

## Sizing

Take **KVM 2** (2 vCPU / 8 GB / 100 GB NVMe), not KVM 1.

Not for traffic — KVM 1 would serve this site comfortably. The 8 GB matters
because this runbook builds on the box, and a Next.js build across 40 pages
plus eight `generateStaticParams` segments plus the `postbuild` validators is
the memory peak of the whole system. Postgres arriving later on the same box is
the second reason. Add 2 GB of swap anyway (step 2.1) so a build spike degrades
instead of getting OOM-killed mid-deploy.

Pick Hostinger's India location. For an India-audience YMYL finance site the
latency is worth more than the Rs 500/month a European provider would save.

## Phase 0 — decouple from Vercel now

These two are free, reversible, and worth doing today regardless of whether the
migration ever happens. They are the only hard couplings to Vercel in the
codebase, and removing them in advance turns cutover day from a week into a day.

### 0.1 Replace Vercel Analytics and Speed Insights

`app/layout.tsx` imports both:

```
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
```

Neither reports anything once the site is off Vercel. They fail quietly, which
is the bad kind of failure — the dashboards keep existing and stop being true.

GA4 is **already wired** through `NEXT_PUBLIC_GA_ID` in the same file, with
`components/GoogleAnalyticsRouteTracker` handling client-side route changes, so
analytics continuity is already covered. Confirm `NEXT_PUBLIC_GA_ID` is set in
production and that `docs/ga4-admin-checklist.md` has been worked through, then
drop the two imports, the two components from the tree, and the
`@vercel/analytics` / `@vercel/speed-insights` dependencies from
`package.json`.

For Speed Insights there is no drop-in replacement, and there does not need to
be: field Core Web Vitals are available free from the CrUX report through
PageSpeed Insights and Search Console's Core Web Vitals panel. Note that CrUX
needs enough traffic to report an origin, so verify RupeeKit has a CrUX record
before relying on it as the only source.

Neither `NEXT_PUBLIC_GA_ID` nor `NEXT_PUBLIC_ADSENSE_CLIENT` is currently listed
in `.env.example` even though both are read in `app/layout.tsx`. Add them while
you are here, or the next person configuring an environment will miss them.

### 0.2 Put Cloudflare in front of the current Vercel deployment

Move DNS for `rupeekit.co.in` to Cloudflare (free plan) while still on Vercel.
Doing it now rather than on cutover day separates two independent risks: a DNS
provider change, and an origin change. Debugging them together is how a
migration turns into a multi-day outage.

It also means that on cutover day the DNS change is a single proxied A record
edit inside Cloudflare with a 60-second TTL, not a registrar nameserver change
with a multi-hour propagation tail.

## Phase 1 — architecture

```
Cloudflare (free CDN, TLS, caching, WAF)
        |
     Nginx  :443  — TLS termination, static asset caching, gzip/brotli
        |
   Node/Next :3000 — pm2, cluster mode, 2 instances
        |
   Postgres :5432 — localhost only, added in Phase 6
```

Cloudflare is not optional here. Leaving Vercel means leaving its edge network,
and the whole reason this site is fast is that it is static and served close to
the user. A single Mumbai VPS serving uncached responses to all of India is a
visible regression from where you are today. Cloudflare in front restores it,
and additionally absorbs the 12 MB of `public/` and the bandwidth bill.

## Phase 2 — provision the VPS

### 2.1 Base setup

Ubuntu 24.04 LTS. As root, first login:

```bash
adduser deploy
usermod -aG sudo deploy
rsync --archive --chown=deploy:deploy ~/.ssh /home/deploy

# Swap, so a build spike degrades instead of being OOM-killed.
fallocate -l 2G /swapfile && chmod 600 /swapfile
mkswap /swapfile && swapon /swapfile
echo '/swapfile none swap sw 0 0' >> /etc/fstab

# Unattended security updates. On a box you own, patching is now your job.
apt update && apt install -y unattended-upgrades fail2ban
dpkg-reconfigure -plow unattended-upgrades
```

Harden SSH in `/etc/ssh/sshd_config` — `PermitRootLogin no`,
`PasswordAuthentication no` — then `systemctl restart ssh`. Confirm you can
still log in as `deploy` **in a second terminal** before closing the first one.

### 2.2 Firewall

```bash
ufw allow OpenSSH
ufw allow 80/tcp
ufw allow 443/tcp
ufw enable
```

Port 3000 and, later, 5432 are never opened. Node binds to `127.0.0.1` and
Nginx is the only thing that talks to it.

Once Cloudflare is proxying, restrict 80/443 to Cloudflare's published IP
ranges as well, so nobody can reach the origin directly and bypass the WAF and
the cache.

### 2.3 Runtime

```bash
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs nginx git
sudo npm install -g pm2
```

Node 22 matches the local development version. CI runs Node 20
(`.github/workflows/*.yml`), which is a pre-existing inconsistency rather than
something this migration introduces — but pin the VPS to whichever major you
standardise on, and change it deliberately, not by drifting.

## Phase 3 — build and run

### 3.1 Build on the box, not in CI

Build in a fresh release directory on the VPS rather than shipping a build
artifact from GitHub Actions. Three reasons specific to this repo:

- `npm run build` runs `validate:discover-images` first, and `postbuild` runs
  `validate:discover-rendered`, `validate:discover-guides-rendered` and
  `validate:direct-answer-rendered`. Those read `scripts/` and `data/` and
  inspect rendered output. Shipping only `.next` would leave them behind, and
  they are exactly the guards you want running before a release goes live.
- `next.config.mjs` carries an `experimental.outputFileTracingExcludes` block
  added to work around a Next 14.2.x tracing bug on Windows. Standalone output
  depends on that same tracing machinery, so `output: 'standalone'` is a change
  to make deliberately and verify on Linux, not a free optimisation to assume
  works. Building in place sidesteps the question entirely.
- 8 GB and 100 GB NVMe make on-box builds cheap. The complexity of an artifact
  pipeline buys nothing here.

### 3.2 The build-time environment trap

`NEXT_PUBLIC_SITE_URL` is read in **34 places** across `app/`, `lib/` and
`components/`, and it feeds `app/sitemap.ts`, `app/robots.ts`,
`app/image-sitemap.xml/route.ts`, canonical tags, JSON-LD and the origin check
in `app/api/mcp/route.ts`.

`NEXT_PUBLIC_*` values are **inlined at build time**, not read at runtime.
Setting them in the pm2 environment after the fact changes nothing — the wrong
value is already baked into the static HTML. A deploy that builds without
`/etc/rupeekit/env` loaded publishes a sitemap full of
`https://www.rupeekit.co.in` fallbacks or, worse, the old
`rupeekit-tools.vercel.app` value from `.env.example` into every canonical tag.

That is a silent, site-wide SEO regression that no test catches. The deploy
script in 5.2 sources the env file before building for this reason, and the
smoke test in 5.3 greps the built sitemap to prove it worked.

Create `/etc/rupeekit/env`, owned by `deploy`, mode `600`:

```bash
NODE_ENV=production
NEXT_PUBLIC_SITE_NAME=RupeeKit
NEXT_PUBLIC_SITE_URL=https://www.rupeekit.co.in
NEXT_PUBLIC_CONTACT_EMAIL=rupeekitofficial@gmail.com
NEXT_PUBLIC_GA_ID=
BUTTONDOWN_API_KEY=
```

`BUTTONDOWN_API_KEY` is server-side only. `app/api/updates/subscribe/route.ts`
already degrades to a 503 with a human-readable message when it is absent, so a
missing key is a soft failure rather than a broken page — but it does mean a
silently unset key looks like a working site with a dead signup form. Check it
after cutover.

`GOLDAPI_KEY` stays a GitHub Actions secret. The gold pipeline runs in CI and
commits a snapshot to the repo; the VPS only ever reads the committed JSON, and
never needs the provider key.

### 3.3 Directory layout

Atomic releases via symlink swap. The site is never serving a half-built tree:

```
/srv/rupeekit/
  repo/              # bare-ish git clone, fetched and reset per deploy
  releases/
    20260905T120000/ # full checkout + node_modules + .next
    20260905T183000/
  current -> releases/20260905T183000
```

Keep the last five releases. Rollback is then a symlink swap and a pm2 reload,
which is seconds rather than a rebuild.

### 3.4 pm2

`/srv/rupeekit/ecosystem.config.js`:

```js
module.exports = {
  apps: [{
    name: 'rupeekit',
    cwd: '/srv/rupeekit/current',
    script: 'node_modules/next/dist/bin/next',
    args: 'start -p 3000 -H 127.0.0.1',
    instances: 2,
    exec_mode: 'cluster',
    max_memory_restart: '1G',
    env_file: '/etc/rupeekit/env',
  }],
};
```

Two cluster instances on 2 vCPU. `pm2 reload` restarts them one at a time, so
deploys have no connection-refused window.

ISR matters here: `/8th-pay-commission` has `revalidate = 3600`, and each
cluster instance keeps its own on-disk ISR cache under its release directory.
With two instances that means two caches revalidating independently — harmless
for this page (both regenerate the same content from committed data), but worth
knowing before adding any page whose revalidation has side effects.

```bash
pm2 start /srv/rupeekit/ecosystem.config.js
pm2 save
pm2 startup systemd   # run the command it prints
```

## Phase 4 — Nginx and TLS

`/etc/nginx/sites-available/rupeekit`:

```nginx
server {
  listen 80;
  server_name www.rupeekit.co.in rupeekit.co.in;
  return 301 https://www.rupeekit.co.in$request_uri;
}

server {
  listen 443 ssl http2;
  server_name www.rupeekit.co.in;

  # certbot fills in the ssl_certificate lines

  gzip on;
  gzip_types text/css application/javascript application/json image/svg+xml;

  # Immutable build output. Safe to cache hard: the hash changes on rebuild.
  location /_next/static/ {
    proxy_pass http://127.0.0.1:3000;
    proxy_cache_valid 200 365d;
    add_header Cache-Control "public, max-age=31536000, immutable";
  }

  location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
}
```

Serve the apex-to-www redirect (or the reverse) from exactly one place. Today
Vercel does it. Getting it wrong produces duplicate-content pairs across every
one of the 40 pages, which is a real SEO cost on a site whose entire value is
organic search.

`X-Forwarded-Proto` must be passed through or Next builds absolute URLs as
`http://`, which breaks canonical tags behind TLS termination.

Do not add a caching layer in Nginx for HTML routes. `middleware.ts` varies
`X-Robots-Tag` on the presence of query parameters, and
`lib/api-request.ts` sets `Cache-Control: no-store` on the API responses
deliberately. A naive proxy cache keyed on path alone would serve a `noindex`
header to a clean URL, or the reverse. Let Cloudflare handle caching, where the
query string is part of the cache key by default.

TLS:

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d www.rupeekit.co.in -d rupeekit.co.in
```

Certbot installs its own renewal timer. Verify with
`systemctl list-timers | grep certbot` — an expired certificate on a finance
site is a trust failure, not just an outage.

## Phase 5 — deploys

### 5.1 The twice-daily commit problem

`.github/workflows/gold-rates.yml` runs at 03:00 and 12:00 UTC and commits
`data/gold-rates` to `main` when the snapshot changes. That is roughly **730
automated production deploys a year**, unattended, at 08:30 and 17:30 IST — the
second of which lands inside an Indian evening traffic peak.

On Vercel this is invisible. On a VPS it is the single largest operational risk
in the migration, and it is why the release process below is atomic and why the
smoke test gates the symlink swap. A deploy that fails halfway must leave the
previous release serving traffic, untouched.

The workflow already handles its own concurrency and rebases rather than
force-pushing, so the CI side needs no change. Only the delivery side is new.

### 5.2 Deploy script

`/srv/rupeekit/deploy.sh`, owned by `deploy`, mode `750`:

```bash
#!/usr/bin/env bash
set -euo pipefail

REL="/srv/rupeekit/releases/$(date -u +%Y%m%dT%H%M%S)"
git -C /srv/rupeekit/repo fetch --prune origin main
git -C /srv/rupeekit/repo worktree add --detach "$REL" origin/main

cd "$REL"
set -a; . /etc/rupeekit/env; set +a   # MUST precede the build; see 3.2

npm ci
npm run build                          # runs validate + postbuild validators

# Prove the release before it becomes live.
/srv/rupeekit/smoke.sh "$REL"

ln -sfn "$REL" /srv/rupeekit/current.tmp
mv -Tf /srv/rupeekit/current.tmp /srv/rupeekit/current   # atomic
pm2 reload rupeekit --update-env

# Keep five releases.
ls -1dt /srv/rupeekit/releases/* | tail -n +6 | while read -r old; do
  git -C /srv/rupeekit/repo worktree remove --force "$old" || rm -rf "$old"
done
```

`set -euo pipefail` is what makes this safe: any failing step aborts before the
symlink moves, and the previous release keeps serving.

### 5.3 Smoke test

Do not skip this. It is what stands between a bad gold-rate commit and a broken
site at 17:30 IST.

```bash
#!/usr/bin/env bash
set -euo pipefail
REL="$1"

# The build-time env trap from 3.2: prove the canonical host was baked in.
grep -q "www.rupeekit.co.in" "$REL/.next/server/app/sitemap.xml.body" \
  || { echo "FAIL: sitemap has wrong or missing NEXT_PUBLIC_SITE_URL"; exit 1; }

# Boot the candidate on a scratch port and exercise the routes that are not static.
cd "$REL"
node_modules/.bin/next start -p 3999 -H 127.0.0.1 &
PID=$!
trap 'kill $PID' EXIT
for i in $(seq 30); do curl -sf localhost:3999/ >/dev/null && break; sleep 1; done

curl -sf localhost:3999/ > /dev/null
curl -sf localhost:3999/api/v1/gold-rates | grep -q perGram
curl -sf localhost:3999/8th-pay-commission > /dev/null
curl -sfI "localhost:3999/tools/emi-calculator?amount=1" | grep -qi 'x-robots-tag: noindex'
```

The last check is the one worth arguing for. `middleware.ts` is the easiest
thing in this stack to lose in a hosting migration — it is invisible when it
works, and when it silently stops running, parameterised calculator URLs become
indexable and start competing with their own canonical pages. Assert it on
every deploy.

Adjust the sitemap path to whatever Next 14.2 actually emits; verify it once by
hand on the first build rather than trusting the path above.

### 5.4 GitHub Actions trigger

Add a `deploy.yml` that runs on push to `main` and after the gold-rates
workflow completes:

```yaml
on:
  push:
    branches: [main]
  workflow_run:
    workflows: ["Gold rates"]
    types: [completed]

concurrency:
  group: deploy-production
  cancel-in-progress: false
```

`cancel-in-progress: false` matters — cancelling a deploy mid-build is exactly
the state the atomic swap is designed to survive, but there is no reason to
invite it.

Use an SSH key restricted to running `/srv/rupeekit/deploy.sh` via a forced
command in `authorized_keys`, so a leaked Actions secret buys an attacker a
deploy, not a shell.

Note that `.github/workflows/validation.yml` currently runs only on
`pull_request` and `workflow_dispatch`. Nothing validates a direct push to
`main`. That is tolerable when Vercel builds and can fail visibly; once a push
deploys itself to your own box, make the deploy job's build the gate — which
step 5.2 does by running `npm run build` (and therefore the validators) before
the swap.

## Phase 6 — the database

This is the reason the migration exists, so do it deliberately rather than as
an afterthought.

```bash
sudo apt install -y postgresql
sudo -u postgres createuser --pwprompt rupeekit
sudo -u postgres createdb --owner=rupeekit rupeekit
```

Bind to localhost only. `/etc/postgresql/16/main/postgresql.conf`:

```
listen_addresses = 'localhost'
```

Port 5432 stays closed at the firewall. The application connects over the loop-
back interface, which is also why this is free — no egress, no managed-service
subscription, no network hop.

Give it real memory settings rather than the Debian defaults, which assume a
much smaller machine: on 8 GB shared with Node, `shared_buffers = 1GB`,
`effective_cache_size = 3GB`, `work_mem = 16MB` is a reasonable start.

Add `DATABASE_URL` to `/etc/rupeekit/env`. It is a server-side secret and must
never be prefixed `NEXT_PUBLIC_`, which would inline it into client bundles.

**Backups are now your problem**, and this is the one place where a VPS is
genuinely worse than managed hosting. Nothing snapshots your data for you:

```bash
# /etc/cron.daily/rupeekit-db-backup
pg_dump -Fc rupeekit > /var/backups/rupeekit-$(date -u +%F).dump
find /var/backups -name 'rupeekit-*.dump' -mtime +14 -delete
```

Ship those off the box — Hostinger's own backup add-on, or rclone to any
object store. A backup that lives only on the machine it backs up is not a
backup. Restore-test it once, on purpose, before you need it.

## Cutover

Do it on a weekday morning IST, and **not** at 08:30 or 17:30 when the gold
pipeline pushes.

1. Run `deploy.sh` and confirm the VPS serves correctly over its IP or a
   temporary hostname while Vercel still holds the DNS.
2. Walk the checklist below against the VPS.
3. In Cloudflare, point the proxied A record at the VPS. TTL 60.
4. Watch `pm2 logs` and the Nginx access log for 15 minutes.
5. Leave the Vercel project deployed but no longer receiving traffic for a
   week. It is the rollback.

### Verification checklist

- [ ] `/` and a sample of each route family render (tools, blog, guides,
      financial-updates, government-salary-updates, tool-hubs, 8th-pay-commission)
- [ ] `curl -I "https://www.rupeekit.co.in/tools/emi-calculator?amount=1"`
      returns `X-Robots-Tag: noindex, follow` — middleware is live
- [ ] `curl -I https://www.rupeekit.co.in/tools/emi-calculator` (no params)
      has **no** `X-Robots-Tag` — the middleware is not over-firing
- [ ] `/sitemap.xml`, `/robots.txt` and `/image-sitemap.xml` contain
      `www.rupeekit.co.in` and no `vercel.app` anywhere
- [ ] `/api/v1/calculators`, `/api/v1/gold-rates`, `/api/openapi` and
      `/llms-full.txt` all 200
- [ ] `POST /api/updates/subscribe` with a real address subscribes in
      Buttondown, and a bad address returns 400 — a 503 means
      `BUTTONDOWN_API_KEY` did not reach the process
- [ ] `POST /api/mcp` answers `tools/list`, and a request with a foreign
      `Origin` header is rejected 403
- [ ] The apex redirects to www exactly once, with a 301
- [ ] All 26 redirects in `next.config.mjs` still 301 correctly — spot-check
      one from each group: `/blog/*` (3), `/tools/*` (1),
      `/government-salary-updates/*` (12), `/financial-updates/*` (10)
- [ ] GA4 realtime shows the visit
- [ ] A `next/image` route renders optimised images — `sharp` must be present
- [ ] Search Console: submit the sitemap, then watch coverage for a week

### Rollback

Point the Cloudflare A record back at Vercel. With TTL 60 this is under two
minutes, and it is why the Vercel project stays deployed for a week. If the
problem is a bad release rather than the VPS itself:

```bash
ln -sfn /srv/rupeekit/releases/<previous> /srv/rupeekit/current.tmp
mv -Tf /srv/rupeekit/current.tmp /srv/rupeekit/current
pm2 reload rupeekit
```

## What you are taking on

Worth stating plainly, because it does not appear on any invoice and it is the
real price of the Rs 12,000-30,000 a year this saves:

- OS patching, Nginx, TLS renewal, pm2 supervision
- Postgres backups and, eventually, restores
- Being the on-call for 730 unattended deploys a year
- Roughly 8-15 hours of setup and 1-2 hours a month of maintenance

At 5,000 sessions a month that trade is poor. At the 50,000-session point where
`docs/monetisation-readiness-2026-09-03.md` reconsiders display advertising, and
with a database in the picture, it is a clear win — and the box will not need
upgrading to get there, because the content is static and Cloudflare serves most
of it.
