
import React from 'react';
import { Button, Grid, Typography } from '@mui/material';
import { tss } from 'tss-react/mui';

export interface QuantityCounterProps {
    value: number;
    onChange: (quantity: number) => void;
    max: number;
}

const useStyles = tss.create(() => ({
    button: {
        borderRadius: '50%',
        width: 32,
        height: 32,
        minWidth: 'unset',
    },
}));

export function QuantityCounter({ value, onChange, max }: QuantityCounterProps) {
    const { classes } = useStyles();
    const handleDecrease = () => {
        onChange(value - 1);
    };

    const handleIncrease = () => {
        onChange(value + 1);
    };

    const decreaseDisabled = value <= 1;
    const increaseDisabled = !!max && value >= max;

    return (
        <Grid container alignItems="center" spacing={1} justifyContent="flex-end">
            <Grid item>
                <Button
                    className={classes.button}
                    variant="outlined"
                    onClick={handleDecrease}
                    disabled={decreaseDisabled}
                >-</Button>
            </Grid>
            <Grid item>
                <Typography>{value}</Typography>
            </Grid>
            <Grid item>
                <Button
                    className={classes.button}
                    variant="outlined"
                    onClick={handleIncrease}
                    disabled={increaseDisabled}
                >+</Button>
            </Grid>
        </Grid>
    );
}
