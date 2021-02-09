import axios from 'axios'

import { HttpHeader } from './constants'

export class AxiosCommonHeader {
  static get(header: HttpHeader) {
    return axios.defaults.headers.common[header]
  }

  static set(header: HttpHeader, value: string | boolean) {
    axios.defaults.headers.common[header] = value
  }

  static remove(header: HttpHeader) {
    delete axios.defaults.headers.common[header]
  }
}
