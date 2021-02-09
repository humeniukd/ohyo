import isString from 'lodash/isString'

import { KEY_PREFIX } from './constants'
import { StorageItem } from './types'

export const getPrefixedKey = (key: string) => `${KEY_PREFIX}${key}`

export class BaseStorage<T extends string> {
  storage: Storage

  constructor(storage: Storage) {
    this.storage = storage
  }

  getItem<V = string>(key: T): V | null {
    const value = this.storage.getItem(getPrefixedKey(key))
    if (!isString(value)) {
      return null
    }

    try {
      return JSON.parse(value).payload
    } catch {
      return null
    }
  }

  setItem(key: T, payload: any) {
    const value: StorageItem = {
      ts: Date.now(),
      payload,
    }

    this.storage.setItem(getPrefixedKey(key), JSON.stringify(value))
  }

  removeItem(key: T) {
    this.storage.removeItem(getPrefixedKey(key))
  }

  clear() {
    this.storage.clear()
  }
}
