export enum I18nNamespace {
  Common = 'common',
}

export const getI18nNamespaces = (translations: any) => {
  const namespaces = {}

  Object.keys(translations)
    .filter((key) => key !== I18nNamespace.Common)
    .forEach((parentKey) => {
      Object.keys(translations[parentKey]).forEach((nestedKey) => {
        namespaces[`${parentKey}.${nestedKey}`] = translations[parentKey][nestedKey]
      })
    })

  namespaces[I18nNamespace.Common] = translations[I18nNamespace.Common]

  return namespaces
}
