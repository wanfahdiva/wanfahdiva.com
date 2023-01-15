import api from '@services/api'
import { AxiosRequestConfig } from 'axios'

export const fetcher = (
  url: string | null,
  locale?: 'id' | 'en' | 'disabled',
  config?: AxiosRequestConfig
) => {
  if (typeof url !== 'string' || !url || url === '') return null
  let editedConfig = config
  if (locale && locale !== 'disabled') {
    editedConfig = {
      ...config,
      params: {
        _locale: locale,
      },
    }
  }
  if (locale === 'disabled') {
    delete api.defaults.params?._locale
  }
  return api
    .get(url, editedConfig)
    .then((res) => {
      return res.data
    })
    .catch((e) => {
      throw new Error(e)
    })
}
