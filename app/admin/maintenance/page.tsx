export default function MaintenancePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold">Maintenance Interface</h1>
      <p className="text-sm text-gray-500">
        Regular users should not be here. Admins use an internal API for
        emergency overrides.
      </p>
      <p className="text-xs text-gray-400">
        (For the CTF: the real action is at <code>/api/admin/maintenance</code>.)
      </p>
    </main>
  );
}