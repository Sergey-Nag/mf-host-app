import { graphql } from "@/gql";
import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql(`
    query GetProducts($sort: [Sort]) {
        products(
            sort: $sort
        ) {
            items {
                id
                alias
                name
                price
            }
        }
    }
`);
