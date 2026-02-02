"use client";

import { Checkout4 } from "@/components/checkout4";
import { useCart } from "@/hooks/useCart";

export default function CartPage() {
  const { items, removeItem, updateQuantity, isReady } = useCart();

  if (!isReady) {
    return null; // Or a loading spinner
  }

  // Map items to Checkout4 format
  const cartItems = items.map((item) => ({
    product_id: item.link, // using link as ID is consistent with store
    link: item.link,
    name: item.name,
    image: item.image.src,
    price: {
      regular: item.price.regular,
      currency: "CZK", // Force CZK as it is hardcoded in store for now
    },
    quantity: item.quantity,
    details: [], // Attributes not yet supported in store
  }));

  return (
    <div className="container mx-auto py-8">
      <Checkout4
        cartItems={cartItems}
        onRemoveItem={removeItem}
        onUpdateQuantity={updateQuantity}
      />
    </div>
  );
}
