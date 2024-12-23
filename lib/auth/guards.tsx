'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from './context';
import { ROLE_TYPE } from '@/types/auth';
import { getLoggedInPathByRole } from '@/lib/config/api';

interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const { isAuthenticated, isLoading, user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading && !isAuthenticated && !pathname.includes('/login')) {
      router.push(getLoggedInPathByRole())
    }
  }, [isAuthenticated, isLoading, router, pathname]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? children : null;
}

interface RoleGuardProps {
  children: React.ReactNode;
  roles: (keyof typeof ROLE_TYPE)[];
  fallback?: React.ReactNode;
}

export function RoleGuard({ children, roles, fallback }: RoleGuardProps) {
  const { checkRole } = useAuth();
  const hasRequiredRole = roles.some((role) => checkRole(role));

  if (!hasRequiredRole) {
    return fallback || null;
  }

  return children;
}

interface PermissionGuardProps {
  children: React.ReactNode;
  permissions: string[];
  fallback?: React.ReactNode;
}

export function PermissionGuard({
  children,
  permissions,
  fallback,
}: PermissionGuardProps) {
  const { checkPermission } = useAuth();
  const hasRequiredPermission = permissions.some((permission) =>
    checkPermission(permission)
  );

  if (!hasRequiredPermission) {
    return fallback || null;
  }

  return children;
}