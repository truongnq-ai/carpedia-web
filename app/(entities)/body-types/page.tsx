import { getAllBodyTypes, sortByName } from '@/lib/entities'
import EntityCard from '@/components/entity/EntityCard'
import EntityGrid from '@/components/entity/EntityGrid'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'Loại xe' })

export default function BodyTypesPage() {
  const bodyTypes = sortByName(getAllBodyTypes())

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pt-6 pb-8 md:space-y-5">
        <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
          Loại Xe
        </h1>
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
          Tìm hiểu về các kiểu dáng xe khác nhau
        </p>
      </div>
      <div className="container py-12">
        <EntityGrid>
          {bodyTypes.map((bt) => (
            <EntityCard
              key={bt.slug}
              title={bt.name}
              description={bt.description}
              href={`/body-types/${bt.slug}`}
              image={bt.heroImage || '/static/images/twitter-card.png'}
            />
          ))}
        </EntityGrid>
      </div>
    </div>
  )
}
