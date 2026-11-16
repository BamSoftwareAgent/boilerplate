import * as Sentry from "@sentry/nextjs";

export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    await import("./sentry.server.config");

    if (process.env.NODE_ENV === "production") {
      await import("./lib/env.server");
    } else {
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

  if (process.env.NEXT_RUNTIME === "edge") {
    await import("./sentry.edge.config");
  }
}

export const onRequestError = Sentry.captureRequestError;
