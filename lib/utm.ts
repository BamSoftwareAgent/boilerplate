"use client";

export type UtmParams = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
};

const UTM_KEYS: (keyof UtmParams)[] = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
];
const COOKIE_NAME = "utm";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

/** Read UTM params from the URL and persist them in a first-party cookie. */
export function captureUtm(): void {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(window.location.search);
  const utm: UtmParams = {};
  for (const key of UTM_KEYS) {
    const v = params.get(key);
    if (v) utm[key] = v;
  }
  if (Object.keys(utm).length > 0) {
    document.cookie = `${COOKIE_NAME}=${encodeURIComponent(
      JSON.stringify(utm),
    )}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
  }
}

/** Returns the last captured UTM params from the cookie, or {}. */
export function getUtm(): UtmParams {
  if (typeof document === "undefined") return {};
  const match = document.cookie
    .split("; ")
    .find((c) => c.startsWith(`${COOKIE_NAME}=`));
  if (!match) return {};
  try {
    return JSON.parse(decodeURIComponent(match.split("=").slice(1).join("=")));
  } catch {
    return {};
  }
}
