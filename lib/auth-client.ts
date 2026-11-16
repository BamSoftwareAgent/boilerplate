"use client";
import { useEffect, useRef } from "react";
import { createAuthClient } from "better-auth/react";
import { magicLinkClient } from "better-auth/client/plugins";
import posthog from "posthog-js";
import { publicEnv } from "./env.public";

export const authClient = createAuthClient({
  baseURL: publicEnv.appUrl,
  plugins: [magicLinkClient()],
});

export const { signIn, signOut, useSession } = authClient;

export function PostHogIdentify() {
  const { data: session, isPending } = useSession();
  const identifiedUserId = useRef<string | null>(null);

  useEffect(() => {
    if (isPending || !publicEnv.posthogKey || !publicEnv.posthogHost) return;

    const user = session?.user;
    if (user) {
      if (identifiedUserId.current === user.id) return;

      if (identifiedUserId.current) posthog.reset();

      posthog.identify(user.id, {
        email: user.email,
        name: user.name ?? undefined,
      });
      identifiedUserId.current = user.id;
      return;
    }

    if (identifiedUserId.current) {
      posthog.reset();
      identifiedUserId.current = null;
    }
  }, [isPending, session?.user]);

  return null;
}
