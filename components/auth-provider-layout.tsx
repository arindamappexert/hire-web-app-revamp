'use client';

import { AuthProvider } from "@/lib/auth/context";
import { FirebaseAuthProvider } from "@/lib/auth/providers/firebase";

type Props = {
    children: React.ReactNode;
}

const AuthProviderLayout: React.FC<Props> = ({ children }) => {

    const authProvider = new FirebaseAuthProvider({
        apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
        authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
    })

    // Make auth provider globally available for interceptors
    if (typeof window !== 'undefined') {
        (window as any).__authProvider = authProvider;
    }

    return <main>
        <AuthProvider authProvider={authProvider}>
            {children}
        </AuthProvider>
    </main>;
};


export default AuthProviderLayout;