import { generateSearchIndex } from '../lib/search'

try {
  generateSearchIndex()
} catch (error) {
  console.error('Error generating search index:', error)
  process.exit(1)
}
