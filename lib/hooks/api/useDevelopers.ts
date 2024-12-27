import { useQuery } from "@tanstack/react-query";
import { getDevelopers } from "@/services/developerService";
import { QueryParams } from "@/lib/api/types";

export const DEVELOPER_QUERY_KEY = "developers";

export function useDevelopers(params: QueryParams = {}) {
  return useQuery({
    queryKey: [DEVELOPER_QUERY_KEY, params],
    queryFn: () => getDevelopers(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
