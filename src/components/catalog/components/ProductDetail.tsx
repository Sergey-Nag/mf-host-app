import { QuantityCounter } from '@/shared/components/QuantityCounter';
import { addProduct, removeProduct } from '@/state/session/sesionSlice';
import { AppState } from '@/state/session/store';
import { Button, Chip, Divider, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { tss } from 'tss-react/mui';
import { ProductCharacteristics } from './ProductCharacteristics';
import { ProductOptions } from './ProductOptions';
import { IProductDetails } from '@/pages/catalog/[alias]';

const useStyles = tss.create(({ theme }) => ({
    coverPhoto: {
        width: '100%',
        height: 'auto',
    },
    miniPhotos: {
        marginTop: theme.spacing(2),
        display: 'flex',
        alignItems: 'center',
        gap: theme.spacing(2),
    },
    description: {
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
    },
    tag: {
        marginLeft: theme.spacing(1),
    }
}));

export interface ProductDetailProps {
    product: IProductDetails
}

export default function ProductDetail({ product }: ProductDetailProps) {
    const { classes } = useStyles();
    const [quantity, setQuantity] = useState(1);
    const [selectedOptions, setSelectedOptions] = useState({});
    const cart = useSelector((state: AppState) => state.session.cart);
    const dispatch = useDispatch();

    const addToCart = () => {
        dispatch(addProduct({ id: product.id, amount: quantity }));
    }

    const removeFromCart = () => {
        dispatch(removeProduct({ id: product.id }));
    }

    const alreadyInCart = cart[product.id];
    const maxItems = product.stock.amount - (alreadyInCart ?? 0);
    const isButtonDisabled = quantity <= 0 || quantity > maxItems;

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
                <Image
                    width={500}
                    height={300}
                    src={product.coverPhoto.url}
                    alt={product.coverPhoto.alt ?? product.name}
                    className={classes.coverPhoto}
                />
                {product.photos && (
                    <Grid container spacing={1}>
                        {product.photos.map((photo) => (
                            <Grid item key={photo.id} xs={4}>
                                <Image
                                    width={300}
                                    height={150}
                                    src={photo.url}
                                    alt={photo.alt}
                                    className={classes.coverPhoto}
                                />
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Grid>
            <Grid item xs={12} md={6}>
                <Typography variant="h4" gutterBottom>
                    {product.name}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                    {product.categories.map((category) => category.name).join(', ')}
                </Typography>
                <Typography variant="body1" className={classes.description}>{product.description}</Typography>
                {product.characteristics && (
                    <ProductCharacteristics characteristics={product.characteristics} />
                )}
                {product.options && (
                    <ProductOptions
                        selected={selectedOptions}
                        options={product.options}
                        onChange={(name, value) => setSelectedOptions({ ...selectedOptions, [name]: value })}
                    />
                )}
                <Divider sx={{ marginY: 2 }} />

                <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                    {product.tags.map((tag) =>
                        <Chip key={tag} label={tag} color="secondary" className={classes.tag} />
                    )}
                </Typography>

                <Typography variant="h6" color="primary" marginBottom={2} textAlign="right">
                    Price: <strong>${product.price}</strong>
                </Typography>
                <Grid container>
                    <Grid item xs={5} sm={4} md={3} textAlign="center">
                        <QuantityCounter
                            value={quantity}
                            max={maxItems}
                            onChange={setQuantity}
                        />
                    </Grid>
                    <Grid item xs={7} sm={8} md={9}>
                        <Button
                            variant="contained"
                            color="primary"
                            style={{ marginLeft: '8px' }}
                            fullWidth
                            disableElevation
                            disabled={isButtonDisabled}
                            onClick={addToCart}
                        >
                            Add to Cart
                        </Button>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={5} sm={4} md={3} />
                    <Grid item xs={12} sm={8} md={9}>
                        {!!alreadyInCart && (
                            <Button
                                variant="outlined"
                                color="error"
                                style={{ marginLeft: '8px' }}
                                fullWidth
                                disableElevation
                                onClick={removeFromCart}
                            >
                                Remove {alreadyInCart}
                            </Button>
                        )}
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};
