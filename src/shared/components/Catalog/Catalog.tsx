import { Grid } from "@mui/material";
import { Suspense, useCallback, useMemo, useState } from "react";
import CatalogList from "./components/CatalogList";
import SortControls from "./components/SortControls";
import { CatalogSortValue } from "@/constants/catalogSort";
import { Sort, SortingOrder } from "@/gql/graphql";

export interface CatalogProps {
    filter?: any;
    sorting?: boolean;
    pagination?: any;
    onAddToCart?: (id: string) => void;
    removeFromCart?: (id: string) => void;
    productsInCart?: string[];
}

function Catalog({ sorting, productsInCart, onAddToCart, removeFromCart }: CatalogProps) {
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

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                {sorting && <SortControls sortValue={sortValue} onSortValueChange={setSortValue} />}
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={3}>
                    <Suspense fallback={<>Loading...</>}>
                        <CatalogList sort={sort} productsInCart={productsInCart} onAddToCart={onAddToCart} removeFromCart={removeFromCart} />
                    </Suspense>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Catalog;
