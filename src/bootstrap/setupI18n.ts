import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import { ConfigKey, getConfigValue } from 'config'
import { isDevelopmentEnv } from 'env'
import { getI18nNamespaces } from 'utils'
// Must by synced with the "FallbackLocale" config value
import localeEn from '../i18n/en.json'

export const setupI18n = () => {
  const fallbackLocale = getConfigValue(ConfigKey.FallbackLocale)
  const namespaces = getI18nNamespaces(localeEn)

  i18n.use(initReactI18next).init({
    lng: fallbackLocale,
    fallbackLng: fallbackLocale,
    debug: isDevelopmentEnv(),
    ns: Object.keys(namespaces),
    resources: {
      en: namespaces,
    },
    react: {
      useSuspense: false,
    },
  })
}
