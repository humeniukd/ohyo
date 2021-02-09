import axios from 'axios'

import { Tag } from 'types'

export const tagsSuggestions = (prefix: string) =>
    axios.get<Tag[]>('tags/suggestions', {params: { prefix }})
