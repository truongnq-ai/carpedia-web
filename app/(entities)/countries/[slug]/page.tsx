import { notFound } from 'next/navigation'
import { getAllCountries, getCountryBySlug, getBrandsByCountry } from '@/lib/entities'
import Link from 'next/link'
import { CustomMDX } from '@/lib/mdx'
import { genPageMetadata } from '../../../seo'
import Image from '@/components/Image'

export async function generateStaticParams() {
  const countries = getAllCountries()
  return countries.map((country) => ({
    slug: country.slug,
  }))
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params
  const country = getCountryBySlug(params.slug)
  if (!country) return
  return genPageMetadata({
    title: country.name,
    description: country.funFact,
    image: country.heroImage,
  })
}

export default async function CountryPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params
  const country = getCountryBySlug(params.slug)
  const brands = country ? getBrandsByCountry(country.slug) : []

  if (!country) {
    notFound()
  }

  return (
    <article>
      <div className="space-y-2 xl:grid xl:grid-cols-4 xl:space-y-0 xl:gap-x-8">
        <div className="xl:col-span-3 xl:row-span-2 xl:pb-0">
          <div className="prose dark:prose-invert max-w-none pt-10 pb-8">
            {country.heroImage && (
              <div className="relative mb-8 w-full overflow-hidden rounded-lg border border-gray-100 dark:border-gray-800">
                <div className="relative aspect-3/2 w-full">
                  <Image
                    src={country.heroImage}
                    alt={country.name}
                    className="object-cover"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 50vw"
                    priority
                  />
                </div>
              </div>
            )}

            <CustomMDX source={country.content} />
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-8 pt-8 xl:pt-14">
          <div className="rounded-lg bg-blue-50 p-6 dark:bg-blue-900/20">
            <h3 className="mb-2 text-xl font-bold text-blue-900 dark:text-blue-100">
              Bạn có biết?
            </h3>
            <p className="text-blue-800 dark:text-blue-200">{country.funFact}</p>
          </div>

          {brands.length > 0 && (
            <div>
              <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-gray-100">
                Danh sách thương hiệu
              </h3>
              <div className="space-y-3">
                {brands.map((brand) => (
                  <Link
                    key={brand.slug}
                    href={`/brands/${brand.slug}`}
                    className="group flex items-center space-x-3 transition-colors"
                  >
                    <div className="relative h-20 w-20 overflow-hidden rounded-md border border-gray-100 p-2 dark:border-gray-800">
                      <Image src={brand.logo} alt={brand.name} fill className="object-contain" />
                    </div>
                    <span className="group-hover:text-primary-500 dark:group-hover:text-primary-400 font-medium text-gray-600 dark:text-gray-400">
                      {brand.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  )
}
