import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document';
import { augmentDocumentWithEmotionCache } from './_app';

function MyDocument() {
    return (
        <Html>
            <Head />
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}

MyDocument.getInitialProps = async (ctx: DocumentContext) => {
    const initialProps = await Document.getInitialProps(ctx);
    return initialProps;
};

augmentDocumentWithEmotionCache(MyDocument);

export default MyDocument;
