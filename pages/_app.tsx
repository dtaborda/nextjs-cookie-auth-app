import { MuiThemeProvider } from '@material-ui/core/styles';
import App, { Container } from 'next/app';
import Router from 'next/router';
import NProgress from 'nprogress';
import * as React from 'react';

import getPageContext from '../src/utils/getPageContext';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

class MyApp extends App {
  pageContext = getPageContext();

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    const { props } = this as any;
    const { Component, pageProps } = props;
    return (
      <Container>
        {/* MuiThemeProvider makes the theme available down the React
          tree thanks to React context. */}
        <MuiThemeProvider
          theme={this.pageContext.theme}
        >
          {/* Pass pageContext to the _document though the renderPage enhancer
            to render collected styles on server side. */}
          <Component pageContext={this.pageContext} {...pageProps} />
        </MuiThemeProvider>
      </Container>
    );
  }
}

export default MyApp;
