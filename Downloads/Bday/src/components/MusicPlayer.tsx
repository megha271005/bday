import React, { useState, useEffect, useRef } from "react"
import { Volume2, VolumeX, Play, Pause, Music, Sparkles } from "lucide-react"
import { birthdayConfig } from "@/data/birthdayConfig"

export const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(birthdayConfig.music.defaultVolume)
  const [isMuted, setIsMuted] = useState(false)
  const [showControls, setShowControls] = useState(false)
  const [audioError, setAudioError] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const synthCtxRef = useRef<AudioContext | null>(null)
  const synthIntervalRef = useRef<number | null>(null)

  // Romantic Lofi Melody Generator using Web Audio API (Plays if MP3 file is not present yet)
  const playRomanticChime = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (!synthCtxRef.current) {
        synthCtxRef.current = new AudioCtx()
      }
      const ctx = synthCtxRef.current
      if (ctx.state === "suspended") {
        ctx.resume()
      }

      // Romantic pentatonic / lullaby notes for Happy Birthday / Love theme
      const notes = [
        261.63, 261.63, 293.66, 261.63, 349.23, 329.63, // Happy birthday to you
        261.63, 261.63, 293.66, 261.63, 392.00, 349.23, // Happy birthday to you
        261.63, 261.63, 523.25, 440.00, 349.23, 329.63, 293.66, // Happy birthday dear my love
        466.16, 466.16, 440.00, 349.23, 392.00, 349.23  // Happy birthday to you
      ]
      let step = 0

      const playNextTone = () => {
        if (!synthCtxRef.current) return
        const freq = notes[step % notes.length]
        step++

        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        
        // Warm romantic electric piano tone
        osc.type = "sine"
        osc.frequency.setValueAtTime(freq, ctx.currentTime)

        // Subtle harmonic overtone
        const osc2 = ctx.createOscillator()
        osc2.type = "triangle"
        osc2.frequency.setValueAtTime(freq * 2, ctx.currentTime)

        const gain2 = ctx.createGain()
        gain2.gain.setValueAtTime(0.05 * volume, ctx.currentTime)
        gain2.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.2)

        gain.gain.setValueAtTime(0.15 * volume, ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.6)

        osc.connect(gain)
        gain.connect(ctx.destination)

        osc2.connect(gain2)
        gain2.connect(ctx.destination)

        osc.start()
        osc2.start()
        osc.stop(ctx.currentTime + 1.7)
        osc2.stop(ctx.currentTime + 1.7)
      }

      playNextTone()
      synthIntervalRef.current = window.setInterval(playNextTone, 750)
    } catch {
      // AudioContext not permitted without interaction
    }
  }

  const stopRomanticChime = () => {
    if (synthIntervalRef.current) {
      clearInterval(synthIntervalRef.current)
      synthIntervalRef.current = null
    }
  }

  useEffect(() => {
    const audio = new Audio()
    audio.src = birthdayConfig.music.src
    audio.loop = true
    audio.volume = isMuted ? 0 : volume
    audioRef.current = audio

    const handleCanPlay = () => setAudioError(false)
    const handleError = () => {
      // If local mp3 not yet added by user, fallback seamlessly to synthesizer
      setAudioError(true)
    }

    audio.addEventListener("canplaythrough", handleCanPlay)
    audio.addEventListener("error", handleError)

    return () => {
      audio.pause()
      audio.removeEventListener("canplaythrough", handleCanPlay)
      audio.removeEventListener("error", handleError)
      stopRomanticChime()
    }
  }, [])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume
    }
  }, [volume, isMuted])

  const togglePlay = () => {
    if (isPlaying) {
      if (audioRef.current && !audioError) {
        audioRef.current.pause()
      }
      stopRomanticChime()
      setIsPlaying(false)
    } else {
      if (audioRef.current && !audioError) {
        audioRef.current.play().then(() => {
          setIsPlaying(true)
        }).catch(() => {
          // If mp3 fails, play soothing chime melody
          setAudioError(true)
          playRomanticChime()
          setIsPlaying(true)
        })
      } else {
        playRomanticChime()
        setIsPlaying(true)
      }
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      {/* Floating expanded control panel */}
      {showControls && (
        <div className="glass-panel px-4 py-3 rounded-2xl flex items-center gap-3 shadow-2xl border border-blush-300/30 animate-in fade-in slide-in-from-right duration-300">
          <div className="flex flex-col pr-1 text-xs">
            <span className="font-medium text-cream-100 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-gold" />
              {audioError ? "Lofi Birthday Chime" : birthdayConfig.music.title}
            </span>
            <span className="text-[10px] text-blush-300">
              {isPlaying ? "Playing Romantic Melody" : "Music Paused"}
            </span>
          </div>

          {/* Volume Slider */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="text-blush-300 hover:text-cream-100 transition-colors"
              title={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="w-4 h-4 text-rose-300" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={(e) => {
                setVolume(parseFloat(e.target.value))
                setIsMuted(false)
              }}
              className="w-16 h-1 bg-navy-light rounded-lg appearance-none cursor-pointer accent-blush-300"
            />
          </div>
        </div>
      )}

      {/* Main Floating Button */}
      <div className="relative group">
        <button
          onClick={togglePlay}
          onMouseEnter={() => setShowControls(true)}
          className={`relative p-3.5 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 ${
            isPlaying
              ? "bg-gradient-to-tr from-blush-500 to-rose-400 text-cream-100 rose-glow scale-105"
              : "glass-panel text-blush-300 hover:text-cream-100 hover:scale-105"
          }`}
          title={isPlaying ? "Pause Music" : "Play Romantic Music"}
          aria-label="Toggle background music"
        >
          {isPlaying ? (
            <div className="relative flex items-center justify-center">
              <Pause className="w-5 h-5 relative z-10" />
              {/* Dancing sound bars animation */}
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-gold"></span>
              </span>
            </div>
          ) : (
            <div className="relative flex items-center justify-center">
              <Music className="w-5 h-5" />
            </div>
          )}
        </button>

        {/* Small tooltip indicator if music is OFF */}
        {!isPlaying && (
          <div className="absolute -top-10 right-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity bg-midnight/90 border border-blush-300/30 text-[11px] text-cream-100 px-2.5 py-1 rounded-full whitespace-nowrap shadow-lg">
            Play Romantic Song 🎵
          </div>
        )}
      </div>
    </div>
  )
}
export default MusicPlayer
