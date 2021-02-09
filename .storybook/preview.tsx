import React from 'react'
import { ThemeProvider } from '@material-ui/core/styles';
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import keys from 'lodash/keys'
import { addDecorator, addParameters } from '@storybook/react'

import localeEn from '../src/i18n/en.json'
import { theme } from '../src/styles'
import { ConfigKey, getConfigValue } from '../src/config'
import { isDevelopmentEnv } from '../src/env'
import { getI18nNamespaces } from '../src/utils'

const setupI18n = () => {
  const defaultLang = getConfigValue(ConfigKey.FallbackLocale)
  const namespaces = getI18nNamespaces(localeEn)

  i18n.use(initReactI18next).init({
    lng: defaultLang,
    fallbackLng: defaultLang,
    debug: isDevelopmentEnv(),
    ns: keys(namespaces),
    resources: {
      en: namespaces,
    },
    react: {
      useSuspense: false,
    },
  })
}

addDecorator((storyFn) => (
  <ThemeProvider theme={theme}>
    {storyFn()}
  </ThemeProvider>
))

// https://storybook.js.org/docs/configurations/options-parameter/#sorting-stories
addParameters({
  options: {
    storySort: (a: any, b: any) =>
      a[1].kind === b[1].kind
        ? 0
        : a[1].id.localeCompare(b[1].id, undefined, { numeric: true }),
  },
})

setupI18n()
