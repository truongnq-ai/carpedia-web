import { BrandTimeline } from '@/lib/types'
import TimelineNode from './TimelineNode'

interface BrandTimelineProps {
    timeline: BrandTimeline
}

export function BrandTimelineComponent({ timeline }: BrandTimelineProps) {
    if (!timeline.events || timeline.events.length === 0) {
        return null
    }

    return (
        <section className="mt-12" aria-labelledby="timeline-heading">
            {/* Section Header */}
            <div className="mb-8 border-b border-gray-200 pb-4 dark:border-gray-700">
                <h2
                    id="timeline-heading"
                    className="text-2xl font-bold text-gray-900 dark:text-gray-100 md:text-3xl"
                >
                    Hành trình phát triển
                </h2>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    Khám phá câu chuyện của thương hiệu qua từng mốc thời gian
                </p>
            </div>

            {/* Timeline Container */}
            <div className="relative space-y-8">
                {/* Timeline Axis (vertical line) */}
                <div
                    className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700"
                    aria-hidden="true"
                />

                {/* Timeline Events */}
                <div className="relative space-y-12 pl-8">
                    {timeline.events.map((event) => (
                        <TimelineNode key={event.id} event={event} />
                    ))}
                </div>
            </div>
        </section>
    )
}
