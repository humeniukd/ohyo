import { DefaultStorageKey, SecureStorageKey } from './constants'
import { BaseStorage } from './baseStorage'
import { CookieStorage } from './cookieStorage'

const ONE_YEAR = 365 * 24 * 60 * 60

export const defaultStorage = new BaseStorage<DefaultStorageKey>(
  window.localStorage ?? new CookieStorage(ONE_YEAR),
)
export const secureStorage = new BaseStorage<SecureStorageKey>(
  window.sessionStorage ?? new CookieStorage(),
)
