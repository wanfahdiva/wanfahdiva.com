import { AxiosRequestConfig } from 'axios'

import api from './api'

export const fetcher = async (url: string | null, config?: AxiosRequestConfig) => {
  if (typeof url !== 'string' || !url || url === '') return null

  return api
    .get(url, config)
    .then((res) => {
      return res.data
    })
    .catch((e) => {
      throw new Error(e)
    })
}
