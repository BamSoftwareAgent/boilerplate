export const metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-16 prose">
      <h1>Privacy Policy</h1>
      <p className="text-gray-500 text-sm">Last updated: {new Date().getFullYear()}</p>
      <p>
        Replace this page with your actual privacy policy before launch.
        Have a lawyer review it once; then each product just fills in its name and details.
      </p>
    </main>
  );
}
