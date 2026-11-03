import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Heart, Sparkles, Star } from "lucide-react"
import { birthdayConfig } from "@/data/birthdayConfig"

interface WelcomeProps {
  onEnter: () => void
}

export const Welcome: React.FC<WelcomeProps> = ({ onEnter }) => {
  // Generate random twinkling background stars
  const [stars, setStars] = useState<Array<{ id: number; top: string; left: string; size: number; delay: number }>>([])

  useEffect(() => {
    const generated = Array.from({ length: 45 }, (_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 4,
    }))
    setStars(generated)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-midnight via-navy-dark to-midnight text-cream-100 overflow-hidden px-4"
    >
      {/* Background Starlight Field */}
      <div className="absolute inset-0 pointer-events-none">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-cream-100/80 star-twinkle"
            style={{
              top: star.top,
              left: star.left,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDelay: `${star.delay}s`,
            }}
          />
        ))}

        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-gold/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Floating Decorative Hearts */}
      <motion.div
        animate={{ y: [-15, 15, -15], rotate: [-5, 5, -5] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-16 left-12 text-rose-300/40 hidden md:block"
      >
        <Heart className="w-12 h-12 fill-rose-300/20" />
      </motion.div>
      <motion.div
        animate={{ y: [15, -15, 15], rotate: [5, -5, 5] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-20 right-16 text-blush-300/30 hidden md:block"
      >
        <Heart className="w-16 h-16 fill-blush-300/20" />
      </motion.div>
      <motion.div
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute top-28 right-28 text-gold/40 hidden sm:block"
      >
        <Star className="w-8 h-8 fill-gold/20" />
      </motion.div>

      {/* Center Welcome Card */}
      <div className="relative z-10 max-w-xl w-full text-center flex flex-col items-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono tracking-widest text-gold uppercase glass-card border-gold/30 mb-6 shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5 text-gold animate-spin" style={{ animationDuration: "8s" }} />
          <span>{birthdayConfig.welcome.badge}</span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-cream-100 leading-tight mb-4"
        >
          {birthdayConfig.welcome.title}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="font-sans text-cream-200/80 text-base sm:text-lg max-w-md mx-auto mb-10 leading-relaxed font-light"
        >
          {birthdayConfig.welcome.subtitle}
        </motion.p>

        {/* Enter Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <button
            onClick={onEnter}
            className="group relative inline-flex items-center gap-3 px-8 sm:px-10 py-4 rounded-full text-sm sm:text-base font-semibold text-midnight bg-gradient-to-r from-blush-200 via-rose-300 to-gold shadow-2xl rose-glow transition-all duration-300"
          >
            <span>{birthdayConfig.welcome.cta}</span>
            <Heart className="w-5 h-5 text-rose-600 fill-rose-600 group-hover:scale-125 transition-transform" />
          </button>
        </motion.div>

        {/* Hint */}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 1.2 }}
          className="text-xs text-cream-200/50 mt-6 font-mono"
        >
          Put on your headphones for the best experience 🎧
        </motion.span>
      </div>
    </motion.div>
  )
}
export default Welcome
