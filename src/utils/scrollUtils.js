
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




