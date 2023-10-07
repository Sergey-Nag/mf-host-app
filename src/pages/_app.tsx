import '@/styles/globals.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { ReactElement, ReactNode } from 'react';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { wrapper } from '@/state/session/store';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}

const cache = createCache({
    key: 'host',
});
const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    cache: new InMemoryCache({
        addTypename: false,
    }),
});

function App({ Component, pageProps }: AppPropsWithLayout) {
    const getLayout = Component?.getLayout || ((page) => page)

    return (
        <CacheProvider value={cache}>
            <ApolloProvider client={client}>
                {getLayout(<Component {...pageProps} />)}
            </ApolloProvider>
        </CacheProvider>
    )
}

export default wrapper.withRedux(App);
