import { CatalogSortValue } from "@/constants/catalogSort";
import { SortingOrder } from "@/gql/graphql";
import { useMemo, useState } from "react";

export function useCatalogSorting() {
    const [sortValue, setSortValue] = useState(CatalogSortValue.Popular);

    const sort = useMemo(() => {
        switch (sortValue) {
        case CatalogSortValue.Popular:
            return [{
                field: 'sold',
                order: SortingOrder.Desc
            },{
                field: 'createdISO',
                order: SortingOrder.Asc
            }];
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
