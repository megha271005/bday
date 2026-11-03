import React from "react"
import { motion } from "framer-motion"
import { SecretSection as SecretVault } from "@/components/SecretSection"
import { Lock, Sparkles } from "lucide-react"

export const SecretSection: React.FC = () => {
  return (
    <section id="secret" className="relative py-28 sm:py-36 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-navy-light/40 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-14 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-widest text-gold glass-card border-gold/30 mb-4"
        >
          <Lock className="w-3.5 h-3.5 text-gold" />
          <span>PASSWORD PROTECTED MEMORIES</span>
        </motion.div>

        <h2 className="font-serif text-3xl sm:text-5xl font-bold text-cream-100 tracking-tight mb-3">
          Some Memories Are Just Ours 🔐
        </h2>
        <p className="font-sans text-cream-200/80 text-sm sm:text-base font-light">
          A locked archive of our late-night secrets, whispered promises, and private pictures.
        </p>
      </div>

      {/* Secret Vault Component */}
      <SecretVault />
    </section>
  )
}
export default SecretSection
