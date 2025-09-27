// Enhanced smooth scroll utility functions

// Easing functions for custom scroll animations
const easeInOutCubic = (t) => {
  return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
};

const easeOutQuart = (t) => {
  return 1 - --t * t * t * t;
};

// Custom smooth scroll with easing
export const smoothScrollTo = (
  targetPosition,
  duration = 1000,
  easing = easeInOutCubic
) => {
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  let startTime = null;

  const animation = (currentTime) => {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);

    const easedProgress = easing(progress);
    window.scrollTo(0, startPosition + distance * easedProgress);

    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    }
  };

  requestAnimationFrame(animation);
};

// Enhanced section scrolling with custom animations
export const scrollToSection = (sectionId, offset = 80, duration = 1200) => {
  const element = document.getElementById(sectionId.replace("#", ""));
  if (element) {
    const offsetTop = element.offsetTop - offset;
    smoothScrollTo(offsetTop, duration, easeOutQuart);

    // Add visual feedback
    element.style.transform = "scale(1.02)";
    element.style.transition = "transform 0.3s ease";
    setTimeout(() => {
      element.style.transform = "scale(1)";
      setTimeout(() => {
        element.style.transition = "";
      }, 300);
    }, 200);
  }
};

// Smooth scroll to top with bounce effect
export const scrollToTop = (duration = 1000) => {
  smoothScrollTo(0, duration, easeOutQuart);
};

// Get current section with improved detection
export const getCurrentSection = () => {
  const sections = ["hero", "about", "projects", "blog", "contact"];
  const scrollPosition = window.scrollY + 100;

  for (const section of sections) {
    const element = document.getElementById(section);
    if (element) {
      const offsetTop = element.offsetTop;
      const offsetBottom = offsetTop + element.offsetHeight;

      if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
        return section;
      }
    }
  }
  return "hero";
};

// Scroll to next/previous section
export const scrollToNextSection = () => {
  const sections = ["hero", "about", "projects", "blog", "contact"];
  const currentSection = getCurrentSection();
  const currentIndex = sections.indexOf(currentSection);
  const nextIndex = (currentIndex + 1) % sections.length;
  scrollToSection(`#${sections[nextIndex]}`);
};

export const scrollToPreviousSection = () => {
  const sections = ["hero", "about", "projects", "blog", "contact"];
  const currentSection = getCurrentSection();
  const currentIndex = sections.indexOf(currentSection);
  const prevIndex = currentIndex === 0 ? sections.length - 1 : currentIndex - 1;
  scrollToSection(`#${sections[prevIndex]}`);
};

// Keyboard navigation
export const initKeyboardNavigation = () => {
  const handleKeyPress = (e) => {
    if (e.ctrlKey || e.metaKey) return; // Don't interfere with browser shortcuts

    switch (e.key) {
      case "ArrowDown":
      case "PageDown":
        e.preventDefault();
        scrollToNextSection();
        break;
      case "ArrowUp":
      case "PageUp":
        e.preventDefault();
        scrollToPreviousSection();
        break;
      case "Home":
        e.preventDefault();
        scrollToSection("#hero");
        break;
      case "End":
        e.preventDefault();
        scrollToSection("#contact");
        break;
    }
  };

  document.addEventListener("keydown", handleKeyPress);

  // Return cleanup function
  return () => {
    document.removeEventListener("keydown", handleKeyPress);
  };
};
