import { gql } from '@apollo/client';

export const PRODUCT_DETAIL = gql`
    query ProductDetail($alias: String!) {
        product(find: { alias: $alias }) {
            id
            name
            price
            description
            coverPhoto {
                url
                alt
            }
            photos {
                url
                alt
                id
            }
            stock {
                amount
            }
            categories {
                id
                name
                alias
            }
            characteristics {
                name
                value
            }
            options {
                name
                options
            }
            tags
        }
    }
`;

export const FILTER_OPTIONS = gql`
    query Categories {
        categories {
            items {
                id
                name
                alias
            }
        }
        products {
            items {
                tags
                options {
                    name
                    options
                }
            }
        }
    }
`;
