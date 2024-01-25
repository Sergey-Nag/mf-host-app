import { PaginatedCategories, ProductFilter, ProductOption } from '@/gql/graphql';
import Catalog from '@/shared/components/Catalog/Catalog';
import { ProductFilterOptions, ProductOptionsMap } from '@/shared/components/Catalog/components/FilterControls/FilterControls';
import { addProduct, removeProduct } from '@/state/session/sesionSlice';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import { Box, Container, IconButton, InputBase, Paper } from '@mui/material';
import { AppProps } from 'next/app';
import { ReactElement, useState } from 'react';
import { useDispatch } from 'react-redux';
import { tss } from 'tss-react/mui';
import { appoloClient } from '../_app';
import Layout from '../layout';
import { FILTER_OPTIONS } from '../../queries/catalogQueries';

export interface CatalogPageProps {
    productFilter?: ProductFilterOptions;
    searchParams: {
        search: string;
    }
}

interface FilterOptionsResponse {
    categories: PaginatedCategories;
    products: {
        items: {
            tags: string[];
            options: ProductOption[];
        }[];
    };
}

const useStyles = tss.create(({ theme }) => ({
    searchBox: {
        padding: theme.spacing(1),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    searchInput: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    button: {
        padding: theme.spacing(1),
    },
    searchForm: {
        display: 'flex',
        padding: theme.spacing(1),
        width: 500,
    }
}));

export default function CatalogPage({ pageProps }: AppProps<CatalogPageProps>) {
    const { classes } = useStyles();
    const [externalFilter, setExternalFilter] = useState<ProductFilter | undefined>({});
    const dispatch = useDispatch();
    const onAddToCart = (id: string) => {
        dispatch(addProduct({ id, amount: 1 }));
    };
    const removeFromCart = (id: string) => {
        dispatch(removeProduct({ id }));
    };

    const [search, setSearch] = useState<string>('');
    const handleSubmitSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setExternalFilter({
            ...externalFilter,
            name: search
        });
    }

    const handleSearchClear = () => {
        setSearch('');
        setExternalFilter({
            ...externalFilter,
            name: undefined
        });
    }

    return (
        <Container maxWidth="xl">
            <Box marginBottom={4} className={classes.searchBox}>
                <Paper component="form" className={classes.searchForm} elevation={6} onSubmit={handleSubmitSearch}>
                    <InputBase
                        className={classes.searchInput}
                        placeholder="Search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    {search.length > 0 && (
                        <IconButton
                            type="button"
                            className={classes.button}
                            aria-label="clear"
                            onClick={handleSearchClear}
                        >
                            <CloseIcon />
                        </IconButton>
                    )}
                    <IconButton
                        type="submit"
                        className={classes.button}
                        aria-label="search"
                    >
                        <SearchIcon />
                    </IconButton>
                </Paper>
            </Box>
            <Box>
                <Catalog
                    filterOptions={pageProps.productFilter}
                    externalFilter={externalFilter}
                    productsPerPage={50}
                    pagination
                    sorting
                    onAddToCart={onAddToCart}
                    removeFromCart={removeFromCart}
                />
            </Box>
        </Container>
    )
}

CatalogPage.getLayout = (page: ReactElement) => <Layout>{page}</Layout>

export const getStaticProps = async () => {
    const { data } = await appoloClient.query<FilterOptionsResponse>({
        query: FILTER_OPTIONS
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
