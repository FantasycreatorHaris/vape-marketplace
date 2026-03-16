import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/catalog";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="card flex h-full flex-col gap-5">
      <div className="overflow-hidden rounded-2xl">
        <Image
          src={product.image}
          alt={product.imageAlt}
          width={640}
          height={420}
          className="h-44 w-full object-cover"
        />
      </div>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="chip">{product.category}</p>
          <h3 className="mt-3 font-display text-xl">{product.name}</h3>
          <p className="mt-2 text-sm text-[color:var(--ink-soft)]">
            {product.description}
          </p>
        </div>
        {product.badge ? (
          <span className="chip">{product.badge}</span>
        ) : null}
      </div>
      <div className="flex items-center justify-between">
        <p className="text-lg font-semibold">{product.price}</p>
        <Link className="btn btn-outline" href={`/product/${product.slug}`}>
          View
        </Link>
      </div>
    </article>
  );
}
