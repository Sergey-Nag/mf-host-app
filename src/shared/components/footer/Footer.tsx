import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Container, Grid, IconButton, Typography } from '@mui/material';
import Link from 'next/link';
import { tss } from 'tss-react/mui';

const useStyles = tss.create(({ theme }) => ({
    footer: {
        padding: theme.spacing(6),
        marginTop: theme.spacing(6),
    },
}));

export default function Footer() {
    const { classes } = useStyles();

    return (
        <footer className={classes.footer}>
            <Container maxWidth="lg">
                <Grid container spacing={3} marginBottom={3}>
                    <Grid item xs={12} sm={6} md={5}>
                        <Typography variant="h6" gutterBottom>
                            Quick Links
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                            <Link href="/">Home</Link>
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                            <Link href="/catalog">Catalog</Link>
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                            <Link href="/categories">Categories</Link>
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                            <Link href="/about">About us</Link>
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                            <Link href="/contact">Contact</Link>
                        </Typography>
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <Typography variant="h6" gutterBottom>
                            About Us
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                            Our Story
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                            Careers
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                            Terms of Service
                        </Typography>
                    </Grid>

                    <Grid item xs={12} md={3}>
                        <Typography variant="h6" gutterBottom>
                            Connect with Us
                        </Typography>
                        <IconButton color="primary" aria-label="Facebook">
                            <FacebookIcon />
                        </IconButton>
                        <IconButton color="primary" aria-label="Twitter">
                            <TwitterIcon />
                        </IconButton>
                        <IconButton color="primary" aria-label="Instagram">
                            <InstagramIcon />
                        </IconButton>
                    </Grid>
                </Grid>
                <Typography variant="body2" color="textSecondary" align="center">
                    © {new Date().getFullYear()} E-Shop. All rights reserved.
                </Typography>
            </Container>
        </footer>
    );
};
