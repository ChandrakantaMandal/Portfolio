import { motion } from "framer-motion";
import { useTheme } from "../contexts/ThemeContext";

const projects = [
  {
    title: "Portfolio Website",
    description: "A responsive React portfolio with animations.",
    tech: ["React", "Framer Motion", "Tailwind"],
    successRate: 90,
    github: "https://github.com/yourusername/portfolio",
    live: "https://portfolio-28.vercele.app",
  },
  {
    title: "Authentication",
    description: "A secure authentication system.",
    tech: ["React", "Tailwind", "MongoDb", "Express.js", "Node.js "],
    successRate: 85,
    github: "https://github.com/ChandrakantaMandal/Authentication",
    live: "" 
  },
  {
    title: "Myntra-Clone",
    description: "A responsive Myntra e-commerce clone.",
    tech: ["React", "Tailwind", "Redux Toolkit"],
    successRate: 95,
    github: "https://github.com/ChandrakantaMandal/Myntra-Clone-Frontend-only",
    live: "",
  },
  {
    title: "Hackathon-Project-Hub",
    description:
      "Hackathon-Project management platform.",
    tech: ["React","Tailwind","Node.js", "Express"," MongoDB"],
    successRate: 80,
    github: "https://github.com/ChandrakantaMandal/Hackathon-Project-Hub",
    live: "",
  },
  {
    title: "Task Manager",
    description:
      "Collaborative task manager with user roles and Charts.",
    tech: ["React","Tailwind","Node.js", "Express"," MongoDB"],
    successRate: 92,
    github: "https://github.com/ChandrakantaMandal/Task-Manager",
    live: "",
  },
];

const Projects = () => {
  const { colors } = useTheme();
  const MotionDiv = motion.div;

  return (
    <section
      id="projects"
      className="py-20 px-6 transition-colors duration-300"
      style={{
        backgroundColor: colors.primary,
        color: colors.text.primary,
      }}
    >
      <div className="max-w-6xl mx-auto text-center">
        <MotionDiv
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <h2 className="text-4xl font-bold mb-2 text-[#3de58f]">Projects</h2>
          <p style={{ color: colors.text.muted }} className="max-w-xl mx-auto">
            Some of my full-stack and front-end projects showcasing my skills
            and technologies I work with.
          </p>
        </MotionDiv>

        <div className="grid md:grid-cols-2 gap-12">
          {projects.map((project, index) => (
            <MotionDiv
              key={index}
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              className="p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
              style={{ backgroundColor: colors.card }}
            >
              <div>
                <h3 className="text-2xl font-semibold mb-3 text-[#3de58f]">
                  {project.title}
                </h3>
                <p style={{ color: colors.text.secondary }} className="mb-4">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-full text-sm font-medium transition-colors duration-300"
                      style={{
                        backgroundColor: colors.tertiary,
                        color: colors.accent,
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-semibold text-[#3de58f]">
                    Success Rate
                  </span>
                  <span className="font-semibold text-[#3de58f]">
                    {project.successRate}%
                  </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${project.successRate}%` }}
                    transition={{ duration: 1.2 }}
                    className="bg-[#3de58f] h-3 rounded-full"
                  />
                </div>
              </div>

              <div className="mt-6 space-x-6 text-center">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#3de58f] hover:underline font-semibold"
                >
                  View Code
                </a>
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#3de58f] hover:underline font-semibold"
                >
                  Live Demo
                </a>
              </div>
            </MotionDiv>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
