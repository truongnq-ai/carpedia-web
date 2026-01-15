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
            <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
              {brand.name}
            </h1>
            <div className="mb-4 text-sm text-gray-500">
              Thành lập: {brand.foundedYear}
            </div>
            
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
                <dt className="text-gray-500 dark:text-gray-400">Quốc gia:</dt>
                <dd className="font-semibold">
                  {country ? (
                    <Link href={`/countries/${country.slug}`} className="flex items-center space-x-2 text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                      {country.flag && (
                        <div className="relative h-4 w-6 overflow-hidden shadow-sm">
                           <Image src={country.flag} alt={country.name} fill className="object-cover" />
                        </div>
                      )}
                      <span>{country.name}</span>
                    </Link>
                  ) : (
                    brand.country
                  )}
                </dd>
                <dt className="mt-4 text-gray-500 dark:text-gray-400">Năm thành lập:</dt>
                <dd className="font-semibold">{brand.foundedYear}</dd>
              </dl>
              {brand.logo && (
                <div className="mt-6 flex justify-center rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
                   <Image src={brand.logo} alt={brand.name} width={120} height={120} className="object-contain" />
                </div>
              )}
            </div>
          </div>
        </aside>
      </div>
    </article>
  )
}
