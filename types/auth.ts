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
  name: string;
  label: string;
  description: string;
}

export interface RoutePermissions {
  roles: (keyof typeof ROLE_TYPE)[];
  permissions?: (keyof typeof PERMISSIONS)[]
}

export const PERMISSIONS = {
  SUPER_ADMIN: "SUPER_ADMIN",
  MANAGE_DEVELOPERS: "MANAGE_DEVELOPERS",
  MANAGE_PIPELINE: "MANAGE_PIPELINE",
} as const;

export const ROLE_TYPE = {
  SUPER_ADMIN: 1,
  DEVELOPER: 2,
  COMPANY: 3,
} as const;

export interface FirebaseAccountInfoResponse {
  kind: string;
  users: FirebaseUser[];
}

export interface FirebaseUser {
  localId: string;
  email: string;
  emailVerified: boolean;
  passwordHash: string;
  passwordUpdatedAt: number;
  validSince: string;
  disabled: boolean;
  lastLoginAt: string;
  createdAt: string;
  customAttributes: string;
  providerUserInfo: string;
}

export interface CustomAttributes {
  role: 'superadmin' | 'developer' | 'company';
}
