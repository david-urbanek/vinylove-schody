import { useEffect, useMemo, useState } from "react";
import { useCartStore } from "../store/useCartStore";

export const useCart = () => {
  const items = useCartStore((state) => state.items);
  const addItem = useCartStore((state) => state.addItem);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const clearCart = useCartStore((state) => state.clearCart);

  // Ošetření hydratace pro Next.js
  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    setIsReady(true);
  }, []);

  // Výpočty cen a kusů (náhrada za gettery)
  const { totalPrice, totalItems } = useMemo(() => {
    if (!isReady) return { totalPrice: 0, totalItems: 0 };

    return items.reduce(
      (acc, item) => ({
        totalPrice: acc.totalPrice + item.price.regular * item.quantity,
        totalItems: acc.totalItems + item.quantity,
      }),
      { totalPrice: 0, totalItems: 0 },
    );
  }, [items, isReady]);

  return {
    items: isReady ? items : [],
    totalPrice,
    totalItems,
    isReady,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    isEmpty: isReady && items.length === 0,
  };
};
