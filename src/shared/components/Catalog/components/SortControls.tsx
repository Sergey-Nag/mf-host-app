import { CatalogSortValue } from "@/constants/catalogSort";
import { Box, Grid, IconButton, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useState } from "react";

export interface SortControlsProps {
    sortValue?: CatalogSortValue,
    onSortValueChange?: (value: CatalogSortValue) => void;
}

export default function SortControls({ sortValue, onSortValueChange }: SortControlsProps) {
    return (
        <Box bgcolor="lightgray" p={1}>
            <Grid container>
                <Grid item xs={10}>
                    <Select size="small" value={sortValue} onChange={({ target }) => {
                        onSortValueChange?.(target.value as CatalogSortValue);
                    }}>
                        <MenuItem value={CatalogSortValue.Popular}>Popular</MenuItem>
                        <MenuItem value={CatalogSortValue.New}>New</MenuItem>
                        <MenuItem value={CatalogSortValue.Old}>Old</MenuItem>
                    </Select>
                </Grid>
                <Grid item xs={2}>
                    <IconButton></IconButton>
                </Grid>
            </Grid>
        </Box>
    )
}