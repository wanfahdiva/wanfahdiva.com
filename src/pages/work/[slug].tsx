import type {
  GetStaticPaths,
  GetStaticProps,
  NextLayoutComponentType,
} from 'next'
import Image from 'next/image'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import { useEffect, useState } from 'react'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeHighlight from 'rehype-highlight'
import rehypeSlug from 'rehype-slug'

import 'highlight.js/styles/atom-one-dark.css'

import { Layout } from '@/components/Layout/Layout'
import { YouTube } from '@/components/MDX/'
import Seo from '@/components/SEO'

import { getPostFromSlug, getSlugs, PostMeta } from '@/api/api'

interface MDXPost {
  source: MDXRemoteSerializeResult<Record<string, unknown>>
  meta: PostMeta
}

const WorkDetail: NextLayoutComponentType = ({ post }) => {
  const [data, setData] = useState<MDXPost | unknown>(post) as any

  useEffect(() => {
    setData(post)
  }, [post])
  return (
    <div className='py-10 md:py-16' id='mdx'>
      <MDXRemote {...data.source} components={{ YouTube, Image }} />
    </div>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params as { slug: string }
  const { content, meta } = getPostFromSlug(slug)
  const mdxSource = await serialize(content, {
    mdxOptions: {
      rehypePlugins: [
        rehypeSlug,
        [rehypeAutolinkHeadings, { behavior: 'wrap' }],
        rehypeHighlight,
      ],
    },
  })

  return { props: { post: { source: mdxSource, meta } } }
}

WorkDetail.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Seo templateTitle='Work Detail' />
      {page}
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getSlugs().map((slug) => ({ params: { slug } }))

  return {
    paths,
    fallback: false,
  }
}

export default WorkDetail
