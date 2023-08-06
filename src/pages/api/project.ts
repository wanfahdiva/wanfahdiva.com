import fs from 'fs'
import { sync } from 'glob'
import matter from 'gray-matter'
import path from 'path'

interface Project {
  content: string
  meta: ProjectMeta
}

export interface ProjectMeta {
  excerpt: string
  slug: string
  title: string
  tags: string[]
  date: string
  coverImage?: string
  blurUrl?: string
  isFeatured?: string
}

const CONTENT_PATH = path.join(process.cwd(), '/content/project')

export const getSlugs = (): string[] => {
  const paths = sync(`${CONTENT_PATH}/*.mdx`)
  return paths.map((path: string) => {
    const parts = path.split('/')
    const fileName = parts[parts.length - 1]
    const [slug, _ext] = fileName.split('.')
    return slug
  })
}

export const getAllProject = () => {
  const project = getSlugs()
    .map((slug) => getProjectFromSlug(slug))
    .sort((a, b) => {
      if (a.meta.date > b.meta.date) return 1
      if (a.meta.date < b.meta.date) return -1
      return 0
    })
    .reverse()
  return project
}

export const getFeaturedProject = () => {
  const project = getAllProject()
  const featured = project.filter((project) => project.meta.isFeatured)
  return featured
}

export const getProjectFromSlug = (slug: string): Project => {
  const projectPath = path.join(CONTENT_PATH, `${slug}.mdx`)
  const source = fs.readFileSync(projectPath)
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

export const getNextProject = (slug: string) => {
  const project = getAllProject()
  const index = project.findIndex((project) => project.meta.slug === slug)
  const next = project[index + 1]?.meta ?? null
  if (next) {
    return {
      slug: next.slug,
      title: next.title,
    }
  }
}

export const getPrevProject = (slug: string) => {
  const project = getAllProject()
  const index = project.findIndex((project) => project.meta.slug === slug)
  const prev = project[index - 1]?.meta ?? null
  if (prev) {
    return {
      slug: prev.slug,
      title: prev.title,
    }
  }
}
