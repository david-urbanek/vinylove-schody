import { Product } from "@/types/product";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem extends Product {
  quantity: number;
  id?: string;
}

interface CartStoreState {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void; // Přidal jsem pro pohodlí
}

export const useCartStore = create<CartStoreState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product, quantity = 1) => {
        const { items } = get();
        // Používáš 'link' jako ID, což je v pohodě, pokud je unikátní
        const existingItem = items.find((item) => item.link === product.link);

        if (existingItem) {
          set({
            items: items.map((item) =>
              item.link === product.link
                ? { ...item, quantity: item.quantity + quantity }
                : item,
            ),
          });
        } else {
          set({
            items: [...items, { ...product, quantity: quantity }],
          });
        }
      },

      removeItem: (id) => {
        set({
          items: get().items.filter((item) => item.link !== id),
        });
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }

        set({
          items: get().items.map((item) =>
            item.link === id ? { ...item, quantity } : item,
          ),
        });
      },

      clearCart: () => set({ items: [] }),
    }),
    {
      name: "vinylove-schody-cart",
    },
  ),
);
