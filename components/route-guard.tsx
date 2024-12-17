"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useUserStore } from "@/stores/useUserStore";
import { getDefaultLoginPath, getLoggedInPathByRole, LOGIN_PATHS, ROUTE_PERMISSIONS } from "@/config/permissions";
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
  redirectPath = "/login",
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
        const routeConfig = ROUTE_PERMISSIONS[pathname];
        const isLoginPage = Object.values(LOGIN_PATHS).includes(pathname as any);

        console.log({ isLoginPage, user, routeConfig })

        // Redirect logged-in users from login pages
        if (isLoginPage && user) {
          router.replace(getLoggedInPathByRole(user.role?.id));
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

        // Check permission-based authorization
        if (!hasValidRole || (routeConfig.permissions)) {
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
