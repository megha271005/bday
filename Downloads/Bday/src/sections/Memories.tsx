import React from "react"
import { motion } from "framer-motion"
import { PhotoGallery } from "@/components/PhotoGallery"
import { birthdayConfig } from "@/data/birthdayConfig"
import { Camera, Sparkles } from "lucide-react"

export const Memories: React.FC = () => {
  const gallery = birthdayConfig.gallery

  return (
    <section id="memories" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Background soft ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-widest text-gold glass-card border-gold/30 mb-4"
        >
          <Camera className="w-3.5 h-3.5 text-gold" />
          <span>OUR MEMORY GALLERY</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-serif text-3xl sm:text-5xl font-bold text-cream-100 tracking-tight mb-4"
        >
          {gallery.sectionTitle}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-sans text-cream-200/80 text-sm sm:text-base font-light max-w-xl mx-auto"
        >
          {gallery.sectionSubtitle}
        </motion.p>
      </div>

      {/* Photo Gallery Component */}
      <PhotoGallery />
    </section>
  )
}
export default Memories
