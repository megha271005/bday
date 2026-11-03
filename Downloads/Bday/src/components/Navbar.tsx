import React, { useState, useEffect } from "react"
import { Heart, Menu, X, Sparkles } from "lucide-react"
import confetti from "canvas-confetti"

interface NavbarProps {
  onHeartBurst?: () => void
}

export const Navbar: React.FC<NavbarProps> = ({ onHeartBurst }) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")

  const navLinks = [
    { label: "Us", href: "#hero" },
    { label: "Memories", href: "#memories" },
    { label: "Our Story", href: "#timeline" },
    { label: "Our Quiz 🎮", href: "#quiz" },
    { label: "1000 Reasons ❤️", href: "#reasons" },
    { label: "Letter 💌", href: "#letter" },
    { label: "Secret 🔐", href: "#secret" },
    { label: "Whispers ✨", href: "#hidden" },
    { label: "Surprise 🎂", href: "#surprise" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40)

      // Section tracking for active pill
      const sections = navLinks.map((link) => link.href.substring(1))
      for (const sectionId of sections.reverse()) {
        const el = document.getElementById(sectionId)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 200) {
            setActiveSection(sectionId)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const triggerHeartBurst = (e: React.MouseEvent) => {
    e.preventDefault()
    if (onHeartBurst) onHeartBurst()

    // Confetti heart burst using canvas-confetti
    try {
      const heart = confetti.shapeFromText({ text: "❤️", scalar: 2 })
      const sparkle = confetti.shapeFromText({ text: "✨", scalar: 1.5 })
      confetti({
        particleCount: 25,
        spread: 80,
        origin: { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight },
        shapes: [heart, sparkle],
        scalar: 1.5,
      })
    } catch {
      confetti({
        particleCount: 30,
        spread: 70,
        origin: { x: 0.5, y: 0.2 },
        colors: ["#F8DDE5", "#E8A8B8", "#D6B779"],
      })
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "glass-panel py-3 shadow-lg border-b border-blush-300/20"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand / Logo */}
        <a
          href="#hero"
          className="flex items-center gap-2 group text-cream-100 hover:text-blush-300 transition-colors"
        >
          <span className="p-1.5 rounded-full bg-blush-300/10 border border-blush-300/30 group-hover:scale-110 transition-transform">
            <Heart className="w-4 h-4 text-blush-300 fill-blush-300" />
          </span>
          <span className="font-serif text-lg sm:text-xl font-medium tracking-wide">
            A Little Universe <span className="font-handwriting text-blush-300 text-xl font-bold">Called Us</span>
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 glass-card px-3 py-1.5 rounded-full border border-blush-300/20">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1)
            return (
              <a
                key={link.href}
                href={link.href}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  isActive
                    ? "bg-blush-300/20 text-cream-100 border border-blush-300/40 shadow-sm"
                    : "text-cream-200/70 hover:text-cream-100 hover:bg-white/5"
                }`}
              >
                {link.label}
              </a>
            )
          })}
        </nav>

        {/* Heart Burst & Mobile Toggle */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={triggerHeartBurst}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-gradient-to-r from-blush-300/20 to-gold/20 border border-blush-300/30 text-cream-100 hover:scale-105 active:scale-95 transition-all shadow-sm"
            title="Send love"
          >
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span className="hidden sm:inline">Send Love</span>
            <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl glass-card text-cream-100 hover:text-blush-300 transition-colors"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden glass-panel border-b border-blush-300/20 px-6 py-4 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-sm text-cream-100 hover:bg-blush-300/10 hover:text-blush-300 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
export default Navbar
