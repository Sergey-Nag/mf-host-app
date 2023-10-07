import Catalog from "@/shared/components/Catalog/Catalog";
import Section from "@/shared/components/Section";
import { addProducts, removeProducts, selectSessionState } from "@/state/session/sesionSlice";
import { Divider, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

function CatalogSection() {
    const { cart } = useSelector(selectSessionState);
    const dispatch = useDispatch();
    const onAddToCart = (id: string) => {
        dispatch(addProducts([id]));
    };
    const removeFromCart = (id: string) => {
        dispatch(removeProducts([id]));
    };

    return (
        <Section>
            <Typography variant="h2">Catalog</Typography>
            <Divider />
            <Catalog onAddToCart={onAddToCart} removeFromCart={removeFromCart} productsInCart={cart} sorting />
        </Section>
    )
}

export default CatalogSection;
