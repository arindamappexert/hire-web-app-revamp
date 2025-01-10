import { useCallback, useEffect, useMemo } from 'react';
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  signInWithRedirect,
  getRedirectResult,
} from 'firebase/auth';
import {
  initializeApp,
  getApp,
} from 'firebase/app'
import { AuthProviderConfig, SSOProviderId } from './types';
import { useProviderFactory } from './useProviderFactory';
import { ssoProviderConfig } from './config';

export function useFirebaseAuth(config: AuthProviderConfig) {
  const { createProvider } = useProviderFactory();
  const loginMethod = config.loginMethod || 'popup';

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

  const loginWithPopup = useCallback(async (providerId: SSOProviderId) => {
    const provider = createProvider(providerId);
    const result = await signInWithPopup(auth, provider);
    return result.user.getIdToken();
  }, [auth, createProvider]);

  const loginWithRedirect = useCallback(async (providerId: SSOProviderId) => {
    const provider = createProvider(providerId);
    await signInWithRedirect(auth, provider);
  }, [auth, createProvider]);

  const handleRedirectResult = useCallback(async () => {
    const result = await getRedirectResult(auth);
    console.log(result, "result from handleRedirectResult");
    if (result) {
      return result.user.getIdToken();
    }
    return null;
  }, [auth]);

  useEffect(() => {
    handleRedirectResult();
  }, [handleRedirectResult]);

  const login = useCallback(async (email: string, password: string) => {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result.user.getIdToken();
  }, [auth]);

  const loginWithProvider = useCallback(async (providerId: SSOProviderId) => {
    return loginMethod === 'popup' 
      ? loginWithPopup(providerId)
      : loginWithRedirect(providerId);
  }, [loginMethod, loginWithPopup, loginWithRedirect]);

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

  const getEnabledProviders = useCallback(() => {
    if (!config.sso) return [];
    return Object.entries(config.sso)
      .filter(([, enabled]) => enabled)
      .map(([id]) => ({
        ...ssoProviderConfig[id],
        login: () => loginWithProvider(id as SSOProviderId)
      }));
  }, [config.sso, loginWithProvider]);

  return {
    login,
    loginWithProvider,
    logout,
    getToken,
    subscribeToAuthChanges,
    getEnabledProviders
  };
}