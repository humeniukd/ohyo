type LocalizationParam = { key?: string; value?: string }

type PreparedParam = {
  param: string | number
}

export type LocalizationArgument = {
  key: string
  param?: PreparedParam
}

const processParams = (params: LocalizationParam[]): PreparedParam | null => {
  if (params?.length > 0 && params[0] && params[0].value) {
    return {
      param: params[0].value,
    }
  }

  return null
}
export const localization = {
  // @ts-ignore
  getStringWithParamsArray: (
    key: string,
    params?: LocalizationParam[],
  ): LocalizationArgument => {
    if (params) {
      const p = processParams(params)
      if (p) {
        return { key, param: p }
      }
      return {
        key,
      }
    }

    return {
      key,
    }
  },

  getString: (key: string, params?: string | number): LocalizationArgument => {
    if (params) {
      return {
        key,
        param: { param: params },
      }
    }

    return {
      key,
    }
  },

  // @ts-ignore
  getStringWithParamTranslationRequired: (key: string, paramWhichRequiresTranslation) => {
    return key
  },
}


export const DEFAULT_LOCALE = 'en-US'
