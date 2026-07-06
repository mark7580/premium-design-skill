-- Storm Center Phase 1 schema (Supabase / Postgres + PostGIS)
-- Apply via supabase migration or the SQL editor.

create extension if not exists postgis;

create schema if not exists storm_center;

-- A company's alerting footprint. Default: 100-mile radius around home base.
create table storm_center.service_areas (
  id          uuid primary key default gen_random_uuid(),
  company_id  uuid not null,            -- FK to your companies/tenants table
  name        text not null default 'Primary service area',
  center      geography(point, 4326) not null,
  radius_miles numeric not null default 100 check (radius_miles between 5 and 300),
  created_at  timestamptz not null default now()
);
create index service_areas_center_gix on storm_center.service_areas using gist (center);

-- Per-company alert preferences. NWS "severe" criteria are the defaults:
-- 1.00" hail, 58 mph gusts. Tornado warnings bypass thresholds entirely.
create table storm_center.alert_prefs (
  company_id    uuid primary key,
  min_hail_in   numeric not null default 1.00,
  min_wind_mph  integer not null default 58,
  channels      jsonb not null default '{"push": true, "sms": false, "email": true}',
  sms_numbers   text[] not null default '{}',
  quiet_hours   int4range,               -- local hours to suppress non-tornado alerts, e.g. [0,6)
  updated_at    timestamptz not null default now()
);

-- Raw-ish NWS alerts. id is the NWS alert URI (stable across our polls;
-- updates to a warning arrive as new alerts referencing the old id).
create table storm_center.weather_alerts (
  id            text primary key,
  event         text not null,           -- 'Severe Thunderstorm Warning', 'Tornado Warning', ...
  message_type  text,                    -- Alert | Update | Cancel
  severity      text,
  headline      text,
  area_desc     text,
  onset         timestamptz,
  expires       timestamptz,
  max_hail_in   numeric,                 -- parsed from CAP parameters.maxHailSize
  max_wind_mph  numeric,                 -- parsed from CAP parameters.maxWindGust
  geom          geography(geometry, 4326),  -- warning polygon (null for some zone-based alerts)
  raw           jsonb not null,
  first_seen    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);
create index weather_alerts_geom_gix on storm_center.weather_alerts using gist (geom);
create index weather_alerts_expires_idx on storm_center.weather_alerts (expires);

-- One row per (alert, service area) intersection. notified_at guards
-- against double-sends; unique constraint makes matching idempotent.
create table storm_center.alert_matches (
  id              uuid primary key default gen_random_uuid(),
  alert_id        text not null references storm_center.weather_alerts (id) on delete cascade,
  service_area_id uuid not null references storm_center.service_areas (id) on delete cascade,
  matched_at      timestamptz not null default now(),
  notified_at     timestamptz,
  unique (alert_id, service_area_id)
);

-- Ground-truth storm reports (NWS Local Storm Reports / SPC): measured hail
-- size and wind gusts. Feeds the "what actually fell" view and later the
-- swath verification scorer.
create table storm_center.storm_reports (
  id           text primary key,         -- source-provided id or composed key
  source       text not null,            -- 'LSR' | 'SPC'
  report_type  text not null,            -- 'hail' | 'wind'
  magnitude    numeric,                  -- inches for hail, mph for wind
  location     geography(point, 4326) not null,
  place        text,
  occurred_at  timestamptz not null,
  remarks      text,
  raw          jsonb not null
);
create index storm_reports_location_gix on storm_center.storm_reports using gist (location);
create index storm_reports_occurred_idx on storm_center.storm_reports (occurred_at);

-- Match unexpired alerts against service areas. Radius is applied via
-- ST_DWithin in meters (1 mile = 1609.344 m). Returns only NEW matches.
create or replace function storm_center.match_new_alerts()
returns setof storm_center.alert_matches
language sql
as $$
  insert into storm_center.alert_matches (alert_id, service_area_id)
  select a.id, s.id
  from storm_center.weather_alerts a
  join storm_center.service_areas s
    on st_dwithin(s.center, a.geom, s.radius_miles * 1609.344)
  where a.expires > now()
    and a.geom is not null
    and coalesce(a.message_type, 'Alert') <> 'Cancel'
  on conflict (alert_id, service_area_id) do nothing
  returning *;
$$;

-- Everything the notifier needs for un-notified matches, thresholds included.
create or replace view storm_center.v_pending_notifications as
select
  m.id            as match_id,
  m.alert_id,
  m.service_area_id,
  s.company_id,
  s.name          as area_name,
  a.event, a.headline, a.area_desc, a.expires,
  a.max_hail_in, a.max_wind_mph,
  p.min_hail_in, p.min_wind_mph, p.channels, p.sms_numbers, p.quiet_hours
from storm_center.alert_matches m
join storm_center.weather_alerts a on a.id = m.alert_id
join storm_center.service_areas  s on s.id = m.service_area_id
left join storm_center.alert_prefs p on p.company_id = s.company_id
where m.notified_at is null
  and a.expires > now();

-- RLS: companies see only their own rows (worker uses the service-role key).
alter table storm_center.service_areas enable row level security;
alter table storm_center.alert_prefs   enable row level security;
alter table storm_center.alert_matches enable row level security;
-- Alerts and reports are public data; expose read-only to authenticated users.
alter table storm_center.weather_alerts enable row level security;
alter table storm_center.storm_reports  enable row level security;
create policy weather_alerts_read on storm_center.weather_alerts for select to authenticated using (true);
create policy storm_reports_read  on storm_center.storm_reports  for select to authenticated using (true);
-- NOTE: add company-scoped policies for service_areas/alert_prefs/alert_matches
-- to match your existing auth model (e.g. company_id = auth.jwt() ->> 'company_id').
