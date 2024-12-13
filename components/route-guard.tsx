"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useUserStore } from "@/stores/useUserStore";
import { usePermissions } from "@/hooks/usePermissions";
import { ROUTE_PERMISSIONS } from "@/config/permissions";
import { User } from "@/types/auth";
import { useFirebaseAuth } from "@/hooks/useFirebaseAuth";
import { Spinner } from "@/components/ui/spinner";

export default function RouteGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useUserStore();
  const { loading } = useFirebaseAuth();
  const { hasPermission, hasRole } = usePermissions(user as User | null);

  useEffect(() => {
    if (!loading) {
      checkAuth();
    }
  }, [pathname, user, loading]);

  const checkAuth = () => {
    const routeConfig = ROUTE_PERMISSIONS[pathname];

    if (!routeConfig) return; // Public route

    if (!user) {
      const returnUrl = encodeURIComponent(pathname);
      router.push(`/login?returnUrl=${returnUrl}`);
      return;
    }

    // Check roles
    const hasValidRole = routeConfig.roles?.some((role) => hasRole(role));

    console.log(hasValidRole, "hasValidRole");
    console.log({pathname, routeConfig, user}, "pathname, routeConfig, user");
    if (!hasValidRole) {
      router.push("/unauthorized");
      return;
    }

    // Check permissions
    const hasValidPermission = routeConfig.permissions?.every((permission) =>
      hasPermission(permission)
    );
    if (routeConfig.permissions && !hasValidPermission) {
      router.push("/unauthorized");
      return;
    }
  };
  if (loading) {
    return <Spinner />;
  }

  return <>{children}</>;
}
