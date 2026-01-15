import { notFound } from 'next/navigation'
import { getAllBodyTypes, getBodyTypeBySlug } from '@/lib/entities'
import { compileMDXContent } from '@/lib/mdx'
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

  const content = await compileMDXContent(bt.content)

  return (
    <article>
      <div className="space-y-2 xl:grid xl:grid-cols-4 xl:gap-x-8 xl:space-y-0">
        <div className="xl:col-span-3 xl:row-span-2 xl:pb-0">
          <div className="prose max-w-none pb-8 pt-10 dark:prose-invert">
            {bt.heroImage && (
              <div className="relative mb-8 h-64 w-full overflow-hidden rounded-lg md:h-96">
                <Image
                  src={bt.heroImage}
                  alt={bt.name}
                  className="object-cover"
                  fill
                  sizes="100vw"
                  priority
                />
              </div>
            )}
             <div className="flex items-center space-x-4">
                {bt.icon && (
                    <div className="relative h-12 w-12">
                        <Image src={bt.icon} alt={`${bt.name} icon`} fill className="object-cover" />
                    </div>
                )}
                <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
                {bt.name}
                </h1>
            </div>
            
            <p className="lead text-xl text-gray-500">{bt.description}</p>
            
            {content}
          </div>
        </div>
      </div>
    </article>
  )
}
