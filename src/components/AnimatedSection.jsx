import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";


const fadeInVariants = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};


const slideInLeftVariants = {
  hidden: {
    opacity: 0,
    x: -100,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};


const slideInRightVariants = {
  hidden: {
    opacity: 0,
    x: 100,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const scaleUpVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};


const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};



const AnimatedSection = ({
  children,
  animation = "fadeIn",
  threshold = 0.1,
  triggerOnce = true,
  delay = 0,
  className = "",
  ...props
}) => {
  const { elementRef, isVisible } = useIntersectionObserver({
    threshold,
    triggerOnce,
    rootMargin: "0px 0px -50px 0px",
  });

  const [isInitiallyVisible, setIsInitiallyVisible] = useState(false);

  useEffect(() => {
    if (elementRef.current && !isInitiallyVisible) {
      const rect = elementRef.current.getBoundingClientRect();
      const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
      if (isInViewport) {
        setIsInitiallyVisible(true);
      }
    }
  }, [elementRef, isInitiallyVisible]);

  const getVariants = () => {
    switch (animation) {
      case "slideLeft":
        return slideInLeftVariants;
      case "slideRight":
        return slideInRightVariants;
      case "scaleUp":
        return scaleUpVariants;
      case "stagger":
        return staggerContainerVariants;
      default:
        return fadeInVariants;
    }
  };

  return (
    <motion.div
      ref={elementRef}
      initial="hidden"
      animate={isVisible || isInitiallyVisible ? "visible" : "hidden"}
      variants={getVariants()}
      className={className}
      style={{
        transitionDelay: `${delay}s`,
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
};



export default AnimatedSection;

