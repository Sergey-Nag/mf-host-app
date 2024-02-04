import { Breadcrumbs } from '@/shared/components/Breadcrumbs/Breadcrumbs';
import { Container } from '@mui/material';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { ReactElement } from 'react';
import { tss } from 'tss-react/mui';
import ProductDetail from '../../components/catalog/components/ProductDetail';
import { PRODUCTS_ALIAS, PRODUCT_DETAIL } from '../../queries/catalogQueries';
import { appoloClient } from '../_app';
import Layout from '../layout';

const useStyles = tss.create(({ theme }) => ({
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
}));

export interface IProductDetails {
    coverPhoto: {
        url: string;
        alt?: string;
    };
    photos?: { url: string, alt: string, id: string }[];
    id: string;
    name: string,
    price: number,
    description: string,
    categories: { alias: string, name: string, id: string }[];
    tags: string[];
    characteristics: { name: string, value: string }[];
    options: { name: string, options: string[] }[];
    stock: { amount: number };
}

export interface ProductDetailPageProps {
    product: IProductDetails;
}

export default function ProductDetailPage({ pageProps }: AppProps<ProductDetailPageProps>) {
    const { classes } = useStyles();  
    const { product } = pageProps ?? {};

    return (
        <>
            <Head>
                <title>{product.name}</title>
                <meta property="og:title" content={product.name} />
                {product.description && (
                    <>
                        <meta name="description" content={product.description} />
                        <meta property="og:description" content={`${product.description.slice(0, 100)}...`} />
                    </>
                )}
                {product.coverPhoto && (
                    <meta property="og:image" content={product.coverPhoto.url} />
                )}
                {product.tags && product.tags.length > 0 && (
                    <meta name="keywords" content={product.tags.join(', ')} />
                )}
            </Head>
            <Container maxWidth="lg" className={classes.container}>
                <Breadcrumbs />
                <ProductDetail product={product} />
            </Container>
        </>
    );
};

export const getStaticProps = async ({ params, }: { params: { alias: string } }) => {
    const { data } = await appoloClient.query<any>({
        query: PRODUCT_DETAIL,
        variables: params,
    });

    return {
        props: { product: data.product },
    };
}

export const getStaticPaths = async () => {
    const { data } = await appoloClient.query<any>({
        query: PRODUCTS_ALIAS,
    });

    return {
        paths: data.products.items.map(({ alias }: { alias: string }) => ({ params: { alias } })),
        fallback: false,
    };
}

ProductDetailPage.getLayout = (page: ReactElement) => {
    return <Layout>{page}</Layout>
}
