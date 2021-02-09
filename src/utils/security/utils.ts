export const decodeAccessToken = (accessToken: string) =>
  window.atob(accessToken).split(':')

export const encodeAccessToken = (username: string, password: string) =>
  window.btoa(`${username}:${password}`)
