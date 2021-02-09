import { Env } from 'env'
import { DEFAULT_ENV, ConfigKey } from '../../config'
import { getConfigValue } from '../getConfigValue'

const MOCK_CONFIG = {
  [DEFAULT_ENV]: {
    [ConfigKey.FallbackLocale]: 'fake locale',
  },

  [Env.Test]: {
    [ConfigKey.RevolutApi]: 'http://localhost',
  },
}

describe('getConfigValue', () => {
  describe('when called and value is missing in current env', () => {
    it('should return corresponding value from default env', () => {
      // when
      const defaultLocale = getConfigValue(ConfigKey.FallbackLocale, MOCK_CONFIG)

      // then
      expect(defaultLocale).toEqual(MOCK_CONFIG[DEFAULT_ENV][ConfigKey.FallbackLocale])
    })
  })

  describe('when called and value presents in current env', () => {
    it('should return corresponding value from env', () => {
      // when
      const apiProxy = getConfigValue(ConfigKey.RevolutApi, MOCK_CONFIG)

      // then
      expect(apiProxy).toEqual(MOCK_CONFIG[Env.Test][ConfigKey.RevolutApi])
    })
  })
})
