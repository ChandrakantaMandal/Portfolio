import { motion } from "framer-motion";
import { FaSun, FaMoon } from "react-icons/fa";
import { useTheme } from "../contexts/ThemeContext";

const ThemeToggle = ({ className = "" }) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className={`relative w-14 h-7 rounded-full transition-colors duration-300 shadow-md hover:shadow-lg cursor-pointer ${
        isDark
          ? "bg-gray-700 hover:bg-gray-600"
          : "bg-gray-300 hover:bg-gray-400"
      } ${className}`}
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.05 }}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      {/* Toggle Background - Animated positioning */}
      <motion.div
        className={`absolute w-5 h-5 rounded-full transition-colors duration-300 shadow-sm ${
          isDark ? "bg-[#3de58f]" : "bg-white"
        }`}
        style={{
          top: "4px",
          left: "4px",
        }}
        animate={{
          x: isDark ? 26 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 700,
          damping: 30,
        }}
      />

      {/* Sun Icon */}
      <motion.div
        className="absolute left-2 top-1.5 w-4 h-4 flex items-center justify-center"
        animate={{
          opacity: isDark ? 0.3 : 1,
          scale: isDark ? 0.8 : 1,
        }}
        transition={{ duration: 0.3 }}
      >
        <FaSun className="text-yellow-500 text-sm" />
      </motion.div>

      {/* Moon Icon */}
      <motion.div
        className="absolute right-2 top-1.5 w-4 h-4 flex items-center justify-center"
        animate={{
          opacity: isDark ? 1 : 0.3,
          scale: isDark ? 1 : 0.8,
        }}
        transition={{ duration: 0.3 }}
      >
        <FaMoon className="text-blue-300 text-sm" />
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;
