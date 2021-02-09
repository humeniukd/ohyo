import { useQuery } from 'react-query'

import { QueryKey } from 'utils'
import { commonConfig } from 'api'
import { Config } from 'types'

export const useConfig = (): [Config | undefined, boolean] => {
  const { data, isFetching } = useQuery(QueryKey.Config, commonConfig)

  return [data, isFetching]
}
