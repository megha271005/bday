import React, { useRef } from "react"
import { motion } from "framer-motion"
import { Heart, ChevronDown, Sparkles, PartyPopper, Stars, Flame } from "lucide-react"
import { birthdayConfig } from "@/data/birthdayConfig"
import confetti from "canvas-confetti"
import type { ConfettiRef } from "@/components/ui/confetti"
import { Confetti } from "@/components/ui/confetti"

export const Hero: React.FC = () => {
  const confettiRef = useRef<ConfettiRef>(null)
  const hero = birthdayConfig.hero

  const triggerFireworks = () => {
    const duration = 3.5 * 1000
    const animationEnd = Date.now() + duration
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 50 }

    const randomInRange = (min: number, max: number) =>
      Math.random() * (max - min) + min

    const interval = window.setInterval(() => {
      const timeLeft = animationEnd - Date.now()
      if (timeLeft <= 0) return clearInterval(interval)

      const particleCount = 40 * (timeLeft / duration)
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.4), y: Math.random() - 0.2 },
        colors: ["#F8DDE5", "#E8A8B8", "#D6B779", "#ffffff"]
      })
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.6, 0.9), y: Math.random() - 0.2 },
        colors: ["#F8DDE5", "#E8A8B8", "#D6B779", "#ffffff"]
      })
    }, 250)
  }

  const triggerStarShower = () => {
    const defaults = {
      spread: 360,
      ticks: 50,
      gravity: 0,
      decay: 0.94,
      startVelocity: 30,
      colors: ["#FFE400", "#FFBD00", "#E89400", "#FFCA6C", "#FDFFB8"],
    }
    const shoot = () => {
      confetti({
        ...defaults,
        particleCount: 35,
        scalar: 1.2,
        shapes: ["star"],
      })
    }
    shoot()
    setTimeout(shoot, 150)
    setTimeout(shoot, 300)
  }

  const triggerHearts = () => {
    try {
      const heart = confetti.shapeFromText({ text: "❤️", scalar: 2 })
      confetti({
        particleCount: 30,
        spread: 90,
        origin: { y: 0.7 },
        shapes: [heart],
        scalar: 1.8,
      })
    } catch {
      confetti({
        particleCount: 40,
        spread: 80,
        origin: { y: 0.7 },
        colors: ["#E8A8B8", "#F8DDE5"],
      })
    }
  }

  return (
    <section id="hero" className="relative min-h-screen pt-28 pb-16 flex flex-col justify-center items-center overflow-hidden">
      {/* Background canvas confetti component */}
      <Confetti
        ref={confettiRef}
        manualstart={true}
        className="absolute inset-0 pointer-events-none z-10 w-full h-full"
      />

      {/* Decorative Floating Hearts */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ y: [-10, 15, -10], rotate: [0, 8, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-28 left-[10%] text-blush-200/20"
        >
          <Heart className="w-20 h-20 fill-blush-200/10" />
        </motion.div>
        <motion.div
          animate={{ y: [10, -15, 10], rotate: [0, -8, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-28 right-[10%] text-gold/20"
        >
          <Heart className="w-24 h-24 fill-gold/10" />
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-20 flex flex-col items-center text-center">
        {/* Date pill */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-widest text-gold bg-midnight/80 border border-gold/30 mb-6 shadow-md"
        >
          <Sparkles className="w-3.5 h-3.5 text-gold" />
          <span>CELEBRATING {birthdayConfig.birthdayDate} • A SPECIAL DAY FOR US</span>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-cream-100 leading-tight mb-4"
        >
          {hero.title}{" "}
          <span className="bg-gradient-to-r from-blush-300 via-rose-300 to-gold bg-clip-text text-transparent">
            {hero.nameHighlight}
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="font-sans text-cream-200/80 text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-8 font-light leading-relaxed"
        >
          {hero.subtitle}
        </motion.p>

        {/* Confetti Interactive Trigger Buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-12"
        >
          <button
            onClick={triggerHearts}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium bg-gradient-to-r from-blush-400 to-rose-500 text-cream-100 shadow-lg hover:scale-105 active:scale-95 transition-all"
          >
            <Heart className="w-4 h-4 fill-cream-100" />
            <span>Shower Love 🎉</span>
          </button>

          <button
            onClick={triggerFireworks}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium glass-card border-gold/40 text-gold hover:bg-gold/10 shadow-lg hover:scale-105 active:scale-95 transition-all"
          >
            <Flame className="w-4 h-4 text-gold" />
            <span>Fireworks 🎆</span>
          </button>

          <button
            onClick={triggerStarShower}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium glass-card border-blush-300/40 text-blush-300 hover:bg-blush-300/10 shadow-lg hover:scale-105 active:scale-95 transition-all"
          >
            <Stars className="w-4 h-4 text-blush-300" />
            <span>Star Shower ✨</span>
          </button>
        </motion.div>

        {/* Large Hero Polaroid Photograph with Gold Border */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="relative w-full max-w-md sm:max-w-lg mb-12 group"
        >
          {/* Subtle back ambient glow */}
          <div className="absolute -inset-4 bg-gradient-to-r from-blush-300/20 via-rose-500/20 to-gold/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all" />

          {/* Polaroid Frame */}
          <div className="relative bg-cream-100 p-4 sm:p-5 pb-6 sm:pb-8 rounded-2xl shadow-2xl border-2 border-gold/40 transform transition-transform duration-500 group-hover:-rotate-1">
            {/* Corner Tape */}
            <div className="absolute -top-3 right-6 w-24 h-7 bg-blush-200/80 backdrop-blur-sm rotate-6 border border-dashed border-rose-300/60 shadow-sm" />

            <div className="aspect-[4/5] w-full rounded-xl overflow-hidden bg-neutral-900 relative shadow-inner">
              <img
                src={hero.heroImage}
                alt="Birthday Hero"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = hero.fallbackHeroImage
                }}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-3 left-3 bg-midnight/70 backdrop-blur-md px-3 py-1 rounded-full text-[11px] text-cream-100 border border-gold/30">
                Forever With You ❤️
              </div>
            </div>

            <div className="mt-4 text-center">
              <p className="font-handwriting text-2xl sm:text-3xl text-rose-700 font-bold">
                "The boy who stole my whole heart"
              </p>
            </div>
          </div>
        </motion.div>

        {/* Romantic Stats Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl w-full mb-12"
        >
          {hero.stats.map((stat, idx) => (
            <div
              key={idx}
              className="glass-card p-4 rounded-2xl border border-blush-300/20 text-center hover:border-gold/40 transition-colors"
            >
              <span className="text-xs uppercase tracking-wider font-mono text-blush-300 block mb-1">
                {stat.label}
              </span>
              <span className="font-serif text-lg sm:text-xl font-bold text-cream-100">
                {stat.value}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Quote */}
        <motion.blockquote
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="font-serif italic text-cream-200/70 text-sm sm:text-base max-w-xl mx-auto mb-10"
        >
          {hero.quote}
        </motion.blockquote>

        {/* Scroll Indicator */}
        <motion.a
          href="#memories"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-1 text-xs text-blush-300/80 hover:text-cream-100 transition-colors cursor-pointer"
        >
          <span>Scroll to explore our universe</span>
          <ChevronDown className="w-4 h-4" />
        </motion.a>
      </div>
    </section>
  )
}
export default Hero
