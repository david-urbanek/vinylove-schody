"use client";

import { Checkout4 } from "@/components/checkout/checkout4";
import { useCart } from "@/hooks/useCart";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kosik",
  description: "Kosik s vašemi produkty",
  alternates: {
    canonical: `/kosik`,
  },
};

export default function CartPage() {
  const { items, removeItem, updateQuantity, isReady } = useCart();

  if (!isReady) {
    return null; // Or a loading spinner
  }

  return (
    <div className="container mx-auto py-8">
      <Checkout4
        cartItems={items}
        onRemoveItem={removeItem}
        onUpdateQuantity={updateQuantity}
      />
    </div>
  );
}
