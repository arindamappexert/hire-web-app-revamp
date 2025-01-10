-'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AuthState, ROLE_TYPE, User } from '@/lib/auth/types';
import { axiosInstance } from '@/lib/api/axios';
import { AuthProviderConfig } from '@/lib/auth/providers/types';
import { createApiUrl } from '@/lib/config/api';
import { useFirebaseAuth } from '@/lib/auth/providers/useFirebaseAuth';


interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkPermission: (permission: string) => boolean;
  checkRole: (role: keyof typeof ROLE_TYPE) => boolean;
  enabledProviders: {
    login: () => Promise<string | void>;
    id: string;
    name: string;
    icon: string;
  }[]
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
  config: AuthProviderConfig;
}

export function AuthProvider({ children, config }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const auth = useFirebaseAuth(config);

  const { data: user, refetch } = useQuery<User>({
    queryKey: ['user'],
    queryFn: async () => {
      const token = await auth.getToken();
      if (!token) throw new Error('No token available');

      const response = await axiosInstance.get(createApiUrl('auth.me'), {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    },
    enabled: isAuthenticated,
  });

  useEffect(() => {
    const unsubscribe = auth.subscribeToAuthChanges(async (token) => {
      setIsAuthenticated(!!token);
      if (token) {
        refetch();
      }
    });

    return () => unsubscribe();
  }, [auth, refetch]);

  useEffect(() => {
    if (user) {
      setIsLoading(false);
    }
  }, [user])

  const login = async (email: string, password: string) => {
    await auth.login(email, password);
  };

  const logout = async () => {
    await auth.logout();
  };

  const checkPermission = (permission: string) => {
    if (!user) return false;
    throw new Error('Not implemented');
  };

  const checkRole = (role: keyof typeof ROLE_TYPE) => {
    if (!user) return false;
    if (!user.role || !user.role.id) return false;
    return user.role?.id === ROLE_TYPE[role];
  };

  return (
    <AuthContext.Provider
      value={{
        user: user || null,
        isAuthenticated,
        isLoading,
        login,
        logout,
        checkPermission,
        checkRole,
        enabledProviders: auth.getEnabledProviders()

      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};