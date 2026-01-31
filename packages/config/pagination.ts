export const paginationConfig = {
    defaultPageSize: 10,
    maxPageSize: 100,
};


export interface PaginationParams {
    page: number;
    pageSize: number;
}

export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
}
