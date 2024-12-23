
import { axiosInstance } from "@/lib/api/axios";
import { QueryParams } from "@/lib/api/types";
import { buildQueryString } from "@/lib/api/utils";
import { createApiUrl } from "@/lib/config/api";
import { Developer } from "@/types/developer";


export const getDevelopers = async (params: QueryParams) => {

  const queryParams = buildQueryString(params);

  const response = await axiosInstance.get<{ data: Developer[]; total: number }>(
    `${createApiUrl('developers.list')}?${queryParams.toString()}`
  );

  return response.data;
};