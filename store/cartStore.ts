import { ImageSourcePropType } from "react-native";
import { create } from "zustand";

export type CartLine = {
  itemId: string;
  name: string;
  price: number;
  image: ImageSourcePropType;
  quantity: number;
};

type CartInput = {
  id: string;
  name: string;
  price: number;
  image: ImageSourcePropType;
};

type CartState = {
  lines: CartLine[];
  add: (item: CartInput) => void;
  decrement: (itemId: string) => void;
  remove: (itemId: string) => void;
  clear: () => void;
};

export const useCartStore = create<CartState>((set) => ({
  lines: [],
  add: (item) =>
    set((state) => {
      const existing = state.lines.find((l) => l.itemId === item.id);
      if (existing) {
        return {
          lines: state.lines.map((l) =>
            l.itemId === item.id ? { ...l, quantity: l.quantity + 1 } : l,
          ),
        };
      }
      return {
        lines: [
          ...state.lines,
          {
            itemId: item.id,
            name: item.name,
            price: item.price,
            image: item.image,
            quantity: 1,
          },
        ],
      };
    }),
  decrement: (itemId) =>
    set((state) => {
      const existing = state.lines.find((l) => l.itemId === itemId);
      if (!existing) return state;
      if (existing.quantity <= 1) {
        return { lines: state.lines.filter((l) => l.itemId !== itemId) };
      }
      return {
        lines: state.lines.map((l) =>
          l.itemId === itemId ? { ...l, quantity: l.quantity - 1 } : l,
        ),
      };
    }),
  remove: (itemId) =>
    set((state) => ({
      lines: state.lines.filter((l) => l.itemId !== itemId),
    })),
  clear: () => set({ lines: [] }),
}));

export const useCartCount = () =>
  useCartStore((s) => s.lines.reduce((sum, l) => sum + l.quantity, 0));

export const useCartTotal = () =>
  useCartStore((s) => s.lines.reduce((sum, l) => sum + l.price * l.quantity, 0));
