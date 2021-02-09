import findKey from 'lodash/findKey'
import isRegExp from 'lodash/isRegExp'

import { browser } from 'utils/browser'

export enum Env {
  Development = 'development',
  Test = 'test',
  Staging = 'staging',
  Production = 'production',
}

const ENV_BY_ORIGIN = {
  [Env.Development]: /^http:\/\/localhost:(3000|9009)$/,
  [Env.Production]: 'https://loudyo.com',
}

export const getEnvByOrigin = () => {
  const origin = browser.getOrigin()
  const env = findKey(ENV_BY_ORIGIN, (url) =>
    isRegExp(url) ? url.test(origin) : url === origin,
  )

  if (!env) {
    throw new Error(`Can not find env for origin: ${origin}`)
  }

  return env as Env
}

export const isDevelopmentEnv = () => getEnvByOrigin() === Env.Development
export const isProductionEnv = () =>
  [Env.Staging, Env.Production].includes(getEnvByOrigin())
