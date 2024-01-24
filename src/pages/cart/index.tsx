import { AppState } from "@/state/session/store";
import { Box, Container, Divider, Typography } from "@mui/material";
import { ReactElement } from "react";
import { useSelector } from "react-redux";
import Layout from "../layout";
import { Products } from "./components/Products";
import { useMutation } from "@apollo/client";

export interface CartPageProps {
    ip: string;
}

export async function getServerSideProps({ req }: any) {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    return { props: { ip }};
}

export default function CartPage({ pageProps }: { pageProps: CartPageProps }) {
    const cart = useSelector((state: AppState) => state.session.cart);
    return (
        <Container>
            <Typography variant="h2">Cart</Typography>
            <Divider sx={{ marginY: 3 }} />
            <Box sx={{ marginBottom: 3 }}>
                {Object.keys(cart).length > 0 ? (
                    <Products products={cart} />
                ) : (
                    <Box textAlign="center" paddingY={5}>
                        <Typography variant="h4" color="lightgray">Your cart is empty</Typography>
                    </Box>
                )}
            </Box>
        </Container>
    );
}

CartPage.getLayout = function (page: ReactElement) {
    return <Layout>{page}</Layout>
}