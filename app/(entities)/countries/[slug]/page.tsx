import { notFound } from 'next/navigation'
import { getAllCountries, getCountryBySlug } from '@/lib/entities'
import { compileMDXContent } from '@/lib/mdx'
import { genPageMetadata } from 'app/seo'
import Image from '@/components/Image'

export async function generateStaticParams() {
  const countries = getAllCountries()
  return countries.map((country) => ({
    slug: country.slug,
  }))
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params
  const country = getCountryBySlug(params.slug)
  if (!country) return
  return genPageMetadata({
    title: country.name,
    description: country.funFact,
    image: country.heroImage,
  })
}

export default async function CountryPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params
  const country = getCountryBySlug(params.slug)

  if (!country) {
    notFound()
  }

  const content = await compileMDXContent(country.content)

  return (
    <article>
        <div className="space-y-2 xl:grid xl:grid-cols-4 xl:gap-x-8 xl:space-y-0">
        <div className="xl:col-span-3 xl:row-span-2 xl:pb-0">
          <div className="prose max-w-none pb-8 pt-10 dark:prose-invert">
            {country.heroImage && (
              <div className="relative mb-8 h-64 w-full overflow-hidden rounded-lg md:h-96">
                <Image
                  src={country.heroImage}
                  alt={country.name}
                  className="object-cover"
                  fill
                  sizes="100vw"
                  priority
                />
              </div>
            )}
            <div className="flex items-center space-x-4">
                {country.flag && (
                    <div className="relative h-12 w-16 overflow-hidden shadow-sm">
                        <Image src={country.flag} alt={`${country.name} flag`} fill className="object-cover" />
                    </div>
                )}
                <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
                {country.name}
                </h1>
            </div>
            
            {content}
          </div>
        </div>
        
        {/* Sidebar Info */}
        <div className="pt-8 xl:pt-14">
            <div className="rounded-lg bg-blue-50 p-6 dark:bg-blue-900/20">
                <h3 className="mb-2 text-xl font-bold text-blue-900 dark:text-blue-100">Bạn có biết?</h3>
                <p className="text-blue-800 dark:text-blue-200">{country.funFact}</p>
            </div>
        </div>
      </div>
    </article>
  )
}
