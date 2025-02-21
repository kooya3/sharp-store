import { Product } from "@/sanity.types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface BasketItem {
  product: Product;
  quantity: number;
  size: string | null; // Size selected by the user
  selectedSizeDetails?: {
    size: string; // Ensure size is required
    stock: number; // Ensure stock is required
    price: number; // Ensure price is required
  };
}

interface BasketState {
  items: BasketItem[];
  addItem: (product: Product, size: string | null) => void; // Add size parameter
  removeItem: (productId: string, size: string | null) => void; // Add size parameter
  clearBasket: () => void;
  getTotalPrice: () => number;
  getItemCount: (productId: string, size: string | null) => number; // Add size parameter
  getGroupedItems: () => BasketItem[];
}

const useBasketStore = create<BasketState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product, size) =>
        set((state) => {
          const selectedSizeDetails = product.sizes?.find((s) => s.size === size);
      
          // Ensure selectedSizeDetails is defined and properly typed
          if (!selectedSizeDetails || !selectedSizeDetails.size || !selectedSizeDetails.stock || !selectedSizeDetails.price) {
            return state; // Return current state if required fields are missing
          }
      
          const existingItem = state.items.find(
            (item) => item.product._id === product._id && item.size === size
          );
      
          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.product._id === product._id && item.size === size
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          } else {
            return {
              items: [
                ...state.items,
                {
                  product,
                  quantity: 1,
                  size,
                  selectedSizeDetails: {
                    size: selectedSizeDetails.size, // Ensure size is a string
                    stock: selectedSizeDetails.stock, // Ensure stock is a number
                    price: selectedSizeDetails.price, // Ensure price is a number
                  },
                },
              ],
            };
          }
        }),
      removeItem: (productId, size) =>
        set((state) => ({
          items: state.items.reduce((acc, item) => {
            if (item.product._id === productId && item.size === size) {
              if (item.quantity > 1) {
                acc.push({ ...item, quantity: item.quantity - 1 });
              }
            } else {
              acc.push(item);
            }
            return acc;
          }, [] as BasketItem[]),
        })),
      clearBasket: () => set({ items: [] }),
      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) =>
            total + (item.selectedSizeDetails?.price ?? 0) * item.quantity,
          0
        );
      },
      getItemCount: (productId, size) => {
        const item = get().items.find(
          (item) => item.product._id === productId && item.size === size // Check both product ID and size
        );
        return item ? item.quantity : 0;
      },
      getGroupedItems: () => get().items,
    }),
    {
      name: "basket-store",
    }
  )
);

export default useBasketStore;