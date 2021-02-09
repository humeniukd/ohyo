/* eslint-disable no-console */
import set from 'lodash/set'
import map from 'lodash/map'
import axios from 'axios'
import fs from 'fs-extra'
import path from 'path'
import rimraf from 'rimraf'
import unzip from 'extract-zip'
import { LokaliseApi } from '@lokalise/node-api'

import {
  LOKALISE_DIR,
  LOKALISE_PROJECT_ID,
  LOKALISE_TOKEN,
  SUPPORTED_LOCALES,
} from './config'

const lokaliseApi = new LokaliseApi({ apiKey: LOKALISE_TOKEN })
const unprocessedLocalePath = path.resolve(__dirname, '../unprocessed-locale/locale')

fs.ensureDirSync(LOKALISE_DIR)

const transformToNestedLocaleObject = (data) =>
  Object.entries(data).reduce((result, [objectPath, value]) => {
    if (objectPath.startsWith('domain.')) {
      set(
        result,
        `domain["${objectPath.slice(7).replace(/\./g, '-')}"]`,
        value.replace(/\\n/g, ' '),
      )
    } else {
      // pages.Sample.heading.title to { pages: { Sample: { heading: { title: "..." } } } }
      set(result, objectPath, value.replace(/\\n/g, ' '))
    }
    return result
  }, {})

const downloadLocalizations = async () => {
  console.log('🔍 Getting link from lokalise')

  const data = await lokaliseApi.files.download(LOKALISE_PROJECT_ID, {
    format: 'json',
    replace_breaks: true,
    export_empty_as: 'base',
    filter_langs: map(SUPPORTED_LOCALES, 'locale'),
    original_filenames: false,
  })

  console.log('⬇️ Download started...')

  const zipFileResponse = await axios({
    method: 'GET',
    url: data.bundle_url,
    responseType: 'stream',
  })

  const { data: zipFileStream } = zipFileResponse
  const localeZipFilePath = path.resolve(__dirname, '../locales.zip')

  zipFileStream.pipe(fs.createWriteStream(localeZipFilePath))

  return new Promise((resolve, reject) => {
    const unzipPath = path.resolve(__dirname, '../unprocessed-locale')
    const unzipOptions = {
      dir: unzipPath,
    }

    const unzipCb = (err) => {
      if (err) {
        console.warn('💥 Unzip of locales.zip failed!')
        reject(err)
        return
      }

      fs.unlinkSync(localeZipFilePath)
      console.log('🎉 Localizations were downloaded and extracted successfully')
      resolve()
    }

    zipFileStream.on('end', () => {
      console.log('✅ Download successful')
      unzip(localeZipFilePath, unzipOptions, unzipCb)
    })

    zipFileStream.on('error', (err) => {
      console.warn('💥 Download failed')
      reject(err)
    })
  })
}

const readAndParseLocales = (fileName) => {
  const parsedJson = JSON.parse(
    fs.readFileSync(path.resolve(unprocessedLocalePath, fileName)),
  )

  console.log(`🛠 Locale file ${fileName} parsed to JS`)

  return [fileName, transformToNestedLocaleObject(parsedJson)]
}

const stringifyAndWriteToSrc = ([file, localeObject]) => {
  const jsonString = JSON.stringify(localeObject, null, '  ')
  const filePath = path.resolve(LOKALISE_DIR, file)

  fs.existsSync(filePath) && fs.unlinkSync(filePath)
  fs.writeFileSync(filePath, jsonString, {
    flag: 'w+',
    encoding: 'utf-8',
  })

  console.log(`⚒ New ${file} written to the src/i18n`)
}

const run = async () => {
  try {
    await downloadLocalizations()
    const unprocessedJsonsFileList = fs.readdirSync(unprocessedLocalePath, 'utf-8')

    unprocessedJsonsFileList.map(readAndParseLocales).forEach(stringifyAndWriteToSrc)

    rimraf(
      path.resolve(__dirname, '../unprocessed-locale'),
      (err) => err && console.warn(err),
    )
    console.log('🎉 Done')
  } catch (e) {
    console.log(e)

    process.exit(1)
  }
}

run()
