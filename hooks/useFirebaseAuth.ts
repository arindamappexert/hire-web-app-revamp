"use client";

import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { useUserStore } from "@/stores/useUserStore";
import { useRouter } from "next/navigation";
import { useMe } from "./api/useMe";
import { getLoginPathByRole } from "@/config/permissions";

export function useFirebaseAuth() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const { setUser, clearUser, user } = useUserStore();

  const { isLoading: isMeLoading } = useMe({
    enabled: !!firebaseUser,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setFirebaseUser(firebaseUser);

      if (!firebaseUser) {
        clearUser();
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [setUser, clearUser]);

  const logout = async () => {
    try {
      const currentRole = user?.role?.id;
      await signOut(auth);
      clearUser();
      router.push(getLoginPathByRole(currentRole));
    } catch (error) {
      console.error("Logout failed:", error);
      throw error;
    }
  };

  return {
    loading: loading || (!!firebaseUser && isMeLoading),
    logout,
  };
}
