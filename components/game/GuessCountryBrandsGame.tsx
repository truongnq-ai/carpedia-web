'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import { Brand, Country } from '@/lib/types'
import { generateQuestionGame2, getRandomSound } from '@/lib/game-logic'

interface GuessCountryBrandsGameProps {
  brands: Brand[]
  countries: Country[]
}

export default function GuessCountryBrandsGame({ brands, countries }: GuessCountryBrandsGameProps) {
  const router = useRouter()
  const [solvedSlugs, setSolvedSlugs] = useState<string[]>([])
  const [currentQuestion, setCurrentQuestion] =
    useState<ReturnType<typeof generateQuestionGame2>>(null)
  const [correctChoices, setCorrectChoices] = useState<string[]>([])
  const [wrongChoices, setWrongChoices] = useState<string[]>([])
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

    const nextQuestion = generateQuestionGame2(
      brands,
      countries,
      solvedSlugs,
      currentQuestion?.country.slug
    )
    if (nextQuestion) {
      setCurrentQuestion(nextQuestion)
      setCorrectChoices([])
      setWrongChoices([])
    } else {
      setIsCompleted(true)
    }
  }, [brands, countries, solvedSlugs, currentQuestion])

  // Initialize first question
  useEffect(() => {
    handleNextQuestion()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Derived state to check if question is solved
  const remainingToFind = currentQuestion 
    ? currentQuestion.correctSlugs.length - correctChoices.length 
    : 0
  const isQuestionSolved = currentQuestion !== null && remainingToFind === 0

  // Auto-next countdown effect
  useEffect(() => {
    if (isQuestionSolved && !isCompleted) {
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
  }, [isQuestionSolved, isCompleted, handleNextQuestion])

  const playSound = (correct: boolean) => {
    const soundPath = getRandomSound(correct)
    if (audioRef.current) {
      audioRef.current.src = soundPath
      audioRef.current.play().catch((err) => console.log('Audio play failed:', err))
    }
  }

  const handleSelectOption = (brandSlug: string) => {
    if (!currentQuestion || correctChoices.includes(brandSlug) || wrongChoices.includes(brandSlug))
      return

    const isCorrect = currentQuestion.correctSlugs.includes(brandSlug)

    if (isCorrect) {
      const newCorrect = [...correctChoices, brandSlug]
      setCorrectChoices(newCorrect)

      const isLastOne = newCorrect.length === currentQuestion.correctSlugs.length

      if (isLastOne) {
        playSound(true)
        if (navigator.vibrate) navigator.vibrate(200)

        // Fire confetti from the center of the last correct button
        const button = buttonRefs.current[brandSlug]
        if (button) {
          const rect = button.getBoundingClientRect()
          const x = (rect.left + rect.width / 2) / window.innerWidth
          const y = (rect.top + rect.height / 2) / window.innerHeight

          confetti({
            particleCount: 150,
            spread: 80,
            origin: { x, y },
            colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff'],
          })
        }

        setSolvedSlugs((prev) => [...prev, currentQuestion.country.slug])
      } else {
        // Correct but not the last one
        playSound(true)
        if (navigator.vibrate) navigator.vibrate(100)
      }
    } else {
      setWrongChoices((prev) => [...prev, brandSlug])
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
          <div className="mb-6 text-8xl">🏆</div>
          <h2 className="mb-4 text-4xl font-extrabold dark:text-gray-100">BÉ THẬT LÀ GIỎI!</h2>
          <p className="mb-8 text-xl text-gray-600 dark:text-gray-400">
            Bé đã biết hết các hãng xe của các nước rồi đó!
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
    <div className="font-nunito mx-auto max-w-4xl px-0 py-0">
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <audio ref={audioRef} />

      <div className="overflow-hidden rounded-3xl border-2 border-gray-100 bg-white shadow-2xl dark:border-gray-800 dark:bg-gray-900">
        {/* Country Section */}
        <div className="flex min-h-[200px] flex-col items-center justify-center bg-gray-50 p-6 md:min-h-[300px] md:p-10 lg:p-12 dark:bg-gray-800">
          <motion.div
            key={currentQuestion.country.slug}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative aspect-[3/2] w-48 overflow-hidden rounded-2xl border-4 border-white shadow-lg dark:border-gray-700"
          >
            <Image
              src={currentQuestion.country.flag}
              alt={currentQuestion.country.name}
              fill
              className="object-cover"
            />
          </motion.div>
          <h1 className="mt-8 text-center text-xl font-bold md:text-3xl dark:text-gray-100">
            Nước <span className="text-primary-500">{currentQuestion.country.name}</span> này có
            những hãng xe nào nhỉ?
          </h1>

          {/* Hint Message */}
          <motion.div
            key={remainingToFind}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className={`mt-4 rounded-full px-6 py-2 text-lg font-bold ${
              isQuestionSolved
                ? 'bg-green-100 text-green-600 dark:bg-green-900/30'
                : 'bg-primary-100 text-primary-600 dark:bg-primary-900/30'
            }`}
          >
            {isQuestionSolved
              ? 'Giỏi quá! Bé đã tìm đủ rồi!'
              : correctChoices.length > 0
                ? `Đúng rồi! Bé tìm thêm ${remainingToFind} hãng nữa nhé!`
                : `Hãy tìm ${remainingToFind} hãng xe nhé!`}
          </motion.div>
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

        {/* Options Grid (Brands) */}
        <div className="grid grid-cols-2 gap-3 p-4 md:gap-6 md:p-6 lg:grid-cols-4 lg:p-8">
          {currentQuestion.options.map((option) => {
            const isCorrect = correctChoices.includes(option.slug)
            const isWrong = wrongChoices.includes(option.slug)

            return (
              <motion.button
                key={option.slug}
                ref={(el) => {
                  buttonRefs.current[option.slug] = el
                }}
                whileHover={!isQuestionSolved && !isCorrect && !isWrong ? { scale: 1.05 } : {}}
                whileTap={!isQuestionSolved && !isCorrect && !isWrong ? { scale: 0.95 } : {}}
                animate={
                  isWrong
                    ? {
                        x: [0, -10, 10, -10, 10, 0],
                        scale: 1.0,
                      }
                    : {}
                }
                onClick={() => handleSelectOption(option.slug)}
                disabled={isQuestionSolved || isCorrect || isWrong}
                className={`relative flex h-full flex-col items-center rounded-2xl border-4 p-4 transition-all ${
                  !isCorrect && !isWrong
                    ? 'hover:border-primary-300 border-gray-100 bg-white dark:border-gray-800 dark:bg-gray-800'
                    : isCorrect
                      ? 'border-green-500 bg-green-50 shadow-inner dark:bg-green-900/20'
                      : isWrong
                        ? 'border-red-500 bg-red-50 opacity-70 dark:bg-red-900/20'
                        : ''
                }`}
              >
                <div className="relative mb-4 aspect-[3/2] w-full overflow-hidden rounded-xl border border-gray-100 bg-white shadow-md dark:border-gray-700 dark:bg-gray-700">
                  <Image
                    src={option.logo}
                    alt={option.name}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-contain p-1"
                  />
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
            Đã xong: {solvedSlugs.length} /{' '}
            {countries.filter((c) => brands.some((b) => b.country === c.slug)).length} nước
          </div>
          <button
            onClick={handleNextQuestion}
            className={`rounded-full px-4 py-2 font-bold shadow-md transition-all md:px-6 lg:px-8 lg:py-3 ${
              isQuestionSolved || solvedSlugs.length > 0
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
