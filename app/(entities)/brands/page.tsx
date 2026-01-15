import { getAllBrands, getAllCountries, sortByName } from '@/lib/entities'
import EntityCard from '@/components/entity/EntityCard'
import EntityGrid from '@/components/entity/EntityGrid'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'Hãng xe' })

export default function BrandsPage() {
  const brands = sortByName(getAllBrands())
  const countries = getAllCountries()

  // Create a lookup map for country flags
  const countryFlags: Record<string, string> = {}
  countries.forEach((c) => {
    countryFlags[c.slug] = c.flag
  })

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pt-6 pb-8 md:space-y-5">
        <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
          Hãng Xe
        </h1>
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
          Khám phá các hãng xe nổi tiếng trên thế giới
        </p>
      </div>
      <div className="container py-12">
        <EntityGrid>
          {brands.map((brand) => (
            <EntityCard
              key={brand.slug}
              title={brand.name}
              description={brand.funFact}
              href={`/brands/${brand.slug}`}
              // Fallback image if no specific image
              image={brand.cardImage || brand.heroImage || '/static/images/twitter-card.png'}
              logoUrl={brand.logo}
              countryFlagUrl={countryFlags[brand.country]}
              footer={`Xuất xứ: ${brand.country === 'japan' ? 'Nhật Bản' : brand.country}`}
            />
          ))}
        </EntityGrid>
      </div>
    </div>
  )
}
