import axios, { AxiosResponse } from 'axios'

import { HttpCode, browser, Url } from 'utils'
import { setupAxios } from '../setupAxios'

jest.mock('utils/browser')

describe('setupAxios', () => {
  beforeAll(() => {
    setupAxios()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it(`should throw error if response status is other then ${HttpCode.Unauthorized}`, async () => {
    // given
    const mockResponse: { response: Partial<AxiosResponse> } = {
      response: { status: HttpCode.InternalServerError },
    }

    const firstResponseHandler = axios.interceptors.response.handlers[0]

    // when
    const result = firstResponseHandler.rejected(mockResponse)

    // then
    expect(browser.navigateTo).toHaveBeenCalledTimes(0)

    await expect(result).rejects.toMatchObject(mockResponse)
  })

  it(`should redirect to start page if response status is ${HttpCode.Unauthorized} and url belongs to auth flow`, async () => {
    // given
    const mockGetPathname = browser.getPathname as jest.Mock
    const mockResponse: { response: Partial<AxiosResponse> } = {
      response: {
        status: HttpCode.Unauthorized,
      },
    }

    mockGetPathname.mockReturnValueOnce(Url.Start)

    const firstResponseHandler = axios.interceptors.response.handlers[0]

    // when
    const result = firstResponseHandler.rejected(mockResponse)

    // then
    expect(browser.navigateTo).toHaveBeenCalledTimes(0)

    await expect(result).rejects.toMatchObject(mockResponse)
  })

  it(`should redirect to start page if response status is ${HttpCode.Unauthorized} and url does not belong to auth flow`, () => {
    // given
    const mockGetPathname = browser.getPathname as jest.Mock
    const mockResponse: { response: Partial<AxiosResponse> } = {
      response: {
        status: HttpCode.Unauthorized,
      },
    }

    mockGetPathname.mockReturnValueOnce(Url.Account)

    const firstResponseHandler = axios.interceptors.response.handlers[0]

    // when
    const result = firstResponseHandler.rejected(mockResponse)

    // then
    expect(browser.navigateTo).toHaveBeenCalledTimes(1)
    expect(browser.navigateTo).toHaveBeenCalledWith(Url.Start)

    expect(result).toBeUndefined()
  })
})
