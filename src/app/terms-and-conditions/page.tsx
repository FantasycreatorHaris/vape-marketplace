import SiteShell from "@/components/SiteShell";

export default function TermsAndConditionsPage() {
  return (
    <SiteShell>
      <section className="mx-auto max-w-3xl space-y-6">
        <div>
          <p className="chip">Legal</p>
          <h1 className="section-title font-display">Terms &amp; Conditions</h1>
          <p className="mt-3 text-[color:var(--ink-soft)]">
            By using this marketplace, you agree to these terms and conditions.
          </p>
        </div>

        <div className="card space-y-3">
          <p className="font-semibold">Use of Service</p>
          <p className="text-[color:var(--ink-soft)]">
            You must comply with applicable laws and regulations.
          </p>
          <p className="font-semibold">Orders</p>
          <p className="text-[color:var(--ink-soft)]">
            We may cancel orders if required by policy or legal restrictions.
          </p>
        </div>
      </section>
    </SiteShell>
  );
}
