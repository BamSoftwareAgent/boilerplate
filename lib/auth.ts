import { betterAuth } from "better-auth";
import { magicLink } from "better-auth/plugins";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { render } from "@react-email/render";
import { db } from "./db/client";
import * as schema from "./db/schema";
import { resend, FROM } from "./email/client";
import { MagicLinkEmail } from "./email/templates/magic-link";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user: schema.users,
      session: schema.sessions,
      account: schema.accounts,
      verification: schema.verifications,
    },
  }),
  baseURL: process.env.BETTER_AUTH_URL,
  secret: process.env.BETTER_AUTH_SECRET,
  emailAndPassword: { enabled: false },
  plugins: [
    magicLink({
      sendMagicLink: async ({ email, url }) => {
        const html = await render(MagicLinkEmail({ url }));
        const { error } = await resend.emails.send({
          from: FROM,
          to: email,
          subject: `Your sign-in link`,
          html,
        });
        if (error) throw new Error(`Resend error: ${error.message}`);
      },
    }),
  ],
  socialProviders: {
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
      ? {
          google: {
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          },
        }
      : {}),
  },
});

export type Session = typeof auth.$Infer.Session;
