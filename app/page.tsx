import { redirect } from "next/navigation";

// Root redirects to the landing page.
// The landing page lives at /home in validation mode so it can be replaced
// with the launch-mode version without touching this redirect.
export default function RootPage() {
  redirect("/home");
}
