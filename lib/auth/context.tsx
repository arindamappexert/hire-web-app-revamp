-'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AuthState, ROLE_TYPE, User } from '@/lib/auth/types';
import { axiosInstance } from '@/lib/api/axios';
import { AuthProvider as AuthProviderType } from '@/lib/auth/providers/types';
import { createApiUrl } from '@/lib/config/api';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkPermission: (permission: string) => boolean;
  checkRole: (role: keyof typeof ROLE_TYPE) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
  authProvider: AuthProviderType;
}

export function AuthProvider({ children, authProvider }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { data: user, refetch } = useQuery<User>({
    queryKey: ['user'],
    queryFn: async () => {
      const token = await authProvider.getToken();
      if (!token) throw new Error('No token available');

      const response = await axiosInstance.get(createApiUrl('auth.me'), {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    },
    enabled: isAuthenticated,
  });

  useEffect(() => {
    const unsubscribe = authProvider.onAuthStateChanged(async (token) => {
      setIsAuthenticated(!!token);
      if (token) {
        refetch();
      }
    });

    return () => unsubscribe();
  }, [authProvider, refetch]);

  useEffect(() => {
    if (user) {
      setIsLoading(false);
    }
  }, [user])

  const login = async (email: string, password: string) => {
    await authProvider.login(email, password);
  };

  const logout = async () => {
    await authProvider.logout();
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