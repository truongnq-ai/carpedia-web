import fs from 'fs-extra'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const DATA_DIR = path.resolve(__dirname, '../data/entities')

// --- DATA DEFINITIONS ---

const COUNTRIES = [
  { name: 'Nhật Bản', slug: 'japan', funFact: 'Nhật Bản sản xuất hơn 9 triệu xe mỗi năm!' },
  {
    name: 'Đức',
    slug: 'germany',
    funFact: 'Đức là nơi sinh ra chiếc ô tô đầu tiên trên thế giới!',
  },
  {
    name: 'Mỹ',
    slug: 'united-states',
    funFact: 'Mỹ nổi tiếng với những chiếc xe bán tải khổng lồ!',
  },
  { name: 'Ý', slug: 'italy', funFact: 'Ý là quê hương của những siêu xe nhanh nhất thế giới!' },
  {
    name: 'Pháp',
    slug: 'france',
    funFact: 'Pháp có những chiếc xe thiết kế rất điệu đà và êm ái.',
  },
  {
    name: 'Hàn Quốc',
    slug: 'south-korea',
    funFact: 'Xe Hàn Quốc có rất nhiều công nghệ hiện đại bên trong!',
  },
  {
    name: 'Anh',
    slug: 'united-kingdom',
    funFact: 'Xe nước Anh thường rất sang trọng và quý phái.',
  },
  {
    name: 'Thụy Điển',
    slug: 'sweden',
    funFact: 'Xe Thụy Điển được mệnh danh là an toàn nhất thế giới!',
  },
  {
    name: 'Trung Quốc',
    slug: 'china',
    funFact: 'Trung Quốc đang làm rất nhiều xe điện chạy bằng pin.',
  },
  { name: 'Séc', slug: 'czech-republic', funFact: 'Séc có những hãng xe lâu đời và bền bỉ.' },
  {
    name: 'Việt Nam',
    slug: 'vietnam',
    funFact: 'Việt Nam có hãng xe VinFast đang vươn mình ra thế giới!',
  },
]

const BODY_TYPES = [
  {
    name: 'Sedan',
    slug: 'sedan',
    description: 'Kiểu xe ô tô 4 cửa phổ biến nhất mà bạn thường thấy trên đường.',
    funFact: 'Sedan là dòng xe phổ biến nhất thế giới trong nhiều thập kỷ!',
  },
  {
    name: 'SUV',
    slug: 'suv',
    description: 'Xe gầm cao, mạnh mẽ, có thể đi qua những đoạn đường gồ ghề.',
    funFact: 'SUV bắt nguồn từ những chiếc xe quân sự mạnh mẽ có khả năng vượt mọi địa hình!',
  },
  {
    name: 'Hatchback',
    slug: 'hatchback',
    description: 'Xe nhỏ gọn có cửa sau mở lên cao như một chiếc túi thần kỳ.',
    funFact:
      "Hatchback thường được gọi là xe '3 cửa' hoặc '5 cửa' vì cửa sau được tính là một cửa thực thụ!",
  },
  {
    name: 'Bán tải',
    slug: 'pickup',
    description: 'Xe vừa chở người, vừa có thùng to phía sau để chở đồ.',
    funFact: 'Xe bán tải đầu tiên được Ford sản xuất vào năm 1925!',
  },
  {
    name: 'Mui trần',
    slug: 'convertible',
    description: 'Xe có mui có thể đóng mở được, cho bạn cảm giác gió lùa vào tóc.',
    funFact: 'Chiếc xe mui trần đầu tiên thực chất là những chiếc xe ngựa không mui!',
  },
  {
    name: 'Minivan',
    slug: 'minivan',
    description: 'Xe rất to, chở được nhiều người, như một ngôi nhà di động cho cả gia đình.',
    funFact: 'Minivan là cứu tinh của các gia đình đông con nhờ không gian cực lớn!',
  },
  {
    name: 'Coupe',
    slug: 'coupe',
    description: 'Xe 2 cửa cực ngầu và trông rất thể thao.',
    funFact: "Từ 'Coupe' bắt nguồn từ tiếng Pháp có nghĩa là 'cắt bỏ'!",
  },
  {
    name: 'Wagon',
    slug: 'wagon',
    description: 'Xe có thiết kế như Sedan nhưng kéo dài mái ra sau để có khoang chở đồ cực rộng.',
    funFact: 'Ở Châu Âu, xe Wagon cực kỳ được ưa chuộng vì tính thực dụng của nó!',
  },
  {
    name: 'Crossover',
    slug: 'crossover',
    description: 'Sự kết hợp giữa Sedan và SUV, gầm cao vừa phải và đi rất mượt mà trong phố.',
    funFact: 'Crossover thường nhẹ hơn SUV thực thụ nên tiết kiệm xăng hơn đấy!',
  },
  {
    name: 'Roadster',
    slug: 'roadster',
    description: 'Xe thể thao mui trần chỉ có 2 chỗ ngồi, dành cho những ai mê tốc độ.',
    funFact: 'Roadster là biểu tượng của sự tự do và phong cách trên những cung đường ven biển!',
  },
  {
    name: 'Limousine',
    slug: 'limousine',
    description: 'Dòng xe siêu dài với nội thất sang trọng như một căn phòng di động.',
    funFact: 'Chiếc Limousine dài nhất thế giới có cả hồ bơi và sân trực thăng phía sau!',
  },
  {
    name: 'Xe đô thị',
    slug: 'microcar',
    description: 'Những chiếc xe tí hon, siêu nhỏ gọn, cực kỳ dễ di chuyển trong phố.',
    funFact: 'Nhiều chiếc Microcar nhỏ đến mức có thể đậu vừa vào những góc kẹt tí hon!',
  },
  {
    name: 'Van',
    slug: 'van',
    description: 'Xe tải nhỏ hoặc xe chở khách cỡ vừa, có không gian chứa đồ hoặc chỗ ngồi lớn.',
    funFact: 'Xe Van thường được các ban nhạc dùng để chở nhạc cụ đi biểu diễn khắp nơi!',
  },
  {
    name: 'Targa',
    slug: 'targa',
    description: 'Kiểu xe mui trần đặc biệt với một thanh bảo vệ cố định ở giữa.',
    funFact: "Tên 'Targa' lấy cảm hứng từ giải đua xe huyền thoại Targa Florio ở Ý!",
  },
  {
    name: 'Sportback',
    slug: 'sportback',
    description: 'Lai giữa Sedan và Hatchback, có đuôi xe vuốt dài và cửa cốp mở cả kính.',
    funFact: 'Thiết kế Sportback giúp xe trông vừa sang trọng vừa có thể chở được đồ cồng kềnh!',
  },
]

const BRANDS = [
  // Japan
  {
    name: 'Toyota',
    slug: 'toyota',
    country: 'japan',
    bodyTypes: ['sedan', 'suv', 'hatchback', 'minivan', 'pickup'],
  },
  {
    name: 'Honda',
    slug: 'honda',
    country: 'japan',
    bodyTypes: ['sedan', 'suv', 'hatchback', 'minivan'],
  },
  {
    name: 'Nissan',
    slug: 'nissan',
    country: 'japan',
    bodyTypes: ['sedan', 'suv', 'pickup', 'coupe'],
  },
  {
    name: 'Mazda',
    slug: 'mazda',
    country: 'japan',
    bodyTypes: ['sedan', 'suv', 'hatchback', 'convertible'],
  },
  { name: 'Subaru', slug: 'subaru', country: 'japan', bodyTypes: ['sedan', 'suv', 'coupe'] },
  // Germany
  {
    name: 'BMW',
    slug: 'bmw',
    country: 'germany',
    bodyTypes: ['sedan', 'suv', 'coupe', 'convertible'],
  },
  {
    name: 'Mercedes-Benz',
    slug: 'mercedes-benz',
    country: 'germany',
    bodyTypes: ['sedan', 'suv', 'coupe', 'convertible', 'minivan'],
  },
  {
    name: 'Audi',
    slug: 'audi',
    country: 'germany',
    bodyTypes: ['sedan', 'suv', 'coupe', 'convertible'],
  },
  {
    name: 'Volkswagen',
    slug: 'volkswagen',
    country: 'germany',
    bodyTypes: ['sedan', 'suv', 'hatchback', 'minivan'],
  },
  {
    name: 'Porsche',
    slug: 'porsche',
    country: 'germany',
    bodyTypes: ['suv', 'coupe', 'convertible'],
  },
  // USA
  {
    name: 'Ford',
    slug: 'ford',
    country: 'united-states',
    bodyTypes: ['suv', 'pickup', 'coupe', 'minivan'],
  },
  {
    name: 'Chevrolet',
    slug: 'chevrolet',
    country: 'united-states',
    bodyTypes: ['suv', 'pickup', 'sedan', 'coupe'],
  },
  { name: 'Tesla', slug: 'tesla', country: 'united-states', bodyTypes: ['sedan', 'suv', 'pickup'] },
  // Italy
  {
    name: 'Ferrari',
    slug: 'ferrari',
    country: 'italy',
    bodyTypes: ['coupe', 'convertible', 'suv'],
  },
  {
    name: 'Lamborghini',
    slug: 'lamborghini',
    country: 'italy',
    bodyTypes: ['coupe', 'convertible', 'suv'],
  },
  { name: 'Fiat', slug: 'fiat', country: 'italy', bodyTypes: ['hatchback', 'convertible', 'suv'] },
  // France
  { name: 'Peugeot', slug: 'peugeot', country: 'france', bodyTypes: ['sedan', 'suv', 'hatchback'] },
  { name: 'Renault', slug: 'renault', country: 'france', bodyTypes: ['sedan', 'suv', 'hatchback'] },
  // Korea
  {
    name: 'Hyundai',
    slug: 'hyundai',
    country: 'south-korea',
    bodyTypes: ['sedan', 'suv', 'hatchback', 'minivan'],
  },
  {
    name: 'Kia',
    slug: 'kia',
    country: 'south-korea',
    bodyTypes: ['sedan', 'suv', 'hatchback', 'minivan'],
  },
  // Vietnam
  {
    name: 'VinFast',
    slug: 'vinfast',
    country: 'vietnam',
    bodyTypes: ['sedan', 'suv', 'hatchback'],
  },
]

function createMdxContent(frontmatter: Record<string, unknown>, title: string, content: string) {
  const yaml = Object.entries(frontmatter)
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        return `${key}:\n${value.map((v) => `  - ${v}`).join('\n')}`
      }
      if (typeof value === 'boolean') {
        return `${key}: ${value}`
      }
      return `${key}: ${value}`
    })
    .join('\n')

  return `---
${yaml}
---

# ${title}

${content}
`
}

async function main() {
  console.log('🏗️ Starting scaffolding (Updated extensions)...')

  // 1. Countries
  for (const country of COUNTRIES) {
    const filePath = path.join(DATA_DIR, 'countries', `${country.slug}.mdx`)

    // Always overwrite to ensure path update
    const frontmatter = {
      name: country.name,
      locale: 'vi',
      flag: `/images/countries/${country.slug}/flag.svg`,
      heroImage: `/images/countries/${country.slug}/hero.jpg`, // UPDATED: jpg
      featured: ['japan', 'germany', 'united-states', 'vietnam'].includes(country.slug),
      funFact: country.funFact,
    }

    const content = `${country.name} là một quốc gia tuyệt vời với nền công nghiệp ô tô phát triển. Hãy cùng khám phá các hãng xe đến từ ${country.name} nhé!`

    await fs.outputFile(filePath, createMdxContent(frontmatter, country.name, content))
    console.log(`Updated Country: ${country.slug}`)
  }

  // 2. Body Types
  for (const type of BODY_TYPES) {
    const filePath = path.join(DATA_DIR, 'body-types', `${type.slug}.mdx`)

    const frontmatter = {
      name: type.name,
      locale: 'vi',
      icon: `/images/body-types/${type.slug}/hero.png`, // UPDATED: png (used as icon too for now)
      heroImage: `/images/body-types/${type.slug}/hero.png`, // UPDATED: png
      featured: ['sedan', 'suv', 'crossover', 'roadster'].includes(type.slug),
      description: type.description,
      funFact: type.funFact,
    }

    const content = `${type.description} Đây là kiểu xe rất phổ biến và dễ nhận biết trên đường phố.`

    await fs.outputFile(filePath, createMdxContent(frontmatter, type.name, content))
    console.log(`Updated BodyType: ${type.slug}`)
  }

  // 3. Brands
  for (const brand of BRANDS) {
    const filePath = path.join(DATA_DIR, 'brands', `${brand.slug}.mdx`)

    const countryName = COUNTRIES.find((c) => c.slug === brand.country)?.name || brand.country

    const frontmatter = {
      name: brand.name,
      locale: 'vi',
      country: brand.country,
      foundedYear: 1900 + Math.floor(Math.random() * 100),
      logo: `/images/brands/${brand.slug}/logo.svg`,
      heroImage: `/images/brands/${brand.slug}/hero.png`, // UPDATED: png
      cardImage: `/images/brands/${brand.slug}/hero.png`, // UPDATED: Re-use hero (png)
      bodyTypes: brand.bodyTypes,
      featured: ['toyota', 'bmw', 'tesla', 'ferrari', 'vinfast'].includes(brand.slug),
      funFact: `${brand.name} là hãng xe nổi tiếng của ${countryName}!`,
    }

    const content = `${brand.name} là thương hiệu xe hơi được nhiều người yêu thích. Những chiếc xe của ${brand.name} luôn mang lại niềm vui cho người lái.`

    await fs.outputFile(filePath, createMdxContent(frontmatter, brand.name, content))
    console.log(`Updated Brand: ${brand.slug}`)
  }

  console.log('✅ Scaffolding complete!')
}

main().catch(console.error)
