import { Brand, Country, BodyType } from '@/lib/types'
import EntityCard from '@/components/entity/EntityCard'
import Link from 'next/link'

interface FeaturedEntitiesProps {
  brands: Brand[]
  countries: Country[]
  bodyTypes: BodyType[]
}

export default function FeaturedEntities({ brands, countries, bodyTypes }: FeaturedEntitiesProps) {
  // Create a lookup map for country flags
  const countryFlags: Record<string, string> = {}
  countries.forEach((c) => {
    countryFlags[c.slug] = c.flag
  })

  return (
    <div className="container py-12">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 dark:text-gray-100">
          Khám phá
        </h2>
      </div>

      <div className="space-y-12">
        {/* Featured Brands */}
        {brands.length > 0 && (
          <section>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-2xl font-bold">Hãng Xe Nổi Bật</h3>
              <Link
                href="/brands"
                className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
              >
                Xem tất cả &rarr;
              </Link>
            </div>
            <div className="-m-4 flex flex-wrap">
              {brands.slice(0, 3).map((brand) => (
                <EntityCard
                  key={brand.slug}
                  title={brand.name}
                  description={brand.funFact}
                  href={`/brands/${brand.slug}`}
                  image={brand.cardImage || brand.heroImage || '/static/images/twitter-card.png'}
                  logoUrl={brand.logo}
                  countryFlagUrl={countryFlags[brand.country]}
                  footer={`Xuất xứ: ${brand.country === 'japan' ? 'Nhật Bản' : brand.country}`}
                />
              ))}
            </div>
          </section>
        )}

        {/* Featured Body Types */}
        {bodyTypes.length > 0 && (
          <section>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-2xl font-bold">Loại Xe Phổ Biến</h3>
              <Link
                href="/body-types"
                className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
              >
                Xem tất cả &rarr;
              </Link>
            </div>
            <div className="-m-4 flex flex-wrap">
              {bodyTypes.slice(0, 3).map((bt) => (
                <EntityCard
                  key={bt.slug}
                  title={bt.name}
                  description={bt.description}
                  href={`/body-types/${bt.slug}`}
                  image={bt.heroImage || '/static/images/twitter-card.png'}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
