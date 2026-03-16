import Link from "next/link";
import SiteShell from "@/components/SiteShell";

export default function SignInPage() {
  return (
    <SiteShell>
      <section className="mx-auto max-w-lg space-y-6">
        <div>
          <p className="chip">Member access</p>
          <h1 className="section-title font-display">Sign in</h1>
          <p className="mt-3 text-[color:var(--ink-soft)]">
            Access your private releases, concierge settings, and saved
            preferences.
          </p>
        </div>
        <form className="card space-y-4">
          <label className="text-sm">
            Email
            <input className="input mt-2" placeholder="you@greyed.com" />
          </label>
          <label className="text-sm">
            Password
            <input
              className="input mt-2"
              type="password"
              placeholder="••••••••"
            />
          </label>
          <button className="btn w-full" type="submit">
            Sign in
          </button>
          <div className="flex items-center justify-between text-xs text-[color:var(--ink-soft)]">
            <span>Need access?</span>
            <Link className="underline" href="/auth/sign-up">
              Request membership
            </Link>
          </div>
        </form>
      </section>
    </SiteShell>
  );
}
