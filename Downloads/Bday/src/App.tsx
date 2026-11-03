import React, { useState } from "react"
import { AnimatePresence } from "framer-motion"
import { Welcome } from "@/sections/Welcome"
import { Hero } from "@/sections/Hero"
import { Memories } from "@/sections/Memories"
import { Timeline } from "@/sections/Timeline"
import { Quiz } from "@/sections/Quiz"
import { LoveReasons } from "@/sections/LoveReasons"
import { BirthdayLetter } from "@/sections/BirthdayLetter"
import { SecretSection } from "@/sections/SecretSection"
import { HiddenMessages } from "@/sections/HiddenMessages"
import { FinalSurprise } from "@/sections/FinalSurprise"
import { Navbar } from "@/components/Navbar"
import { MusicPlayer } from "@/components/MusicPlayer"
import { birthdayConfig } from "@/data/birthdayConfig"
import { Heart, Sparkles } from "lucide-react"

export function App() {
  const [hasEntered, setHasEntered] = useState(false)

  return (
    <div className="min-h-screen bg-midnight text-cream-100 font-sans relative selection:bg-rose-400 selection:text-midnight">
      {/* Background Starry Ambient Glows */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-rose-500/5 rounded-full blur-[140px]" />
        <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-navy-light/40 rounded-full blur-[160px]" />
        <div className="absolute bottom-1/4 left-1/3 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[150px]" />
      </div>

      <AnimatePresence>
        {!hasEntered && (
          <Welcome onEnter={() => setHasEntered(true)} />
        )}
      </AnimatePresence>

      {/* Main Experience when entered */}
      {hasEntered && (
        <div className="relative z-10 animate-in fade-in duration-700">
          {/* Floating Navigation */}
          <Navbar />

          {/* Floating Music Player */}
          <MusicPlayer />

          {/* Website Sections */}
          <main className="space-y-12">
            <Hero />
            <Memories />
            <Timeline />
            <Quiz />
            <LoveReasons />
            <BirthdayLetter />
            <SecretSection />
            <HiddenMessages />
            <FinalSurprise />
          </main>

          {/* Romantic Footer */}
          <footer className="py-16 text-center border-t border-blush-300/10 relative z-10 glass-panel mt-20">
            <div className="max-w-xl mx-auto px-4 space-y-3">
              <div className="flex items-center justify-center gap-1.5 text-blush-300">
                <span>Crafted with infinite love for</span>
                <span className="font-serif font-bold text-cream-100">{birthdayConfig.boyfriendName}</span>
                <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
              </div>
              <p className="font-handwriting text-2xl text-rose-300">
                "Our Little Universe • Forever & Always"
              </p>
            </div>
          </footer>
        </div>
      )}
    </div>
  )
}
export default App
