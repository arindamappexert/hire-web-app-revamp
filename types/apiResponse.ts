export interface PaginatedResponse<T> {
  data: T;
  meta: Meta;
  links: Links;
}

export interface Links {
  current: string;
  next: string;
  last: string;
}

export interface Meta {
  itemsPerPage: number;
  totalItems: number;
  currentPage: number;
  totalPages: number;
  sortBy: Array<string[]>;
}
