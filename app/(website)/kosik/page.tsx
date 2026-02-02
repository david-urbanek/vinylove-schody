"use client";

import { Checkout4 } from "@/components/checkout4";
import { useCart } from "@/hooks/useCart";

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
