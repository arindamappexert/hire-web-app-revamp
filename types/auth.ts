export type Role = 'DEVELOPER' | 'COMPANY' | 'ADMIN';

export interface User {
  id: string;
  email: string;
  role: Role;
  permissions: string[];
}

export interface RoutePermissions {
  roles: Role[];
  permissions?: string[];
}
