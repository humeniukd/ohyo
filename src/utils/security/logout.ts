import { signOut } from 'api/auth'
import { browser } from '../browser'
import { Url } from '../constants'
import { AxiosSecurity } from './axios'

export const logout = () => {
  const callback = () => {
    AxiosSecurity.signOut()
    browser.navigateTo(Url.Start)
  }

  signOut().then(callback).catch(callback)
}
