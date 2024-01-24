import Head from 'next/head'
import Link from 'next/link';
import { Container, Typography } from '@mui/material';
import { ReactElement } from 'react';
import Layout from './layout';
import SliderSection from './sections/SliderSection/SliderSection';
import CatalogSection from './sections/CatalogSection/CatalogSection';
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";
import { appoloClient } from './_app';
import { gql } from '@apollo/client';
import { Category, PaginatedCategories, ProductOption } from '@/gql/graphql';
import { AppProps } from 'next/app';
import { ProductFilterOptions, ProductOptionsMap } from '@/shared/components/Catalog/components/FilterControls/FilterControls';

loadDevMessages();
loadErrorMessages();

export interface HomeProps {
    productFilter?: ProductFilterOptions;
}

interface PageDataResponse {
    categories: PaginatedCategories;
    products: {
        items: {
            tags: string[];
            options: ProductOption[];
        }[];
    };
}

export const getStaticProps = async () => {
    const { data } = await appoloClient.query<PageDataResponse>({
        query: gql`
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
        `
    });

    return {
        props: {
            productFilter: {
                categories: data.categories.items ?? undefined,
                tags: data.products.items.reduce<string[]>((acc, { tags }) => {
                    if (!tags) return acc;
                    const newTags = tags.filter((tag) => !acc.includes(tag));
                    return [...acc, ...newTags];
                }, []),
                options: data.products.items.reduce<ProductOptionsMap>((acc, { options }) => {
                    if (!options) return acc;
                    return options.reduce<ProductOptionsMap>((acc, { name, options }) => {
                        if (!name || !options) return acc;

                        const optionValues = options
                            .filter((option) => !acc[name]?.includes(option));
                        
                        return {
                            ...acc,
                            [name]: [...(acc[name] ?? []), ...optionValues],
                        };
                    }, acc);
                }, {}),
            }
        }
    }
}
export default function Home({ pageProps, ...rest }: AppProps<HomeProps>) {
    return (
        <>
            <Head>
                <title>E-shop</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <SliderSection />
            <CatalogSection filter={pageProps?.productFilter} />
            <Container>
                <Typography variant="h1">Hello world</Typography>
                <Link href="/admin">to admin</Link>
            </Container>
        </>
    )
}

Home.getLayout = function (page: ReactElement) {
    return <Layout>{page}</Layout>
}