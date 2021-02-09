import { getI18n } from 'react-i18next'

export const loadLocaleData = (locale: string): Promise<void> => {
  const i18n = getI18n()
  const bundle = i18n.getResourceBundle(locale, 'common')

  if (bundle) {
    return Promise.resolve()
  }

  return import(
    /* webpackChunkName: "locale-[request]" */ `../../i18n/${locale}.json`
  ).then(
    ({ default: messages }) => {
      Object.keys(messages).forEach((key: string) => {
        i18n.addResourceBundle(locale, key, messages[key])
      })

      i18n.changeLanguage(locale)
    },
    () => Promise.reject(new Error(`Could not load locale: ${locale}`))
  )
}
