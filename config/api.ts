export const API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api/v1",
  endpoints: {
    auth: {
      login: "/auth/login",
      register: "/auth/register",
      logout: "/auth/logout",
    },
    users: {
      list: "/users",
      me: "/users/me",
      detail: (id: string) => `/users/${id}`,
      create: "/users",
      update: (id: string) => `/users/${id}`,
      delete: (id: string) => `/users/${id}`,
    },
    developers: {
      list: "/developers",
      detail: (id: string) => `/developers/${id}`,
      create: "/developers",
      update: (id: string) => `/developers/${id}`,
      delete: (id: string) => `/developers/${id}`,
    }
  },
} as const;

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface SortParams {
  sortBy?: string;
  order?: "asc" | "desc";
}

export interface FilterParams {
  [key: string]: string | number | boolean | undefined;
}

export interface QueryParams extends PaginationParams, SortParams {
  filters?: FilterParams;
  expand?: string[];
}
