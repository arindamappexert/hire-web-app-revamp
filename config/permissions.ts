import { RoutePermissions } from '@/types/auth';

export const ROUTE_PERMISSIONS: Record<string, RoutePermissions> = {
  '/dashboard/developer': {
    roles: ['DEVELOPER', 'ADMIN'],
  },
  '/dashboard/company': {
    roles: ['COMPANY', 'ADMIN'],
  },
  '/dashboard/admin': {
    roles: ['ADMIN'],
    permissions: ['SUPER_ADMIN'],
  },
};
