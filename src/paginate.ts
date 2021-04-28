import { IPaginationOptions } from "./interface/IPagination";
import { createConnection, EntityTarget, FindConditions, FindManyOptions, getManager } from "typeorm";
import { paginationObject } from "./paginationObject";

const DEFAULT_PAGE = 1;

export async function paginate<T>(
    entityRepository: EntityTarget<T>,
    options: IPaginationOptions,
    searchOptions?: FindConditions<T> | FindManyOptions<T>,
) {
    return paginateRepository<T>(entityRepository, options, searchOptions)
}

function convertOptions<T>(options: IPaginationOptions): [number, number] {
    let page: number | undefined;
    let perPage: number | undefined;

    if (options.page === undefined || options.page === null || isNaN(options.page)) {
        page = DEFAULT_PAGE
    } else {
        page = options.page
    }

    if (options.perPage === undefined || options.perPage === null || isNaN(options.perPage)) {
        perPage = 0;
    } else {
        perPage = options.perPage
    }

    return [page, perPage];
}

async function paginateRepository<T>(
    entityRepository: EntityTarget<T>,
    options: IPaginationOptions,
    searchOptions?: FindConditions<T> | FindManyOptions<T>,
) {
    const [page, perPage] = convertOptions(options);

    let objectOptions: FindConditions<T> | FindManyOptions<T> | undefined;

    if (perPage === 0) {
        objectOptions = {}
    } else {
        objectOptions = {
            skip: (perPage * page) - perPage,
            take: perPage,
            ...searchOptions,
        }
    }

    const connection = await createConnection();
    const [items, total] = await connection.getRepository<T>(entityRepository).findAndCount(objectOptions);
    await connection.close();

    return paginationObject<T>(items, page, perPage, total);
}