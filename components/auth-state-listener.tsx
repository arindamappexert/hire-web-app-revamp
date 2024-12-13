"use client";

import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useUserStore } from "@/stores/useUserStore";
import { User } from "@/types/auth";

export default function AuthStateListener() {
  const setUser = useUserStore((state) => state.setUser);
  const clearUser = useUserStore((state) => state.clearUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const user: User = {
          id: firebaseUser.uid || "",
          email: firebaseUser.email || "",
          firstName: firebaseUser.displayName?.split(" ")[0] || "",
          lastName: firebaseUser.displayName?.split(" ")[1] || "",
          uniqueId: firebaseUser.uid || "",
          phone: firebaseUser.phoneNumber || "",
          image: firebaseUser.photoURL || "",
        };
        setUser(user);
      } else {
        clearUser();
      }
    });

    return () => unsubscribe();
  }, [setUser, clearUser]);

  return null;
}
