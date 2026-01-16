import { gamesData } from '@/data/gamesData'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { genPageMetadata } from 'app/seo'
import { getAllBrands, getAllCountries } from '@/lib/entities'
import GuessBrandGame from '@/components/game/GuessBrandGame'

interface GamePageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: GamePageProps) {
  const { slug } = await params
  const game = gamesData.find((g) => g.slug === slug)
  if (!game) return genPageMetadata({ title: 'Game Not Found' })
  return genPageMetadata({ title: game.title })
}

export default async function GameDetailPage({ params }: GamePageProps) {
  const { slug } = await params
  const game = gamesData.find((g) => g.slug === slug)

  if (!game) {
    notFound()
  }

  // Handle Game 1
  if (slug === 'hang-xe-cua-nuoc-nao') {
    const brands = getAllBrands()
    const countries = getAllCountries()
    return <GuessBrandGame brands={brands} countries={countries} />
  }

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <div className="rounded-3xl border-2 border-dashed border-gray-300 bg-gray-50 p-8 dark:border-gray-700 dark:bg-gray-900">
        <div className="mb-6 text-6xl">🛠️</div>
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
          {game.title}
        </h1>
        <p className="mb-8 text-xl text-gray-500 dark:text-gray-400">
          Chức năng đang thực hiện. Vui lòng quay lại sau!
        </p>
        <Link
          href="/games"
          className="bg-primary-500 hover:bg-primary-600 inline-flex items-center rounded-full px-6 py-3 font-bold text-white transition-colors"
        >
          &larr; Quay lại danh sách trò chơi
        </Link>
      </div>
    </div>
  )
}
