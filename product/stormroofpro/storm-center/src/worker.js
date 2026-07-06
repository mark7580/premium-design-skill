/**
 * Storm Center ingestion worker: poll NWS → upsert alerts → match against
 * service areas (PostGIS) → send notifications for new matches that clear
 * each company's thresholds.
 *
 * Run continuously (Railway/Fly/Render) or on a 60s scheduler.
 *
 * Env:
 *   SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY   (server-side only)
 *   NWS_USER_AGENT      e.g. "StormRooferPro/1.0 (ops@yourdomain.com)"
 *   TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_FROM   (optional; SMS off if unset)
 *   POLL_SECONDS        default 60
 */

import { createClient } from '@supabase/supabase-js';
import { fetchActiveAlerts, parseAlert, meetsThresholds, formatAlertMessage } from './nws.js';
import { fetchStormReports } from './reports.js';
import { consoleNotifier, twilioNotifier } from './notify.js';

const env = process.env;

export async function runOnce({ supabase, notifier, log = console.log }) {
  // 1. Ingest active alerts.
  const features = await fetchActiveAlerts({ userAgent: env.NWS_USER_AGENT });
  const rows = features.map(parseAlert).filter((a) => a.id && a.event);
  if (rows.length) {
    const { error } = await supabase.schema('storm_center').from('weather_alerts').upsert(
      rows.map((a) => ({ ...a, updated_at: new Date().toISOString() })),
      { onConflict: 'id' },
    );
    if (error) throw new Error(`alert upsert failed: ${error.message}`);
  }
  log(`ingested ${rows.length} active alerts`);

  // 2. Match against service areas (idempotent, PostGIS does the geometry).
  const { error: matchErr } = await supabase.schema('storm_center').rpc('match_new_alerts');
  if (matchErr) throw new Error(`matching failed: ${matchErr.message}`);

  // 3. Notify pending matches that clear thresholds.
  const { data: pending, error: pendErr } = await supabase
    .schema('storm_center')
    .from('v_pending_notifications')
    .select('*');
  if (pendErr) throw new Error(`pending fetch failed: ${pendErr.message}`);

  for (const p of pending ?? []) {
    const prefs = { min_hail_in: p.min_hail_in ?? 1.0, min_wind_mph: p.min_wind_mph ?? 58 };
    const alert = { event: p.event, max_hail_in: p.max_hail_in, max_wind_mph: p.max_wind_mph };
    if (meetsThresholds(alert, prefs)) {
      const message = formatAlertMessage({ ...alert, expires: p.expires, area_desc: p.area_desc }, p.area_name);
      const channels = p.channels ?? { push: true };
      if (channels.sms && p.sms_numbers?.length) {
        for (const to of p.sms_numbers) await notifier.send({ channel: 'sms', to, message });
      }
      // Push/email adapters plug in here once client infra is confirmed.
      await notifier.send({ channel: 'feed', to: p.company_id, message });
    }
    // Mark handled either way — below-threshold matches shouldn't retry forever.
    await supabase
      .schema('storm_center')
      .from('alert_matches')
      .update({ notified_at: new Date().toISOString() })
      .eq('id', p.match_id);
  }
  log(`processed ${pending?.length ?? 0} pending notifications`);

  // 4. Pull the last hour of ground-truth storm reports (hail size / gusts).
  try {
    const reports = await fetchStormReports({
      start: new Date(Date.now() - 60 * 60 * 1000),
      end: new Date(),
    });
    if (reports.length) {
      const { error } = await supabase.schema('storm_center').from('storm_reports').upsert(
        reports.map(({ lon, lat, ...r }) => ({ ...r, location: `POINT(${lon} ${lat})` })),
        { onConflict: 'id' },
      );
      if (error) throw new Error(error.message);
    }
    log(`ingested ${reports.length} storm reports`);
  } catch (e) {
    // Reports feed failing must never silence warnings — log and continue.
    log(`storm reports ingest failed (continuing): ${e.message}`);
  }
}

async function main() {
  const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);
  const notifier = env.TWILIO_ACCOUNT_SID
    ? twilioNotifier({
        accountSid: env.TWILIO_ACCOUNT_SID,
        authToken: env.TWILIO_AUTH_TOKEN,
        from: env.TWILIO_FROM,
      })
    : consoleNotifier();

  const pollMs = (Number.parseInt(env.POLL_SECONDS, 10) || 60) * 1000;
  // Simple resilient loop: one bad cycle never kills the worker.
  for (;;) {
    try {
      await runOnce({ supabase, notifier });
    } catch (e) {
      console.error(`cycle failed: ${e.message}`);
    }
    await new Promise((r) => setTimeout(r, pollMs));
  }
}

if (import.meta.url === `file://${process.argv[1]}`) main();
