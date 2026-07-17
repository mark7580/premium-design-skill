# Session Recap — DUN, Storm Roofer Pro & Storm Center

**Date:** July 2026 · **Session:** Claude Code (cloud) on `mark7580/premium-design-skill`, branch `claude/dun-marketing-positioning-dn42k1`
**Purpose of this document:** a complete, self-contained record of everything discussed, decided, built, and still owed — readable by Mark and usable as context by any AI agent in a future session.

---

## 1. Executive summary

This session covered two separate ventures and produced strategy documents, a product spec, and working code:

1. **DUN** — an early-stage idea for a horizontal "get anything done" service platform (consumers post requests; providers respond). Positioning strategy and a full marketing-plan review were produced. No code exists yet; there is no DUN repo.
2. **Storm Roofer Pro** (site: stormroofpro.com; repo: `mark7580/stormguard-pro`) — an existing SaaS CRM for storm-restoration roofing contractors. This session audited its dashboard (via a bridged desktop session), reviewed its launch campaign, wrote the PRD for an in-house weather alert system ("Storm Center"), built the Phase 1 code scaffold, and handed it off — and a second session successfully integrated it into the app.

Everything produced is committed to branch `claude/dun-marketing-positioning-dn42k1` of `mark7580/premium-design-skill` (see §6 for the artifact index).

---

## 2. DUN — strategy and decisions

**What DUN is:** a reverse-request marketplace. A consumer posts a request ("I need a tow," "how much does a roof cost," "I need a DJ Saturday") with photos and location; local providers get notified and respond with price and availability; the consumer compares, chats, picks. Core message (locked): **"Post once. Get multiple providers. No phone calls. DUN."**

**Positioning decisions:**
- Own the horizontal behavior "I need something done" — do NOT become a vertical (Thumbtack = contractors, Angi = home services). Real competitor is Google/AI assistants (where cost questions start today); DUN is "where questions become actions."
- Investor one-liner: *"DUN is an AI-powered service coordination platform that helps consumers discover costs, find professionals, compare options, and get real-world services completed through a single conversational interface."*
- Never describe as: marketplace, contractor network, lead-gen platform, AI quoting tool.
- **Brand horizontal, media buys vertical**: landing page and TikTok show request diversity (DJ, tow, CPA, photographer, plumber); paid ads and provider recruitment target 2–3 categories in ONE metro.
- Long-term vision to seed now: "the operating system for real-world services" (service history, saved providers, home/vehicle records).

**Marketing plan review verdict:** creative strong; three structural fixes required — (1) don't spread across multiple states pre-launch; density in one metro or the "fast responses" promise dies visibly; (2) the cold-DM subject line "You were recommended in your area" is deceptive and will backfire with exactly the best providers — use honest hooks ("Jobs in [City] sent to you — free during pre-launch"); (3) don't run urgent-need ads (towing) to a waitlist — pre-launch those are story content only. Missing pieces: liquidity target (30–50 responsive providers per category in metro #1 before consumers), waitlist nurture emails, metro-level measurement (waitlist form must capture zip + consumer/provider), a concrete mechanism behind the "early providers get first access" promise, and local channels (Nextdoor, neighborhood FB groups).

**Product assessment:** the idea is good but ~20% of the outcome; two-sided liquidity is everything. Recommended stack: Next.js PWA on Vercel + Supabase (auth, Postgres/PostGIS, Realtime for live provider responses, Storage). Build order: waitlist landing page → provider onboarding → core request loop → AI conversational layer later. Provider-side pitch ("no blind lead fees — see the job first") is the recruitment weapon.

**DUN status: nothing built yet.** Next concrete step when resumed: waitlist landing page with zip capture and provider signup, deployed to Vercel.

---

## 3. Storm Roofer Pro — audit, campaign, and Storm Center

### 3.1 Identity decisions (settled)
- **Official name: Storm Roofer Pro** (site previously said "StormGuard Pro"; domain is stormroofpro.com; email @stormrooferpro.com). Site copy consolidation is a pending week-1 task. Flag: consider acquiring `stormrooferpro.com` to match the chosen name.
- Separate product from DUN — evaluated on its own terms, but findings cross-pollinate (see §5).

### 3.2 Dashboard audit (bridged from a desktop session)
Strengths: coherent dark theme (bg `#0C1117`, cards `#151B23`, borders `#2E343E`, lime accent `#B3E61A`, Inter), WCAG-passing contrast, proper responsive/off-canvas behavior, clean heading semantics.
Issues found: (1) **data contradiction** — "Total Leads: 2" card next to "No leads to display" pipeline (filter/query inconsistency; correctness bug, top priority); (2) test data throughout the activity feed; (3) **no empty/first-run states** — new users see a wall of zeros; empty state should be an onboarding checklist (this matters doubly because campaign success is measured in *activated* accounts); (4) quick actions duplicate the sidebar — replace with workflow actions; stat cards need urgency/trends, not bare counts ("storm radar, not ledger").

### 3.3 Campaign context ("Be First to the Storm")
90-day, ≤$2k/month, signup-driven campaign in Michigan + Minneapolis–St. Paul (top-3 hail market; DFW next spring). Primary goal: **25 activated contractor accounts** (signup + first inspection/estimate). Storm-trigger marketing (hail event → same-day email/SMS + geo-fenced ad burst) is a centerpiece — and is powered by Storm Center's own data pipeline. Website brand/contact fixes are gated before any paid spend.

### 3.4 Storm Center — the weather alert system (PRD + built code)
**What it is:** an in-house HailStrike-equivalent. Roofers get alerted to storms in their registered service area — incoming high winds and hail — plus actual damage reports with hail size and wind speed, and post-event hail swath maps.

**Key insight:** HailStrike/HailTrace/Interactive Hail Maps ($100–300/mo) are built on **free public-domain NOAA data**: NWS API (api.weather.gov — real-time warning polygons with max hail size + max wind gust), NOAA MRMS MESH (1-km radar hail-size grid, ~2-min updates, free on AWS; archive to late 2020), and SPC/Local Storm Reports (ground-truth observed sizes/gusts). Building in-house costs <$150/mo infra and creates the differentiator no competitor CRM has.

**Decisions locked:**
- Alerts included in **all paid plans**; historical lookup + canvass lists reserved for a higher tier.
- Platform: web-only today → **installable PWA** ("downloadable app" = PWA; push works on Android and iOS 16.4+ once installed). Notifications: Web Push (via existing Firebase/FCM) + **SMS backstop** (Twilio).
- Default service area: **100-mile radius** around company home base (adjustable 5–300 mi).
- Thresholds: alert at hail ≥ 1.0" **or** gusts ≥ 58 mph (per-company adjustable); **tornado warnings always alert**.
- Three phases: (1) real-time alerts, (2) MESH swath maps + address lookup + verification scoring, (3) history + **CRM lead-matching** ("14 of your contacts are inside yesterday's 1.5-inch swath") — Phase 3 is the moat no standalone hail service can copy.

**Built in this session** (`product/stormroofpro/storm-center/`): PostGIS schema + matching function + RLS scaffold; NWS ingestion with hail/wind parsing (CAP parameters + prose fallback); LSR ground-truth reports module; threshold + message formatting logic; Twilio adapter; resilient polling worker; 4 passing fixture tests; README + INTEGRATION.md handoff. *Caveat: written offline — IEM LSR endpoint params need re-verification on first live run.*

**Integrated by a second session into `stormguard-pro`:** migration adapted to the app (public schema, company_settings FKs, app's RLS pattern, lat/lng + generated PostGIS columns), worker at `services/storm-center/` (6 tests passing), Storm Center page at `/storm-center` behind existing permissions with Realtime feed + settings (free US Census geocoding), Storm Radar dashboard tile (replaced redundant "Manage Team" quick action), PWA (manifest as Storm Roofer Pro, icons, one service worker for push + installability, iOS install guidance), marketing webhook (hail ≥ 1.25" over Detroit/Grand Rapids/MSP → `MARKETING_WEBHOOK_URL`). **Discovery:** the app already had a weak legacy storm-alert system (hardcoded ZIP→FIPS) — Storm Center replaces its weak parts and reuses its FCM push; old `/storm-alerts` page to be hidden now, removed after Storm Center runs clean for ~2 weeks.

**Deploy steps remaining (not yet done at time of writing):** commit/push in that repo → apply migration (confirmed-additive) → deploy worker to an always-on host (Railway/Fly/Render ~$20/mo) → one supervised live cycle before enabling SMS → definition of done: *a Grand Rapids test company receives push + SMS within 3 minutes of a real severe thunderstorm warning.*

---

## 4. Mark's open action items (only-human tasks, prioritized)

1. **Twilio A2P 10DLC registration** for "Storm Roofer Pro" — longest lead time (days-to-weeks); everything SMS waits on it. Start immediately.
2. **Worker hosting account** (Railway/Fly/Render) — env vars listed in `services/storm-center/README.md`.
3. **Marketing webhook target** — free n8n/Zapier webhook that emails Mark; paste URL into `MARKETING_WEBHOOK_URL`.
4. **Brand cleanup**: site copy → Storm Roofer Pro everywhere; replace placeholder contact info; consider acquiring `stormrooferpro.com`.
5. **Supervised first live cycle** of the Storm Center worker before enabling SMS/push broadly.
6. **StormGuard-pro fixes from the audit**: lead pipeline vs count mismatch; purge test data; build first-run empty states.
7. **DUN (when ready)**: waitlist landing page (zip + consumer/provider capture), pick metro #1, honest provider outreach at 50/wk in that metro.

---

## 5. Cross-product lessons (bank these)

- **Counts without direction are dead weight** — dashboards should lead with urgency ("3 new jobs, oldest 22 min ago"), not totals. Applies to StormGuard Pro today and DUN's provider app later.
- **Empty state = onboarding.** First-run screens must guide, not show zeros — activation is a campaign metric in both ventures.
- **One source of truth per number.** The pipeline-vs-count bug class kills trust; same query everywhere a number appears.
- **Marketplace liquidity is local.** Density in one metro beats presence in ten states (DUN); provider network before consumer launch.
- **Honesty is a growth tactic**, not a constraint: the deceptive DM subject line would have burned the best providers; the honest version converts better.

## 6. Artifact index (branch `claude/dun-marketing-positioning-dn42k1` of `mark7580/premium-design-skill`)

| Path | What it is |
|---|---|
| `marketing/dun/positioning.md` | DUN category strategy, competitor framing, copy directions |
| `marketing/dun/landing-copy-deck.md` | Section-by-section DUN landing copy incl. founder revisions |
| `product/stormroofpro/weather-alert-system-prd.md` | Storm Center PRD v1 with all decisions recorded inline |
| `product/stormroofpro/storm-center/` | Phase 1 scaffold: `migrations/`, `src/`, `test/`, `README.md` |
| `product/stormroofpro/storm-center/INTEGRATION.md` | Handoff doc used by the stormguard-pro session (decisions + steps + definition of done) |
| `SESSION-RECAP.md` | This document |

PDFs delivered in-chat (regenerable from repo content): DUN Marketing Strategy Review; Storm Center PRD; this recap.

## 7. How Mark's AI sessions fit together (operational notes for agents)

- **Sessions are isolated.** Cloud repo sessions see only their repo clone; no local Chrome/logins; outbound network is policy-restricted (this session could not reach arbitrary websites, and MCP connector calls requiring approval fail in non-interactive cloud sessions). Desktop app chats run locally with browser access and interactive approvals.
- **Bridging works by pasting**: Mark relays outputs between sessions (this is how the dashboard audit came in and how the integration session was launched and supervised). Write handoff docs into the repo for anything a future session must execute.
- **Containers are ephemeral** — anything worth keeping gets committed and pushed immediately.
- **Repos**: `mark7580/premium-design-skill` (strategy docs + scaffold, this branch); `mark7580/stormguard-pro` (the Storm Roofer Pro app; Storm Center integration on its own branch there, unmerged at time of writing).
- **Backend guidance given**: stay on Supabase for both products (PostGIS, RLS, Realtime are load-bearing); NocodeBackend rejected for these uses; for Mark's executive-assistant folder system: files stay files, tabular data → Google Sheet first, database only if it outgrows a sheet.

## 8. Context block for AI agents

> **Mark Kochan** (markckochan@gmail.com) runs two ventures. (1) **Storm Roofer Pro** — live SaaS CRM for storm-restoration roofers (repo `mark7580/stormguard-pro`, site stormroofpro.com, Supabase + Vercel + Firebase push, dark theme `#0C1117`/`#151B23`/accent `#B3E61A`). Official brand name is "Storm Roofer Pro". Its new flagship feature, **Storm Center**, alerts roofers to hail ≥1"/gusts ≥58 mph within a default 100-mile service radius using free NOAA data (NWS API + MRMS MESH + LSR reports), free in all paid plans, delivered via PWA web push + Twilio SMS; Phase 1 is integrated on a branch, deploy pending (migration, worker host, 10DLC, supervised live cycle). Campaign "Be First to the Storm": MI + Minneapolis–St. Paul, ≤$2k/mo, goal 25 activated accounts. (2) **DUN** — pre-build reverse-request marketplace ("Post once. Get multiple providers. No phone calls."); horizontal brand, vertical launch wedge in one metro; no code yet; next step is a waitlist page. Strategy docs and the Storm Center scaffold live on branch `claude/dun-marketing-positioning-dn42k1` of `mark7580/premium-design-skill`. Do not re-litigate decisions marked as locked in §2–§3; check §4 for open tasks.
