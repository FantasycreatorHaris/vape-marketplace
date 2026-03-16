import Link from "next/link";
import SiteShell from "@/components/SiteShell";

export default function SignUpPage() {
  return (
    <SiteShell>
      <section className="mx-auto max-w-lg space-y-6">
        <div>
          <p className="chip">Invitation</p>
          <h1 className="section-title font-display">Request membership</h1>
          <p className="mt-3 text-[color:var(--ink-soft)]">
            GREYED is curated for premium audiences. Share your details and we
            will follow up with access options.
          </p>
        </div>
        <form className="card space-y-4">
          <label className="text-sm">
            Full name
            <input className="input mt-2" placeholder="Alex Grey" />
          </label>
          <label className="text-sm">
            Email
            <input className="input mt-2" placeholder="you@greyed.com" />
          </label>
          <label className="text-sm">
            Phone
            <input className="input mt-2" placeholder="(000) 000-0000" />
          </label>
          <label className="text-sm">
            Notes
            <textarea
              className="input mt-2 min-h-[120px]"
              placeholder="Tell us about your preferences."
            />
          </label>
          <button className="btn w-full" type="submit">
            Submit request
          </button>
          <div className="text-xs text-[color:var(--ink-soft)]">
            Already a member?{" "}
            <Link className="underline" href="/auth/sign-in">
              Sign in
            </Link>
          </div>
        </form>
      </section>
    </SiteShell>
  );
}
