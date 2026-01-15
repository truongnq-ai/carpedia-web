import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { Brand, Country, BodyType, EntityType } from './types'

const DATA_DIR = path.join(process.cwd(), 'data', 'entities')

/**
 * Get all MDX files from a directory
 */
function getMDXFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) {
    return []
  }
  return fs.readdirSync(dir).filter((file) => file.endsWith('.mdx'))
}

/**
 * Parse MDX file and extract frontmatter + content
 */
function parseMDXFile(filePath: string) {
  const fileContent = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContent)
  return { data, content }
}

/**
 * Get all brands
 */
export function getAllBrands(): Brand[] {
  const brandsDir = path.join(DATA_DIR, 'brands')
  const files = getMDXFiles(brandsDir)

  return files.map((file) => {
    const filePath = path.join(brandsDir, file)
    const { data, content } = parseMDXFile(filePath)
    const slug = file.replace(/\.mdx$/, '')

    return {
      slug,
      name: data.name || slug,
      locale: data.locale || 'vi',
      country: data.country || '',
      foundedYear: data.foundedYear,
      logo: data.logo || '',
      heroImage: data.heroImage || '',
      cardImage: data.cardImage || '',
      bodyTypes: data.bodyTypes || [],
      featured: data.featured || false,
      funFact: data.funFact || '',
      content,
    }
  })
}

/**
 * Get brand by slug
 */
export function getBrandBySlug(slug: string): Brand | null {
  const brands = getAllBrands()
  return brands.find((brand) => brand.slug === slug) || null
}

/**
 * Get all countries
 */
export function getAllCountries(): Country[] {
  const countriesDir = path.join(DATA_DIR, 'countries')
  const files = getMDXFiles(countriesDir)

  return files.map((file) => {
    const filePath = path.join(countriesDir, file)
    const { data, content } = parseMDXFile(filePath)
    const slug = file.replace(/\.mdx$/, '')

    return {
      slug,
      name: data.name || slug,
      locale: data.locale || 'vi',
      flag: data.flag || '',
      heroImage: data.heroImage || '',
      featured: data.featured || false,
      funFact: data.funFact || '',
      content,
    }
  })
}

/**
 * Get country by slug
 */
export function getCountryBySlug(slug: string): Country | null {
  const countries = getAllCountries()
  return countries.find((country) => country.slug === slug) || null
}

/**
 * Get all body types
 */
export function getAllBodyTypes(): BodyType[] {
  const bodyTypesDir = path.join(DATA_DIR, 'body-types')
  const files = getMDXFiles(bodyTypesDir)

  return files.map((file) => {
    const filePath = path.join(bodyTypesDir, file)
    const { data, content } = parseMDXFile(filePath)
    const slug = file.replace(/\.mdx$/, '')

    return {
      slug,
      name: data.name || slug,
      locale: data.locale || 'vi',
      icon: data.icon || '',
      heroImage: data.heroImage || '',
      featured: data.featured || false,
      description: data.description || '',
      funFact: data.funFact || '',
      content,
    }
  })
}

/**
 * Get body type by slug
 */
export function getBodyTypeBySlug(slug: string): BodyType | null {
  const bodyTypes = getAllBodyTypes()
  return bodyTypes.find((bt) => bt.slug === slug) || null
}

/**
 * Get related brands by country
 */
export function getBrandsByCountry(countrySlug: string): Brand[] {
  const brands = getAllBrands()
  return brands.filter((brand) => brand.country === countrySlug)
}

/**
 * Get related brands by body type
 */
export function getBrandsByBodyType(bodyTypeSlug: string): Brand[] {
  const brands = getAllBrands()
  return brands.filter((brand) => brand.bodyTypes.includes(bodyTypeSlug))
}

/**
 * Get featured entities (for homepage)
 */
export function getFeaturedEntities() {
  const brands = getAllBrands().filter((b) => b.featured)
  const countries = getAllCountries().filter((c) => c.featured)
  const bodyTypes = getAllBodyTypes().filter((bt) => bt.featured)

  return {
    brands,
    countries,
    bodyTypes,
  }
}

/**
 * Sort entities alphabetically by name
 */
export function sortByName<T extends { name: string }>(entities: T[]): T[] {
  return entities.sort((a, b) => a.name.localeCompare(b.name, 'vi'))
}
