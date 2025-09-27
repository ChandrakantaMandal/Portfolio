import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../contexts/ThemeContext";

const ScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentSection, setCurrentSection] = useState("");
  const [readingTime, setReadingTime] = useState(0);
  const { colors } = useTheme();

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollPx = document.documentElement.scrollTop;
      const winHeightPx =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrolled = scrollPx / winHeightPx;
      setScrollProgress(scrolled);

      // Determine current section
      const sections = ["hero", "about", "projects", "contact"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setCurrentSection(section);
            break;
          }
        }
      }
    };

    // Calculate estimated reading time
    const calculateReadingTime = () => {
      const text = document.body.innerText || "";
      const wordsPerMinute = 200;
      const words = text.trim().split(/\s+/).length;
      const time = Math.ceil(words / wordsPerMinute);
      setReadingTime(time);
    };

    updateScrollProgress();
    calculateReadingTime();

    window.addEventListener("scroll", updateScrollProgress);
    return () => window.removeEventListener("scroll", updateScrollProgress);
  }, []);

  return (
    <>
      {/* Main progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 z-50 transition-colors duration-300"
        style={{ backgroundColor: colors.border }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="h-full origin-left relative"
          style={{
            background: `linear-gradient(to right, ${colors.accent}, ${colors.accentHover})`,
            scaleX: scrollProgress,
          }}
          transition={{ duration: 0.1 }}
        >
          {/* Glowing effect */}
          <motion.div
            className="absolute top-0 right-0 w-4 h-full"
            style={{
              background: `linear-gradient(to right, transparent, ${colors.accent})`,
              filter: "blur(2px)",
            }}
            animate={{
              opacity: scrollProgress > 0.1 ? [0.5, 1, 0.5] : 0,
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </motion.div>

      {/* Circular Progress Bar */}
      <motion.div
        className="fixed top-20 right-6 z-50"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: scrollProgress > 0.05 ? 1 : 0,
          scale: scrollProgress > 0.05 ? 1 : 0.8,
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative w-16 h-16">
          {/* Background circle with backdrop blur */}
          <div 
            className="absolute inset-0 rounded-full backdrop-blur-md border shadow-lg"
            style={{
              backgroundColor: `${colors.navbar}dd`,
              borderColor: colors.border,
            }}
          />
          
          {/* SVG Progress Circle */}
          <svg className="w-16 h-16 transform -rotate-90 absolute inset-0" viewBox="0 0 64 64">
            {/* Background circle */}
            <circle
              cx="32"
              cy="32"
              r="28"
              stroke={colors.border}
              strokeWidth="3"
              fill="none"
              opacity="0.3"
            />
            {/* Progress circle */}
            <motion.circle
              cx="32"
              cy="32"
              r="28"
              stroke={colors.accent}
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: scrollProgress }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              style={{
                strokeDasharray: "175.93", // 2 * π * 28
                strokeDashoffset: 175.93 * (1 - scrollProgress),
                filter: `drop-shadow(0 0 8px ${colors.accent}40)`,
              }}
            />
          </svg>
          
          {/* Center Icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{ 
                rotate: scrollProgress * 360,
                scale: scrollProgress > 0.8 ? [1, 1.1, 1] : 1
              }}
              transition={{ 
                rotate: { duration: 0.3, ease: "easeOut" },
                scale: { duration: 0.5, repeat: scrollProgress > 0.8 ? Infinity : 0 }
              }}
            >
              <svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke={colors.accent}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {/* Book/Reading icon */}
                <path d="M2 6h7l2 2h9a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6z"/>
                <path d="M2 6v12a2 2 0 0 0 2 2h16"/>
                <motion.path 
                  d="m7 10 3 3 6-6"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: scrollProgress > 0.9 ? 1 : 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  stroke={colors.accentHover}
                  strokeWidth="2.5"
                />
              </svg>
            </motion.div>
          </div>
          
          {/* Progress percentage tooltip */}
          <motion.div
            className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 px-2 py-1 rounded text-xs font-medium backdrop-blur-sm"
            style={{
              backgroundColor: `${colors.navbar}ee`,
              color: colors.text.primary,
              border: `1px solid ${colors.border}`,
            }}
            initial={{ opacity: 0, y: -10 }}
            animate={{
              opacity: scrollProgress > 0.1 && scrollProgress < 1 ? 1 : 0,
              y: scrollProgress > 0.1 && scrollProgress < 1 ? 0 : -10,
            }}
            transition={{ duration: 0.3 }}
          >
            {Math.round(scrollProgress * 100)}%
          </motion.div>
        </div>
      </motion.div>
      
      {/* Section info sidebar */}
      <motion.div
        className="fixed top-20 right-24 z-40 px-3 py-2 rounded-lg backdrop-blur-sm"
        style={{
          backgroundColor: `${colors.navbar}dd`,
          border: `1px solid ${colors.border}`,
        }}
        initial={{ opacity: 0, x: 20 }}
        animate={{
          opacity: scrollProgress > 0.05 ? 1 : 0,
          x: scrollProgress > 0.05 ? 0 : 20,
        }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <div className="flex flex-col items-end">
          <span
            className="text-sm font-medium capitalize"
            style={{ color: colors.text.primary }}
          >
            {currentSection || "Top"}
          </span>
          <span className="text-xs" style={{ color: colors.text.muted }}>
            {readingTime} min read
          </span>
        </div>
      </motion.div>
    </>
  );
};

export default ScrollProgress;
