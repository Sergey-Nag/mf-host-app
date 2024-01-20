import { Accordion, AccordionDetails, AccordionSummary, Badge, Checkbox, Chip, FormControl, FormControlLabel, FormGroup, FormLabel } from "@mui/material";
import { useState } from "react";
import { tss } from "tss-react/mui";

export interface CheckboxesControlProps {
    label: string;
    classes?: {
        control: string;
        labelText: string;
    };
    checked: any[];
    options: any[];
    onChange(value: any[]): void;
};

export function CheckboxesControl({ label, classes: classNames, checked, options, onChange }: CheckboxesControlProps) {
    const { classes, cx } = useStyles();
    const [expanded, setExpanded] = useState(false);
    return (
        <Badge 
            className={classes.badge} 
            badgeContent={checked.length} 
            color="secondary"
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
        >
            <Accordion onChange={() => setExpanded(exp => !exp)}>
                <AccordionSummary className={classes.labelWrapp}>
                    <FormLabel className={classes.label}>
                        <span className={classNames?.labelText}>{label}</span>
                        {!expanded && <div className={classes.values}>{
                            checked.slice(0, 5).map((val) => (
                                <Chip size="small" className={classes.chip} key={val} label={val.toString()} />
                            ))
                        }</div>}
                    </FormLabel>
                </AccordionSummary>
                <AccordionDetails>
                    <FormGroup>
                        {options.map((option) => (
                            <FormControlLabel
                                key={option}
                                label={option.toString()}
                                control={
                                    <Checkbox
                                        checked={checked.includes(option)}
                                    />
                                }
                                onChange={(e, value) => {
                                    onChange(value
                                        ? [...checked, option]
                                        : checked.filter((checkedOption) => checkedOption !== option)
                                    );
                                }}
                            />
                        ))}
                    </FormGroup>
                </AccordionDetails>
            </Accordion>
        </Badge>

    )
}

const useStyles = tss.create(({ theme }) => ({
    label: {
        display: 'flex',
        width: '100%',
        gap: theme.spacing(2),
        cursor: 'pointer',
    },
    values: {
        fontSize: '.9rem',
        width: '100%',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
    },
    chip: {
        marginRight: theme.spacing(0.5),
    },
    labelWrapp: {
        width: '100%',
        '.MuiAccordionSummary-content': {
            width: '100%',
        }
    },
    badge: {
        display: 'block',
        width: '100%'
    }
}));