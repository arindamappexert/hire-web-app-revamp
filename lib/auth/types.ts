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


export interface Permission {
  id: string;
  name: string;
  description?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export const ROLE_TYPE = {
  SUPER_ADMIN: 1,
  DEVELOPER: 3,
  COMPANY: 4,
} as const;