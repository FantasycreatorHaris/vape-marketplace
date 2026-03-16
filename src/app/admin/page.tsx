import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import SiteShell from "@/components/SiteShell";

export default async function AdminPage() {
  const cookieStore = await cookies();
  const adminSession = cookieStore.get("admin_session")?.value;

  if (adminSession !== "active") {
    redirect("/admin/login");
  }

  return (
    <SiteShell>
      <section className="space-y-6">
        <div>
          <p className="chip">Admin studio</p>
          <h1 className="section-title font-display">Dashboard</h1>
          <p className="mt-3 text-[color:var(--ink-soft)]">
            Track member activity, release performance, and concierge requests.
          </p>
          <div className="mt-4">
            <Link className="btn btn-outline" href="/api/admin/logout">
              Sign out admin
            </Link>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { label: "Active members", value: "2,140" },
            { label: "Requests today", value: "46" },
            { label: "Priority releases", value: "08" },
          ].map((item) => (
            <div key={item.label} className="card">
              <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--ink-soft)]">
                {item.label}
              </p>
              <p className="mt-3 font-display text-3xl">{item.value}</p>
            </div>
          ))}
        </div>
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="card space-y-4">
            <p className="font-semibold">Latest requests</p>
            {[
              "Signature kit reservation · Obsidian Reserve",
              "Concierge follow-up · Cinder Classic",
              "New member onboarding · Private Lounge",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center justify-between border-b border-[color:var(--line)] pb-3 text-sm"
              >
                <span>{item}</span>
                <span className="text-[color:var(--ink-soft)]">Review</span>
              </div>
            ))}
          </div>
          <div className="card">
            <p className="font-semibold">Operations</p>
            <ul className="mt-4 space-y-3 text-sm text-[color:var(--ink-soft)]">
              <li>Inventory refresh scheduled for Friday.</li>
              <li>Premium delivery window updated to 24-48 hours.</li>
              <li>Awaiting approval on two new artisan launches.</li>
            </ul>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
