import { createApiUrl } from "@/config/api";
import { api } from "@/lib/api/client";
import { buildQueryString } from "@/lib/utils";
import { Developer, DeveloperQueryParams } from "@/types/developer";


export const getDevelopers = async (params: DeveloperQueryParams) => {

  const queryParams = buildQueryString(params);

  const response = await api.get<{ data: Developer[]; total: number }>(
    `${createApiUrl('developers.list')}?${queryParams.toString()}`
  );

  return response.data;
};