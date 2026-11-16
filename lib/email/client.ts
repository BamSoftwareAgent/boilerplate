import { Resend } from "resend";

if (!process.env.RESEND_API_KEY) {
  throw new Error("RESEND_API_KEY is not set");
}

export const resend = new Resend(process.env.RESEND_API_KEY);

// Default sender — update when your domain is verified in Resend.
// Until then, use onboarding@resend.dev for testing (only delivers to your own address).
export const FROM = process.env.EMAIL_FROM ?? "onboarding@resend.dev";
