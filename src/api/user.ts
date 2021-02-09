import axios from 'axios'

import { User } from 'types'

export const getMe = () => axios.get<{ user: User }>('/me')
