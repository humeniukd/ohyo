/* eslint-disable no-console, import/no-dynamic-require, global-require */
import fg from 'fast-glob'
import isObject from 'lodash/isObject'
import reduce from 'lodash/reduce'
import merge from 'lodash/merge'
import path from 'path'
import { LokaliseApi } from '@lokalise/node-api'

import { LOKALISE_DIR, LOKALISE_PROJECT_ID, LOKALISE_TOKEN } from './config'

const LOKALISE_UPLOAD_FILE_NAME = 'index.json'
const LOKALISE_UPLOAD_LANG_ISO = 'en'

const lokaliseApi = new LokaliseApi({ apiKey: LOKALISE_TOKEN })

/**
 * Converts from { a: { b: { c: "foo" } } } to { "a.b.c": "foo" }
 */
const flattenKeys = (obj: object | string, objPath: string[] = []): object =>
  !isObject(obj)
    ? { [objPath.join('.')]: obj }
    : reduce(
        obj,
        (cum, next, key) => merge(cum, flattenKeys(next, [...objPath, key])),
        {},
      )

const processMessages = (obj: object) => {
  return Object.keys(obj).reduce((acc, originalKey) => {
    if (originalKey.startsWith('domain.')) {
      const processedKey = originalKey.replace(/-/g, '.')
      acc[processedKey] = obj[originalKey]
      return acc
    }
    return acc
  }, {})
}
const collectMessages = async () => {
  console.log('🔍 Building i18n strings')

  const entries = await fg<string>(`${path.resolve(LOKALISE_DIR)}/*.json`)

  const output = entries
    .map((filePath) => {
      const messages = require(filePath)

      return processMessages(flattenKeys(messages))
    })
    .reduce((memo, item) => Object.assign(memo, item), {})

  return JSON.stringify(output)
}

const uploadMessages = async (encodedData: string) => {
  console.log('⬆️ Uploading i18n strings...')
  // app.lokalise.com/api2docs/curl/
  const data = await lokaliseApi.files.upload(LOKALISE_PROJECT_ID, {
    data: encodedData,
    filename: LOKALISE_UPLOAD_FILE_NAME,
    lang_iso: LOKALISE_UPLOAD_LANG_ISO,
    replace_modified: false,
  })

  console.log('✅ Upload successful ')

  return data
}

const run = async () => {
  try {
    const output = await collectMessages()
    const { result } = await uploadMessages(Buffer.from(output).toString('base64'))

    console.log(result)
    console.log('🎉 Done')
  } catch (error) {
    console.warn('💥 Upload failed')
    console.warn(error)
  }
}

run()
