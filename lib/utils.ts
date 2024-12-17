import { QueryParams } from "@/config/api";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const buildQueryString = (params: QueryParams): string => {
  const searchParams = new URLSearchParams();

  if (params.page) searchParams.append('page', String(params.page));
  if (params.limit) searchParams.append('limit', String(params.limit));
  
  if (params.sortBy) {
    searchParams.append('sortBy', params.sortBy);
    searchParams.append('order', params.order || 'desc');
  }

  if (params.expand?.length) {
    searchParams.append('expand', params.expand.join(','));
  }

  if (params.filters) {
    Object.entries(params.filters).forEach(([key, value]) => {
      if (value !== undefined) {
        searchParams.append(key, String(value));
      }
    });
  }

  return searchParams.toString();
};