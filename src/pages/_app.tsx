import { wrapper } from '@/state/session/store';
import '@/styles/globals.css';
import createEmotionCache from '@/theme/emotionCache';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { CacheProvider, EmotionCache } from '@emotion/react';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { ReactElement, ReactNode } from 'react';
import { Provider } from 'react-redux';
import createCache from '@emotion/cache';
import { EMOTION_CACHE_KEY } from '@/constants/keys';
import ThemeRegistry from './themeRegistry';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode
}

export interface AppPropsWithLayout extends AppProps {
    Component: NextPageWithLayout;
    emotionCache?: EmotionCache;
}

const clientSideEmotionCache = createCache({
    key: EMOTION_CACHE_KEY
});

const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    cache: new InMemoryCache({
        addTypename: false,
    }),
});


function App({ Component, ...rest }: AppPropsWithLayout) {
    const { store, props } = wrapper.useWrappedStore(rest);
    const getLayout = Component?.getLayout || ((page) => page)

    return (
        <Provider store={store}>
            <ThemeRegistry options={{ key: EMOTION_CACHE_KEY }}>
                <ApolloProvider client={client}>
                    {getLayout(<Component {...props} />)}
                </ApolloProvider>
            </ThemeRegistry>
        </Provider>
    )
}

export default App;
