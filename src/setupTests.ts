import { setConsole } from 'react-query'
import noop from 'lodash/noop'
import reduce from 'lodash/reduce'
import 'jest-localstorage-mock'

import '@testing-library/jest-dom/extend-expect'

import { defaultStorage, secureStorage } from 'utils/storage/storage'

jest.mock('react-router-dom', () => {
  const mockPush = jest.fn()

  return {
    ...jest.requireActual('react-router-dom'),
    useHistory: () => ({
      push: mockPush,
    }),
  }
})

jest.mock('./env', () => ({
  ...jest.requireActual('./env'),
  // Use "test" environment for unit tests
  getEnvByOrigin: () => 'test',
  isDevelopmentEnv: () => false,
  isProductionEnv: () => false,
}))

// This is required for ui-kit popups (popper.js).
window.document.createRange = () =>
  (({
    commonAncestorContainer: {
      nodeName: 'BODY',
      ownerDocument: document,
    } as Node,

    setStart: () => {},
    setEnd: () => {},
  } as unknown) as Range)

window.BroadcastChannel = jest.fn(() => ({
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
})) as any

let mockDocumentCookies = {}

Object.defineProperty(window.document, 'cookie', {
  get: () =>
    reduce(
      mockDocumentCookies,
      (acc, value, key) => {
        acc += `${key}=${value};`

        return acc
      },
      '',
    ),

  set: (value: string) => {
    const eqIndex = value.indexOf('=')
    const [cookieName, cookieValue] = [
      value.substring(0, eqIndex),
      value.substring(eqIndex + 1),
    ]

    mockDocumentCookies[cookieName] = cookieValue
  },
})

// Prevents "react-query" from additional logging of rejection errors.
beforeAll(() => {
  setConsole({
    // eslint-disable-next-line no-console
    log: console.log,
    warn: console.warn,
    error: noop,
  })
})

afterEach(() => {
  mockDocumentCookies = {}

  secureStorage.clear()
  defaultStorage.clear()
})

afterAll(() => {
  setConsole({
    // eslint-disable-next-line no-console
    log: console.log,
    warn: console.warn,
    error: console.error,
  })
})
