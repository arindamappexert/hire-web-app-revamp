const API_CONFIG = {
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
    },
    jobPosts: {
      statuses: "/job-post-statuses",
      getAll: "/job-posts",
      detail: (id: string) => `/job-posts/${id}`,
      create: "/job-posts",
      update: (id: string) => `/job-posts/${id}`,
      delete: (id: string) => `/job-posts/${id}`,
    }
  },
} as const;

type EndpointPaths<T> = {
  [K in keyof T]: T[K] extends object
    ? `${Extract<K, string>}.${EndpointPaths<T[K]>}`
    : Extract<K, string>;
}[keyof T];

export const BASE_URL = API_CONFIG.baseUrl;

export const createApiUrl = <
  T extends EndpointPaths<typeof API_CONFIG.endpoints>
>(
  endpoint: T,
  ...args: any[]
): string => {
  const keys = endpoint.split(".") as (keyof typeof API_CONFIG.endpoints)[];
  let url: any = API_CONFIG.endpoints;

  for (const key of keys) {
    url = url[key];
  }

  if (typeof url === "function") {
    url = url(...args);
  }

  return `${API_CONFIG.baseUrl}${url}`;
};

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
