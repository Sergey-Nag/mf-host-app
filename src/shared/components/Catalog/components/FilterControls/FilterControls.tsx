import { Category, ProductOption, ProductOptionInput } from "@/gql/graphql";
import { Box, Button } from "@mui/material";
import { useFormik } from "formik";
import { tss } from "tss-react/mui";
import { MAX_FILTER_PRICE, MIN_FILTER_PRICE, PRICE_DECIMALS } from "../../constants";
import { ChipsControl } from "./components/ChipsControl";
import { PriceRangeControl } from "./components/PriceRangeControl";
import { validationSchema } from "./validationSchema";
import { OptionsControl } from "./components/OptionsControl";

export type ProductOptionsMap = Record<string, ProductOption['options']>;

export interface ProductFilterOptions {
    categories?: Category[];
    tags?: string[];
    options?: ProductOptionsMap;
}

export interface ProductFilterFormValues {
    categories: string[];
    tags: string[];
    price: {
        min: string;
        max: string;
    };
    options: ProductOptionsMap;
};

export interface FilterControlsProps {
    filter?: ProductFilterOptions;
    onFilterSubmit?(values: ProductFilterFormValues): void;
}

const initialFilterValues: ProductFilterFormValues = {
    categories: [],
    tags: [],
    price: {
        min: MIN_FILTER_PRICE.toFixed(PRICE_DECIMALS),
        max: MAX_FILTER_PRICE.toFixed(PRICE_DECIMALS),
    },
    options: {}
};

export function FilterControls({ filter = {}, onFilterSubmit }: FilterControlsProps) {
    const { categories, tags, options } = filter;
    const { classes } = useStyles();
    const { values, errors, handleSubmit, handleChange, handleReset, dirty } = useFormik<ProductFilterFormValues>({
        initialValues: initialFilterValues,
        validationSchema,
        onSubmit: (values) => {
            values.options = Object.keys(values.options).reduce<ProductOptionsMap>((acc, key) => {
                const value = values.options[key];
                if (value?.length) {
                    acc[key] = value;
                }
                return acc;
            }, {});

            onFilterSubmit?.(values);
        },
        onReset: () => {
            onFilterSubmit?.(initialFilterValues);
        }
    });

    return (
        <Box bgcolor="lightgray" p={1}>
            <form className={classes.form} onSubmit={handleSubmit} onReset={handleReset}>
                <PriceRangeControl
                    classes={classes}
                    values={values.price}
                    errors={errors}
                    onChange={(values) => {
                        handleChange({
                            target: {
                                name: 'price',
                                value: values,
                            }
                        });
                    }}
                />
                {categories && (
                    <ChipsControl
                        label="Categories"
                        classes={classes}
                        value={values.categories}
                        options={categories.map(({ id, name }) => ({ id, value: name }))}
                        onChange={(value) => {
                            handleChange({
                                target: {
                                    name: 'categories',
                                    value,
                                }
                            });
                        }}
                        placeholder="Clothes, shoes, etc."
                    />
                )}
                {tags && (
                    <ChipsControl
                        label="Tags"
                        classes={classes}
                        value={values.tags}
                        options={tags.map((tag, i) => ({ id: tag, value: tag }))}
                        onChange={(value) => {
                            handleChange({
                                target: {
                                    name: 'tags',
                                    value,
                                }
                            });
                        }}
                        placeholder={`${tags.slice(0, 2).join(', ')}, etc.`}
                    />
                )}
                {options && (
                    <OptionsControl
                        options={options}
                        value={values.options}
                        classes={classes}
                        onChange={(value) => {
                            handleChange({
                                target: {
                                    name: 'options',
                                    value,
                                }
                            });
                        }}
                    />
                )}
                {dirty && (
                    <>
                        <Button type="submit" variant="contained" color="success">Apply</Button>
                        <Button type="reset" variant="contained" color="error">Reset</Button>
                    </>
                )}
            </form>
        </Box>
    )
}

const useStyles = tss.create(({ theme }) => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing(1),
    },
    control: {
        padding: `0 ${theme.spacing(1)} ${theme.spacing(2)}`,
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
    rangeInputsWrapper: {
        alignItems: 'center',
        textAlign: 'center',
        paddingBottom: theme.spacing(1),
        color: theme.palette.text.secondary,
    },
    labelText: {
        // first letter uppercase
        textTransform: 'capitalize',
    },
    rangeDash: {
        fontSize: '1.1rem',
    },
}));
