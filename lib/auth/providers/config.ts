import { SSOProvider } from '@/lib/auth/providers/types';

export const ssoProviderConfig: Record<string, SSOProvider> = {
    google: {
        id: 'google',
        name: 'Google',
        icon: '/images/google.svg',
        enabled: process.env.NEXT_PUBLIC_SSO_GOOGLE_ENABLED === 'true',
    },
    github: {
        id: 'github',
        name: 'GitHub',
        icon: '/images/github.svg',
        enabled: process.env.NEXT_PUBLIC_SSO_GITHUB_ENABLED === 'true',
    },
};