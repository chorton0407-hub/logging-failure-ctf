export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-bold">CTF: Logging & Alerting Failure</h1>
      <p className="max-w-xl text-center text-gray-600">
        Your goal is to gain unauthorized access to a hidden maintenance interface
        and retrieve the flag. The system relies heavily on logs but has no
        real-time alerting or monitoring in place.
      </p>
      <p className="text-sm text-gray-500">
        Hints: Admins sometimes use &ldquo;emergency override&rdquo; tools during
        maintenance. Developers left some legacy code around.
      </p>
      <a
        href="/login"
        className="mt-4 border px-4 py-2 rounded font-semibold hover:bg-gray-100"
      >
        Go to Admin Login
      </a>
    </main>
  );
}