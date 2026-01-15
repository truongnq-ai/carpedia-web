import type { MDXComponents as MDXComponentsType } from 'mdx/types'
import Image from 'next/image'
import Link from 'next/link'

export function useMDXComponents(components: MDXComponentsType): MDXComponentsType {
  return {
    Image: (props) => <Image {...props} />,
    a: (props) => <Link {...props} />,
    ...components,
  }
}
