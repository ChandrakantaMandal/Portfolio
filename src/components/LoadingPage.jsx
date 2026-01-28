import { motion } from "framer-motion";
import { useTheme } from "../contexts/ThemeContext";


const SkeletonLoader = ({
  className = "",
  width = "100%",
  height = "20px",
}) => {
  const { colors } = useTheme();

  return (
    <motion.div
      className={`rounded ${className}`}
      style={{
        width,
        height,
        backgroundColor: colors.secondary,
      }}
      animate={{
        opacity: [0.5, 1, 0.5],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
};

const SkeletonCard = () => {
  const { colors } = useTheme();

  return (
    <motion.div
      className="p-4 md:p-6 rounded-xl max-w-sm mx-auto"
      style={{ backgroundColor: colors.card }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <SkeletonLoader height="160px" className="mb-4 rounded-lg" />
      <SkeletonLoader height="20px" width="85%" className="mb-2" />
      <SkeletonLoader height="14px" width="65%" className="mb-4" />
      <div className="flex gap-2 flex-wrap">
        <SkeletonLoader height="28px" width="70px" className="rounded-full" />
        <SkeletonLoader height="28px" width="70px" className="rounded-full" />
        <SkeletonLoader height="28px" width="70px" className="rounded-full" />
      </div>
    </motion.div>
  );
};


const LoadingPage = () => {
  const { colors } = useTheme();

  return (
    <div
      className="min-h-screen transition-colors duration-300"
      style={{ backgroundColor: colors.primary }}
    >
      <motion.div
        className="fixed top-0 left-0 right-0 z-50 p-4"
        style={{ backgroundColor: colors.navbar }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-4xl mx-auto flex justify-between items-center px-4">
          <SkeletonLoader height="28px" width="100px" />
          <div className="hidden md:flex gap-4">
            <SkeletonLoader height="18px" width="50px" />
            <SkeletonLoader height="18px" width="50px" />
            <SkeletonLoader height="18px" width="50px" />
            <SkeletonLoader height="18px" width="50px" />
          </div>
          <div className="md:hidden">
            <SkeletonLoader height="24px" width="24px" />
          </div>
        </div>
      </motion.div>

     
      <div className="pt-20 px-6 md:px-12 max-w-6xl mx-auto">
       
        <motion.div
          className="min-h-screen flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex-1 max-w-lg text-center lg:text-left">
            <SkeletonLoader
              height="48px"
              width="85%"
              className="mb-4 mx-auto lg:mx-0"
            />
            <SkeletonLoader
              height="32px"
              width="65%"
              className="mb-6 mx-auto lg:mx-0"
            />
            <SkeletonLoader
              height="18px"
              width="95%"
              className="mb-2 mx-auto lg:mx-0"
            />
            <SkeletonLoader
              height="18px"
              width="75%"
              className="mb-6 mx-auto lg:mx-0"
            />
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <SkeletonLoader height="44px" width="120px" />
              <SkeletonLoader height="44px" width="120px" />
            </div>
          </div>
          <div className="flex-1 flex justify-center max-w-sm">
            <SkeletonLoader
              height="320px"
              width="280px"
              className="rounded-lg"
            />
          </div>
        </motion.div>

       
        <motion.div
          className="py-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <SkeletonLoader
              height="40px"
              width="240px"
              className="mx-auto mb-4"
            />
            <SkeletonLoader
              height="18px"
              width="80%"
              className="mx-auto mb-2"
            />
            <SkeletonLoader height="18px" width="60%" className="mx-auto" />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + i * 0.1 }}
              >
                <SkeletonCard />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Central loading spinner */}
      <motion.div
        className="fixed inset-0 flex items-center justify-center pointer-events-none z-50"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center px-6">
          {/* Modern Advanced Loader */}
          <div className="relative mb-8 mx-auto w-24 h-24">
            {/* Outer rotating ring */}
            <motion.div
              className="absolute inset-0 rounded-full border-4 border-transparent"
              style={{
                borderTopColor: colors.accent,
                borderRightColor: `${colors.accent}40`,
              }}
              animate={{ rotate: 360 }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            {/* Middle pulsing ring */}
            <motion.div
              className="absolute inset-2 rounded-full border-2 border-transparent"
              style={{
                borderLeftColor: colors.accent,
                borderBottomColor: `${colors.accent}60`,
              }}
              animate={{ rotate: -360 }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            {/* Inner spinning dots */}
            <div className="absolute inset-4 rounded-full">
              {[0, 1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full"
                  style={{
                    backgroundColor: colors.accent,
                    top: "50%",
                    left: "50%",
                    transformOrigin: "0 0",
                  }}
                  animate={{
                    rotate: 360,
                    scale: [1, 1.5, 1],
                    opacity: [0.4, 1, 0.4],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.25,
                    ease: "easeInOut",
                  }}
                  initial={{
                    rotate: i * 90,
                    x: -4,
                    y: -16,
                  }}
                />
              ))}
            </div>

            {/* Center glow effect */}
            <motion.div
              className="absolute inset-6 rounded-full"
              style={{
                backgroundColor: colors.accent,
                filter: "blur(4px)",
              }}
              animate={{
                scale: [0.8, 1.2, 0.8],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>

          {/* Modern Loading Text */}
          <div className="mb-6">
            <motion.h2
              className="text-xl md:text-2xl font-bold mb-2 max-w-xs mx-auto"
              style={{ color: colors.text.primary }}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Loading Portfolio
            </motion.h2>

            {/* Animated typing dots */}
            <div className="flex justify-center items-center space-x-1">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: colors.accent }}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.4, 1, 0.4],
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Loading status text */}
          <motion.div
            className="mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <motion.p
              className="text-sm text-center"
              style={{ color: colors.text.muted }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              Preparing your experience...
            </motion.p>
          </motion.div>

          {/* Modern Progress Bar */}
          <motion.div
            className="w-56 md:w-72 mx-auto"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
          >
            {/* Progress bar container */}
            <div
              className="h-2 rounded-full overflow-hidden relative"
              style={{ backgroundColor: colors.border }}
            >
              {/* Animated progress fill */}
              <motion.div
                className="h-full rounded-full relative overflow-hidden"
                style={{ backgroundColor: colors.accent }}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 4, ease: "easeInOut" }}
              >
                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-0 w-full h-full"
                  style={{
                    background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)`,
                  }}
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              </motion.div>

              {/* Glow effect */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  backgroundColor: colors.accent,
                  filter: "blur(4px)",
                  opacity: 0.3,
                }}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 4, ease: "easeInOut" }}
              />
            </div>

            {/* Progress percentage */}
            <motion.div
              className="text-center mt-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              <motion.span
                className="text-sm font-medium"
                style={{ color: colors.accent }}
                initial={{ textContent: "0%" }}
                animate={{ textContent: "100%" }}
                transition={{ duration: 4, ease: "easeInOut" }}
              />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoadingPage;
