import Link from 'next/link'
import Image from 'next/image'

interface EntityCardProps {
  title: string
  description?: string
  href: string
  image?: string
  footer?: React.ReactNode
}

export default function EntityCard({ title, description, href, image, footer }: EntityCardProps) {
  return (
    <div className="md p-4 md:w-1/2" style={{ maxWidth: '544px' }}>
      <div
        className={`${
          image ? 'h-full' : ''
        } border-opacity-60 overflow-hidden rounded-md border-2 border-gray-200 dark:border-gray-700`}
      >
        {image && (
          <Link href={href} aria-label={`Link to ${title}`}>
            <Image
              alt={title}
              src={image}
              className="aspect-3/2 w-full object-cover object-center"
              width={544}
              height={306}
            />
          </Link>
        )}
        <div className="p-4">
          <h2 className="mb-2 text-2xl leading-8 font-bold tracking-tight">
            <Link href={href} aria-label={`Link to ${title}`}>
              {title}
            </Link>
          </h2>
          {description && (
            <p className="prose mb-3 max-w-none text-gray-500 dark:text-gray-400">{description}</p>
          )}
          {footer && (
            <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 text-base leading-6 font-medium">
              {footer}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
