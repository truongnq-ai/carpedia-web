import Link from 'next/link'
import Image from 'next/image'

interface EntityCardProps {
  title: string
  description?: string
  href: string
  image?: string
  footer?: React.ReactNode
  logoUrl?: string
  countryFlagUrl?: string
}

export default function EntityCard({
  title,
  description,
  href,
  image,
  footer,
  logoUrl,
  countryFlagUrl,
}: EntityCardProps) {
  return (
    <div className="md p-4 md:w-1/2" style={{ maxWidth: '544px' }}>
      <div
        className={`${
          image ? 'h-full' : ''
        } border-opacity-60 overflow-hidden rounded-md border-2 border-gray-200 dark:border-gray-700`}
      >
        {image && (
          <div className="relative">
            <Link href={href} aria-label={`Link to ${title}`}>
              <Image
                alt={title}
                src={image}
                className="aspect-3/2 w-full object-cover object-center"
                width={544}
                height={306}
              />
            </Link>
            {/* Logo Badge - Top Left */}
            {logoUrl && (
              <div className="absolute top-2 left-2 flex h-10 w-10 items-center justify-center rounded-full bg-white p-1 shadow-md">
                <Image
                  src={logoUrl}
                  alt={`${title} Logo`}
                  width={32}
                  height={32}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            )}
            {/* Flag Badge - Bottom Right */}
            {countryFlagUrl && (
              <div className="absolute right-2 bottom-2 overflow-hidden rounded-sm border border-white shadow-sm">
                <Image
                  src={countryFlagUrl}
                  alt="Country Flag"
                  width={32}
                  height={24}
                  className="h-6 w-8 object-cover"
                />
              </div>
            )}
          </div>
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
