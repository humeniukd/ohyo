import { DefaultStorageKey } from '../constants'
import { getPrefixedKey } from '../baseStorage'
import { defaultStorage } from '../storage'

describe('defaultStorage', () => {
  beforeEach(() => {
    // "localStorage" is used under the hood
    localStorage.clear()
  })

  describe('when new value is set', () => {
    it('should "wrap" it and update "localStorage"', () => {
      // given
      const mockTs = Date.now()
      const mockKey = 'fake key' as DefaultStorageKey
      const mockValue = `fake value ${Math.random()}`

      jest.spyOn(Date, 'now').mockReturnValueOnce(mockTs)

      // when
      defaultStorage.setItem(mockKey, mockValue)

      // then
      expect(localStorage.getItem(getPrefixedKey(mockKey))).toEqual(
        JSON.stringify({
          ts: mockTs,
          payload: mockValue,
        }),
      )
    })

    it('should "unwrap" it when value is requested', () => {
      // given
      const mockKey = 'fake key' as DefaultStorageKey
      const mockValue = `fake value ${Math.random()}`

      // when
      defaultStorage.setItem(mockKey, mockValue)

      // then
      expect(defaultStorage.getItem(mockKey)).toEqual(mockValue)
    })
  })

  describe('when nonexistent value is requested', () => {
    it('should return "null"', () => {
      // given
      // Empty storage

      // then
      expect(defaultStorage.getItem('fake key' as DefaultStorageKey)).toBeNull()
    })
  })

  describe('when non-parsable value is requested', () => {
    it('should return "null"', () => {
      // given
      const mockKey = 'fake key' as DefaultStorageKey
      const mockValue = `fake value ${Math.random()}`

      localStorage.setItem(mockKey, mockValue)

      // then
      expect(defaultStorage.getItem(mockKey)).toBeNull()
    })
  })
})
