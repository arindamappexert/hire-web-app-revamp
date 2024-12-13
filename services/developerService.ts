import { Developer, DeveloperQueryParams } from "@/types/developer";
import axios from "axios";


export const DEVELOPER_API = {
  list: '/developers',
  get: (id: string) => `/developers/${id}`,
  create: '/developers',
  update: (id: string) => `/developers/${id}`,
  delete: (id: string) => `/developers/${id}`,
};

export const getDevelopers = async (params: DeveloperQueryParams) => {
  const { filters, sortBy, order, expand, page, limit } = params;
  
  const queryParams = new URLSearchParams();
  
  // Handle pagination
  if (page) queryParams.append('page', String(page));
  if (limit) queryParams.append('limit', String(limit));
  
  // Handle sorting
  if (sortBy) {
    const sortOrder = order || 'DESC';
    queryParams.append('sortBy', `${sortBy}:${sortOrder}`);
  }
  
  // Handle expansion
  if (expand?.length) {
    queryParams.append('expand', expand.join(','));
  }
  
  // Handle filters
  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined) {
        queryParams.append(key, String(value));
      }
    });
  }

  const response = await axios.get<{ data: Developer[]; total: number }>(
    `${DEVELOPER_API.list}?${queryParams.toString()}`
  );
  
  return response.data;
};