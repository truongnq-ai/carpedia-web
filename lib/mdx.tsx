import { compileMDX } from 'next-mdx-remote/rsc'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import remarkGfm from 'remark-gfm'
import Image from '@/components/Image'
import Link from '@/components/Link'

const components = {
  Image,
  a: Link,
}

/**
 * Compile MDX content to React components
 */
export async function compileMDXContent(content: string) {
  try {
    const { content: compiledContent } = await compileMDX({
      source: content,
      components,
      options: {
        parseFrontmatter: false, // We already parsed it in entities.ts
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
        },
      },
    })
    return compiledContent
  } catch (error) {
    console.error('Error compiling MDX:', error)
    return null
  }
}
