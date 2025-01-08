import { useCallback, useEffect, useMemo } from 'react';
import {
  Auth,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { AuthProviderConfig } from '@/lib/auth/providers/types';
import { getApp, initializeApp } from 'firebase/app'

export function useFirebaseAuth(config: AuthProviderConfig) {
  const app = useMemo(() => {
    try {
      return getApp();
    } catch {
      return initializeApp({
        apiKey: config.apiKey,
        authDomain: config.authDomain,
      });
    }
  }, [config.apiKey, config.authDomain]);

  const auth = useMemo(() => getAuth(app), [app]);

  const login = useCallback(async (email: string, password: string) => {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result.user.getIdToken();
  }, [auth]);

  const logout = useCallback(async () => {
    await signOut(auth);
  }, [auth]);

  const getToken = useCallback(async () => {
    const user = auth.currentUser;
    if (!user) return null;
    return user.getIdToken();
  }, [auth]);

  const subscribeToAuthChanges = useCallback((callback: (token: string | null) => void) => {
    return onAuthStateChanged(auth, async (user) => {
      const token = user ? await user.getIdToken() : null;
      callback(token);
    });
  }, [auth]);

  return {
    login,
    logout,
    getToken,
    subscribeToAuthChanges
  };
}