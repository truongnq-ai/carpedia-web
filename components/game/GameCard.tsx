'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

interface GameCardProps {
  title: string
  description?: string
  href: string
  previewVideo?: string
}

export default function GameCard({ title, description, href, previewVideo }: GameCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isIntersecting, setIntersecting] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIntersecting(entry.isIntersecting)
      },
      { threshold: 0.5 } // Play when at least 50% visible
    )

    if (videoRef.current) {
      observer.observe(videoRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    if (videoRef.current) {
      if (isIntersecting) {
        videoRef.current.play().catch((error) => {
          console.warn('Video auto-play failed:', error)
        })
      } else {
        videoRef.current.pause()
      }
    }
  }, [isIntersecting])

  return (
    <div className="w-full p-4 md:w-1/2" style={{ maxWidth: '544px' }}>
      <div className="border-opacity-60 h-full overflow-hidden rounded-md border-2 border-gray-200 dark:border-gray-700">
        <div className="relative aspect-video bg-gray-100 dark:bg-gray-800">
          <Link href={href} aria-label={`Link to ${title}`}>
            {previewVideo ? (
              <video
                ref={videoRef}
                src={previewVideo}
                muted
                loop
                playsInline
                className="h-full w-full object-cover object-center"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-gray-400">
                <div className="text-center">
                  <div className="mb-2 text-4xl">🎮</div>
                  <p className="text-sm">Video Preview Coming Soon</p>
                </div>
              </div>
            )}
          </Link>
        </div>
        <div className="p-4">
          <h2 className="mb-2 text-2xl leading-8 font-bold tracking-tight">
            <Link href={href} aria-label={`Link to ${title}`}>
              {title}
            </Link>
          </h2>
          {description && (
            <p className="prose mb-3 max-w-none text-gray-500 dark:text-gray-400">{description}</p>
          )}
          <Link
            href={href}
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 text-base leading-6 font-medium"
            aria-label={`Play ${title}`}
          >
            Chơi ngay &rarr;
          </Link>
        </div>
      </div>
    </div>
  )
}
