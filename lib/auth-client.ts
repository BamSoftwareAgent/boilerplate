"use client";
import { createAuthClient } from "better-auth/react";
import { magicLinkClient } from "better-auth/client/plugins";
import { publicEnv } from "./env";

export const authClient = createAuthClient({
  baseURL: publicEnv.appUrl,
  plugins: [magicLinkClient()],
});

export const { signIn, signOut, useSession } = authClient;
