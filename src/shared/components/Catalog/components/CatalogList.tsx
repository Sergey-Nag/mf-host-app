import { PaginatedProducts, ProductFilter, Sort } from "@/gql/graphql";
import { useQuery, useSuspenseQuery } from "@apollo/client";
import { GET_PRODUCTS } from "../queries";
import { Grid, Paper } from "@mui/material";
import ProductCard from "./ProductCard";
import { useState } from "react";

export interface CatalogListProps {
    sort?: Sort[];
    filter?: ProductFilter;
    onAddToCart?: (id: string) => void;
    removeFromCart?: (id: string) => void;
    productsInCart?: string[]
}

export default function CatalogList({ sort, filter, productsInCart, onAddToCart,removeFromCart, }: CatalogListProps) {
    const { data } = useSuspenseQuery<{ products: PaginatedProducts }>(GET_PRODUCTS, {
        variables: {
            filter,
            sort,
        },
    });

    const inCart = (id: string) => {
        if (!productsInCart) return;

        return productsInCart.reduce((acc, prodId) => {
            if (prodId === id) {
                return acc + 1;
            }
            return acc;
        }, 0);
    }

    return (
        <>
            {data && data.products.items?.map((prod) => prod && (
                <Grid item key={prod.id} xs={6} md={4} lg={3}>
                    <ProductCard product={prod} alreadyInCart={inCart(prod.id)} onAddToCart={onAddToCart} removeFromCart={removeFromCart} />
                </Grid>
            ))}
        </>
    )
}