import React from "react"
import { motion } from "framer-motion"
import { Envelope } from "@/components/Envelope"
import { Mail, Sparkles } from "lucide-react"

export const BirthdayLetter: React.FC = () => {
  return (
    <section id="letter" className="relative py-28 sm:py-36 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-14 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-widest text-gold glass-card border-gold/30 mb-4"
        >
          <Mail className="w-3.5 h-3.5 text-gold" />
          <span>A LETTER FROM MY HEART</span>
        </motion.div>

        <h2 className="font-serif text-3xl sm:text-5xl font-bold text-cream-100 tracking-tight mb-3">
          To The One Who Holds My World ❤️
        </h2>
        <p className="font-sans text-cream-200/80 text-sm sm:text-base font-light">
          A sealed letter waiting just for you. Break the wax seal when you're ready to read my heart.
        </p>
      </div>

      {/* Interactive Envelope */}
      <Envelope />
    </section>
  )
}
export default BirthdayLetter
