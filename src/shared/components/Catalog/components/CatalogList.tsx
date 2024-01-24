import { PaginatedProducts, Pagination, ProductFilter, Sort } from "@/gql/graphql";
import { useQuery, useSuspenseQuery } from "@apollo/client";
import { GET_PRODUCTS } from "../queries";
import { Grid, Paper, Typography } from "@mui/material";
import ProductCard from "./ProductCard";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectSessionState } from "@/state/session/customerSlice";
import { AppState } from "@/state/session/store";

export interface CatalogListProps {
    sort?: Sort[];
    filter?: ProductFilter;
    pagination?: Pagination;
    onAddToCart?: (id: string) => void;
    removeFromCart?: (id: string) => void;
    onDataLoad?: (pagination: Omit<PaginatedProducts, 'items'>) => void;
}

export default function CatalogList({ sort, filter, pagination, onAddToCart, onDataLoad, removeFromCart, }: CatalogListProps) {
    const { data } = useSuspenseQuery<{ products: PaginatedProducts }>(GET_PRODUCTS, {
        variables: {
            filter,
            sort,
            pagination
        },
    });
    const cart = useSelector((state: AppState) => state.session.cart);

    useEffect(() => {
        const { end, itemsLeft, totalItems } = data.products;
        onDataLoad?.({ end, itemsLeft, totalItems });
    }, [data, onDataLoad]);

    const inCart = (id: string) => {
        return cart[id] ?? false;
    }

    return (
        <>
            {data && data.products.items?.map((prod) => prod && (
                <Grid item key={prod.id} xs={6} md={4} lg={3}>
                    <ProductCard product={prod} alreadyInCart={inCart(prod.id)} onAddToCart={onAddToCart} removeFromCart={removeFromCart} />
                </Grid>
            ))}
            {data && data.products.items?.length === 0 && (
                <Grid item xs={12}>
                    <Typography variant="h3" align="center" paddingY={15}>Products not found!</Typography>
                </Grid>
            )}
        </>
    )
}