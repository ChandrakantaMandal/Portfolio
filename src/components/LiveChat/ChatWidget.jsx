import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaComments,
  FaTimes,
  FaPaperPlane,
  FaUser,
  FaRobot,
  FaMinus,
  FaExpand,
  FaSmile,
  FaPaperclip,
} from "react-icons/fa";
import { useTheme } from "../../contexts/ThemeContext";
import { v4 as uuidv4 } from "uuid";

const ChatWidget = () => {
  const { colors } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const [unreadCount, setUnreadCount] = useState(0);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Initialize chat with welcome message
  useEffect(() => {
    const initializeChat = () => {
      const savedMessages = localStorage.getItem("chatMessages");
      let initialMessages = [];
      
      if (savedMessages) {
        try {
          initialMessages = JSON.parse(savedMessages);
        } catch (error) {
          console.error('Error parsing saved messages:', error);
          localStorage.removeItem("chatMessages");
        }
      }
      
      // Always ensure welcome message exists
      if (initialMessages.length === 0) {
        const welcomeMessage = {
          id: uuidv4(),
          text: "Hi! I'm Chandrakanta's AI assistant. How can I help you today?",
          sender: "bot",
          timestamp: new Date(),
          type: "text",
        };
        initialMessages = [welcomeMessage];
        localStorage.setItem("chatMessages", JSON.stringify(initialMessages));
      }
      
      setMessages(initialMessages);
    };
    
    initializeChat();
  }, []);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Scroll to bottom when chat opens
  useEffect(() => {
    if (isOpen && !isMinimized) {
      scrollToBottom();
    }
  }, [isOpen, isMinimized]);

  // Update unread count when chat is closed
  useEffect(() => {
    if (!isOpen && messages.length > 1) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.sender === "bot") {
        setUnreadCount((prev) => prev + 1);
      }
    } else if (isOpen) {
      setUnreadCount(0);
    }
  }, [messages, isOpen]);

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }, 100);
  };

  // Simulate bot responses
  const getBotResponse = (userMessage) => {
    const message = userMessage.toLowerCase();

    if (message.includes("hello") || message.includes("hi")) {
      return "Hello! Nice to meet you! I'm here to help answer any questions about Chandrakanta's work and experience.";
    } else if (message.includes("project") || message.includes("work")) {
      return "Chandrakanta has worked on various exciting projects including React applications, full-stack web development, and modern UI/UX designs. Would you like to know about any specific project?";
    } else if (message.includes("skill") || message.includes("technology")) {
      return "Chandrakanta is skilled in React, JavaScript, Node.js, Python, CSS, and modern web technologies. He's passionate about creating efficient and user-friendly applications.";
    } else if (message.includes("contact") || message.includes("hire")) {
      return "You can contact Chandrakanta through the contact form on this website, or connect via LinkedIn, GitHub, or email. He's always open to discussing new opportunities!";
    } else if (message.includes("experience")) {
      return "Chandrakanta has experience in full-stack development, frontend frameworks, backend APIs, and database design. Check out the About section for more details!";
    } else if (message.includes("thank")) {
      return "You're welcome! Feel free to ask if you have any other questions. Have a great day! 😊";
    } else {
      return "That's an interesting question! For detailed information, I'd recommend checking out the portfolio sections or reaching out directly through the contact form. Is there anything specific you'd like to know?";
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: uuidv4(),
      text: inputMessage,
      sender: "user",
      timestamp: new Date(),
      type: "text",
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse = {
        id: uuidv4(),
        text: getBotResponse(inputMessage),
        sender: "bot",
        timestamp: new Date(),
        type: "text",
      };

      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setIsMinimized(false);
      
      // Safety check: ensure welcome message exists when opening chat
      if (messages.length === 0) {
        const welcomeMessage = {
          id: uuidv4(),
          text: "Hi! I'm Chandrakanta's AI assistant. How can I help you today?",
          sender: "bot",
          timestamp: new Date(),
          type: "text",
        };
        setMessages([welcomeMessage]);
        localStorage.setItem("chatMessages", JSON.stringify([welcomeMessage]));
      }
      
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  };

  const quickReplies = [
    "Tell me about projects",
    "What technologies do you use?",
    "How can I contact you?",
    "What's your experience?",
  ];

  const handleQuickReply = (reply) => {
    setInputMessage(reply);
    setTimeout(() => handleSendMessage(), 100);
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2, type: "spring", stiffness: 260, damping: 20 }}
      >
        <motion.button
          onClick={toggleChat}
          className="relative w-16 h-16 rounded-full shadow-lg flex items-center justify-center text-white text-xl"
          style={{ backgroundColor: colors.accent }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={
            !isOpen
              ? {
                  boxShadow: [
                    `0 0 0 0 ${colors.accent}40`,
                    `0 0 0 10px ${colors.accent}00`,
                    `0 0 0 0 ${colors.accent}40`,
                  ],
                }
              : {}
          }
          transition={{ duration: 2, repeat: Infinity }}
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <FaTimes />
              </motion.div>
            ) : (
              <motion.div
                key="chat"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <FaComments />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Unread Badge */}
          {unreadCount > 0 && !isOpen && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold"
            >
              {unreadCount > 9 ? "9+" : unreadCount}
            </motion.div>
          )}
        </motion.button>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: isMinimized ? 0.8 : 1,
              height: isMinimized ? 60 : 500,
            }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-24 right-6 w-80 rounded-2xl shadow-2xl overflow-hidden z-40"
            style={{ backgroundColor: colors.card }}
          >
            {/* Chat Header */}
            <div
              className="p-4 flex items-center justify-between"
              style={{ backgroundColor: colors.accent }}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <FaRobot className="text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">AI Assistant</h3>
                  <div className="flex items-center gap-1">
                    <motion.div
                      className="w-2 h-2 rounded-full bg-green-400"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [1, 0.8, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    ></motion.div>
                    <span className="text-xs text-white/80">Online</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  {isMinimized ? <FaExpand size={14} /> : <FaMinus size={14} />}
                </button>
                <button
                  onClick={toggleChat}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  <FaTimes size={14} />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages Area */}
                <div className="h-80 overflow-y-auto px-4 py-6 flex flex-col justify-end">
                  <div className="flex flex-col space-y-3 min-h-full justify-end">
                    {messages.map((message) => (
                      <MessageBubble
                        key={message.id}
                        message={message}
                        colors={colors}
                      />
                    ))}

                    {/* Typing Indicator */}
                    {isTyping && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2"
                      >
                        <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                          <FaRobot size={12} />
                        </div>
                        <div className="bg-gray-200 rounded-2xl px-4 py-2">
                          <div className="flex gap-1">
                            {[0, 1, 2].map((i) => (
                              <motion.div
                                key={i}
                                className="w-2 h-2 bg-gray-400 rounded-full"
                                animate={{ y: [0, -5, 0] }}
                                transition={{
                                  duration: 0.6,
                                  repeat: Infinity,
                                  delay: i * 0.2,
                                }}
                              />
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}

                    <div ref={messagesEndRef} />
                  </div>
                </div>

                {/* Quick Replies */}
                {messages.length === 1 && (
                  <div className="px-4 pb-2">
                    <div
                      className="text-xs mb-2"
                      style={{ color: colors.text.muted }}
                    >
                      Quick questions:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {quickReplies.map((reply, index) => (
                        <button
                          key={index}
                          onClick={() => handleQuickReply(reply)}
                          className="text-xs px-3 py-1 rounded-full border transition-colors hover:scale-105"
                          style={{
                            borderColor: colors.accent,
                            color: colors.accent,
                            backgroundColor: "transparent",
                          }}
                        >
                          {reply}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Input Area */}
                <div
                  className="p-4 border-t"
                  style={{ borderColor: colors.border }}
                >
                  <div className="flex gap-2">
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyDown={handleKeyPress}
                      placeholder="Type your message..."
                      className="flex-1 px-3 py-2 rounded-lg border outline-none transition-colors"
                      style={{
                        backgroundColor: colors.secondary,
                        borderColor: colors.border,
                        color: colors.text.primary,
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = colors.accent;
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = colors.border;
                      }}
                    />
                    <motion.button
                      onClick={handleSendMessage}
                      disabled={!inputMessage.trim()}
                      className="px-3 py-2 rounded-lg transition-colors disabled:opacity-50"
                      style={{
                        backgroundColor: colors.accent,
                        color: colors.primary,
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaPaperPlane />
                    </motion.button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// Message Bubble Component
const MessageBubble = ({ message, colors }) => {
  const isBot = message.sender === "bot";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isBot ? "justify-start" : "justify-end"}`}
    >
      <div
        className={`flex gap-3 max-w-[85%] ${
          isBot ? "flex-row" : "flex-row-reverse"
        }`}
      >
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
            isBot ? "bg-gray-300" : "bg-blue-500"
          }`}
        >
          {isBot ? (
            <FaRobot size={12} />
          ) : (
            <FaUser size={12} className="text-white" />
          )}
        </div>
        <div
          className={`px-3 py-2 rounded-2xl break-words ${
            isBot
              ? "bg-gray-100 text-gray-800 rounded-bl-md"
              : "text-white rounded-br-md"
          }`}
          style={!isBot ? { backgroundColor: colors.accent } : {}}
        >
          <p className="text-sm leading-relaxed whitespace-pre-wrap">
            {message.text}
          </p>
          <p
            className={`text-xs mt-1 ${
              isBot ? "text-gray-500" : "text-white/70"
            }`}
          >
            {new Date(message.timestamp).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default ChatWidget;
