import { create } from "zustand";

export const useCartStore = create((set) => ({
  cart: [],

  addToCart: (product) => {
    set((state) => ({
      cart: [...state.cart, product]
    }));
  },

  // Функция удаления (требование препода)
  removeFromCart: (productId) => {
    set((state) => ({
      cart: state.cart.filter((item) => item._id !== productId)
    }));
  },
}));