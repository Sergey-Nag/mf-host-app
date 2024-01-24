import React, { ReactElement } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { PRODUCT_DETAIL } from './queries';
import { Container, Typography, Skeleton, Button, Divider, Grid } from '@mui/material';
import { tss } from 'tss-react/mui';
import ProductDetail from './components/ProductDetail';
import Layout from '../layout';
import { Breadcrumbs } from '@/shared/components/Breadcrumbs/Breadcrumbs';

const useStyles = tss.create(({ theme }) => ({
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
}));

export default function ProductDetailPage() {
    const { classes } = useStyles();
    const router = useRouter();
    const { alias } = router.query;

    const { data } = useQuery(PRODUCT_DETAIL, {
        variables: { alias },
    });

    const { product } = data ?? {};

    return (
        <Container maxWidth="lg" className={classes.container}>
            <Breadcrumbs />
            {product && <ProductDetail product={product} />}
        </Container>
    );
};

ProductDetailPage.getLayout = (page: ReactElement) => {
    return <Layout>{page}</Layout>
}
