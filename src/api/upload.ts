import axios from 'axios'
import { PresignedPostData } from 'types'

export const getUploadPolicy = () => axios.get<PresignedPostData>(`/presign`)

