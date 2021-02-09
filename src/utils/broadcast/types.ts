export enum BroadcastMessageType {
  SigninSuccessful = 'SigninSuccessful',
}

export type BroadcastMessageData = {
  type: BroadcastMessageType
  payload: any
}

export type BroadcastEventListener = (message: MessageEvent) => void

export type CookieBroadcastChannelMessage = {
  broadcastId: string
  data: any
}
