import { User } from "@/types/auth";
import { BROWSER_STORAGE_KEYS } from "@/types/browserStorage";
import { onAuthStateChanged } from "firebase/auth";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { auth } from "@/lib/firebase";

type Store = {
  idToken: string | null;
  refreshToken: string | null;
  user: Partial<User> | null;
  setIdToken: (token: string) => void;
  clearIdToken: () => void;
  setRefreshToken: (token: string) => void;
  clearRefreshToken: () => void;
  setUser: (user: Partial<User>) => void;
  clearUser: () => void;
};

export const useUserStore = create<Store>()(
  persist(
    (set, get) => {
      onAuthStateChanged(auth, async (firebaseUser) => {
        if (firebaseUser) {
          const user: User = {
            id: firebaseUser.uid || "",
            email: firebaseUser?.email || "",
            firstName: firebaseUser.displayName?.split(" ")[0] || "",
            lastName: firebaseUser.displayName?.split(" ")[1] || "",
            uniqueId: firebaseUser.uid || "",
            phone: firebaseUser.phoneNumber || "",
            image: firebaseUser.photoURL || "",
          };
          set({
            idToken: await firebaseUser.getIdToken(),
            refreshToken: await firebaseUser.getIdToken(true),
            user,
          });
        } else {
          set({ user: null, idToken: null, refreshToken: null });
        }
      });

      return {
        user: null,
        idToken: null,
        refreshToken: null,
        setUser: (user: Partial<User>) => set({ user }),
        clearUser: () => set({ user: null }),
        setIdToken: (token: string) => set({ idToken: token }),
        clearIdToken: () => set({ idToken: null }),
        setRefreshToken: (token: string) => set({ refreshToken: token }),
        clearRefreshToken: () => set({ refreshToken: null }),
      };
    },
    {
      name: BROWSER_STORAGE_KEYS.USER,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        idToken: state.idToken,
        refreshToken: state.refreshToken,
        user: state.user,
      }),
    }
  )
);
