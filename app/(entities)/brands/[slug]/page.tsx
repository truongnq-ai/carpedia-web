import { notFound } from 'next/navigation'
import { getAllBrands, getBrandBySlug, getCountryBySlug } from '@/lib/entities'
import Link from 'next/link'
import { CustomMDX } from '@/lib/mdx'
import { genPageMetadata } from '../../../seo'
import Image from '@/components/Image'

export async function generateStaticParams() {
  const brands = getAllBrands()
  return brands.map((brand) => ({
    slug: brand.slug,
  }))
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params
  const brand = getBrandBySlug(params.slug)
  if (!brand) return
  return genPageMetadata({
    title: brand.name,
    description: brand.funFact,
    image: brand.heroImage,
  })
}

export default async function BrandPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params
  const brand = getBrandBySlug(params.slug)
  const country = brand ? getCountryBySlug(brand.country) : null

  if (!brand) {
    notFound()
  }

  return (
    <article>
      <div className="space-y-2 xl:grid xl:grid-cols-4 xl:gap-x-8 xl:space-y-0">
        <div className="xl:col-span-3 xl:row-span-2 xl:pb-0">
          <div className="prose max-w-none pb-8 pt-10 dark:prose-invert">
            {brand.heroImage && (
              <div className="relative mb-8 h-64 w-full overflow-hidden rounded-lg md:h-96">
                <Image
                  src={brand.heroImage}
                  alt={brand.name}
                  className="object-cover"
                  fill
                  sizes="100vw"
                  priority
                />
              </div>
            )}
            

            
            <CustomMDX source={brand.content} />
          </div>
        </div>
        
        <aside className="pt-6 xl:pt-11">
          <div className="sticky top-24 divide-y divide-gray-200 dark:divide-gray-700">
            <div className="pb-8">
              <h2 className="text-xs font-bold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Thông tin nhanh
              </h2>
              <dl className="pt-4 text-sm">
                <div className="flex items-center space-x-2">
                  <dt className="text-gray-500 dark:text-gray-400">Quốc gia:</dt>
                  <dd className="font-semibold">
                    {country ? (
                      <Link
                        href={`/countries/${country.slug}`}
                        className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                      >
                        {country.name}
                      </Link>
                    ) : (
                      brand.country
                    )}
                  </dd>
                </div>

                {country?.flag && (
                  <div className="mt-4 overflow-hidden rounded-lg border border-gray-100 dark:border-gray-800">
                    <div className="relative aspect-3/2 w-full shadow-sm">
                      <Image src={country.flag} alt={country.name} fill className="object-cover" />
                    </div>
                  </div>
                )}

                <div className="mt-4 flex items-center space-x-2">
                  <dt className="text-gray-500 dark:text-gray-400">Năm thành lập:</dt>
                  <dd className="font-bold">{brand.foundedYear}</dd>
                </div>
              </dl>
              {brand.logo && (
                <div className="mt-6 flex justify-center p-4">
                  <Image
                    src={brand.logo}
                    alt={brand.name}
                    width={120}
                    height={120}
                    className="object-contain"
                  />
                </div>
              )}
            </div>
          </div>
        </aside>
      </div>
    </article>
  )
}
