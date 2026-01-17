'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import { Brand, Country } from '@/lib/types'
import { generateQuestion, getRandomSound } from '@/lib/game-logic'

interface GuessBrandGameProps {
  brands: Brand[]
  countries: Country[]
}

export default function GuessBrandGame({ brands, countries }: GuessBrandGameProps) {
  const router = useRouter()
  const [solvedSlugs, setSolvedSlugs] = useState<string[]>([])
  const [currentQuestion, setCurrentQuestion] = useState<ReturnType<typeof generateQuestion>>(null)
  const [wrongChoices, setWrongChoices] = useState<string[]>([])
  const [hasGuessedCorrectly, setHasGuessedCorrectly] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const [autoNextCountdown, setAutoNextCountdown] = useState<number | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const buttonRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({})

  const handleNextQuestion = useCallback(() => {
    // Stop any playing audio
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }

    // Clear countdown
    setAutoNextCountdown(null)

    const nextQuestion = generateQuestion(
      brands,
      countries,
      solvedSlugs,
      currentQuestion?.brand.slug
    )
    if (nextQuestion) {
      setCurrentQuestion(nextQuestion)
      setWrongChoices([])
      setHasGuessedCorrectly(false)
    } else {
      setIsCompleted(true)
    }
  }, [brands, countries, solvedSlugs, currentQuestion])

  // Initialize first question
  useEffect(() => {
    handleNextQuestion()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Auto-next countdown effect
  useEffect(() => {
    if (hasGuessedCorrectly && !isCompleted) {
      setAutoNextCountdown(3)
      const timer = setInterval(() => {
        setAutoNextCountdown((prev) => {
          if (prev === 1) {
            handleNextQuestion()
            return null
          }
          return prev !== null ? prev - 1 : null
        })
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [hasGuessedCorrectly, isCompleted, handleNextQuestion])

  const playSound = (correct: boolean) => {
    const soundPath = getRandomSound(correct)
    if (audioRef.current) {
      audioRef.current.src = soundPath
      audioRef.current.play().catch((err) => console.log('Audio play failed:', err))
    }
  }

  const handleSelectOption = (countrySlug: string) => {
    if (hasGuessedCorrectly || wrongChoices.includes(countrySlug)) return

    const isCorrect = countrySlug === currentQuestion?.brand.country

    if (isCorrect) {
      setHasGuessedCorrectly(true)
      playSound(true)
      if (navigator.vibrate) navigator.vibrate(200)

      // Fire confetti from the center of the button
      const button = buttonRefs.current[countrySlug]
      if (button) {
        const rect = button.getBoundingClientRect()
        const x = (rect.left + rect.width / 2) / window.innerWidth
        const y = (rect.top + rect.height / 2) / window.innerHeight

        confetti({
          particleCount: 150,
          spread: 80,
          origin: { x, y },
          colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff'],
          startVelocity: 30,
          gravity: 0.8,
          ticks: 200,
        })
      }

      // Add to solved list
      setSolvedSlugs((prev) => [...prev, currentQuestion!.brand.slug])
    } else {
      setWrongChoices((prev) => [...prev, countrySlug])
      playSound(false)
      if (navigator.vibrate) navigator.vibrate([100, 50, 100])
    }
  }

  const handleFinish = () => {
    router.push('/games')
  }

  if (isCompleted) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="border-primary-500 rounded-3xl border-4 bg-white p-10 shadow-xl dark:bg-gray-900"
        >
          <div className="mb-6 text-8xl">🥳</div>
          <h2 className="mb-4 text-4xl font-extrabold dark:text-gray-100">TUYỆT VỜI QUÁ!</h2>
          <p className="mb-8 text-xl text-gray-600 dark:text-gray-400">
            Bé đã xuất sắc trả lời đúng hết tất cả các câu hỏi rồi đó!
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <button
              onClick={() => {
                setSolvedSlugs([])
                setIsCompleted(false)
                handleNextQuestion()
              }}
              className="bg-primary-500 hover:bg-primary-600 rounded-full px-8 py-4 text-xl font-bold text-white transition-colors"
            >
              Chơi lại từ đầu
            </button>
            <button
              onClick={handleFinish}
              className="rounded-full bg-gray-200 px-8 py-4 text-xl font-bold text-gray-800 transition-colors hover:bg-gray-300"
            >
              Khám phá trò khác
            </button>
          </div>
        </motion.div>
      </div>
    )
  }

  if (!currentQuestion) return null

  return (
    <div className="mx-auto max-w-4xl px-0 py-0">
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <audio ref={audioRef} />

      <div className="overflow-hidden rounded-3xl border-2 border-gray-100 bg-white shadow-2xl dark:border-gray-800 dark:bg-gray-900">
        {/* Brand Logo Section */}
        <div className="flex min-h-[200px] flex-col items-center justify-center bg-gray-50 p-6 md:min-h-[300px] md:p-10 lg:p-12 dark:bg-gray-800">
          <motion.div
            key={currentQuestion.brand.slug}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="rounded-2xl border border-gray-100 bg-white p-8 shadow-md"
          >
            <Image
              src={currentQuestion.brand.logo}
              alt={currentQuestion.brand.name}
              width={200}
              height={200}
              className="h-48 w-48 object-contain"
            />
          </motion.div>
          <h1 className="mt-8 text-center text-xl font-bold md:text-3xl dark:text-gray-100">
            Hãng xe này của nước nào nhỉ?
          </h1>
        </div>

        {/* Auto-next Countdown Message */}
        <AnimatePresence>
          {autoNextCountdown !== null && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mt-2 flex justify-center overflow-hidden text-center"
            >
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Tự động chuyển sang câu hỏi tiếp theo sau{' '}
                <span className="text-primary-500 animate-pulse font-bold">
                  {autoNextCountdown}
                </span>{' '}
                giây
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Options Grid */}
        <div className="grid grid-cols-2 gap-3 p-4 md:gap-6 md:p-6 lg:grid-cols-4 lg:p-8">
          {currentQuestion.options.map((option) => {
            const isWrong = wrongChoices.includes(option.slug)
            const isCorrect = hasGuessedCorrectly && option.slug === currentQuestion.brand.country
            const isImageFlag = option.flag.startsWith('/')

            return (
              <motion.button
                key={option.slug}
                ref={(el) => {
                  buttonRefs.current[option.slug] = el
                }}
                whileHover={!hasGuessedCorrectly && !isWrong ? { scale: 1.05 } : {}}
                whileTap={!hasGuessedCorrectly && !isWrong ? { scale: 0.95 } : {}}
                animate={
                  isWrong
                    ? {
                        x: [0, -10, 10, -10, 10, 0],
                        scale: 1.0,
                      }
                    : {}
                }
                onClick={() => handleSelectOption(option.slug)}
                disabled={hasGuessedCorrectly || isWrong}
                className={`relative flex h-full flex-col items-center rounded-2xl border-4 p-4 transition-all ${
                  !hasGuessedCorrectly && !isWrong
                    ? 'hover:border-primary-300 border-gray-100 bg-white dark:border-gray-800 dark:bg-gray-800'
                    : isCorrect
                      ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                      : isWrong
                        ? 'border-red-500 bg-red-50 opacity-70 dark:bg-red-900/20'
                        : 'border-gray-100 bg-white opacity-50 dark:border-gray-800 dark:bg-gray-800'
                }`}
              >
                <div className="relative mb-4 flex aspect-[3/2] w-full items-center justify-center overflow-hidden rounded-xl border border-gray-100 shadow-md dark:border-gray-700">
                  {isImageFlag ? (
                    <Image src={option.flag} alt={option.name} fill className="object-cover" />
                  ) : (
                    <span className="text-4xl md:text-8xl">{option.flag}</span>
                  )}
                </div>
                <div className="text-center text-sm font-bold text-gray-700 md:text-xl dark:text-gray-300">
                  {option.name}
                </div>

                {/* Badges */}
                <AnimatePresence>
                  {isCorrect && (
                    <motion.div
                      initial={{ scale: 0, rotate: -20 }}
                      animate={{ scale: 1, rotate: 0 }}
                      className="absolute -top-4 -right-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-green-500 text-3xl text-white shadow-lg"
                    >
                      ✓
                    </motion.div>
                  )}
                  {isWrong && (
                    <motion.div
                      initial={{ scale: 0, rotate: 20 }}
                      animate={{ scale: 1, rotate: 0 }}
                      className="absolute -top-4 -right-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-red-500 text-3xl text-white shadow-lg"
                    >
                      ✕
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            )
          })}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between bg-gray-50 p-4 md:p-6 lg:p-8 dark:bg-gray-800">
          <button
            onClick={handleFinish}
            className="flex items-center gap-2 font-bold text-gray-500 transition-colors hover:text-red-500"
          >
            ✖ Kết thúc
          </button>
          <div className="font-medium text-gray-400">
            Đã đúng: {solvedSlugs.length} / {brands.length}
          </div>
          <button
            onClick={handleNextQuestion}
            className={`rounded-full px-4 py-2 font-bold shadow-md transition-all md:px-6 lg:px-8 lg:py-3 ${
              hasGuessedCorrectly || solvedSlugs.length > 0
                ? 'scale-105 bg-green-500 text-white hover:bg-green-600'
                : 'cursor-not-allowed border border-gray-200 bg-gray-300 text-gray-400'
            }`}
          >
            Tiếp theo &rarr;
          </button>
        </div>
      </div>
    </div>
  )
}
