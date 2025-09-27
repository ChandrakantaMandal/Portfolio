import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSun, FaMoon, FaCheck, FaTimes } from "react-icons/fa";
import { useTheme } from "../contexts/ThemeContext";

const ThemeNotification = () => {
  const { isDark } = useTheme();
  const [showNotification, setShowNotification] = useState(false);
  const [previousTheme, setPreviousTheme] = useState(isDark);

  const hideNotification = () => {
    setShowNotification(false);
  };

  useEffect(() => {
    // Only show notification if theme actually changed
    if (isDark !== previousTheme) {
      setShowNotification(true);
      setPreviousTheme(isDark);

      // Hide notification after 3 seconds
      const timer = setTimeout(() => {
        hideNotification();
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [isDark, previousTheme]);

  // Also hide notification when component unmounts
  useEffect(() => {
    return () => {
      setShowNotification(false);
    };
  }, []);

  return (
    <AnimatePresence>
      {showNotification && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{
            opacity: 1,
            y: 0,
            scale: [0.9, 1.05, 1],
          }}
          exit={{ opacity: 0, y: -50, scale: 0.9 }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30,
            duration: 0.4,
            scale: {
              times: [0, 0.6, 1],
              duration: 0.4,
            },
          }}
          onClick={hideNotification}
          className="fixed top-20 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-lg shadow-xl border backdrop-blur-sm cursor-pointer hover:scale-105 transition-transform"
          style={{
            backgroundColor: isDark
              ? "rgba(26, 31, 37, 0.95)"
              : "rgba(255, 255, 255, 0.95)",
            borderColor: isDark ? "#374151" : "#e2e8f0",
            color: isDark ? "#ffffff" : "#1a202c",
          }}
        >
          {/* Theme Icon */}
          <motion.div
            initial={{ rotate: -180 }}
            animate={{ rotate: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center w-8 h-8 rounded-full"
            style={{ backgroundColor: "#3de58f" }}
          >
            {isDark ? (
              <FaMoon className="text-white text-sm" />
            ) : (
              <FaSun className="text-white text-sm" />
            )}
          </motion.div>

          {/* Text */}
          <div className="flex flex-col flex-1">
            <div className="flex items-center gap-2">
              <span className="font-medium text-sm">
                {isDark ? "Dark" : "Light"} mode enabled
              </span>
              <FaCheck className="text-green-500 text-xs" />
            </div>
            <span className="text-xs opacity-70">Theme preference saved</span>
          </div>

          {/* Dismiss Button */}
          <motion.button
            onClick={(e) => {
              e.stopPropagation(); // Prevent triggering the container click
              hideNotification();
            }}
            className="ml-2 p-1 rounded-full transition-colors"
            style={{
              backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
            }}
            whileHover={{ 
              scale: 1.1,
              backgroundColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)'
            }}
            whileTap={{ scale: 0.9 }}
            title="Dismiss notification"
          >
            <FaTimes className="text-xs opacity-70 hover:opacity-100 transition-opacity" />
          </motion.button>

          {/* Progress bar */}
          <motion.div
            className="absolute bottom-0 left-0 h-1 bg-[#3de58f] rounded-b-lg"
            initial={{ width: "100%" }}
            animate={{ width: "0%" }}
            transition={{ duration: 3, ease: "linear" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ThemeNotification;
