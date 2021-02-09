import {
  CookieBroadcastChannel,
  UPDATES_CHECK_INTERVAL_MS,
} from '../cookieBroadcastChannel'
import { BroadcastMessageType } from '../types'

describe('cookieBroadcastChannel', () => {
  describe('when message is sent by one channel', () => {
    it('should be processed by another one', () => {
      // given
      jest.useFakeTimers()

      const mockMessageData = {
        type: BroadcastMessageType.SigninSuccessful,
        payload: {},
      }

      const producer = new CookieBroadcastChannel('fake')
      const consumer = new CookieBroadcastChannel('fake')

      const mockConsumerListener = jest.fn()

      // when
      producer.postMessage(mockMessageData)
      consumer.addEventListener('message', mockConsumerListener)

      jest.advanceTimersByTime(UPDATES_CHECK_INTERVAL_MS)

      // then
      expect(mockConsumerListener).toHaveBeenCalledTimes(1)
      expect(mockConsumerListener).toHaveBeenCalledWith({ data: mockMessageData })
      expect(document.cookie.startsWith('lou_broadcast=;')).toBe(true)
    })
  })
})
