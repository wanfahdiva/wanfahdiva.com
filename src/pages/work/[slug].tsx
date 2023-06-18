import clsx from 'clsx'
import type {
  GetStaticPaths,
  GetStaticProps,
  NextLayoutComponentType,
} from 'next'
import Image from 'next/image'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import { Fragment } from 'react'
import { BiLink } from 'react-icons/bi'
import { BsCodeSlash } from 'react-icons/bs'
import { RiGithubLine } from 'react-icons/ri'
import { Link } from 'react-scroll'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeHighlight from 'rehype-highlight'
import rehypeSlug from 'rehype-slug'

import 'highlight.js/styles/atom-one-dark.css'

import ArrowLink from '@/components/Links/ArrowLink'
import { H2, H3 } from '@/components/MDX'
import Seo from '@/components/SEO'

import {
  getNextSlug,
  getPrevSlug,
  getSlugs,
  getWorkFromSlug,
  WorkMeta,
} from '@/api/get-work'

interface MDXWorkProps {
  work: {
    source: MDXRemoteSerializeResult
    meta: WorkMeta
    tableOfContents: { slug: string; title: string; level: number }[]
    nextWork?: {
      title: string
      slug: string
    }
    prevWork?: {
      title: string
      slug: string
    }
  }
}

const WorkDetail: NextLayoutComponentType<MDXWorkProps> = ({ work }) => {
  const tags = work.meta.tags.map((tag) => `#${tag}`).join(' ')
  return (
    <Fragment>
      <Seo title={work.meta.title} description={work.meta.excerpt} />
      <div className='mx-auto flex w-full max-w-5xl flex-col space-y-5 py-5 px-7 md:space-y-3 md:px-0 md:py-7'>
        <div className='flex flex-col justify-start space-y-5'>
          <div className='-ml-2 inline-flex'>
            <ArrowLink href='/work' className='text-lg' direction='left'>
              Back to Work
            </ArrowLink>
          </div>
          <div className='relative h-52 w-full md:h-96'>
            {work.meta.coverImage && (
              <Image
                src={work.meta.coverImage}
                objectFit='cover'
                objectPosition='top'
                layout='fill'
                alt={work.meta.title}
                className='rounded-md'
              />
            )}
          </div>
          <div className='flex flex-col space-y-2'>
            <div className='flex w-full items-start justify-between'>
              <h1 className='inline-flex text-2xl font-bold md:text-4xl'>
                {work.meta.title}
              </h1>
              <small>{work.meta.date}</small>
            </div>
            <p className='!text-[#d4d4d4]'>{work.meta.excerpt}</p>
            <div className='flex flex-col-reverse space-y-2 space-y-reverse pt-3 md:flex-row md:justify-between md:space-y-0 md:pt-7'>
              <div className='flex flex-col space-y-1 md:flex-row md:space-x-4 md:space-y-0'>
                <div className='flex items-center space-x-1 !text-sm'>
                  <BsCodeSlash className='w-4' />
                  <p className='!text-sm'>Team Project, FrontEnd</p>
                </div>
                <div className='flex items-center space-x-1 !text-sm'>
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
                <div className='flex items-center space-x-1 !text-sm'>
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
        {work ? (
          <div className='flex border-t py-10'>
            <article className='mdx w-full md:w-[72.5%] md:pr-2'>
              <MDXRemote
                {...work.source}
                components={{
                  h2: H2,
                  h3: H3,
                  Image,
                }}
              />
            </article>
            <div className='relative hidden w-[27.5%] pl-2 md:block'>
              <div className='sticky left-0 top-32 max-h-80 overflow-y-auto p-4 pt-0'>
                <h3 className='mb-3 text-lg font-bold'>Table of Contents</h3>
                <ul className='flex flex-col space-y-2'>
                  {work.tableOfContents.map((item) => {
                    return (
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-ignore
                      <Link
                        key={item.slug}
                        to={item.slug.replace(/&/g, '').replace(/'/g, '')}
                        spy={true}
                        smooth={true}
                        offset={-85}
                        duration={500}
                        className={clsx(
                          'cursor-pointer text-left text-sm text-[#d4d4d4]',
                          item.level === 3 ? 'pl-4' : ''
                        )}
                      >
                        - &nbsp;
                        {item.title}
                      </Link>
                    )
                  })}
                </ul>
              </div>
            </div>
          </div>
        ) : null}
        <div className='mt-3 flex w-full flex-col space-y-3 border-t pt-4 md:w-[72.5%] md:flex-row md:space-x-3 md:space-y-0'>
          {work.prevWork && (
            <div className='flex w-full flex-col items-start justify-start space-y-1 rounded bg-white bg-opacity-10 p-4 text-left md:items-end md:text-right'>
              <ArrowLink
                className='-ml-2 md:m-0'
                href={`/work/${work.prevWork.slug}`}
                direction='left'
              >
                <h2 className='group text-xl line-clamp-2'>
                  {work.prevWork.title}
                </h2>
              </ArrowLink>
              <small>Next</small>
            </div>
          )}
          {work.nextWork && (
            <div className='flex w-full flex-col items-end justify-end space-y-1 rounded bg-white bg-opacity-10 p-4 text-right md:items-start md:text-left'>
              <ArrowLink
                className='-mr-2 md:m-0'
                href={`/work/${work.nextWork.slug}`}
              >
                <h2 className='group text-xl line-clamp-2'>
                  {work.nextWork.title}
                </h2>
              </ArrowLink>
              <small>Prev</small>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  )
}

WorkDetail.getLayout = function getLayout(page) {
  return page
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params as { slug: string }
  const { content, meta } = getWorkFromSlug(slug)
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

  const nextWork = getNextSlug(slug)
  const prevWork = getPrevSlug(slug)

  return {
    props: {
      work: {
        source: mdxSource,
        meta,
        tableOfContents,
        nextWork: nextWork,
        prevWork: prevWork,
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

export default WorkDetail
