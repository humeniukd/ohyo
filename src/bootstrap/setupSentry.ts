import * as Sentry from '@sentry/react'
import { Dedupe, ExtraErrorData } from '@sentry/integrations'

import { ConfigKey, getConfigValue } from 'config'
import { getEnvByOrigin } from 'env'

export const setupSentry = () => {
  Sentry.init({
    dsn: getConfigValue(ConfigKey.SentryDsn),
    release: process.env.REACT_APP_RELEASE_TAG,
    environment: getEnvByOrigin(),
    integrations: [new Dedupe(), new ExtraErrorData({ depth: 6 })],
    ignoreErrors: [
      "NotFoundError: Failed to execute 'removeChild' on 'Node'",
      "SecurityError: Failed to execute 'open' on 'XMLHttpRequest'",
      'a[b].target.className.indexOf is not a function',
      'Non-Error exception captured with keys',
      'NotFoundError: The object can not be found here',
      'ResizeObserver loop',
      'tgetT is not defined',
      '|this|.constructor[Symbol.species] is not a constructor',
    ],
    denyUrls: ['anonymous', 'chrome-extension://', 'safari-extension://'],
  })
}
