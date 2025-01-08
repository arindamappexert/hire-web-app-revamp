import { SSOProvider } from '@/lib/auth/providers/types';

export const ssoProviderConfig: Record<string, SSOProvider> = {
    google: {
        id: 'google',
        name: 'Google',
        icon: '/images/google.svg',
    },
    github: {
        id: 'github',
        name: 'GitHub',
        icon: '/images/github.svg',
    },
};