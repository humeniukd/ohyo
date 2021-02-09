import axios from 'axios'
import { queryCache } from 'react-query'

import { Config } from 'types'
import { QueryKey } from 'utils'

export const commonConfig = async () => {
  const { data } = await axios.get<Config>('/config')
  return data
}

export const prefetchAppConfig = () => {
  queryCache.prefetchQuery(QueryKey.Config, commonConfig, {
    staleTime: Infinity,
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
  })
}
