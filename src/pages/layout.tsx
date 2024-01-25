import Footer from '@/shared/components/footer/Footer';
import Navbar from "@/shared/components/header/Navbar";
import { PropsWithChildren } from 'react';
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
        minHeight: `calc(70vh - ${theme.spacing(10)})`,
    }
}));