import * as Sentry from "@sentry/nextjs";
import { OTLPLogExporter } from "@opentelemetry/exporter-logs-otlp-http";
import { resourceFromAttributes } from "@opentelemetry/resources";
import { BatchLogRecordProcessor, LoggerProvider } from "@opentelemetry/sdk-logs";

const posthogToken = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST;

if (process.env.NODE_ENV !== "production") {
  if (!posthogToken) {
    console.warn(
      "NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN variable required by PostHog is missing or un-configured, this causes events to be silently missed. This error stops appearing once NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN is configured",
    );
  }

  if (!posthogHost) {
    console.warn(
      "NEXT_PUBLIC_POSTHOG_HOST variable required by PostHog is missing or un-configured, this causes events to be silently missed. This error stops appearing once NEXT_PUBLIC_POSTHOG_HOST is configured",
    );
  }
}

export const posthogLoggerProvider =
  posthogToken && posthogHost
    ? new LoggerProvider({
        resource: resourceFromAttributes({
          "service.name": "boilerplate-nextjs",
          "deployment.environment": process.env.NODE_ENV ?? "development",
        }),
        processors: [
          new BatchLogRecordProcessor({
            exporter: new OTLPLogExporter({
              url: `${posthogHost.replace(/\/$/, "")}/i/v1/logs`,
              timeoutMillis: 2000,
              headers: {
                Authorization: `Bearer ${posthogToken}`,
                "Content-Type": "application/json",
              },
            }),
          }),
        ],
      })
    : null;

// This logger is intentionally separate from the app's existing logging outputs.
export const posthogLog = posthogLoggerProvider?.getLogger("posthog-exporter");

export async function flushPosthogLogs() {
  if (!posthogLoggerProvider) return;
  await posthogLoggerProvider.forceFlush().catch(() => {});
}

export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    await import("./sentry.server.config");
  }

  if (process.env.NEXT_RUNTIME === "edge") {
    await import("./sentry.edge.config");
  if (process.env.NEXT_RUNTIME !== "nodejs") return;

  if (process.env.NODE_ENV === "production") {
    // In production, missing env vars must fail fast at boot.
    await import("./lib/env.server");
  } else {
    // In development, warn so the server still starts without a .env.local.
    try {
      await import("./lib/env.server");
    } catch (err) {
      console.warn(
        "\n⚠  Missing environment variables — copy .env.example to .env.local and fill in your values.\n",
        err instanceof Error ? err.message : err,
        "\n",
      );
    }
  }
}

export const onRequestError = Sentry.captureRequestError;
