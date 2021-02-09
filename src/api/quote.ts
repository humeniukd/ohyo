import axios from 'axios'
import qs from 'qs'

export const getQuote = (/* queryKey */ _: string, symbol: string) =>
  axios.get('retail/quote', {
    params: { symbol },
    paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'repeat' }),
  })
