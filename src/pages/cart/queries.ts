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

export const GET_CUSTOMER_BY_IP = gql(`
    query Customer($ip: String!) {
        customer(find: {
            ip: $ip
        }) {
            id
            ip
            firstname
            lastname
            email
            phone
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