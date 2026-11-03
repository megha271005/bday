# A Little Universe Called Us ❤️
### A Premium Romantic Birthday Website

A personalized, interactive digital love story created for your boyfriend's birthday. This website combines three distinct aesthetics:
- **Romantic Scrapbook** (blush pink, polaroids, handwritten notes, washi tape)
- **Midnight Elegance** (midnight purple & black, deep navy, subtle glowing gold stars)
- **Minimal Editorial** (cream backgrounds, sophisticated serif typography, clean layouts)

---

## 🌟 Features Included

1. **Screen 1: Welcome Experience**
   - Immersive night-sky starlight canvas with floating hearts and glowing constellations.
   - Cinematic entry button: *"Open Your Surprise ❤️"*.

2. **Screen 2: Birthday Hero Section**
   - Main headline *"Happy Birthday My Universe ❤️"*.
   - Large hero polaroid photograph with editable caption and golden glow.
   - Interactive confetti buttons (*Shower Love 🎉*, *Fireworks 🎆*, *Star Shower ✨*).
   - Relationship statistics counter and scroll indicator.

3. **Screen 3: Our Memory Gallery**
   - *"Little Moments, Big Memories"*
   - **3D Coverflow Carousel**: Interactive 3D coverflow carousel (drag horizontally, keyboard arrows, touch).
   - **Scrapbook Grid View**: Polaroid photo cards with washi tape, gentle tilts, handwritten notes, and dates.
   - Lightbox modal with zoom and high-resolution captions.

4. **Screen 4: Our Journey Timeline**
   - *"Every Moment Led Me to You"*
   - Vertical milestone timeline with glowing heart nodes and connecting starlight line.
   - Pre-configured milestones: The Day We Met, Our First Conversation, Our First Photo, Our Funniest Memory, Our Unforgettable Day, and Today & Everything Ahead.

5. **Screen: Interactive Couple Quiz ("Our Little Quiz 🎮")**
   - *"How Well Do You Know Me? ❤️"*
   - 4 Rounds + Special Surprise Question:
     - *Round 1: How Well Do You Know Me?*
     - *Round 2: Our Love Story*
     - *Round 3: How Well Do You Remember?*
     - *Round 4: Just Between Us*
     - *Bonus Round: Special Surprise*
   - Interactive 1-by-1 multiple choice with immediate animated feedback and encouraging cute messages.
   - Auto score calculation with personalized score tiers (90-100%, 70-89%, 40-69%, below 40%).
   - Replay option and progress tracking.

6. **Screen 5: 1000 Reasons I Love You ("Thousands of Reasons...")**
   - Large circular radial typography visualization with concentric glowing rings and orbiting text paths.
   - Dynamic central display with counter (*"Reason No. 001"*).
   - Controls: *Discover Another Reason*, *Surprise Me* (random picker), *Explore All Reasons* (auto-story mode), category filters.
   - Over 105 unique, heartfelt reasons organized across 8 categories in `src/data/loveReasons.js`.
   - Final romantic modal reveal.

7. **Screen 6: Interactive Birthday Letter ("A Letter From My Heart")**
   - Realistic vintage envelope with authentic *"WITH LOVE"* heart wax seal.
   - Clicking the seal unseals the flap with smooth paper unfolding animation.
   - Stationary letter with delicate typography and floating hearts.

8. **Screen 7: Password-Protected Memories ("Some Memories Are Just Ours 🔐")**
   - Interactive 3D Date Wheel Picker (`DateWheelPicker`) to dial in your special anniversary date.
   - Alternative passcode entry with instant validation.
   - Unlocked state persisted in `localStorage`.
   - Reveals private photographs, 3:00 AM whispers, and personal inside memories.

9. **Screen 8: Whispers in the Dark & "Open When..." Letters**
   - Interactive SVG Mask flashlight reveal: hover cursor to illuminate hidden love whispers.
   - Interactive *"Open When..."* letters:
     - *Open When You Miss Me*
     - *Open When You've Had a Rough Day*
     - *Open When You Need a Reminder*
     - *Open When You Can't Sleep*
   - Clickable heart burst for micro-confetti surprises.

10. **Screen 9: Final Birthday Surprise**
    - *"Wait... I have one last thing for you."*
    - Interactive 3D cake with glowing candles.
    - Blowing out the candles triggers fireworks, side confetti cannons, and reveals the grand romantic message and final photo.

11. **Background Romantic Music Player**
    - Floating music player widget (bottom right).
    - Off by default (respects browser autoplay policies).
    - Volume slider, mute/unmute, and animated soundwave visualizer.
    - **Dual-Engine**: Automatically plays `public/music/birthday-song.mp3` when provided, or seamlessly falls back to the built-in romantic lofi chime generator!

---

## 🛠️ How to Personalize Your Website

All text, dates, names, images, questions, and passwords can be customized in three centralized data files.

### 1. Editing Names, Dates, Photos & Password
Open **`src/data/birthdayConfig.js`**:
```javascript
export const birthdayConfig = {
  boyfriendName: "Your Boyfriend's Name",
  girlfriendName: "Your Name",
  birthdayDate: "November 3",
  anniversaryDate: {
    year: 2022,
    month: 9, // October is 9 (0 = Jan, 9 = Oct)
    day: 14,
    formatted: "October 14, 2022"
  },
  secretPasscode: "1014", // Code to unlock the secret vault
  ...
}
```

### 2. Replacing Photos with Your Own
Save your photos in the **`public/images/`** folder with these filenames:
- `public/images/hero.jpg` — Main hero photograph
- `public/images/memory-01.jpg` — Memory 1
- `public/images/memory-02.jpg` — Memory 2
- `public/images/memory-03.jpg` — Memory 3
- `public/images/memory-04.jpg` — Memory 4
- `public/images/memory-05.jpg` — Memory 5
- `public/images/memory-06.jpg` — Memory 6

*Note: High-quality romantic placeholders are already bundled so the site looks gorgeous even before you add your pictures!*

### 3. Adding Your Birthday Song
Place your favourite song as an MP3 file at:
- **`public/music/birthday-song.mp3`**

*(If no file is present, the website automatically plays a soothing, built-in romantic lofi chime melody so the music button always works!)*

### 4. Customizing the Quiz Questions
Open **`src/data/quizQuestions.js`** to edit, add, or reorder any of the questions, answers, and encouraging feedback messages.

### 5. Customizing the 1000 Reasons
Open **`src/data/loveReasons.js`** to add your own personal reasons, inside jokes, and sweet memories.

---

## 🚀 Running the Project Locally

```bash
# 1. Install dependencies
npm install

# 2. Start the local development server
npm run dev
```

Visit `http://localhost:5173` in your browser!

---

## 🌐 Deploying to Vercel / Netlify / GitHub Pages

This is a standard Vite React app ready for 1-click deployment:
- **Build command**: `npm run build`
- **Output directory**: `dist`
