import { useState, useEffect, useRef } from 'react';

// Custom hook for intersection observer
export const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);
  const elementRef = useRef(null);

  const defaultOptions = {
    threshold: 0.1,
    rootMargin: '0px',
    triggerOnce: true,
    ...options
  };

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isElementIntersecting = entry.isIntersecting;
        setIsIntersecting(isElementIntersecting);
        
        if (isElementIntersecting && !hasIntersected) {
          setHasIntersected(true);
        }
      },
      defaultOptions
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [hasIntersected, defaultOptions.threshold, defaultOptions.rootMargin, defaultOptions.triggerOnce]);

  return {
    elementRef,
    isIntersecting,
    hasIntersected,
    isVisible: defaultOptions.triggerOnce ? hasIntersected : isIntersecting
  };
};

// Hook for multiple elements
export const useMultipleIntersectionObserver = (elementsCount, options = {}) => {
  const [intersections, setIntersections] = useState({});
  const elementRefs = useRef([]);

  const defaultOptions = {
    threshold: 0.1,
    rootMargin: '0px',
    triggerOnce: true,
    ...options
  };

  useEffect(() => {
    const elements = elementRefs.current.filter(Boolean);
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = elements.indexOf(entry.target);
          if (index !== -1) {
            setIntersections(prev => ({
              ...prev,
              [index]: {
                isIntersecting: entry.isIntersecting,
                hasIntersected: prev[index]?.hasIntersected || entry.isIntersecting
              }
            }));
          }
        });
      },
      defaultOptions
    );

    elements.forEach(element => observer.observe(element));

    return () => {
      elements.forEach(element => observer.unobserve(element));
    };
  }, [elementsCount, defaultOptions.threshold, defaultOptions.rootMargin, defaultOptions.triggerOnce]);

  const setElementRef = (index) => (element) => {
    elementRefs.current[index] = element;
  };

  return {
    setElementRef,
    intersections,
    getIsVisible: (index) => {
      const intersection = intersections[index];
      return defaultOptions.triggerOnce 
        ? intersection?.hasIntersected || false
        : intersection?.isIntersecting || false;
    }
  };
};

// Hook for scroll-triggered animations with progress
export const useScrollProgress = (options = {}) => {
  const [progress, setProgress] = useState(0);
  const elementRef = useRef(null);

  const defaultOptions = {
    offset: 0,
    ...options
  };

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleScroll = () => {
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementHeight = rect.height;
      
      // Calculate progress based on element position
      const elementTop = rect.top - defaultOptions.offset;
      const elementBottom = rect.bottom - defaultOptions.offset;
      
      let scrollProgress = 0;
      
      if (elementTop <= windowHeight && elementBottom >= 0) {
        if (elementTop <= 0 && elementBottom >= windowHeight) {
          // Element is larger than viewport
          scrollProgress = Math.min(1, Math.max(0, (windowHeight - elementTop) / windowHeight));
        } else if (elementTop > 0) {
          // Element is entering from bottom
          scrollProgress = Math.min(1, (windowHeight - elementTop) / elementHeight);
        } else {
          // Element is exiting from top
          scrollProgress = Math.min(1, elementBottom / elementHeight);
        }
      }
      
      setProgress(scrollProgress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial calculation
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [defaultOptions.offset]);

  return { elementRef, progress };
};
