import fs from 'fs'
import { sync } from 'glob'
import matter from 'gray-matter'
import path from 'path'

const CONTENT_PATH = path.join(process.cwd(), '/content/work')

export const getSlugs = (): string[] => {
  const paths = sync(`${CONTENT_PATH}/*.mdx`)
  return paths.map((path: string) => {
    const parts = path.split('/')
    const fileName = parts[parts.length - 1]
    const [slug, _ext] = fileName.split('.')
    return slug
  })
}

export const getAllWork = () => {
  const work = getSlugs()
    .map((slug) => getWorkFromSlug(slug))
    .sort((a, b) => {
      if (a.meta.date > b.meta.date) return 1
      if (a.meta.date < b.meta.date) return -1
      return 0
    })
    .reverse()
  return work
}

export const getFeaturedWork = () => {
  const work = getAllWork()
  const featured = work.filter((work) => work.meta.isFeatured)
  return featured
}

interface Work {
  content: string
  meta: WorkMeta
}

export interface WorkMeta {
  excerpt: string
  slug: string
  title: string
  tags: string[]
  date: string
  coverImage?: string
  blurUrl?: string
  isFeatured?: string
}

export const getWorkFromSlug = (slug: string): Work => {
  const workPath = path.join(CONTENT_PATH, `${slug}.mdx`)
  const source = fs.readFileSync(workPath)
  const { content, data } = matter(source)

  return {
    content,
    meta: {
      slug,
      excerpt: data.excerpt ?? '',
      title: data.title ?? slug,
      tags: (data.tags ?? []).sort(),
      date: (data.date ?? new Date()).toString(),
      coverImage: data.coverImage ?? '',
      blurUrl: data.blurUrl ?? '',
      isFeatured: data.isFeatured ?? '',
    },
  }
}

export const getNextSlug = (slug: string) => {
  const slugs = getSlugs()
  const index = slugs.indexOf(slug)
  const nextIndex = (index + 1) % slugs.length
  const data = getWorkFromSlug(slugs[nextIndex])
  if (data.meta) {
    return {
      title: data.meta.title,
      slug: data.meta.slug,
    }
  }
}

export const getPrevSlug = (slug: string) => {
  const slugs = getSlugs()
  const index = slugs.indexOf(slug)
  const prevIndex = (index - 1 + slugs.length) % slugs.length
  const data = getWorkFromSlug(slugs[prevIndex])
  if (data.meta) {
    return {
      title: data.meta.title,
      slug: data.meta.slug,
    }
  }
}
