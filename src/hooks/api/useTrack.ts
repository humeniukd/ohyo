import { useMutation } from 'react-query'

import { track } from 'api'
import { Track } from 'types'

export const useTagsSuggestions = () => {
    const [mutate] = useMutation(track)
    return [mutate, axiosData?.data] as [typeof mutate, Tag[] | undefined]
}