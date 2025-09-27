// Image optimization utilities

// Check browser support for modern image formats
export const checkImageFormatSupport = () => {
  const canvas = document.createElement("canvas");
  canvas.width = 1;
  canvas.height = 1;

  return {
    webp: canvas.toDataURL("image/webp").indexOf("data:image/webp") === 0,
    avif: canvas.toDataURL("image/avif").indexOf("data:image/avif") === 0,
    jpeg2000: canvas.toDataURL("image/jp2").indexOf("data:image/jp2") === 0,
  };
};

// Generate responsive image sources
export const generateResponsiveSources = (
  baseSrc,
  sizes = [320, 640, 768, 1024, 1280, 1920]
) => {
  if (!baseSrc) return [];

  const extension = baseSrc.split(".").pop()?.toLowerCase();
  const basePath = baseSrc.replace(/\.[^/.]+$/, "");

  return sizes.map((size) => ({
    src: `${basePath}-${size}w.${extension}`,
    width: size,
    descriptor: `${size}w`,
  }));
};

// Generate srcSet string
export const generateSrcSet = (sources) => {
  return sources
    .map((source) => `${source.src} ${source.descriptor}`)
    .join(", ");
};

// Generate sizes attribute for responsive images
export const generateSizes = (breakpoints = {}) => {
  const defaultBreakpoints = {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    ...breakpoints,
  };

  return [
    `(max-width: ${defaultBreakpoints.sm}) 100vw`,
    `(max-width: ${defaultBreakpoints.md}) 50vw`,
    `(max-width: ${defaultBreakpoints.lg}) 33vw`,
    "25vw",
  ].join(", ");
};

// Create blur data URL for placeholder
export const createBlurDataURL = (
  width = 10,
  height = 10,
  color1 = "#f3f4f6",
  color2 = "#e5e7eb"
) => {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, color1);
  gradient.addColorStop(1, color2);

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  return canvas.toDataURL();
};

// Compress image client-side
export const compressImage = (
  file,
  quality = 0.8,
  maxWidth = 1920,
  maxHeight = 1080
) => {
  return new Promise((resolve) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      // Calculate new dimensions
      let { width, height } = img;

      if (width > maxWidth) {
        height = (height * maxWidth) / width;
        width = maxWidth;
      }

      if (height > maxHeight) {
        width = (width * maxHeight) / height;
        height = maxHeight;
      }

      canvas.width = width;
      canvas.height = height;

      // Draw and compress
      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob(resolve, "image/jpeg", quality);
    };

    img.src = URL.createObjectURL(file);
  });
};

// Preload critical images
export const preloadCriticalImages = (imageSources) => {
  const promises = imageSources.map((src) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(src);
      img.onerror = () => reject(src);
      img.src = src;
    });
  });

  return Promise.allSettled(promises);
};

// Lazy load images with Intersection Observer
export const createLazyImageObserver = (callback, options = {}) => {
  const defaultOptions = {
    rootMargin: "50px",
    threshold: 0.1,
    ...options,
  };

  return new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        callback(entry.target);
      }
    });
  }, defaultOptions);
};

// Get optimal image format based on browser support
export const getOptimalImageFormat = (originalSrc, supportedFormats) => {
  if (!originalSrc) return originalSrc;

  const basePath = originalSrc.replace(/\.[^/.]+$/, "");

  if (supportedFormats.avif) {
    return `${basePath}.avif`;
  } else if (supportedFormats.webp) {
    return `${basePath}.webp`;
  }

  return originalSrc;
};

// Calculate image aspect ratio
export const calculateAspectRatio = (width, height) => {
  const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
  const divisor = gcd(width, height);

  return {
    ratio: width / height,
    width: width / divisor,
    height: height / divisor,
    string: `${width / divisor}:${height / divisor}`,
  };
};

// Generate image metadata
export const getImageMetadata = (file) => {
  return new Promise((resolve) => {
    const img = new Image();

    img.onload = () => {
      const metadata = {
        width: img.naturalWidth,
        height: img.naturalHeight,
        aspectRatio: calculateAspectRatio(img.naturalWidth, img.naturalHeight),
        size: file.size,
        type: file.type,
        name: file.name,
      };

      resolve(metadata);
    };

    img.src = URL.createObjectURL(file);
  });
};

// Convert image to WebP format
export const convertToWebP = (canvas, quality = 0.8) => {
  return new Promise((resolve) => {
    canvas.toBlob(resolve, "image/webp", quality);
  });
};

// Image loading performance metrics
export const measureImageLoadTime = (src) => {
  return new Promise((resolve) => {
    const startTime = performance.now();
    const img = new Image();

    img.onload = () => {
      const loadTime = performance.now() - startTime;
      resolve({
        src,
        loadTime,
        success: true,
      });
    };

    img.onerror = () => {
      const loadTime = performance.now() - startTime;
      resolve({
        src,
        loadTime,
        success: false,
      });
    };

    img.src = src;
  });
};

// Batch image operations
export const batchImageOperations = async (
  images,
  operation,
  concurrency = 3
) => {
  const results = [];

  for (let i = 0; i < images.length; i += concurrency) {
    const batch = images.slice(i, i + concurrency);
    const batchPromises = batch.map(operation);
    const batchResults = await Promise.allSettled(batchPromises);
    results.push(...batchResults);
  }

  return results;
};

// Image cache management
export class ImageCache {
  constructor(maxSize = 50) {
    this.cache = new Map();
    this.maxSize = maxSize;
  }

  set(key, value) {
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }

    this.cache.set(key, {
      value,
      timestamp: Date.now(),
    });
  }

  get(key) {
    const item = this.cache.get(key);
    if (!item) return null;

    // Check if item is expired (24 hours)
    if (Date.now() - item.timestamp > 24 * 60 * 60 * 1000) {
      this.cache.delete(key);
      return null;
    }

    return item.value;
  }

  clear() {
    this.cache.clear();
  }

  size() {
    return this.cache.size;
  }
}

// Global image cache instance
export const imageCache = new ImageCache();
