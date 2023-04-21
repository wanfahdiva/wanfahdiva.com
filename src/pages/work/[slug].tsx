import type {
  GetStaticPaths,
  GetStaticProps,
  NextLayoutComponentType,
} from 'next'
import Image from 'next/image'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import { Fragment, useEffect, useState } from 'react'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeHighlight from 'rehype-highlight'
import rehypeSlug from 'rehype-slug'

import 'highlight.js/styles/atom-one-dark.css'

import { YouTube } from '@/components/MDX/'
import Seo from '@/components/SEO'

import { getSlugs, getWorkFromSlug, WorkMeta } from '@/api/work'

interface MDXWork {
  source: MDXRemoteSerializeResult<Record<string, unknown>>
  meta: WorkMeta
}

const WorkDetail: NextLayoutComponentType = ({ work }) => {
  const [data, setData] = useState<MDXWork | unknown>(work) as any

  useEffect(() => {
    setData(work)
  }, [work])
  return (
    <Fragment>
      <Seo templateTitle='Work Detail' />
      <div className='py-10 md:py-16' id='mdx'>
        <MDXRemote {...data.source} components={{ YouTube, Image }} />
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
  const mdxSource = await serialize(content, {
    mdxOptions: {
      rehypePlugins: [
        rehypeSlug,
        [rehypeAutolinkHeadings, { behavior: 'wrap' }],
        rehypeHighlight,
      ],
    },
  })

  return { props: { work: { source: mdxSource, meta } } }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getSlugs().map((slug) => ({ params: { slug } }))

  return {
    paths,
    fallback: false,
  }
}

export default WorkDetail
