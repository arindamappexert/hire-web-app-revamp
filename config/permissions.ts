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
    permissions: ["MANAGE_DEVELOPERS"],
  },
};

export const ROLE_PERMISSIONS: Record<string, string[]> = {
  ADMIN: [PERMISSIONS.MANAGE_DEVELOPERS, PERMISSIONS.SUPER_ADMIN],
  DEVELOPER: [],
  COMPANY: [],
};
