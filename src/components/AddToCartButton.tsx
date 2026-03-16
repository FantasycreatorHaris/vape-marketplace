"use client";

import { useState } from "react";
import Link from "next/link";
import { addToCart } from "@/lib/cart";

type AddToCartButtonProps = {
  slug: string;
};

export default function AddToCartButton({ slug }: AddToCartButtonProps) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  function handleAddToCart() {
    addToCart(slug, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <label htmlFor="quantity" className="text-sm text-[color:var(--ink-soft)]">
          Quantity
        </label>
        <select
          id="quantity"
          value={quantity}
          onChange={(event) => setQuantity(Number(event.target.value))}
          className="rounded-xl border border-[color:var(--line)] bg-transparent px-3 py-2 text-sm"
        >
          {[1, 2, 3, 4, 5].map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </div>

      <button className="btn w-full" type="button" onClick={handleAddToCart}>
        Add to cart
      </button>

      <Link className="btn btn-outline w-full" href="/cart">
        Go to cart
      </Link>

      {added ? (
        <p className="text-sm text-[color:var(--ink-soft)]">Added to cart.</p>
      ) : null}
    </div>
  );
}
