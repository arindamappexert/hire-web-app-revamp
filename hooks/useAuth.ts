"use client";

import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, User } from "firebase/auth";
import { useUserStore } from "@/stores/useUserStore";
import { useRouter } from "next/navigation";
import { useMe } from "./api/useMe";
import { getLoginPathByRole } from "@/config/permissions";

export function useAuth() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const { setUser, clearUser, user } = useUserStore();

  const { isLoading: isMeLoading } = useMe({
    enabled: !!firebaseUser,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      console.log('on auth state changed', {firebaseUser});
      setFirebaseUser(firebaseUser);

      if (!firebaseUser) {
        clearUser();
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [setUser, clearUser]);


  const login = async (email: string, password: string, onSuccess?: () => void, onFailure?: () => void) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Wait for user data to be set in store
      console.log('hitt', {loading, firebaseUser, onSuccess});
      if (!loading && firebaseUser && onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Login failed:", error);
      if (onFailure) {
        onFailure();
      }
    }
  };

  const logout = async () => {
    try {
      const currentRole = user?.role?.id;
      console.log(currentRole, 'current role');
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
    login
  };
}
