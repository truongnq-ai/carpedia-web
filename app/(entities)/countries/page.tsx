import { getAllCountries, sortByName } from '@/lib/entities'
import EntityCard from '@/components/entity/EntityCard'
import EntityGrid from '@/components/entity/EntityGrid'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'Quốc gia' })

export default function CountriesPage() {
  const countries = sortByName(getAllCountries())

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pb-8 pt-6 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          Quốc gia
        </h1>
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
          Các quốc gia có nền công nghiệp ô tô phát triển
        </p>
      </div>
      <div className="container py-12">
        <EntityGrid>
          {countries.map((country) => (
            <EntityCard
              key={country.slug}
              title={country.name}
              description={country.funFact}
              href={`/countries/${country.slug}`}
              image={country.heroImage || '/static/images/twitter-card.png'}
            />
          ))}
        </EntityGrid>
      </div>
    </div>
  )
}
