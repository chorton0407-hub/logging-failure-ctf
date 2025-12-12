import Script from "next/script";

export default function AdminPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-4 p-4">
      <h1 className="text-2xl font-bold">Admin Area</h1>
      <p className="text-red-500">Access denied. You are not an administrator.</p>
      <p className="text-sm text-gray-500 text-center max-w-md">
        Admins use specialized maintenance tools and emergency overrides.
        Only they know how to trigger them... or do they?
      </p>

      <Script src="/scripts/admin-hint.js" strategy="afterInteractive" />
    </main>
  );
}