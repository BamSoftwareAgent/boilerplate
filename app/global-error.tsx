"use client";

import * as Sentry from "@sentry/nextjs";
import NextError from "next/error";
import { useEffect } from "react";
import NextError from "next/error";
import posthog from "posthog-js";
import { useEffect } from "react";
import { publicEnv } from "@/lib/env.public";

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html>
  reset: () => void;
}) {
  useEffect(() => {
    if (publicEnv.posthogKey && publicEnv.posthogHost) {
      posthog.captureException(error);
    }
  }, [error]);

  return (
    <html lang="en">
      <body>
        <NextError statusCode={0} />
      </body>
    </html>
  );
}
