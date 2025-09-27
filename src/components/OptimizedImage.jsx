import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

const OptimizedImage = ({
  src,
  alt,
  className = "",
  width,
  height,
  priority = false,
  quality = 75,
  placeholder = "blur",
  blurDataURL,
  sizes = "100vw",
  onLoad,
  onError,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [error, setError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState("");
  const imgRef = useRef(null);
  const observerRef = useRef(null);

  // Generate WebP and fallback sources
  const generateSources = (originalSrc) => {
    if (!originalSrc) return { webp: "", fallback: originalSrc };

    const extension = originalSrc.split(".").pop()?.toLowerCase();
    const basePath = originalSrc.replace(/\.[^/.]+$/, "");

    // For development, we'll use the original image
    // In production, you'd have a build process to generate WebP versions
    const webpSrc = `${basePath}.webp`;

    return {
      webp: webpSrc,
      fallback: originalSrc,
    };
  };

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority || !imgRef.current) return;

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observerRef.current?.disconnect();
        }
      },
      {
        rootMargin: "50px", // Start loading 50px before the image enters viewport
        threshold: 0.1,
      }
    );

    observerRef.current.observe(imgRef.current);

    return () => {
      observerRef.current?.disconnect();
    };
  }, [priority]);

  // Set source when in view
  useEffect(() => {
    if (isInView && src) {
      const sources = generateSources(src);
      setCurrentSrc(sources.fallback);
    }
  }, [isInView, src]);

  // Handle image load
  const handleLoad = (e) => {
    setIsLoaded(true);
    setError(false);
    onLoad?.(e);
  };

  // Handle image error
  const handleError = (e) => {
    setError(true);
    onError?.(e);
  };

  // Generate responsive sizes
  const generateSizes = () => {
    if (sizes) return sizes;

    // Default responsive sizes
    return "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw";
  };

  // Generate srcSet for responsive images
  const generateSrcSet = (baseSrc) => {
    if (!baseSrc) return "";

    const extension = baseSrc.split(".").pop()?.toLowerCase();
    const basePath = baseSrc.replace(/\.[^/.]+$/, "");

    // Generate different sizes (in production, these would be pre-generated)
    const sizes = [320, 640, 768, 1024, 1280, 1920];

    return sizes
      .map((size) => `${basePath}-${size}w.${extension} ${size}w`)
      .join(", ");
  };

  // Placeholder component
  const Placeholder = () => (
    <div
      className={`bg-gray-200 dark:bg-gray-700 animate-pulse ${className}`}
      style={{ width, height }}
      {...props}
    >
      {placeholder === "blur" && blurDataURL ? (
        <img
          src={blurDataURL}
          alt=""
          className="w-full h-full object-cover filter blur-sm"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <svg
            className="w-8 h-8 text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      )}
    </div>
  );

  // Error component
  const ErrorPlaceholder = () => (
    <div
      className={`bg-red-100 dark:bg-red-900 border border-red-300 dark:border-red-700 rounded flex items-center justify-center ${className}`}
      style={{ width, height }}
      {...props}
    >
      <div className="text-center p-4">
        <svg
          className="w-8 h-8 text-red-500 mx-auto mb-2"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
            clipRule="evenodd"
          />
        </svg>
        <p className="text-xs text-red-600 dark:text-red-400">
          Failed to load image
        </p>
      </div>
    </div>
  );

  if (error) {
    return <ErrorPlaceholder />;
  }

  if (!isInView) {
    return (
      <div ref={imgRef}>
        <Placeholder />
      </div>
    );
  }

  const sources = generateSources(currentSrc);

  return (
    <div ref={imgRef} className="relative">
      {/* Show placeholder while loading */}
      {!isLoaded && <Placeholder />}

      {/* Optimized image with WebP support */}
      <picture>
        {/* WebP source */}
        <source
          srcSet={generateSrcSet(sources.webp)}
          sizes={generateSizes()}
          type="image/webp"
        />

        {/* Fallback source */}
        <motion.img
          src={currentSrc}
          srcSet={generateSrcSet(sources.fallback)}
          sizes={generateSizes()}
          alt={alt}
          width={width}
          height={height}
          className={`${className} ${
            isLoaded ? "opacity-100" : "opacity-0"
          } transition-opacity duration-300`}
          onLoad={handleLoad}
          onError={handleError}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          {...props}
        />
      </picture>

      {/* Loading indicator */}
      {!isLoaded && currentSrc && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};

// Higher-order component for automatic optimization
export const withImageOptimization = (WrappedComponent) => {
  return function OptimizedComponent(props) {
    const optimizedProps = {
      ...props,
      // Add default optimization settings
      quality: props.quality || 75,
      placeholder: props.placeholder || "blur",
      sizes: props.sizes || "100vw",
    };

    return <WrappedComponent {...optimizedProps} />;
  };
};

// Utility function to generate blur data URL
export const generateBlurDataURL = (width = 10, height = 10) => {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, "#f3f4f6");
  gradient.addColorStop(1, "#e5e7eb");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  return canvas.toDataURL();
};

// Preload critical images
export const preloadImage = (src, priority = false) => {
  return new Promise((resolve, reject) => {
    const img = new Image();

    if (priority) {
      img.fetchPriority = "high";
    }

    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
};

// Batch preload multiple images
export const preloadImages = async (sources, priority = false) => {
  const promises = sources.map((src) => preloadImage(src, priority));

  try {
    return await Promise.allSettled(promises);
  } catch (error) {
    console.warn("Some images failed to preload:", error);
    return [];
  }
};

// Custom hook for image optimization
export const useImageOptimization = () => {
  const [supportedFormats, setSupportedFormats] = useState({
    webp: false,
    avif: false,
  });

  useEffect(() => {
    // Check WebP support
    const checkWebP = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 1;
      canvas.height = 1;
      return canvas.toDataURL("image/webp").indexOf("data:image/webp") === 0;
    };

    // Check AVIF support
    const checkAVIF = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 1;
      canvas.height = 1;
      return canvas.toDataURL("image/avif").indexOf("data:image/avif") === 0;
    };

    setSupportedFormats({
      webp: checkWebP(),
      avif: checkAVIF(),
    });
  }, []);

  const getOptimalFormat = (originalSrc) => {
    if (!originalSrc) return originalSrc;

    const basePath = originalSrc.replace(/\.[^/.]+$/, "");

    if (supportedFormats.avif) {
      return `${basePath}.avif`;
    } else if (supportedFormats.webp) {
      return `${basePath}.webp`;
    }

    return originalSrc;
  };

  return {
    supportedFormats,
    getOptimalFormat,
  };
};

export default OptimizedImage;
