import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import { useTheme } from "../contexts/ThemeContext";
import { scrollToTop } from "../utils/scrollUtils";

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { colors } = useTheme();

  useEffect(() => {
    const toggleVisibility = () => {
      const scrolled = window.pageYOffset;
      const maxHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrolled / maxHeight) * 100;

      setScrollProgress(progress);

      if (scrolled > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0, x: -100 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          exit={{ opacity: 0, scale: 0, x: -100 }}
          className="fixed bottom-8 left-4 md:left-8 z-50"
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="relative p-3 md:p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
            style={{
              backgroundColor: colors.accent,
              color: colors.primary,
            }}
            aria-label="Back to top"
          >
            <svg
              className="absolute inset-0 w-full h-full transform -rotate-90"
              viewBox="0 0 100 100"
            >
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke={colors.border}
                strokeWidth="2"
                fill="none"
                opacity="0.3"
              />
              <motion.circle
                cx="50"
                cy="50"
                r="45"
                stroke={colors.primary}
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: scrollProgress / 100 }}
                transition={{ duration: 0.1 }}
                style={{
                  strokeDasharray: "283",
                  strokeDashoffset: 283 * (1 - scrollProgress / 100),
                }}
              />
            </svg>

            <div className="relative z-10 flex items-center justify-center">
              <motion.div
                animate={{ y: [0, -2, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <FaArrowUp size={18} />
              </motion.div>
            </div>

            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
              Back to top ({Math.round(scrollProgress)}%)
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
            </div>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BackToTop;
