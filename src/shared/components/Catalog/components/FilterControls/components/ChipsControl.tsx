import { Category } from "@/gql/graphql";
import { Autocomplete, Chip, FormControl, FormLabel, TextField } from "@mui/material";

export interface ChipsControl {
    label: string;
    classes: { [key: string]: string };
    value: string[];
    options: {id: string, value: string}[];
    onChange(value: string[]): void;
    placeholder?: string;
}

export function ChipsControl({ label, classes, value, options, onChange, placeholder }: ChipsControl) {
    return (
        <FormControl className={classes.control}>
            <FormLabel htmlFor={`${label}-chips-control}`}>{label}</FormLabel>
            <Autocomplete
                multiple
                options={options}
                id={`${label}-chips-control}`}
                getOptionLabel={(option) => option.value}
                renderTags={(values, getTagProps) =>
                    values.map((option, index: number) => (
                        <Chip variant="filled" label={option.value} size="small" {...getTagProps({ index })} key={option.id} />
                    ))
                }
                value={options.filter((option) => value.includes(option.id))}
                onChange={(_, value) => {
                    onChange(value.map((option) => option.id));
                }}
                renderInput={(params) => (
                    <TextField {...params} name="categories" variant="standard" placeholder={placeholder} />
                )}
            />
        </FormControl>
    )
}