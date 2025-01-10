export interface AuthProvider {
  login: (email: string, password: string) => Promise<string>;
  logout: () => Promise<void>;
  getToken: () => Promise<string | null>;
  onAuthStateChanged: (callback: (token: string | null) => void) => () => void;
}

export interface AuthProviderConfig {
  apiKey: string;
  authDomain: string;
  sso?: {
    google: boolean;
    github: boolean;
  };
  loginMethod?: 'popup' | 'redirect';
}

export interface SSOProvider {
  id: string;
  name: string;
  icon: string;
  enabled?: boolean;
}

export type SSOProviderId = 'google' | 'github';