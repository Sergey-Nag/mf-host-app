import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql(`
    query GetProducts($sort: [Sort] $pagination: Pagination) {
        products(
            sort: $sort
            pagination: $pagination
        ) {
            items {
                id
                alias
                name
                price
                coverPhotoUrl
                stock {
                    amount
                    lowStockAlert
                }
                sold
            }
            end
            itemsLeft
            totalItems
        }
    }
`);
