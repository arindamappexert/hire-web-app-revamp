'use client';

import { AuthProvider } from "@/lib/auth/context";

type Props = {
    children: React.ReactNode;
}

const AuthProviderLayout: React.FC<Props> = ({ children }) => {
    const config = {
        apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
        authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
        sso: {
            google: process.env.NEXT_PUBLIC_SSO_GOOGLE_ENABLED === 'true',
            github: process.env.NEXT_PUBLIC_SSO_GITHUB_ENABLED === 'true',
        },
        loginMethod: 'redirect' as const
    };

    return (
        <AuthProvider config={config}>
            {children}
        </AuthProvider>
    );
};

export default AuthProviderLayout;