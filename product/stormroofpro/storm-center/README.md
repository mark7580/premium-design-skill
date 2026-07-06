# Storm Center — Phase 1 scaffold

Weather alert pipeline for StormRoofer Pro. Polls NWS severe weather alerts,
matches them against each company's service area (default 100-mile radius),
and notifies on hail/wind above the company's thresholds. Also ingests
ground-truth storm reports (observed hail size, wind gusts).

Built as a portable package: drop `migrations/` into the Supabase project and
`src/` into a small worker host. See `../weather-alert-system-prd.md` for the
full product spec.

## Layout

```
migrations/001_storm_center.sql   Postgres/PostGIS schema, matching fn, RLS
src/nws.js                        NWS alert fetch + parse + thresholds
src/reports.js                    Local Storm Reports (observed hail/wind) via IEM
src/notify.js                     Notifier adapters (console, Twilio SMS)
src/worker.js                     Poll → upsert → match → notify loop
test/                             Fixture-driven unit tests (node --test)
```

## Deploy checklist

1. **Apply the migration** to the Supabase project (SQL editor or CLI).
   Wire `service_areas.company_id` / `alert_prefs.company_id` to the existing
   tenant model and add matching RLS policies (marked NOTE in the SQL).
2. **Seed data**: one `service_areas` row per company (geocode their office
   address for `center`; default radius 100), one `alert_prefs` row.
3. **Run the worker** on an always-on host (Railway/Fly/Render, ~$20/mo):
   `npm install && npm start` with env vars:
   - `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`
   - `NWS_USER_AGENT` — NWS requires identifying contact info, e.g.
     `StormRooferPro/1.0 (ops@stormroofpro.com)`
   - `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_FROM` (optional —
     console notifier used if unset)
   - `POLL_SECONDS` (default 60)
4. **App UI**: subscribe to `storm_center.weather_alerts` +
   `storm_center.storm_reports` (Supabase Realtime) for the Storm Center
   feed; `alert_matches` drives the in-app notification badge.

## Verify at deploy (written offline — sandbox had no network)

- **IEM LSR endpoint** (`src/reports.js`): confirm current query params at
  mesonet.agron.iastate.edu; the parsing handles the documented GeoJSON shape.
- **NWS `event` query param** accepts comma-separated values; if the filter
  misbehaves, drop it and filter client-side on `properties.event`.
- Run one live cycle with the console notifier before enabling SMS.

## Known Phase-1 gaps (deliberate)

- Zone-based alerts without polygons (some watches) are stored but not
  matched — warnings, the urgent ones, carry polygons. Watch matching via
  county zone geometries is a fast follow.
- Push and email adapters are stubs pending the client/push decision.
- Quiet hours stored in prefs but not yet enforced in the worker.
- SMS requires A2P 10DLC registration (days-to-weeks) — start it now.

## Tests

```
npm test      # 4 fixture-driven tests: parsing, prose fallback, thresholds, formatting
```
