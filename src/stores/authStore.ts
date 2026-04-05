import { create } from "zustand";
import { clearAuthToken, isAuthenticated } from "@/lib/axios/client";

type AuthStore = {
  isLoggedIn: boolean;
  setLoggedIn: (value: boolean) => void;
  hydrateAuth: () => void;
  logout: () => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  isLoggedIn: false,

  setLoggedIn(value) {
    set({ isLoggedIn: value });
  },

  hydrateAuth() {
    set({ isLoggedIn: isAuthenticated() });
  },

  logout() {
    clearAuthToken();
    set({ isLoggedIn: false });
  },
}));
