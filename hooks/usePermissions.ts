import { ROLE_PERMISSIONS } from "@/config/permissions";
import { PERMISSIONS, ROLE_TYPE, User } from "@/types/auth";

export function usePermissions(user: User | null) {
  const hasPermission = (permission: keyof typeof PERMISSIONS): boolean => {
    if (!user) return false;

    const userPermissions = (user.roles ?? []).flatMap(
      (role) => ROLE_PERMISSIONS[role] || []
    );

    return userPermissions.includes(permission);
  };

  const hasRole = (roleType: keyof typeof ROLE_TYPE): boolean => {
    if (!user) return false;
    return user.role?.id === ROLE_TYPE[roleType];
  };

  return {
    hasPermission,
    hasRole,
  };
}
