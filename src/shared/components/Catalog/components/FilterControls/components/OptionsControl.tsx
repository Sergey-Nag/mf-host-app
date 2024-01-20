import { ProductOptionInput } from "@/gql/graphql";
import { ProductOptionsMap } from "../FilterControls";
import { CheckboxesControl } from "./CheckboxesControl";
import { useState } from "react";
import { FormControl } from "@mui/material";

export interface OptionsControlProps {
    options: ProductOptionsMap;
    classes?: {
        control: string;
        labelText: string;
    }
    value: ProductOptionsMap;
    onChange(value: ProductOptionsMap): void;
}

export function OptionsControl({ options, value, classes, onChange }: OptionsControlProps) {
    const optionsArray = Object.entries(options);
    const onCheckboxChange = (optName: string, optOptions: any[]) => {
        onChange({
            ...value,
            [optName]: optOptions
        });
    };
    return optionsArray.map(([name, options]) => (
        <CheckboxesControl
            key={name}
            label={name}
            classes={classes}
            options={options as any[]}
            checked={value[name] ?? []}
            onChange={(checked) => {
                onCheckboxChange(name, checked);
            }}
        />
    ))
}