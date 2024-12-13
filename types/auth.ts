export interface User {
  id: string;
  uniqueId: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  image: string;
  role?: Role;
  roles?: (keyof typeof ROLE_TYPE)[];
}

export interface Role {
  id: number;
  name: string
  label: string;
  description: string;
}

export interface RoutePermissions {
  roles: (keyof typeof ROLE_TYPE)[];
  permissions?: string[];
}

export const ROLE_TYPE = {
  SUPER_ADMIN: 1,
  DEVELOPER: 2,
  COMPANY: 3
};
