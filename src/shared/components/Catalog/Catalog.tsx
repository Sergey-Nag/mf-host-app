import { Grid } from "@mui/material";
import { Suspense } from "react";
import CatalogList from "./components/CatalogList";
import CatalogListSkeleton from "./components/CatalogListSkeleton";
import PaginationControls from "./components/PaginationControls";
import SortControls from "./components/SortControls";
import { useCatalogPagination } from "./hooks/useCatalogPagination";
import { useCatalogSorting } from "./hooks/useCatalogSorting";

export interface CatalogProps {
    filter?: any;
    sorting?: boolean;
    pagination?: boolean;
    productsPerPage?: number;
    onAddToCart?: (id: string) => void;
    removeFromCart?: (id: string) => void;
    productsInCart?: string[];
}

function Catalog({ sorting, pagination: isPagination, productsPerPage, productsInCart, onAddToCart, removeFromCart }: CatalogProps) {
    const { sortValue, setSortValue, sort } = useCatalogSorting();
    const { page, setPage, pages, setPaginationData, pagination } = useCatalogPagination(productsPerPage);

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                {sorting && <SortControls sortValue={sortValue} onSortValueChange={setSortValue} />}
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={3}>
                    <Suspense fallback={<CatalogListSkeleton itemsAmount={productsPerPage} />}>
                        <CatalogList
                            sort={sort}
                            pagination={pagination}
                            productsInCart={productsInCart}
                            onAddToCart={onAddToCart}
                            removeFromCart={removeFromCart}
                            onDataLoad={setPaginationData}
                        />
                    </Suspense>
                </Grid>
            </Grid>
            {isPagination && (
                <Grid item xs={12}>
                    <PaginationControls pages={pages} page={page} onPageChange={setPage} />
                </Grid>
            )}
        </Grid>
    )
}

export default Catalog;
