import { RoutePermissions } from '@/types/auth';

export const PERMISSIONS = {
    SUPER_ADMIN: 'SUPER_ADMIN',
    MANAGE_DEVELOPERS: 'MANAGE_DEVELOPERS',
    };

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

  '/admin/developers': {
    roles: ['ADMIN'],
    permissions: ['MANAGE_DEVELOPERS'],
  }
};
