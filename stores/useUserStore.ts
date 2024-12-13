import { User } from "@/types/auth";
import { BROWSER_STORAGE_KEYS } from "@/types/browserStorage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type Store = {
  user: Partial<User> | null;
  setUser: (user: Partial<User>) => void;
  clearUser: () => void;
};

export const useUserStore = create<Store>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user: Partial<User>) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: BROWSER_STORAGE_KEYS.USER,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
      }),
    }
  )
);
