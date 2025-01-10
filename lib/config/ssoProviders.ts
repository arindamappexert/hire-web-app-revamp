import { githubProvider, googleProvider } from '@/services/providersService';


type ProviderType =
  | typeof googleProvider
  | typeof githubProvider;
type ProviderId = 'google' | 'github';

interface SSOProviderConfig<T extends ProviderType> {
  id: ProviderId;
  provider: T;
  icon: string;
  name: string;
}

type SSOProvidersConfig = {
  google: SSOProviderConfig<typeof googleProvider>;
  github: SSOProviderConfig<typeof githubProvider>;
};

export const SSOProviders: SSOProvidersConfig = {
  google: {
    id: 'google',
    provider: googleProvider,
    icon: '/images/google.svg',
    name: 'Google',
  },
  github: {
    id: 'github',
    provider: githubProvider,
    icon: '/images/github.svg',
    name: 'GitHub',
  },
} as const;
