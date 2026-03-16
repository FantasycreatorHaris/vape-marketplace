import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import AddToCartButton from "@/components/AddToCartButton";
import SiteShell from "@/components/SiteShell";
import { catalog, getProduct } from "@/lib/catalog";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return catalog.map((item) => ({ slug: item.slug }));
}

export default async function ProductPage({ params }: ProductPageProps) {
  const resolvedParams = await params;
  const product = getProduct(resolvedParams.slug);

  if (!product) {
    notFound();
  }

  const related = catalog
    .filter((item) => item.slug !== product.slug)
    .slice(0, 3);

  return (
    <SiteShell>
      <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <div className="card">
            <div className="flex items-center justify-between">
              <p className="chip">{product.category}</p>
              {product.badge ? <span className="chip">{product.badge}</span> : null}
            </div>
            <div className="mt-6 overflow-hidden rounded-2xl border border-[color:var(--line)] bg-[#fffdf9] p-4">
              <Image
                src={product.image}
                alt={product.imageAlt}
                width={1200}
                height={900}
                priority
                className="h-[420px] w-full object-contain"
              />
            </div>
            <h1 className="mt-6 font-display text-4xl">{product.name}</h1>
            <p className="mt-4 text-[color:var(--ink-soft)]">
              {product.description}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="card">
              <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--ink-soft)]">
                Strength
              </p>
              <p className="mt-2 text-lg font-semibold">{product.strength}</p>
            </div>
            <div className="card">
              <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--ink-soft)]">
                Size
              </p>
              <p className="mt-2 text-lg font-semibold">{product.size}</p>
            </div>
            <div className="card">
              <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--ink-soft)]">
                Finish
              </p>
              <p className="mt-2 text-lg font-semibold">{product.finish}</p>
            </div>
            <div className="card">
              <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--ink-soft)]">
                Notes
              </p>
              <ul className="mt-2 space-y-1 text-sm text-[color:var(--ink-soft)]">
                {product.notes.map((note) => (
                  <li key={note}>- {note}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <p className="chip">Care details</p>
            <span className="text-xs uppercase tracking-[0.2em] text-[color:var(--ink-soft)]">
              Member guide
            </span>
          </div>
          <div className="card space-y-3 text-sm text-[color:var(--ink-soft)]">
            <p>
              Store upright in a cool area and avoid direct sunlight to preserve
              flavor profile.
            </p>
            <p>
              Best enjoyed within 30 days after opening for consistent notes and
              finish quality.
            </p>
            <p>
              Signature packaging includes product card, origin notes, and
              private care instructions.
            </p>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="card">
            <p className="text-sm text-[color:var(--ink-soft)]">Price</p>
            <p className="mt-2 text-3xl font-semibold">{product.price}</p>
            <div className="mt-6">
              <AddToCartButton slug={product.slug} />
            </div>
          </div>
          <div className="card">
            <p className="text-sm text-[color:var(--ink-soft)]">Shipping</p>
            <p className="mt-2">
              Delivered within 48 hours for members in priority regions.
            </p>
          </div>
          <div className="card">
            <p className="text-sm text-[color:var(--ink-soft)]">Related</p>
            <div className="mt-4 space-y-3">
              {related.map((item) => (
                <Link
                  key={item.slug}
                  className="flex items-center justify-between text-sm"
                  href={`/product/${item.slug}`}
                >
                  <span>{item.name}</span>
                  <span className="text-[color:var(--ink-soft)]">
                    {item.price}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </section>
    </SiteShell>
  );
}
