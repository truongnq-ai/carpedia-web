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

// Brand Timeline Types
export type TimelineEventType =
  | 'founded'
  | 'technology'
  | 'iconic-model'
  | 'philosophy'
  | 'modern-era'

export interface TimelineEvent {
  id: string
  period: string // e.g., "2020–Hiện tại", "1920"
  title: string // Short, easy to read title
  description: string // 1-2 sentences for children
  heroImages: string[] // Array of image paths (multiple images per event)
  eventType: TimelineEventType
  order: number // Sort DESC (newest first = 1, oldest = higher number)
}

export interface BrandTimeline {
  brandSlug: string
  events: TimelineEvent[]
}
