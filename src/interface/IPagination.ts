export interface IPaginationOptions {
    page: number;
    perPage?: number;
}

export interface IPaginationData {
    page: number;
    perPage: number;
    totalPage: number;
    totalItems: number;
}