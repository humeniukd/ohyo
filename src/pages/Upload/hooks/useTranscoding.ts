import { useQuery } from 'react-query'
import { createTranscoding } from 'api'
import { QueryKey } from 'utils/constants'

const fetchTranscoding = (uid: string) => async () => {
  try {
    const { data } = await createTranscoding({ uid })
    return data
  } catch (e) {
    return null
  }
}

export const useTranscoding = (uid: string) => {
  const { data, isFetching } = useQuery([QueryKey.Transcoding], fetchTranscoding(uid), {
    staleTime: Infinity,
  })

  return {
    data,
    isFetching,
  }
}

