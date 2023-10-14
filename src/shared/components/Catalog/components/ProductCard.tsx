import { Product } from "@/gql/graphql";
import { Badge, Box, Button, Card, CardContent, CardMedia, Grid, Tooltip, Typography } from "@mui/material";
import Image from "next/image";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import { tss } from "tss-react/mui";
import { getPriceFormatText } from "@/utils/getPriceFormatText";
import Link from "next/link";

export interface ProductCardProps {
    product: Product;
    onAddToCart?: (id: string) => void;
    removeFromCart?: (id: string) => void;
    alreadyInCart?: number;
}

export default function ProductCard({ product, onAddToCart, removeFromCart, alreadyInCart }: ProductCardProps) {
    const { classes } = useStyles();
    const coverPhotoUrl = product.coverPhotoUrl ?? '/assets/image-placeholder.png';
    const showLowStock = product.stock.lowStockAlert !== 0 && product.stock.amount < product.stock.lowStockAlert;
    const canAddMore = product.stock.amount - (alreadyInCart ?? 0) > 0;

    return (
        <Box className={classes.product}>
            <Link className={classes.product} href={`/product/${product.alias}`}>
                <Badge className={classes.lowStockBadge} badgeContent={showLowStock ? 'Low stock!' : null} color="warning">
                    <div className={classes.coverPhotoWrapp}>
                        <Image
                            placeholder="blur"
                            blurDataURL="/assets/image-placeholder.png"
                            className={classes.coverPhoto}
                            alt={product.name}
                            src={coverPhotoUrl}
                            width={0}
                            height={0}
                            sizes="100vw"
                        />
                    </div>
                </Badge>
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
            </Link>
            <Grid container spacing={1}>
                <Grid item xs={!!alreadyInCart ? 6 : 12}>
                    <Tooltip title={canAddMore ? null : 'No more items available!'} placement="top" arrow>
                        <span>
                            <Button
                                startIcon={<AddShoppingCartIcon />}
                                fullWidth
                                variant="contained"
                                disabled={!canAddMore}
                                onClick={onAddToCart && (() => {
                                    onAddToCart(product.id);
                                })}
                            >{!!alreadyInCart ? 'Add' : 'Add to cart'}</Button>
                        </span>
                    </Tooltip>
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

const useStyles = tss.withName('uniqsukanameProductCard').withNestedSelectors().create(({ theme, classes }) => ({
    product: {
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing(1),
        // TODO: Fix styles hydration to enable this
        // [`a& .${classes.price}`]: { 
        //     color: 'black',
        //     textDecoration: 'unset',
        //     fontSize: '1.1rem'
        // }
    },
    coverPhotoWrapp: {
        position: 'relative',
        width: '100%',
        paddingBottom: '100%',
    },
    coverPhoto: {
        position: 'absolute',
        objectFit: 'cover',
        width: '100%',
        height: '100%'
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
    },
    lowStockBadge: {
        '& .MuiBadge-badge': {
            transform: 'none'
        }
    }
}));