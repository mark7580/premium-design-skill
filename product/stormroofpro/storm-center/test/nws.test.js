import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { parseAlert, meetsThresholds, formatAlertMessage } from '../src/nws.js';

const fixture = JSON.parse(
  readFileSync(new URL('./fixtures/nws-alerts.json', import.meta.url), 'utf8'),
);
const [warning, watch, tornado] = fixture.features.map(parseAlert);

test('parses hail size and wind gust from CAP parameters', () => {
  assert.equal(warning.event, 'Severe Thunderstorm Warning');
  assert.equal(warning.max_hail_in, 1.75);
  assert.equal(warning.max_wind_mph, 70);
  assert.equal(warning.geom.type, 'Polygon');
  assert.ok(warning.id.includes('abc123'));
});

test('falls back to prose when CAP parameters are missing', () => {
  // Watch has empty parameters; description says "2 inches" and "75 mph".
  assert.equal(watch.max_hail_in, 2);
  assert.equal(watch.max_wind_mph, 75);
  assert.equal(watch.geom, null);
});

test('thresholds: passes on hail OR wind, tornado always passes', () => {
  const prefs = { min_hail_in: 1.0, min_wind_mph: 58 };
  assert.equal(meetsThresholds(warning, prefs), true);

  // High bar: 2.5" hail min and 100 mph wind — warning no longer qualifies.
  assert.equal(meetsThresholds(warning, { min_hail_in: 2.5, min_wind_mph: 100 }), false);

  // Wind alone qualifies even if hail doesn't.
  assert.equal(meetsThresholds(warning, { min_hail_in: 2.5, min_wind_mph: 60 }), true);

  // Tornado warning has no hail/wind numbers but always alerts.
  assert.equal(tornado.max_hail_in, null);
  assert.equal(meetsThresholds(tornado, { min_hail_in: 5, min_wind_mph: 200 }), true);
});

test('formats a compact notification message', () => {
  const msg = formatAlertMessage(warning, 'West Michigan');
  assert.match(msg, /Severe Thunderstorm Warning/);
  assert.match(msg, /1\.75"/);
  assert.match(msg, /70 mph/);
  assert.match(msg, /West Michigan/);
  assert.ok(msg.length < 300, `message too long: ${msg.length}`);
});
