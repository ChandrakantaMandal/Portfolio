import { motion } from "framer-motion";
import { useTheme } from "../contexts/ThemeContext";
import ResumeDownload from "../components/ResumeDownload";
import {
  EnhancedTypingAnimation,
  WordRevealAnimation,
  CharacterRevealAnimation,
} from "../components/TypingAnimation";

const Hero = () => {
  const { colors } = useTheme();

  return (
    <section
      id="hero"
      className="min-h-[50vh] sm:min-h-screen flex flex-col lg:flex-row items-start lg:items-center justify-start lg:justify-center px-2 sm:px-4 md:px-8 lg:px-20 pt-20 sm:pt-24 pb-1 sm:pb-2 md:pb-6 lg:pb-16 gap-2 sm:gap-4 lg:gap-12"
      style={{
        backgroundColor: colors.primary,
        color: colors.text.primary,
      }}
    >
      <div className="w-full max-w-full px-2 sm:px-4 md:px-0 break-words overflow-hidden">
        <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-0.5 break-words max-w-full">
          <WordRevealAnimation
            text="Hi, I'm Chandrakanta!"
            delay={0.5}
            staggerDelay={0.15}
          />
        </div>

        <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium mb-0.5 text-gray-600 dark:text-gray-300 break-words max-w-full">
          <EnhancedTypingAnimation
            prefix="A Passionate "
            texts={[
              "Web Developer",
              "Full Stack Engineer",
              "React Specialist",
              "UI/UX Designer",
              "Problem Solver",
            ]}
            className="leading-tight"
          />
        </div>

        <div className="text-xs sm:text-xs md:text-sm lg:text-base text-gray-400 leading-relaxed break-words max-w-full">
          <CharacterRevealAnimation
            text="Welcome to my portfolio! I specialize in creating sleek, efficient websites that not only look great but also perform seamlessly. Whether you need a personal blog, an e-commerce platform, or a business website, I bring your ideas to life with clean code and attention to detail."
            delay={2.5}
            staggerDelay={0.02}
          />
        </div>

        <div className="flex flex-col gap-2 sm:gap-3 mt-2 sm:mt-4">
          <ResumeDownload
            variant="primary"
            text="Download Resume"
            fileName="Chandrakanta_Mandal_Resume.pdf"
          />

          <motion.a
            href="#contact"
            className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 rounded-lg font-semibold border-2 transition-all duration-300 hover:scale-105 text-xs sm:text-sm md:text-base w-full sm:w-auto text-center"
            style={{
              color: colors.accent,
              borderColor: colors.accent,
              backgroundColor: "transparent",
            }}
            whileHover={{
              backgroundColor: colors.accent,
              color: colors.primary,
              scale: 1.05,
            }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.preventDefault();
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Let's Talk
          </motion.a>
        </div>
      </div>

      <div className="relative w-full max-w-[208px] sm:max-w-[240px] md:max-w-[320px] lg:max-w-[420px] xl:max-w-[500px] 2xl:max-w-[550px] mb-0">
        <img
          src="/Photo.jpeg"
          alt="Chandara"
          className="w-52 h-52 sm:w-60 sm:h-60 md:w-80 md:h-80 lg:w-[420px] lg:h-[420px] xl:w-[480px] xl:h-[480px] 2xl:w-[550px] 2xl:h-[550px] object-cover rounded-xl mx-auto"
          style={{
            boxShadow:
              "0 0 20px rgba(61, 229, 143, 0.3), 0 0 40px rgba(61, 229, 143, 0.1)",
            border: "2px solid rgba(61, 229, 143, 0.2)",
          }}
        />
      </div>
    </section>
  );
};

export default Hero;
