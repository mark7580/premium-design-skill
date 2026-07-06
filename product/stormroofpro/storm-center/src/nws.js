/**
 * NWS alert ingestion: fetch active severe weather alerts and parse the
 * fields Storm Center cares about (hail size, wind gusts, geometry).
 *
 * Data source: https://api.weather.gov/alerts/active (free, public domain,
 * no API key). NWS asks for a descriptive User-Agent with contact info.
 */

const NWS_API = 'https://api.weather.gov';

/** Events we alert on. Warnings are urgent; watches give early notice. */
export const ALERT_EVENTS = [
  'Severe Thunderstorm Warning',
  'Tornado Warning',
  'Severe Thunderstorm Watch',
  'Tornado Watch',
];

/**
 * Fetch active alerts for the configured events.
 * @param {{userAgent: string, fetchImpl?: typeof fetch}} opts
 * @returns {Promise<object[]>} GeoJSON features
 */
export async function fetchActiveAlerts({ userAgent, fetchImpl = fetch }) {
  const url = new URL(`${NWS_API}/alerts/active`);
  url.searchParams.set('status', 'actual');
  url.searchParams.set('event', ALERT_EVENTS.join(','));
  const res = await fetchImpl(url, {
    headers: { 'User-Agent': userAgent, Accept: 'application/geo+json' },
  });
  if (!res.ok) throw new Error(`NWS alerts fetch failed: ${res.status}`);
  const body = await res.json();
  return body.features ?? [];
}

/**
 * Parse one NWS alert feature into a weather_alerts row.
 * @param {object} feature GeoJSON feature from the NWS API
 */
export function parseAlert(feature) {
  const p = feature.properties ?? {};
  return {
    id: p.id ?? feature.id,
    event: p.event,
    message_type: p.messageType ?? null,
    severity: p.severity ?? null,
    headline: p.headline ?? null,
    area_desc: p.areaDesc ?? null,
    onset: p.onset ?? p.effective ?? null,
    expires: p.expires ?? p.ends ?? null,
    max_hail_in: parseHailSize(p),
    max_wind_mph: parseWindGust(p),
    geom: feature.geometry ?? null, // GeoJSON; null for some zone-based alerts
    raw: feature,
  };
}

/** CAP parameter maxHailSize is inches, e.g. ["1.75"]. Fall back to prose. */
function parseHailSize(p) {
  const param = p.parameters?.maxHailSize?.[0];
  const fromParam = param != null ? Number.parseFloat(param) : NaN;
  if (Number.isFinite(fromParam)) return fromParam;
  const m = /(\d+(?:\.\d+)?)\s*(?:inch|in\b|")/i.exec(p.description ?? '');
  return m ? Number.parseFloat(m[1]) : null;
}

/** CAP parameter maxWindGust looks like ["70 MPH"]. Fall back to prose. */
function parseWindGust(p) {
  const param = p.parameters?.maxWindGust?.[0];
  const fromParam = param != null ? Number.parseFloat(param) : NaN;
  if (Number.isFinite(fromParam)) return fromParam;
  const m = /(\d{2,3})\s*mph/i.exec(p.description ?? '');
  return m ? Number.parseFloat(m[1]) : null;
}

/**
 * Threshold check for one company's prefs. Tornado warnings always pass.
 * An alert passes if EITHER hail or wind meets the company's minimum.
 * @param {{event: string, max_hail_in: number|null, max_wind_mph: number|null}} alert
 * @param {{min_hail_in: number, min_wind_mph: number}} prefs
 */
export function meetsThresholds(alert, prefs) {
  if (/tornado warning/i.test(alert.event ?? '')) return true;
  const hailOk = alert.max_hail_in != null && alert.max_hail_in >= prefs.min_hail_in;
  const windOk = alert.max_wind_mph != null && alert.max_wind_mph >= prefs.min_wind_mph;
  return hailOk || windOk;
}

/** Human-readable notification text for push/SMS. Keep under ~300 chars. */
export function formatAlertMessage(alert, areaName) {
  const parts = [];
  if (alert.max_hail_in != null) parts.push(`hail up to ${alert.max_hail_in}"`);
  if (alert.max_wind_mph != null) parts.push(`gusts to ${Math.round(alert.max_wind_mph)} mph`);
  const threat = parts.length ? ` — ${parts.join(', ')}` : '';
  const until = alert.expires
    ? ` until ${new Date(alert.expires).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`
    : '';
  return `⚠️ ${alert.event}${threat}${until}. Area: ${alert.area_desc ?? 'see map'}. In your service area "${areaName}".`;
}
