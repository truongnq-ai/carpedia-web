import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import remarkGfm from 'remark-gfm'
import { remarkAlert } from 'remark-github-blockquote-alert'

const withBundleAnalyzer = (await import('@next/bundle-analyzer')).default({
  enabled: process.env.ANALYZE === 'true',
})

const basePath = process.env.BASE_PATH || undefined
const unoptimized = process.env.UNOPTIMIZED ? true : undefined

// Content Security Policy (Optional, but keeping it as it was intended, just ensuring it doesn't break dev)
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline';
  style-src 'self' 'unsafe-inline';
  img-src * blob: data:;
  media-src *.s3.amazonaws.com;
  connect-src *;
  font-src 'self';
`

const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim(),
  },
  {
      key: 'Referrer-Policy',
      value: 'strict-origin-when-cross-origin',
  },
  {
      key: 'X-Frame-Options',
      value: 'DENY',
  },
  {
      key: 'X-Content-Type-Options',
      value: 'nosniff',
  },
  {
      key: 'X-DNS-Prefetch-Control',
      value: 'on',
  },
  {
      key: 'Strict-Transport-Security',
      value: 'max-age=31536000; includeSubDomains',
  },
  {
      key: 'Permissions-Policy',
      value: 'camera=(), microphone=(), geolocation=()',
  },
]

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath,
  reactStrictMode: true,
  trailingSlash: false,
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    dirs: ['app', 'components', 'lib'],
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [],
    unoptimized,
  },
  transpilePackages: ['next-mdx-remote'],
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },
}

export default withBundleAnalyzer(nextConfig)
