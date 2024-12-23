interface PaginationParams {
    page?: number;
    limit?: number;
}

interface SortParams {
    sortBy?: string;
    order?: "asc" | "desc";
}

export interface FilterParams {
    [key: string]: string | number | boolean | undefined;
}

export interface QueryParams extends PaginationParams, SortParams {
    filters?: FilterParams;
    expand?: string[];
}
