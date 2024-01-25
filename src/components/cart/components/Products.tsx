import { PaginatedProducts } from "@/gql/graphql";
import ButtonLink from "@/shared/components/ButtonLink";
import { addProduct, removeProduct } from "@/state/session/sesionSlice";
import { useQuery } from "@apollo/client";
import { Box, CircularProgress } from "@mui/material";
import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { GET_CART_PRODUCTS } from "../../../queries/cartQueries";
import { ProductsTable } from "./ProductsTable";

export interface ProductsProps {
    products: Record<string, number>;
}

export interface CartProduct {
    id: string;
    name: string;
    price: number;
    imageUrl: string;
    maxQuantity: number;
}


export function Products({ products }: ProductsProps) {
    const { data, loading } = useQuery<{ products: PaginatedProducts }>(GET_CART_PRODUCTS, {
        variables: {
            ids: Object.keys(products),
        },
    });

    const productItems = useMemo(() =>
        (data?.products?.items ?? []).reduce<CartProduct[]>((acc, prod): CartProduct[] => {
            acc.push({
                id: prod!.id,
                name: prod!.name,
                price: prod!.price,
                imageUrl: prod!.coverPhoto?.mediumUrl ?? prod?.coverPhoto?.url ?? '/assets/image-placeholder.png',
                maxQuantity: prod!.stock.amount,
            });

            return acc;
        }, []), [data]);

    const { totalProduct, totalPrice } = useMemo(() => {
        return productItems.reduce<{ totalProduct: Record<string, number>, totalPrice: number }>((acc, prod) => {
            acc.totalProduct[prod!.id] = products[prod!.id] * prod!.price;
            acc.totalPrice += prod!.price * products[prod!.id];
            return acc;
        }, { totalProduct: {}, totalPrice: 0 });
    }, [productItems, products]);

    const dispatch = useDispatch();

    const removeFromCart = (id: string) => {
        dispatch(removeProduct({ id }));
    }

    const decreaseProduct = (id: string) => {
        dispatch(removeProduct({ id, amount: 1 }));
    }

    const increaseProduct = (id: string) => {
        dispatch(addProduct({ id, amount: 1 }));
    }

    const productsAmount = Object.values(products).reduce((acc, amount) => acc + amount, 0);
    return (
        <>
            {loading && (
                <Box p={2} textAlign="center">
                    <CircularProgress />
                </Box>
            )}
            {!loading && products && (
                <ProductsTable
                    products={productItems}
                    productsQuantity={products}
                    totalProuctsPrice={totalProduct}
                    totalPrice={totalPrice}
                    removeFromCart={removeFromCart}
                    increaseProduct={increaseProduct}
                    decreaseProduct={decreaseProduct}
                />
            )}
            <Box p={2} textAlign="right">
                <ButtonLink href="cart/checkout"
                    variant="contained"
                    color="success"
                    size="large"
                >
                    Checkout ({productsAmount} products)
                </ButtonLink>
            </Box>
        </>
    );
}