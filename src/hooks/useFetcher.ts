import { AxiosRequestConfig } from 'axios'
import { Meta } from 'strapi/response'
import useSWR from 'swr'

type UseFetcher = <T>(
  url: string | null,
  params?: AxiosRequestConfig
) => {
  data: T
  isLoading: boolean
  isError: any
  mutate?: any
  count?: number
  meta?: Meta
}

export const useFetcher: UseFetcher = (url) => {
  const { data, error, mutate } = useSWR(url)
  return {
    data: data?.data,
    meta: data?.meta,
    count: data?.count,
    mutate,
    isLoading: !error && !data,
    isError: error,
  }
}

export const useCustomFetcher: UseFetcher = (url) => {
  const { data, error, mutate } = useSWR(url)
  return {
    data: data,
    mutate,
    isLoading: !error && !data,
    isError: error,
  }
}
