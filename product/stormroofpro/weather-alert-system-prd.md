# PRD — Storm Center: In-House Weather Alert & Hail Intelligence System

**Product:** StormRoofer Pro (brand name pending consolidation)
**Version:** 1.0 draft · July 6, 2026
**Status:** For review
**Owner:** Mark Kochan

---

## 1. Problem & opportunity

Storm-restoration roofers win or lose a neighborhood in the first 48 hours
after a hail event. Today, StormRoofer Pro's target users learn about storms
from TV weather, Facebook groups, or paid third-party services like
HailStrike, HailTrace, and Interactive Hail Maps — standalone tools that cost
roughly $100–300/month and don't connect to the roofer's CRM, leads, or
estimates.

The underlying data these services sell is largely **free, public-domain
NOAA data**. Building our own ingestion pipeline lets us:

1. **Differentiate**: AccuLynx, JobNimbus, and Roofr do not do storm
   tracking. This feature is the product's sharpest wedge and the core of
   the "Be First to the Storm" campaign promise.
2. **Kill a line item** for customers: replaces a $100–300/mo standalone
   subscription — a concrete ROI argument that can carry pricing.
3. **Power our own marketing**: the campaign's storm-trigger system (hail
   event → same-day email/SMS + geo ad burst) runs on this same pipeline.
   Marketing is customer zero for this feature.

## 2. Goals & success metrics

**Product goals**

| Metric | Target |
|---|---|
| Alert latency (NWS warning issued → push/SMS delivered) | < 3 minutes |
| Hail swath map available after event | < 60 min after storm passage |
| Detection coverage (events ≥ 1" hail in a user's service area that we alerted on) | ≥ 95%, measured against SPC storm reports |
| Weekly active usage of Storm Center during storm season | ≥ 60% of activated accounts |
| Campaign dependency | Storm-trigger marketing sends live by campaign week 4 |

**Business rationale:** supports the 25-activated-accounts goal — storm
alerts are both an activation hook (first alert = first "aha") and a
retention lock (roofers won't churn mid-season from the tool that tells them
where hail fell).

## 3. Users & use cases

**Primary: owner-operator (2–20 person storm restoration company).**
- "Alert me when a storm with hail is hitting or has hit my service area —
  before the homeowner knows."
- "Show me the swath map so I know which streets to canvass at 7am."
- "Tell me the max hail size at a specific address for the insurance claim."

**Secondary: sales reps / canvassers.**
- "Give me a canvass list: my company's leads and past customers inside
  yesterday's swath."

**Internal: marketing (storm-trigger campaigns).**
- "When ≥ 1.25" hail hits a metro where we have list contacts, fire the
  'Hail just hit [city]' email/SMS and the geo-fenced ad burst."

## 4. Feature scope

### 4.1 Real-time storm alerts (Phase 1)
- Ingest **NWS watches/warnings** (severe thunderstorm, tornado) with their
  polygon geometries and parsed **max hail size and max wind gust**
  parameters. High wind and hail are both first-class alert triggers.
- Users define one or more **service areas** — default is a **100-mile
  radius** around the company's home base; polygon/county selection later.
  Alerts fire when a warning polygon intersects a service area.
- Delivery: **push notification** (primary), **SMS** (user opt-in),
  **email** (digest fallback). Per-user quiet hours plus minimum hail-size
  (default ≥ 1") and wind-gust (default ≥ 58 mph, the NWS severe criterion)
  thresholds. Tornado warnings always alert.
- **Ground-truth damage reports**: ingest NWS Local Storm Reports / SPC
  reports (measured hail size in inches, wind gusts in mph, location, time)
  into the Storm Center feed alongside warnings — "what actually fell."
- In-app **Storm Center feed**: live list of active warnings in service
  areas with hail size, wind, storm motion, and a map view.

### 4.2 Hail swath maps (Phase 2)
- Ingest **NOAA MRMS MESH** (Maximum Estimated Size of Hail) — a ~1 km
  radar-derived hail-size grid updated every ~2 minutes, published to the
  public `noaa-mrms-pds` AWS Open Data bucket as GRIB2.
- Post-event processing: accumulate 24-hour max MESH into a **hail swath
  layer** with size contours (1", 1.5", 2"+), rendered on the Storm Center
  map.
- **Point lookup**: enter an address → max estimated hail size, date/time of
  event, distance to swath core. This is the claim-support artifact.
- **Confidence scoring**: cross-reference MESH with NWS warnings and SPC/local
  storm reports (ground truth) to label swaths "radar-estimated" vs
  "report-verified" — the same trick HailTrace markets as "verified maps."

### 4.3 Historical storm lookup (Phase 3)
- Address + date-range query: "what hail events hit this property since
  2021?" Backed by archived MESH (AWS archive extends back to late 2020)
  plus SPC storm-report history (decades, but point reports only).
- Use cases: door-knock credibility ("your roof took 1.75" hail last
  September"), supplement/claim disputes, lead qualification.

### 4.4 CRM integration (Phase 3 — the moat)
- **Lead/customer matching**: when a swath covers saved leads, customers, or
  past jobs, notify the owner with the matched list ("14 of your contacts
  are inside yesterday's 1.5-inch swath") and generate a canvass list
  sorted by hail size.
- This is what no standalone hail-map service can do — weather data joined
  to the roofer's own book of business. It should be the headline of the
  feature's marketing.

### 4.5 Marketing trigger hook (parallel, internal)
- Same pipeline exposes an internal webhook: `storm_event(metro, max_size,
  swath_geojson)` → triggers the campaign email/SMS to list contacts in that
  metro and flags the geo ad burst. No public UI; a Slack/email notification
  to you with a one-click "send campaign" is enough for v1.

### Out of scope (v1)
- Forecasting beyond NWS watches (no proprietary storm prediction).
- Non-hail perils as first-class features (wind/tornado data comes along for
  free in warnings; dedicated wind swaths later).
- Homeowner-facing weather content.
- National coverage marketing claims — product works CONUS-wide by nature,
  but tune and QA for MI + MN launch markets.

## 5. Data sources & build-vs-buy

| Source | What it provides | Cost | Role |
|---|---|---|---|
| **NWS API (api.weather.gov)** | Real-time watches/warnings with polygons, max hail size | Free, public domain | Phase 1 alerts |
| **NOAA MRMS MESH** (AWS Open Data, `noaa-mrms-pds`) | 1 km hail-size grid, ~2-min updates, GRIB2; archive to late 2020 | Free | Phase 2 swaths, Phase 3 history |
| **SPC storm reports + NWS Local Storm Reports** (via IEM APIs) | Ground-truth hail reports (size, location, time) | Free | Verification / confidence scoring |
| **NEXRAD Level II** (AWS Open Data) | Raw radar | Free | Not needed v1 (MESH is the derived product) |
| **Commercial (Xweather/Vaisala, Tomorrow.io, HailTrace API)** | Cleaned hail swaths, longer archives, SLAs | ~$250–1,000+/mo | Fallback / validation only |

**Recommendation: build on the free NOAA stack.** The commercial vendors
are reselling refined versions of the same MRMS/NEXRAD data. Reserve a
commercial API as a Phase-2 accuracy benchmark (one month of side-by-side
comparison) rather than a dependency. Two caveats to engineer around:

1. **MESH overestimates** in some storm modes; unverified swaths must be
   labeled as radar estimates (also keeps claims-related use defensible).
2. **NOAA outages happen** during extreme events; the pipeline needs retry/
   backfill logic, and alerts should degrade gracefully (warnings feed and
   MESH feed are independent — one failing must not silence the other).

Licensing: NOAA/NWS data is public domain — no restriction on commercial
use. Do not imply NWS endorsement in marketing.

## 6. Technical architecture (existing stack: Supabase + Vercel)

```
[NWS API poller]──────► alerts table ──► matcher ──► notifier ──► FCM push
  (60s cron)                 │  (PostGIS: polygon      │           Twilio SMS
                             │   ∩ service_areas)      │           email
[MRMS MESH worker]────► hail_grids ──► swath builder   └─► in-app feed (Realtime)
  (2–10 min, GRIB2      (PostGIS raster/  (24h max,
   from AWS S3)          contours)         contour polygons)
                             │
[SPC/LSR poller]──────► storm_reports ──► verification scorer
                             │
                    [lead/customer matcher] ──► canvass lists
                    [marketing webhook] ──► campaign triggers
```

- **Supabase Postgres + PostGIS** for all geometry (service areas, warning
  polygons, swath contours, lead locations). Supabase supports PostGIS
  natively.
- **Ingestion workers**: the NWS poller fits Supabase Edge Functions +
  pg_cron. The MESH GRIB2 processor (needs Python + eccodes/xarray, a few
  MB per file every few minutes) runs better as a small always-on worker
  (Railway/Fly/Render, ~$20–40/mo) writing back to Supabase.
- **Notifications**: FCM/APNs or Expo push (free); Twilio for SMS
  (~$0.008/msg + A2P 10DLC registration — start registration in week 1,
  it takes days-to-weeks); Resend/Postmark for email.
- **Map rendering**: MapLibre/Mapbox on the client; swath contours served
  as GeoJSON from PostGIS (`ST_ContourLines`/raster→vector at build time).
- **Estimated infra cost**: < $150/mo at current scale, dominated by the
  worker and SMS volume. Compare: reselling one $200/mo HailStrike-class
  subscription per customer.

## 7. Phasing & rough effort

| Phase | Scope | Effort (single dev + AI assist) |
|---|---|---|
| **1 — Alerts** | NWS warning ingestion, service areas, push/SMS/email, Storm Center feed | 2–3 weeks |
| **2 — Swaths** | MESH pipeline, swath maps, point lookup, verification scoring; marketing webhook | 3–4 weeks |
| **3 — History + CRM** | Archive backfill (2020→), address history, lead matching, canvass lists | 3–4 weeks |

Phase 1 alone delivers the campaign's storm-trigger dependency and the
alert promise in the hero message. Ship it first, market it immediately;
swath maps follow while the season is still active. Given today is July 6,
Phase 1 can be alerting real users by late July — with ~6 weeks of hail
season left in MI/MN, which is tight but exactly when roofers feel the pain.

## 8. Risks & mitigations

1. **MESH accuracy disputes** (roofer says "no hail here"). Label estimates
   vs verified; show SPC ground reports alongside; never present MESH as
   measured fact in claim contexts.
2. **Quiet storm season** mutes the wow factor. Historical lookup (Phase 3)
   and last-24-months swath browsing give the feature value on calm days;
   the campaign's evergreen channels don't depend on weather.
3. **Notification fatigue** → roofers disable alerts. Per-user hail-size
   threshold, digest mode, and county-level granularity from day one.
4. **SMS compliance**: A2P 10DLC registration lead time and TCPA consent.
   Alerts to opted-in users are fine; marketing sends need explicit consent
   captured at list signup. Start registration immediately.
5. **Pipeline fragility during the exact moments it matters most** (big
   storm = peak load + peak NOAA strain). Independent feeds, retries,
   backfill, and a dead-simple status indicator in Storm Center ("data
   delayed") to preserve trust.
6. **Scope creep toward forecasting.** We alert on official NWS products
   and observed radar data; we do not predict storms. Saying otherwise
   creates liability and engineering quicksand.

## 9. Open questions

1. ~~Brand name (StormRoofer Pro vs StormGuard Pro)~~ **Decided (Jul 6):
   Storm Roofer Pro.** Site copy, email domain, and SMS sender registration
   should all consolidate on this. (GitHub repo is named `stormguard-pro`;
   repo name can stay.)
2. ~~Is this feature included in all plans or a premium tier?~~
   **Decided (Jul 6):** alerts included in all paid plans; historical
   lookup + canvass lists reserved for a higher tier.
3. ~~Mobile push today?~~ **Decided (Jul 6): the product is web-only; the
   plan is to make it an installable PWA.** Phase 1 alerts therefore use
   **Web Push** (works on installed PWAs on Android and on iOS 16.4+) with
   SMS as the reliability backstop for critical warnings.
4. Who owns weather-data QA during the season (spot-checking swaths vs
   reports)? Cheap to do weekly; expensive to skip.

## 10. Competitive reference

HailStrike, HailTrace, Interactive Hail Maps sell hail swath data and
alerts standalone. CoreLogic (via its weather verification products) serves
the insurance side. None are embedded in a roofer's CRM with lead matching —
that integration (Phase 3) is the durable differentiation; the alert feed
(Phase 1) is table stakes done conveniently; the free-data pipeline is the
cost advantage that makes both sustainable at bootstrap pricing.
