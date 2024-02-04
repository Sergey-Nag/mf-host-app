import { gql } from '@apollo/client';

export const GET_CART_PRODUCTS = gql(`
    query GetCartProducts($ids: [ID]) {
        products(
            filter: {
                ids: $ids
            }
        ) {
            items {
                id
                name
                price
                coverPhoto {
                    url
                    alt
                    mediumUrl
                }
                stock {
                    amount
                }
                sold
            }
            totalItems
        }
    }
`);

export const CHECKOUT = gql(`
    mutation Checkout($input: NewOrderInput!) {
        addOrder(input: $input) {
            id
        }
    }
`);