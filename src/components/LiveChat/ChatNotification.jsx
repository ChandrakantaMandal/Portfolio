import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaRobot } from 'react-icons/fa';
import { useTheme } from '../../contexts/ThemeContext';

const ChatNotification = ({ onOpen, onDismiss }) => {
  const { colors } = useTheme();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show notification after 10 seconds
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    onDismiss?.();
  };

  const handleOpen = () => {
    setIsVisible(false);
    onOpen?.();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 100, x: 100 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: 100, x: 100 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-24 right-6 w-80 p-4 rounded-xl shadow-lg z-40 cursor-pointer"
          style={{ backgroundColor: colors.card }}
          onClick={handleOpen}
        >
          <div className="flex items-start gap-3">
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: colors.accent }}
            >
              <FaRobot className="text-white" />
            </div>
            
            <div className="flex-1">
              <h4 className="font-semibold mb-1" style={{ color: colors.text.primary }}>
                Need help?
              </h4>
              <p className="text-sm" style={{ color: colors.text.muted }}>
                I'm here to answer questions about Chandrakanta's work and experience. Click to chat!
              </p>
            </div>
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDismiss();
              }}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <FaTimes size={14} />
            </button>
          </div>
          
          {/* Pulse animation */}
          <motion.div
            className="absolute -inset-1 rounded-xl opacity-20"
            style={{ backgroundColor: colors.accent }}
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.2, 0.3, 0.2]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ChatNotification;
