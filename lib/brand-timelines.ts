import fs from 'fs'
import path from 'path'
import { BrandTimeline } from './types'

const TIMELINE_DATA_DIR = path.join(process.cwd(), 'data', 'brand-timelines')

/**
 * Get brand timeline by slug
 * Returns timeline data for a specific brand
 */
export function getBrandTimeline(brandSlug: string): BrandTimeline | null {
    try {
        const filePath = path.join(TIMELINE_DATA_DIR, `${brandSlug}.json`)

        if (!fs.existsSync(filePath)) {
            return null
        }

        const fileContent = fs.readFileSync(filePath, 'utf8')
        const timeline: BrandTimeline = JSON.parse(fileContent)

        // Validate basic structure
        if (!timeline.brandSlug || !Array.isArray(timeline.events)) {
            console.warn(`Invalid timeline structure for ${brandSlug}`)
            return null
        }

        // Sort events by order (newest first: 1 -> oldest: higher numbers)
        timeline.events.sort((a, b) => a.order - b.order)

        return timeline
    } catch (error) {
        console.error(`Error loading timeline for ${brandSlug}:`, error)
        return null
    }
}

/**
 * Check if a brand has timeline data
 */
export function hasBrandTimeline(brandSlug: string): boolean {
    const filePath = path.join(TIMELINE_DATA_DIR, `${brandSlug}.json`)
    return fs.existsSync(filePath)
}

/**
 * Get all available brand timelines
 */
export function getAllBrandTimelines(): string[] {
    if (!fs.existsSync(TIMELINE_DATA_DIR)) {
        return []
    }

    return fs
        .readdirSync(TIMELINE_DATA_DIR)
        .filter((file) => file.endsWith('.json'))
        .map((file) => file.replace(/\.json$/, ''))
}
