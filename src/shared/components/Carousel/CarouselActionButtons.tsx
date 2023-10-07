import ArrowBack from '@mui/icons-material/ArrowBackIosNew';
import ArrowForward from '@mui/icons-material/ArrowForwardIos';
import { IconButton } from "@mui/material";
import cx from 'classnames';
import { tss } from "tss-react/mui";

export const PrevSlideButton = ({ className, onClick, style }: any) => {
    const { classes } = useStyles();
    return (
        <IconButton className={cx(className, classes.slideBtn)} onClick={onClick} style={style}>
            <ArrowBack color="action" className={classes.arrowIcon} />
        </IconButton>
    );
}

export const NextSlideButton = ({ className, onClick, style }: any) => {
    const { classes } = useStyles();
    return (
        <IconButton className={cx(className, classes.slideBtn)} onClick={onClick} style={style}>
            <ArrowForward color="action" className={classes.arrowIcon} />
        </IconButton>
    );
}

const useStyles = tss.create(({ theme }) => ({
    slideBtn: {
        height: 50,
        width: 50,
        zIndex: 1,
        position: 'absolute',
        '&:before': {
            content: 'none'
        },
        '&.slick-next': {
            right: theme.spacing(1),
        },
        '&.slick-prev': {
            left: theme.spacing(1),
        }
    },
    arrowIcon: {
        color: theme.palette.common.white,
        width: '100%',
        height: '100%',
    }
}));