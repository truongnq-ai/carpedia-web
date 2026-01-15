import fs from 'fs'
import path from 'path'
import { getAllBrands, getAllCountries, getAllBodyTypes } from './entities'

export interface SearchResult {
  slug: string
  name: string
  type: 'brand' | 'country' | 'bodyType'
  url: string
}

export function generateSearchIndex() {
  const brands = getAllBrands().map((b) => ({
    slug: b.slug,
    name: b.name,
    type: 'brand' as const,
    url: `/brands/${b.slug}`,
  }))

  const countries = getAllCountries().map((c) => ({
    slug: c.slug,
    name: c.name,
    type: 'country' as const,
    url: `/countries/${c.slug}`,
  }))

  const bodyTypes = getAllBodyTypes().map((bt) => ({
    slug: bt.slug,
    name: bt.name,
    type: 'bodyType' as const,
    url: `/body-types/${bt.slug}`,
  }))

  const searchIndex = [...brands, ...countries, ...bodyTypes]

  const publicDir = path.join(process.cwd(), 'public')
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true })
  }

  fs.writeFileSync(path.join(publicDir, 'search.json'), JSON.stringify(searchIndex, null, 2))

  console.log(`Generated search index with ${searchIndex.length} items.`)
}
