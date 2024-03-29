import { Category } from "@/gql/graphql";
import Catalog from "@/shared/components/Catalog/Catalog";
import { ProductFilterOptions } from "@/shared/components/Catalog/components/FilterControls/FilterControls";
import Section from "@/shared/components/Section";
import { addProduct, removeProduct, selectSessionState } from "@/state/session/sesionSlice";
import { Divider, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

export interface CatalogSectionProps {
    filter?: ProductFilterOptions;
}

function CatalogSection({ filter }: CatalogSectionProps) {
    const dispatch = useDispatch();
    const onAddToCart = (id: string) => {
        dispatch(addProduct({ id, amount: 1 }));
    };
    const removeFromCart = (id: string) => {
        dispatch(removeProduct({ id }));
    };

    return (
        <Section>
            <Typography variant="h2">Catalog</Typography>
            <Divider />
            <Catalog 
                sorting
                pagination
                filterOptions={filter}
                productsPerPage={4}
                onAddToCart={onAddToCart} 
                removeFromCart={removeFromCart}
            />
            <Divider />
            {/* <Catalog /> */}
        </Section>
    )
}

export default CatalogSection;
