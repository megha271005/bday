import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Lock, Unlock, KeyRound, Sparkles, ShieldCheck, Heart, AlertCircle } from "lucide-react"
import { DateWheelPicker } from "@/components/ui/date-wheel-picker"
import { birthdayConfig } from "@/data/birthdayConfig"
import confetti from "canvas-confetti"

export const SecretSection: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date(2024, 0, 1))
  const [passcode, setPasscode] = useState("")
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")
  const [inputMode, setInputMode] = useState<"wheel" | "text">("wheel")

  const targetDate = birthdayConfig.secretDate
  const targetPasscode = birthdayConfig.secretPasscode

  // Load unlocked state from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("bday_vault_unlocked")
      if (saved === "true") {
        setIsUnlocked(true)
      }
    } catch {
      // Local storage disabled or error
    }
  }, [])

  const triggerUnlockCelebration = () => {
    try {
      localStorage.setItem("bday_vault_unlocked", "true")
    } catch {}
    setIsUnlocked(true)
    setErrorMsg("")

    // Confetti celebration
    confetti({
      particleCount: 80,
      spread: 100,
      origin: { y: 0.6 },
      colors: ["#D6B779", "#E8A8B8", "#FFF8F0"],
    })
  }

  // Check whether the selected date matches the anniversary date
  const isDateMatch = (selected: Date) => {
    const selDay = selected.getDate()
    const selMonth = selected.getMonth() // 0 = Jan, 1 = Feb, 2 = Mar...
    const selYear = selected.getFullYear()

    // 1. Direct formatted string comparison (e.g. "March 25, 2024")
    if (birthdayConfig.anniversaryDate?.formatted) {
      const parsed = new Date(birthdayConfig.anniversaryDate.formatted)
      if (!isNaN(parsed.getTime())) {
        if (
          parsed.getDate() === selDay &&
          parsed.getMonth() === selMonth &&
          parsed.getFullYear() === selYear
        ) {
          return true
        }
      }
    }

    // 2. Anniversary date object (support both 0-indexed and 1-indexed month)
    const anniv = birthdayConfig.anniversaryDate
    if (anniv) {
      const dayMatches = Number(anniv.day) === selDay
      const yearMatches = Number(anniv.year) === selYear
      const monthMatches =
        Number(anniv.month) === selMonth || // 0-indexed (e.g. 2 == 2 for March)
        Number(anniv.month) === selMonth + 1 // 1-indexed (e.g. 3 == 2 + 1 for March)
      if (dayMatches && yearMatches && monthMatches) {
        return true
      }
    }

    // 3. Secret date target
    if (targetDate instanceof Date && !isNaN(targetDate.getTime())) {
      const dayMatches = targetDate.getDate() === selDay
      const yearMatches = targetDate.getFullYear() === selYear
      const monthMatches =
        targetDate.getMonth() === selMonth ||
        targetDate.getMonth() === selMonth + 1
      if (dayMatches && yearMatches && monthMatches) {
        return true
      }
    }

    // 4. Passcode match (e.g. "0325" MMDD or "2503" DDMM)
    const mStr = String(selMonth + 1).padStart(2, "0")
    const dStr = String(selDay).padStart(2, "0")
    const code = String(targetPasscode || "").trim()
    if (code === `${mStr}${dStr}` || code === `${dStr}${mStr}`) {
      return true
    }

    return false
  }

  const handleWheelSubmit = () => {
    if (isDateMatch(selectedDate)) {
      triggerUnlockCelebration()
    } else {
      setErrorMsg("Not quite our special date yet! Think back to when our forever started 💕")
    }
  }

  const handlePasscodeSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const clean = passcode.trim().toLowerCase()
    const validCodes = [
      String(targetPasscode || "").trim().toLowerCase(),
      "0325",
      "325",
      "2503",
      "1014",
      "love",
      "march 25",
      "march 25, 2024",
      "25/03/2024",
      "03/25/2024"
    ]
    if (validCodes.includes(clean)) {
      triggerUnlockCelebration()
    } else {
      setErrorMsg("Incorrect passcode! Check the hint or spin the anniversary date wheel 💕")
    }
  }

  const handleLock = () => {
    try {
      localStorage.removeItem("bday_vault_unlocked")
    } catch {}
    setIsUnlocked(false)
    setPasscode("")
    setErrorMsg("")
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <AnimatePresence mode="wait">
        {!isUnlocked ? (
          /* Locked State Interface */
          <motion.div
            key="locked"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="glass-panel p-6 sm:p-10 rounded-3xl border border-blush-300/30 shadow-2xl relative overflow-hidden"
          >
            {/* Top Lock Badge */}
            <div className="flex flex-col items-center text-center mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-midnight to-navy flex items-center justify-center border border-gold/40 shadow-xl mb-4 text-gold">
                <Lock className="w-8 h-8 animate-pulse" />
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-cream-100">
                {birthdayConfig.secretSection.title}
              </h3>
              <p className="text-sm text-cream-200/70 max-w-md mt-2">
                {birthdayConfig.secretSection.subtitle}
              </p>
            </div>

            {/* Input Mode Selector */}
            <div className="flex justify-center gap-2 mb-6">
              <button
                type="button"
                onClick={() => { setInputMode("wheel"); setErrorMsg("") }}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                  inputMode === "wheel"
                    ? "bg-gold text-midnight font-bold shadow-md"
                    : "glass-card text-cream-200/80 hover:text-cream-100"
                }`}
              >
                Spin Date Wheel 🎡
              </button>
              <button
                type="button"
                onClick={() => { setInputMode("text"); setErrorMsg("") }}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                  inputMode === "text"
                    ? "bg-gold text-midnight font-bold shadow-md"
                    : "glass-card text-cream-200/80 hover:text-cream-100"
                }`}
              >
                Enter Passcode 🔑
              </button>
            </div>

            {inputMode === "wheel" ? (
              /* Date Wheel Picker */
              <div className="flex flex-col items-center">
                <div className="bg-navy-dark/80 p-4 rounded-2xl border border-gold/20 shadow-inner my-2">
                  <DateWheelPicker
                    value={selectedDate}
                    onChange={(d) => {
                      setSelectedDate(d)
                      setErrorMsg("")
                    }}
                    minYear={2018}
                    maxYear={2026}
                    size="md"
                    className="text-cream-100"
                  />
                </div>

                <p className="text-xs text-blush-300 font-mono mt-3">
                  Selected:{" "}
                  {selectedDate.toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>

                <button
                  onClick={handleWheelSubmit}
                  className="mt-6 px-8 py-3 rounded-full font-medium text-sm bg-gradient-to-r from-rose-400 via-blush-400 to-gold text-midnight font-bold hover:scale-105 active:scale-95 transition-all shadow-lg flex items-center gap-2"
                >
                  <KeyRound className="w-4 h-4" />
                  <span>Unlock Memories</span>
                </button>
              </div>
            ) : (
              /* Passcode Text Input */
              <form onSubmit={handlePasscodeSubmit} className="max-w-xs mx-auto flex flex-col items-center">
                <div className="relative w-full">
                  <input
                    type="password"
                    placeholder="Enter Secret Passcode..."
                    value={passcode}
                    onChange={(e) => {
                      setPasscode(e.target.value)
                      setErrorMsg("")
                    }}
                    className="w-full bg-navy-dark border border-gold/40 text-cream-100 px-4 py-3 rounded-xl text-center text-sm tracking-widest focus:outline-none focus:ring-2 focus:ring-gold/60"
                  />
                </div>
                <button
                  type="submit"
                  className="mt-4 w-full py-3 rounded-xl font-medium text-sm bg-gradient-to-r from-rose-400 to-gold text-midnight font-bold hover:scale-105 active:scale-95 transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  <KeyRound className="w-4 h-4" />
                  <span>Unlock Vault</span>
                </button>
              </form>
            )}

            {/* Error Message */}
            {errorMsg && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs text-center flex items-center justify-center gap-1.5"
              >
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{errorMsg}</span>
              </motion.div>
            )}

            {/* Hint */}
            <p className="text-center text-[11px] text-cream-200/50 mt-6 italic">
              {birthdayConfig.secretSection.hint}
            </p>
          </motion.div>
        ) : (
          /* Unlocked State Interface */
          <motion.div
            key="unlocked"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="glass-panel p-6 sm:p-10 rounded-3xl border border-gold/40 shadow-2xl relative"
          >
            {/* Top Unlocked Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-blush-300/20 pb-5 mb-8">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-gradient-to-tr from-gold/30 to-rose-400/30 border border-gold/50 text-gold">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-gold font-bold flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> PRIVATE ACCESS GRANTED
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-cream-100">
                    Our Secret Sanctuary ✨
                  </h3>
                </div>
              </div>

              <button
                onClick={handleLock}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium glass-card text-blush-300 hover:text-rose-300 transition-colors"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Lock Vault</span>
              </button>
            </div>

            {/* Unlocked Private Notes & Photos */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {birthdayConfig.secretSection.secretMemories.map((mem, idx) => (
                <div
                  key={idx}
                  className="glass-card p-4 rounded-2xl border border-blush-300/30 hover:border-gold/50 transition-all group flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="aspect-[4/3] rounded-xl overflow-hidden bg-neutral-900 border border-cream-100/10">
                      <img
                        src={mem.image}
                        alt={mem.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-gold uppercase tracking-wider">
                        {mem.date}
                      </span>
                      <h4 className="font-serif text-lg font-bold text-cream-100 mt-0.5">
                        {mem.title}
                      </h4>
                      <p className="font-handwriting text-xl text-rose-300 leading-snug mt-2">
                        "{mem.note}"
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 flex items-center gap-1 text-[11px] text-cream-200/50">
                    <Heart className="w-3 h-3 text-rose-400 fill-rose-400" />
                    <span>Just between you and me</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center text-xs text-blush-300/80 italic font-serif">
              "Some chapters of our story don't need to be shouted to the world; they are carved forever into our hearts."
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
export default SecretSection
