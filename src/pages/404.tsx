import ButtonLink from '@/shared/components/ButtonLink';
import { SentimentVeryDissatisfied } from '@mui/icons-material';
import { Box, Container, Typography } from '@mui/material';
import { ReactElement } from 'react';
import Layout from './layout';

export default function NotFoundPage() {
    return (
        <Container>
            <Box textAlign="center">
                <Typography variant="h1" align="center" color="primary" gutterBottom>
                    404
                </Typography>
                <SentimentVeryDissatisfied fontSize="large" color="primary" />
                <Typography variant="h5" align="center" color="textSecondary" paragraph gutterBottom>
                    Oops! The page you are looking for might be in another galaxy.
                </Typography>
                <ButtonLink href="/" variant="contained" color="primary">
                    Back to Home
                </ButtonLink>
            </Box>
        </Container>
    );
};

NotFoundPage.getLayout = (page: ReactElement) => <Layout>{page}</Layout>
