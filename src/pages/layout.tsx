import React, { PropsWithChildren } from 'react';
import Navbar from "@/shared/components/header/Navbar";
import Footer from '@/shared/components/footer/Footer';
import { tss } from 'tss-react/mui';

export default function Layout({ children }: PropsWithChildren) {
    const { classes } = useStyles();
    return (
        <>
            <Navbar />
            <main className={classes.main}>{children}</main>
            <Footer />
        </>
    )
}

const useStyles = tss.create(({ theme }) => ({
    main: {
        paddingTop: theme.spacing(10),
        minHeight: `calc(100vh - ${theme.spacing(10)})`,
    }
}));