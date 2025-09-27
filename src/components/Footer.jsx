import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../contexts/ThemeContext";

const Footer = () => {
  const { colors } = useTheme();
  const MotionDiv = motion.div;
  return (
    <motion.footer
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
      className="py-6 text-center mt-20 transition-colors duration-300"
      style={{
        backgroundColor: colors.primary,
        color: colors.text.primary,
      }}
    >
      <p
        className="text-sm transition duration-300 cursor-pointer"
        style={{ color: colors.text.muted }}
        onMouseEnter={(e) => (e.target.style.color = colors.accent)}
        onMouseLeave={(e) => (e.target.style.color = colors.text.muted)}
      >
        © 2025 Chandrakanta Mandal. All rights reserved.
      </p>
    </motion.footer>
  );
};

export default Footer;
