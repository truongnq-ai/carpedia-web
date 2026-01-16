import { Brand, Country } from '@/lib/types'

export const CORRECT_SOUNDS = [
  '/static/sounds/correct/applause-clapping-church-crowd-immersive.wav',
  '/static/sounds/correct/applause.wav',
  '/static/sounds/correct/applause_fireworks.mp3',
  '/static/sounds/correct/childrens_game_app_ending.mp3',
  '/static/sounds/correct/end_level.flac',
]

export const WRONG_SOUNDS = [
  '/static/sounds/wrong/Error or failed.mp3',
  '/static/sounds/wrong/error.ogg',
  '/static/sounds/wrong/lose sound 2 - 1_0.wav',
  '/static/sounds/wrong/lose sound 2 - 2.wav',
  '/static/sounds/wrong/losetrumpet.mp3',
  '/static/sounds/wrong/losetrumpet.ogg',
  '/static/sounds/wrong/losetrumpet.wav',
]

export interface Question {
  brand: Brand
  options: Country[]
}

export function generateQuestion(
  brands: Brand[],
  countries: Country[],
  solvedSlugs: string[],
  currentSlug?: string
): Question | null {
  // Filter out solved brands and the current one to ensure a different next question
  const availableBrands = brands.filter(
    (b) => !solvedSlugs.includes(b.slug) && b.slug !== currentSlug
  )

  // If no available brands left (besides potentially the current one), check if we finished
  if (availableBrands.length === 0) {
    // If there's only one unsaved brand and it happens to be the current one, we can still play it if it's the last one
    const trulyRemaining = brands.filter((b) => !solvedSlugs.includes(b.slug))
    if (trulyRemaining.length === 0) return null

    // Otherwise, we have only 1 brand left but it's the current one.
    // We should return the current one because we can't skip to another.
    // However, the rule "không trùng với câu hỏi trước" usually implies we have at least 2 remaining.
    // If only 1 remains, we must show it.
  }

  const brandsToPickFrom =
    availableBrands.length > 0
      ? availableBrands
      : brands.filter((b) => !solvedSlugs.includes(b.slug))

  if (brandsToPickFrom.length === 0) return null

  const randomBrand = brandsToPickFrom[Math.floor(Math.random() * brandsToPickFrom.length)]
  const correctCountry = countries.find((c) => c.slug === randomBrand.country)

  if (!correctCountry) {
    console.error(`Country not found for brand: ${randomBrand.name}`)
    return null
  }

  // Get 3 random wrong countries
  const otherCountries = countries.filter((c) => c.slug !== correctCountry.slug)
  const shuffledOther = [...otherCountries].sort(() => 0.5 - Math.random())
  const wrongOptions = shuffledOther.slice(0, 3)

  // Combine and shuffle options
  const options = [correctCountry, ...wrongOptions].sort(() => 0.5 - Math.random())

  return {
    brand: randomBrand,
    options,
  }
}

export function getRandomSound(isCorrect: boolean): string {
  const sounds = isCorrect ? CORRECT_SOUNDS : WRONG_SOUNDS
  return sounds[Math.floor(Math.random() * sounds.length)]
}
