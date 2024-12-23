import axios from 'axios';
import { API_CONFIG, getLoginPathByRole } from '@/lib/config/api';

export const axiosInstance = axios.create(API_CONFIG);

// Add token refresh interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If error is 401 and we haven't retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Get the auth provider instance
        const authProvider = (window as any).__authProvider;
        if (!authProvider) {
          throw new Error('Auth provider not initialized');
        }

        // Refresh the token
        const newToken = await authProvider.refreshAccessToken();

        // Retry the original request with new token
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // If refresh fails, redirect to login
        window.location.href = getLoginPathByRole();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);