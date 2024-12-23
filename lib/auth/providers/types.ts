export interface AuthProvider {
    login: (email: string, password: string) => Promise<string>;
    logout: () => Promise<void>;
    getToken: () => Promise<string | null>;
    onAuthStateChanged: (callback: (token: string | null) => void) => () => void;
  }
  
  export interface AuthProviderConfig {
    apiKey: string;
    authDomain: string;
    // Add other provider-specific config as needed
  }