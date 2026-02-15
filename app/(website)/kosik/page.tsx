"use client";

import { Checkout4 } from "@/components/checkout/checkout4";
import { Spinner } from "@/components/ui/spinner";
import { useCart } from "@/hooks/useCart";

export default function CartPage() {
  const { items, removeItem, updateQuantity, isReady } = useCart();

  if (!isReady) {
    return <Spinner />;
  }

  console.log("items", items);

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
