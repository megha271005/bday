import React, { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles, Heart, Shuffle, ChevronRight, Play, RotateCcw, ListFilter } from "lucide-react"
import { loveReasons } from "@/data/loveReasons"
import confetti from "canvas-confetti"

export const LoveReasons: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [rotationAngle, setRotationAngle] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const [showFinalMessage, setShowFinalMessage] = useState(false)

  const autoPlayRef = useRef<number | null>(null)

  // Categories
  const categories = ["All", "Smile & Presence", "Personality", "Little Habits", "How You Treat Me", "How You Make Me Feel", "Our Memories", "Admiration & Forever"]

  const filteredReasons = selectedCategory === "All"
    ? loveReasons
    : loveReasons.filter((r) => r.category === selectedCategory)

  const activeReason = filteredReasons[currentIndex % filteredReasons.length] || loveReasons[0]

  // Next reason
  const handleNext = () => {
    setCurrentIndex((prev) => {
      const next = (prev + 1) % filteredReasons.length
      if (next === 0 && prev > 10) {
        setShowFinalMessage(true)
      }
      return next
    })
    setRotationAngle((prev) => prev - 24)
  }

  // Surprise / Random reason
  const handleSurprise = () => {
    const randomIndex = Math.floor(Math.random() * filteredReasons.length)
    setCurrentIndex(randomIndex)
    setRotationAngle((prev) => prev + (Math.random() * 60 - 30))
    try {
      confetti({
        particleCount: 20,
        spread: 60,
        origin: { y: 0.6 },
        colors: ["#D6B779", "#E8A8B8"],
      })
    } catch {}
  }

  // Autoplay toggle
  const toggleAutoplay = () => {
    setIsAutoPlaying(!isAutoPlaying)
  }

  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = window.setInterval(() => {
        handleNext()
      }, 3500)
    } else if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current)
    }
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current)
    }
  }, [isAutoPlaying, filteredReasons.length])

  // Radial slice of reasons for the circular ring (show 16 reasons orbiting)
  const ringReasons = loveReasons.slice(0, 18)

  return (
    <section id="reasons" className="relative py-28 sm:py-36 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Deep midnight purple and black gradient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-purple-900/15 via-rose-500/10 to-gold/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-widest text-gold glass-card border-gold/30 mb-4"
        >
          <Sparkles className="w-3.5 h-3.5 text-gold" />
          <span>1000 REASONS TO LOVE YOU</span>
        </motion.div>

        <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold text-cream-100 tracking-tight mb-3">
          Thousands of Reasons to Love You...
        </h2>
        <p className="font-handwriting text-2xl sm:text-3xl text-rose-300">
          But here are a few. ❤️
        </p>
      </div>

      {/* Category Pills Filter */}
      <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar max-w-4xl mx-auto z-20 relative">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat)
              setCurrentIndex(0)
            }}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? "bg-blush-300 text-midnight font-bold shadow-md"
                : "glass-card text-cream-200/70 hover:text-cream-100"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Large Circular Radial Typography Display */}
      <div className="relative w-full max-w-3xl mx-auto aspect-square flex items-center justify-center my-4">
        {/* Concentric Decorative Rings */}
        <div className="absolute inset-4 sm:inset-8 rounded-full border border-gold/20 pointer-events-none" />
        <div className="absolute inset-12 sm:inset-16 rounded-full border border-blush-300/15 border-dashed pointer-events-none animate-spin" style={{ animationDuration: "120s" }} />
        <div className="absolute inset-20 sm:inset-28 rounded-full border border-purple-500/20 pointer-events-none" />

        {/* Orbiting SVG Text Ring */}
        <div
          className="absolute inset-0 w-full h-full pointer-events-none transition-transform duration-700 ease-out"
          style={{ transform: `rotate(${rotationAngle}deg)` }}
        >
          <svg viewBox="0 0 600 600" className="w-full h-full">
            <defs>
              <path
                id="textRingOuter"
                d="M 300, 300 m -240, 0 a 240,240 0 1,1 480,0 a 240,240 0 1,1 -480,0"
              />
              <path
                id="textRingMiddle"
                d="M 300, 300 m -190, 0 a 190,190 0 1,1 380,0 a 190,190 0 1,1 -380,0"
              />
            </defs>

            {/* Outer Circular Text */}
            <text fill="#D6B779" opacity="0.65" fontSize="9" letterSpacing="4px" fontFamily="Plus Jakarta Sans">
              <textPath href="#textRingOuter" startOffset="0%">
                ★ YOUR SMILE • YOUR LAUGHTER • YOUR HEART • MY SAFE HAVEN • INFINITE LOVE • FOREVER & ALWAYS ★
              </textPath>
            </text>

            {/* Middle Circular Text */}
            <text fill="#E8A8B8" opacity="0.5" fontSize="8" letterSpacing="3px" fontFamily="Plus Jakarta Sans">
              <textPath href="#textRingMiddle" startOffset="50%">
                ♥ IN EVERY LIFETIME I WOULD CHOOSE YOU ♥ THE BEST PART OF MY WORLD ♥ FOREVER YOURS ♥
              </textPath>
            </text>
          </svg>
        </div>

        {/* Orbiting Floating Message Nodes */}
        <div
          className="absolute inset-0 w-full h-full pointer-events-none transition-transform duration-700 ease-out"
          style={{ transform: `rotate(${rotationAngle}deg)` }}
        >
          {ringReasons.map((reason, idx) => {
            const angle = (idx / ringReasons.length) * 2 * Math.PI
            const radius = 240 // px in 600 scale
            // Percentage from center
            const x = 50 + 40 * Math.cos(angle)
            const y = 50 + 40 * Math.sin(angle)
            const isCurrent = reason.id === activeReason.id

            return (
              <div
                key={reason.id}
                style={{ top: `${y}%`, left: `${x}%` }}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto cursor-pointer transition-all ${
                  isCurrent ? "scale-125 z-20" : "opacity-40 hover:opacity-100 hover:scale-110"
                }`}
                onClick={() => {
                  const targetIdx = filteredReasons.findIndex((r) => r.id === reason.id)
                  if (targetIdx !== -1) setCurrentIndex(targetIdx)
                }}
              >
                <div
                  className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full flex items-center justify-center ${
                    isCurrent
                      ? "bg-rose-400 ring-4 ring-rose-400/40 shadow-lg shadow-rose-400/50"
                      : "bg-gold/60 border border-gold"
                  }`}
                  title={reason.text}
                />
              </div>
            )
          })}
        </div>

        {/* Central Interactive Display Card */}
        <div className="relative z-10 w-72 sm:w-96 aspect-square rounded-full bg-midnight/95 backdrop-blur-xl border-2 border-gold/40 shadow-2xl flex flex-col items-center justify-center p-6 text-center rose-glow">
          {/* Top Label */}
          <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-gold font-bold mb-1">
            THOUSANDS OF REASONS
          </span>

          {/* Reason Number */}
          <span className="text-xs font-mono text-blush-300 font-semibold mb-3">
            Reason No. {String(activeReason.id).padStart(3, "0")} / {loveReasons.length}
          </span>

          {/* Animated Central Message */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeReason.id}
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -10 }}
              transition={{ duration: 0.35 }}
              className="px-2"
            >
              <p className="font-serif text-base sm:text-lg md:text-xl font-bold text-cream-100 leading-snug">
                "{activeReason.text}"
              </p>
              <span className="inline-block mt-3 px-2.5 py-0.5 rounded-full text-[10px] font-mono text-gold bg-gold/10 border border-gold/20">
                {activeReason.category}
              </span>
            </motion.div>
          </AnimatePresence>

          {/* Pulsing Center Heart */}
          <div className="mt-4">
            <Heart className="w-5 h-5 text-rose-500 fill-rose-500 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3 mt-6 z-20 relative">
        <button
          onClick={handleNext}
          className="flex items-center gap-2 px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold bg-gradient-to-r from-blush-400 to-rose-500 text-cream-100 shadow-lg hover:scale-105 active:scale-95 transition-all"
        >
          <span>Discover Another Reason</span>
          <ChevronRight className="w-4 h-4" />
        </button>

        <button
          onClick={handleSurprise}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium glass-card border-gold/40 text-gold hover:bg-gold/10 shadow-lg hover:scale-105 active:scale-95 transition-all"
        >
          <Shuffle className="w-4 h-4" />
          <span>Surprise Me</span>
        </button>

        <button
          onClick={toggleAutoplay}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all ${
            isAutoPlaying
              ? "bg-gold text-midnight font-bold shadow-lg"
              : "glass-card text-cream-200/80 hover:text-cream-100"
          }`}
        >
          <Play className={`w-3.5 h-3.5 ${isAutoPlaying ? "animate-pulse" : ""}`} />
          <span>{isAutoPlaying ? "Playing Story..." : "Explore All Reasons"}</span>
        </button>

        <button
          onClick={() => setShowFinalMessage(true)}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-medium glass-card text-blush-300 hover:text-cream-100 transition-colors"
        >
          <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
          <span>Final Wish</span>
        </button>
      </div>

      {/* Final Love Note Modal / Reveal */}
      {showFinalMessage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-midnight/90 backdrop-blur-md animate-in fade-in duration-300"
          onClick={() => setShowFinalMessage(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="max-w-xl w-full bg-gradient-to-b from-navy via-midnight to-navy border-2 border-gold/50 rounded-3xl p-8 sm:p-12 text-center shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-rose-500/30 to-gold/30 border border-gold/50 flex items-center justify-center mx-auto mb-6 text-rose-400">
              <Heart className="w-10 h-10 fill-rose-400 animate-bounce" />
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-cream-100 mb-4 leading-snug">
              Even after all these reasons...
            </h3>

            <p className="font-serif italic text-cream-200/90 text-base sm:text-lg mb-6 leading-relaxed">
              "I still haven't found enough words in any language to explain how deeply and unconditionally I love you."
            </p>

            <div className="glass-card p-4 rounded-2xl border border-blush-300/30 mb-8">
              <p className="font-handwriting text-2xl sm:text-3xl text-rose-300 font-bold">
                "If I had a thousand lifetimes, I'd still choose you in every single one. ❤️"
              </p>
            </div>

            <button
              onClick={() => setShowFinalMessage(false)}
              className="px-8 py-3 rounded-full text-xs sm:text-sm font-bold bg-gradient-to-r from-blush-400 to-gold text-midnight hover:scale-105 transition-all shadow-lg"
            >
              Forever With You ❤️
            </button>
          </motion.div>
        </div>
      )}
    </section>
  )
}
export default LoveReasons
