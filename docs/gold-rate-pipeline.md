# Live gold rate pipeline

Added to replace the hardcoded `pricePerGram24k: 7200` default on
`/tools/gold-loan-calculator-india`, which had gone badly stale and was
mispricing every gold pledge the calculator valued.

## Why derived rather than scraped

The published figure is **computed**, not copied:

```
per gram fine (999.9) = (XAU_USD / 31.1034768) x USD_INR x (1 + duty) x (1 + GST)
per gram at carat     = per gram fine x hallmark fineness
```

Three reasons this beats scraping a retail jeweller rate:

1. **It is the right number.** This yields a *bullion* value — gold content
   only, excluding making charges, wastage and stones. That is what a lender
   advances against. A scraped retail rate bundles making charges (8–25%) and
   would overstate loan eligibility.
2. **No licensing exposure.** IBJA and MCX real-time rates are licensed
   commercial products. We derive from free spot and FX feeds and own the
   output outright.
3. **It fails loudly.** A scraper breaks silently when HTML changes, and on a
   YMYL page a silent break means publishing a wrong gold price to people
   making loan decisions.

Carats are **derived, never sourced separately** — one fine-gold price times a
fixed hallmark ratio (999 / 916 / 750 / 585). `validate-gold-rates.mjs`
enforces that the published carat table matches `perGramFine x fineness`.

## Fail-closed

`scripts/fetch-gold-rates.mjs` writes only when every guardrail passes:

| Guardrail | Holds the update when |
|---|---|
| Envelope | XAU/USD, USD/INR or derived per-gram falls outside a plausible range |
| Provider agreement | Two independent spot providers disagree by >2% |
| Day-over-day | The derived price moved >10% since the last stored day |

On failure it writes nothing and exits non-zero. The previously committed
snapshot stays live **with its real, older `asOf` date**, and the scheduled run
goes red. An openly stale price is safe; a confidently wrong one is not.

`--force` exists as an ops escape hatch and stamps `status: "forced"` plus the
overridden failures into the snapshot so it is visible afterwards.

## Files

| Path | Role |
|---|---|
| `scripts/fetch-gold-rates.mjs` | CLI entry, fail-closed write logic |
| `scripts/gold/providers.mjs` | All network access; add licensed sources here |
| `scripts/gold/derive.mjs` | Pure maths: derivation, carats, averaging, guardrails |
| `scripts/validate-gold-rates.mjs` | Wired into `npm run validate` |
| `data/gold-rates/purity.json` | Hallmark ratios — single source of truth for script and app |
| `data/gold-rates/duty-config.json` | Import duty + GST; **fails the build after 180 days unreviewed** |
| `data/gold-rates/current.json` | Latest guardrail-passed snapshot |
| `data/gold-rates/history.json` | Rolling 400-day history, feeds the trailing average |
| `lib/gold-rates.ts` | Typed accessors for pages |
| `lib/live-rate-defaults.ts` | Binds calculator defaults to the snapshot |

## The 30-day average

RBI-regulated lenders value pledged gold on a trailing average rather than
spot, so a live-spot figure overstates eligibility on a rising market. The
snapshot carries `loanValuation.sufficient`, which is `false` until 30 days of
history exist. **Pages must not describe the figure as a 30-day average while
`sufficient` is false** — the accessor returns the basis so the page can say
which one it is.

Confirm the current rule against the RBI directions in force before leaning on
this in user-facing copy; the gold-collateral lending framework was updated in
2025.

## Operating it

```bash
npm run fetch:gold-rates              # fetch, guard, write
node scripts/fetch-gold-rates.mjs --dry-run
npm run validate:gold-rates
```

`.github/workflows/gold-rates.yml` runs it at 03:00 and 12:00 UTC (08:30 /
17:30 IST) and commits only when the snapshot changed.

`GOLDAPI_KEY` is optional; set it as a repo secret to add a third spot provider
and strengthen the agreement check. Stooq and Yahoo need no key.

## Known follow-ups

- The gold-loan formula scales by `goldPurityKarat / 24` (22/24 = 0.9167)
  rather than the 916 hallmark used here. Left unchanged deliberately — it is a
  calculation change to a live financial tool and belongs in its own reviewed
  PR.
- Import duty and GST in `duty-config.json` were set from the July 2024 budget
  position and **must be confirmed** against the current CBIC notification.
- The city/state rate table discussed for `gold rate today` is not built. Indian
  retail rates are set per city by local associations, not per state; the plan
  is one national benchmark plus a maintained city delta, starting with ~10
  cities that have real volume rather than a generated 28-state matrix.
