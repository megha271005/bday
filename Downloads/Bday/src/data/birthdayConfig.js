// Centralized Birthday Configuration
// You can edit all details, dates, messages, and photos here!

export const birthdayConfig = {
  // Couple Information
  boyfriendName: "Sree Nikhil",
  girlfriendName: "Your girl",
  birthdayDate: "November 4",
  anniversaryDate: {
    year: 2024,
    month: 2, // March (0-indexed: 0 = Jan, 1 = Feb, 2 = Mar)
    day: 25,
    formatted: "March 25, 2024"
  },
  
  // Secret Unlock Key (Can unlock by date on wheel picker or secret keyword)
  secretPasscode: "0325", // Also matched by DateWheelPicker (March 25, 2024)
  secretDate: new Date(2024, 2, 25), // March 25, 2024 (0-indexed month: 2 = March)

  // Audio Music Settings
  music: {
    title: "Golden Hour - Birthday Lofi Love",
    src: "/music/birthday-song.mp3",
    defaultVolume: 0.6,
  },

  // Screen 1: Welcome
  welcome: {
    badge: "A Little Universe Called Us",
    title: "Someone special was born today...",
    subtitle: "A digital sanctuary crafted with love, memories, and little surprises just for you.",
    cta: "Open Your Surprise ❤️",
  },

  // Screen 2: Birthday Hero
  hero: {
    title: "Happy Birthday",
    nameHighlight: "My Universe ❤️",
    subtitle: "Today isn't just your birthday. It's a celebration of the person who makes my entire world brighter, warmer, and full of magic.",
    heroImage: "/images/hero.jpg",
    fallbackHeroImage: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=1200&auto=format&fit=crop",
    quote: "“In all the world, there is no heart for me like yours. In all the world, there is no love for you like mine.”",
    stats: [
      { label: "Days Loved", value: "Every Single One" },
      { label: "My Favourite View", value: "Your eyes" },
      { label: "Times You Made Me Laugh", value: "∞ Countless" },
    ]
  },

  // Screen 3: Memories Gallery
  gallery: {
    sectionTitle: "Little Moments, Big Memories",
    sectionSubtitle: "Every picture holds a heartbeat, a laugh, and a quiet moment I never want to forget.",
    items: [
      {
        id: 1,
        title: "First photograph together after our togetherness",
        date: "April 2024",
        location: "D block, 4th floor",
        caption: "You held my hand and said you wished time could stand still. It did for me.",
        image: "/images/memory-01.jpg",
        fallbackImage: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=800&auto=format&fit=crop",
        tag: "Together",
        rotation: "-rotate-2"
      },
      {
        id: 2,
        title: "After your proposal",
        date: "May 2024",
        location: "Pheonix mall",
        caption: "One ring, many promises. I still get butterflies thinking about that moment.",
        image: "/images/memory-02.jpg",
        fallbackImage: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=800&auto=format&fit=crop",
        tag: "Precious",
        rotation: "rotate-3"
      },
      {
        id: 3,
        title: "First movie date",
        date: "February 2025",
        location: "Cine prime",
        caption: "The smell of popcorn,the rose you gave me, and the way you held my hand through the whole movie.",
        image: "/images/memory-03.jpg",
        fallbackImage: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?q=80&w=800&auto=format&fit=crop",
        tag: "Romantic",
        rotation: "-rotate-1"
      },
      {
        id: 4,
        title: "Second fest",
        date: "December 2024",
        location: "Seminar hall, college",
        caption: "Messy hair, unlimited laughs",
        image: "/images/memory-04.jpg",
        fallbackImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop",
        tag: "Fun",
        rotation: "rotate-2"
      },
      {
        id: 5,
        title: "First Ratha Yatra together",
        date: "july 2024",
        location: "Kakani - College",
        caption: "In krishna's divine presence, we found our own little world of love and devotion.",
        image: "/images/memory-05.jpg",
        fallbackImage: "https://images.unsplash.com/photo-1494774157365-9e04c6720e47?q=80&w=800&auto=format&fit=crop",
        tag: "Divine",
        rotation: "-rotate-3"
      },
      {
        id: 6,
        title: "Celebrating Us",
        date: "December 2025",
        location: "Right Here With You",
        caption: "Here is to another year of your gentle kindness, your goofy jokes, and your pure heart.",
        image: "/images/memory-06.jpg",
        fallbackImage: "https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=800&auto=format&fit=crop",
        tag: "Forever",
        rotation: "rotate-1"
      }
    ]
  },

  // Screen 4: Timeline
  timeline: {
    title: "Every Moment Led Me to You",
    subtitle: "A story written across days, late nights, quiet smiles, and infinite little milestones.",
    milestones: [
      {
        date: "The Beginning",
        title: "The Day We Met",
        description: "Neither of us know we would become each other's everything, but that day marked the start of a beautiful journey.",
        image: "/images/memory-07.jpg",
        accent: "blush"
      },
      {
        date: "The First Spark",
        title: "Our First Conversation",
        description: "What was supposed to be a brief exchange turned into hours of talking about everything and nothing. I remember smiling at my phone like an idiot all night.",
        image: "/images/memory-08.jpg",
        accent: "gold"
      },
      {
        date: "Capturing Us",
        title: "Our First Photograph Together",
        description: "We both felt so shy, pretending to be casual, but you pulled me close and my heart was beating so fast. Looking back, that picture is pure magic.",
        image: "/images/memory-01.jpg",
        accent: "rose"
      },
      {
        date: "Tears of Laughter",
        title: "Our Funniest Memory",
        description: "That ridiculous moment when everything went hilariously wrong, yet neither of us could stop laughing until our stomachs hurt. You make even chaos feel like a comedy movie.",
        image: "/images/memory-10.jpg",
        accent: "cream"
      },
      {
        date: "Pure Magic",
        title: "Our Most Unforgettable Day",
        description: "A day without deadlines, without rush—just two hearts beating in unison. The moment I realized I never ever want to live in a world where you're not by my side.",
        image: "/images/memory-11.jpg",
        accent: "navy"
      },
      {
        date: "Today & All The Tomorrows",
        title: "Today and Everything Ahead",
        description: "Another year of loving you, learning you, and being grateful for you. I can't wait to make a million more memories with my forever person.",
        image: "/images/memory-12.jpg",
        accent: "gold"
      }
    ]
  },

  // Screen 6: Birthday Letter
  letter: {
    stampDate: "SPECIAL EDITION",
    waxSealText: "WITH LOVE",
    greeting: "To My Favourite Human in the Universe,",
    body: [
      "1. My Favourite Kind of Forever",
      "Happy Birthday to the person who turned ordinary days into memories I never want to forget. Three years ago, I never knew how much one person could become a part of my everyday thoughts, my happiest moments, and my dreams for tomorrow. Somehow, life feels a little more beautiful with you in it. ❤️",
      "2. My Safe Place",
      "In a world where everything keeps changing, you're one of the few things that make me feel certain. I love that I can be completely myself around you — silly, emotional, annoying, quiet, or dramatic — and still feel loved. Thank you for making even the simplest moments feel special. You are my favourite place to return to.",
      "3. My Biggest Proud Moment",
      "Today, I celebrate more than your birthday. I celebrate the person you're becoming, the dreams you're chasing, the challenges you're overcoming, and the strength you carry even when things aren't easy. I hope you never doubt how capable you are. I'll always be proud of you, cheering for you, and believing in you.",
      "4. Three Years, Still My Favourite Story",
      "We've had our laughs, little arguments, unexpected surprises, silly conversations, and moments that only we could understand. Not every day has been perfect, but every chapter has been ours. If I had the chance to go back and choose again, I'd still want to meet you, know you, annoy you, love you, and build this story with you.",
      "5. A Wish for Your Every Tomorrow",
      "My birthday wish for you is simple: may life be gentle with your heart and generous with your dreams. May you find reasons to smile even on difficult days, opportunities that take you closer to everything you want, and happiness that doesn't depend on special occasions. And whenever you need someone beside you, I hope you always find my hand reaching for yours.",
      "Happy Birthday, my favourite human. Three years down, and I still have a lifetime of love to give you. ❤️"
    ],
    closing: "Forever & always yours,",
    signature: "Your Girl ❤️"
  },

  // Screen 7: Secret Vault
  secretSection: {
    title: "Some Memories Are Just Ours 🔐",
    subtitle: "Spin the date wheel to our special day to unlock the vault of our private memories.",
    hint: "Hint: Spin the wheels to our special date or enter the secret passcode.",
    unlockedMessage: "Vault Unlocked! Welcome to our private universe ✨",
    secretMemories: [
      {
        title: "3:00 AM Whispers",
        note: "Remember staying awake until 3 AM talking about how you can make me cum? You told me you wanted to be more than friend but less than lovers.",
        image: "/images/memory-01.jpg",
        date: "Secret Note #1"
      },
      {
        title: "The First Time You Said It",
        note: "The first time you said 'I love you' to me, it was like the world stopped spinning. I knew in that moment that I was completely shocked.",
        image: "/images/memory-02.jpg",
        date: "Secret Note #2"
      },
      {
        title: "Things Nobody Else Knows",
        note: "I hate you for making me a fool infront of everyone by telling them the things nobody should know except us.",
        image: "/images/memory-03.jpg",
        date: "Secret Note #3"
      }
    ]
  },

  // Screen 8: Hidden Messages & "Open When"
  hiddenSurprises: [
    {
      title: "Open When You Miss Me",
      preview: "A little hug across the distance...",
      message: "Close your eyes, take a deep breath, and wrap your arms around yourself. That is me, hugging you from across whatever distance is between us. You are never truly alone, because you carry my whole heart wherever you go. Call me whenever you want, I'll always answer for you.",
      icon: "Heart"
    },
    {
      title: "Open When You've Had a Rough Day",
      preview: "For the heavy evenings...",
      message: "Take off the weight of the world, my love. You don't have to be strong all the time. You tried your best today, and that is more than enough. Come rest your head on my shoulder, let me make you warm tea, and remind you of how extraordinary you are.",
      icon: "Coffee"
    },
    {
      title: "Open When You Need a Reminder",
      preview: "Just in case you forgot...",
      message: "You are the smartest, kindest, most handsome man I have ever known. Your laughter lights up an entire room, and your kindness changes lives without you even realizing it. I am so ridiculously proud of you.",
      icon: "Sparkles"
    },
    {
      title: "Open When You Can't Sleep",
      preview: "For the quiet midnight hours...",
      message: "Count the reasons I love you instead of sheep! Imagine my hand running through your hair, tracing the worry away from your forehead. Let tomorrow wait until tomorrow. Tonight, you are safe, cherished, and loved beyond measure. Sweet dreams.",
      icon: "Moon"
    }
  ],

  // Screen 9: Final Birthday Surprise
  finalSurprise: {
    teaser: "Wait... I have one last thing for you.",
    buttonText: "Blow Out The Candles & Reveal Surprise 🎂",
    cakeMessage: "Make a wish, my love!",
    revealedTitle: "I Love You. Happy Birthday, My Forever Favourite Person ❤️",
    revealedParagraph: "No matter how many birthdays come and go, my wish will always be the same: to be right here by your side, celebrating the miracle that you are. May this year bring you all the love, happiness, peace, and triumphs you so richly deserve.",
    closingWish: "Forever & Always in Our Little Universe."
  }
};
