import { Grid } from "@mui/material";
import { Suspense } from "react";
import { CatalogWithFilter } from "./CatalogWithFilter";
import CatalogList from "./components/CatalogList";
import CatalogListSkeleton from "./components/CatalogListSkeleton";
import { ProductFilterOptions } from "./components/FilterControls/FilterControls";
import PaginationControls from "./components/PaginationControls";
import SortControls from "./components/SortControls";
import { useCatalogFilter } from "./hooks/useCatalogFilter";
import { useCatalogPagination } from "./hooks/useCatalogPagination";
import { useCatalogSorting } from "./hooks/useCatalogSorting";

export interface CatalogProps {
    filter?: ProductFilterOptions;
    sorting?: boolean;
    pagination?: boolean;
    productsPerPage?: number;
    onAddToCart?: (id: string) => void;
    removeFromCart?: (id: string) => void;
}

function Catalog({ sorting, filter, pagination: isPagination, productsPerPage, onAddToCart, removeFromCart }: CatalogProps) {
    const { sortValue, setSortValue, sort } = useCatalogSorting();
    const { page, setPage, pages, setPaginationData, pagination } = useCatalogPagination(productsPerPage);
    const { productFilter, setRestFilter, onAvailableChange } = useCatalogFilter();

    return (
        <CatalogWithFilter filter={filter} onFilterSubmit={setRestFilter}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    {sorting && (
                        <SortControls
                            sortValue={sortValue}
                            onSortValueChange={setSortValue}
                            onAvailableChange={onAvailableChange}
                        />
                    )}
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Suspense fallback={<CatalogListSkeleton itemsAmount={productsPerPage} />}>
                            <CatalogList
                                sort={sort}
                                pagination={pagination}
                                filter={productFilter}
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
        </CatalogWithFilter>
    )
}

export default Catalog;
