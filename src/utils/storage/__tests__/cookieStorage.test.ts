import { CookieStorage } from '../cookieStorage'

describe('cookieStorage', () => {
  describe('when new value is set', () => {
    it('should update "document.cookie" value', () => {
      // given
      const storage = new CookieStorage()
      const mockKey = 'fake key'
      const mockValue = `fake value ${Math.random()}`

      // when
      storage.setItem(mockKey, mockValue)

      // then
      expect(storage.getItem(mockKey)).toEqual(mockValue)
    })
  })
})
