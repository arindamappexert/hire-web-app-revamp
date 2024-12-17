import { QueryParams } from "@/config/api";
import { jobPostService } from "@/services/jobPostService";
import { useQuery } from "@tanstack/react-query";

const JOB_POSTS_KEYS = {
  list: (params?: QueryParams) => [...JOB_POSTS_KEYS.list, params] as const,
  statuses: 'jobPostStatuses'
};

export const useJobPosts = () => {
  const useGetAll = (params: QueryParams = {}, options = {}) => {
    return useQuery({
      queryKey: JOB_POSTS_KEYS.list(params),
      queryFn: () => jobPostService.getJobPosts(params),
      staleTime: 1 * 60 * 1000, // 1 minute
      ...options
    });
  };

  const useJobPostStatuses = (options = {}) => {
    return useQuery({
      queryKey: JOB_POSTS_KEYS.statuses,
      queryFn: () => jobPostService.getJobPostStatuses(),
      staleTime: 10 * 60 * 1000, // 10 minutes

      ...options
    });
  };

  return {
    useGetAll,
    useJobPostStatuses
  };
};