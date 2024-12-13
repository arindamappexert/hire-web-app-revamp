// lib/api/hooks/useUsers.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../client';
import { API_CONFIG } from '@/lib/config/api';
import { queryKeys } from '../queryKeys';

interface User {
  id: string;
  name: string;
  email: string;
}

export function useUsers() {
  const queryClient = useQueryClient();

  // List users
  const users = useQuery({
    queryKey: queryKeys.users.lists(),
    queryFn: () => 
      apiClient.get<User[]>(API_CONFIG.endpoints.users.list)
        .then(res => res.data)
  });

  // Get single user
  const getUser = (id: string) => useQuery({
    queryKey: queryKeys.users.detail(id),
    queryFn: () => 
      apiClient.get<User>(API_CONFIG.endpoints.users.detail(id))
        .then(res => res.data)
  });

  // Create user
  const createUser = useMutation({
    mutationFn: (data: Omit<User, 'id'>) =>
      apiClient.post<User>(API_CONFIG.endpoints.users.create, data)
        .then(res => res.data),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: queryKeys.users.lists() });
    },
  });

  // Update user
  const updateUser = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<User> }) =>
      apiClient.put<User>(API_CONFIG.endpoints.users.update(id), data)
        .then(res => res.data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users.detail(id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.users.lists() });
    },
  });

  return {
    users,
    getUser,
    createUser,
    updateUser,
  };
}