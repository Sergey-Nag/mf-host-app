import { AppBar, Badge, Divider, Grid } from '@mui/material';
import React from 'react';
import { tss } from 'tss-react/mui';
import NavButton from './components/NavButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useSelector } from 'react-redux';
import { selectSessionState } from '@/state/session/sesionSlice';


export default function Navbar() {
    const { classes } = useStyles();
    const { cart } = useSelector(selectSessionState);

    return (
        <AppBar className={classes.header} color="default" >
            <Grid container justifyContent="space-between">
                <Grid item xs={6}>

                </Grid>
                <Grid item xs={6}>
                    <nav className={classes.navigation}>
                        <NavButton href="/">Catalog</NavButton>
                        <Divider orientation='vertical' flexItem />
                        <NavButton href="/">Categories</NavButton>
                        <Divider orientation='vertical' flexItem />
                        <Badge className={classes.cartBadge} badgeContent={cart.length} color="primary">
                            <NavButton href="/" startIcon={<ShoppingCartIcon />}>
                                Cart
                            </NavButton>
                        </Badge>
                    </nav>
                </Grid>
            </Grid>
        </AppBar>
    )
}

const useStyles = tss.create(({ theme }) => {
    console.log(theme);

    return {
        header: {
            padding: `${theme.spacing(1)} ${theme.spacing(4)}`,
            // color: theme.palette.primary.contrastText,
        },
        navigation: {
            display: 'flex',
            justifyContent: 'flex-end',
            gap: theme.spacing(1)
        },
        cartBadge: {
            '& .MuiBadge-badge': {
                top: '50%',
                right: theme.spacing(-1),
                border: `2px solid ${theme.palette.background.paper}`,
            }
        }
    }
});