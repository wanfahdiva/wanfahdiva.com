declare module 'strapi/response' {
  interface Meta {
    pagination?: {
      start?: number
      limit?: number
      page?: number
      pageSize?: number
      pageCount?: number
      total?: number
    }
  }
  interface MediaBasic {
    alternativeText?: string
    caption?: string
    createdAt: Date | string
    ext: string
    formats: Record<string, string>
    hash?: string
    height?: number
    mime?: string
    name?: string
    previewUrl?: string
    provider?: string
    provider_metadata?: string
    size?: number
    updatedAt?: Date | string
    url?: string
    width?: number
  }
  interface Media {
    data?: {
      id: number
      attributes: MediaBasic
    }[] &
      MediaBasic[]
  }
}
