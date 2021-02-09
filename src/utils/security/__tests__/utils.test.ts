import { encodeAccessToken, decodeAccessToken } from '../utils'

describe('utils', () => {
  describe('encodeAccessToken and decodeAccessToken', () => {
    it('should decode encoded access token', () => {
      // given
      const mockUsername = 'fake username'
      const mockPassword = 'fake password'

      const [decodedUsername, decodedPassword] = decodeAccessToken(
        encodeAccessToken(mockUsername, mockPassword),
      )

      // then
      expect(decodedUsername).toEqual(mockUsername)
      expect(decodedPassword).toEqual(mockPassword)
    })
  })
})
