import fs from 'fs'
import path from 'path'
import { Readable } from 'stream'
import { finished } from 'stream/promises'

// Danh sách các ảnh cần tải (mapping từ đường dẫn local -> text hiển thị trên ảnh)
const images = [
  // Toyota
  { path: 'public/images/brands/toyota/hero.png', text: 'Toyota Hero', width: 800, height: 400 },
  { path: 'public/images/brands/toyota/card.png', text: 'Toyota Card', width: 600, height: 400 },
  { path: 'public/images/brands/toyota/logo.svg', text: 'Toyota', width: 100, height: 100, format: 'svg' },

  // Honda
  { path: 'public/images/brands/honda/hero.png', text: 'Honda Hero', width: 800, height: 400 },
  { path: 'public/images/brands/honda/card.png', text: 'Honda Card', width: 600, height: 400 },
  { path: 'public/images/brands/honda/logo.svg', text: 'Honda', width: 100, height: 100, format: 'svg' },

  // Japan
  { path: 'public/images/countries/japan/hero.png', text: 'Japan Hero', width: 800, height: 400 },
  { path: 'public/images/countries/japan/flag.svg', text: 'JP', width: 100, height: 60, format: 'svg' },

  // SUV
  { path: 'public/images/body-types/suv/hero.png', text: 'SUV Hero', width: 800, height: 400 },
  { path: 'public/images/body-types/suv/icon.svg', text: 'SUV', width: 100, height: 100, format: 'svg' },

  // Sedan
  { path: 'public/images/body-types/sedan/hero.png', text: 'Sedan Hero', width: 800, height: 400 },
  { path: 'public/images/body-types/sedan/icon.svg', text: 'Sedan', width: 100, height: 100, format: 'svg' },
]

async function downloadImage(url: string, localPath: string) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.statusText}`)
  
  const dir = path.dirname(localPath)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }

  const fileStream = fs.createWriteStream(localPath)
  // @ts-ignore
  await finished(Readable.fromWeb(res.body).pipe(fileStream))
  console.log(`✅ Downloaded: ${localPath}`)
}

async function main() {
  console.log('🚀 Starting image download...')
  
  for (const img of images) {
    if (fs.existsSync(img.path)) {
      console.log(`⏭️  Skipping (exists): ${img.path}`)
      continue
    }

    // Sử dụng placehold.co API
    let url = ''
    if (img.format === 'svg') {
       // Placehold.co support svg via format
       url = `https://placehold.co/${img.width}x${img.height}/svg?text=${encodeURIComponent(img.text)}`
    } else {
       url = `https://placehold.co/${img.width}x${img.height}/png?text=${encodeURIComponent(img.text)}`
    }

    try {
      await downloadImage(url, img.path)
    } catch (error) {
      console.error(`❌ Error downloading ${img.path}:`, error)
    }
  }
  console.log('✨ All done!')
}

main()
