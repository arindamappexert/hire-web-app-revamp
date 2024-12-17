import { ROLE_TYPE, RoutePermissions } from "@/types/auth";

export const PERMISSIONS = {
  SUPER_ADMIN: "SUPER_ADMIN",
  MANAGE_DEVELOPERS: "MANAGE_DEVELOPERS",
};

export const ROUTE_PERMISSIONS: Record<string, RoutePermissions> = {
  "/dashboard/developer": {
    roles: ["DEVELOPER", "SUPER_ADMIN"],
  },
  "/dashboard/company": {
    roles: ["COMPANY", "SUPER_ADMIN"],
  },
  "/dashboard/admin": {
    roles: ["SUPER_ADMIN"],
    permissions: ["SUPER_ADMIN"],
  },

  "/admin/developers": {
    roles: ["SUPER_ADMIN"],
  },
};

export const ROLE_PERMISSIONS: Record<string, string[]> = {
  ADMIN: [PERMISSIONS.MANAGE_DEVELOPERS, PERMISSIONS.SUPER_ADMIN],
  DEVELOPER: [],
  COMPANY: [],
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