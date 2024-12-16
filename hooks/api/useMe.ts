import { useQuery } from "@tanstack/react-query";
import { getMe } from "@/services/userService";

export const ME_QUERY_KEY = "users/me";

type Props = {
  enabled?: boolean;
}

export function useMe({ enabled = true }: Props) {
  return useQuery({
    queryKey: [ME_QUERY_KEY],
    queryFn: () => getMe(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled
  });
}
