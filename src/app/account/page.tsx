import SiteShell from "@/components/SiteShell";

export default function AccountPage() {
  return (
    <SiteShell>
      <section className="space-y-6">
        <div>
          <p className="chip">Member profile</p>
          <h1 className="section-title font-display">Account</h1>
          <p className="mt-3 text-[color:var(--ink-soft)]">
            Manage your concierge preferences, delivery settings, and curated
            drops.
          </p>
        </div>
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="card space-y-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--ink-soft)]">
                Profile
              </p>
              <p className="mt-2 font-display text-2xl">Jordan Gray</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--ink-soft)]">
                  Email
                </p>
                <p className="mt-2">jordan@greyed.com</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--ink-soft)]">
                  Tier
                </p>
                <p className="mt-2">Signature</p>
              </div>
            </div>
            <button className="btn btn-outline w-full" type="button">
              Update profile
            </button>
          </div>
          <div className="space-y-4">
            <div className="card">
              <p className="font-semibold">Preference notes</p>
              <p className="mt-2 text-[color:var(--ink-soft)]">
                Warm, tobacco-forward profiles with mid strength. Avoid overly
                sweet finishes.
              </p>
            </div>
            <div className="card">
              <p className="font-semibold">Delivery</p>
              <p className="mt-2 text-[color:var(--ink-soft)]">
                Priority courier · Evening windows · Discreet packaging.
              </p>
            </div>
            <div className="card">
              <p className="font-semibold">Concierge</p>
              <p className="mt-2 text-[color:var(--ink-soft)]">
                Reach your specialist for private drops and bespoke curation.
              </p>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
