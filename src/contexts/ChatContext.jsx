import { createContext, useContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const ChatContext = createContext();

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [chatHistory, setChatHistory] = useState([]);

  // Initialize chat with welcome message
  useEffect(() => {
    const savedMessages = localStorage.getItem("chatMessages");
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    } else {
      const welcomeMessage = {
        id: uuidv4(),
        text: "Hi! I'm Chandrakanta's AI assistant. How can I help you today?",
        sender: "bot",
        timestamp: new Date(),
        type: "text",
      };
      setMessages([welcomeMessage]);
    }
    setIsConnected(true);
  }, []);

  // Save messages to localStorage
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("chatMessages", JSON.stringify(messages));
    }
  }, [messages]);

  // Advanced bot responses with context awareness
  const getBotResponse = (userMessage, messageHistory = []) => {
    const message = userMessage.toLowerCase();
    const previousMessages = messageHistory.slice(-3); // Last 3 messages for context

    // Greeting responses
    if (
      message.includes("hello") ||
      message.includes("hi") ||
      message.includes("hey")
    ) {
      const greetings = [
        "Hello! Nice to meet you! I'm here to help answer any questions about Chandrakanta's work and experience.",
        "Hi there! Welcome to Chandrakanta's portfolio. How can I assist you today?",
        "Hey! Great to see you here. What would you like to know about Chandrakanta?",
      ];
      return greetings[Math.floor(Math.random() * greetings.length)];
    }

    // Project-related questions
    if (
      message.includes("project") ||
      message.includes("work") ||
      message.includes("portfolio")
    ) {
      return "Chandrakanta has worked on various exciting projects including:\n\n• Modern React applications with advanced animations\n• Full-stack web development with Node.js\n• Responsive UI/UX designs\n• E-commerce platforms\n• Portfolio websites\n\nWould you like to know about any specific project or technology?";
    }

    // Skills and technology questions
    if (
      message.includes("skill") ||
      message.includes("technology") ||
      message.includes("tech") ||
      message.includes("programming")
    ) {
      return "Chandrakanta's technical expertise includes:\n\n🚀 Frontend: React, JavaScript, HTML5, CSS3, Tailwind CSS\n⚙️ Backend: Node.js, Express, Python\n🗄️ Databases: MongoDB, MySQL, PostgreSQL\n🛠️ Tools: Git, Docker, VS Code, Figma\n☁️ Cloud: AWS, Vercel, Netlify\n\nHe's passionate about creating efficient, scalable, and user-friendly applications!";
    }

    // Contact and hiring questions
    if (
      message.includes("contact") ||
      message.includes("hire") ||
      message.includes("email") ||
      message.includes("reach")
    ) {
      return "You can contact Chandrakanta through several ways:\n\n📧 Email: Use the contact form on this website\n💼 LinkedIn: Connect for professional networking\n🐙 GitHub: Check out his code repositories\n📱 Phone: Available in the contact section\n\nHe's always open to discussing new opportunities, collaborations, and exciting projects!";
    }

    // Experience questions
    if (
      message.includes("experience") ||
      message.includes("background") ||
      message.includes("career")
    ) {
      return "Chandrakanta has extensive experience in:\n\n• Full-stack web development (3+ years)\n• Frontend frameworks and libraries\n• Backend API development\n• Database design and optimization\n• UI/UX design principles\n• Agile development methodologies\n\nCheck out the About section for more detailed information about his journey and achievements!";
    }

    // Education questions
    if (
      message.includes("education") ||
      message.includes("study") ||
      message.includes("degree")
    ) {
      return "Chandrakanta has a strong educational background in computer science and web development. He continuously learns new technologies and stays updated with industry trends. You can find more details in the About section of this portfolio!";
    }

    // Availability questions
    if (
      message.includes("available") ||
      message.includes("free") ||
      message.includes("busy")
    ) {
      return "Chandrakanta is currently open to new opportunities and projects! Whether you're looking for:\n\n• Freelance development work\n• Full-time positions\n• Collaboration on exciting projects\n• Technical consulting\n\nFeel free to reach out through the contact form to discuss your needs!";
    }

    // Pricing questions
    if (
      message.includes("price") ||
      message.includes("cost") ||
      message.includes("rate") ||
      message.includes("budget")
    ) {
      return "Project pricing depends on various factors like scope, complexity, timeline, and requirements. Chandrakanta offers competitive rates and flexible pricing models:\n\n• Hourly rates for smaller tasks\n• Fixed pricing for defined projects\n• Retainer agreements for ongoing work\n\nPlease use the contact form to discuss your specific project and get a customized quote!";
    }

    // Thank you responses
    if (message.includes("thank") || message.includes("thanks")) {
      const thanks = [
        "You're very welcome! Feel free to ask if you have any other questions. Have a great day! 😊",
        "Happy to help! Don't hesitate to reach out if you need anything else.",
        "My pleasure! Is there anything else you'd like to know about Chandrakanta's work?",
      ];
      return thanks[Math.floor(Math.random() * thanks.length)];
    }

    // Goodbye responses
    if (
      message.includes("bye") ||
      message.includes("goodbye") ||
      message.includes("see you")
    ) {
      return "Goodbye! Thanks for visiting Chandrakanta's portfolio. Feel free to come back anytime if you have more questions. Have a wonderful day! 👋";
    }

    // Help requests
    if (message.includes("help") || message.includes("assist")) {
      return "I'm here to help! You can ask me about:\n\n• Chandrakanta's projects and work\n• Technical skills and expertise\n• Contact information\n• Availability for new projects\n• Background and experience\n\nWhat would you like to know?";
    }

    // Default responses with context
    const defaultResponses = [
      "That's an interesting question! For detailed information, I'd recommend checking out the portfolio sections or reaching out directly through the contact form. Is there anything specific you'd like to know?",
      "I'd be happy to help you with that! Could you be more specific about what you're looking for? You can ask about projects, skills, contact info, or anything else related to Chandrakanta's work.",
      "Great question! While I can provide general information, for detailed discussions about specific requirements or projects, I'd recommend using the contact form to reach Chandrakanta directly. What else can I help you with?",
    ];

    return defaultResponses[
      Math.floor(Math.random() * defaultResponses.length)
    ];
  };

  const sendMessage = async (text, sender = "user") => {
    const message = {
      id: uuidv4(),
      text,
      sender,
      timestamp: new Date(),
      type: "text",
    };

    setMessages((prev) => [...prev, message]);

    if (sender === "user") {
      setIsTyping(true);

      // Simulate realistic typing delay
      const typingDelay = 1000 + Math.random() * 2000;

      setTimeout(() => {
        const botResponse = {
          id: uuidv4(),
          text: getBotResponse(text, messages),
          sender: "bot",
          timestamp: new Date(),
          type: "text",
        };

        setMessages((prev) => [...prev, botResponse]);
        setIsTyping(false);
      }, typingDelay);
    }
  };

  const clearChat = () => {
    const welcomeMessage = {
      id: uuidv4(),
      text: "Hi! I'm Chandrakanta's AI assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
      type: "text",
    };
    setMessages([welcomeMessage]);
    localStorage.removeItem("chatMessages");
  };

  const markAsRead = () => {
    setUnreadCount(0);
  };

  const addToHistory = (sessionMessages) => {
    const session = {
      id: uuidv4(),
      messages: sessionMessages,
      timestamp: new Date(),
    };
    setChatHistory((prev) => [session, ...prev.slice(0, 9)]); // Keep last 10 sessions
  };

  const value = {
    messages,
    setMessages,
    isConnected,
    setIsConnected,
    isTyping,
    setIsTyping,
    unreadCount,
    setUnreadCount,
    chatHistory,
    sendMessage,
    clearChat,
    markAsRead,
    addToHistory,
    getBotResponse,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export default ChatContext;
