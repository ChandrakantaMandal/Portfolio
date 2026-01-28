import { useState, useEffect, useRef } from 'react';


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


