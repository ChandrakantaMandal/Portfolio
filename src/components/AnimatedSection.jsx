import { motion } from 'framer-motion';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

// Fade in animation variants
const fadeInVariants = {
  hidden: { 
    opacity: 0, 
    y: 50,
    scale: 0.95
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

// Slide in from left
const slideInLeftVariants = {
  hidden: { 
    opacity: 0, 
    x: -100 
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

// Slide in from right
const slideInRightVariants = {
  hidden: { 
    opacity: 0, 
    x: 100 
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

// Scale up animation
const scaleUpVariants = {
  hidden: { 
    opacity: 0, 
    scale: 0.8 
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

// Stagger children animation
const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const staggerItemVariants = {
  hidden: { 
    opacity: 0, 
    y: 20 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

// Main animated section component
const AnimatedSection = ({ 
  children, 
  animation = 'fadeIn',
  threshold = 0.1,
  triggerOnce = true,
  delay = 0,
  className = '',
  ...props 
}) => {
  const { elementRef, isVisible } = useIntersectionObserver({
    threshold,
    triggerOnce,
    rootMargin: '0px 0px -50px 0px'
  });

  const getVariants = () => {
    switch (animation) {
      case 'slideLeft':
        return slideInLeftVariants;
      case 'slideRight':
        return slideInRightVariants;
      case 'scaleUp':
        return scaleUpVariants;
      case 'stagger':
        return staggerContainerVariants;
      default:
        return fadeInVariants;
    }
  };

  return (
    <motion.div
      ref={elementRef}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={getVariants()}
      className={className}
      style={{ 
        transitionDelay: `${delay}s` 
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Stagger children wrapper
const StaggerChildren = ({ children, className = '' }) => {
  const { elementRef, isVisible } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <motion.div
      ref={elementRef}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={staggerContainerVariants}
      className={className}
    >
      {Array.isArray(children) 
        ? children.map((child, index) => (
            <motion.div key={index} variants={staggerItemVariants}>
              {child}
            </motion.div>
          ))
        : <motion.div variants={staggerItemVariants}>{children}</motion.div>
      }
    </motion.div>
  );
};

// Count up animation component
const CountUpAnimation = ({ 
  end, 
  duration = 2, 
  suffix = '', 
  prefix = '',
  className = '' 
}) => {
  const { elementRef, isVisible } = useIntersectionObserver({
    threshold: 0.5,
    triggerOnce: true
  });

  return (
    <motion.div
      ref={elementRef}
      className={className}
    >
      {isVisible && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.span
            initial={{ textContent: 0 }}
            animate={{ textContent: end }}
            transition={{ duration, ease: "easeOut" }}
            onUpdate={(latest) => {
              if (elementRef.current) {
                elementRef.current.textContent = 
                  prefix + Math.floor(latest.textContent) + suffix;
              }
            }}
          />
        </motion.span>
      )}
    </motion.div>
  );
};

// Progress bar animation
const ProgressBarAnimation = ({ 
  percentage, 
  height = '8px',
  color = '#3de58f',
  backgroundColor = '#374151',
  className = '' 
}) => {
  const { elementRef, isVisible } = useIntersectionObserver({
    threshold: 0.3,
    triggerOnce: true
  });

  return (
    <div 
      ref={elementRef}
      className={`w-full rounded-full overflow-hidden ${className}`}
      style={{ 
        height, 
        backgroundColor 
      }}
    >
      <motion.div
        className="h-full rounded-full"
        style={{ backgroundColor: color }}
        initial={{ width: "0%" }}
        animate={{ width: isVisible ? `${percentage}%` : "0%" }}
        transition={{ 
          duration: 1.5, 
          ease: "easeOut",
          delay: 0.2 
        }}
      />
    </div>
  );
};

// Reveal text animation
const RevealTextAnimation = ({ 
  text, 
  className = '',
  delay = 0 
}) => {
  const { elementRef, isVisible } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true
  });

  const words = text.split(' ');

  return (
    <div ref={elementRef} className={className}>
      {words.map((word, index) => (
        <motion.span
          key={index}
          className="inline-block mr-2"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{
            duration: 0.6,
            delay: delay + (index * 0.1),
            ease: "easeOut"
          }}
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
};

export default AnimatedSection;
export { 
  StaggerChildren, 
  CountUpAnimation, 
  ProgressBarAnimation, 
  RevealTextAnimation 
};
