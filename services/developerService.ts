
import { axiosInstance } from "@/lib/api/axios";
import { buildQueryString } from "@/lib/api/utils";
import { createApiUrl } from "@/lib/config/api";
import { Developer, DeveloperQueryParams } from "@/types/developer";


export const getDevelopers = async (params: DeveloperQueryParams) => {

  const queryParams = buildQueryString(params);

  const response = await axiosInstance.get<{ data: Developer[]; total: number }>(
    `${createApiUrl('developers.list')}?${queryParams.toString()}`
  );

  return response.data;
};