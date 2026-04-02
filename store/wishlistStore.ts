import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { Product } from "@/types/product";
import { STORAGE_KEYS } from "@/utils/storage";

interface WishlistStore {
  items: Product[];
  toggleItem: (product: Product) => void;
  contains: (productId: number) => boolean;
  clear: () => void;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      toggleItem: (product) =>
        set((state) => {
          const exists = state.items.some((item) => item.id === product.id);

          return {
            items: exists
              ? state.items.filter((item) => item.id !== product.id)
              : [...state.items, product],
          };
        }),
      contains: (productId) =>
        get().items.some((item) => item.id === productId),
      clear: () => set({ items: [] }),
    }),
    {
      name: STORAGE_KEYS.wishlist,
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
