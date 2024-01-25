import { PaginatedProducts } from '@/gql/graphql';
import Layout from '@/pages/layout';
import { useMutation, useQuery } from '@apollo/client';
import { Box, Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormLabel, Grid, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { ReactElement, useEffect, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { tss } from 'tss-react/mui';
import * as Yup from 'yup';
import { CHECKOUT, GET_CART_PRODUCTS, GET_CUSTOMER_BY_IP } from '../../../queries/cartQueries';
import { PHONE_NUMBER_REGEXP } from '@/constants/regexp';
import { appoloClient } from '@/pages/_app';
import { clearCart } from '@/state/session/sesionSlice';

export interface CheckoutProps {
    pageProps: {
        ip: string;
        customer: any;
    }
}

export default function CheckoutPage({ pageProps }: CheckoutProps) {
    const router = useRouter();
    const { classes } = useStyles();
    const cart = useSelector((state: any) => state.session.cart);
    const dispatch = useDispatch();

    useEffect(() => {
        if (Object.keys(cart).length === 0) {
            router.replace('/cart');
        }
    }, [router, cart]);

    const { data } = useQuery<{ products: PaginatedProducts }>(GET_CART_PRODUCTS, {
        variables: {
            ids: Object.keys(cart),
        },
    });

    const [checkut, { data: checkoutResponse }] = useMutation(CHECKOUT);

    const { values, errors, touched, handleSubmit, handleChange, handleBlur } = useFormik({
        initialValues: {
            firstname: '',
            lastname: '',
            billingAddress: '',
            shippingAddress: '',
            email: '',
            phone: '',
            description: '',
        },
        validationSchema: Yup.object({
            firstname: Yup.string(),
            lastname: Yup.string(),
            billingAddress: Yup.string(),
            shippingAddress: Yup.string().required('Required'),
            email: Yup.string().email('Invalid email address').required('Required'),
            phone: Yup.string()
                .required('Required')
                .matches(PHONE_NUMBER_REGEXP, 'Invalid phone number'),
            description: Yup.string(),
        }),
        onSubmit: (values) => {
            const orderProducts = Object.keys(cart).map((id) => ({
                productId: id,
                amount: cart[id],
            }));

            const { id, ...existedCustomer } = pageProps.customer ?? {};
            const customer = existedCustomer ? undefined : {
                email: values.email,
                firstname: values.firstname,
                lastname: values.lastname,
                phone: values.phone,
                ip: pageProps.ip,
            };

            checkut({
                variables: {
                    input: {
                        customer,
                        orderProducts,
                        customerId: id ?? undefined,
                        description: values.description,
                        shippingAddress: values.shippingAddress,
                        billingAddress: values.billingAddress,
                    },
                }
            })
        },
    });
    const productsAmount = Object.keys(cart).reduce((acc, id) => acc + cart[id], 0);
    const productsPrice = (data?.products?.items ?? []).reduce((acc, product) => {
        const amount = cart[product!.id];
        return acc + product!.price * amount;
    }, 0);


    return (
        <Container>
            <Typography variant="h2">Checkout</Typography>
            <Divider sx={{ marginY: 3 }} />
            <Box sx={{ marginBottom: 3 }}>
                <Typography variant="h5">
                    <span>{productsAmount} products</span> - <span>${productsPrice}</span>
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2} marginBottom={4}>
                        <Grid item xs={4} alignSelf="center" textAlign="right">
                            <FormLabel>First name</FormLabel>
                        </Grid>
                        <Grid item xs={8}>
                            <TextField
                                fullWidth
                                className={classes.input}
                                name="firstname"
                                placeholder="John"
                                variant="outlined"
                                value={values.firstname}
                                onChange={handleChange}
                                error={touched.firstname && !!errors.firstname}
                                helperText={touched.firstname && errors.firstname}
                                onBlur={handleBlur}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} marginBottom={4}>
                        <Grid item xs={4} alignSelf="center" textAlign="right">
                            <FormLabel>Last name</FormLabel>
                        </Grid>
                        <Grid item xs={8}>
                            <TextField
                                fullWidth
                                className={classes.input}
                                name="lastname"
                                placeholder="Doe"
                                variant="outlined"
                                value={values.lastname}
                                onChange={handleChange}
                                error={touched.lastname && !!errors.lastname}
                                helperText={touched.lastname && errors.lastname}
                                onBlur={handleBlur}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} marginBottom={4}>
                        <Grid item xs={4} alignSelf="center" textAlign="right">
                            <FormLabel>Email</FormLabel>
                        </Grid>
                        <Grid item xs={8}>
                            <TextField
                                fullWidth
                                className={classes.input}
                                name="email"
                                variant="outlined"
                                placeholder="johndoe@example.com"
                                value={values.email}
                                onChange={handleChange}
                                error={touched.email && !!errors.email}
                                helperText={touched.email && errors.email}
                                onBlur={handleBlur}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} marginBottom={4}>
                        <Grid item xs={4} alignSelf="center" textAlign="right">
                            <FormLabel>Phone</FormLabel>
                        </Grid>
                        <Grid item xs={8}>
                            <TextField
                                fullWidth
                                className={classes.input}
                                name="phone"
                                variant="outlined"
                                placeholder="+1 123 456 7890"
                                value={values.phone}
                                onChange={handleChange}
                                error={touched.phone && !!errors.phone}
                                helperText={touched.phone && errors.phone}
                                onBlur={handleBlur}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} marginBottom={4}>
                        <Grid item xs={4} alignSelf="center" textAlign="right">
                            <FormLabel>Billing address</FormLabel>
                        </Grid>
                        <Grid item xs={8}>
                            <TextField
                                fullWidth
                                className={classes.input}
                                name="billingAddress"
                                variant="outlined"
                                placeholder="1234 Main St"
                                value={values.billingAddress}
                                onChange={handleChange}
                                error={touched.billingAddress && !!errors.billingAddress}
                                helperText={touched.billingAddress && errors.billingAddress}
                                onBlur={handleBlur}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} marginBottom={4}>
                        <Grid item xs={4} alignSelf="center" textAlign="right">
                            <FormLabel>Shipping address</FormLabel>
                        </Grid>
                        <Grid item xs={8}>
                            <TextField
                                fullWidth
                                className={classes.input}
                                name="shippingAddress"
                                variant="outlined"
                                placeholder="1234 Main St"
                                value={values.shippingAddress}
                                onChange={handleChange}
                                error={touched.shippingAddress && !!errors.shippingAddress}
                                helperText={touched.shippingAddress && errors.shippingAddress}
                                onBlur={handleBlur}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} marginBottom={4}>
                        <Grid item xs={12}>
                            <FormLabel>Description</FormLabel>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                multiline
                                name="description"
                                variant="outlined"
                                placeholder="1234 Main St"
                                value={values.description}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} marginBottom={4}>
                        <Grid item xs={4} alignSelf="center" textAlign="right">
                            <Button
                                type="submit"
                                variant="outlined"
                                color="error"
                                fullWidth
                                size="large"
                            >
                                Cancel
                            </Button>
                        </Grid>
                        <Grid item xs={8}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="success"
                                fullWidth
                                size="large"
                            >
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Box>
            <Dialog open={!!checkoutResponse}>
                <DialogTitle>
                    Orders is successfully created
                </DialogTitle>
                <DialogContent>
                    <Typography variant="body1">
                        Your order is successfully created. It&apos;s number is <strong>{checkoutResponse?.addOrder.id}</strong>
                        <br />
                        We will contact you soon.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="contained"
                        color="success"
                        onClick={() => {
                            router.push('/');
                            dispatch(clearCart());
                        }}
                    >
                        Go to home page
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}

const useStyles = tss.create(() => ({
    input: {
        position: 'relative',
        '& .MuiFormHelperText-root': {
            position: 'absolute',
            top: '100%',
        }
    }
}));

export async function getServerSideProps({ req }: any) {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    
    const { data } = await appoloClient.query<any>({
        query: GET_CUSTOMER_BY_IP,
        variables: {
            ip,
        },
    });

    return {
        props: {
            ip,
            customer: data?.customer,
        }
    }
}

CheckoutPage.getLayout = function (page: ReactElement) {
    return <Layout>{page}</Layout>
}
