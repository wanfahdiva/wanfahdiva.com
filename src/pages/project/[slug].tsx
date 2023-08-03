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

import ArrowLink from '@/components/Links/ArrowLink'
import { H2, H3 } from '@/components/MDX'
import Seo from '@/components/SEO'

import {
  getOtherSlug,
  getProjectFromSlug,
  getSlugs,
  ProjectMeta,
} from '@/api/project'

interface MDXProjectProps {
  project: {
    source: MDXRemoteSerializeResult
    meta: ProjectMeta
    tableOfContents: { slug: string; title: string; level: number }[]
    otherProject: {
      title: string
      slug: string
    }[]
  }
}

export default function ProjectDetail({ project }: MDXProjectProps) {
  const tags = project.meta.tags.map((tag) => `#${tag}`).join(' ')
  return (
    <Fragment>
      <Seo
        templateTitle={project.meta.title}
        description={project.meta.excerpt}
      />
      <div className='mx-auto flex w-full max-w-5xl flex-col space-y-5 px-7 py-5 md:space-y-3 md:py-7'>
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
                className='rounded-md'
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
            <p className='text-primary-400'>{project.meta.excerpt}</p>
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
        <div className='flex border-t py-10'>
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
          {/* <div className='relative hidden w-[27.5%] pl-2 md:block'>
            <div className='sticky left-0 top-32 overflow-y-auto p-4 pt-0'>
              <h3 className='mb-3 text-lg font-bold'>Table of Contents</h3>
              <ul className='flex flex-col space-y-2'>
                {project.tableOfContents.map((item) => {
                  return (
                    <ScrollLink
                      key={item.slug}
                      to={item.slug.replace(/&/g, '').replace(/'/g, '')}
                      spy={true}
                      smooth={true}
                      offset={-85}
                      duration={500}
                      className={clsx(
                        'cursor-pointer text-left text-sm text-[#d4d4d4] hover:text-white'
                      )}
                      style={{
                        paddingLeft: item.level > 2 ? item.level + 11 : 0,
                      }}
                    >
                      - &nbsp;
                      {item.title}
                    </ScrollLink>
                  )
                })}
              </ul>
            </div>
          </div> */}
        </div>
        <div>
          <h2 className='text-xl font-semibold'>More Case:</h2>
          <div className='flex w-full flex-col space-y-3 md:flex-row md:space-x-3 md:space-y-0'>
            {project.otherProject &&
              project.otherProject.map((item, index) => (
                <div key={index}>
                  <Link href={`/project/${item.slug}`}>
                    <a className='ordinary-link w-auto px-4 py-2.5 pl-0 text-center underline decoration-neutral-600 decoration-2 underline-offset-2'>
                      <small>{item.title}</small>
                    </a>
                  </Link>
                </div>
              ))}
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params as { slug: string }
  const { content, meta } = getProjectFromSlug(slug)
  const headings = content.match(/#+\s+(.*)/g)

  const tableOfContents = headings
    ?.filter((heading) => /^#+\s/.test(heading))
    .map((heading) => {
      const levelMatch = heading.match(/^#+/)
      const level = levelMatch ? levelMatch[0].length : 0
      const slug = heading
        .replace(/^#+\s+/g, '')
        .toLowerCase()
        .replace(/\s/g, '-')
      return { slug, title: heading.replace(/^#+\s+/g, ''), level }
    })

  const mdxSource = await serialize(content, {
    mdxOptions: {
      rehypePlugins: [
        rehypeSlug,
        [rehypeAutolinkHeadings, { behavior: 'wrap' }],
        rehypeHighlight,
      ],
    },
  })

  const otherProject = getOtherSlug(slug)

  return {
    props: {
      project: {
        source: mdxSource,
        meta,
        tableOfContents,
        otherProject,
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
