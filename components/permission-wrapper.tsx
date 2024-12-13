import { ReactNode } from "react";
import { usePermissions } from "@/hooks/usePermissions";
import { useUserStore } from "@/stores/useUserStore";
import { ROLE_TYPE, User } from "@/types/auth";

interface PermissionProps {
  permission?: string;
  role: keyof typeof ROLE_TYPE;
  children: ReactNode;
}
3;
export function PermissionWrapper({
  permission,
  role,
  children,
}: PermissionProps) {
  const { user } = useUserStore();
  const { hasPermission, hasRole } = usePermissions(user as User | null);

  if (permission && !hasPermission(permission)) return null;
  if (role && !hasRole(role)) return null;

  return <>{children}</>;
}
