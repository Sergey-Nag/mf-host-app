import { Product } from "@/gql/graphql";
import { Box, Button, Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import Image from "next/image";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import { tss } from "tss-react/mui";
import { getPriceFormatText } from "@/utils/getPriceFormatText";

export interface ProductCardProps {
    product: Product;
    onAddToCart?: (id: string) => void;
    removeFromCart?: (id: string) => void;
    alreadyInCart?: number;
}

export default function ProductCard({ product, onAddToCart, removeFromCart, alreadyInCart }: ProductCardProps) {
    const { classes } = useStyles();
    const coverPhotoUrl = product.coverPhotoUrl ?? '/assets/image-placeholder.png';

    return (
        <Box className={classes.product}>
            <Image
                className={classes.coverPhoto}
                alt={product.name}
                src={coverPhotoUrl}
                width={0}
                height={0}
                sizes="100vw"
            />
            <Grid container>
                <Grid item xs={9}>
                    <Typography className={classes.name} variant="body1">
                        {product.name + product.name + product.name}
                    </Typography>
                </Grid>
                <Grid item xs={3}>
                    <Typography className={classes.price}>${getPriceFormatText(product.price ?? 0)}</Typography>
                </Grid>
            </Grid>
            <Grid container spacing={1}>
                <Grid item xs={!!alreadyInCart ? 6 : 12}>
                    <Button
                        startIcon={<AddShoppingCartIcon />}
                        fullWidth
                        variant="contained"
                        onClick={onAddToCart && (() => {
                            onAddToCart(product.id);
                        })}
                    >Add to cart</Button>
                </Grid>
                {!!alreadyInCart && (
                    <Grid item xs={6}>
                        <Button
                            startIcon={<RemoveShoppingCartIcon />}
                            fullWidth
                            color="error"
                            variant="outlined"
                            onClick={removeFromCart && (() => {
                                removeFromCart(product.id);
                            })}
                        >Remove {alreadyInCart}</Button>
                    </Grid>
                )}
            </Grid>
        </Box>
    );
}

const useStyles = tss.create(({ theme }) => ({
    product: {
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing(1)
    },
    coverPhoto: {
        objectFit: 'cover',
        width: '100%',
        height: 'auto'
    },
    name: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        textWrap: 'nowrap'
    },
    price: {
        fontWeight: theme.typography.fontWeightBold,
        fontSize: '1rem',
        textAlign: 'right'
    }
}));