import { notFound } from 'next/navigation'
import { getAllBodyTypes, getBodyTypeBySlug } from '@/lib/entities'
import { CustomMDX } from '@/lib/mdx'
import { genPageMetadata } from 'app/seo'
import Image from '@/components/Image'

export async function generateStaticParams() {
  const bodyTypes = getAllBodyTypes()
  return bodyTypes.map((bt) => ({
    slug: bt.slug,
  }))
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params
  const bt = getBodyTypeBySlug(params.slug)
  if (!bt) return
  return genPageMetadata({
    title: bt.name,
    description: bt.description,
    image: bt.heroImage,
  })
}

export default async function BodyTypePage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params
  const bt = getBodyTypeBySlug(params.slug)

  if (!bt) {
    notFound()
  }

  return (
    <article>
      <div className="space-y-2 xl:grid xl:grid-cols-4 xl:space-y-0 xl:gap-x-8">
        <div className="xl:col-span-3 xl:row-span-2 xl:pb-0">
          <div className="prose dark:prose-invert max-w-none pt-10 pb-8">
            {bt.heroImage && (
              <div className="relative mb-8 w-full overflow-hidden rounded-lg border border-gray-100 dark:border-gray-800">
                <div className="relative aspect-3/2 w-full">
                  <Image
                    src={bt.heroImage}
                    alt={bt.name}
                    className="object-cover"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 50vw"
                    priority
                  />
                </div>
              </div>
            )}

            <CustomMDX source={bt.content} />
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="pt-8 xl:pt-14">
          <div className="rounded-lg bg-blue-50 p-6 dark:bg-blue-900/20">
            <h3 className="mb-2 text-xl font-bold text-blue-900 dark:text-blue-100">
              Bạn có biết?
            </h3>
            <p className="text-blue-800 dark:text-blue-200">{bt.funFact}</p>
          </div>
        </div>
      </div>
    </article>
  )
}
