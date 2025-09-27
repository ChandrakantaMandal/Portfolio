import { motion } from "framer-motion";
import { useTheme } from "../contexts/ThemeContext";
import ResumeDownload from "../components/ResumeDownload";
import {
  EnhancedTypingAnimation,
  WordRevealAnimation,
  CharacterRevealAnimation,
} from "../components/TypingAnimation";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const Hero = () => {
  const { colors } = useTheme();
  const MotionDiv = motion.div;

  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col lg:flex-row items-center justify-between px-8 md:px-20 py-16 transition-colors duration-300"
      style={{
        backgroundColor: colors.primary,
        color: colors.text.primary,
      }}
    >
      {/* Left Content */}
      <MotionDiv
        className="max-w-xl"
        initial="hidden"
        animate="visible"
        variants={fadeUp}
      >
        {/* Main heading with word reveal animation */}
        <motion.div
          className="text-4xl md:text-5xl font-bold mb-2"
          custom={1}
          variants={fadeUp}
        >
          <WordRevealAnimation
            text="Hi, I'm Chandrakanta!"
            delay={0.5}
            staggerDelay={0.15}
          />
        </motion.div>

        {/* Subtitle with enhanced typing animation */}
        <motion.div
          className="text-3xl md:text-4xl font-extrabold mb-6"
          custom={2}
          variants={fadeUp}
        >
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
        </motion.div>

        {/* Description with character reveal animation */}
        <motion.div
          className="text-gray-400 leading-relaxed"
          custom={3}
          variants={fadeUp}
        >
          <CharacterRevealAnimation
            text="Welcome to my portfolio! I specialize in creating sleek, efficient websites that not only look great but also perform seamlessly. Whether you need a personal blog, an e-commerce platform, or a business website, I bring your ideas to life with clean code and attention to detail."
            delay={2.5}
            staggerDelay={0.02}
          />
        </motion.div>

        {/* Buttons */}
        <MotionDiv className="flex flex-wrap gap-4 mt-8" custom={4} variants={fadeUp}>
          <ResumeDownload 
            variant="primary" 
            text="Download Resume" 
            fileName="Chandrakanta_Mandal_Resume.pdf"
          />
          
          <motion.a
            href="#contact"
            className="px-6 py-3 rounded-lg font-semibold border-2 transition-all duration-300 hover:scale-105"
            style={{
              color: colors.accent,
              borderColor: colors.accent,
              backgroundColor: "transparent"
            }}
            whileHover={{ 
              backgroundColor: colors.accent,
              color: colors.primary,
              scale: 1.05
            }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Let's Talk
          </motion.a>
        </MotionDiv>
      </MotionDiv>

      {/* Right Content - Image */}
      <MotionDiv
        className="mt-10 lg:mt-0 relative"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
      >
        <div className="p-2 border-4 border-[#3de58f] rounded-[2rem] shadow-lg hover:scale-105 transition-transform duration-500">
          <img
            src=" /Photo.jpeg"
            alt="Chandara"
            className="w-[300px] h-[300px] object-cover rounded-xl"
          />
        </div>
      </MotionDiv>
    </section>
  );
};

export default Hero;
