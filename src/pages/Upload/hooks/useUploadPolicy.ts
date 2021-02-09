import { useQuery } from 'react-query'
import { getUploadPolicy } from 'api'
import { QueryKey } from 'utils/constants'
import { PresignedPostData } from 'types'

const fetchUploadPolicy: (_: string) => Promise<PresignedPostData | null> = async (_: string) => {
  try {
    const { data } = await getUploadPolicy()
    return data
  } catch (e) {
    return null
  }
}

export const useUploadPolicy = () => {
  const { data, isFetching } = useQuery([QueryKey.Upload], fetchUploadPolicy, {
    staleTime: Infinity,
  })

  return {
    data,
    isFetching,
  }
}
