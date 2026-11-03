import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles, Heart, Cake, Flame, RotateCcw } from "lucide-react"
import { birthdayConfig } from "@/data/birthdayConfig"
import confetti from "canvas-confetti"

export const FinalSurprise: React.FC = () => {
  const [isRevealed, setIsRevealed] = useState(false)
  const [candlesLit, setCandlesLit] = useState(true)

  const surprise = birthdayConfig.finalSurprise

  const handleReveal = () => {
    setCandlesLit(false)
    setIsRevealed(true)

    // Side Cannons and Star Shower Confetti Explosion
    const end = Date.now() + 4 * 1000
    const colors = ["#F8DDE5", "#E8A8B8", "#D6B779", "#ffffff", "#ff758c"]

    const frame = () => {
      if (Date.now() > end) return
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        startVelocity: 65,
        origin: { x: 0, y: 0.6 },
        colors: colors,
      })
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        startVelocity: 65,
        origin: { x: 1, y: 0.6 },
        colors: colors,
      })
      requestAnimationFrame(frame)
    }
    frame()

    // Hearts & Stars in the center
    try {
      const heart = confetti.shapeFromText({ text: "❤️", scalar: 2.2 })
      confetti({
        particleCount: 40,
        spread: 100,
        origin: { y: 0.4 },
        shapes: [heart],
        scalar: 1.8,
      })
    } catch {}
  }

  const handleReset = () => {
    setIsRevealed(false)
    setCandlesLit(true)
  }

  return (
    <section id="surprise" className="relative py-28 sm:py-36 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
      {/* Background radial ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-rose-500/10 via-gold/15 to-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      <AnimatePresence mode="wait">
        {!isRevealed ? (
          /* Initial Teaser State */
          <motion.div
            key="teaser"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="glass-panel p-8 sm:p-14 rounded-3xl border border-blush-300/30 max-w-2xl mx-auto shadow-2xl relative"
          >
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-blush-400/20 to-gold/20 border border-gold/40 flex items-center justify-center mx-auto mb-6 text-gold shadow-md">
              <Sparkles className="w-10 h-10 animate-spin" style={{ animationDuration: "10s" }} />
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-cream-100 mb-4 leading-tight">
              {surprise.teaser}
            </h2>

            <p className="font-sans text-cream-200/80 text-sm sm:text-base font-light mb-8 max-w-md mx-auto">
              Before we blow out the candles, close your eyes, make the deepest wish in your heart, and tap below.
            </p>

            {/* Interactive Birthday Cake Illustration */}
            <div className="my-8 flex flex-col items-center justify-center">
              {/* Candles */}
              <div className="flex items-center gap-4 mb-2">
                {[1, 2, 3].map((candle) => (
                  <div key={candle} className="flex flex-col items-center">
                    {/* Flame */}
                    <div className="relative">
                      <div className="w-3.5 h-5 bg-gradient-to-t from-amber-500 via-yellow-300 to-white rounded-full animate-pulse shadow-lg shadow-amber-400/50" />
                    </div>
                    {/* Candle stick */}
                    <div className="w-2.5 h-8 bg-gradient-to-b from-blush-200 to-rose-400 rounded-sm" />
                  </div>
                ))}
              </div>

              {/* Cake Layers */}
              <div className="w-48 h-12 bg-gradient-to-r from-rose-300 via-cream-100 to-blush-300 rounded-t-2xl border-2 border-gold/40 shadow-inner flex items-center justify-center">
                <span className="text-[10px] font-mono tracking-wider text-rose-800 font-bold uppercase">
                  MAKE A WISH
                </span>
              </div>
              <div className="w-64 h-16 bg-gradient-to-r from-navy via-navy-light to-navy rounded-b-2xl border-x-2 border-b-2 border-gold/40 shadow-2xl flex items-center justify-center">
                <Heart className="w-5 h-5 text-rose-400 fill-rose-400" />
              </div>
            </div>

            <button
              onClick={handleReveal}
              className="px-8 sm:px-10 py-4 rounded-full text-sm sm:text-base font-bold text-midnight bg-gradient-to-r from-blush-300 via-rose-300 to-gold shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2 mx-auto rose-glow"
            >
              <Cake className="w-5 h-5" />
              <span>{surprise.buttonText}</span>
            </button>
          </motion.div>
        ) : (
          /* Revealed Surprise State */
          <motion.div
            key="revealed"
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="glass-panel p-8 sm:p-14 rounded-3xl border-2 border-gold/50 shadow-2xl relative overflow-hidden"
          >
            {/* Ambient Hearts in Background */}
            <div className="absolute top-4 right-6 text-rose-400/30">
              <Heart className="w-16 h-16 fill-rose-400/20" />
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-widest text-gold bg-gold/10 border border-gold/30 mb-6">
              <Sparkles className="w-3.5 h-3.5 text-gold" />
              <span>HAPPY BIRTHDAY, MY LOVE</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold text-cream-100 mb-6 leading-tight max-w-3xl mx-auto">
              {surprise.revealedTitle}
            </h2>

            {/* Large Romantic Photograph with Polaroid Frame */}
            <div className="relative max-w-md mx-auto my-8 bg-cream-100 p-4 sm:p-5 pb-6 sm:pb-8 rounded-2xl shadow-2xl border-2 border-gold/40 transform -rotate-1 hover:rotate-0 transition-transform duration-300">
              <div className="aspect-[4/3] rounded-xl overflow-hidden bg-neutral-900 shadow-inner">
                <img
                  src={birthdayConfig.hero.heroImage}
                  alt="Forever Us"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = birthdayConfig.hero.fallbackHeroImage
                  }}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="mt-4 font-handwriting text-2xl sm:text-3xl text-rose-700 font-bold">
                "Forever & Always In Our Little Universe"
              </p>
            </div>

            {/* Emotional Paragraph */}
            <p className="font-serif text-base sm:text-xl text-cream-200/90 max-w-2xl mx-auto leading-relaxed mb-8">
              {surprise.revealedParagraph}
            </p>

            <div className="font-handwriting text-3xl sm:text-4xl text-rose-400 mb-8 font-bold">
              {surprise.closingWish}
            </div>

            {/* Reset Button */}
            <div className="flex justify-center gap-4">
              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-medium glass-card text-cream-200 hover:text-cream-100 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Experience Again</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
export default FinalSurprise
