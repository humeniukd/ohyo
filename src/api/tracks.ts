import axios from 'axios'
import { Track } from 'types'

export const resolve = (permalink: string) =>
    axios.get('resolve', {params: { permalink }})

export const track = (track: Track) =>
    axios.post('tracks', track)

export const artwork = (trackId: string, file: Blob) => {
  const formData = new FormData();
  formData.append('file', file);
  return axios.put(`tracks/${trackId}/artwork`, formData,  {
    headers: {
      'Content-Type': `multipart/form-data;`,
    },
  })
}
