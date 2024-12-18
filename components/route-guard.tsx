"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useUserStore } from "@/stores/useUserStore";
import { getDefaultLoginPath, getLoggedInPathByRole, LOGIN_PATHS, ROLE_PERMISSIONS, ROUTE_PERMISSIONS } from "@/config/permissions";
import { useAuth } from "@/hooks/useAuth";
import { Spinner } from "@/components/ui/spinner";
import { ErrorBoundary } from "@/components/error-boundary";
import { ROLE_TYPE } from "@/types/auth";

export interface AuthGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  redirectPath?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  isAuthorized: boolean;
  isLoading: boolean;
  error: Error | null;
}

export default function RouteGuard({
  children,
  fallback = (
    <div className="flex justify-center items-center h-screen">
      <Spinner />
    </div>
  ),
}: AuthGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useUserStore();
  const { loading: authLoading } = useAuth();

  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    isAuthorized: false,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    const validateAccess = async () => {
      try {
        const userRoleId = user?.role?.id;
        if(!userRoleId) return;
        const routeConfig = ROUTE_PERMISSIONS[pathname];
        const rolePermissions = ROLE_PERMISSIONS[userRoleId];
        const isLoginPage = (Object.values(LOGIN_PATHS) as string[]).includes(pathname);

        // Redirect logged-in users from login pages
        if (isLoginPage && user) {
          router.replace(getLoggedInPathByRole(userRoleId));
          return;
        }


        // Allow access to public routes
        if (!routeConfig) {
          setAuthState({
            isAuthenticated: true,
            isAuthorized: true,
            isLoading: false,
            error: null,
          });
          return;
        }

        // Handle unauthenticated users
        if (!user) {
          const loginPath = getDefaultLoginPath();
          router.replace(`${loginPath}`);
          return;
        }

        // Check role-based authorization
        const hasValidRole = routeConfig.roles?.some(
          (role) => ROLE_TYPE[role] === user.role?.id
        );

        const hasPermission = rolePermissions?.some(
          (permission) => routeConfig.permissions?.includes(permission)
        );



        // Check permission-based authorization
        if (!hasValidRole || !hasPermission) {
          router.replace("/unauthorized");
          return;
        }

        setAuthState({
          isAuthenticated: true,
          isAuthorized: true,
          isLoading: false,
          error: null,
        });
      } catch (error) {
        setAuthState({
          isAuthenticated: false,
          isAuthorized: false,
          isLoading: false,
          error: error as Error,
        });
      }
    };

    if (!authLoading) {
      validateAccess();
    }
  }, [pathname, user, authLoading, router]);

  if (authLoading || authState.isLoading) {
    return fallback;
  }

  if (authState.error) {
    return (
      <ErrorBoundary
        error={authState.error}
        resetQuery={() => window.location.reload()}
      />
    );
  }

  if (!authState.isAuthenticated || !authState.isAuthorized) {
    return null;
  }

  return <>{children}</>;
}
