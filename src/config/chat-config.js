// Chat System Configuration

export const CHAT_CONFIG = {
  // Bot settings
  bot: {
    name: "AI Assistant",
    avatar: "🤖",
    typingDelay: {
      min: 1000,
      max: 3000
    },
    responses: {
      greeting: [
        "Hello! Nice to meet you! I'm here to help answer any questions about Chandrakanta's work and experience.",
        "Hi there! Welcome to Chandrakanta's portfolio. How can I assist you today?",
        "Hey! Great to see you here. What would you like to know about Chandrakanta?"
      ],
      farewell: [
        "Goodbye! Thanks for visiting Chandrakanta's portfolio. Feel free to come back anytime if you have more questions. Have a wonderful day! 👋",
        "See you later! Don't hesitate to reach out if you need anything else.",
        "Take care! Thanks for the great conversation."
      ],
      thanks: [
        "You're very welcome! Feel free to ask if you have any other questions. Have a great day! 😊",
        "Happy to help! Don't hesitate to reach out if you need anything else.",
        "My pleasure! Is there anything else you'd like to know about Chandrakanta's work?"
      ]
    }
  },

  // UI settings
  ui: {
    position: {
      bottom: '24px',
      right: '24px'
    },
    dimensions: {
      width: '320px',
      height: '500px',
      minimizedHeight: '60px'
    },
    animation: {
      duration: 300,
      easing: 'spring'
    },
    notification: {
      showAfter: 10000, // 10 seconds
      autoHide: false
    }
  },

  // Features
  features: {
    quickReplies: true,
    typing: true,
    timestamps: true,
    unreadCounter: true,
    chatHistory: true,
    fileUpload: false,
    emoji: false,
    minimize: true
  },

  // Quick reply suggestions
  quickReplies: [
    "Tell me about projects",
    "What technologies do you use?", 
    "How can I contact you?",
    "What's your experience?",
    "Are you available for work?",
    "What are your rates?"
  ],

  // Keywords and responses mapping
  keywords: {
    projects: ["project", "work", "portfolio", "build", "create"],
    skills: ["skill", "technology", "tech", "programming", "language"],
    contact: ["contact", "hire", "email", "reach", "phone"],
    experience: ["experience", "background", "career", "history"],
    availability: ["available", "free", "busy", "time"],
    pricing: ["price", "cost", "rate", "budget", "money"]
  },

  // Storage settings
  storage: {
    key: 'chatMessages',
    maxMessages: 100,
    sessionTimeout: 24 * 60 * 60 * 1000 // 24 hours
  }
};

// Utility functions
export const getChatConfig = (key) => {
  return key.split('.').reduce((obj, k) => obj?.[k], CHAT_CONFIG);
};

export const updateChatConfig = (key, value) => {
  const keys = key.split('.');
  const lastKey = keys.pop();
  const target = keys.reduce((obj, k) => obj[k], CHAT_CONFIG);
  target[lastKey] = value;
};

export default CHAT_CONFIG;
