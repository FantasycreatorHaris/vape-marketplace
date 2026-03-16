import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteShell from "@/components/SiteShell";
import { catalog, getProduct } from "@/lib/catalog";

type ProductPageProps = {
  params: { slug: string };
};

export default function ProductPage({ params }: ProductPageProps) {
  const { slug } = params;
  const product = getProduct(slug);

  if (!product) {
    notFound();
  }

  return (
    <SiteShell>
      <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="card">
          <div className="flex items-center justify-between">
            <p className="chip">{product.category}</p>
            {product.badge ? <span className="chip">{product.badge}</span> : null}
          </div>
          <div className="mt-6 overflow-hidden rounded-2xl">
            <Image
              src={product.image}
              alt={product.imageAlt}
              width={960}
              height={600}
              className="h-64 w-full object-cover"
            />
          </div>
          <h1 className="mt-6 font-display text-4xl">{product.name}</h1>
          <p className="mt-4 text-[color:var(--ink-soft)]">
            {product.description}
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
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
              <p className="mt-2 text-sm text-[color:var(--ink-soft)]">
                {product.notes.join(", ")}
              </p>
            </div>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="card">
            <p className="text-sm text-[color:var(--ink-soft)]">Price</p>
            <p className="mt-2 text-3xl font-semibold">{product.price}</p>
            <button className="btn mt-6 w-full" type="button">
              Add to cart
            </button>
            <button className="btn btn-outline mt-3 w-full" type="button">
              Request concierge
            </button>
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
              {catalog.slice(0, 3).map((item) => (
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
