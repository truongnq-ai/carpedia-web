import Image from 'next/image'
import { TimelineEvent } from '@/lib/types'
import EventBadge from './EventBadge'

interface TimelineNodeProps {
    event: TimelineEvent
}

export default function TimelineNode({ event }: TimelineNodeProps) {
    return (
        <div className="relative flex flex-col gap-4 pb-8">
            {/* Time Label */}
            <div className="flex items-center gap-3">
                <time className="inline-block rounded-md bg-gray-100 px-3 py-1 text-sm font-semibold text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                    {event.period}
                </time>
                <EventBadge eventType={event.eventType} />
            </div>

            {/* Hero Images */}
            <div className="space-y-3">
                {event.heroImages.map((imagePath, index) => (
                    <div
                        key={`${event.id}-img-${index}`}
                        className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800"
                    >
                        <Image
                            src={imagePath}
                            alt={`${event.title} - Hình ${index + 1}`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    </div>
                ))}
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">{event.title}</h3>

            {/* Description */}
            <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300">
                {event.description}
            </p>
        </div>
    )
}
