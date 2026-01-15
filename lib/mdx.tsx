import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote/rsc'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import remarkGfm from 'remark-gfm'
import { remarkAlert } from 'remark-github-blockquote-alert'
import MDXComponents from '@/components/MDXComponents'

/**
 * MDX Remote component with project standards
 */
export function CustomMDX(props: MDXRemoteProps) {
  return (
    <MDXRemote
      {...props}
      components={{ ...MDXComponents, ...(props.components || {}) }}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm, remarkAlert],
          rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
        },
        ...(props.options || {}),
      }}
    />
  )
}
