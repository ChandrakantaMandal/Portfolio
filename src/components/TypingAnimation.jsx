import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

const TypingAnimation = ({ 
  texts = [], 
  speed = 100, 
  deleteSpeed = 50, 
  pauseTime = 2000,
  className = "",
  showCursor = true 
}) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const { colors } = useTheme();

  useEffect(() => {
    if (texts.length === 0) return;

    const timeout = setTimeout(() => {
      const fullText = texts[currentTextIndex];
      
      if (isPaused) {
        setIsPaused(false);
        setIsDeleting(true);
        return;
      }

      if (isDeleting) {
        // Deleting characters
        setCurrentText(fullText.substring(0, currentText.length - 1));
        
        if (currentText === '') {
          setIsDeleting(false);
          setCurrentTextIndex((prev) => (prev + 1) % texts.length);
        }
      } else {
        // Typing characters
        setCurrentText(fullText.substring(0, currentText.length + 1));
        
        if (currentText === fullText) {
          setIsPaused(true);
        }
      }
    }, isPaused ? pauseTime : isDeleting ? deleteSpeed : speed);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, isPaused, currentTextIndex, texts, speed, deleteSpeed, pauseTime]);

  return (
    <div className={`inline-flex items-center ${className}`}>
      <span className="text-inherit">
        {currentText}
      </span>
      {showCursor && (
        <motion.span
          className="ml-1 inline-block w-0.5 h-6"
          style={{ backgroundColor: colors.accent }}
          animate={{ opacity: [1, 1, 0, 0] }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      )}
    </div>
  );
};

// Enhanced typing animation with multiple effects
const EnhancedTypingAnimation = ({ 
  prefix = "",
  texts = [],
  suffix = "",
  className = "",
  textClassName = "",
  highlightColor = null
}) => {
  const { colors } = useTheme();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`${className}`}>
      {/* Prefix text with fade-in animation */}
      <motion.span
        className={textClassName}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {prefix}
      </motion.span>

      {/* Typing animation */}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.3, delay: 0.8 }}
        style={{ color: highlightColor || colors.accent }}
        className={`font-bold ${textClassName}`}
      >
        <TypingAnimation 
          texts={texts}
          speed={120}
          deleteSpeed={60}
          pauseTime={2500}
        />
      </motion.span>

      {/* Suffix text */}
      <motion.span
        className={textClassName}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
        transition={{ duration: 0.6, delay: 1.2 }}
      >
        {suffix}
      </motion.span>
    </div>
  );
};

// Word-by-word reveal animation
const WordRevealAnimation = ({ 
  text = "",
  className = "",
  delay = 0,
  staggerDelay = 0.1
}) => {
  const words = text.split(' ');

  return (
    <div className={className}>
      {words.map((word, index) => (
        <motion.span
          key={index}
          className="inline-block mr-2"
          initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            duration: 0.6,
            delay: delay + (index * staggerDelay),
            ease: "easeOut"
          }}
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
};

// Character-by-character reveal animation
const CharacterRevealAnimation = ({ 
  text = "",
  className = "",
  delay = 0,
  staggerDelay = 0.03
}) => {
  const characters = text.split('');

  return (
    <div className={className}>
      {characters.map((char, index) => (
        <motion.span
          key={index}
          className="inline-block"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.4,
            delay: delay + (index * staggerDelay),
            ease: "easeOut"
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </div>
  );
};

export default TypingAnimation;
export { EnhancedTypingAnimation, WordRevealAnimation, CharacterRevealAnimation };
