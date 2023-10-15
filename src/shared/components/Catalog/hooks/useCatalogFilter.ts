import { ProductFilter, ProductOptionInput } from "@/gql/graphql";
import { useMemo, useState } from "react";
import { ProductFilterFormValues } from "../components/FilterControls/FilterControls";
import {
    MAX_FILTER_PRICE,
    MIN_FILTER_PRICE,
    PRICE_DECIMALS,
} from "../constants";

export function useCatalogFilter() {
    const [available, setAvailable] = useState<Partial<ProductFilter>>();
    const [restFilter, setRestFilter] = useState<ProductFilterFormValues>();

    const onAvailableChange = (available: boolean) => {
        setAvailable(
            available
                ? {
                    stock: {
                        amount: "> 0",
                    },
                }
                : undefined
        );
    };

    const productFilter = useMemo(
        () => {
            const options: ProductOptionInput[] | undefined = restFilter && Object.keys(restFilter?.options ?? {}).length
                ? Object.entries(restFilter.options).map(([name, options]) => ({ name, options }))
                : undefined;

            return {
                ...available,
                categoriesId: restFilter?.categories.length
                    ? restFilter.categories
                    : undefined,
                tags: restFilter?.tags.length ? restFilter.tags : undefined,
                price:
                    (restFilter?.price?.min || restFilter?.price?.max) &&
                        (
                            restFilter.price.min !== MIN_FILTER_PRICE.toFixed(PRICE_DECIMALS) ||
                            restFilter.price.max !== MAX_FILTER_PRICE.toFixed(PRICE_DECIMALS)
                        )
                        ? `>= ${restFilter.price.min} && <= ${restFilter.price.max}`
                        : undefined,
                options,
            }
        },
        [available, restFilter]
    );

    return {
        productFilter,
        onAvailableChange,
        setRestFilter,
    };
}
