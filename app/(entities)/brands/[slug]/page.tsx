import { notFound } from 'next/navigation'
import { getAllBrands, getBrandBySlug } from '@/lib/entities'
import { compileMDXContent } from '@/lib/mdx'
import { genPageMetadata } from 'app/seo'
import Image from '@/components/Image'

export async function generateStaticParams() {
  const brands = getAllBrands()
  return brands.map((brand) => ({
    slug: brand.slug,
  }))
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params
  const brand = getBrandBySlug(params.slug)
  if (!brand) return
  return genPageMetadata({
    title: brand.name,
    description: brand.funFact,
    image: brand.heroImage,
  })
}

export default async function BrandPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params
  const brand = getBrandBySlug(params.slug)

  if (!brand) {
    notFound()
  }

  const content = await compileMDXContent(brand.content)

  return (
    <article>
      <div className="space-y-2 xl:grid xl:grid-cols-4 xl:gap-x-8 xl:space-y-0">
        <div className="xl:col-span-3 xl:row-span-2 xl:pb-0">
          <div className="prose max-w-none pb-8 pt-10 dark:prose-invert">
            {brand.heroImage && (
              <div className="relative mb-8 h-64 w-full overflow-hidden rounded-lg md:h-96">
                <Image
                  src={brand.heroImage}
                  alt={brand.name}
                  className="object-cover"
                  fill
                  sizes="100vw"
                  priority
                />
              </div>
            )}
            <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
              {brand.name}
            </h1>
            <div className="mb-4 text-sm text-gray-500">
              Thành lập: {brand.foundedYear}
            </div>
            
            {content}
          </div>
        </div>
        
        {/* Sidebar Info */}
        <div className="pt-8 xl:pt-14">
            <div className="rounded-lg border border-gray-200 p-6 dark:border-gray-700">
                <h3 className="mb-4 text-xl font-bold">Thông tin nhanh</h3>
                <dl className="space-y-4">
                    <div>
                        <dt className="text-sm text-gray-500">Quốc gia</dt>
                        <dd className="font-semibold">{brand.country === 'japan' ? 'Nhật Bản' : brand.country}</dd>
                    </div>
                    <div>
                        <dt className="text-sm text-gray-500">Năm thành lập</dt>
                        <dd className="font-semibold">{brand.foundedYear}</dd>
                    </div>
                </dl>
                {brand.logo && (
                    <div className="mt-6 flex justify-center">
                        <Image src={brand.logo} alt={`${brand.name} logo`} width={100} height={100} />
                    </div>
                )}
            </div>
        </div>
      </div>
    </article>
  )
}
