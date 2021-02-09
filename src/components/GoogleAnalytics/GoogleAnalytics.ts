import { FC, useEffect } from 'react'
import get from 'lodash/get'
import set from 'lodash/set'

type GoogleAnalyticsProps = {
  id: string
}

export const GoogleAnalytics: FC<GoogleAnalyticsProps> = ({ id }) => {
  useEffect(() => {
    const dataLayer = get(window, 'dataLayer', [])

    function gtag(...__: any[]) {
      // "arguments" is required for GA to work properly
      // eslint-disable-next-line
      dataLayer.push(arguments)
    }

    const addScript = (src: string) => {
      const newScriptEl = document.createElement('script')

      newScriptEl.async = true
      newScriptEl.src = src

      document.head.appendChild(newScriptEl)
    }

    gtag('js', new Date())
    gtag('config', id)

    // Export
    set(window, 'dataLayer', dataLayer)
    set(window, 'gtag', gtag)

    addScript(`https://www.googletagmanager.com/gtag/js?id=${id}`)
  }, [id])

  return null
}
