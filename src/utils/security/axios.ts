import { queryCache } from 'react-query'
import { HttpHeader } from '../constants'
import { AxiosCommonHeader } from '../axios'
import {
  SecureStorageKey,
  secureStorage,
} from '../storage'

export class AxiosSecurity {
  static updateApiAuthHeaderFromToken(token: string) {
    AxiosCommonHeader.set(HttpHeader.ApiAuthorization, `Bearer ${token}`)
  }

  static updateApiAuthHeaderFromStorage() {
    const token = secureStorage.getItem(SecureStorageKey.SecureCode)
    if (token) {
      AxiosSecurity.updateApiAuthHeaderFromToken(token)
    } else {
      AxiosCommonHeader.remove(HttpHeader.ApiAuthorization)
    }
  }

  static hasAuth() {
    return Boolean(AxiosCommonHeader.get(HttpHeader.ApiAuthorization))
  }

  static signOut() {
    queryCache.removeQueries()

    secureStorage.clear()

    AxiosSecurity.updateApiAuthHeaderFromStorage()
  }
}
