import axios, { AxiosResponse } from 'axios'
import { Progress, Transcoding } from 'types'

export const createTranscoding = ({
  uid,
}: Transcoding): Promise<AxiosResponse<Progress>> => {
  return axios.post<Progress>('transcodings', {
    params: {
      uid,
    },
  })
}

export const getTranscoding = ({
  uid,
}: Transcoding): Promise<AxiosResponse<Progress>> => {
  return axios.get<Progress>(`transcodings/${uid}`)
}