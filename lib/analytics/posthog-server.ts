import { PostHog } from "posthog-node";
import type { EventName, EventProps } from "./events";

let _client: PostHog | null = null;

function getClient(): PostHog | null {
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  if (!key) return null;
  if (!_client) {
    _client = new PostHog(key, {
      host: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://app.posthog.com",
      flushAt: 1,
      flushInterval: 0,
    });
  }
  return _client;
}

/** Fire a server-side analytics event (from API routes and webhooks). */
export function trackServer<T extends EventName>(
  distinctId: string,
  event: T,
  props: EventProps<T>,
): void {
  const ph = getClient();
  if (!ph) return;
  ph.capture({ distinctId, event, properties: props as Record<string, unknown> });
}
