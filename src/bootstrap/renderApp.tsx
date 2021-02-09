import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { ReactQueryConfigProvider, ReactQueryConfig } from 'react-query'
import { ThemeProvider } from '@material-ui/core/styles';
import * as Sentry from '@sentry/react'
import 'normalize.css'

import { theme } from 'styles'
import { getConfigValue, ConfigKey } from 'config'
import { AuthProvider } from 'providers'
import { Url, browser } from 'utils'
import { App } from './App'

const REACT_QUERY_CONFIG: ReactQueryConfig = {
  queries: {
    retry: getConfigValue(ConfigKey.ReactQueryRetry),
  },
}

export const renderApp = () => {
  const navigateToErrorPage = () => browser.navigateTo(Url.Error)

  const handleOnError = () => {
    Sentry.flush().then(navigateToErrorPage, navigateToErrorPage)
  }

  ReactDOM.render(
      <Sentry.ErrorBoundary onError={handleOnError}>
        <ReactQueryConfigProvider config={REACT_QUERY_CONFIG}>
          <ThemeProvider theme={theme}>
            <AuthProvider>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </AuthProvider>
          </ThemeProvider>
        </ReactQueryConfigProvider>
      </Sentry.ErrorBoundary>,
      document.getElementById('root'),
  )
}