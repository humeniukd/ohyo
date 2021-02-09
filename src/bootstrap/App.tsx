import React, { useContext, useEffect } from 'react'
import { Redirect } from 'react-router'
import { Route, Switch } from 'react-router-dom'
import { ReactQueryDevtools } from 'react-query-devtools'
import * as Sentry from "@sentry/react";
import { AUTH_URLS, AxiosSecurity, secureStorage, SecureStorageKey, Url } from 'utils'
import {
  Error as ErrorPage,
  Redirect as PageRedirect,
  NotFound,
  Start,
  Upload,
} from 'pages'
import { GoogleAnalytics } from 'components'
import { AuthContext, AuthProvider } from 'providers'
import { getConfigValue, ConfigKey } from '../config'
import { prefetchAppConfig } from '../api'
import { isDevelopmentEnv } from '../env'
import { useBroadcast } from '../hooks'
import { getCurrentLocale, loadLocaleData } from 'utils/i18n'
import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'

export const App = () => {
  const gaId = getConfigValue(ConfigKey.GoogleAnalyticsId)
  const authPath = `(${AUTH_URLS.join('|')})`
  const { setSecurityCode } = useContext(AuthContext)

  const { t } = useTranslation('pages.common')

  const handleSigninSuccess = (token: string) => {
    secureStorage.setItem(SecureStorageKey.SecureCode, token)
    setSecurityCode(token)
    AxiosSecurity.updateApiAuthHeaderFromStorage()
  }

  useBroadcast({
    onSuccess: handleSigninSuccess
  })

  AxiosSecurity.updateApiAuthHeaderFromStorage()

  useEffect(() => {
    loadLocaleData(getCurrentLocale()).catch((e) => Sentry.captureException(e))
  }, [])

  prefetchAppConfig()

  return (
    <>
      {gaId && <GoogleAnalytics id={gaId} />}

      <Helmet>
        <title>{t('Welcome')} | Loud Yo</title>
        <meta name="description" content={t('meta.description')} />
      </Helmet>

      <Switch>
        {isDevelopmentEnv() && <Redirect from={Url.Home} to={Url.Start} exact />}
        <Route path={Url.Start} component={Start} />
        <Route path={authPath}>
          <Switch>
            <AuthProvider>
              <PageRedirect where={Url.Upload}/>
              <Route path={Url.Upload} component={Upload} />
            </AuthProvider>
          </Switch>
        </Route>
        <Route path={Url.Accounts}>
          <Switch>
            {/*<Route*/}
            {/*  path={[Url.Accounts, Url.AccountsTransactions]}*/}
            {/*  exact*/}
            {/*  component={AccountsPage}*/}
            {/*/>*/}
            {/*<Route*/}
            {/*  path={[Url.Account, Url.AccountTransactions, Url.AccountDetails]}*/}
            {/*  component={Account}*/}
            {/*/>*/}
          </Switch>
        </Route>

        <Route path={Url.Error} component={ErrorPage} />
        <Route component={NotFound} />
      </Switch>

      {isDevelopmentEnv() && <ReactQueryDevtools initialIsOpen={false} />}
    </>
  )
}
