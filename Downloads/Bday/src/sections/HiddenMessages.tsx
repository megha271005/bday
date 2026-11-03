import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MaskContainer } from "@/components/ui/svg-mask-effect"
import { birthdayConfig } from "@/data/birthdayConfig"
import { Sparkles, Eye, Heart, Moon, Coffee, MessageSquareHeart, X } from "lucide-react"
import confetti from "canvas-confetti"

export const HiddenMessages: React.FC = () => {
  const [activeMessage, setActiveMessage] = useState<{
    title: string
    preview: string
    message: string
  } | null>(null)

  const envelopes = birthdayConfig.hiddenSurprises

  const getIcon = (title: string) => {
    if (title.includes("Miss")) return <Heart className="w-5 h-5 text-rose-400 fill-rose-400" />
    if (title.includes("Rough") || title.includes("Day")) return <Coffee className="w-5 h-5 text-amber-400" />
    if (title.includes("Reminder")) return <Sparkles className="w-5 h-5 text-gold" />
    return <Moon className="w-5 h-5 text-purple-300" />
  }

  const handleHeartClick = (e: React.MouseEvent) => {
    try {
      const heart = confetti.shapeFromText({ text: "💖", scalar: 2 })
      confetti({
        particleCount: 20,
        spread: 60,
        origin: { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight },
        shapes: [heart],
      })
    } catch {}
  }

  return (
    <section id="hidden" className="relative py-28 sm:py-36 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-widest text-gold glass-card border-gold/30 mb-4"
        >
          <Eye className="w-3.5 h-3.5 text-gold" />
          <span>SECRET NOTES & WHISPERS</span>
        </motion.div>

        <h2 className="font-serif text-3xl sm:text-5xl font-bold text-cream-100 tracking-tight mb-3">
          Whispers Hidden in the Dark ✨
        </h2>
        <p className="font-sans text-cream-200/80 text-sm sm:text-base font-light">
          Hover your cursor across the starry veil to illuminate secret messages, or open a sealed letter for when you need me most.
        </p>
      </div>

      {/* SVG Mask Flashlight Effect */}
<div className="rounded-3xl overflow-hidden border border-rose-300/30 shadow-2xl mb-16 relative">

  <div className="min-h-[380px] sm:min-h-[450px] w-full relative">

    <MaskContainer
      size={40}
      revealSize={450}
      className="h-full min-h-[380px] sm:min-h-[450px] bg-[#17101f] text-white"
      revealText={
        <div className="text-center px-5 max-w-2xl mx-auto">
          <span className="text-xs font-mono uppercase tracking-widest text-rose-600 block mb-4 font-bold">
            ✦ MOVE YOUR CURSOR / TOUCH TO ILLUMINATE ✦
          </span>

          <p className="font-serif text-xl sm:text-3xl text-[#3b2638] font-semibold leading-relaxed">
            In a universe of billions of galaxies and infinite stars,
            somehow my favourite place is still right beside you.
          </p>
        </div>
      }
    >
      <div className="text-center px-5 max-w-2xl mx-auto space-y-4">

        <span className="text-xs font-mono uppercase tracking-widest text-rose-300 font-bold">
          MY DEEPEST TRUTH ✨
        </span>

        <p className="font-serif text-xl sm:text-3xl text-white font-bold leading-snug">
          I would cross every dimension and every lifetime just to find you,
          choose you, and hear your laugh all over again.
        </p>

        <p className="font-serif text-lg sm:text-2xl text-rose-200 italic">
          You are my forever favourite person. ❤️
        </p>

      </div>
    </MaskContainer>

  </div>
</div>

{/* Complete Message - Always Readable */}
<div className="max-w-3xl mx-auto mb-16">
  <div className="bg-[#fff7f8] rounded-3xl p-7 sm:p-10 border border-rose-200 shadow-xl text-center">

    <span className="text-xs uppercase tracking-[0.25em] text-rose-500 font-bold">
      A LITTLE SECRET FROM MY HEART
    </span>

    <h3 className="font-serif text-2xl sm:text-3xl text-rose-600 font-bold mt-4 mb-5">
      If I Could Choose Again...
    </h3>

    <p className="font-serif text-lg sm:text-xl text-[#573d4b] leading-relaxed">
      I would still choose you. In every universe, every lifetime,
      and every version of my story. I would find my way back to you,
      fall in love with your little habits, laugh at your silly jokes,
      hold your hand through difficult days, and create a million more
      memories together.
    </p>

    <p className="font-serif text-xl sm:text-2xl text-rose-600 font-bold mt-6">
      In every lifetime, it will always be you. ❤️
    </p>

  </div>
</div>

      {/* Floating Clickable Secret Heart Burst */}
      <div className="mt-12 text-center">
        <button
          onClick={handleHeartClick}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-medium glass-card border-blush-300/30 text-cream-100 hover:text-blush-300 transition-all shadow-md group"
        >
          <Heart className="w-4 h-4 text-rose-400 group-hover:scale-125 transition-transform" />
          <span>Click here for a burst of love ❤️</span>
        </button>
      </div>

      {/* Open When Modal Dialog */}
      <AnimatePresence>
        {activeMessage && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-midnight/90 backdrop-blur-md animate-in fade-in duration-200"
            onClick={() => setActiveMessage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-lg w-full bg-[#FFFBF5] text-neutral-800 rounded-3xl p-6 sm:p-10 shadow-2xl border-2 border-gold/40"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveMessage(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-neutral-200 text-neutral-700 hover:bg-neutral-300 transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-full bg-rose-100 text-rose-600">
                  {getIcon(activeMessage.title)}
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 font-bold">
                    PERSONAL LETTER FOR YOU
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-neutral-900">
                    {activeMessage.title}
                  </h3>
                </div>
              </div>

              <div className="font-serif text-base sm:text-lg text-neutral-800 leading-relaxed my-4 pt-4 border-t border-rose-200/80">
                {activeMessage.message}
              </div>

              <div className="mt-6 pt-4 border-t border-rose-200/80 flex justify-between items-center text-xs text-neutral-500 font-sans">
                <span className="font-handwriting text-2xl text-rose-600">
                  Always here for you ❤️
                </span>
                <button
                  onClick={() => setActiveMessage(null)}
                  className="px-4 py-1.5 rounded-full bg-rose-600 text-cream-100 text-xs font-semibold hover:bg-rose-700 transition-colors"
                >
                  Close Letter
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}
export default HiddenMessages
