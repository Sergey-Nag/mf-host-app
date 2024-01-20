import { Grid } from "@mui/material";
import { PropsWithChildren } from "react";
import { FilterControls, ProductFilterFormValues, ProductFilterOptions } from "./components/FilterControls/FilterControls";

export interface CatalogWithFilterProps {
    filter?: ProductFilterOptions;
    onFilterSubmit?(values: ProductFilterFormValues): void;
}

export function CatalogWithFilter({ filter, children, onFilterSubmit }: PropsWithChildren<CatalogWithFilterProps>) {
    if (!filter) return children;

    return (
        <Grid container columnSpacing={3}>
            <Grid item xs={3}>
                <FilterControls filter={filter} onFilterSubmit={onFilterSubmit} />
            </Grid>
            <Grid item xs={9}>
                {children}
            </Grid>
        </Grid>
    )
}