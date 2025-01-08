import { githubProvider, googleProvider } from '@/services/providersService';

  
  type ProviderType =
    | typeof googleProvider
    | typeof githubProvider;
  type ProviderId = 'google'  | 'github';
  
  interface SSOProviderConfig<T extends ProviderType> {
    id: ProviderId;
    provider: T;
    icon: string;
    name: string;
    enabled: boolean;
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
      enabled: process.env.NEXT_PUBLIC_SSO_GOOGLE_ENABLED === 'true',
    },
    github: {
      id: 'github',
      provider: githubProvider,
      icon: '/images/github.svg',
      name: 'GitHub',
      enabled: process.env.NEXT_PUBLIC_SSO_GITHUB_ENABLED === 'true',
    },
  } as const;
  
  export const isSSOEnabled = () =>
    Object.values(SSOProviders).some((provider) => provider.enabled);
  
  export const getEnabledProviders = () =>
    Object.values(SSOProviders).filter((provider) => provider.enabled);
  