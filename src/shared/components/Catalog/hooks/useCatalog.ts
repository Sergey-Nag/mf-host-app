import { CatalogSortValue } from "@/constants/catalogSort";
import { SortingOrder, PaginatedProducts, Pagination } from "@/gql/graphql";
import { useState, useMemo, useCallback } from "react";

export function useCatalog(
    sorting?: boolean,
    productsInCart?: string[],
    onAddToCart?: (id: string) => void,
    removeFromCart?: (id: string) => void
) {
    const [sortValue, setSortValue] = useState(CatalogSortValue.Popular);

    const sort = useMemo(() => {
        switch (sortValue) {
        case CatalogSortValue.Popular:
            return;
        case CatalogSortValue.New:
            return [{
                field: 'createdISO',
                order: SortingOrder.Desc
            }];
        case CatalogSortValue.Old:
            return [{
                field: 'createdISO',
                order: SortingOrder.Asc
            }];
        }
    }, [sortValue]);

    return {
        sortValue,
        setSortValue,
        sort,
    }
}
