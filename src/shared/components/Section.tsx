import { Container, ContainerOwnProps } from "@mui/material";
import { tss } from "tss-react/mui";

function Section({ children, ...rest }: ContainerOwnProps ) {
    const { classes } = useStyles();
    return <Container {...rest} className={classes.section} component="section">{children}</Container>;
}

const useStyles = tss.create(({ theme }) => ({
    section: {
        marginBottom: theme.spacing(3),
    }
}));

export default Section;
