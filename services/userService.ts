import { createApiUrl } from "@/config/api";
import { api } from "@/lib/api/client";
import { auth } from "@/lib/firebase";
import { useUserStore } from "@/stores/useUserStore";
import { User } from "@/types/auth";

/**
 * Function to wait for Firebase authentication to be ready
 * before making API requests
 *
 * @param maxAttempts The maximum number of attempts to wait
 * @param interval The interval in milliseconds to wait between attempts
 * @returns A promise that resolves to a boolean indicating if the
 * authentication is ready
 */
const waitForAuth = async (
  maxAttempts = 10,
  interval = 500
): Promise<boolean> => {
  let attempts = 0;
  while (attempts < maxAttempts) {
    if (auth.currentUser) return true;
    await new Promise((resolve) => setTimeout(resolve, interval));
    attempts++;
  }

  return false;
};

export const getMe = async () => {
  try {
    const isAuthReady = await waitForAuth();
    if (!isAuthReady) {
      throw new Error("Firebase authentication not initialized");
    }

    const idToken = await auth.currentUser?.getIdToken(true);
    if (!idToken) {
      throw new Error("No authenticated user found");
    }
    const response = await api.get<User>(createApiUrl("users.me"));

    // Update user store with complete user data
    useUserStore.getState().setUser(response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch user data:", error);
    throw error;
  }
};
