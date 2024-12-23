import { axiosInstance } from "@/lib/api/axios";
import { QueryParams } from "@/lib/api/types";
import { buildQueryString } from "@/lib/api/utils";
import { createApiUrl } from "@/lib/config/api";
import { JobPostListResponse, JobPostStatusListResponse } from "@/types/job-post";

export const jobPostService = {
    getJobPosts: async (params: QueryParams) => {
        const queryParams = buildQueryString(params);

        const response = await axiosInstance.get<JobPostListResponse>(
            `${createApiUrl('jobPosts.list')}?${queryParams.toString()}`
        );

        return response.data;
    },

    getJobPostStatuses: async () => {
        const response = await axiosInstance.get<JobPostStatusListResponse>(
            createApiUrl('jobPosts.statuses')
        );

        return response.data;
    }
}