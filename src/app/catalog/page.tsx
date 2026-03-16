import ProductCard from "@/components/ProductCard";
import SiteShell from "@/components/SiteShell";
import { catalog } from "@/lib/catalog";

export default function CatalogPage() {
  return (
    <SiteShell>
      <section className="space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="chip">Marketplace</p>
            <h1 className="section-title font-display">Catalog</h1>
            <p className="mt-3 text-[color:var(--ink-soft)]">
              Explore limited releases, signature collections, and curated
              essentials.
            </p>
          </div>
          <div className="card text-sm">
            <p className="font-semibold">Filters</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {[
                "All",
                "Limited",
                "Cigarettes",
                "Vapes",
                "Signature",
              ].map((item) => (
                <span key={item} className="chip">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {catalog.map((item) => (
            <ProductCard key={item.slug} product={item} />
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
