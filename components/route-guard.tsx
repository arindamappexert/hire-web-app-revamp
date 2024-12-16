"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useUserStore } from "@/stores/useUserStore";
import { getDefaultLoginPath, getLoginPathByRole, ROUTE_PERMISSIONS } from "@/config/permissions";
import { useFirebaseAuth } from "@/hooks/useFirebaseAuth";
import { Spinner } from "@/components/ui/spinner";
import { ErrorBoundary } from "@/components/error-boundary";
import { ROLE_TYPE } from "@/types/auth";
import { useMe } from "@/hooks/api/useMe";

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
  const { loading: authLoading } = useFirebaseAuth();

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

        // Public route check
        if (!routeConfig) {
          setAuthState({
            isAuthenticated: true,
            isAuthorized: true,
            isLoading: false,
            error: null,
          });
          return;
        }

        // Authentication check
        if (!user) {
          const returnUrl = encodeURIComponent(pathname);
          const redirectPath = getDefaultLoginPath();
          router.push(`${redirectPath}?returnUrl=${returnUrl}`);
          return;
        }

        const hasValidRole = routeConfig.roles?.some(
          (role) => ROLE_TYPE[role] === user.role?.id
        );

        if (!hasValidRole) {
          router.push("/unauthorized");
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
  }, [pathname, user, authLoading]);

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
