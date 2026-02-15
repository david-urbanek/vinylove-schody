import { Product } from "@/types/product";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem extends Omit<Product, "image"> {
  quantity: number;
  // We keep a simplified image object for the cart to avoid full Sanity image parsing in checkout
  image?: {
    src: string;
    srcset?: string;
    alt?: string;
  };
  stockStatusCode?: string;
}

interface CartStoreState {
  items: CartItem[];
  addItem: (product: CartItem | Product, quantity?: number) => void;
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
        const link = product.link || product._id;
        const existingItem = items.find((item) => item.link === link);

        if (existingItem) {
          set({
            items: items.map((item) =>
              item.link === link
                ? { ...item, quantity: item.quantity + quantity }
                : item,
            ),
          });
        } else {
          // Ensure we have a link and match CartItem structure
          const newItem: CartItem = {
            ...product,
            link,
            quantity: quantity,
            _id: product._id, // Ensure _id is present
            title: product.title,
            price: product.price,
            // If image is not provided in product (if it's just raw Product), we might need to handle it,
            // but product-detail7 sends a constructed object with 'image'.
            // We just spread ...product which covers most bases.
          };

          set({
            items: [...items, newItem],
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
