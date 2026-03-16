import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import SiteShell from "@/components/SiteShell";
import { catalog } from "@/lib/catalog";

export default function Home() {
  return (
    <SiteShell>
      <section className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <p className="chip">Premium marketplace</p>
          <h1 className="font-display text-4xl leading-tight md:text-5xl">
            A curated showcase for refined vape and cigarette collections.
          </h1>
          <p className="text-lg text-[color:var(--ink-soft)]">
            GREYED is a private marketplace engineered for premium audiences,
            featuring limited releases, concierge fulfillment, and elegant
            product storytelling.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link className="btn" href="/catalog">
              Explore catalog
            </Link>
            <Link className="btn btn-outline" href="/auth/sign-up">
              Request membership
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              "Members-only drops",
              "Private curation",
              "Express concierge",
            ].map((item) => (
              <div key={item} className="card text-sm">
                <p className="font-semibold">{item}</p>
                <p className="mt-2 text-[color:var(--ink-soft)]">
                  Designed for a quiet, premium ritual.
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="card relative overflow-hidden fade-up">
          <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-[color:var(--glow)] blur-3xl" />
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <p className="chip">Featured drop</p>
              <p className="text-sm text-[color:var(--ink-soft)]">
                New arrivals weekly
              </p>
            </div>
            <h2 className="font-display text-3xl">Nightfall Velvet</h2>
            <p className="text-[color:var(--ink-soft)]">
              Velvet texture, deep notes, and an elegant finish crafted for
              evening lounges.
            </p>
            <div className="flex items-center justify-between">
              <p className="text-xl font-semibold">$70</p>
              <Link className="btn" href="/product/nightfall-velvet">
                View release
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-16 space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="chip">Curated selection</p>
            <h2 className="section-title font-display">
              Best of GREYED this season.
            </h2>
          </div>
          <Link className="btn btn-outline" href="/catalog">
            View full catalog
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {catalog.slice(0, 3).map((item) => (
            <ProductCard key={item.slug} product={item} />
          ))}
        </div>
      </section>

      <section className="mt-16 grid gap-6 lg:grid-cols-[1fr_1fr]">
        <div className="card floaty">
          <h3 className="font-display text-2xl">Concierge access</h3>
          <p className="mt-3 text-[color:var(--ink-soft)]">
            Private consultations, seasonal curation, and tailored deliveries
            for discerning members.
          </p>
          <Link className="btn btn-outline mt-6" href="/account">
            Manage membership
          </Link>
        </div>
        <div className="card">
          <h3 className="font-display text-2xl">Signature packaging</h3>
          <p className="mt-3 text-[color:var(--ink-soft)]">
            Each release arrives in a bespoke kit with detailed flavor and
            ritual notes.
          </p>
          <Link className="btn btn-outline mt-6" href="/catalog">
            Discover rituals
          </Link>
        </div>
      </section>
    </SiteShell>
  );
}
