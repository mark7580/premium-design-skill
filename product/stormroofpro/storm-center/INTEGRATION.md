# Storm Center — Integration handoff for the `stormguard-pro` codebase

Audience: the Claude Code session (or developer) working inside
`mark7580/stormguard-pro`. This scaffold was built in a separate session that
could not access that repo. Everything needed to integrate lives here:

- Scaffold: `product/stormroofpro/storm-center/` on branch
  `claude/dun-marketing-positioning-dn42k1` of `mark7580/premium-design-skill`
- Spec: `product/stormroofpro/weather-alert-system-prd.md` (same branch)

## Decisions already made (do not re-litigate)

- Brand name: **Storm Roofer Pro** (site currently says "StormGuard Pro" —
  rename is a separate week-1 task from the campaign brief).
- Alerts included in **all paid plans**; historical lookup + canvass lists
  reserved for a higher tier.
- Platform: web-only today → **installable PWA**. Phase 1 notifications:
  **Web Push + SMS backstop** (Twilio; A2P 10DLC registration in progress).
- Alert triggers: hail ≥ 1.0" **or** wind gusts ≥ 58 mph (per-company
  adjustable); tornado warnings always alert. Default service area:
  **100-mile radius** around company home base.

## Integration steps

1. **Survey the existing schema** before touching anything: find the
   companies/tenants table, users, and whether a company address/geocode
   exists. Adapt `migrations/001_storm_center.sql`:
   - point `service_areas.company_id` / `alert_prefs.company_id` FKs at the
     real tenant table;
   - write RLS policies matching the app's existing auth pattern (marked
     `NOTE` in the SQL).
2. **Copy the worker package** (`src/`, `test/`, `package.json`) into the
   repo (suggested: `services/storm-center/` or `workers/storm-center/`).
   Run `npm test` — 4 fixture tests should pass unchanged.
3. **Seed service areas**: geocode each company's address → `center`;
   radius defaults to 100 miles. If no address field exists, add one to
   onboarding/settings.
4. **Storm Center UI** (match the existing dark dashboard theme:
   bg `#0C1117`, cards `#151B23`, borders `#2E343E`, accent `#B3E61A`):
   - Feed of active alerts in the company's service area (Supabase Realtime
     on `storm_center.weather_alerts` filtered via `alert_matches`).
   - Ground-truth reports list: observed hail size (in) and gusts (mph)
     from `storm_center.storm_reports`, nearest-first.
   - Settings: service area (address + radius slider), thresholds, channels.
   - Dashboard tile: "Storm radar" summary (active warnings count, last
     24h max hail in area) — replaces one of the redundant quick actions.
5. **PWA setup** (this also delivers the "downloadable app" goal):
   - `manifest.json` (name "Storm Roofer Pro", icons, standalone display,
     theme `#0C1117`) + service worker (Workbox or `next-pwa` if Next.js).
   - Web Push: generate VAPID keys; `push_subscriptions` table
     (company_id, user_id, endpoint, keys); subscribe prompt inside Storm
     Center settings (ask in context, never on first page load); worker
     sends via `web-push` npm package in `notify.js` (adapter stub exists).
   - iOS caveat: web push requires the PWA to be installed (Add to Home
     Screen) on iOS 16.4+ — surface an install prompt for iPhone users.
6. **Deploy the worker** (always-on host, ~$20/mo — Railway/Fly/Render):
   env vars in `README.md`. Run one supervised live cycle with the console
   notifier before enabling SMS/push (scaffold was written offline against
   fixture payloads; re-verify the IEM LSR endpoint params — see README
   "Verify at deploy").
7. **Marketing webhook** (campaign dependency): when a new alert with
   `max_hail_in >= 1.25` matches a target metro (Detroit, Grand Rapids,
   Minneapolis–St. Paul), notify Mark (email is fine for v1) so he can
   trigger the "Hail just hit [city]" sends. Keep it dumb; automate later.

## Definition of done (Phase 1)

- [ ] A test company with a Grand Rapids service area receives a Web Push +
      SMS within 3 minutes of a real severe thunderstorm warning.
- [ ] Storm Center feed shows the warning with hail/wind numbers and the
      observed reports as they come in.
- [ ] Thresholds and radius editable in settings; changes take effect on
      the next poll cycle.
- [ ] Lighthouse PWA installability checks pass; app installs to home
      screen on Android and iOS.
