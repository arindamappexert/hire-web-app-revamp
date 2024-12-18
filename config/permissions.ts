import { PERMISSIONS, ROLE_TYPE, RoutePermissions } from "@/types/auth";

export const ROUTE_PERMISSIONS: Record<string, RoutePermissions> = {
  "/admin/developers": {
    roles: ["SUPER_ADMIN"],
    permissions: ['MANAGE_DEVELOPERS']
  },
  "/admin/dashboard": {
    roles: ["SUPER_ADMIN"],
  },
  "/admin/pipeline": {
    roles: ["SUPER_ADMIN"],
    permissions: ['MANAGE_PIPELINE']
  }
};

export const ROLE_PERMISSIONS: Record<string, (keyof typeof PERMISSIONS)[]> = {
  [ROLE_TYPE.SUPER_ADMIN]: ['MANAGE_DEVELOPERS', 'SUPER_ADMIN', 'MANAGE_PIPELINE'],
  [ROLE_TYPE.DEVELOPER]: [],
  [ROLE_TYPE.COMPANY]: [],
};

export const LOGIN_PATHS = {
  [ROLE_TYPE.SUPER_ADMIN]: '/login/admin',
  [ROLE_TYPE.DEVELOPER]: '/login/developer',
  [ROLE_TYPE.COMPANY]: '/login/company',
  DEFAULT: '/login/developers'
} as const;

export const LOGGED_IN_PATHS = {
  [ROLE_TYPE.SUPER_ADMIN]: '/admin/developers',
  [ROLE_TYPE.DEVELOPER]: '/developer/dashboard',
  [ROLE_TYPE.COMPANY]: '/company/dashboard',
  DEFAULT: '/developer/dashboard'
} as const;

export const getLoginPathByRole = (roleId?: number): string => {
  if (!roleId) return LOGIN_PATHS.DEFAULT;
  return LOGIN_PATHS[roleId as keyof typeof LOGIN_PATHS] || LOGIN_PATHS.DEFAULT;
};

export const getLoggedInPathByRole = (roleId?: number): string => {
  if (!roleId) return LOGGED_IN_PATHS.DEFAULT;
  return LOGGED_IN_PATHS[roleId as keyof typeof LOGGED_IN_PATHS] || LOGGED_IN_PATHS.DEFAULT;
}

export const getDefaultLoginPath = () => LOGIN_PATHS.DEFAULT;