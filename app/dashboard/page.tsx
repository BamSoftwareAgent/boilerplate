import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <p className="mt-2 text-gray-600">
        Signed in as <strong>{session.user.email}</strong>
      </p>
      <p className="mt-1 text-sm text-gray-500">
        Subscription status:{" "}
        <span className="font-mono">{(session.user as any).subscriptionStatus ?? "none"}</span>
      </p>
    </main>
  );
}
