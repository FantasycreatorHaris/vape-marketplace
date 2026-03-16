import SiteShell from "@/components/SiteShell";

export default function ReturnPolicyPage() {
  return (
    <SiteShell>
      <section className="mx-auto max-w-3xl space-y-6">
        <div>
          <p className="chip">Customer care</p>
          <h1 className="section-title font-display">Return Policy</h1>
          <p className="mt-3 text-[color:var(--ink-soft)]">
            Return requests are reviewed case-by-case within the applicable return window.
          </p>
        </div>

        <div className="card space-y-3">
          <p className="font-semibold">Eligibility</p>
          <p className="text-[color:var(--ink-soft)]">
            Items should be unused and in original condition.
          </p>
          <p className="font-semibold">How to Request</p>
          <p className="text-[color:var(--ink-soft)]">
            Contact support with your order ID and return reason.
          </p>
        </div>
      </section>
    </SiteShell>
  );
}
