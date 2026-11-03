// Interactive Couple Quiz Data Configuration
// Easily add, edit, or reorder questions for your boyfriend!

export const quizQuestions = [
  // Round 1: How Well Do You Know Me?
  {
    id: 1,
    round: "Round 1",
    category: "How Well Do You Know Me?",
    question: "Who fell in love first?",
    options: [
      "You did",
      "I did",
      "Both of us at the same time",
      "Still a mystery to this day"
    ],
    correctAnswer: 1,
    correctFeedback: "Awww, you remembered!",
    incorrectFeedback: "Oops! Someone needs to pay more attention",
    bonusMessage: "Remember when you made me wait for 3 months?"
  },
  {
    id: 2,
    round: "Round 1",
    category: "How Well Do You Know Me?",
    question: "When I'm angry, what should you do?",
    options: [
      "Give me some space",
      "Make me laugh",
      "Talk to me and understand me",
      "Bring me food and hugs"
    ],
    correctAnswer: 3,
    correctFeedback: "1000% correct!",
    incorrectFeedback: "Come on, you should know this one!",
    bonusMessage: "Never stop hugging me like you mean it."
  },
  {
    id: 3,
    round: "Round 1",
    category: "How Well Do You Know Me?",
    question: "What is my favourite way to spend a lazy Sunday with you?",
    options: [
      "Going out for an all-day busy shopping spree",
      "Staying in pyjamas, binge-watching shows, and cuddling",
      "Running a marathon in the early morning",
      "Doing chores and cleaning the entire house"
    ],
    correctAnswer: 1,
    correctFeedback: "Spot on! Pyjamas, snacks, and cuddles with you beat any party in the world.",
    incorrectFeedback: "Excuse me?! You think I want to run a marathon on a Sunday?! 😂",
    bonusMessage: "Our cosy lazy days are my absolute favourite."
  },

  // Round 2: Our Love Story
  {
    id: 4,
    round: "Round 2",
    category: "Our Love Story",
    question: "Who sent the very first message / initiated our first long conversation?",
    options: [
      "You did",
      "I did",
      "It happened simultaneously by magic",
      "A mutual friend forced us into a group chat"
    ],
    correctAnswer: 0,
    correctFeedback: "Haha yes! You were trying so adorably hard to be cool and smooth 😉❤️",
    incorrectFeedback: "Wait, do you really not remember? Check the chat history, handsome! 😂",
    bonusMessage: "That first message started the most beautiful chapter of my life."
  },
  {
    id: 5,
    round: "Round 2",
    category: "Our Love Story",
    question: "What was the exact moment when we both knew this was something truly special?",
    options: [
      "When we had sex for the first time",
      "When we got caught",
      "When no one accepted your proposal, So that you came to me",
      "None (Answer in the chat, coz idk)"
    ],
    correctAnswer: 3,
    correctFeedback: "That's my favourite memory too! 5 AM arrived and neither of us wanted to say goodnight.",
    incorrectFeedback: "All of those were magical, but our 3 AM conversation was where the magic sparked! ✨",
    bonusMessage: "Time has never moved normally whenever I'm with you."
  },

  // Round 3: How Well Do You Remember?
  {
    id: 6,
    round: "Round 3",
    category: "How Well Do You Remember?",
    question: "Most favourite thing in the world?",
    options: [
      "Me",
      "Photography",
      "Car",
      "AOTA"
    ],
    correctAnswer: 3,
    correctFeedback: "All Of The Above",
    incorrectFeedback: "So you think I am a thing??",
    bonusMessage: "You knew it!"
  },
  {
    id: 7,
    round: "Round 3",
    category: "How Well Do You Remember?",
    question: "What is my biggest weakness when it comes to you?",
    options: [
      "Patience",
      "Being a good listener",
      "Anger management",
      "NONE"
    ],
    correctAnswer: 2,
    correctFeedback: "You got it! I can be a little fiery sometimes, but you always know how to calm me down.",
    incorrectFeedback: "Aww, better luck next time!",
    bonusMessage: "I promise to not manage my anger, but I will always manage to love you more every day."
  },

  // Round 4: Just Between Us
  {
    id: 8,
    round: "Round 4",
    category: "Just Between Us",
    question: "If I cheated on you, would you stay with me?",
    options: [
      "Yes, I would forgive you",
      "No, I would leave you",
      "I would need time to think",
      "IDK"
    ],
    correctAnswer: 3,
    correctFeedback: "CORRECT!",
    incorrectFeedback: "I would never cheat on you, so this is a trick question",
    bonusMessage: "And I would never cheat on you either."
  },

  // Surprise / Bonus Question (Non-strict romantic reflection)
  {
    id: 9,
    round: "Bonus Round ✨",
    category: "Special Surprise",
    isBonus: true,
    question: "After everything we've been through in these 3 years, what is the one promise you'd make to me for the rest of our lives?",
    options: [
      "I'll never stop choosing you, even on difficult days.",
      "I'll always make you feel loved, valued, and special.",
      "I'll keep creating beautiful memories with you.",
      "I'll stand beside you through every chapter of life.",
      "All of the above — because you're my forever. ❤️"
    ],
    correctAnswer: 4,
    correctFeedback: "Make sure you everything!",
    incorrectFeedback: "Any place is paradise as long as you're holding my hand!",
    bonusMessage: "Chachipotav cheyyakapothe"
  }
];

export const quizScoreTiers = {
  high: {
    min: 90,
    title: "Master of Us! 🏆❤️",
    message: "Okayyy! You really know your girl! You remembered every little spark, giggle, and milestone. You deserve infinite kisses today!"
  },
  good: {
    min: 70,
    title: "So Sweet! 💕",
    message: "Not bad at all! You know me pretty well, handsome! You definitely paid attention to the important things."
  },
  medium: {
    min: 40,
    title: "Cutie In Training ☕",
    message: "Hmm... looks like we need more memory-making dates and late-night cuddle sessions to revise our love story!"
  },
  low: {
    min: 0,
    title: "Revision Time! 😂❤️",
    message: "Excuse me?! We need to revise our love story immediately! But don't worry, you're still my forever favourite person."
  }
};
