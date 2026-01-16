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

export interface QuestionGame1 {
  brand: Brand
  options: Country[]
}

export interface QuestionGame3 {
  letter: string
  options: Brand[]
  correctSlugs: string[]
}

export interface QuestionGame2 {
  country: Country
  options: Brand[]
  correctSlugs: string[]
}

export function generateQuestion(
  brands: Brand[],
  countries: Country[],
  solvedSlugs: string[],
  currentSlug?: string
): QuestionGame1 | null {
  // Filter out solved brands and the current one to ensure a different next question
  const availableBrands = brands.filter(
    (b) => !solvedSlugs.includes(b.slug) && b.slug !== currentSlug
  )

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

export function generateQuestionGame2(
  brands: Brand[],
  countries: Country[],
  solvedSlugs: string[], // In Game 2, this is solved countries
  currentSlug?: string
): QuestionGame2 | null {
  // Filter countries that have at least 1 brand
  const validCountries = countries.filter((c) => brands.some((b) => b.country === c.slug))

  // Filter out solved countries and current one
  const availableCountries = validCountries.filter(
    (c) => !solvedSlugs.includes(c.slug) && c.slug !== currentSlug
  )

  const countriesToPickFrom =
    availableCountries.length > 0
      ? availableCountries
      : validCountries.filter((c) => !solvedSlugs.includes(c.slug))

  if (countriesToPickFrom.length === 0) return null

  const randomCountry = countriesToPickFrom[Math.floor(Math.random() * countriesToPickFrom.length)]
  const allCorrectBrands = brands.filter((b) => b.country === randomCountry.slug)

  // Choose 1-2 correct brands (but not more than available in data)
  const numCorrect = Math.min(allCorrectBrands.length, Math.floor(Math.random() * 2) + 1)
  const shuffledBrands = [...allCorrectBrands].sort(() => 0.5 - Math.random())
  const targetBrands = shuffledBrands.slice(0, numCorrect)
  const correctSlugs = targetBrands.map((b) => b.slug)

  // Get 2-3 wrong brands (total options should be 4, so wrong = 4 - numCorrect)
  const numWrong = 4 - numCorrect
  const wrongBrands = brands.filter((b) => b.country !== randomCountry.slug)
  const shuffledWrong = [...wrongBrands].sort(() => 0.5 - Math.random())
  const selectedWrong = shuffledWrong.slice(0, numWrong)

  // Combine and shuffle options
  const options = [...targetBrands, ...selectedWrong].sort(() => 0.5 - Math.random())

  return {
    country: randomCountry,
    options,
    correctSlugs,
  }
}

export function generateQuestionGame3(
  brands: Brand[],
  solvedLetters: string[],
  currentLetter?: string
): QuestionGame3 | null {
  // Get all unique first letters from brands
  const allLetters = Array.from(new Set(brands.map((b) => b.name.charAt(0).toUpperCase())))

  // Filter out solved letters and current one
  const availableLetters = allLetters.filter(
    (l) => !solvedLetters.includes(l) && l !== currentLetter
  )

  const lettersToPickFrom =
    availableLetters.length > 0
      ? availableLetters
      : allLetters.filter((l) => !solvedLetters.includes(l))

  if (lettersToPickFrom.length === 0) return null

  const randomLetter = lettersToPickFrom[Math.floor(Math.random() * lettersToPickFrom.length)]
  const allCorrectBrands = brands.filter((b) => b.name.charAt(0).toUpperCase() === randomLetter)

  // Choose 1-2 correct brands
  const numCorrect = Math.min(allCorrectBrands.length, Math.floor(Math.random() * 2) + 1)
  const shuffledBrands = [...allCorrectBrands].sort(() => 0.5 - Math.random())
  const targetBrands = shuffledBrands.slice(0, numCorrect)
  const correctSlugs = targetBrands.map((b) => b.slug)

  // Get 2-3 wrong brands
  const numWrong = 4 - numCorrect
  const wrongBrands = brands.filter((b) => b.name.charAt(0).toUpperCase() !== randomLetter)
  const shuffledWrong = [...wrongBrands].sort(() => 0.5 - Math.random())
  const selectedWrong = shuffledWrong.slice(0, numWrong)

  // Combine and shuffle options
  const options = [...targetBrands, ...selectedWrong].sort(() => 0.5 - Math.random())

  return {
    letter: randomLetter,
    options,
    correctSlugs,
  }
}

export function getRandomSound(isCorrect: boolean): string {
  const sounds = isCorrect ? CORRECT_SOUNDS : WRONG_SOUNDS
  return sounds[Math.floor(Math.random() * sounds.length)]
}
