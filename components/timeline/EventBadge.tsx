import { TimelineEventType } from '@/lib/types'

interface EventBadgeProps {
    eventType: TimelineEventType
}

const EVENT_TYPE_CONFIG: Record<
    TimelineEventType,
    { label: string; emoji: string; color: string }
> = {
    founded: {
        label: 'Khai sinh',
        emoji: '🌱',
        color: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
    },
    technology: {
        label: 'Công nghệ',
        emoji: '⚙️',
        color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
    },
    'iconic-model': {
        label: 'Xe huyền thoại',
        emoji: '🚗',
        color: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
    },
    philosophy: {
        label: 'Triết lý',
        emoji: '💡',
        color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
    },
    'modern-era': {
        label: 'Hiện đại',
        emoji: '⭐',
        color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
    },
}

export default function EventBadge({ eventType }: EventBadgeProps) {
    const config = EVENT_TYPE_CONFIG[eventType]

    return (
        <span
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${config.color}`}
        >
            <span aria-hidden="true">{config.emoji}</span>
            <span>{config.label}</span>
        </span>
    )
}
