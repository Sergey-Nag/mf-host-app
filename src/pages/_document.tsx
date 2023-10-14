import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';
import { renderStatic } from '@/shared/utils/renderer';
import { CacheProvider } from '@emotion/react';
import { cache } from '@emotion/css';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from '@/theme';

function MyDocument() {
    return (
        <Html>
            <Head />
            <body>
                <CacheProvider value={cache}>
                    <ThemeProvider theme={theme}>
                        <CssBaseline />
                        <Main />
                        <NextScript />
                    </ThemeProvider>
                </CacheProvider>
            </body>
        </Html>
    );
}

MyDocument.getInitialProps = async (ctx: DocumentContext) => {
    const page = await ctx.renderPage();
    const { css, ids } = await renderStatic(page.html);
    console.log({css}, ids);
    
    const initialProps = await Document.getInitialProps(ctx);

    return { 
        ...initialProps,
        styles: (
            <>
                {initialProps.styles}
                <style
                    data-emotion={`css ${ids.join(' ')}`}
                    dangerouslySetInnerHTML={{ __html: css }}
                />
            </>
        )
    };
};

export default MyDocument;
