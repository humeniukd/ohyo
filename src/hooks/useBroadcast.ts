import { useEffect, useCallback } from 'react'

import {
  Broadcast,
  BroadcastChannelName,
  BroadcastMessageData,
  BroadcastMessageType,
} from 'utils'

export const MESSAGE_TIMEOUT = 3000
const BROADCAST = new Broadcast(BroadcastChannelName.Signin)

type Parameters = {
  onSuccess: (secureCode: string) => void
  onError?: () => void
}

export const useBroadcast = ({ onSuccess, onError }: Parameters) => {
  const handleVerifyMessage = useCallback(
    (message: MessageEvent) => {
      const data = message.data as BroadcastMessageData
      if (data.type !== BroadcastMessageType.SigninSuccessful) {
        return
      }

      onSuccess(data.payload)
    },
    [onSuccess],
  )

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onError && onError()
    }, MESSAGE_TIMEOUT)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [onError])

  useEffect(() => {
    BROADCAST.addEventListener(handleVerifyMessage)

    return () => {
      BROADCAST.removeEventListener(handleVerifyMessage)
    }
  }, [handleVerifyMessage])
}
