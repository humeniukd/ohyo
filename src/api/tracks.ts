import axios from 'axios'
import { Track } from 'types'

export const resolve = (permalink: string) =>
    axios.get('resolve', {params: { permalink }})

export const track = (track: Track) =>
    axios.put('tracks', track)

export const artwork = (trackId: string, file: Blob) => {
  const formData = new FormData();
  formData.append('file', file);
  return axios.post(`tracks/${trackId}/artwork`, formData,  {
    headers: {
      'Content-Type': `multipart/form-data;`,
    },
  })
}
