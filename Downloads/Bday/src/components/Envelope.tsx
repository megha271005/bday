import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, Sparkles, RotateCcw } from "lucide-react"
import { birthdayConfig } from "@/data/birthdayConfig"

export const Envelope: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const letter = birthdayConfig.letter

  return (
    <div className="relative w-full max-w-3xl mx-auto flex flex-col items-center">
      {/* Envelope Container */}
      <div className="relative w-full flex flex-col items-center justify-center min-h-[460px]">
        {/* Floating sparkles and hearts */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            animate={{ y: [-10, 10, -10], opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-4 left-6 text-blush-300"
          >
            <Sparkles className="w-5 h-5 text-gold" />
          </motion.div>
          <motion.div
            animate={{ y: [10, -15, 10], opacity: [0.2, 0.8, 0.2] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-8 right-8 text-rose-300"
          >
            <Heart className="w-5 h-5 fill-rose-300" />
          </motion.div>
        </div>

        <AnimatePresence mode="wait">
          {!isOpen ? (
            /* Closed Envelope View */
            <motion.div
              key="closed"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="relative w-full max-w-md sm:max-w-lg aspect-[4/3] rounded-2xl shadow-2xl overflow-hidden cursor-pointer group"
              onClick={() => setIsOpen(true)}
            >
              {/* Envelope Body */}
              <div className="w-full h-full bg-gradient-to-br from-[#f8dde5] via-[#faeee1] to-[#e8a8b8] p-6 flex flex-col justify-between border-2 border-gold/40 shadow-2xl relative">
                {/* Stamp & Airmail markings */}
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <span className="inline-block px-2.5 py-0.5 rounded text-[10px] tracking-widest font-mono bg-midnight text-cream-100 uppercase">
                      SPECIAL DELIVERY
                    </span>
                    <p className="text-xs font-handwriting text-neutral-600 text-lg">
                      To the love of my life
                    </p>
                  </div>
                  {/* Decorative Vintage Stamp */}
                  <div className="w-14 h-16 border-2 border-dashed border-rose-400 bg-cream-50 p-1 flex flex-col items-center justify-center text-center shadow-sm -rotate-3">
                    <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
                    <span className="text-[9px] font-mono text-neutral-500 uppercase mt-0.5 font-bold">
                      LOVE POST
                    </span>
                  </div>
                </div>

                {/* Envelope Flap Lines */}
                <div className="absolute inset-0 pointer-events-none">
                  {/* Top triangular fold line */}
                  <div
                    className="absolute top-0 left-0 right-0 h-1/2 border-b-2 border-rose-300/40"
                    style={{
                      clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                      background: "linear-gradient(to bottom, rgba(232, 168, 184, 0.4), rgba(214, 183, 121, 0.2))"
                    }}
                  />
                </div>

                {/* Central Heart Wax Seal */}
                <div className="relative z-10 flex flex-col items-center justify-center my-auto">
                  <motion.div
                    whileHover={{ scale: 1.12, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-20 h-20 rounded-full bg-gradient-to-tr from-rose-700 via-rose-600 to-rose-500 text-cream-100 flex flex-col items-center justify-center shadow-2xl border-4 border-rose-800/80 cursor-pointer group-hover:shadow-rose-500/50"
                  >
                    <Heart className="w-7 h-7 fill-cream-100 drop-shadow" />
                    <span className="text-[9px] tracking-wider font-serif font-bold uppercase mt-0.5 text-cream-200">
                      {letter.waxSealText}
                    </span>
                  </motion.div>
                  <p className="mt-3 text-xs font-medium text-neutral-700 font-sans tracking-wide bg-cream-100/80 px-3 py-1 rounded-full shadow-sm group-hover:text-rose-700 transition-colors">
                    Click wax seal to open ❤️
                  </p>
                </div>

                {/* Footer note */}
                <div className="text-center text-neutral-600 text-xs font-serif italic">
                  Handle with utmost care • Fragile Heart Inside
                </div>
              </div>
            </motion.div>
          ) : (
            /* Open Letter View */
            <motion.div
              key="opened"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative w-full bg-[#FFFBF5] text-neutral-800 rounded-2xl shadow-2xl border border-gold/40 p-6 sm:p-10 md:p-12 overflow-hidden"
            >
              {/* Vintage Stationary Header */}
              <div className="border-b border-rose-200/80 pb-6 mb-6 flex flex-wrap justify-between items-center gap-4">
                <div>
                  <span className="text-xs uppercase font-mono tracking-widest text-gold-dark font-semibold">
                    {letter.stampDate}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-neutral-900 mt-0.5">
                    {letter.greeting}
                  </h3>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Fold Letter</span>
                </button>
              </div>

              {/* Letter Paragraphs */}
              <div className="space-y-4 font-serif text-neutral-800 text-base sm:text-lg leading-relaxed">
                {letter.body.map((paragraph, index) => {
                  const isHeading =
                  /^[1-5]\./.test(paragraph) ||
                  paragraph.startsWith("Happy Birthday, my favourite human.");

                  return (
                    <motion.p
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index, duration: 0.4 }}
                      className={
                        isHeading
                          ? "text-3xl sm:text-4xl md:text-5xl font-bold text-rose-500 leading-tight mt-8 mb-3"
                          : "text-base sm:text-lg text-neutral-800 leading-relaxed"
                      }
                    >
                      {paragraph}
                    </motion.p>
                  );
                })}
              </div>

              {/* Sign-off & Signature */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-8 pt-6 border-t border-rose-200/80 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4"
              >
                <div>
                  <p className="text-sm font-sans text-neutral-600 italic">
                    {letter.closing}
                  </p>
                  <p className="font-handwriting text-3xl sm:text-4xl text-rose-600 mt-1 font-bold">
                    {letter.signature}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
                  <Sparkles className="w-3.5 h-3.5 text-gold" />
                  <span>Delivered to your heart with infinite love</span>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
export default Envelope
