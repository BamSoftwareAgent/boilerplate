export const metadata = { title: "Terms of Service" };

export default function TermsPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-16 prose">
      <h1>Terms of Service</h1>
      <p className="text-gray-500 text-sm">Last updated: {new Date().getFullYear()}</p>
      <p>
        Replace this page with your actual terms of service before launch.
        Have a lawyer review it once; then each product just fills in its name and details.
      </p>
    </main>
  );
}
