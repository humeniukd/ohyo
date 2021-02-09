import { useQuery } from 'react-query'

import { QueryKey } from 'utils'
import { getMe } from 'api'
import { User } from 'types'

export const useMe = () => {
  const { data: axiosData, isFetching } = useQuery(QueryKey.User, getMe, {
    staleTime: Infinity,
  })

  return [axiosData?.data, isFetching] as [User | undefined, boolean]
}
