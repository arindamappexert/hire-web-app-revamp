import { ROLE_TYPE } from "@/types/auth";

export const API_CONFIG = {
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
} as const;

export const API_ENDPOINTS = {
    auth: {
        login: '/auth/login',
        register: '/auth/register',
        logout: '/auth/logout',
        refresh: '/auth/refresh',
        me: '/users/me',
    },
    users: {
        list: '/users',
        detail: (id: string) => `/users/${id}`,
        create: '/users',
        update: (id: string) => `/users/${id}`,
        delete: (id: string) => `/users/${id}`,
    },
    developers: {
        list: '/developers',
        detail: (id: string) => `/developers/${id}`,
        create: '/developers',
        update: (id: string) => `/developers/${id}`,
        delete: (id: string) => `/developers/${id}`,
    },
    jobPosts: {
        list: '/job-posts',
        detail: (id: string) => `/job-posts/${id}`,
        create: '/job-posts',
        update: (id: string) => `/job-posts/${id}`,
        delete: (id: string) => `/job-posts/${id}`,
        statuses: '/job-post-statuses',
    }
} as const;

type EndpointPaths<T> = {
    [K in keyof T]: T[K] extends object
      ? `${Extract<K, string>}.${EndpointPaths<T[K]>}`
      : Extract<K, string>;
  }[keyof T];

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

export const createApiUrl = <
  T extends EndpointPaths<typeof API_ENDPOINTS>
>(
  endpoint: T,
  ...args: any[]
): string => {
  const keys = endpoint.split(".") as (keyof typeof API_ENDPOINTS)[];
  let url: any = API_ENDPOINTS;

  for (const key of keys) {
    url = url[key];
  }

  if (typeof url === "function") {
    url = url(...args);
  }

  return `${API_CONFIG.baseURL}${url}`;
};