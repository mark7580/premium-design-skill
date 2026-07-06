/**
 * Notification adapters. The worker talks to the `send` interface; swap in
 * real push (FCM/Expo) when the mobile client is confirmed.
 */

/** Logs instead of sending — for local runs and tests. */
export function consoleNotifier() {
  return {
    async send({ channel, to, message }) {
      console.log(`[notify:${channel}] → ${to ?? '(in-app)'}: ${message}`);
      return { ok: true };
    },
  };
}

/**
 * Twilio SMS via bare REST (no SDK dependency).
 * Requires A2P 10DLC registration before production traffic.
 * @param {{accountSid: string, authToken: string, from: string, fetchImpl?: typeof fetch}} cfg
 */
export function twilioNotifier({ accountSid, authToken, from, fetchImpl = fetch }) {
  const endpoint = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;
  const auth = Buffer.from(`${accountSid}:${authToken}`).toString('base64');
  return {
    async send({ to, message }) {
      const res = await fetchImpl(endpoint, {
        method: 'POST',
        headers: {
          Authorization: `Basic ${auth}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({ To: to, From: from, Body: message }),
      });
      if (!res.ok) {
        const err = await res.text();
        return { ok: false, error: `Twilio ${res.status}: ${err.slice(0, 200)}` };
      }
      return { ok: true };
    },
  };
}
