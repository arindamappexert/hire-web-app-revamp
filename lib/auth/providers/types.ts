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
    google?: boolean;
    github?: boolean;
  };
}

export interface SSOProvider {
  id: string;
  name: string;
  icon: string;
}

export type SSOProviderId = 'google' | 'github';