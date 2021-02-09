import axios from 'axios'

import {
  AxiosSecurity,
  HttpCode,
  Url,
  browser,
} from 'utils'
import { ConfigKey, getConfigValue } from 'config'

export const setupAxios = () => {
  axios.defaults.baseURL = getConfigValue(ConfigKey.Api)

  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === HttpCode.Unauthorized) {
        AxiosSecurity.signOut()
        browser.navigateTo('http://a.loudyo.com/login?client_id=487ll2fmbasg83ui7p8mq5jibg&response_type=token&scope=email+openid&redirect_uri=http://localhost:3000/callback.html')
        return undefined
      }

      return Promise.reject(error)
    },
  )

  AxiosSecurity.updateApiAuthHeaderFromStorage()
}
