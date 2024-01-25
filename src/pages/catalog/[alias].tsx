import { Breadcrumbs } from '@/shared/components/Breadcrumbs/Breadcrumbs';
import { useQuery } from '@apollo/client';
import { Container } from '@mui/material';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';
import { tss } from 'tss-react/mui';
import Layout from '../layout';
import ProductDetail from '../../components/catalog/components/ProductDetail';
import { PRODUCT_DETAIL } from '../../queries/catalogQueries';

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
