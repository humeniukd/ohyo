import { Url, browser } from '../utils'

export const setupErrorHandler = () => {
  window.addEventListener('unhandledrejection', ({ reason, preventDefault }) => {
    console.error(reason)

    //browser.navigateTo(Url.Error)

    preventDefault()
  })
}
