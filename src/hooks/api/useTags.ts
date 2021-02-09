import { useMutation } from 'react-query'

import { tagsSuggestions } from 'api'
import { Tag } from 'types'

export const useTagsSuggestions = () => {
    const [mutate, { data: axiosData },  ] = useMutation(tagsSuggestions)
    return [mutate, axiosData?.data] as [typeof mutate, Tag[] | undefined]
}