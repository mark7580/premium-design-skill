/**
 * Ground-truth storm reports: NWS Local Storm Reports via the Iowa
 * Environmental Mesonet (IEM) GeoJSON service. These are actual observed
 * hail sizes (inches) and wind gusts (mph) with location and time — the
 * "what actually fell" feed shown alongside warnings.
 *
 * NOTE: endpoint and parameter names should be re-verified against
 * https://mesonet.agron.iastate.edu/ at deploy time — this scaffold was
 * written in a sandbox without network access. The response shape handled
 * here matches IEM's documented LSR GeoJSON output.
 */

const IEM_LSR = 'https://mesonet.agron.iastate.edu/geojson/lsr.php';

/** LSR typetext values we keep, mapped to our report_type. */
const TYPE_MAP = new Map([
  ['HAIL', 'hail'],
  ['TSTM WND GST', 'wind'],
  ['TSTM WND DMG', 'wind'],
  ['NON-TSTM WND GST', 'wind'],
]);

/**
 * Fetch storm reports for a UTC time window.
 * @param {{start: Date, end: Date, fetchImpl?: typeof fetch}} opts
 */
export async function fetchStormReports({ start, end, fetchImpl = fetch }) {
  const url = new URL(IEM_LSR);
  url.searchParams.set('sts', start.toISOString());
  url.searchParams.set('ets', end.toISOString());
  const res = await fetchImpl(url);
  if (!res.ok) throw new Error(`IEM LSR fetch failed: ${res.status}`);
  const body = await res.json();
  return (body.features ?? []).map(parseReport).filter(Boolean);
}

/**
 * Parse one LSR feature into a storm_reports row; null for types we skip.
 * @param {object} feature
 */
export function parseReport(feature) {
  const p = feature.properties ?? {};
  const reportType = TYPE_MAP.get((p.typetext ?? '').toUpperCase());
  if (!reportType) return null;
  const [lon, lat] = feature.geometry?.coordinates ?? [];
  if (lon == null || lat == null) return null;
  const occurredAt = p.valid ?? p.utc_valid ?? null;
  return {
    id: `lsr:${p.wfo ?? 'na'}:${occurredAt}:${lon},${lat}:${reportType}`,
    source: 'LSR',
    report_type: reportType,
    magnitude: p.magnitude != null ? Number.parseFloat(p.magnitude) : null,
    lon, lat,
    place: [p.city, p.st].filter(Boolean).join(', ') || null,
    occurred_at: occurredAt,
    remarks: p.remark ?? null,
    raw: feature,
  };
}
