'use client';

import { initializeApp, getApp, FirebaseApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  Auth,
  createUserWithEmailAndPassword,
  linkWithCredential,
} from 'firebase/auth';
import { AuthProvider, AuthProviderConfig } from '@/lib/auth/providers/types';

export class FirebaseAuthProvider implements AuthProvider {
  private auth: Auth;
  private app: FirebaseApp;

  constructor(config: AuthProviderConfig) {
    console.log('firebase auth provider constructor!')
    try {
      this.app = getApp();
    } catch {
      this.app = initializeApp({
        apiKey: config.apiKey,
        authDomain: config.authDomain,
      });
    }
    this.auth = getAuth(this.app);
  }

  async login(email: string, password: string): Promise<string> {
    const result = await signInWithEmailAndPassword(this.auth, email, password);
    const token = await result.user.getIdToken();
    return token;
  }

  async logout(): Promise<void> {
    await signOut(this.auth);
  }

  async getToken(): Promise<string | null> {
    const user = this.auth.currentUser;
    if (!user) return null;
    return user.getIdToken();
  }

  onAuthStateChanged(callback: (token: string | null) => void): () => void {
    return onAuthStateChanged(this.auth, async (user) => {
      const token = user ? await user.getIdToken() : null;
      callback(token);
    });
  }
}