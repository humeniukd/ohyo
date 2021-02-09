import { getI18n } from 'react-i18next'
import { loadLocaleData } from '../loadLocaleData'

describe('loadLocaleData', () => {
  describe('when valid locale is provided', () => {
    it('should load corresponding resource and update i18next language', async () => {
      // given
      const mockLocale = 'ru'
      const i18n = getI18n()

      const spyChangeLanguage = jest.spyOn(i18n, 'changeLanguage')

      // when
      await loadLocaleData(mockLocale)

      // then
      expect(spyChangeLanguage).toHaveBeenCalledTimes(1)
      expect(spyChangeLanguage).toHaveBeenCalledWith(mockLocale)
    })
  })

  describe('when invalid locale is provided', () => {
    it('should throw an exception', async () => {
      // given
      const mockLocale = 'cc'

      // then
      const result = loadLocaleData(mockLocale)

      // then
      await expect(result).rejects.toEqual(
        new Error(`Could not load locale: ${mockLocale}`),
      )
    })
  })
})
