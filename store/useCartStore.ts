import { getImageDimensions } from "@/lib/utils";
import { urlFor } from "@/sanity/lib/image";
import { Product, ProductPrice } from "@/types/product";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  id: string;
  quantity: number;
  _id: string;
  link: string;
  url: string;
  title: string;
  price: ProductPrice;
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  isSample?: boolean;
}

interface CartStoreState {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => CartItem;
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
        // Use unique ID strategy
        const itemId = product.isSample ? `${product._id}-sample` : product._id;

        const existingItem = items.find((item) => item.id === itemId);

        if (existingItem) {
          if (product.isSample) {
            // Samples usually don't stack quantity in the same way or allowed max 1?
            // Existing logic just returns existing item effectively doing nothing if sample exists.
            // We'll keep it as is: no quantity update for samples if already in cart.
            return existingItem;
          }
          set({
            items: items.map((item) =>
              item.id === itemId
                ? { ...item, quantity: item.quantity + quantity }
                : item,
            ),
          });
          return existingItem;
        }
        if (product.isSample) {
          const dimensions = getImageDimensions(
            product.pattern?.image?.asset._ref,
          );
          const newSampleItem: CartItem = {
            id: product._id + "-sample",
            link: product.link,
            url: "https://vinylove-schody.cz" + product.link,
            quantity: quantity,
            _id: product._id, // Ensure _id is present
            title: "Vzorek - " + product.title,
            price: {
              priceWithoutVAT: 0,
              currency: "CZK",
              priceWithVAT: 0,
            },
            image: {
              src: urlFor(product.pattern?.image).url(),
              alt: product.title || "Pattern Image",
              width: dimensions?.[0] || 0,
              height: dimensions?.[1] || 0,
            },
            isSample: true,
          };
          set({
            items: [...items, newSampleItem],
          });
          return newSampleItem;
        } else {
          // Ensure we have a link and match CartItem structure
          const dimensions = getImageDimensions(product.mainImage.asset._ref);
          const newItem: CartItem = {
            id: product._id,
            link: product.link,
            url: "https://vinylove-schody.cz" + product.link,
            quantity: quantity,
            _id: product._id, // Ensure _id is present
            title: product.title,
            price: product.price,
            image: {
              src: urlFor(product.mainImage).url(),
              alt: product.title || "Product Image",
              width: dimensions?.[0] || 0,
              height: dimensions?.[1] || 0,
            },
            isSample: false,
          };

          set({
            items: [...items, newItem],
          });
          return newItem;
        }
      },

      removeItem: (id) => {
        set({
          items: get().items.filter((item) => item.id !== id),
        });
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }

        set({
          items: get().items.map((item) =>
            item.id === id ? { ...item, quantity } : item,
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
