import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  isAuth: !!localStorage.getItem('accessToken'),
  profile: null,

  setAuth: (data) => {
    const accessToken = data.token?.accessToken || data.accessToken;
    const refreshToken = data.token?.refreshToken || data.refreshToken;
    const userData = data.user || data;

    if (accessToken) {
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      set({ user: userData, isAuth: true });
    }
  },

  logout: () => {
    localStorage.clear();
    set({ user: null, profile: null, isAuth: false });
  }
}));