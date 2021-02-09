import { Env } from '../env'
import countries from './json/countries.json'
import supportedLocales from './json/supportedLocales.json'

export enum ConfigKey {
  CdnUrl = 'CDN_URL',
  ClientVersion = 'CLIENT_VERSION',
  Countries = 'COUNTRIES',
  FallbackLocale = 'FALLBACK_LOCALE',
  GoogleAnalyticsId = 'GOOGLE_ANALYTICS_ID',
  SupportedLocales = 'SUPPORTED_LOCALES',
  ReactQueryRetry = 'REACT_QUERY_RETRY',
  SentryDsn = 'SENTRY_DSN',
  Api = 'API'
}

export const DEFAULT_ENV = Symbol.for('default')

type Config = {
  [K in Env | typeof DEFAULT_ENV]: { [T in ConfigKey]?: any }
}

export const CONFIG: Config = {
  [DEFAULT_ENV]: {
    [ConfigKey.CdnUrl]: 'https://s.loudyo.com',
    [ConfigKey.ClientVersion]: '100.0',
    [ConfigKey.FallbackLocale]: 'en',
    [ConfigKey.Countries]: countries,
    [ConfigKey.Api]: 'https://api.loudyo.com/',
    [ConfigKey.ReactQueryRetry]: 1,
    [ConfigKey.SupportedLocales]: supportedLocales,
    [ConfigKey.SentryDsn]: 'https://d3f52f3968454eea9548a17b395e0492@o478831.ingest.sentry.io/5521958',
  },

  [Env.Development]: {
    //[ConfigKey.Api]: 'http://localhost:4000/api',
  },

  [Env.Test]: {
    [ConfigKey.GoogleAnalyticsId]: '',
  },

  [Env.Staging]: {
    [ConfigKey.GoogleAnalyticsId]: '',
  },

  [Env.Production]: {
    [ConfigKey.GoogleAnalyticsId]: '',
  },
}
