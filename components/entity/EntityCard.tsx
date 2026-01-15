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
        } overflow-hidden rounded-md border-2 border-gray-200 border-opacity-60 dark:border-gray-700`}
      >
        {image && (
          <Link href={href} aria-label={`Link to ${title}`}>
            <Image
              alt={title}
              src={image}
              className="object-cover object-center md:h-36 lg:h-48"
              width={544}
              height={306}
            />
          </Link>
        )}
        <div className="p-6">
          <h2 className="mb-3 text-2xl font-bold leading-8 tracking-tight">
            <Link href={href} aria-label={`Link to ${title}`}>
              {title}
            </Link>
          </h2>
          {description && (
            <p className="prose mb-3 max-w-none text-gray-500 dark:text-gray-400">{description}</p>
          )}
          {footer && (
            <div className="text-base font-medium leading-6 text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
              {footer}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
