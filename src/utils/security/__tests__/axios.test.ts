import { secureStorage, SecureStorageKey } from 'utils/storage'
import { AxiosSecurity } from '../axios'
import { AxiosCommonHeader } from '../../axios'
import { HttpHeader } from '../../constants'

describe('axios', () => {
  describe('signOut', () => {
    it('should clean up secure storage and axios auth on sign out', () => {
      // given
      secureStorage.setItem(SecureStorageKey.AuthUsername, 'fake username')
      secureStorage.setItem(SecureStorageKey.AuthPassword, 'fake password')

      AxiosSecurity.updateApiAuthHeaderFromStorage()

      // when
      AxiosSecurity.signOut()

      // then
      expect(secureStorage.getItem(SecureStorageKey.AuthUsername)).toBeNull()
      expect(secureStorage.getItem(SecureStorageKey.AuthPassword)).toBeNull()

      expect(AxiosCommonHeader.get(HttpHeader.ApiAuthorization)).toBeUndefined()
    })
  })
})
