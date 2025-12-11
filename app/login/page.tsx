"use client";

import { useState } from "react";

export default function LoginPage() {
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const res = await fetch("/api/login", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    setMessage(data.message);
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold">Admin Login</h1>
      <p className="text-sm text-gray-500">
        Only authorized admins may log in.
      </p>

      <form className="flex flex-col gap-2 w-64" onSubmit={handleSubmit}>
        <input
          name="username"
          placeholder="Username"
          className="border p-2 rounded"
          required
        />
        <input
          name="password"
          placeholder="Password"
          type="password"
          className="border p-2 rounded"
          required
        />
        <button
          type="submit"
          className="border p-2 rounded font-semibold hover:bg-gray-100"
        >
          Log In
        </button>
      </form>

      {message && (
        <p className="text-sm text-red-500 mt-2">
          {message}
        </p>
      )}
    </main>
  );
}