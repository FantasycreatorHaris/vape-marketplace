"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import SiteShell from "@/components/SiteShell";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
    });

    if (!response.ok) {
      setError("Invalid admin password.");
      setLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <SiteShell>
      <section className="mx-auto max-w-lg space-y-6">
        <div>
          <p className="chip">Restricted access</p>
          <h1 className="section-title font-display">Admin Sign in</h1>
          <p className="mt-3 text-[color:var(--ink-soft)]">
            This area is restricted to authorized staff only.
          </p>
        </div>

        <form className="card space-y-4" onSubmit={handleSubmit}>
          <label className="text-sm">
            Admin password
            <input
              className="input mt-2"
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>

          {error ? <p className="text-sm text-red-700">{error}</p> : null}

          <button className="btn w-full" type="submit" disabled={loading}>
            {loading ? "Checking..." : "Sign in as admin"}
          </button>
        </form>
      </section>
    </SiteShell>
  );
}
