import { ConfigKey, getConfigValue } from 'config'
import { defaultStorage, DefaultStorageKey } from '../storage'

export const getCurrentLocale = () => {
  const fallbackLocale = getConfigValue(ConfigKey.FallbackLocale)

  return defaultStorage.getItem(DefaultStorageKey.Locale) ?? fallbackLocale
}
