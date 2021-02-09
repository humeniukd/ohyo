import path from 'path'

import supportedLocales from '../../config/json/supportedLocales.json'

export const LOKALISE_DIR = path.resolve(__dirname, '../../i18n')

export const LOKALISE_PROJECT_ID = '833657865f4e1215e7ca50.51202939'
export const LOKALISE_TOKEN = process.env.LOKALISE_TOKEN
export const SUPPORTED_LOCALES = supportedLocales
