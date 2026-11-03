import React from "react"
import { motion } from "framer-motion"
import { Heart, Calendar, Sparkles, Clock } from "lucide-react"
import { birthdayConfig } from "@/data/birthdayConfig"

export const Timeline: React.FC = () => {
  const timeline = birthdayConfig.timeline

  return (
    <section id="timeline" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Background glow */}
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-gold/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-widest text-gold glass-card border-gold/30 mb-4"
        >
          <Clock className="w-3.5 h-3.5 text-gold" />
          <span>OUR LOVE STORY MILESTONES</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-serif text-3xl sm:text-5xl font-bold text-cream-100 tracking-tight mb-4"
        >
          {timeline.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-sans text-cream-200/80 text-sm sm:text-base font-light max-w-xl mx-auto"
        >
          {timeline.subtitle}
        </motion.p>
      </div>

      {/* Vertical Timeline Structure */}
      <div className="relative">
        {/* Central Glowing Line */}
        <div className="absolute left-4 md:left-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-blush-300 via-gold to-blush-500 opacity-30 transform -translate-x-1/2" />

        <div className="space-y-12 sm:space-y-16">
          {timeline.milestones.map((milestone, index) => {
            const isEven = index % 2 === 0
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative flex flex-col md:flex-row items-start ${
                  isEven ? "md:flex-row-reverse" : ""
                } gap-6 md:gap-12`}
              >
                {/* Center Node / Heart Pin */}
                <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 flex items-center justify-center z-10">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-midnight to-navy border-2 border-gold flex items-center justify-center shadow-lg group">
                    <Heart className="w-4 h-4 text-rose-400 fill-rose-400 animate-pulse" />
                  </div>
                </div>

                {/* Content Card */}
                <div className="ml-10 md:ml-0 md:w-1/2">
                  <div
                    className={`glass-panel p-6 sm:p-7 rounded-2xl border border-blush-300/20 hover:border-gold/40 transition-all shadow-xl group ${
                      isEven ? "md:mr-6" : "md:ml-6"
                    }`}
                  >
                    {/* Date Tag */}
                    <div className="flex items-center gap-2 text-xs font-mono text-gold uppercase tracking-wider mb-2">
                      <Calendar className="w-3.5 h-3.5 text-gold" />
                      <span>{milestone.date}</span>
                    </div>

                    {/* Milestone Title */}
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-cream-100 mb-3 group-hover:text-blush-200 transition-colors">
                      {milestone.title}
                    </h3>

                    {/* Milestone Image (if present) */}
                    {milestone.image && (
                      <div className="aspect-video w-full rounded-xl overflow-hidden bg-neutral-900 mb-4 border border-cream-100/10">
                        <img
                          src={milestone.image}
                          alt={milestone.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      </div>
                    )}

                    {/* Description */}
                    <p className="font-sans text-cream-200/80 text-sm leading-relaxed font-light">
                      {milestone.description}
                    </p>
                  </div>
                </div>

                {/* Empty side for layout balance on desktop */}
                <div className="hidden md:block md:w-1/2" />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
export default Timeline
