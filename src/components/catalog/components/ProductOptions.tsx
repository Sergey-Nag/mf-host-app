import { Box, Grid, MenuItem, Select, Typography } from "@mui/material";
import { tss } from "tss-react/mui";

export interface ProductOptionsProps {
    selected: { [key: string]: string };
    options: { name: string, options: string[] }[];
    onChange: (name: string, option: string) => void;
}

const useStyles = tss.create(({ theme }) => ({
    list: {
        lineHeight: 3.5,
    }
}));

export function ProductOptions({ selected = {}, options, onChange }: ProductOptionsProps) {
    const { classes } = useStyles();
    return (
        <Box>
            <Typography variant="h6" gutterBottom marginTop={2}>
                Options
            </Typography>
            <Box paddingLeft={3}>
                <ul className={classes.list}>
                    {options.map((option) => (
                        <li key={option.name}>
                            <Grid container alignItems="center">
                                <Grid item xs={2}>
                                    <label htmlFor={option.name}>{option.name}</label>
                                </Grid>
                                <Grid item xs={9}>
                                    <Select
                                        id={option.name}
                                        value={selected[option.name] ?? ''}
                                        size="small"
                                        onChange={(e) => onChange(option.name, e.target.value)}
                                    >
                                        {option.options.map((opt) => (
                                            <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                                        ))}
                                    </Select>
                                </Grid>
                            </Grid>
                        </li>
                    ))}
                </ul>
            </Box>
        </Box>
    )
}