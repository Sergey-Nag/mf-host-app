
import { Button, Grid } from '@mui/material';
import { tss } from 'tss-react/mui';

export interface QuantityCounterProps {
    value: number;
    onChange: (quantity: number) => void;
    max: number;
}

const useStyles = tss.create(({ theme }) => ({
    container: {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 'auto',
        flexWrap: 'nowrap',
    },
    button: {
        borderRadius: '50%',
        width: 32,
        height: 32,
        minWidth: 'unset',
    },
    input: {
        width: 40,
        textAlign: 'center',
        border: 'none',
        padding: theme.spacing(1, 0),
        '&::-webkit-inner-spin-button, &::-webkit-outer-spin-button': {
            WebkitAppearance: 'none',
            margin: 0,
        },
        MozAppearance: 'textfield',
        fontSize: theme.typography.body1.fontSize,
        fontFamily: theme.typography.body1.fontFamily,
        fontWeight: theme.typography.body1.fontWeight,
        lineHeight: theme.typography.body1.lineHeight,
        borderRadius: theme.shape.borderRadius,
    },
    invalid: {
        outlineColor: theme.palette.error.main,
        color: theme.palette.error.dark,
    }
}));

export function QuantityCounter({ value, onChange, max }: QuantityCounterProps) {
    const { classes, cx } = useStyles();
    const handleDecrease = () => {
        onChange(Math.min(max, value - 1));
    };

    const handleIncrease = () => {
        onChange(Math.max(1, value + 1));
    };

    const decreaseDisabled = value <= 1;
    const increaseDisabled = value >= max;

    return (
        <Grid container spacing={1} className={classes.container}>
            <Grid item>
                <Button
                    className={classes.button}
                    variant="outlined"
                    onClick={handleDecrease}
                    disabled={decreaseDisabled}
                >-</Button>
            </Grid>
            <Grid item>
                <input
                    type="number"
                    min={1}
                    max={max}
                    value={value}
                    onChange={(e) => {
                        const value = parseInt(e.target.value);
                        onChange(Number.isNaN(value) ? 0 : value);
                    }}
                    className={
                        cx(classes.input, (value > max || value < 1) && classes.invalid)
                    } />
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
