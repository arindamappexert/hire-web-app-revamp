// stores/useUrlParamsStore.ts
import { create } from 'zustand';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface UrlState {
  // Common URL parameters across admin pages
  page: number;
  limit: number;
  sort: string;
  order: 'asc' | 'desc';
  search: string;
  filters: Record<string, string>;
  
  // Actions
  setParam: (key: string, value: string | number | null) => void;
  setFilters: (filters: Record<string, string>) => void;
  resetParams: () => void;
}

export const useUrlParamsStore = create<UrlState>((set, get) => ({
  page: 1,
  limit: 20,
  sort: '',
  order: 'asc',
  search: '',
  filters: {},

  setParam: (key, value) => {
    set((state) => ({ ...state, [key]: value }));
  },

  setFilters: (filters) => {
    set((state) => ({ ...state, filters }));
  },

  resetParams: () => {
    set({
      page: 1,
      limit: 20,
      sort: '',
      order: 'asc',
      search: '',
      filters: {}
    });
  }
}));