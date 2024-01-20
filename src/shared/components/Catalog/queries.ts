import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql(`
    query GetProducts($sort: [Sort] $pagination: Pagination $filter: ProductFilter) {
        products(
            sort: $sort
            pagination: $pagination
            filter: $filter
        ) {
            items {
                id
                alias
                name
                price
                coverPhoto {
                    url
                    alt
                }
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
