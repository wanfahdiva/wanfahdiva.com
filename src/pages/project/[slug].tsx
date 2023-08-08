import type { GetStaticPaths, GetStaticProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import { Fragment } from 'react'
import { BiLink } from 'react-icons/bi'
import { BsCodeSlash } from 'react-icons/bs'
import { RiGithubLine } from 'react-icons/ri'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeHighlight from 'rehype-highlight'
import rehypeSlug from 'rehype-slug'

import 'highlight.js/styles/atom-one-dark.css'

import clsxm from '@/lib/clsxm'

import ArrowLink from '@/components/Links/ArrowLink'
import { H2, H3 } from '@/components/MDX'
import Seo from '@/components/SEO'

import {
  getNextProject,
  getPrevProject,
  getProjectFromSlug,
  getSlugs,
  ProjectMeta,
} from '@/api/project'

interface ProjectProps {
  project: {
    source: MDXRemoteSerializeResult
    meta: ProjectMeta
    nextProject?: { slug: string; title: string }
    prevProject?: { slug: string; title: string }
  }
}

export default function ProjectDetail({ project }: ProjectProps) {
  const tags = project.meta.tags.map((tag) => `#${tag}`).join(' ')

  return (
    <Fragment>
      <Seo
        templateTitle={project.meta.title}
        description={project.meta.excerpt}
      />
      <div className='mx-auto flex w-full max-w-5xl flex-col space-y-5 px-7 pt-5 md:space-y-3 md:pb-5 md:pt-10'>
        <div className='flex flex-col justify-start space-y-5'>
          <div className='-ml-2 inline-flex'>
            <ArrowLink href='/project' className='text-lg' direction='left'>
              Back to Project
            </ArrowLink>
          </div>
          <div className='relative h-52 w-full md:h-96'>
            {project.meta.coverImage && (
              <Image
                src={project.meta.coverImage}
                objectFit='cover'
                objectPosition='top'
                layout='fill'
                alt={project.meta.title}
                className='rounded'
              />
            )}
          </div>
          <div className='flex flex-col space-y-2'>
            <div className='flex w-full items-start justify-between'>
              <h1 className='inline-flex text-2xl font-bold md:text-4xl'>
                {project.meta.title}
              </h1>
              <small>{project.meta.date}</small>
            </div>
            <p>{project.meta.excerpt}</p>
            <div className='flex flex-col-reverse space-y-2 space-y-reverse pt-3 md:flex-row md:justify-between md:space-y-0 md:pt-7'>
              <div className='flex flex-col space-y-1 md:flex-row md:space-x-4 md:space-y-0'>
                <div className='flex items-center space-x-1 text-sm'>
                  <BsCodeSlash className='w-4' />
                  <p className='text-sm'>Team Project, FrontEnd</p>
                </div>
                <div className='flex items-center space-x-1 text-sm'>
                  <BiLink className='w-4' />
                  <a
                    href='https://wanfahdiva.me'
                    target='_blank'
                    className='underline decoration-neutral-600 decoration-2 underline-offset-2 '
                    rel='noreferrer'
                  >
                    Open Live Site
                  </a>
                </div>
                <div className='flex items-center space-x-1 text-sm'>
                  <RiGithubLine className='w-4' />
                  <a
                    href='https://github.com/wanfahdiva'
                    target='_blank'
                    className='underline decoration-neutral-600 decoration-2 underline-offset-2 '
                    rel='noreferrer'
                  >
                    Repository
                  </a>
                </div>
              </div>
              <div className='flex items-center space-x-2'>
                <p className='text-sm'>Stack: </p>
                <div className='flex space-x-2'>
                  {tags.split(' ').map((tag) => (
                    <span className='text-sm' key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='flex border-t pb-2 pt-10 md:py-10'>
          <article className='mdx w-full md:pr-2'>
            <MDXRemote
              {...project.source}
              components={{
                h2: H2,
                h3: H3,
                Image,
              }}
            />
          </article>
        </div>
        <div
          className={clsxm(
            'grid grid-cols-2 items-center gap-x-4 pt-7 md:px-10 md:pt-0',
            project.nextProject && project.prevProject
              ? 'justify-between'
              : project.nextProject
              ? 'justify-end'
              : 'justify-start'
          )}
        >
          {project.prevProject && (
            <div
              className={clsxm(
                'inline-flex w-auto flex-col items-start pl-0',
                !project.nextProject && 'col-span-2'
              )}
            >
              <p>Previous Project</p>
              <Link href={`/project/${project.prevProject.slug}`}>
                <a className='line-clamp-1 w-auto max-w-[10rem]'>
                  {project.prevProject.title}
                </a>
              </Link>
            </div>
          )}
          {project.nextProject && (
            <div
              className={clsxm(
                'inline-flex w-auto flex-col items-end pr-0',
                !project.prevProject && 'col-span-2'
              )}
            >
              <p>Next Project</p>
              <Link href={`/project/${project.nextProject.slug}`}>
                <a className='line-clamp-1 w-auto max-w-[10rem]'>
                  {project.nextProject.title}
                </a>
              </Link>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params as { slug: string }
  const { content, meta } = getProjectFromSlug(slug)

  const mdxSource = await serialize(content, {
    mdxOptions: {
      rehypePlugins: [
        rehypeSlug,
        [rehypeAutolinkHeadings, { behavior: 'wrap' }],
        rehypeHighlight,
      ],
    },
  })

  const nextProject = getNextProject(slug) ?? null
  const prevProject = getPrevProject(slug) ?? null

  return {
    props: {
      project: {
        source: mdxSource,
        meta,
        nextProject,
        prevProject,
      },
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getSlugs().map((slug) => ({ params: { slug } }))

  return {
    paths,
    fallback: false,
  }
}
