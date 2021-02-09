import { ConfigKey, getConfigValue } from 'config'
import { defaultStorage, DefaultStorageKey } from 'utils/storage'
import { getCurrentLocale } from '../getCurrentLocale'

describe('getCurrentLocale', () => {
  it('should return fallback locale by default', () => {
    // then
    expect(getCurrentLocale()).toEqual(getConfigValue(ConfigKey.FallbackLocale))
  })

  it('should return locale from the default storage if it exists', () => {
    // given
    const mockLocale = 'cc'

    defaultStorage.setItem(DefaultStorageKey.Locale, mockLocale)

    // then
    expect(getCurrentLocale()).toEqual(mockLocale)
  })
})
