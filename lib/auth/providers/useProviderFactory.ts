import { useMemo } from 'react';
import { 
  GoogleAuthProvider, 
  GithubAuthProvider,
  AuthProvider as FirebaseAuthProvider 
} from 'firebase/auth';
import { SSOProviderId } from './types';

export function useProviderFactory() {
  return useMemo(() => ({
    createProvider: (providerId: SSOProviderId): FirebaseAuthProvider => {
      switch (providerId) {
        case 'google':
          return new GoogleAuthProvider();
        case 'github':
          return new GithubAuthProvider();
        default:
          throw new Error(`Unsupported provider: ${providerId}`);
      }
    }
  }), []);
}