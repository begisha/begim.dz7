import { create } from "zustand";
import { api } from "../api/axios";

export const useProductStore = create((set) => ({
  products: [],
  loading: false,

  getProducts: async (categoryId = null) => {
    set({ loading: true });
    try {
      // Если выбран "all" или ничего не выбрано, грузим всё. Иначе — по категории.
      const url = categoryId && categoryId !== 'all' 
        ? `/products?categoryId=${categoryId}` 
        : '/products';
      const res = await api.get(url);
      set({ products: res.data });
    } catch (err) {
      // Без лишних логов
    } finally {
      set({ loading: false });
    }
  }
}));