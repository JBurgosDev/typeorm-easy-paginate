import { IPaginationData } from "./interface/IPagination";

export class PaginationList<PaginationObject> {
    constructor(
        public readonly content: PaginationObject[],

        public readonly pagination: IPaginationData
    ) {}
}