"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import SiteShell from "@/components/SiteShell";
import {
  getCartProducts,
  readCart,
  type CartLine,
  writeCart,
} from "@/lib/cart";

type CheckoutForm = {
  fullName: string;
  email: string;
  phone: string;
  city: string;
  address: string;
  postalCode: string;
  cardName: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
  bankAccountTitle: string;
  iban: string;
};

export default function CartPage() {
  const [lines, setLines] = useState<CartLine[]>(() => {
    if (typeof window === "undefined") {
      return [];
    }
    return readCart();
  });
  const [paymentMethod, setPaymentMethod] = useState("Card");
  const [deliveryMethod, setDeliveryMethod] = useState("Standard");
  const [checkoutDone, setCheckoutDone] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [checkoutError, setCheckoutError] = useState("");
  const [orderId, setOrderId] = useState("");
  const [form, setForm] = useState<CheckoutForm>({
    fullName: "",
    email: "",
    phone: "",
    city: "",
    address: "",
    postalCode: "",
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    bankAccountTitle: "",
    iban: "",
  });

  const cartItems = useMemo(() => getCartProducts(lines), [lines]);

  const subtotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.lineTotal, 0),
    [cartItems],
  );

  const shipping = deliveryMethod === "Express" ? 18 : subtotal > 0 ? 10 : 0;
  const tax = subtotal * 0.05;
  const total = subtotal + shipping + tax;

  function updateQuantity(slug: string, quantity: number) {
    const next = lines
      .map((line) => (line.slug === slug ? { ...line, quantity } : line))
      .filter((line) => line.quantity > 0);
    setLines(next);
    writeCart(next);
  }

  function removeItem(slug: string) {
    const next = lines.filter((line) => line.slug !== slug);
    setLines(next);
    writeCart(next);
  }

  function clearCart() {
    setLines([]);
    writeCart([]);
  }

  function validateCheckout(): string | null {
    if (!form.fullName.trim()) {
      return "Full name is required.";
    }
    if (!form.email.trim() || !form.email.includes("@")) {
      return "Enter a valid email address.";
    }
    if (!form.phone.trim() || form.phone.replace(/\D/g, "").length < 10) {
      return "Enter a valid phone number.";
    }
    if (!form.city.trim() || !form.address.trim() || !form.postalCode.trim()) {
      return "Complete your shipping address details.";
    }

    if (paymentMethod === "Card") {
      if (!form.cardName.trim()) {
        return "Cardholder name is required.";
      }
      if (form.cardNumber.replace(/\s/g, "").length < 16) {
        return "Card number must be 16 digits.";
      }
      if (!/^\d{2}\/\d{2}$/.test(form.expiry)) {
        return "Expiry should be in MM/YY format.";
      }
      if (!/^\d{3,4}$/.test(form.cvv)) {
        return "CVV must be 3 or 4 digits.";
      }
    }

    if (paymentMethod === "Bank Transfer") {
      if (!form.bankAccountTitle.trim() || !form.iban.trim()) {
        return "Provide account title and IBAN for bank transfer.";
      }
    }

    return null;
  }

  async function handleCheckout() {
    setCheckoutError("");
    const validationMessage = validateCheckout();

    if (validationMessage) {
      setCheckoutError(validationMessage);
      return;
    }

    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 1400));
    setIsProcessing(false);
    setCheckoutDone(true);
    setOrderId(`GRY-${Date.now().toString().slice(-6)}`);
    clearCart();
  }

  function updateForm<K extends keyof CheckoutForm>(key: K, value: CheckoutForm[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <SiteShell>
      <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <div>
            <p className="chip">Your cart</p>
            <h1 className="section-title font-display">Private selection</h1>
          </div>

          {checkoutDone ? (
            <div className="card">
              <p className="font-display text-2xl">Order placed</p>
              <p className="mt-2 text-[color:var(--ink-soft)]">
                Your payment has been authorized and your order is confirmed.
              </p>
              <p className="mt-2 text-sm text-[color:var(--ink-soft)]">
                Order ID: {orderId}. A concierge specialist will contact you
                shortly with shipment and invoice details.
              </p>
            </div>
          ) : null}

          {cartItems.length === 0 ? (
            <div className="card">
              <p className="font-semibold">Your cart is empty</p>
              <p className="mt-2 text-[color:var(--ink-soft)]">
                Explore the catalog and add items to start your checkout.
              </p>
            </div>
          ) : null}

          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.slug} className="card">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div className="flex items-center gap-4">
                    <div className="overflow-hidden rounded-xl border border-[color:var(--line)] bg-[#fffdf9] p-2">
                      <Image
                        src={item.image}
                        alt={item.imageAlt}
                        width={112}
                        height={112}
                        className="h-20 w-20 object-contain"
                      />
                    </div>
                    <p className="text-sm text-[color:var(--ink-soft)]">
                      {item.category}
                    </p>
                    <div>
                      <p className="font-display text-xl">{item.name}</p>
                      <p className="mt-1 text-sm text-[color:var(--ink-soft)]">
                        {item.size} · {item.strength}
                      </p>
                      <p className="mt-1 text-sm text-[color:var(--ink-soft)]">
                        Unit: ${item.unitPrice.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 md:flex-col md:items-end">
                    <select
                      value={item.quantity}
                      onChange={(event) =>
                        updateQuantity(item.slug, Number(event.target.value))
                      }
                      className="rounded-xl border border-[color:var(--line)] bg-transparent px-3 py-2 text-sm"
                    >
                      {[1, 2, 3, 4, 5].map((qty) => (
                        <option key={qty} value={qty}>
                          Qty {qty}
                        </option>
                      ))}
                    </select>
                    <p className="text-lg font-semibold">
                      ${item.lineTotal.toFixed(2)}
                    </p>
                    <button
                      className="text-xs uppercase tracking-[0.2em] text-[color:var(--ink-soft)]"
                      type="button"
                      onClick={() => removeItem(item.slug)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            <Link className="btn btn-outline" href="/catalog">
              Continue browsing
            </Link>
            {cartItems.length > 0 ? (
              <button className="btn btn-outline" type="button" onClick={clearCart}>
                Clear cart
              </button>
            ) : null}
          </div>
        </div>

        <aside className="space-y-6">
          <div className="card">
            <h2 className="font-display text-2xl">Summary</h2>
            <div className="mt-4 space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Tax (5%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between font-semibold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--ink-soft)]">
                Customer details
              </p>
              <input
                value={form.fullName}
                onChange={(event) => updateForm("fullName", event.target.value)}
                className="w-full rounded-xl border border-[color:var(--line)] bg-transparent px-3 py-2 text-sm"
                placeholder="Full name"
              />
              <input
                type="email"
                value={form.email}
                onChange={(event) => updateForm("email", event.target.value)}
                className="w-full rounded-xl border border-[color:var(--line)] bg-transparent px-3 py-2 text-sm"
                placeholder="Email address"
              />
              <input
                value={form.phone}
                onChange={(event) => updateForm("phone", event.target.value)}
                className="w-full rounded-xl border border-[color:var(--line)] bg-transparent px-3 py-2 text-sm"
                placeholder="Phone number"
              />

              <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--ink-soft)]">
                Shipping address
              </p>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                <input
                  value={form.city}
                  onChange={(event) => updateForm("city", event.target.value)}
                  className="w-full rounded-xl border border-[color:var(--line)] bg-transparent px-3 py-2 text-sm"
                  placeholder="City"
                />
                <input
                  value={form.postalCode}
                  onChange={(event) => updateForm("postalCode", event.target.value)}
                  className="w-full rounded-xl border border-[color:var(--line)] bg-transparent px-3 py-2 text-sm"
                  placeholder="Postal code"
                />
              </div>
              <input
                value={form.address}
                onChange={(event) => updateForm("address", event.target.value)}
                className="w-full rounded-xl border border-[color:var(--line)] bg-transparent px-3 py-2 text-sm"
                placeholder="Full address"
              />

              <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--ink-soft)]">
                Payment
              </p>
              <div className="flex flex-wrap gap-2">
                {["Card", "Cash on Delivery", "Bank Transfer"].map((method) => (
                  <button
                    key={method}
                    type="button"
                    onClick={() => setPaymentMethod(method)}
                    className={`rounded-full border px-3 py-1 text-sm ${
                      paymentMethod === method
                        ? "border-[color:var(--ink)]"
                        : "border-[color:var(--line)]"
                    }`}
                  >
                    {method}
                  </button>
                ))}
              </div>

              {paymentMethod === "Card" ? (
                <div className="space-y-2">
                  <input
                    value={form.cardName}
                    onChange={(event) => updateForm("cardName", event.target.value)}
                    className="w-full rounded-xl border border-[color:var(--line)] bg-transparent px-3 py-2 text-sm"
                    placeholder="Cardholder name"
                  />
                  <input
                    value={form.cardNumber}
                    onChange={(event) => updateForm("cardNumber", event.target.value)}
                    className="w-full rounded-xl border border-[color:var(--line)] bg-transparent px-3 py-2 text-sm"
                    placeholder="Card number"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      value={form.expiry}
                      onChange={(event) => updateForm("expiry", event.target.value)}
                      className="w-full rounded-xl border border-[color:var(--line)] bg-transparent px-3 py-2 text-sm"
                      placeholder="MM/YY"
                    />
                    <input
                      value={form.cvv}
                      onChange={(event) => updateForm("cvv", event.target.value)}
                      className="w-full rounded-xl border border-[color:var(--line)] bg-transparent px-3 py-2 text-sm"
                      placeholder="CVV"
                    />
                  </div>
                </div>
              ) : null}

              {paymentMethod === "Bank Transfer" ? (
                <div className="space-y-2">
                  <input
                    value={form.bankAccountTitle}
                    onChange={(event) =>
                      updateForm("bankAccountTitle", event.target.value)
                    }
                    className="w-full rounded-xl border border-[color:var(--line)] bg-transparent px-3 py-2 text-sm"
                    placeholder="Account title"
                  />
                  <input
                    value={form.iban}
                    onChange={(event) => updateForm("iban", event.target.value)}
                    className="w-full rounded-xl border border-[color:var(--line)] bg-transparent px-3 py-2 text-sm"
                    placeholder="IBAN"
                  />
                </div>
              ) : null}

              {paymentMethod === "Cash on Delivery" ? (
                <p className="text-sm text-[color:var(--ink-soft)]">
                  Cash on Delivery selected. Please keep exact amount ready for
                  secure handover.
                </p>
              ) : null}

              <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--ink-soft)]">
                Delivery
              </p>
              <select
                value={deliveryMethod}
                onChange={(event) => setDeliveryMethod(event.target.value)}
                className="w-full rounded-xl border border-[color:var(--line)] bg-transparent px-3 py-2 text-sm"
              >
                <option value="Standard">Standard (2-4 days)</option>
                <option value="Express">Express (24-48h)</option>
              </select>

              {checkoutError ? (
                <p className="text-sm text-red-700">{checkoutError}</p>
              ) : null}

              <button
                className="btn w-full"
                type="button"
                disabled={cartItems.length === 0 || isProcessing}
                onClick={handleCheckout}
              >
                {cartItems.length === 0
                  ? "Add products first"
                  : isProcessing
                    ? "Processing payment..."
                    : "Pay and place order"}
              </button>
            </div>
          </div>
          <div className="card text-sm">
            <p className="font-semibold">Member note</p>
            <p className="mt-2 text-[color:var(--ink-soft)]">
              This is a simulated secure checkout for demo use. Add your details
              and payment method to complete the order flow.
            </p>
          </div>
        </aside>
      </section>
    </SiteShell>
  );
}
