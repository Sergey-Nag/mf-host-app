import React from 'react';
import { Breadcrumbs as MUIBreadcrumbs, Link, Typography } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useRouter } from 'next/router';
import { tss } from 'tss-react/mui';

const useStyles = tss.create(({ theme }) => ({
    breadcrumbs: {
        marginBottom: theme.spacing(2),
    },
}));

export function Breadcrumbs() {
    const { classes } = useStyles();
    const router = useRouter();

    const pathnames = router.asPath.split('/').filter((p) => p);

    return (
        <MUIBreadcrumbs separator={<NavigateNextIcon fontSize="small" />} className={classes.breadcrumbs}>
            <Link color="inherit" href="/">
                Home
            </Link>
            {pathnames.map((name, index) => {
                const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
                const isLast = index === pathnames.length - 1;
                return isLast ? (
                    <Typography key={name} color="textPrimary">
                        {name}
                    </Typography>
                ) : (
                    <Link key={name} color="inherit" href={routeTo}>
                        {name}
                    </Link>
                );
            })}
        </MUIBreadcrumbs>
    );
};
