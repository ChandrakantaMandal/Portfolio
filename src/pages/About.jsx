import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import {
  FaCode,
  FaCss3Alt,
  FaDocker,
  FaGitAlt,
  FaHtml5,
  FaJava,
  FaJsSquare,
  FaNodeJs,
  FaPython,
  FaReact,
  FaServer,
  
} from "react-icons/fa";
import { TbBrandNextjs, TbBrandTypescript } from "react-icons/tb";
import {
  SiExpress,
  SiVite,
  SiVercel,
  SiNetlify,
  SiMongodb,
  SiMysql,
  SiPostgresql,
} from "react-icons/si";
import { FaGithub } from "react-icons/fa";
import { VscVscode } from "react-icons/vsc";
import { useTheme } from "../contexts/ThemeContext";

const About = () => {
  const { colors } = useTheme();
  const [activeCategory, setActiveCategory] = useState("all");
  const MotionDiv = motion.div;

  // Circular progress bar configuration
  const size = 120;
  const strokeWidth = 8;
  const center = size / 2;
  const radius = center - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;

  // Categorized Skills Data
  const skillCategories = {
    frontend: {
      title: "Frontend Development",
      skills: [
        {
          label: "HTML5",
          icon: <FaHtml5 size={32} />,
          level: 90,
          color: "#E34F26",
        },
        {
          label: "CSS3",
          icon: <FaCss3Alt size={32} />,
          level: 90,
          color: "#1572B6",
        },
        {
          label: "JavaScript",
          icon: <FaJsSquare size={32} />,
          level: 85,
          color: "#F7DF1E",
        },
        {
          label: "TypeScript",
          icon: <TbBrandTypescript size={32} />,
          level: 80,
          color: "#3178C6",
        },
        {
          label: "React",
          icon: <FaReact size={32} />,
          level: 85,
          color: "#61DAFB",
        },
        { label: "Next.js", icon: <TbBrandNextjs size={32} />, level: 75 },
        {
          label: "Tailwind CSS",
          icon: <FaCss3Alt size={32} />,
          level: 85,
          color: "#38B2AC",
        },
      ],
    },
    backend: {
      title: "Backend Development",
      skills: [
        {
          label: "Node.js",
          icon: <FaNodeJs size={32} />,
          level: 80,
          color: "#339933",
        },
        { label: "Express.js", icon: <SiExpress size={32} />, level: 75 },
        {
          label: "MongoDB",
          icon: <SiMongodb size={32} />,
          level: 75,
          color: "#47A248",
        },
        {
          label: "PostgreSQL",
          icon: <SiPostgresql size={32} />,
          level: 70,
          color: "#336791",
        },
        {
          label: "MySQL",
          icon: <SiMysql size={32} />,
          level: 65,
          color: "#4479A1",
        },
        {
          label: "Firebase",
          icon: <FaServer size={32} />,
          level: 70,
          color: "#FFCA28",
        },
      ],
    },
    languages: {
      title: "Programming Languages",
      skills: [
        {
          label: "JavaScript",
          icon: <FaJsSquare size={32} />,
          level: 85,
          color: "#F7DF1E",
        },
        {
          label: "TypeScript",
          icon: <TbBrandTypescript size={32} />,
          level: 80,
          color: "#3178C6",
        },
        {
          label: "Python",
          icon: <FaPython size={32} />,
          level: 75,
          color: "#3776AB",
        },
        {
          label: "Java",
          icon: <FaJava size={32} />,
          level: 70,
          color: "#ED8B00",
        },
        {
          label: "C++",
          icon: <FaCode size={32} />,
          level: 65,
          color: "#00599C",
        },
      ],
    },
    tools: {
      title: "Tools & Technologies",
      skills: [
        {
          label: "Git",
          icon: <FaGitAlt size={32} />,
          level: 80,
          color: "#F05032",
        },
        {
          label: "GitHub",
          icon: <FaGithub size={32} />,
          level: 80,
          color: "#00C7B7",
        },
        {
          label: "VS Code",
          icon: <VscVscode size={32} />,
          level: 90,
          color: "#007ACC",
        },
        {
          label: "Vite",
          icon: <SiVite size={32} />,
          level: 80,
          color: "#646CFF",
        },
        {
          label: "Docker",
          icon: <FaDocker size={32} />,
          level: 65,
          color: "#2496ED",
        },
        { label: "Vercel", icon: <SiVercel size={32} />, level: 85 },
        {
          label: "Netlify",
          icon: <SiNetlify size={32} />,
          level: 80,
          color: "#00C7B7",
        },
      ],
    },
  };

  // Get filtered categories
  const filteredCategories = Object.entries(skillCategories).filter(
    ([key]) => activeCategory === "all" || activeCategory === key
  );

  return (
    <section
      id="about"
      className="pt-8 pb-20 px-6 transition-colors duration-300"
      style={{
        backgroundColor: colors.primary,
        color: colors.text.primary,
      }}
    >
      <div className="max-w-6xl mx-auto">
        <MotionDiv
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-2">About Me</h2>
        </MotionDiv>
        <MotionDiv
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-3xl mx-auto text-center mb-20"
        >
          <h3 className="text-3xl font-bold mb-4">
            Hello! I am{" "}
            <span className="text-[#3de58f]">Chandrakanta Mandal</span>
          </h3>
          <p style={{ color: colors.text.muted }}>
            I am a dedicated web developer passionate about crafting interactive
            and engaging digital experiences. With a background in JavaScript
            and modern frameworks like React and Next.js, I transform ideas into
            fully functional, beautiful websites.
          </p>
        </MotionDiv>
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center mb-12"
        >
          <h3 className="text-3xl font-bold text-[#3de58f] mb-4">
            Technical Skills
          </h3>
          <p style={{ color: colors.text.muted }} className="max-w-2xl mx-auto">
            A comprehensive overview of my technical expertise across different
            domains
          </p>
        </MotionDiv>

        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {[
            { key: "all", label: "All Skills", icon: "🚀" },
            { key: "frontend", label: "Frontend", icon: "💻" },
            { key: "backend", label: "Backend", icon: "⚙️" },
            { key: "languages", label: "Languages", icon: "📝" },
            { key: "tools", label: "Tools", icon: "🛠️" },
          ].map((category) => (
            <motion.button
              key={category.key}
              onClick={() => setActiveCategory(category.key)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
                activeCategory === category.key
                  ? "bg-gradient-to-r from-[#3de58f] to-[#2dd284] text-white shadow-lg shadow-[#3de58f]/25"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>{category.icon}</span>
              <span>{category.label}</span>
            </motion.button>
          ))}
        </MotionDiv>

        {/* Skills Categories */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            className="space-y-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {filteredCategories.map(([key, category], categoryIndex) => (
              <div
                key={key}
                className="rounded-3xl p-8 backdrop-blur-sm border transition-colors duration-300"
                style={{
                  backgroundColor: colors.card,
                  borderColor: colors.border,
                }}
              >
                <h4 className="text-2xl font-bold text-[#3de58f] mb-8 text-center">
                  {category.title}
                </h4>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
                  {category.skills.map((skill, skillIndex) => {
                    const offset = circumference * (1 - skill.level / 100);

                    return (
                      <MotionDiv
                        key={skill.label}
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{
                          duration: 0.3,
                          delay: skillIndex * 0.03,
                          ease: "easeOut",
                        }}
                        whileHover={{
                          scale: 1.05,
                          y: -5,
                          transition: { duration: 0.15 },
                        }}
                        className="flex flex-col items-center cursor-pointer"
                      >
                        <div
                          className="relative"
                          style={{ width: size, height: size }}
                        >
                          <svg
                            width={size}
                            height={size}
                            className="transform -rotate-90"
                          >
                            <circle
                              cx={center}
                              cy={center}
                              r={radius}
                              stroke={colors.border}
                              strokeWidth={strokeWidth}
                              fill="none"
                              opacity="0.3"
                            />
                           
                            <motion.circle
                              cx={center}
                              cy={center}
                              r={radius}
                              stroke="#3de58f"
                              strokeWidth={strokeWidth}
                              strokeLinecap="round"
                              fill="none"
                              strokeDasharray={circumference}
                              strokeDashoffset={offset}
                              initial={{ strokeDashoffset: circumference }}
                              animate={{ strokeDashoffset: offset }}
                              transition={{
                                duration: 0.8,
                                delay: skillIndex * 0.05,
                                ease: "easeOut",
                              }}
                            />
                          </svg>

                          
                          <div
                            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
                            style={{ color: skill.color }}
                          >
                            <div className="text-2xl mb-1">{skill.icon}</div>
                            <span className="text-xs font-bold text-[#3de58f]">
                              {skill.level}%
                            </span>
                          </div>
                        </div>

                        
                        <motion.div
                          className="mt-4 text-center"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 0.3,
                            delay: skillIndex * 0.05 + 0.1,
                            ease: "easeOut",
                          }}
                        >
                          <div
                            className="font-semibold text-sm"
                            style={{ color: colors.text.primary }}
                          >
                            {skill.label}
                          </div>
                        </motion.div>
                      </MotionDiv>
                    );
                  })}
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default About;
