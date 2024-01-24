import { selectSessionState } from '@/state/session/sesionSlice';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { AppBar, Badge, Divider, Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import { tss } from 'tss-react/mui';
import NavButton from './components/NavButton';


export default function Navbar() {
    const { classes } = useStyles();
    const { cart } = useSelector(selectSessionState);

    const cartLength = Object.values(cart).reduce((acc, curr) => acc + curr, 0);
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
                        <Badge className={classes.cartBadge} badgeContent={cartLength} color="primary">
                            <NavButton href="/cart" startIcon={<ShoppingCartIcon />}>
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
    return {
        header: {
            padding: `${theme.spacing(1)} ${theme.spacing(4)}`,
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