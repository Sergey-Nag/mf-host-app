import { FormControl, FormLabel, Grid, TextField, Slider } from "@mui/material";
import { PRICE_DECIMALS, SLIDER_PRICE_DEFAULT_MAX, SLIDER_PRICE_DEFAULT_MIN } from "../../../constants";

export interface PriceRangeControlProps {
    classes: { [key: string]: string };
    values: {
        min: string;
        max: string;
    };
    onChange(values: { min: string, max: string }): void;
    errors: {
        price?: {
            min?: string;
            max?: string;
        }
    }
};

export function PriceRangeControl({ classes, values, errors, onChange }: PriceRangeControlProps) {
    return (
        <FormControl className={classes.control}>
            <FormLabel>Price range</FormLabel>
            <Grid className={classes.rangeInputsWrapper} container>
                <Grid item xs={5}>
                    <TextField
                        variant="standard"
                        value={values.min}
                        onChange={({ target }) => {
                            onChange({
                                min: target.value,
                                max: values.max
                            })
                        }}
                        error={!!errors.price?.min}
                        helperText={errors.price?.min}
                        placeholder={SLIDER_PRICE_DEFAULT_MIN.toString()}
                    />
                </Grid>
                <Grid item xs={2}>
                    <span className={classes.rangeDash}>—</span>
                </Grid>
                <Grid item xs={5}>
                    <TextField
                        variant="standard"
                        value={values.max}
                        onChange={({ target }) => {
                            onChange({
                                max: target.value,
                                min: values.min
                            });
                        }}
                        error={!!errors.price?.max}
                        helperText={errors.price?.max}
                        placeholder={SLIDER_PRICE_DEFAULT_MAX.toString()}
                    />
                </Grid>
            </Grid>
            <Slider
                name="price"
                getAriaLabel={() => 'Price range'}
                value={[+values.min, +values.max]}
                onChange={(_e, value) => {
                    if (Array.isArray(value)) {
                        const [min, max] = value;
                        onChange({ min: min.toFixed(PRICE_DECIMALS), max: max.toFixed(PRICE_DECIMALS) });
                    }
                }}
                valueLabelDisplay="auto"
                min={SLIDER_PRICE_DEFAULT_MIN}
                max={SLIDER_PRICE_DEFAULT_MAX}
            />
        </FormControl>
    )
}