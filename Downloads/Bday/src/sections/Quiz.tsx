import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Gamepad2,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Heart,
  Trophy,
} from "lucide-react"
import { quizQuestions, quizScoreTiers } from "@/data/quizQuestions"
import confetti from "canvas-confetti"

export const Quiz: React.FC = () => {
  const [hasStarted, setHasStarted] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  // Store user answers: index -> selectedOptionIndex
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({})
  const [isFinished, setIsFinished] = useState(false)

  const currentQ = quizQuestions[currentIndex]
  const totalQuestions = quizQuestions.length

  const handleSelectOption = (optIndex: number) => {
    // If already answered, allow reselection or lock? Usually allow selection for that question:
    const updated = { ...userAnswers, [currentIndex]: optIndex }
    setUserAnswers(updated)

    // Trigger micro celebration if correct
    if (optIndex === currentQ.correctAnswer) {
      try {
        confetti({
          particleCount: 15,
          spread: 50,
          origin: { y: 0.7 },
          colors: ["#E8A8B8", "#D6B779"],
        })
      } catch {}
    }
  }

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1)
    } else {
      // Finish quiz
      setIsFinished(true)
      // Confetti burst for quiz completion!
      confetti({
        particleCount: 70,
        spread: 90,
        origin: { y: 0.5 },
        colors: ["#F8DDE5", "#E8A8B8", "#D6B779"],
      })
    }
  }

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1)
    }
  }

  const handleRestart = () => {
    setUserAnswers({})
    setCurrentIndex(0)
    setIsFinished(false)
    setHasStarted(false)
  }

  // Calculate score (exclude bonus question from strict penalty, but give bonus points)
  const correctCount = Object.entries(userAnswers).reduce((acc, [qIdx, chosenOpt]) => {
    const q = quizQuestions[parseInt(qIdx, 10)]
    return q && chosenOpt === q.correctAnswer ? acc + 1 : acc
  }, 0)

  const scorePercentage = Math.round((correctCount / totalQuestions) * 100)

  const getTier = () => {
    if (scorePercentage >= 90) return quizScoreTiers.high
    if (scorePercentage >= 70) return quizScoreTiers.good
    if (scorePercentage >= 40) return quizScoreTiers.medium
    return quizScoreTiers.low
  }

  const answeredCurrent = userAnswers[currentIndex] !== undefined
  const selectedAnswer = userAnswers[currentIndex]
  const isSelectedCorrect = selectedAnswer === currentQ?.correctAnswer

  return (
    <section id="quiz" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-widest text-gold glass-card border-gold/30 mb-3"
        >
          <Gamepad2 className="w-3.5 h-3.5 text-gold" />
          <span>OUR LITTLE QUIZ 🎮</span>
        </motion.div>

        <h2 className="font-serif text-3xl sm:text-5xl font-bold text-cream-100 tracking-tight mb-2">
          How Well Do You Know Me? ❤️
        </h2>
        <p className="font-sans text-cream-200/80 text-sm sm:text-base font-light">
          You say you know everything about me? Let's put your boyfriend memory to the test!
        </p>
      </div>

      <AnimatePresence mode="wait">
        {!hasStarted ? (
          /* Start Screen */
          <motion.div
            key="start-screen"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="glass-panel p-8 sm:p-12 rounded-3xl border border-blush-300/30 text-center shadow-2xl relative overflow-hidden"
          >
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-rose-500/20 to-gold/20 border border-gold/30 flex items-center justify-center mx-auto mb-6 text-gold">
              <Heart className="w-10 h-10 text-rose-400 fill-rose-400 animate-pulse" />
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-cream-100 mb-4">
              Ready for the Ultimate Couple Challenge?
            </h3>

            <p className="font-sans text-cream-200/80 text-sm sm:text-base max-w-lg mx-auto mb-8 font-light leading-relaxed">
              4 fun rounds covering our favourite memories, inside jokes, little habits, and secret moments. No cheating allowed!
            </p>

            <button
              onClick={() => setHasStarted(true)}
              className="px-8 sm:px-10 py-4 rounded-full text-sm sm:text-base font-bold text-midnight bg-gradient-to-r from-blush-300 via-rose-300 to-gold shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2 mx-auto"
            >
              <span>START QUIZ</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        ) : !isFinished ? (
          /* Active Question Screen */
          <motion.div
            key={`question-${currentIndex}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="glass-panel p-6 sm:p-10 rounded-3xl border border-blush-300/30 shadow-2xl relative"
          >
            {/* Top Progress bar & Counter */}
            <div className="mb-6">
              <div className="flex items-center justify-between text-xs text-cream-200/70 mb-2 font-mono">
                <span className="text-gold font-bold">
                  {currentQ.round} • {currentQ.category}
                </span>
                <span>
                  Question {currentIndex + 1} of {totalQuestions}
                </span>
              </div>
              <div className="w-full h-2 bg-navy-dark rounded-full overflow-hidden border border-blush-300/20">
                <div
                  className="h-full bg-gradient-to-r from-blush-300 to-gold transition-all duration-300"
                  style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
                />
              </div>
            </div>

            {/* Question Text & Optional Image */}
            <div className="mb-8">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-cream-100 leading-snug">
                {currentQ.question}
              </h3>
              {currentQ.image && (
                <div className="mt-4 aspect-video max-h-48 rounded-xl overflow-hidden bg-neutral-900 border border-cream-100/10">
                  <img
                    src={currentQ.image}
                    alt="Quiz hint"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              )}
            </div>

            {/* 4 Answer Options */}
            <div className="grid grid-cols-1 gap-3 mb-6">
              {currentQ.options.map((option, optIdx) => {
                const isSelected = selectedAnswer === optIdx
                const isCorrect = optIdx === currentQ.correctAnswer
                const showFeedback = answeredCurrent

                let btnStyles = "glass-card text-cream-100 hover:border-gold/50"
                if (showFeedback) {
                  if (isCorrect) {
                    btnStyles = "bg-emerald-950/60 border-emerald-400 text-emerald-200"
                  } else if (isSelected) {
                    btnStyles = "bg-rose-950/60 border-rose-400 text-rose-200"
                  }
                } else if (isSelected) {
                  btnStyles = "bg-blush-300/20 border-blush-300 text-cream-100"
                }

                return (
                  <button
                    key={optIdx}
                    onClick={() => handleSelectOption(optIdx)}
                    className={`p-4 rounded-xl text-left text-sm font-medium transition-all flex items-center justify-between border ${btnStyles}`}
                  >
                    <span>{option}</span>
                    {showFeedback && (
                      <span>
                        {isCorrect ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                        ) : isSelected ? (
                          <XCircle className="w-5 h-5 text-rose-400" />
                        ) : null}
                      </span>
                    )}
                  </button>
                )
              })}
            </div>

            {/* Immediate Feedback Box */}
            {answeredCurrent && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-2xl mb-6 text-sm flex items-start gap-3 border ${
                  isSelectedCorrect
                    ? "bg-emerald-950/40 border-emerald-500/30 text-emerald-200"
                    : "bg-rose-950/40 border-rose-500/30 text-rose-200"
                }`}
              >
                <div className="mt-0.5">
                  {isSelectedCorrect ? (
                    <Sparkles className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <HelpCircle className="w-5 h-5 text-rose-400" />
                  )}
                </div>
                <div>
                  <p className="font-semibold">
                    {isSelectedCorrect ? currentQ.correctFeedback : currentQ.incorrectFeedback}
                  </p>
                  {currentQ.bonusMessage && (
                    <p className="text-xs opacity-80 mt-1 italic font-handwriting text-base">
                      "{currentQ.bonusMessage}"
                    </p>
                  )}
                </div>
              </motion.div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-blush-300/20">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium glass-card text-cream-200/70 hover:text-cream-100 disabled:opacity-30 disabled:pointer-events-none transition-all"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Previous</span>
              </button>

              <button
                onClick={handleNext}
                disabled={!answeredCurrent}
                className="flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-semibold bg-gradient-to-r from-blush-400 to-rose-500 text-cream-100 disabled:opacity-40 disabled:pointer-events-none hover:scale-105 transition-all shadow-md"
              >
                <span>{currentIndex === totalQuestions - 1 ? "Finish Quiz 🏆" : "Next Question"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        ) : (
          /* Final Quiz Result Screen */
          <motion.div
            key="result-screen"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-panel p-8 sm:p-12 rounded-3xl border border-gold/40 text-center shadow-2xl relative"
          >
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-gold/30 to-rose-400/30 border border-gold/50 flex items-center justify-center mx-auto mb-6 text-gold shadow-lg">
              <Trophy className="w-10 h-10 text-gold" />
            </div>

            <span className="text-xs font-mono uppercase tracking-widest text-gold font-bold">
              QUIZ COMPLETED
            </span>

            {/* Score reveal */}
            <h3 className="font-serif text-3xl sm:text-5xl font-bold text-cream-100 mt-2 mb-2">
              {scorePercentage}% Score
            </h3>

            <p className="text-sm font-mono text-blush-300 mb-6">
              You got {correctCount} out of {totalQuestions} correct!
            </p>

            {/* Tier feedback message */}
            <div className="glass-card p-6 rounded-2xl border border-blush-300/30 max-w-lg mx-auto mb-8">
              <h4 className="font-serif text-xl font-bold text-gold mb-2">
                {getTier().title}
              </h4>
              <p className="font-sans text-cream-200/90 text-sm leading-relaxed">
                {getTier().message}
              </p>
            </div>

            {/* Special Final Romantic Message */}
            <div className="border-t border-blush-300/20 pt-6 max-w-lg mx-auto mb-8">
              <p className="font-handwriting text-2xl text-rose-300 leading-snug">
                "Whether you score 100% or 0%, you're still my favourite person. This wasn't really a test. I just wanted to take you through our little world again. ❤️"
              </p>
            </div>

            {/* Actions: Replay & Continue */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={handleRestart}
                className="flex items-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-medium glass-card text-cream-100 hover:text-blush-300 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Replay Quiz</span>
              </button>

              <a
                href="#reasons"
                className="flex items-center gap-2 px-8 py-3 rounded-full text-xs sm:text-sm font-bold bg-gradient-to-r from-blush-400 to-gold text-midnight shadow-lg hover:scale-105 transition-all"
              >
                <span>Explore 1000 Reasons →</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
export default Quiz
