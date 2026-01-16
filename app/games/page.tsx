import { gamesData } from '@/data/gamesData'
import GameCard from '@/components/game/GameCard'
import EntityGrid from '@/components/entity/EntityGrid'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'Trò chơi' })

export default function GamesPage() {
  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pt-6 pb-8 md:space-y-5">
        <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
          Hôm nay chơi gì?
        </h1>
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
          Vừa chơi vừa học về thế giới xe hơi đầy thú vị
        </p>
      </div>
      <div className="container py-12">
        <EntityGrid>
          {gamesData.map((game) => (
            <GameCard
              key={game.id}
              title={game.title}
              description={game.description}
              href={`/games/${game.slug}`}
              previewVideo={game.previewVideo}
            />
          ))}
        </EntityGrid>
      </div>
    </div>
  )
}
