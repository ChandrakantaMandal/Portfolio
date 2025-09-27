import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

// Page transition variants
const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
    scale: 0.98,
  },
  in: {
    opacity: 1,
    y: 0,
    scale: 1,
  },
  out: {
    opacity: 0,
    y: -20,
    scale: 1.02,
  }
};

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.6
};

// Slide transition variants
const slideVariants = {
  initial: (direction) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0
  }),
  in: {
    x: 0,
    opacity: 1
  },
  out: (direction) => ({
    x: direction < 0 ? 1000 : -1000,
    opacity: 0
  })
};

const slideTransition = {
  type: 'spring',
  stiffness: 300,
  damping: 30
};

// Curtain transition
const curtainVariants = {
  initial: {
    scaleY: 0,
    originY: 0,
  },
  animate: {
    scaleY: 1,
    originY: 0,
  },
  exit: {
    scaleY: 0,
    originY: 1,
  }
};

// Main page transition wrapper
const PageTransition = ({ 
  children, 
  variant = 'fade',
  direction = 1,
  className = '' 
}) => {
  const { colors } = useTheme();

  const getVariants = () => {
    switch (variant) {
      case 'slide':
        return slideVariants;
      case 'curtain':
        return curtainVariants;
      default:
        return pageVariants;
    }
  };

  const getTransition = () => {
    switch (variant) {
      case 'slide':
        return slideTransition;
      case 'curtain':
        return { duration: 0.8, ease: 'easeInOut' };
      default:
        return pageTransition;
    }
  };

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={getVariants()}
      transition={getTransition()}
      custom={direction}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Section transition wrapper
const SectionTransition = ({ 
  children, 
  delay = 0,
  className = '' 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.8, 
        delay,
        ease: 'easeOut'
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Loading transition overlay
const LoadingTransition = ({ isLoading }) => {
  const { colors } = useTheme();

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backgroundColor: colors.primary }}
        >
          {/* Animated logo or spinner */}
          <motion.div
            className="relative"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          >
            <div 
              className="w-16 h-16 border-4 border-t-transparent rounded-full"
              style={{ borderColor: `${colors.accent} transparent transparent transparent` }}
            />
          </motion.div>
          
          {/* Loading text */}
          <motion.div
            className="absolute mt-24 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h3 
              className="text-xl font-semibold mb-2"
              style={{ color: colors.text.primary }}
            >
              Loading...
            </h3>
            <div className="flex space-x-1 justify-center">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: colors.accent }}
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Route transition wrapper
const RouteTransition = ({ children, location }) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location?.pathname || 'default'}
        initial={{ opacity: 0, x: 300 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -300 }}
        transition={{
          type: 'spring',
          stiffness: 260,
          damping: 20,
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransition;
export { SectionTransition, LoadingTransition, RouteTransition };
