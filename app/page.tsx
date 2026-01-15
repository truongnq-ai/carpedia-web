import { getFeaturedEntities } from '@/lib/entities'
import EntityMenu from '@/components/entity/EntityMenu'
import FeaturedEntities from '@/components/entity/FeaturedEntities'

export default function HomePage() {
  const { brands, countries, bodyTypes } = getFeaturedEntities()

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pb-8 pt-6 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          Chào mừng đến với Carpedia
        </h1>
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
          Car Wiki giáo dục cho trẻ em - Khám phá thế giới ô tô cùng bé yêu
        </p>
      </div>

      <EntityMenu />

      <FeaturedEntities
        brands={brands}
        countries={countries}
        bodyTypes={bodyTypes}
      />
    </div>
  )
}
