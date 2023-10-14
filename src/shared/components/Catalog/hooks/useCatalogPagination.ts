import { PaginatedProducts, Pagination } from "@/gql/graphql";
import { useCallback, useMemo, useState } from "react";

export function useCatalogPagination(productsPerPage?: number) {
    const [page, setPage] = useState(1);
    const [paginationData, setPaginationData] = useState<Omit<PaginatedProducts, 'items'> | undefined>(undefined);

    const pages = paginationData?.totalItems && productsPerPage
        ? Math.ceil(paginationData?.totalItems / productsPerPage)
        : 4;

    const pagesMap = useMemo<{[key: number]: number} | undefined >(() => 
        productsPerPage && [...new Array(pages)].reduce((acc, n, i) => {
            acc[i + 1] = i * productsPerPage;
            return acc;
        }, {}),
    [pages, productsPerPage]);

    const pagination = useMemo<Pagination | undefined>(() => {
        if (pagesMap === undefined) return;

        return {
            start: pagesMap[page],
            amount: productsPerPage,
        };
    }, [productsPerPage, page, pagesMap]);

    return {
        page,
        setPage,
        pages,
        setPaginationData,
        pagination,
    }
}