import { createApiUrl, QueryParams } from "@/config/api";
import { api } from "@/lib/api/client";
import { buildQueryString } from "@/lib/utils";
import { JobPostListResponse, JobPostStatusListResponse } from "@/types/job-post";

export const jobPostService = {
    getJobPosts: async (params: QueryParams) => {
        const queryParams = buildQueryString(params);

        const response = await api.get<JobPostListResponse>(
            `${createApiUrl('jobPosts.getAll')}?${queryParams.toString()}`
        );

        return response.data;
    },

    getJobPostStatuses: async () => {
        const response = await api.get<JobPostStatusListResponse>(
            createApiUrl('jobPosts.statuses')
        );

        return response.data;
    }
}