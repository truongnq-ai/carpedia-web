// Entity Types for Carpedia

export interface Brand {
  slug: string
  name: string
  locale: string
  country: string // Reference to Country slug
  foundedYear?: number
  logo: string
  heroImage: string
  cardImage: string
  bodyTypes: string[] // References to BodyType slugs
  featured: boolean
  funFact: string
  content: string // MDX content
}

export interface Country {
  slug: string
  name: string
  locale: string
  flag: string
  heroImage: string
  featured: boolean
  funFact: string
  content: string
}

export interface BodyType {
  slug: string
  name: string
  locale: string
  icon: string
  heroImage: string
  featured: boolean
  description: string
  funFact: string
  content: string
}

export type EntityType = 'brand' | 'country' | 'bodyType'

export interface EntityMetadata {
  slug: string
  name: string
  type: EntityType
}
