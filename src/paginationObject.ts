import { IPaginationData } from "./interface/IPagination";
import { PaginationList } from "./PaginationList";

export function paginationObject<T>(
    items: T[],
    currentPage: number,
    itemsPerPage: number,
    totalItems: number
) {
    let totalPages = Math.ceil(totalItems / itemsPerPage);

    if (itemsPerPage === 0) {
        itemsPerPage = totalItems;
        totalPages = 1;
    }

    const paginateOptions: IPaginationData = {
        page: currentPage,
        perPage: itemsPerPage,
        totalPage: totalPages,
        totalItems: totalItems
    }

    return new PaginationList(items, paginateOptions);
}