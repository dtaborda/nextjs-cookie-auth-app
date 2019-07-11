// This page is based on the Material-ui Next.js page
// https://github.com/mui-org/material-ui/tree/master/examples/nextjs
// tslint:disable-next-line:no-implicit-dependencies
import { ServerStyleSheets } from '@material-ui/styles';
import * as React from 'react';

import Document, {
  DefaultDocumentIProps,
  Head,
  Main,
  NextDocumentContext,
  NextScript,
  RenderPageResponse,
} from 'next/document';

interface Props {
}

interface DocumentIProps extends DefaultDocumentIProps, RenderPageResponse {
}

class MyDocument extends Document<Props> {
  static async getInitialProps(ctx: NextDocumentContext): Promise<DocumentIProps> {
    // Render app and page and get the context of the page with collected side effects.
    const sheets = new ServerStyleSheets();
    const originalRenderPage = ctx.renderPage;

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: App => props => sheets.collect(<App {...props} />),
      });

    const initialProps = await Document.getInitialProps(ctx);

    return {
      ...initialProps,
      // Styles fragment is rendered after the app and page rendering finish.
      styles: (
        <React.Fragment>
          {sheets.getStyleElement()}
        </React.Fragment>
      ),
    };
  }

  render() {
    return (
      <html lang="en" dir="ltr">
        <Head>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

export default MyDocument;
